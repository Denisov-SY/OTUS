<template>
  <div id="app">
    <!-- {{ test }} -->
    <page-header v-model:page="showPage" v-model:filter="setProdFilter"></page-header>
    <page-body :show-page="showPage" @show-page="(ev) => showPage = ev" :filter="setProdFilter"></page-body>
    <page-footer></page-footer>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, computed } from 'vue';
import PageHeader from './components/PageHeader.vue';
import PageBody from './components/PageBody.vue';
import PageFooter from './components/PageFooter.vue';

const showPage = ref(0)
const setProdFilter = ref({ name: '', price: { min: 0, max: 0, }, rating: { min: 0, max: 0, } })
// const test = computed(() => {
//   console.log('showPage.value = ', showPage.value)
//   return showPage.value;
// })

</script>

<style lang="scss" scoped>
#app {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  width: 100vw;
}
</style>
