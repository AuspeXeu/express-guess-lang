var egl = exports

egl.init = function (opts) {
    var defaultLang = (opts && opts.defaultLanguage) ? opts.defaultLanguage : 'en'
    var defaultRegion = (opts && opts.defaultRegion) ? opts.defaultRegion : 'US'

    return function (request, response, next) {
        var accept_lang = request.headers['accept-language'],
            regions = [],
            langs = [],
            likely = { lang: 'en', likelihood: 0.0}
        if (typeof accept_lang === 'string') {
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
                if (newLang.likelihood > likely.likelihood)
                    likely = newLang
                if (likelihood > 0.0)
                    langs.push(newLang)
            }

            request.getRegions = function () { return regions }
            request.getLanguages = function () { return langs }
            request.getLikelyLanguage = function () { return likely.lang }
        }
        else {
            request.getRegions = function () { return [ defaultRegion ] }
            request.getLanguages = function () { return [{ lang: defaultLang, likelihood: 0.0 }] }
            request.getLikelyLanguage = function () { return defaultLang }
        }

        if (typeof next === 'function')
            next()
    }
}