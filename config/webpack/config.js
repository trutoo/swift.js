const path = require('path');

/* WEBPACK SERVE */
const history = require('connect-history-api-fallback');
const convert = require('koa-connect');

/* HELPERS */
const { IS_DEV_SERVER, FRAMEWORK_DIR, SOURCE_DIR, BUILD_DIR, PUBLIC_PATH } = require('../helpers/variables');

/* PARTS */
const { Loaders } = require('./loaders');
const { Plugins } = require('./plugins');

/**
 * Exported config
 * @param {{ mode: 'development' | 'production', environment: 'local' | 'dev' | 'test' | 'acc' | 'prod' }} env Input options
 * @param {any} argv All arguments
 */
module.exports = (env, argv) => {

  // Default values
  env = Object.assign({
    mode: (argv && argv.mode) || 'development',
    environment: (argv && argv.mode === 'production') ? 'prod' : 'local',
  }, env);

  // Set it manually for PostCSS even though mode flag should solve this
  process.env.NODE_ENV = env.mode;

  const config = {

    mode: env.mode,

    context: path.join(SOURCE_DIR),

    devtool: false,

    entry: {
      'framework': '../framework/core.ts',
      'lib': './lib.ts',
      'main': './main.ts',
    },

    output: {
      path: BUILD_DIR,
      publicPath: PUBLIC_PATH,
      filename: env.mode === 'production' ? '[name].[chunkhash:20].bundle.js' : '[name].bundle.js',
      chunkFilename: env.mode === 'production' ? '[name].[chunkhash:20].chunk.js' : '[name].chunk.js',
    },

    resolve: {
      alias: {
        'JSX': path.join(FRAMEWORK_DIR, 'jsx-factory.ts'),
        'assets': path.join(SOURCE_DIR, 'assets'),
      },
      modules: [
        path.join(SOURCE_DIR),
        'node_modules',
      ],
      extensions: ['.js', '.ts', '.tsx'],
    },

    module: {
      rules: Loaders(env),
    },

    plugins: Plugins(env),

    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: {
            name: 'vendor',
            chunks: 'initial',
            enforce: true,
            test: (module, chunks) => {
              const moduleName = module.nameForCondition ? module.nameForCondition() : '';
              return /[\\/]node_modules[\\/]/.test(moduleName)
                && !chunks.some(({ name }) => {
                  return name === 'lib';
                });
            },
          },
        },
      },
    },
  };

  if (IS_DEV_SERVER) {
    /*
    config.devServer = {
      contentBase: path.join(process.cwd(), 'build'),
      host: '0.0.0.0',
      port: 53197,
      compress: true,
      noInfo: true,
      disableHostCheck: true,
      historyApiFallback: true,
      hot: env.environment === 'local',
    };
    */

    config.serve = {
      content: path.join(process.cwd(), 'build'),
      host: '0.0.0.0',
      port: 53197,
      clipboard: false,
      logTime: true,
      hot: env.environment === 'local' && {
        logTime: true,
      },
      add: (app, middleware, options) => {
        app.use(convert(history({})));
      },
    };
  }

  return config;
};
