const path = require('path')
const {toHash} = require('./helpers')
const merge = require('webpack-merge')
const WebpackBar = require('webpackbar')
const CopyPlugin = require('copy-webpack-plugin')
const baseConfig = require('./webpack.base.config')
const BrotliPlugin = require('brotli-webpack-plugin')
const NodemonPlugin = require('nodemon-webpack-plugin')
const LoadablePlugin = require('@loadable/webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')
const { GenerateSW, InjectManifest } = require('workbox-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')

const env = process.env.NODE_ENV === 'production' ? 'production' : 'development'
const isDev = env === 'development'

const config = {
  mode: env,
  entry: {
    app: path.resolve(process.cwd(), './app/index.js'),
  },
  output: {
    path: path.resolve(process.cwd(), './dist/'),
    publicPath: '/',
    chunkFilename: isDev ? '[id].js' : '[id].[hash].js',
    filename: isDev ? '[name].bundle.js' : '[name].[hash].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(svg|png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: `images_${toHash(process.env.APP_VERSION)}/[name].[ext]`,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new LoadablePlugin(),
    new CopyPlugin([
      {
        from: path.resolve(process.cwd(), './app/assets/images/favicon.ico'),
        to: path.resolve(
          process.cwd(),
          `./dist/images_${toHash(process.env.APP_VERSION)}`,
        ),
      },
    ]),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        path.resolve(process.cwd(), './dist/**/*'),
      ],
    }),
    // new BundleAnalyzerPlugin()
  ],
}
const babelLoader = baseConfig.module.rules.find(
  config => config.loader === 'babel-loader',
)
babelLoader.options.plugins.push('@babel/plugin-syntax-dynamic-import')

if (isDev) {
  config.plugins.push(
    new WebpackBar({
      color: '#FF1493',
      name: 'Client',
    }),
    new NodemonPlugin({
      quiet: true,
      nodeArgs: ['--inspect'],
      script: path.resolve(process.cwd(), './build/server.js'),
      watch: [
        path.resolve(process.cwd(), './dist/'),
        path.resolve(process.cwd(), './build/'),
      ],
      delay: '1000',
    }),
  )
} else {
  config.plugins.push(
    new CompressionPlugin({
      algorithm: 'gzip',
    }),
    new BrotliPlugin(),
    new GenerateSW({
      // additionalManifestEntries: [{ url: 'index.html' }],
      swDest: './service-worker.js',
      cleanupOutdatedCaches: true,
      chunks: ['*.[hash].js'],
      exclude: [/\.(?:png|jpg|jpeg|svg)$/],
      mode: 'production',
      offlineGoogleAnalytics: true,
      sourcemap: true,
      navigationPreload: true,
      clientsClaim: true,
      skipWaiting: true,
      runtimeCaching: [
        {
          urlPattern: /\.(?:png|jpg|jpeg|svg|js)$/,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'assets',
            expiration: {
              maxEntries: 500
            },
            cacheableResponse: { statuses: [0, 200] }
          }
        },
        {
          urlPattern: /mobile/g,
          handler: 'CacheFirst',
          options: {
            cacheName: 'apis',
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 6 * 60 * 60
            },
            cacheableResponse: { statuses: [0, 200] }
          }
        }
      ]
    }),
    new InjectManifest({
      swSrc: path.resolve(process.cwd(), 'app/utils/manifest.sw.js'),
      mode: 'production'
    }),
    new WebpackPwaManifest({
      name: 'Parsicar',
      short_name: 'Parsicar',
      description: 'سفارش آنلاین خودرو و تشریفات',
      background_color: '#726C82',
      theme_color: '#FED593',
      display: 'standalone',
      Scope: '/',
      start_url: '/',
      orientation: 'portrait',
      ios: true,
      version: '1.0.0',
      crossorigin: null, // can be null, use-credentials or anonymous
      icons: [
        {
          src: path.resolve('app/assets/images/Logo.png'),
          sizes: [36, 48, 72, 96, 144, 192, 256, 512], // multiple sizes,
          ios: true
        },
        {
          src: path.resolve('app/assets/images/Logo.png'),
          sizes: [36, 48, 72, 96, 144, 192, 256, 512, 1024],
          destination: path.join('icons', 'ios'),
          ios: 'startup'
        }
      ]
    }),
  )
}

module.exports = merge(baseConfig, config)
