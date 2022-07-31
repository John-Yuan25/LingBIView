// //组件样式控制

// import getAttrStr from '../utils/index';
// import categoryComp from '../components/categoryComp.vue'


// let handle=(attr?,dataStr?)=>{
//  // 属性
//  let attribute:Array<object> = [{
//     name:"宽度",
//     type:'input',
//     key:'width',
//     value:300,
//     placeholder:'请输入宽度'
// },{
//     name:'高度',
//     type:'input',
//     key:'height',
//     value:300,
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
// let tag=categoryComp
// // 模板
// let template = `<categoryComp ${getAttrStr(attribute)} data='${JSON.stringify(data)}'></categoryComp>`
// return {attribute,data,template,tag,getAttrStr}
// }

// export default handle