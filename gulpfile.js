'use strict';



/////////////////////////////////////////////////////////////////////////////
// GULP PLUGINS
var gulp = require('gulp'),
    watch = require('gulp-watch'),
    autoprefix = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    minifyCss = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rigger = require('gulp-rigger'),
    ignore = require('gulp-ignore'),
    image = require('gulp-image'),
    rimraf = require('gulp-rimraf'),
    browserSync = require("browser-sync"),
    concatCss = require('gulp-concat-css'),
    uglify = require('gulp-uglify'),
    
    copy = require('gulp-contrib-copy'),
    reload = browserSync.reload;



/////////////////////////////////////////////////////////////////////////////
// GULP PATHS
var path = {
    src: {
        version_html: 'src/version_html/**/*.*',
        version_angular: 'src/app/**/*.*',
        img: 'src/assets/common/img/**/*.*',
        fonts: 'src/assets/common/fonts/*.*',
        css: 'src/assets/common/css/*.scss',
        js: 'src/assets/common/js/**/*.*',
        vendors_bower: 'src/assets/vendors/bower/**/*.*',
        vendors_manual: 'src/assets/vendors/manual/**/*.*',
        vendor_css:[
        'src/assets/vendors/bower/bootstrap/dist/css/bootstrap.min.css',
        'src/assets/vendors/bower/jscrollpane/style/jquery.jscrollpane.css',
        'src/assets/vendors/bower/ladda/dist/ladda-themeless.min.css',
        'src/assets/vendors/bower/select2/dist/css/select2.min.css',
        'src/assets/vendors/bower/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css',
        'src/assets/vendors/bower/fullcalendar/dist/fullcalendar.min.css',
        'src/assets/vendors/manual/cleanhtmlaudioplayer/src/player.css',
        'src/assets/vendors/manual/cleanhtmlvideoplayer/src/player.css',
        'src/assets/vendors/bower/bootstrap-sweetalert/dist/sweetalert.css',
        'src/assets/vendors/bower/summernote/dist/summernote.css',
        'src/assets/vendors/bower/owl.carousel/dist/assets/owl.carousel.min.css',
        'src/assets/vendors/bower/ionrangeslider/css/ion.rangeSlider.css',
        'src/assets/vendors/bower/datatables/media/css/dataTables.bootstrap4.min.css',
        'src/assets/vendors/bower/c3/c3.min.css',
        'src/assets/vendors/bower/chartist/dist/chartist.min.css',
        'src/assets/vendors/bower/nprogress/nprogress.css',
        'src/assets/vendors/bower/jquery-steps/demo/css/jquery.steps.css',
        'src/assets/vendors/bower/bootstrap-select/dist/css/bootstrap-select.min.css',
        'src/assets/vendors/bower/dropify/dist/css/dropify.min.css'
        ],
        vendor_js:[
        'src/assets/vendors/bower/jquery/jquery.min.js',
        'src/assets/vendors/bower/tether/dist/js/tether.min.js',
        'src/assets/vendors/bower/bootstrap/dist/js/bootstrap.min.js',
        'src/assets/vendors/bower/jquery-mousewheel/jquery.mousewheel.min.js',
        'src/assets/vendors/bower/jscrollpane/script/jquery.jscrollpane.min.js',
        'src/assets/vendors/bower/spin.js/spin.js',
        'src/assets/vendors/bower/ladda/dist/ladda.min.js',
        'src/assets/vendors/bower/select2/dist/js/select2.full.min.js',
        'src/assets/vendors/bower/html5-form-validation/dist/jquery.validation.min.js',
        'src/assets/vendors/bower/jquery-typeahead/dist/jquery.typeahead.min.js',
        'src/assets/vendors/bower/jquery-mask-plugin/dist/jquery.mask.min.js',
        'src/assets/vendors/bower/autosize/dist/autosize.min.js',
        'src/assets/vendors/bower/bootstrap-show-password/bootstrap-show-password.min.js',
        'src/assets/vendors/bower/moment/min/moment.min.js',
        'src/assets/vendors/bower/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js',
        'src/assets/vendors/bower/fullcalendar/dist/fullcalendar.min.js',
        'src/assets/vendors/manual/cleanhtmlaudioplayer/src/jquery.cleanaudioplayer.js',
        'src/assets/vendors/manual/cleanhtmlvideoplayer/src/jquery.cleanvideoplayer.js',
        'src/assets/vendors/bower/bootstrap-sweetalert/dist/sweetalert.min.js',
        'src/assets/vendors/bower/remarkable-bootstrap-notify/dist/bootstrap-notify.min.js',
        'src/assets/vendors/bower/summernote/dist/summernote.min.js',
        'src/assets/vendors/bower/owl.carousel/dist/owl.carousel.min.js',
        'src/assets/vendors/bower/ionrangeslider/js/ion.rangeSlider.min.js',
        'src/assets/vendors/bower/nestable/jquery.nestable.js',
        'src/assets/vendors/bower/datatables/media/js/jquery.dataTables.min.js',
        'src/assets/vendors/bower/datatables/media/js/dataTables.bootstrap4.min.js',
        'src/assets/vendors/bower/datatables-fixedcolumns/js/dataTables.fixedColumns.js',
        'src/assets/vendors/bower/datatables-responsive/js/dataTables.responsive.js',
        'src/assets/vendors/manual/editable-table/mindmup-editabletable.js',
        'src/assets/vendors/bower/d3/d3.min.js',
        'src/assets/vendors/bower/c3/c3.min.js',
        'src/assets/vendors/bower/chartist/dist/chartist.min.js',
        'src/assets/vendors/bower/peity/jquery.peity.min.js',
        'src/assets/vendors/bower/chartist-plugin-tooltip/dist/chartist-plugin-tooltip.min.js',
        'src/assets/vendors/bower/gsap/src/minified/TweenMax.min.js',
        'src/assets/vendors/manual/hackertyper/hackertyper.js',
        'src/assets/vendors/bower/jquery-countTo/jquery.countTo.js',
        'src/assets/vendors/bower/nprogress/nprogress.js',
        'src/assets/vendors/bower/jquery-steps/build/jquery.steps.min.js',
        'src/assets/vendors/bower/bootstrap-select/dist/js/bootstrap-select.min.js',
        'src/assets/vendors/bower/dropify/dist/js/dropify.min.js'        
        ],
        angular_src:[
        'src/assets/vendors/bower/angular/angular.min.js',
        'src/assets/vendors/bower/angular-route/angular-route.min.js'
        ]

    },
    build: {
        version_html: 'build/version_html/',
        version_angular: 'build/',
        img: 'build/assets/common/img/',
        fonts: 'build/assets/common/fonts/',
        css: 'build/assets/common/css',
        cssSource: 'build/assets/common/css/source',
        js: 'build/assets/common/js',
        vendors: 'build/assets/vendors'
    },
    watch: {
        templates: 'src/templates/**/*.html',
        version_html: 'src/version_html/**/*.*',
        version_angular: 'src/app/**/*.*',
        img: 'src/assets/common/img/**/*.*',
        fonts: 'src/assets/common/fonts/**/*.*',
        css: 'src/assets/common/css/**/*.scss',
        js: 'src/assets/common/js/**/*.*',
        vendors: 'src/assets/vendors/**/*.*'
    },
    clean: ['build/assets', 'build/version_angular', 'build/version_html']
};



