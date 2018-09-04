const path = require('path');

/* HELPERS */
const { CPUS, SOURCE_DIR } = require('../helpers/variables');

/* PLUGINS */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/* BABEL */
const BabelOptions = require('./babel');

/* POSTCSS */
const PostCSSVariablesPath = path.join(SOURCE_DIR, 'styles', 'variables.js');
const PostCSSMediaPath = path.join(SOURCE_DIR, 'styles', 'media.js');
const PostCSSMixinsPath = path.join(SOURCE_DIR, 'styles', 'mixins.js');

/* FACTORIES */
function loadVariables() { return require(PostCSSVariablesPath); }
function loadMedia() { return require(PostCSSMediaPath); }
function loadMixins() { return require(PostCSSMixinsPath); }


//------------------------------------------------------------------------------------
// PRODUCTION
//------------------------------------------------------------------------------------

ProductionLoaders = (env) => [
  {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [
      'cache-loader',
      {
        loader: 'thread-loader',
        options: {
          // 1 cpu for system and one for 1 cpu for the fork-ts-checker-webpack-plugin
          workers: CPUS >= 4 ? CPUS - 2 : 1,
        },
      },
      {
        loader: 'babel-loader',
        options: BabelOptions,
      },
      {
        loader: 'ts-loader',
        options: {
          // happyPackMode mode to speed-up compilation and reduce errors reported to webpack
          happyPackMode: true,
        },
      },
    ],
  },
];

//------------------------------------------------------------------------------------
// DEVELOPMENT
//------------------------------------------------------------------------------------

DevelopmentLoaders = (env) => [
  {
    test: /\.tsx?$/,
    use: [
      'cache-loader',
      {
        loader: 'thread-loader',
        options: {
          // 1 cpu for system and one for 1 cpu for the fork-ts-checker-webpack-plugin
          workers: CPUS >= 4 ? CPUS - 2 : 1,
        },
      },
      {
        loader: 'ts-loader',
        options: {
          // happyPackMode mode to speed-up compilation and reduce errors reported to webpack
          happyPackMode: true,
        },
      },
    ],
  },
];

//------------------------------------------------------------------------------------
// POSTCSS
//------------------------------------------------------------------------------------

PostCSSLoaders = (env) => [
  {
    loader: 'css-loader',
    options: {
      // TODO: Check requirement
      sourceMap: env.environment === 'local' ||
        env.environment === 'dev' ||
        env.environment === 'test',
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      // TODO: Check requirement
      sourceMap: env.environment === 'local' ||
        env.environment === 'dev' ||
        env.environment === 'test',
      config: {
        path: path.resolve('config/postcss/config.js'),
        ctx: { variables: loadVariables, media: loadMedia, mixins: loadMixins },
      },
    },
  },
  {
    loader: path.resolve('config/require-clear-loader.js'),
    options: { files: [PostCSSVariablesPath, PostCSSMediaPath, PostCSSMixinsPath] },
  },
];

//------------------------------------------------------------------------------------
// BASE
//------------------------------------------------------------------------------------

Loaders = (env) => ([

  //------------------------------------------------------------------------------------
  // HTML
  //------------------------------------------------------------------------------------
  {
    test: /\.html$/,
    loader: 'html-loader',
    options: {
      minimize: env.mode === 'production',
    },
  },

  //------------------------------------------------------------------------------------
  // FILES
  //------------------------------------------------------------------------------------
  {
    test: /\.(png|jpe?g|gif|svg|woff2?|ttf|eot|ico)$/,
    loader: 'file-loader',
    options: {
      name: `assets/[${env.mode === 'production' ? 'hash' : 'name'}].[ext]`,
    },
  },

  //------------------------------------------------------------------------------------
  // CSS GLOBAL
  //------------------------------------------------------------------------------------
  {
    test: /\.css$/,
    include: [
      path.join(SOURCE_DIR, 'styles'),
    ],
    use: [
      env.mode === 'production' ? MiniCssExtractPlugin.loader : {
        loader: 'style-loader',
        options: {
          // TODO: Check requirement
          sourceMap: env.environment === 'local' ||
            env.environment === 'dev' ||
            env.environment === 'test',
        },
      },
      ...PostCSSLoaders(env),
    ],
  },

  //------------------------------------------------------------------------------------
  // CSS APP
  //------------------------------------------------------------------------------------
  {
    test: /\.css$/,
    include: [
      path.join(SOURCE_DIR, 'app'),
    ],
    use: [
      'to-string-loader',
      ...PostCSSLoaders(env),
    ],
  },
]).concat(
  env.mode === 'production' ? ProductionLoaders(env) : DevelopmentLoaders(env),
);

module.exports = {
  ProductionLoaders,
  DevelopmentLoaders,
  PostCSSLoaders,
  Loaders,
};
