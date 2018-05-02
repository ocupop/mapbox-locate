const clientName        = "Mapbox";
const src               = 'src';
const development       = '_site';
const assetsDir         = 'src/assets';
const tempAssets        = '';

module.exports = {
  browsersync: {
    development: {
      server: {
        baseDir: [development, src],
        serveStaticOptions: {
          extensions: ['html']
        }
      },
      port: 9999,
      files: [
        assetsDir + '/css/*.css',
        assetsDir + '/js/*.js',
        assetsDir + '/img/**',
        assetsDir + '/fonts/*'
      ]
    }
  },
  delete: {
    src: [tempAssets]
  },
  jekyll: {
    development: {
      src:    src,
      dest:   development,
      config: '_config.yml'
    }
  },
  sass: {
    src:   assetsDir + '/_scss/**/*.{sass,scss}',
    dest:  assetsDir + '/css',
    options: {
      noCache: true,
      compass: false,
      bundleExec: true,
      sourcemap: true
    }
  },
  autoprefixer: {
    browsers: [
      'last 2 versions',
      'safari 5',
      'ie 8',
      'ie 9',
      'opera 12.1',
      'ios 6',
      'android 4'
    ],
    cascade: true
  },
  images: {
    src:  'src/assets/_img/**/*',
    dest: assetsDir + '/img'
  },
  optimize: {
    css: {
      src:  assetsDir + '/css/*.css',
      dest: assetsDir + '/css/',
      options: {}
    },
    images: {
      src:  assetsDir + '/_img/**/*.{jpg,jpeg,png,gif}',
      dest: assetsDir + '/img/',
      options: {
        optimizationLevel: 3,
        progessive: true,
        interlaced: true
      }
    }
  },
  base64: {
    src: assetsDir + '/css/*.css',
    dest: assetsDir + '/css',
    options: {
      baseDir: development,
      extensions: ['png'],
      maxImageSize: 20 * 1024, // bytes
      debug: false
    }
  },
  scsslint: {
    src: [
      assetsDir + '/_scss/**/*.{sass,scss}'
      ],
      options: {
        bundleExec: true,
        config: './scss-lint.yml'
      }
  },
  watch: {
    jekyll: [
      '_config.yml',
      'stopwords.txt',
      src + '/_data/**/*.{json,yml,csv}',
      src + '/_includes/**/*.{html,xml}',
      src + '/_layouts/*.html',
      src + '/_locales/*.yml',
      src + '/_plugins/*.rb',
      src + '/_posts/*.{markdown,md}',
      src + '/**/*.{html,markdown,md,yml,json,txt,xml}',
      src + '/*'
    ],
    sass: assetsDir + '/_scss/**/*',
    images:  assetsDir + '/_img/**/*'
  }
};