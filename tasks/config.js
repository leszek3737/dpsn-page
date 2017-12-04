module.exports = {
    glob: {
        src: "./src/**/*",
        scss: './src/**/*.scss',
        js: './src/**/*.js',
        html: './src/**/*.html',
        fonts: './src/fonts/**/*',
        img: './src/img/**/*',
    },
    entryPoint: {
        scss: './src/scss/style.scss'
    },
    path: {
        css: './dist/css/',
        js: './dist/js/',
        dist: './dist/',
        fonts: './dist/fonts/',
        vector: './dist/img/',
        img: './dist/img/',
    },
    concatOrder: {
        js: './src/**/*.js',
        jsLib: [
            "node_modules/jquery/dist/jquery.min.js",
           "node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js",
      ]
    },
    name: {
        js: "app.js",
        jsMin: "app.min.js",
        jsMinLib: "assets.min.js",
        css: "app.css",
        cssMin: "app.min.css",
    }
};
