var gulp = require("gulp");

var sass = require("gulp-sass");

var  tools ={
    sequence: require("run-sequence"),
    del: require("del"), 
    browserSync: require("browser-sync"),
    sourceMaps: require("gulp-sourcemaps"),
    autoprefixer: require("gulp-autoprefixer"),
}

var min ={
    cleanCSS: require("gulp-clean-css"),
    uglify: require("gulp-uglify"),
    imagemin: require("gulp-imagemin"),
    htmlMin: require("gulp-htmlmin"),
    htmlReplace: require("gulp-html-replace"),
    concat: require("gulp-concat"),
    changed: require("gulp-changed"),
}

var config ={
    build: "build/",
    src: "src/",    
    dellFromBuild: ["build/js", "build/css", "build/*.html"],
    supportBrowsers: ["> 1%"],
    // SCSS
    scss: "src/scss/**/*.scss",
    scssOut: "src/css",
    //HTML
    htmlIn: "src/*.html",
    cssNameOut: "style.css",
    
    //CSS
    cssIn: "src/css/**/*.css",
    cssOut: "build/css", 
    libreCssIn: ["node_modules/bootstrap/dist/css/bootstrap.min.css", "node_modules/bootstrap/dist/css/bootstrap-theme.css"],
    //JS
    jsIn: ["src/js/**/*.js", ["node_modules/bootstrap/dist/js/bootstrap.min.js", "node_modules/jquery/dist/jquery.min.js"]], // 0 = pliki projektu 1= tablica z bibliotekami
    jsNameOut: ["app.js", "assets.js"], // 0= nazwa pliku projektu 1 = nazwa pliku bibliotek
     jsOut: "build/js",
    //IMG
    imgIn: "src/img/**/*.{jpg, jpeg, png, gif}" ,
    imgOut: "build/img",
    imgNotMinIn: "src/img/**/*.svg",
    imgNotMinOut: "build/img/",
}

gulp.task('reload', function () { 
    tools.browserSync.reload();
}); //funkcjia przeładowania strony

gulp.task('serve', ["sass"], function () { 
    tools.browserSync({
        server: "src"
    });
    gulp.watch(config.htmlIn).on('change', tools.browserSync.reload);
    gulp.watch(config.scss, ["sass"]);
}); // funkcjia browser-sync +sass

gulp.task("sass", function () { 

    return gulp.src(config.scss)
        .pipe(tools.sourceMaps.init()) // pobiera mape
        .pipe(sass().on('error', sass.logError))
    .pipe(tools.autoprefixer({
        browsers: config.supportBrowsers // ustalasz jaki zakres przeglądarek ma obsługiwać projekt
    }))
        .pipe(tools.sourceMaps.write()) // zapisuje mape 
        .pipe(gulp.dest(config.scssOut))
        .pipe(tools.browserSync.stream());
}) // funkcjie konwertująca sass na css

gulp.task("cssMin", ["copyCssLibre"], function(){
    return gulp.src(config.cssIn)
    .pipe(min.concat(config.cssNameOut))
    .pipe(min.cleanCSS())
    .pipe(gulp.dest(config.cssOut));
})//minifikacjia css 

gulp.task("jsMin", ["jsLibreMin"], function(){
    return gulp.src(config.jsIn[0])
    .pipe(min.concat(config.jsNameOut[0]))
    .pipe(min.uglify())
    .pipe(gulp.dest(config.jsOut));
    
    
})//minifikacjia js Assets.js i app.js

gulp.task("jsLibreMin", function(){
    return gulp.src(config.jsIn[1])
    .pipe(min.concat(config.jsNameOut[1]))
    .pipe(min.uglify())
    .pipe(gulp.dest(config.jsOut));
    
    
})//minifikacjia js Assets.js i app.js

gulp.task("imgMin", ["copyNotMin"], function(){
    return gulp.src(config.imgIn)
    .pipe(min.changed(config.imgOut)) 
    .pipe(min.imagemin())
    .pipe(gulp.dest(config.imgOut))
}) // minifikacjia obrazów 

gulp.task("copyNotMin", function(){
   return gulp.src(config.imgNotMinIn)
       .pipe(gulp.dest(config.imgNotMinOut)); 
})

gulp.task("minHTML", function(){
    return gulp.src(config.htmlIn)
    .pipe(min.htmlReplace({
        "css": "css/style.css",
        "js": "js/assets.js",
        "js2": "js/app.js"
    }))
    .pipe(min.htmlMin({
        sortAtributes: true,
        sortClassName: true,
        collapseWhitespace: true,
    }))
    .pipe(gulp.dest(config.build))
})// minifikacjia pliku html

gulp.task("clean", function(){
    return tools.del(config.dellFromBuild);
}) //usuwanie starej wersji produkcyjnej 

gulp.task("copyCssLibre", function (){
    return gulp.src(config.libreCssIn)
       .pipe(gulp.dest(config.cssOut)); 
})

gulp.task("build", function() {
tools.sequence(["clean", "sass"], [ "cssMin", "imgMin", "minHTML", "jsMin"]);
}); // funkcjia budowania aplikacji 

gulp.task("default", ["serve"], function() {
    return gulp.src(config.libreCssIn)
       .pipe(gulp.dest("src/"))
}); //funkcjia domyślna ładowana przy starcie