<template>
  <div>
    <!-- <div v-if="loading">Loading...</div> -->
    <ul class="product-list">
      <li class="product-wrapper" v-for="(prod, index) in filterProducts(Products, filter)" :key="prod.id">
        <!-- <product v-if="index < 7" :product="prod" /> -->
        <product :product="prod" />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import Product from './Product.vue'

const Products = ref([{}]);
// const loading = ref(false);

const props = defineProps(['filter']);
const emit = defineEmits(['loading']);

onBeforeMount(() => {
  const PROC_NAME = 'ProductList.onBeforeMount> ';
  // if (Products.value.length <= 1) {
    // loading.value = true;
    emit('loading', true);       // отправляем событие в родительский компонент о том, что производится загрузка списка продуктов
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((res) => {
        Products.value = res;
        console.log(PROC_NAME + 'Загружен список товаров: ', Products.value);
      })
      .finally(() => {
        // loading.value = false; 
        emit('loading', false); // загрузка списка товаров завершена
        console.log(PROC_NAME + 'Загрузка списка товаров завершена');
      });
  // }
});

function filterProducts(prods, filter) {
  const PROC_NAME = 'ProductList.filterProducts> ';


  return prods.length > 0 ? prods.filter((prod) =>
    (filter.name ? prod.title.includes(filter.name) : true) &&
    (filter.price.min > 0 ? prod.price >= filter.price.min : true) &&
    (filter.price.max > 0 ? prod.price <= filter.price.max : true) &&
    (filter.rating.min > 0 ? prod.rating.rate >= filter.rating.min - .5 : true) &&
    (filter.rating.max > 0 ? prod.rating.rate <= filter.rating.max + .5 : true)
  ) : [];
}

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
  margin-top: -40px;
}


.product-wrapper {
  display: block;
  width: 300px;
  // height: 400px;
  float: left;
}
</style>
