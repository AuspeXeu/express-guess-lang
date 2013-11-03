var egl = exports

egl.init = function (request, response, next) {
    var accept_lang = request.headers['accept-language'],
        regions = [],
        langs = [],
        prefered = { lang: 'en', likelihood: 0.0}

    var candidates = accept_lang.split(',')
    for (var i = 0; i < candidates.length; i++) {
        var match = candidates[i].match(/q=([0-9].[0-9])/)
        var likelihood = match ? match[1] : 0.0
        match = candidates[i].match(/-([^;]*)/)
        if (match)
            regions.push(match[1])
        match = candidates[i].match(/(.*)[;||-]/)
        var lang = match ? match[1] : ''
        var newLang = { lang: lang, likelihood: likelihood }
        if (newLang.likelihood > prefered.likelihood)
            prefered = newLang
        if (likelihood > 0.0)
            langs.push(newLang)
    }

    request.getRegions = function () { return regions }
    request.getLanguages = function () { return langs }
    request.getLikelyLanguage = function () { return prefered.lang }

    if (typeof next === 'function')
        next()
}