<template>
  <div>
    <ul class="product-list">
      <li class="product-wrapper" v-for="(prod, index) in Products" :key="prod.id">
        <product v-if="index < 7" :product="prod" />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import Product from './components/Product.vue'

const Products = ref([{}]);

onBeforeMount(() => {
  const PROC_NAME = 'App.onBeforeMount> ';
  fetch('https://fakestoreapi.com/products')
    .then((res) => res.json())
    .then((res) => {
      Products.value = res;
      console.log(PROC_NAME + 'Загружен список товаров: ', Products.value);
    });

});


</script>

<style lang="scss" scoped>
.product-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: stretch;


  row-gap: 1rem;
  column-gap: 1rem;
}


.product-wrapper {
  display: block;
  width: 300px;
  height: 400px;
  float: left;
}
</style>
