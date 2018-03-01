import webpack from 'webpack'
import cssnano from 'cssnano'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import postcssFixes from 'postcss-fixes'
import postcssFilterGradient from 'postcss-filter-gradient'
import postcssReduceTransform from 'postcss-reduce-transforms'
import cssMqpacker from 'css-mqpacker'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import Harddisk from '../plugins/harddisk-plugins'
import debug from 'debug'

const dbg = debug('Roadiz-front:webpack-config:environments  ')
dbg.color = debug.colors[5]

const scssConfig = {
    test: /\.scss?$/,
    loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
            loader: 'css-loader',
            options: {
                modules: false,
                filename: '[name].[contenthash].css',
                importLoaders: 2,
                sourceMap: false
            }
        }, {
            loader: 'postcss-loader',
            options: {
                sourceMap: true,
                plugins: [
                    postcssFixes(),
                    postcssFilterGradient(),
                    postcssReduceTransform(),
                    cssMqpacker(),
                    cssnano({
                        autoprefixer: {
                            add: true,
                            remove: true,
                            browsers: ['last 2 version', 'ie 11', 'ie 10']
                        },
                        discardComments: {
                            removeAll: true
                        },
                        discardUnused: false,
                        mergeIdents: false,
                        reduceIdents: false,
                        safe: true,
                        sourceMap: true
                    })
                ]
            }
        }, {
            loader: 'sass-loader',
            options: {
                sourceMap: true
            }
        }]
    })
}

const optimization = {
    splitChunks: {
        chunks: 'all',
        cacheGroups: {
            commons: {
                name: 'commons',
                chunks: 'initial',
                minChunks: 2,
                minSize: 0
            }
        }
    }
}

export default {
    development: (base, config) => ({
        watch: true,
        mode: 'development',
        devServer: {
            stats: config.stats,
            port: config.port,
            publicPath: config.public_path,
            host: config.address,
            hot: true,
            inline: true,
            watchOptions: {
                aggregateTimeout: 50,
                ignored: /node_modules/
            }
        },
        module: {
            rules: [scssConfig]
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new HtmlWebpackPlugin({
                filename: config.utils_paths.views('partials/css-inject.html.twig'),
                template: config.utils_paths.views('partials/css-inject-src.html.twig'),
                cache: true,
                inject: false,
                alwaysWriteToDisk: true,
                refreshOnChange: config.refreshOnChange
            }),
            new HtmlWebpackPlugin({
                filename: config.utils_paths.views('partials/js-inject.html.twig'),
                template: config.utils_paths.views('partials/js-inject-src.html.twig'),
                cache: true,
                inject: false,
                alwaysWriteToDisk: true,
                refreshOnChange: config.refreshOnChange
            }),
            new Harddisk()
        ],
        optimization
    }),

    production: (base, config) => {
        dbg('🗑  Cleaning assets folder')
        dbg('👽  Using UglifyJs')
        dbg('🎨  Using PostCss')

        return {
            mode: 'production',
            module: {
                rules: [scssConfig]
            },
            plugins: [
                new webpack.HashedModuleIdsPlugin(),
                new HtmlWebpackPlugin({
                    filename: config.utils_paths.views('partials/css-inject.html.twig'),
                    template: config.utils_paths.views('partials/css-inject-src.html.twig'),
                    cache: true,
                    inject: false
                }),
                new HtmlWebpackPlugin({
                    filename: config.utils_paths.views('partials/js-inject.html.twig'),
                    template: config.utils_paths.views('partials/js-inject-src.html.twig'),
                    cache: true,
                    inject: false
                })
            ],
            optimization: {
                ...optimization,
                minimize: true,
                occurrenceOrder: true
            }
        }
    }
}
