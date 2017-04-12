var main_folder = './src/';

var jsFiles = 'app/js/**/*.js';
var tsFiles = '/app/ts/**/*.ts';
var lessFiles = 'app/less/**/*.less';
var jsDest = 'public/js';
var tsDest = 'public/ts';
var cssDest = 'public/css';

var BROWSER_SYNC_RELOAD_DELAY = 500;

var gulp = require('gulp');
var path = require("path");
var runSequence = require('run-sequence');

var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var nodemon = require('gulp-nodemon');
var watch = require('gulp-watch');
var less = require('gulp-less');
var inject = require('gulp-inject');
var clean = require('gulp-clean');
var browserSync = require('browser-sync');

const typescript = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const tscConfig = require('./src/tsconfig.json');

gulp.task('style',function() {
    return gulp.src(main_folder + jsFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {
            verbose:true
        }))
        .pipe(jscs())
        .pipe(gulp.dest(main_folder + jsDest));
});

gulp.task('inject', function () {
    var target = gulp.src(main_folder + 'index.html');
    // It's not necessary to read the files (will speed up things), we're only after their paths:
    //var sources = gulp.src(['./src/**/*.js', './src/**/*.css'], {read: false});
    //var sources = gulp.src([main_folder + jsDest + '/*.js', main_folder + cssDest + '/*.css'], {read: false});
    var sources = gulp.src([__dirname + '/' + main_folder + jsDest + '/*.js', __dirname + '/' + main_folder + cssDest + '/*.css'], {read: false, cwd : __dirname + '/src/'});

    return target.pipe(inject(sources))
        .pipe(gulp.dest(main_folder));
});


gulp.task('scripts', function() {
    var concat = require('gulp-concat');
    var uglify = require('gulp-uglify');
    var rename = require('gulp-rename');
    return gulp.src([main_folder + jsDest + '/*.js'])
        .pipe(concat('scripts.js'))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(main_folder + '/public/merge_scripts/'));
});

gulp.task('less', function() {
    // gulp.src(main_folder + cssDest + '/*.css').pipe(clean());
    gulp.src(main_folder + lessFiles)
        .pipe(less())
        .pipe(gulp.dest(main_folder + cssDest));
    //.pipe(webserver.reload());
});

// gulp.task('compile-typescript', ['clean'], function () {
gulp.task('compile-typescript', function () {
    return gulp.src(main_folder + tsFiles)
        .pipe(sourcemaps.init())
        .pipe(typescript(tscConfig.compilerOptions))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(main_folder + tsDest));
});

gulp.task('watch', function () {
    var watcher = gulp.watch('src/app/**/*.*');

    watcher.on('change', function (event) {
        if (event.type === 'deleted') {
            console.log('file-deleted');
            // Simulating the {base: 'src'} used with gulp.src in the scripts task
            var filePathFromSrc = path.relative(path.resolve('src/app'), event.path);
            // // Concatenating the 'build' absolute path used by gulp.dest in the scripts task
            var destFilePath = path.resolve('src/public', filePathFromSrc);
            // console.log(filePathFromSrc);
            // console.log(destFilePath);
            //
            if(destFilePath.indexOf('less') > -1) {
                destFilePath = destFilePath.replace(/less/g,'css');
            }
            console.log(destFilePath);
            // del.sync(destFilePath);
            gulp.src(destFilePath)
                .pipe(clean());

            runSequence('style','less','inject','reload-browser');
        }
        if (event.type === 'changed') {
            var tasks = [];
            // console.log(event.path);
            // console.log(path.extname(event.path));
            if (path.extname(event.path) === '.js' && !~tasks.indexOf('style')) tasks.push('style')
            if (path.extname(event.path) === '.js' && !~tasks.indexOf('scripts')) tasks.push('scripts')
            if (path.extname(event.path) === '.js' && !~tasks.indexOf('inject')) tasks.push('inject')
            if (path.extname(event.path) === '.less' && !~tasks.indexOf('less')) tasks.push('less')
            if (path.extname(event.path) === '.less' && !~tasks.indexOf('inject')) tasks.push('inject')
            if (path.extname(event.path) === '.ts' && !~tasks.indexOf('compile-typescript')) tasks.push('compile-typescript')
            tasks.push('reload-browser')
            runSequence.apply(this,tasks);
        }
    });
});


gulp.task('reload-browser',function(){
    setTimeout(function reload() {
        browserSync.reload({
            stream: false   //
        });
    }, BROWSER_SYNC_RELOAD_DELAY);
})

gulp.task('nodemon',['style','inject','scripts', 'less', 'compile-typescript', 'watch'],function() {
    var called = false;
    var options = {
        script: 'app.js',
        ext: 'js css ts',
        delayTime: 1,
        env: {
            'PORT':3000,
            env: { 'NODE_ENV': 'development' }
        },
        // ignore: ['public/merge_scripts/*.js','var/'],
        // tasks: ['style','scripts','inject'],
        // tasks: function (changedFiles) {
        //     var tasks = [];
        //     changedFiles.forEach(function (file) {
        //         if (path.extname(file) === '.js' && !~tasks.indexOf('style')) tasks.push('style')
        //         if (path.extname(file) === '.js' && !~tasks.indexOf('scripts')) tasks.push('scripts')
        //         if (path.extname(file) === '.js' && !~tasks.indexOf('inject')) tasks.push('inject')
        //         if (path.extname(file) === '.less' && !~tasks.indexOf('less')) tasks.push('less')
        //         if (path.extname(file) === '.less' && !~tasks.indexOf('inject')) tasks.push('inject')
        //         if (path.extname(file) === '.ts' && !~tasks.indexOf('compile-typescript')) tasks.push('compile-typescript')
        //     });
        //     return tasks;
        // },
        // tasks : runSequence('reload-browser'),
        watch: ['app.js']
    };

    var stream =  nodemon(options)
        // .on('start', function onStart() {
        //     console.log('onStart Nodemon...');
        //     // ensure start only got called once
        //     if (!called) { cb(); }
        //     called = true;
        // })
        .on('restart', function onRestart() {
            console.log('onRestart Nodemon...');
            // reload connected browsers after a slight delay
            // runSequence('reload-browser');
            setTimeout(function reload() {
                browserSync.reload({
                    stream: false   //
                });
            }, BROWSER_SYNC_RELOAD_DELAY);
        })
        .on('crash', function() {
            console.error('Application has crashed!\n')
            stream.emit('restart', 10)  // restart the server in 10 seconds
        });

    // return stream;
});

gulp.task('browser-sync', ['nodemon'], function () {

    // for more browser-sync config options: http://www.browsersync.io/docs/options/
    browserSync.init({

        // watch the following files; changes will be injected (css & images) or cause browser to refresh
        files: ['app.js'],

        // informs browser-sync to proxy our expressjs app which would run at the following location
        proxy: 'http://localhost:3000',

        // informs browser-sync to use the following port for the proxied app
        // notice that the default port is 3000, which would clash with our expressjs
        port: 4000
    });
});

gulp.task('default', [
    'browser-sync'
    // 'serve',
    // 'less',
    // 'watch-less',
    // 'watch-css-new-files',
    // 'index-inject',
    // 'js-compress',
    // 'watch-new-js-files',
    // 'watch-new-min-js-files',
    // 'copy:libs',
    // 'compile-typescript'
]);

// gulp.task('watch-public', function() {
//     gulp.watch(['public/', '!public/merge_scripts/*.js'], ['scripts']);
// });