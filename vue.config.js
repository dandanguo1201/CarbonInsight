"use strict";

const path=require("path");
function resolve(dir){
    return path.join(__dirname,dir);
}
module.exports = {
    // 部署应用包时的基本 URL， 用法和 webpack 本身的 output.publicPath 一致。
    // 这个值也可以被设置为空字符串 ('') 或是相对路径 ('./')，这样所有的资源都会被链接为相对路径，这样打出来的包可以被部署在任意路径。
    publicPath: './', // 默认为'/'
    // 将构建好的文件输出到哪里
    outputDir: 'dist',
    // 放置生成的静态资源 (js、css、img、fonts) 的目录。
    assetsDir: 'static',
    // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
    indexPath: 'index.html',
    // 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。然而，这也要求 index 的 HTML 是被 Vue CLI 自动生成的。如果你无法使用 Vue CLI 生成的 index HTML，你可以通过将这个选项设为 false 来关闭文件名哈希。
    filenameHashing:true,
    // 在 multi-page（多页）模式下构建应用。每个“page”应该有一个对应的 JavaScript 入口文件。
    // pages:{},
    // 是否在保存的时候使用 `eslint-loader` 进行检查。 有效的值：`ture` | `false` | `"error"`  当设置为 `"error"` 时，检查出的错误会触发编译失败。
    lintOnSave:true,
    // 是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。
    runtimeCompiler: false,
    //默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。    
    transpileDependencies: [],
    // 如果你不需要生产环境的 source map,可以将其设置为 false 以加速生产环境构建。
    productionSourceMap: false,
    // 设置生成的 HTML 中 <link rel="stylesheet"> 和 <script> 标签的 crossorigin 属性。
    // crossorigin:"",//浏览器跨域安全相关

    // 配置css
    css: {
      loaderOptions: {
        // 给 sass-loader 传递选项
        sass: {
          // @/ 是 src/ 的别名
          // 所以这里假设你有 `src/variables.sass` 这个文件
          // 注意：在 sass-loader v8 中，这个选项名是 "prependData"
          additionalData: `@import "~@/variables.sass"`
        },
        // 默认情况下 `sass` 选项会同时对 `sass` 和 `scss` 语法同时生效
        // 因为 `scss` 语法在内部也是由 sass-loader 处理的
        // 但是在配置 `prependData` 选项的时候
        // `scss` 语法会要求语句结尾必须有分号，`sass` 则要求必须没有分号
        // 在这种情况下，我们可以使用 `scss` 选项，对 `scss` 语法进行单独配置
        scss: {
          additionalData: `@import "~@/variables.scss";`
        },
        // 给 less-loader 传递 Less.js 相关选项
        less:{
          // http://lesscss.org/usage/#less-options-strict-units `Global Variables`
          // `primary` is global variables fields name
          globalVars: {
            primary: '#fff'
          }
        }
      }
    },
    // 如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中。
    // 如果这个值是一个函数，则会接收被解析的配置作为参数。该函数及可以修改配置并不返回任何东西，也可以返回一个被克隆或合并过的配置版本。
    // configureWebpack: () => {}, //(Object | Function)},

    // 是一个函数，允许对内部的 webpack 配置进行更细粒度的修改。
    chainWebpack: (config) => {
      // 配置别名
      config.resolve.alias
        .set('@', resolve('src'))
        .set('assets', resolve('src/assets'))
        .set('components', resolve('src/components'))
        .set('views', resolve('src/views'))
  
      config.optimization.minimizer('terser').tap((args) => {
        // 去除生产环境console
        args[0].terserOptions.compress.drop_console = true
        return args
      })
    },

    // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
    // parallel: require('os').cpus().length > 1,
  
    devServer: {
      host: 'localhost',
      port: 8081, // 端口号
      https: false, // https:{type:Boolean}
      open: process.platform === 'darwin',
      disableHostCheck: true,
  
      // 配置多个代理
      proxy: {
        '/api': {
          target: 'http://localhost:8080/',
          changeOrigin: true, // 是否跨域
          secure: false, // 如果是https 需要配置该参数
          // pathRewrite: {
          //   '^/api': '',
          // },
        },
      },
    },
  }