<template>
  <div id="app">
    <!-- {{ test }} -->
    <!-- <page-header v-model:read-storage="readStorage"></page-header> -->
    <!-- <page-body :read-storage="readStorage"></page-body> -->
    <page-header></page-header>
    <page-body></page-body>
    <page-footer></page-footer>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, computed } from 'vue';

import PageHeader from './components/PageHeader.vue';
import PageBody from './components/PageBody.vue';
import PageFooter from './components/PageFooter.vue';

// const readStorage = ref(0);

// onBeforeMount(() => {
//   localStorage.setItem('productList', '');
//   localStorage.setItem('cart', '');
// });

</script>

<style>
body {
  font-family: sans-serif;
}

.row {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  /* height: 40px; */
  width: 100%;
}

.col {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.wfull{
  width: 100%;
}
</style>

<style lang="scss" scoped>
#app {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  // height: 100vh;
  // width: 100vw;
}
</style>
