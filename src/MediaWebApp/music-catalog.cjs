function createMusicCatalog(root) {
    const files = new Map();
    let nextId = 0;
    function split(node) {
        const children = node._mediaChildList;
        if(!Array.isArray(children))
            throw new Error("Music catalog entries must contain a child list.");
        const summary = { ...node, _mediaChildList: [] };
        if(children.length === 0)
            return { summary, tracks: node._mainContentUrl ? 1 : 0 };
        const url = "data/music/" + nextId++ + ".json";
        const entries = children.map(split);
        const tracks = entries.reduce((total, entry) => total + entry.tracks, 0);
        Object.assign(summary, {
            _catalogUrl: url,
            _catalogChildCount: children.length,
            _catalogTrackCount: tracks
        });
        files.set(url, JSON.stringify({
            ...summary,
            _mediaChildList: entries.map(entry => entry.summary)
        }));
        return { summary, tracks };
    }
    split(root);
    return files;
}

function createMusicSearchCatalog(root) {
    const files = new Map();
    const chunks = [];
    const prefix = '{"_mediaChildList":[';
    const suffix = ']}';
    const limit = 256 * 1024;
    let entries = [];
    let bytes = Buffer.byteLength(prefix + suffix);
    function flush() {
        if(entries.length === 0)
            return;
        const file = "data/music-search/" + chunks.length + ".json";
        files.set(file, prefix + entries.join(",") + suffix);
        chunks.push(file);
        entries = [];
        bytes = Buffer.byteLength(prefix + suffix);
    }
    function visit(node) {
        if(node._mainContentUrl) {
            const entry = JSON.stringify({
                _title: node._title ?? "",
                _description: node._description ?? "",
                _path: node._path ?? "",
                _mainContentUrl: node._mainContentUrl,
                _mainContentImageUrl: node._mainContentImageUrl ?? "",
                _mediaChildList: []
            });
            const length = Buffer.byteLength(entry);
            if(Buffer.byteLength(prefix + suffix) + length > limit)
                throw new Error("A music search entry exceeds the 256 KiB download budget.");
            if(bytes + length + (entries.length ? 1 : 0) > limit || entries.length >= 256)
                flush();
            bytes += length + (entries.length ? 1 : 0);
            entries.push(entry);
        }
        for(const child of node._mediaChildList)
            visit(child);
    }
    visit(root);
    flush();
    files.set("data/music-search/index.json", JSON.stringify({ version: 1, files: chunks }));
    return files;
}

class MusicCatalogPlugin {
    apply(compiler) {
        const name = "MusicCatalogPlugin";
        compiler.hooks.thisCompilation.tap(name, compilation => {
            compilation.hooks.processAssets.tap({
                name,
                stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONS
            }, () => {
                const asset = compilation.getAsset("data/musicsdata.json");
                if(!asset)
                    throw new Error("The music catalog must be copied before creating legacy catalog files.");
                const catalog = JSON.parse(asset.source.source().toString().replace(/^\uFEFF/, ""));
                for(const [file, contents] of createMusicCatalog(catalog))
                    compilation.emitAsset(file, new compiler.webpack.sources.RawSource(contents));
                for(const [file, contents] of createMusicSearchCatalog(catalog))
                    compilation.emitAsset(file, new compiler.webpack.sources.RawSource(contents));
            });
        });
    }
}

module.exports = { createMusicCatalog, createMusicSearchCatalog, MusicCatalogPlugin };
