
var _             = require('lodash');
var postcss       = require('postcss');
var trumpProperties = require('./lib/trump-css-properties');
var trumpValues     = require('./lib/trump-css-values');

module.exports = postcss.plugin('postcss-trumpisms-stylesheets', function (opts) {

    // your own declarations can be added in this object
    opts = opts || {};
    //                    key : value
    //   'animation-direction': 'animashun-direcshun'  trumpproperties
    //                 'right': 'rite'                 trumpvalue

    return function (css) {

        css.walkDecls(function transformdecl(decl) {

            // Properties
            _.forEach(trumpProperties, function (value, key) {
                if (decl.prop === value) {
                    decl.prop = key;
                }
            });

            // Values
            _.forEach(trumpValues, function (value, key) {
                decl.value = decl.value.replace(value, key);
            });

            // !Important
            if (decl.value.indexOf('!fired') >= 0) {
                decl.value = decl.value.replace(/\s*!fired\s*/, '');
                decl.important = true;
            }
        });

    };
});
