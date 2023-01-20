<template>
  <div class="mediaPhone">请在web端打开</div>
  <router-view></router-view>
</template>

<script setup lang="ts">


</script>

<style lang="less" >
* {
  padding: 0;
  margin: 0;
}

html,
body,
#app {
  height: 100%;
  overflow-x: hidden;
  overflow-y: hidden;
}

.mediaPhone {
  z-index: 999;
  width: 100%;
  height: 100%;
  position: absolute;
  display: block;
  background-color: aqua;
}

@media screen {
  @media (min-width: 768px) {
    .mediaPhone {
      display: none;
    }
  }
}
</style>