/**
 * Created by ori on 4/12/2017.
 */
/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
// for npm start :
var folder = 'npm:';
// for gulp
// folder = 'public/lib/';
(function (global) {
    System.config({
        //baseURL: '/src',
        paths: {
            // paths serve as alias
            //"*": "*.js",
            'npm:': 'node_modules/'
        },
        // map tells the System loader where to look for things
        map: {
            // our app is within the app folder
            'app': 'public/ts',
            'jquery': '//code.jquery.com/jquery-2.1.4.min.js',
            // angular bundles
            '@angular/core': folder + '@angular/core/bundles/core.umd.js',
            '@angular/common': folder + '@angular/common/bundles/common.umd.js',
            '@angular/compiler': folder + '@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': folder + '@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': folder + '@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': folder + '@angular/http/bundles/http.umd.js',
            '@angular/router': folder + '@angular/router/bundles/router.umd.js',
            '@angular/forms': folder + '@angular/forms/bundles/forms.umd.js',

            // other libraries
            'rxjs':                      folder + 'rxjs',
            'angular-in-memory-web-api': folder + 'angular-in-memory-web-api/bundles/in-memory-web-api.umd.js'
        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            app: {
                defaultExtension: 'js',
                meta: {
                    './*.js': {
                        loader: 'public/systemjs-angular-loader.js'
                    }
                }
            },
            rxjs: {
                defaultExtension: 'js'
            }
        }
    });
})(this);
