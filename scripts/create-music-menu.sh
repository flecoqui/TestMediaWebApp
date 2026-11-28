#!/usr/bin/env bash
set -euo pipefail

usage() {
    cat <<'EOF'
Usage:
  AZURE_STORAGE_SAS_TOKEN='sp=...' create-music-menu.sh [options]

Options:
  --account NAME       Storage account (default: mediacloud)
  --container NAME     Blob container (default: m4amusic)
  --folder PREFIX      Blob prefix to include (default: empty)
  --sas-token TOKEN    SAS token; prefer AZURE_STORAGE_SAS_TOKEN
  --output FILE        Write JSON to FILE instead of standard output
  --pretty             Match the four-space-indented, BOM-prefixed data file
  --help               Show this help
EOF
}

account=mediacloud
container=m4amusic
folder=
sas_token=${AZURE_STORAGE_SAS_TOKEN:-}
output=
pretty=0

while (($#)); do
    case "$1" in
        --account)
            (($# >= 2)) || { echo "Missing value for --account" >&2; exit 2; }
            account=$2
            shift 2
            ;;
        --container)
            (($# >= 2)) || { echo "Missing value for --container" >&2; exit 2; }
            container=$2
            shift 2
            ;;
        --folder)
            (($# >= 2)) || { echo "Missing value for --folder" >&2; exit 2; }
            folder=$2
            shift 2
            ;;
        --sas-token)
            (($# >= 2)) || { echo "Missing value for --sas-token" >&2; exit 2; }
            sas_token=$2
            shift 2
            ;;
        --output)
            (($# >= 2)) || { echo "Missing value for --output" >&2; exit 2; }
            output=$2
            shift 2
            ;;
        --pretty)
            pretty=1
            shift
            ;;
        --help|-h)
            usage
            exit 0
            ;;
        *)
            echo "Unknown option: $1" >&2
            usage >&2
            exit 2
            ;;
    esac
done

if [[ -z "$sas_token" ]]; then
    echo "Set AZURE_STORAGE_SAS_TOKEN or pass --sas-token." >&2
    exit 2
fi
command -v curl >/dev/null || { echo "curl is required." >&2; exit 1; }
command -v python3 >/dev/null || { echo "python3 is required." >&2; exit 1; }

sas_token=${sas_token#\?}
temp_dir=$(mktemp -d)
trap 'rm -rf -- "$temp_dir"' EXIT

base_url="https://${account}.blob.core.windows.net/${container}"
marker=
page=0

while :; do
    page=$((page + 1))
    page_file="$temp_dir/page-$page.xml"
    list_url="${base_url}?restype=container&comp=list&${sas_token}"
    if [[ -n "$marker" ]]; then
        encoded_marker=$(python3 -c 'import sys, urllib.parse; print(urllib.parse.quote(sys.argv[1], safe=""))' "$marker")
        list_url+="&marker=${encoded_marker}"
    fi

    curl --fail --silent --show-error --retry 2 --max-time 120 \
        --output "$page_file" "$list_url"

    marker=$(python3 - "$page_file" <<'PY'
import sys
import xml.etree.ElementTree as ET

root = ET.parse(sys.argv[1]).getroot()
print((root.findtext("NextMarker") or "").strip())
PY
)
    [[ -n "$marker" ]] || break
done

python3 - "$temp_dir" "$account" "$container" "$folder" "$sas_token" "$output" "$pretty" <<'PY'
import datetime
import email.utils
import json
import pathlib
import sys
import urllib.parse
import xml.etree.ElementTree as ET


temp_dir, account, container, folder, sas_token, output, pretty = sys.argv[1:]
base_url = f"https://{account}.blob.core.windows.net/{container}"
items = []

for page_file in sorted(
        pathlib.Path(temp_dir).glob("page-*.xml"),
        key=lambda item: int(item.stem.rsplit("-", 1)[-1])):
    root = ET.parse(page_file).getroot()
    for blob in root.findall("./Blobs/Blob"):
        name = blob.findtext("Name") or ""
        if not name or not name.startswith(folder):
            continue
        properties = blob.find("Properties")
        if properties is None:
            continue
        created = email.utils.parsedate_to_datetime(properties.findtext("Creation-Time") or "")
        items.append({
            "Path": name,
            "Size": properties.findtext("Content-Length") or "",
            "Type": properties.findtext("Content-Type") or "",
            "Date": created.astimezone(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%S"),
        })


def encode_path(value):
    # Match JavaScript encodeURIComponent followed by CloudMediaTree's RFC3986 replacements.
    return urllib.parse.quote(value, safe="-_.!~")


def content_url(path):
    return f"{base_url}/{encode_path(path)}?{sas_token}"


def title(path):
    filename = path.rsplit("/", 1)[-1]
    value = filename.rsplit("-", 1)[-1]
    dot = value.rfind(".")
    return value[:dot] if dot > 0 else value


def track(path):
    filename = path.rsplit("/", 1)[-1]
    dash = filename.find("-")
    if dash <= 0:
        return ""
    digits = ""
    for character in filename[:dash]:
        if not character.isdigit() and not (not digits and character in "+-"):
            break
        digits += character
    if digits in ("", "+", "-"):
        return ""
    return str(int(digits))


def artist(path):
    parts = path.split("/")
    if len(parts) > 2:
        value = parts[-3]
        if not value:
            filename_parts = parts[-1].split("-")
            if len(filename_parts) >= 4:
                value = filename_parts[1]
        return value
    return "UnknownArtist"


def music_artist(path):
    value = artist(path)
    if value == "Various Artists":
        filename_parts = path.rsplit("/", 1)[-1].split("-")
        if len(filename_parts) >= 4:
            return filename_parts[1]
    return value


def album(path):
    parts = path.split("/")
    return parts[-2] if len(parts) > 1 else "UnknownAlbum"


def media_object(object_type, name, description="", content="", image="",
                 preview_content="", preview_image=""):
    return {
        "_type": object_type,
        "_title": name,
        "_mediaChildList": [],
        "_path": "/" + name,
        "_description": description,
        "_mainContentUrl": content,
        "_mainContentImageUrl": image,
        "_previewContentUrl": preview_content,
        "_previewContentImageUrl": preview_image,
        "_mediaParent": None,
        "_index": 0,
    }


def add_child(parent, child):
    child["_index"] = len(parent["_mediaChildList"])
    child["_path"] = parent["_path"] + "/" + child["_title"].replace("/", "_")
    parent["_mediaChildList"].append(child)


def find_child(parent, name):
    return next((child for child in parent["_mediaChildList"]
                 if child["_title"] == name), None)


root = media_object(
    "Music",
    "Cloud Music",
    f"Account: {account} Container: {container} Folder: {folder}",
    image="assets/img/Music.png",
)

paths = {item["Path"] for item in items}
music_extensions = (".m4a", ".aac", ".mp3", ".flac")

for index, item in enumerate(items):
    path = item["Path"]
    if not path.lower().endswith(music_extensions):
        continue

    item_artist = artist(path)
    item_album = album(path)
    item_title = title(path)
    artwork_path = path.rsplit("/", 1)[0] + "/artwork.jpg"
    artwork = "assets/img/Music.png"
    lower_bound = max(index - 100, 0)
    upper_bound = min(index + 100, len(items))
    if artwork_path in paths and any(
            candidate["Path"] == artwork_path
            for candidate in items[lower_bound:upper_bound]):
        artwork = content_url(artwork_path)

    artist_node = find_child(root, item_artist)
    if artist_node is None:
        artist_node = media_object("Music", item_artist, f"{{{{Artist: {item_artist}}}}}")
        add_child(root, artist_node)

    album_node = find_child(artist_node, item_album)
    if album_node is None:
        album_node = media_object(
            "Music",
            item_album,
            f"{{{{Artist: {item_artist}}}}}{{{{Album: {item_album}}}}}",
            image=artwork,
        )
        add_child(artist_node, album_node)

    description = (
        f"{{{{Artist: {music_artist(path)}}}}}"
        f"{{{{Album: {item_album}}}}}"
        f"{{{{Track: {track(path)}}}}}"
        f"{{{{Title: {item_title}}}}}"
        f"{{{{Date: {item['Date']}}}}}"
        f"{{{{Type: {item['Type']}}}}}"
        f"{{{{Size: {item['Size']}}}}}"
    )
    add_child(
        album_node,
        media_object("Music", item_title, description, content_url(path), artwork),
    )

if pretty == "1":
    serialized = "\ufeff" + json.dumps(root, ensure_ascii=False, indent=4)
else:
    serialized = json.dumps(root, ensure_ascii=False, separators=(",", ":"))
if output:
    pathlib.Path(output).write_text(serialized, encoding="utf-8")
else:
    sys.stdout.write(serialized)
PY
