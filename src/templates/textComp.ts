// //组件样式控制

// import getAttrStr from '../utils/index';
// import textComp from '../components/textComp.vue'

// let handle=(attr?,dataStr?)=>{
//  // 属性
//  let attribute:Array<object> = [{
//     name:"宽度",
//     type:'input',
//     key:'width',
//     value:100,
//     placeholder:'请输入宽度'
// },{
//     name:'高度',
//     type:'input',
//     key:'height',
//     value:40,
//     placeholder:'请输入高度'
// },{
//     name:'字体大小',
//     type:'input',
//     key:'fontSize',
//     value:15,
//     placeholder:'请输入字体大小'
// },{
//     name:'字体颜色',
//     type:'color',
//     key:'color',
//     value:'#00FFFF',
//     placeholder:'请选择字体颜色'
// }]
// if(attr){
//     attribute=attr
// }
// // 数据
// let data:string = '默认文本'
// if(dataStr){
//     data=JSON.parse(dataStr)
// }

// // let data = {txt:'默认文本'}
// let tag=textComp

// return {attribute,data,tag,getAttrStr}
// }

// export default handle