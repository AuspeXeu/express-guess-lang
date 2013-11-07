var egl = exports

egl.init = function (opts) {
    var defaultLang = (opts && opts.defaultLanguage) ? opts.defaultLanguage : 'en'
    var defaultRegion = (opts && opts.defaultRegion) ? opts.defaultRegion : 'US'

    return function (request, response, next) {
        var accept_lang = request.headers['accept-language'],
            regions = [],
            languages = [],
            lookup = {},
            likely = { name: 'en', likelihood: 0.0 }
        if (typeof accept_lang === 'string') {
            accept_lang = accept_lang.replace(/\s/g, '')
            var candidates = accept_lang.split(',')
            for (var i = 0; i < candidates.length; i++) {
                var matches = candidates[i].match(/([^-;]*)(?:-([^;]*))?(?:;q=([0-9]\.[0-9]))?/)
                if (matches[2])
                    regions.push(matches[2])
                var newLang = { name: matches[1], likelihood: matches[3] ? matches[3] : 1.0 }
                languages.push(newLang)
                lookup[newLang.name] = newLang.likelihood
                if (newLang.likelihood > likely.likelihood)
                    likely = newLang
            }
        }
        else {
            likely = { name: defaultLang, likelihood: 1.0 }
            regions = [ defaultRegion ]
            languages = [ likely ]
        }

        request.getRegions = function () { return regions }
        request.getLanguages = function () { return languages }
        request.getLikelyLanguage = function () { return likely.name }
        request.isAppropriate = function (name) { return (typeof lookup[name] !== 'undefined') }

        if (typeof next === 'function')
            next()
    }
}