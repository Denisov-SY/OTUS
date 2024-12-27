<template>
  <div>
    <div class="row">
      <div v-if="prod?.id" class="col">
        <product :product="prod"/>
      </div>
      <div v-else class="col">
        <span>Товар не выбран</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import Product from '../components/Product.vue'

const prod = ref({});
const props = defineProps(['id', 'readStorage']);

onBeforeMount(() => {
  const PROC_NAME = 'Product.onBeforeMount> ';
  console.log(PROC_NAME + 'props.id: ', props.id);
  // console.log(PROC_NAME + 'localStorage.productList: ', JSON.parse(localStorage.getItem('productList')));
  // console.log(PROC_NAME + 'prod: ', JSON.parse(localStorage.getItem('productList'))?.find(p => p.id === +props.id));
  prod.value = JSON.parse(localStorage.getItem('productList'))?.find(p => p.id === +props.id);
})

</script>

<style lang="scss" scoped>
div.row{
  justify-content: center;
}
</style>