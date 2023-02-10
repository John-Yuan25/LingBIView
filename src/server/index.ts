//初始化axios
import axios from "axios";
import { resolveComponent } from "vue";

const server = axios.create({
  baseURL: "http://127.0.0.1:9764",
});

export const checkUser = (name: string, pass: string) => {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    params.append("username", name);
    params.append("password", pass);
    let result: string = "";
    server.post("/api/checkUser", params).then((res) => {
      if (res.data.status === 1) {
        result = res.data.token;
        resolve(result)
      } else {
        result = "登录失败";
        reject(result)
      }
    });
  });
};
export const createUser = (name: string, pass: string) => {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    params.append("username", name);
    params.append("password", pass);
    let result: Object;
    server.post("/api/createUser", params).then((res) => {
      if (res.data.status === 1) {
        if(res.data.wrong){
          result = res.data.message;
          reject(result)
        }
        result = res.data.message;
        resolve(result)
      } else {
        result = res.data.message;
        reject(result)
      }
    });
  });
};

const jsonServer = axios.create();

export const getJson = (url: string, meth: string) => {
  return new Promise((resolve, reject) => {
    if (meth === "get") {
      jsonServer.get(url).then(
        (res) => {
          resolve(res.data.data);
        },
        (err) => {
          reject(err);
        }
      );
    } else if (meth === "post") {
      jsonServer.post(url).then(
        (res) => {
          resolve(res.data.data);
        },
        (err) => {
          reject(err);
        }
      );
    }
  });
};
