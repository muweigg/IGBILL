const gulp = require('gulp');
const server = require('browser-sync').create();
const Mem = require('gulp-mem');
const ts = require('gulp-typescript');
const prefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const filter = require('gulp-filter');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const nunjucks = require('gulp-nunjucks');
const data = require('gulp-data');
const rev = require('gulp-rev');
const revCollector = require('gulp-rev-collector');
const cleanCSS = require('gulp-clean-css');
const spritesmith = require('gulp.spritesmith');
const svgstore = require('gulp-svgstore');
const svgmin = require('gulp-svgmin');
const merge = require('merge-stream');
const empty = require('gulp-empty');
const tsCompiler = ts.createProject('./tsconfig.json');
const del = require('del');

const dist = './dist';

const mem = new Mem();
mem.serveBasePath = dist;

let isProd = false;
let svgs = null;

const urlPattern = /(url\(['"]?)[/]?()/g;
const exts = '{jpg,jpeg,png,svg,ttf,eot,woff,woff2,gif}';

const paths = {
    src: {
        js: ['src/js/**/*.ts'],
        css: ['src/css/**/*.css'],
        scss: ['src/scss/**/*.scss'],
        assets: [`src/assets/**/*.${exts}`],
        sprites: [`src/sprites/icons/**/*.png`],
        template: ['src/templates/**/*.html'],
        svg: ['src/sprites/svg/**/*.svg'],
    },
    common: {
        js: [
            'src/js/common/**/vue.js',
            'src/js/common/**/jquery*.js',
            'src/js/common/**/pickadate.js/picker.js',
            'src/js/common/**/*.js',
        ],
        css: [
            'src/css/common/**/normalize.css',
            'src/scss/common/**/common.scss',
            'src/css/common/**/*.css',
            'src/scss/common/*.scss',
        ],
    },
    filter: {
        js: ['**', '!src/js/common/**/*.js'],
        css: ['**', '!src/css/common/**/*.css'],
        scss: ['**', '!src/scss/common/**/*.scss'],
        template: ['**', '!src/templates/common/**/*.html'],
    },
    output: {
        root: `${dist}`,
        rev: `${dist}/rev`,
        js: `${dist}/js`,
        css: `${dist}/css`,
        assets: `${dist}/assets`,
        sprites: {
            scss: 'src/scss/common/_',
            images: 'src/assets/images',
        }
    },
    process: [`${dist}/rev/**/*.json`, `${dist}/**/*.css`, `${dist}/**/*.html`],
    rebaseTo: 'src/dist/'
};

gulp.task('svg',
    () => svgs = gulp.src(paths.src.svg, { base: 'src/sprites/svg' })
        .pipe(rename({prefix: 'icon-'}))
        .pipe(svgmin({
            plugins: [
                { removeDoctype: true },
                { removeXMLProcInst: true },
                { removeComments: true },
                { removeMetadata: true },
                { removeTitle: true },
                { removeEmptyAttrs: true },
                { removeStyleElement: true },
                { removeScriptElement: true },
                { removeAttrs: { attrs: '(stroke|fill)' } }
            ]
        }
        ))
        // .pipe(svgstore({ inlineSvg: true })));
        .pipe(svgstore())
        .pipe(gulp.dest(paths.output.sprites.images)));

function reload(done) {
    server.reload();
    done();
}

function serve(done) {
    server.init({
        server: dist,
        host: '0.0.0.0',
        port: 5555,
        cors: true,
        middleware: mem.middleware,
    });
    done();
}

gulp.task('vendors:js', () => {
    const task = gulp.src(paths.common.js)
        .pipe(concat('vendors.js'));

    if (!isProd) return task.pipe(mem.dest(paths.output.js));

    return task.pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest(paths.output.js))
        .pipe(rev.manifest('vendors-js-manifest.json'))
        .pipe(gulp.dest(paths.output.rev))
});

gulp.task('vendors:css', () => {
    const task = gulp.src(paths.common.css)
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('vendors.css'))
        .pipe(prefixer({
            browsers: ['> 5%', 'ie >= 9', 'ff >= 28', 'Chrome >= 21'],
            cascade: false
        }));
    
    if (!isProd) return task.pipe(cleanCSS({ format: 'beautify', rebaseTo: paths.rebaseTo }))
            .pipe(mem.dest(paths.output.css));
    
    return task.pipe(cleanCSS({ level: { 1: { specialComments: false }}, rebaseTo: paths.rebaseTo }))
        .pipe(rev())
        .pipe(gulp.dest(paths.output.css))
        .pipe(rev.manifest('vendors-css-manifest.json'))
        .pipe(gulp.dest(paths.output.rev));
});

gulp.task('js', () => {
    const f = filter(paths.filter.js);
    const task =  gulp.src(paths.src.js)
        .pipe(f)
        .pipe(tsCompiler());
    
    if (!isProd) return task.pipe(mem.dest(paths.output.js));

    return task.pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest(paths.output.js))
        .pipe(rev.manifest('js-manifest.json'))
        .pipe(gulp.dest(paths.output.rev));
});

