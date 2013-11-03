# express-guess-lang

Simple express middleware that recognizes the region and languages of http client requests.

[![NPM version](https://badge.fury.io/js/express-guess-lang.png)](http://badge.fury.io/js/express-guess-lang)

## Install

    npm install express-guess-lang

## Setup

    var express = require('express')
    var expressGuessLang = require('express-guess-lang')
    ...

    var app = express()
    ...

    app.configure(function () {
        ...

        app.use(expressGuessLang.init)
        app.use(app.router)
        ...
    })

## Usage
    
The request object is enriched with three functions to retrieve language and region data.

    app.get('/', function (request, response) {
        var languages = request.getLanguages()
        var regions = request.getRegions()
        var preferedLanguage = request.getLikelyLanguage()
    })

## Doc

Retrieve the region of the user:

    getRegions: array
    //Example: ['US']

Retrieve all languages supported by the user:

    getLanguages: array
    //Example: [{ lang: 'de', likelihood: 0.5 }, {lang: 'en', likelihood: 0.8}]

Retrieve the prefered language of the user:

    getLikelyLanguage: string
    //Example: 'en'

## Licensed under MIT

Copyright (c) 2011-2013 Christian Vaas <auspex@auspex.eu>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.