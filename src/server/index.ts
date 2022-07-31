//初始化axios
import axios from "axios";
import { resolveComponent } from "vue";

const server = axios.create({
  baseURL: "http://127.0.0.1:9764",
});

export const checkUser = (name: string, pass: string): boolean => {
  server.post("/api/user",JSON.stringify({username:name,password:pass})).then((res) => {
    console.log(res.data);
  });
  return true;
};

const jsonServer=axios.create()

export const getJson=(url:string,meth:string)=>{
  return new Promise((resolve,reject)=>{
      if(meth==='get'){
          jsonServer.get(url).then((res)=>{
            resolve(res.data.data)
          },err=>{
            reject(err)
          })
      }
      else if(meth==='post'){
          jsonServer.post(url).then((res)=>{
            resolve(res.data.data)
          },err=>{
            reject(err)
          })
      }
  })

}