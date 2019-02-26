
const path = require("path");
// 每次build清除本地之前build的文件
const CleanWebpackPlugin = require("clean-webpack-plugin");
// 打包css文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 根据html模版生成html文件
const HtmlWebPackPlugin = require("html-webpack-plugin");
// 配置
module.exports = {
    // 生产环境，具体的不同我也不太清楚
    // 应该是不同环境对应不同的webpack config，小白无奈了
    mode: "production",
    // 入口文件
    entry: {
        index: "./src/javascript/index.js",
        // contact: "./src/javascript/contact.js",
        // about: "./src/javascript/about.js",
        // news: "./src/javascript/news.js",
    },
    // 打包出口
    output: {
        // javascript文件夹，[name]是什么键名,[hash]加上hash值
        filename: 'javascript/[name].[hash].js',
        // dist文件夹（默认）
        path: path.resolve(__dirname, 'dist')
    },
    //
    resolve: {
        // 配置import 和 require 的路径别名,就可以不用../..之类的了
        alias: {
            "@": path.resolve(__dirname, "src"),
            "css": path.resolve(__dirname, "src/css"),
            "images": path.resolve(__dirname, "src/images"),
        }
    },
    // 处理模块
    module: {
        //规则
        rules: [
            // html文件使用html-loader处理
            // minimize是否压缩文件
            // 我的项目没有html页面应该可以不写这项吧……
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: {
                            minimize: true,
                        },
                    }
                ]
            },
            // 将pug模版页面转成html
            {
                test: /\.pug$/,
                use: [
                    {
                        loader: "html-loader",
                        options: {
                            minimize: true,
                        },
                    },
                    "pug-html-loader",
                ]
            },
            // css文件规则
            {
                test: /\.css$/,
                use: [
                    {
                        // 使用MiniCssExtractPlugin.loader
                        // 可以将css文件打包为文件，不嵌入html文档head里的style标签
                        loader: MiniCssExtractPlugin.loader,
                        // css文件中的静态路径前加上../，因为打包后结构变化了，如果不加该项引入不了资源
                        options: {
                            publicPath: '../',
                        }
                    },
                    // 如果要将css文件放入style标签，需要注释掉MiniCssExtractPlugin
                    // 使用 "style-loader"放入style标签
                    "css-loader",
                    'postcss-loader',
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        // 使用MiniCssExtractPlugin.loader
                        // 可以将css文件打包为文件，不嵌入html文档head里的style标签
                        loader: MiniCssExtractPlugin.loader,
                        // css文件中的静态路径前加上../，因为打包后结构变化了，如果不加该项引入不了资源
                        options: {
                            publicPath: '../',
                        }
                    },
                    // 如果要将css文件放入style标签，需要注释掉MiniCssExtractPlugin
                    // 使用 "style-loader"放入style标签
                    "css-loader",
                    "sass-loader",
                    'postcss-loader',
                ]
            },
            {
                // 处理stylus的样式文件，sass和less应该也是同理
                test: /\.styl(us)?$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                        }
                    },
                    "css-loader",
                    "postcss-loader",
                    // stylus-loader 处理styl的文件
                    "stylus-loader"],
            },
            {
                // 图片资源使用file-loader
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            // images文件夹里，[name]原来的名字,[ext]原来的拓展名
                            // 我觉得使用[hash]最好了，不会出错也不会冲突
                            // 被后来经理叫我改成原来的名字[name]，之前的资源名字全乱的，好多资源名字报错
                            name: 'images/[hash].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    // 使用插件
    plugins: [
        // 引入CleanWebpackPlugin，每次build都删除之前打包文件
        new CleanWebpackPlugin(["dist"]),
        // autoprefixer用于自动给css属性加前缀，似乎需要配合postcss-loader
        require('autoprefixer'),
        // 打包css的文件
        new MiniCssExtractPlugin({
            // 打包到css文件夹
            filename: "./css/[name].css"
        }),
        // 打包html插件，应该是每个html文件都需要配置
        new HtmlWebPackPlugin({
            // html文件的模版
            template: "./src/index.pug",
            // 打包出来的文件名
            filename: "./index.html",
            // 该html文件需要引入的js文件，对应的是上方入口的键名
            chunks: ["index"],
        }),
        // new HtmlWebPackPlugin({
        //     template: "./src/contact.pug",
        //     filename: "./contact.html",
        //     chunks: ["contact"],
        // }),
        // new HtmlWebPackPlugin({
        //     template: "./src/about.pug",
        //     filename: "./about.html",
        //     chunks: ["about"],
        // }),
        // new HtmlWebPackPlugin({
        //     template: "./src/news.pug",
        //     filename: "./news.html",
        //     chunks: ["news"],
        // }),
    ],
    // devServer 配置
    devServer: {
        // 默认打开浏览器
        open: true,
        // 压缩文件
        compress: true,
        // 端口号
        port: 8080
    },
};
