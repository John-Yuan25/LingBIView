//工具函数
import { createApp } from "vue";

//获取样式
let getAttrStr = (attrs) => {
  let attrStr = "";
  attrs.forEach((item) => {
    attrStr += item.key + "=" + item.value + "   ";
  });
  return attrStr;
};

//获取随机ID
export const getId = () => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return "v" + s4() + s4() + "-" + s4();
  //0x10000:以0x开始的数据表示16进制，10000转成十进制数就是65536,实际上这是为了后面获取四位随机号码所以乘以10000，而为了获取包含字母在内的字符就用16进制
  //前面加v是因为querySelect无法识别数字开头的id
};

//挂载组件
let componentApp: any;
export const mountedComponent = (component) => {
  let data = {};
  let id = component.info.id;
  let compWidth = 0;
  let compHeight = 0;
  if (component.attribute) {
    component.attribute.forEach((item) => {
      data[item.key] = item.value;
      if (item.key === "width") {
        compWidth = item.value;
      }
      if (item.key === "height") {
        compHeight = item.value;
      }
    });
  }

  setTimeout(() => {
    // let newVue=({
    //   name:id.toString(),
    //   data:data,
    //   el:document.getElementById(id),
    //   template:component.template,
    // onMounted(){
    //   this.$el.id = id;
    //   this.$el.style.position = "absolute";
    //   this.$el.style.cursor = "pointer";
    //   this.$el.style.left = `${component.position.left}px`;
    //   this.$el.style.top = `${component.position.top}px`;
    //   this.$el.style.zIndex = `${component.position.zIndex}`;
    //   this.$el.style.width = `${compWidth}px`;
    //   this.$el.style.height = `${compHeight}px`;
    // }
    // })
    componentApp = createApp(component.tag, {
      name: id.toString(),
      id: id,
      props:[
        id
      ]
      // render(){
      //   return h('textComp',{
      //     id:id,
      //     data:`${JSON.stringify(component.data)}`,
      //     name:id.toString(),
      //     style:{
      //       position : "absolute",
      //       cursor : "pointer",
      //       left : `${component.position.left}px`,
      //       top : `${component.position.top}px`,
      //       zIndex : `${component.position.zIndex}`,
      //       width :`${compWidth}px`,
      //       height : `${compHeight}px`,
      //     }
      //   },
      //   `${component.template}`)
      // }
    });

    let appNode = document.getElementById(id) as HTMLElement;
    appNode.style.position = "absolute";
    appNode.style.cursor = "pointer";
    appNode.style.left = `${component.position.left}%`;
    appNode.style.top = `${component.position.top}%`;
    appNode.style.zIndex = `${component.position.zIndex}`;
    appNode.style.width = `${compWidth}px`;
    appNode.style.height = `${compHeight}px`;
    componentApp.mount(appNode);
  }, 500);
};

//卸载组件
export const unMountedComponent = (component) => {
  let id = component.info.id;
  const appNode = document.getElementById(id) as HTMLElement;
  componentApp.unmount(appNode);
  if (appNode.parentNode) {
    appNode.parentNode.removeChild(appNode);
  }
};

//导出json数据
export const exportFileJSON = (data, filename) => {
  if (typeof data === "object") {
    data = JSON.stringify(data, null, 4);
  }
  //创建blob对象
  const blob = new Blob([data], { type: "text/json" })
  //添加节点
  const downloadElement = document.createElement('a');
  // 创建下载链接
  const href = window.URL.createObjectURL(blob);
  downloadElement.href = href;
  // 下载文件名
  downloadElement.download = `${filename}`;
  document.body.appendChild(downloadElement);
  downloadElement.click();
  // 移除元素
  document.body.removeChild(downloadElement);
  // 释放blob对象
  window.URL.revokeObjectURL(href);
};

//导入json数据
export const importFileJSON = (ev) => {
  return new Promise((resolve, reject) => {
    const fileDom = ev.target,
      file = fileDom.files[0];

    // 格式判断
    if (file.type !== "application/json") {
      reject("仅允许上传json文件");
    }
    // 检验是否支持FileRender
    if (typeof FileReader === "undefined") {
      reject("当前浏览器不支持FileReader");
    }

    // 执行后清空input的值，防止下次选择同一个文件不会触发onchange事件
    ev.target.value = "";

    // 执行读取json数据操作
    const reader = new FileReader();
    reader.readAsText(file); // 读取的结果还有其他读取方式，我认为text最为方便

    reader.onerror = (err) => {
      reject("json文件解析失败," + err);
    };
    reader.onload = () => {
      const resultData = reader.result as string;
      if (resultData) {
        try {
          const importData = JSON.parse(resultData);
          resolve(importData);
        } catch (error) {
          reject("读取数据解析失败," + error);
        }
      } else {
        reject("读取数据解析失败");
      }
    };
  });
};

//防抖函数
export const debounce=function(fn,delay){
  let t:null|number=null;
  return function(this: any){
   if(t!==null){ //如果不为空，说明之前触发了，把之前触发的都清掉
   clearTimeout(t)
   }
   //新建一个当前触发的
   t=setTimeout(()=>{
   fn.call(this);//这里要改变this指向
   },delay)
  }
 }
 
export default getAttrStr;