/////////////////////////////////////////////////////////////////////////////
// PRINT ERRORS
function printError(error) {
    console.log(error.toString());
    this.emit('end');
}



/////////////////////////////////////////////////////////////////////////////
// BROWSERSYNC SERVE
var config = {
    server: {
        baseDir: "./build"
    },
    files: ['./build/**/*'],
    tunnel: false,
    host: 'localhost',
    port: 9000,
    logPrefix: "WishcopAdmin",
    watchTask: true
};

gulp.task('serve', function () {
     browserSync(config);
    setTimeout(function () {
       
    }, 8000)
});



/////////////////////////////////////////////////////////////////////////////
// VERSION_HTML BUILD
// gulp.task('version_html:build', function () {
//     return gulp.src(path.src.version_html)
//         .pipe(ignore.exclude(['_header.html', '_footer.html', '_top-menu.html', '_left-menu.html']))
//         .pipe(rigger())
//         .on('error', printError)
//         .pipe(gulp.dest(path.build.version_html))
//         .pipe(reload({stream: true}));
// });



/////////////////////////////////////////////////////////////////////////////
// VERSION_ANGULAR BUILD
gulp.task('version_angular:build', function () {
    return gulp.src(path.src.version_angular)
        .pipe(ignore.exclude(['_header.html', '_footer.html', '_top-menu.html', '_left-menu.html', '_subfooter.html']))
        //.pipe(rigger())
        //.on('error', printError)
        .pipe(gulp.dest(path.build.version_angular))
        //.pipe(reload({stream: true}));
});
gulp.task('cont:build', function () {
    return gulp.src('src/app/**/*.js')
        .pipe(concat("app.min.js"))
        .pipe(gulp.dest('build/assets'))
        .pipe(reload({stream: true}))
});
// gulp.task('compress', function (cb) { 
//         gulp.src('src/**/*.js')
//         .pipe(uglify())        
//         .pipe(gulp.dest('build/assets/common/js/app.min.js'))   

