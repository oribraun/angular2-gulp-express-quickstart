# angular2-gulp-express-quickstart

* install node.js git npm
* npm install -g typescript
* open in target folder cmd
* npm init
* npm install --save @angular/common @angular/compiler @angular/core @angular/forms @angular/http @angular/platform-browser
* npm install --save @angular/platform-browser-dynamic @angular/router angular-in-memory-web-api systemjs core-js rxjs zone.js
* npm install --save-dev gulp gulp-jshint gulp-jscs gulp-nodemon gulp-watch jshint-stylish gulp-concat gulp-uglify gulp-rename
* npm install --save-dev gulp-less
* npm install --save gulp-typescript gulp-sourcemaps gulp-inject
* npm install --save express
* npm install --save path
* npm install --save-dev gulp-clean
* npm install --save body-parser

* npm install --save typescript
* npm prune - to remove all packages not listed in package.json file
* run in cmd the command gulp



steps guide
*******************************
1. npm init for creating json package file
2. npm install express --save the --save is to save express setting in json package file
3. express ^4.31.3 means it will update the version 4.xx.x when you will do npm install express OR npm update but it is risky
   you can do ~4.13.3 and it means it will update only 4.13.x also you can just put the number 4.13.3 and it will not update

*******************************
express setup
*******************************
1. look at app.js file

*******************************
bower setup - version control for app
*******************************
1. npm install bower -g -g means globally to access from command line
2. create file .bowerrc with object directory location to install
3. bower install --save bootsrtap
4. bower install --save font-awesome

*******************************
gulp install - task control for app
*******************************
1. add .jscsrc and .jshintrc files from 'https://github.com/jonathanfmills/CodingStandards' to the project to check js standards
2. npm install gulp -g // -g means global
3. npm install gulp --save-dev // only for develop mode
4. create gulpfile.js file
5. npm install --save gulp-jshint gulp-jscs jshint-stylish --save-dev // for style task
6. running 'gulp style' is checking style issues
7. npm install wiredep --save-dev // for inject task
8. adding overrides to bower,json file to fix wiredep inject for bootstrap and font-awesome
9. npm install --save-dev gulp-inject // for injectint our js and css files

*******************************
nodemon install - watcher for files changes to auto restart node server
*******************************
1. npm install --save-dev gulp-nodemon
2. look at gulp serve task in gulpfile.js
3. start app.js with 'gulp serve' command

*******************************
template engine Jade example // Pug not supported yes by wiredep
*******************************
1. in app.js add 'app.set('views','./src/views');
                  app.set('view engine','jade');'
2. npm install --save jade
3.
