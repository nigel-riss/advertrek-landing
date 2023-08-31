// Imports 
import path         from 'path';
import gulp         from 'gulp';
import pug          from 'gulp-pug';
import embedSVG     from 'gulp-embed-svg';
import server       from 'browser-sync';
import dartSass     from 'sass';
import gulpSass     from 'gulp-sass';
import webpack      from 'webpack-stream';
import { dir } from 'console';


// Variables
const sass = gulpSass(dartSass);
const __dirname = path.dirname(new URL(import.meta.url).pathname);


// Paths
const dirs = {
  // Markup
  pugPages:     `./src/pug/*.pug`,
  pugAll:       `./src/pug/**/*.pug`,

  // Styles
  scssMain:     `./src/scss/style.scss`,
  scssAll:      `./src/scss/**/*.scss`,

  // Code
  jsSrc:        `./src/js/**/*.js`,

  // Resources
  images:       `./src/img/**/*`,
  fonts:        `./src/fonts/**/*`,
  favicon:      `./src/favicon/**/*`,

  // Distribution
  public:       `./docs`,
}


// Webpack Config
const webpackConfig = {
  entry: {
    app: `./src/js/app.js`,
  },
  output: {
    filename: `[name].js`,
    path: path.resolve(__dirname, dirs.public),
  },
  mode: `development`,
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: `babel-loader`,
      },
    ],
  },
  devtool: `source-map`,
};


// Start BrowserSync Server
const startServer = () => {
  server.init({
    // ui: false,
    // notify: false,
    server: {
      baseDir: dirs.public,
    },
    port: 1337,
    ghostMode: {
      clicks: false,
      forms: false,
      location: false,
      scroll: false,
    },
  });
};


// Render html from pug
const renderPug = () => gulp
  .src(dirs.pugPages)
  .pipe(pug({
    pretty: true,
    data: {},
    self: true,
  }))
  .on(`error`, (err) => {
    console.log("\x1b[31m", err.message, "\x1b[0m");
    this.emit(`end`);
  })
  .pipe(embedSVG({
    root: `./src/`,
  }))
  .on(`error`, (err) => {
    console.log("\x1b[31m", err.message, "\x1b[0m");
    this.emit(`end`);
  })
  .pipe(gulp.dest(dirs.public))
  .pipe(server.stream());


// Copy assets
const copyAssets = () => gulp
  .src([
    dirs.images,
    dirs.fonts,
    dirs.favicon,
  ], {
    base: `./src`,
  })
  .pipe(gulp.dest(dirs.public))
  .pipe(server.stream({ once: true }));


// Compile styles
const compileStyles = () => gulp
  .src(dirs.scssMain)
  .pipe(sass().on(`error`, sass.logError))
  .pipe(gulp.dest(dirs.public))
  .pipe(server.stream());


// Compile Scripts
const compileScripts = () => gulp
  .src(dirs.jsSrc)
  .pipe(webpack(webpackConfig))
  .on(`error`, (err) => {
    console.log("\x1b[31m", err.message, "\x1b[0m");
    this.emit(`end`);
  })
  .pipe(gulp.dest(dirs.public))
  .pipe(server.stream());


// Exports
export const watch = () => {
  gulp.watch(dirs.pugAll, renderPug);
  gulp.watch(dirs.scssAll, compileStyles);
  gulp.watch(dirs.jsSrc, compileScripts);
  gulp.watch([
    dirs.images,
    dirs.fonts,
    dirs.favicon,
  ], copyAssets);
};

export default gulp.series(
  gulp.parallel(
    renderPug,
    compileStyles,
    compileScripts,
    copyAssets,
  ),
  gulp.parallel(
    watch,
    startServer,
  ),
);
