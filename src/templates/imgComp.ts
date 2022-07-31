// //组件样式控制

// import getAttrStr from '../utils/index';
// import imgComp from '../components/imgComp.vue'

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
// }
// ]
// if(attr){
//     attribute=attr
// }
// // 数据
// let data:object ={filename:'logo.png'}
// if(dataStr){
//     data=JSON.parse(dataStr)
// }

// // let data = {txt:'默认文本'}
// let tag=imgComp
// // 模板
// let template = `<picComp ${getAttrStr(attribute)} data='${JSON.stringify(data)}'></picComp>`
// return {attribute,data,template,tag,getAttrStr}
// }

// export default handle