gulp.task('sass', () => {
    const f = filter(paths.filter.scss);
    const task = gulp.src(paths.src.scss)
        .pipe(f)
        .pipe(sass().on('error', sass.logError))
        .pipe(prefixer({
            browsers: ['> 5%', 'ie >= 9', 'ff >= 28', 'Chrome >= 21'],
            cascade: false
        }));

    if (!isProd) return task.pipe(cleanCSS({ format: 'beautify', rebaseTo: paths.rebaseTo }))
            .pipe(mem.dest(paths.output.css));

    return task.pipe(cleanCSS({ level: { 1: { specialComments: false }}, rebaseTo: paths.rebaseTo }))
        .pipe(rev())
        .pipe(gulp.dest(paths.output.css))
        .pipe(rev.manifest('css-manifest.json'))
        .pipe(gulp.dest(paths.output.rev));
});

gulp.task('template', () => {
    const f = filter(paths.filter.template);
    const task = gulp.src(paths.src.template)
        .pipe(f)
        .pipe(nunjucks.compile());

    if (!isProd) return task.pipe(mem.dest(paths.output.root));

    return task.pipe(gulp.dest(paths.output.root));
});

gulp.task('sprites', () => {
    const spriteData = gulp.src(paths.src.sprites).pipe(spritesmith({
        imgName: 'icons.png',
        cssName: '_icons.scss',
        imgPath: '../../assets/images/icons.png',
        padding: 10,
        imgOpts: { quality: 100 },
        algorithm : 'top-down',
        algorithmOpts: { sort: true },
    }));

    const imgStream = spriteData.img
        .pipe(gulp.dest(paths.output.sprites.images));

    const cssStream = spriteData.css
        .pipe(gulp.dest(paths.output.sprites.scss));

    return merge(imgStream, cssStream);
});

gulp.task('assets', () => {
    const task = gulp.src(paths.src.assets);

    if (!isProd) return task.pipe(mem.dest(paths.output.assets));
    
    return task.pipe(rev())
        .pipe(gulp.dest(paths.output.assets))
        .pipe(rev.manifest('assets-manifest.json'))
        .pipe(gulp.dest(paths.output.rev));
});

gulp.task('process', () => {
    const task = gulp.src(paths.process)
        .pipe(revCollector());

    if (!isProd) return task.pipe(mem.dest(dist));

    return task.pipe(gulp.dest(dist));
});

gulp.task('watch:assets',
    () => gulp.watch(paths.src.assets, gulp.series('assets', reload)));

gulp.task('watch:sprites',
    () => gulp.watch(paths.src.sprites, gulp.series('sprites', gulp.parallel('assets', 'vendors:css'), reload)));

gulp.task('watch:vendors:js',
    () => gulp.watch(paths.common.js, gulp.series('vendors:js', reload)));

gulp.task('watch:vendors:css',
    () => gulp.watch([...paths.common.css, 'src/scss/common/_/*'], gulp.series('vendors:css', reload)));

gulp.task('watch:js',
    () => gulp.watch(paths.src.js, gulp.series('js', reload)));

gulp.task('watch:scss',
    () => gulp.watch([...paths.src.scss, , 'src/scss/common/_/*'], gulp.series('sass', reload)));

gulp.task('watch:template',
    () => gulp.watch(paths.src.template, gulp.series('template', reload)));

gulp.task('watch', gulp.parallel([
    'watch:assets',
    'watch:sprites',
    'watch:vendors:js',
    'watch:vendors:css',
    'watch:template',
    'watch:js',
    'watch:scss'
]));

gulp.task('webserver',gulp.series(serve));

gulp.task('prodMode', () => {
    isProd = true;
    del.sync(dist);
    return gulp.src('src');
});

gulp.task('devMode', () => {
    isProd = false;
    return gulp.src('src');
});

gulp.task('dev', 
    gulp.series(
        'devMode',
        'sprites',
        gulp.parallel([
            'assets',
            'vendors:js',
            'vendors:css',
            'js',
            'sass',
            'template',
        ]),
        gulp.parallel([
            'watch',
            'webserver'
        ])
    ));

gulp.task('prod',
    gulp.series([
        'prodMode',
        'sprites',
        gulp.parallel([
            'assets',
            'vendors:js',
            'vendors:css',
            'js',
            'sass',
            'template',
        ]),
        'process'
    ]));

gulp.task('default', gulp.parallel('dev'));