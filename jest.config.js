module.exports = {
  moduleFileExtensions: ["js", "jsx", "json", "vue"],
  transform: {
    "^.+\\.vue$": "vue-jest",
    ".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub",
    "^.+\\.jsx?$": "babel-jest"
  },
  transformIgnorePatterns: ["/node_modules/"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  snapshotSerializers: ["jest-serializer-vue"],
  testMatch: ["**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)"], //需要匹配的文件,包含spec或者__tests__，后缀为js|jsx|ts|tsx
  testURL: "http://localhost/",
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname"
  ],
  collectCoverage: process.env.COVERAGE === "true", //设置环境变量,为true的时候才收集
  collectCoverageFrom: ["src/**/*.{js,vue}", "!**/node_modules/**"] //覆盖src下的js和vue文件，不包含node_modules下面的
};
