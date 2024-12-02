<template>
  <div id="app">
    <!-- {{ test }} -->
    <page-header v-model:read-storage="readStorage"></page-header>
    <page-body :read-storage="readStorage"></page-body>
    <page-footer></page-footer>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, computed } from 'vue';

import PageHeader from './components/PageHeader.vue';
import PageBody from './components/PageBody.vue';
import PageFooter from './components/PageFooter.vue';

const readStorage = ref(0);
// const showPage = ref(0)
// const test = computed(() => {
//   console.log('showPage.value = ', showPage.value)
//   return showPage.value;
// })

</script>

<style>
.row {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  height: 40px;
}

.col {
  display: flex;
  justify-content: space-around;
  align-items: center;
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
