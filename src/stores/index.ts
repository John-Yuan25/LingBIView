export * from './currStore'
export * from './userItems'

export * from './text'
export * from './imgStore'
export * from './categoryLineStore'
export * from './categoryBarStore'
export * from './pieStore'
export * from './divStore'
export * from './scatterStore'
export * from './mapStore'
export * from './videoStore'
export * from './numberStore'
export * from './kLineStore'
export * from './radarStore'
export * from './funnelStore'
export * from './gaugeStore'
export * from './btnStore'
export * from './progressStore'


import text from './text';
import img from './imgStore';
import categoryLineStore from './categoryLineStore';
import categoryBarStore from './categoryBarStore';
import pieStore from './pieStore';
import divStore from './divStore';
import scatterStore from './scatterStore';
import mapStore from './mapStore';
import videoStore from './videoStore';
import numberStore from './numberStore';
import kLineStore from './kLineStore';
import radarStore from './radarStore';
import funnelStore from './funnelStore';
import gaugeStore from './gaugeStore';
import btnStore from './btnStore';
import progressStore from './progressStore';



let obj={
  textComp:text,
  imgComp:img,
  categoryLineComp:categoryLineStore,
  categoryBarComp:categoryBarStore,
  pieComp:pieStore,
  divComp:divStore,
  scatterComp:scatterStore,
  mapComp:mapStore,
  videoComp:videoStore,
  numberComp:numberStore,
  kLineComp:kLineStore,
  radarComp:radarStore,
  funnelComp:funnelStore,
  gaugeComp:gaugeStore,
  btnComp:btnStore,
  progressComp:progressStore,
}

let getComponent=(info:any)=>{
  let component=obj[info.type](info.id)()
  component.info=info
  return component
}

export default getComponent