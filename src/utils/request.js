import axios from "axios";
import { notification } from "ant-design-vue";

function request(options) {
  return (
    axios(options)
      //成功返回res
      .then(res => res)
      //失败提醒
      .catch(error => {
        const {
          response: { status, statusText }
        } = error;
        notification.error({
          // eslint-disable-next-line no-unused-vars
          message: h => (
            <div>
              请求错误 <span style="color: red">{status}</span>: {options.url}
            </div>
          ),
          description: statusText
        });
        console.log("4");
        //如果请求失败，就不会进入then里面去了。处理数据时，就不用考虑resp里面有没有data。也可以在调用API的地方catch，但这样会比较麻烦，使用这个方法可以统一处理
        return Promise.reject(error);
      })
  );
}

export default request;
