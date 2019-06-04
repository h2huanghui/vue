const path = require("path");
const webpack = require("webpack");
const AntDesignThemePlugin = require("antd-theme-webpack-plugin");

const options = {
  antDir: path.join(__dirname, "./node_modules/ant-design-vue"),
  stylesDir: path.join(__dirname, " ./src"),
  varFile: path.join(
    __dirname,
    "./node_modules/ant-design-vue/lib/style/themes/default.less"
  ),
  mainLessFile: "",
  themeVariables: ["@primary-color"],
  generateOnce: false
};

const themePlugin = new AntDesignThemePlugin(options);
module.exports = {
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          "primary-color": "#1DA57A"
        },
        javascriptEnabled: true
      }
    }
  },
  /* webpack */
  configureWebpack: {
    // eslint-disable-next-line no-undef
    plugins: [themePlugin, new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)],
    // resolve: {
    //   alias: {
    //     "@ant-design/icons/lib/dist$": path.resolve(__dirname, "./src/icons.js")
    //   }
    // }
  },
  chainWebpack: config => {
    const svgRule = config.module.rule("svg");

    // 清除已有的所有 loader。
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    svgRule.uses.clear();

    // 添加要替换的 loader
    svgRule.use("vue-svg-loader").loader("vue-svg-loader");
  },
  devServer: {
    //接口请求之后，代理到mock文件中。通过vue-cli，webpack配置(提供服务，devServer)
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        //mock数据的拦截
        bypass: function(req, res) {
          console.log("req", req);
          if (req.headers.accept.indexOf("html") !== -1) {
            console.log("Skipping proxy for browser request.");
            return "/index.html";
            //只有不等于none,才走mock文件顺序
          } else if (process.env.MOCK !== "none") {
            //api请求时，可以拿到链接：'/api/dashboard/analysis',组装为mock文件名称
            const name = req.path
              .split("/api/")[1] //split("/api/")得到['','dashboard/chart']
              .split("/") //得到['dashboard','chart']
              .join("_"); //得到''dashboard_chart'
            //把mock文件require进来
            const mock = require(`./mock/${name}`); //mock有缓存，改动数据会不生效，手动清理缓存
            const result = mock(req.method);
            delete require.cache[require.resolve(`./mock/${name}`)]; //拿到缓存的路径并清除缓存
            return res.send(result);
          }
        }
      }
    }
  }
};