// });

/////////////////////////////////////////////////////////////////////////////
// VENDORS BUILD
gulp.task('vendors:bower:build', function() {
    return gulp.src(path.src.vendors_bower)
        .pipe(gulp.dest(path.build.vendors))
});
gulp.task('vendors:manual:build', function() {
    return gulp.src(path.src.vendors_manual)
        .pipe(gulp.dest(path.build.vendors))
});


/////////////////////////////////////////////////////////////////////////////
// JAVASCRIPT BUILD
gulp.task('js:build', function () {
    return gulp.src(path.src.js)
        .pipe(gulp.dest(path.build.js))
      //  .pipe(reload({stream: true}));
});

gulp.task('js_vendor:build', function () {
    return gulp.src(path.src.vendor_js)
        .pipe(concat("external.js"))
        .pipe(gulp.dest(path.build.js))
       // .pipe(reload({stream: true}))
});

gulp.task('js_angular:build', function () {
    return gulp.src(path.src.angular_src)
        .pipe(concat("angular.min.js"))
        .pipe(gulp.dest(path.build.js))
      //  .pipe(reload({stream: true}))
});

/////////////////////////////////////////////////////////////////////////////
// STYLES BUILD
gulp.task('css:build', function () {
    return gulp.src(path.src.css)
        .pipe(sass({outputStyle: 'expanded', indentWidth: 4}))
        .on('error', printError)
        .pipe(autoprefix({
            browsers: ['last 30 versions', '> 1%', 'ie 9'],
            cascade: true
        }))
        .pipe(ignore.exclude('*.scss'))
        .pipe(gulp.dest(path.build.css))
        .pipe(minifyCss())
        .pipe(concat('main.css'))
        .pipe(rename({ extname: '.min.css'}))
        .pipe(gulp.dest(path.build.css))
       // .pipe(reload({stream: true}))
});
gulp.task('css_vendor:build', function () {
    return gulp.src(path.src.vendor_css)        
        .pipe(concatCss("external.css"))
        .pipe(gulp.dest(path.build.cssSource))
      //  .pipe(reload({stream: true}))
});



/////////////////////////////////////////////////////////////////////////////
// IMAGES BUILD
gulp.task('img:build', function (cb) {
    gulp.src(path.src.img)
        .pipe(image())
        .on('error', printError)
        .pipe(gulp.dest(path.build.img))
        .on('end', cb)
});



/////////////////////////////////////////////////////////////////////////////
// FONTS BUILD
gulp.task('fonts:build', function() {
    return gulp.src(path.src.fonts)  
	.pipe(gulp.dest(path.build.fonts))
});



/////////////////////////////////////////////////////////////////////////////
// BUILD ALL
gulp.task('build', [
    //'version_html:build',
    'version_angular:build',
    'fonts:build',
    'img:build',
    'css:build',
    'css_vendor:build',
    'js:build',
   // 'js_angular:build',
    'js_vendor:build',
    'vendors:bower:build',
    'vendors:manual:build',
    'cont:build'
  
]);


/////////////////////////////////////////////////////////////////////////////
// WATCH ALL
gulp.task('watch', function(){
    watch([path.watch.templates], function(event, cb) {
      //  gulp.start('version_html:build');
        gulp.start('version_angular:build');
    });
    watch([path.watch.version_html], function(event, cb) {
      //  gulp.start('version_html:build');
    });
    watch([path.watch.version_angular], function(event, cb) {
        gulp.start('version_angular:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('img:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
    watch([path.watch.css], function(event, cb) {
        gulp.start('css:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start(['js:build']);
        
    });
    watch([path.watch.version_angular], function(event, cb) {
        gulp.start(['cont:build']);
    });
    watch([path.watch.vendors], function(event, cb) {
      //  gulp.start('vendors:bower:build');
      //  gulp.start('vendors:manual:build');
    });
});



/////////////////////////////////////////////////////////////////////////////
// CLEAN PRODUCTION
gulp.task('clean', function () {
    return gulp.src(path.clean)
        .pipe(rimraf())
});



/////////////////////////////////////////////////////////////////////////////
// DEFAULT TASK
gulp.task('default', ['build', 'serve', 'watch']);

