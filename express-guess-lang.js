var egl = exports

egl.init = function (request, response, next) {
    var accept_lang = request.headers['accept-language'], regions = [], langs = [], prefered = { lang: 'en', quality: 0.0}
    var candidates = accept_lang.split(',')
    for (var i = 0; i < candidates.length; i++) {
        var candidate = candidates[i]
        var match = candidate.match(/q=([0-9].[0-9])/)
        var quality = match ? match[1] : 0.0
        match = candidate.match(/-(.*);/)
        if (match)
            regions.push(match[1])
        match = candidate.match(/(.*)[;||-]/)
        var lang = match ? match[1] : ''
        var newLang = { lang: lang, quality: quality }
        if (newLang.quality > prefered.quality)
            prefered = newLang
        langs.push(newLang)
    }
    request.getRegions = function () { return regions }
    request.getLanguages = function () { return langs }
    request.getPreferedLanguage = function () { return prefered }
}