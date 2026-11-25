function createSearchWordRanges() {
    const ranges = [];
    const wordCharacter = /[\p{L}\p{N}_]/u;
    for(let point = 0; point <= 0x10ffff; point++) {
        if(!wordCharacter.test(String.fromCodePoint(point)))
            continue;
        const previous = ranges[ranges.length - 1];
        if(previous && previous.end === point - 1)
            previous.end = point;
        else
            ranges.push({ start: point, end: point });
    }
    return ranges;
}

class SearchWordRangesPlugin {
    apply(compiler) {
        const name = "SearchWordRangesPlugin";
        compiler.hooks.thisCompilation.tap(name, compilation => {
            compilation.hooks.processAssets.tap({
                name,
                stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONS
            }, () => {
                compilation.emitAsset("data/search-word-ranges.json",
                    new compiler.webpack.sources.RawSource(JSON.stringify(createSearchWordRanges())));
            });
        });
    }
}

module.exports = { createSearchWordRanges, SearchWordRangesPlugin };
