//mock文件
function chart(method) {
  let res = null;
  switch (method) {
    case "GET":
      res = [60, 40, 70, 65, 30, 50];
      break;
    default:
      res = null;
  }
  return res;
}

module.exports = chart;
