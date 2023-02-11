export * from './currStore'

export * from './text'
export * from './imgStore'
export * from './categoryLineStore'
export * from './categoryBarStore'
export * from './pieStore'
export * from './divStore'
export * from './scatterStore'

import text from './text';
import img from './imgStore'
import categoryLineStore from './categoryLineStore';
import categoryBarStore from './categoryBarStore';
import pieStore from './pieStore';
import divStore from './divStore';
import scatterStore from './scatterStore';



let obj={
  textComp:text,
  imgComp:img,
  categoryLineComp:categoryLineStore,
  categoryBarComp:categoryBarStore,
  pieComp:pieStore,
  divComp:divStore,
  scatterComp:scatterStore,
}

let getComponent=(info:any)=>{
  let component=obj[info.type](info.id)()
  component.info=info
  return component
}

export default getComponent