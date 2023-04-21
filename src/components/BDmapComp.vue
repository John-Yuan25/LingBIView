<template>
  <div @click="changeStoreId" class="divBox" :style="(setStyle as any)">
    <div class="mapBox" id="container">

    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { useBDmapStore, useCurrStore } from '@/stores';
import { toRef, ref,watch } from 'vue';

const props = defineProps([
  'id',
  'currStoreId'
])
let storeId = props.id
const currStore = useCurrStore(props.currStoreId)()
const BDmapStore = useBDmapStore(storeId)()
let styleAttribute: any = toRef(BDmapStore, 'attribute')
//zindex属性在父节点
const parentNode = document.getElementById(storeId) as HTMLElement;
parentNode.style.zIndex = styleAttribute.value[2].value;
let pointE=toRef(BDmapStore, 'pointE');
let pointN=toRef(BDmapStore, 'pointN');
let markerPointE=toRef(BDmapStore, 'markerPointE');
let markerPointN=toRef(BDmapStore, 'markerPointN');
//异步生成地图，红色报错不用管
let map;
let point; 
let markerPoint; 
let scaleCtrl;
let zoomCtrl;
let cityCtrl;
let marker;
setTimeout(() => {
  map = new BMapGL.Map("container");
  point = new BMapGL.Point(BDmapStore.pointE, BDmapStore.pointN);
  markerPoint = new BMapGL.Point(BDmapStore.markerPointE, BDmapStore.markerPointN);
  cityCtrl = new BMapGL.CityListControl();  // 添加城市列表控件
  marker = new BMapGL.Marker(markerPoint);        // 创建标注  
  map.centerAndZoom(point, 15);
  map.enableScrollWheelZoom(true);
  map.setMapType(window.BMAP_EARTH_MAP);
  map.addControl(scaleCtrl);
  map.addControl(zoomCtrl);
  map.addControl(cityCtrl);
  map.addOverlay(marker);                     // 将标注添加到地图中
}, 0)
//监控数据变化改变地图
watch(
    [pointE,pointN,markerPointE,markerPointN],
    (newValue, oldValue) => {
      let oldMarker=marker;//保存旧标注
      point = new BMapGL.Point(BDmapStore.pointE, BDmapStore.pointN);
      markerPoint = new BMapGL.Point(BDmapStore.markerPointE, BDmapStore.markerPointN);
      marker = new BMapGL.Marker(markerPoint); 
      map.removeOverlay(oldMarker);//清除旧标注
      map.centerAndZoom(point, 15);
      map.addOverlay(marker);  
    }
)


let setStyle = computed(() => {
  return {
    [styleAttribute.value[0].key]: styleAttribute.value[0].value + 'px',
    [styleAttribute.value[1].key]: styleAttribute.value[1].value + 'px',
    [styleAttribute.value[2].key]: styleAttribute.value[2].value,
  }
})
function changeStoreId() {
  currStore.$patch({
    currStoreId: storeId,
    type: 'BDmapComp'
  })
}
</script>
<style scoped>
.divBox {
  position: relative;
}

.mapBox {
  width: 100%;
  height: 100%;
}
</style>