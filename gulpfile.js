const { src, dest, task, series,watch, parallel } = require('gulp');
const rm = require( 'gulp-rm' );
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const gulpif = require('gulp-if');

const env = process.env.NODE_ENV;

sass.compiler = require('node-sass');

task( 'clean', () => {
   return src( 'prod/**/*', { read: false }).pipe(rm());
 });

task('copy:html', () => {
   return src('dev/*.html')
      .pipe(dest('prod'))
      .pipe(reload({ stream: true }));
});

task('copy:fonts', () => {
   return src('dev/fonts/**')
      .pipe(dest('prod/fonts'))
      .pipe(reload({ stream: true }));
});

task('copy:img', () => {
   return src('dev/img/**')
      .pipe(dest('prod/img'))
      .pipe(reload({ stream: true }));
});

task('copy:biblio', () => {
   return src('dev/biblio/**')
      .pipe(dest('prod/biblio'))
      .pipe(reload({ stream: true }));
});

const styles = [
   'node_modules/normalize.css/normalize.css',
   'dev/css/main.scss'
]

task('styles', () => {
   return src(styles)
   .pipe(concat('main.min.scss'))
   .pipe(sassGlob())
   .pipe(sass().on('error', sass.logError))
   .pipe(gulpif(env === 'dev',  autoprefixer({ cascade: false })
    )
   )
   .pipe(gulpif(env === 'prod', gcmq()))
   .pipe(gulpif(env === 'prod', cleanCSS()))
   .pipe(dest('prod'))
   .pipe(reload({ stream: true}));
});

const libs = [
   'node_modules/jquery/dist/jquery.js',
   'node_modules/mobile-detect/mobile-detect.js',
   'dev/js/*.js'
]

task('scripts', () => {
   return src(libs)
      .pipe(concat('main.min.js', {newLine: ";"}))
      .pipe(babel({
         presets: ['@babel/env']
          })
         )
      .pipe(uglify())
      .pipe(dest('prod'))
      .pipe(reload({ stream: true}));
});



task('server', () => {
   browserSync.init({
       server: {
           baseDir: "./prod"
       },
   });
});

task('watch', () => {
   watch('./dev/css/**/*.scss', series('styles'));
   watch('./dev/*.html', series('copy:html'));
   watch('./dev/js/*.js', series('scripts'));
});

task(
   'default', 
   series(
   'clean',
   parallel('copy:html','copy:fonts','copy:img','copy:biblio',  'styles', 'scripts'), 
   parallel('watch', 'server'),
   )
);

task(
   'build', 
   series('clean', parallel('copy:html','copy:fonts','copy:img','copy:biblio', 'styles', 'scripts'))
);

