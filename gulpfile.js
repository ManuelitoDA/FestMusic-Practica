// function task(done) {
//     console.log('mi primer tarea')

//     done()
// }

// exports.tarea = task

const { src, dest, watch, parallel } = require('gulp')

//CSS
const sass = require('gulp-sass')(require('sass'))
const plumber = require('gulp-plumber')
const autoPrefixer = require('autoprefixer')
const cssnano = require('cssnano')
const postcss = require('gulp-postcss')
const sourceMaps = require('gulp-sourcemaps')

//Imagenes
const cache = require('gulp-cache')
const imagemin = require('gulp-imagemin')
const webp = require('gulp-webp')
const avif = require('gulp-avif')

//Javascript
const terser = require('gulp-terser-js')

function css(done) {
    src('./src/scss/**/*.scss') //identificar el archivo SASS
        .pipe(sourceMaps.init())
        .pipe(plumber())
        .pipe(sass()) //Compilar
        .pipe(postcss([autoPrefixer(), cssnano()]))
        .pipe(sourceMaps.write('.'))
        .pipe(dest('./build/css')) //Almacenarlo en el disco duro
    done() //callback que avisa a gulp cuando termina la tarea
}

function imagenes(done) {
    const config = {
        optimizationLevel: 3
    }
    src('./src/img/**/*.{jpg,png}')
        .pipe(cache(imagemin(config)))
        .pipe(dest('./build/img'))

    done()
}

function versionWebp(done) {
    const config = {
        quality: 50
    }
    src('./src/img/**/*.{png,jpg}')
        .pipe(webp(config))
        .pipe(dest('./build/img'))

    done()
}

function versionAvif(done) {
    const config = {
        quality: 50
    }
    src('./src/img/**/*.{png,jpg}')
        .pipe(avif(config))
        .pipe(dest('./build/img'))

    done()
}

function javascript(done) {
    src('./src/js/**/*.js')
        .pipe(sourceMaps.init())
        .pipe(terser())
        .pipe(sourceMaps.write('.'))
        .pipe(dest('./build/js'))

    done()
}

function dev(done) {
    watch('./src/scss/**/*.scss', css)
    watch('./src/js/**/*.js', javascript)

    done()
}

exports.css = css
exports.js = javascript
exports.imagenes = imagenes
exports.versionWebp = versionWebp
exports.versionAvif = versionAvif
exports.dev = parallel(imagenes, versionWebp, versionAvif, javascript, dev)