const {src, dest, watch,series} =  require('gulp');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const wait = require('gulp-wait');
const autoprefixer = require('gulp-autoprefixer');
const minify = require('gulp-minify');
const htmlmin = require('gulp-htmlmin');
const tinypng = require('gulp-tinypng-compress');



// Compile sass into CSS & auto-inject into browsers
function servSass() {
  return src("./sass/**/*.sass", "./sass/**/*.scss")
      .pipe(wait(400))
      .pipe(sass())
      // .pipe(autoprefixer({
      //   cascade: false
      // }))
      .pipe(dest("./css"))
      .pipe(browserSync.stream());
}

// Static server
function bs() {
  servSass ();
  browserSync.init({
      server: {
          baseDir: "./"
      }
  });
  watch("./*.html").on('change', browserSync.reload);
  watch("./sass/**/*.sass").on('change', servSass);
  watch("./sass/**/*.scss").on('change', servSass);
  watch("./js/*.js").on('change', browserSync.reload);
}


function minifyCss() {
  return src('css/*.+(css|!min.css)')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(dest('dist/'));
}

// gulp.task('minify-css', () => {
//   return gulp.src('css/*.+(css|!min.css)')
//     .pipe(cleanCSS({compatibility: 'ie8'}))
//     .pipe(rename({
//       suffix: '.min'
//     }))
//     .pipe(gulp.dest('dist/'));
// });
//

function buildCSS(done) {
  src('css/*.+(css|!min.css)')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    // .pipe(rename({
    //   suffix: '.min'
    // }))
    .pipe(dest('dist/css/'));
  done();
}

function buildJS(done) {
  src(['js/**.js','!js/**.min.js'])
    .pipe(minify({ext:{
          min:'.js'
        }
     }))
    .pipe(dest('dist/js/'));

  src('js/**.min.js').pipe(dest('dist/js/'));
  done();
}
function html(done) {
  src('**html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('dist/'));
  done();
}

function php(done) {
  src('**.php')
    .pipe(dest('dist/'));
  src('phpmailer/**/**')
    .pipe(dest('dist/phpmailer'));
  done();
}

function fonts(done) {
  src('fonts/**/**')
    .pipe(dest('dist/fonts'));
  done();
}


// function imagemin(done) {
//   src('img/**/**/*.{png,jpg,jpeg}')
//     .pipe(tinypng({
//       key: 'fVM45WFXJNjvNMff841nvZ7wzjFffNzp',
//       sigFile: 'images/.tinypng-sigs',
//       log: true
//     }))
//    .pipe(dest('dist/img'));

//     src('img/**/**/*.svg').pipe(dest('dist/img'));

//   done();
// }


//fVM45WFXJNjvNMff841nvZ7wzjFffNzp

exports.serve = bs;
exports.mini = minifyCss;
exports.build = series(buildCSS, buildJS, html, php, fonts);//, imagemin);