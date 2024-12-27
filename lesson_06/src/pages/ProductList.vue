<template>
  <div>
    <div v-if="!loading">
      <div v-if="!errorLoading">
        <div class="row" style="justify-content: flex-end;">
          <div class="col inform">
            <div class="row">
              <span>Количество товаров в каталоге: {{ filtered?.length }}</span>
            </div>
            <div class="row">
              <span>Количество товаров в корзине: {{ cart?.length }}</span>
            </div>
          </div>
          <div class="col">
            <button type="button" class="btn" @click="loadProductList">Обновить</button>
          </div>
        </div>
        <div v-if="filtered?.length > 0">
          <ul class="product-list">
            <li class="product-wrapper" v-for="(prod, index) in filtered" :key="prod.id">
              <product :product="prod" />
            </li>
          </ul>
        </div>
        <div v-else class="row">
          <div class="col">
            <span>Каталог пуст</span>
          </div>
        </div>
      </div>
      <div v-else class="error">
        <div class="row">
          <div class="col">
            <h1>Ошибка загрузки каталога</h1>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <button type="button" class="btn" @click="loadProductList">Обновить</button>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="row loading">
      <div class="col">
        <span> Загрузка каталога </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, computed } from 'vue';
import Product from '../components/Product.vue'

const Products = ref([]);
const loading = ref(false);
const errorLoading = ref(false);
const cart = ref([]);

// const props = defineProps(['readStorage']);
// const emit = defineEmits(['loading']);

// const filter = ref('');
const filter = computed(() => {
  const PROC_NAME = 'ProductList.computed(props.readStorage)> ';
  console.log(PROC_NAME + 'window.globalReadStorage.value: ', window.globalReadStorage.value);
  // console.log(PROC_NAME + 'cart: ', localStorage.getItem('cart'));
  cart.value = JSON.parse(localStorage.getItem('cart') ?? '[]');

  return JSON.parse(localStorage.getItem('filter'));
});

// const cart = computed(() => {
//   const PROC_NAME = 'ProductList.computed(readStorage)> ';
//   console.log(PROC_NAME + 'window.globalReadStorage.value: ', window.globalReadStorage.value);

//   return JSON.parse(localStorage.getItem('cart') ?? );
// });

onBeforeMount(() => {
  const PROC_NAME = 'ProductList.onBeforeMount> ';
  // console.log(PROC_NAME + 'props.filter: ', props.filter);

  if (!localStorage.getItem('productList')) {
    loadProductList().then(() => {
      console.log(PROC_NAME + 'Загружен список товаров из API', Products.value);
    });
  } else {
    Products.value = JSON.parse(localStorage.getItem('productList'));
    console.log(PROC_NAME + 'Загружен список товаров из localStorage: ', Products.value);
  }
});

async function loadProductList() {
  const PROC_NAME = 'loadProductList';
  loading.value = true; // загрузка списка товаров в процессе
  fetch('https://fakestoreapi.com/products')
    .catch((err) => {
      console.log(PROC_NAME + 'Ошибка загрузки списка товаров: ', err);
      errorLoading.value = true;
      // loading.value = false; // загрузка списка товаров завершена
    })
    .then((res) => res.json())
    .then((res) => {
      Products.value = res;
      console.log(PROC_NAME + 'Загружен список товаров: ', Products.value);
      localStorage.setItem('productList', JSON.stringify(res));
    })
    .finally(() => {
      // loading.value = false; 
      // emit('loading', false); // загрузка списка товаров завершена
      console.log(PROC_NAME + 'Загрузка списка товаров завершена');
      loading.value = false; // загрузка списка товаров завершена
    });
}

const filtered = computed(() => { return filterProducts(Products.value, filter.value) });

function filterProducts(prods, filter) {
  const PROC_NAME = 'ProductList.filterProducts> ';
  console.log(PROC_NAME + 'filter: ', filter);

  // return [];
  if (filter) {
    return prods.length > 0 ? prods.filter((prod) =>
      (filter?.name ? prod.title.toLowerCase().includes(filter.name.toLowerCase()) : true) &&
      (filter?.price?.min > 0 ? prod?.price >= filter?.price?.min : true) &&
      (filter?.price?.max > 0 ? prod?.price <= filter?.price?.max : true) &&
      (filter?.rating?.min > 0 ? prod?.rating?.rate >= filter?.rating.min - .5 : true) &&
      (filter?.rating?.max > 0 ? prod?.rating?.rate <= filter?.rating.max + .5 : true)
    ) : [];
  }
  else { return prods; }
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
  z-index: 1;
}

.product-wrapper {
  display: block;
  width: 300px;
  // height: 400px;
  float: left;
}

.btn {
  background-color: cornflowerblue;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 10px;
  cursor: pointer;
  border-radius: 3px;
  transition: all 0.25s ease;
  z-index: 2;
}

.inform {
  font-size: 1.2rem;
  font-weight: 300;
  color: #000;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: 10px;
  flex-direction: column;
  align-items: flex-end;
}

// .inform .row{
//   justify-content: flex-end;
// }

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: xx-large;
}

.error {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: xx-large;
  color: red;
}
</style>
