<template>
  <div class="container">

    <!-- форма ввода данных по продукту -->

    <div class="product-card">
      <div class="row product-title input-group-lg mb-3">
        <div class="col-3">
          <label for="product-name" class="input-group-text cell-title">Название</label>
        </div>
        <div class="col-9 cell-value">
          <input type="text" name="product-name" id="product-name" class="form-control" v-model="product.name">
        </div>
      </div>
      <div class="row product-description input-group-lg mb-3">
        <div class="col-3">
          <label for="product-description" class="input-group-text cell-title">Описание</label>
        </div>
        <div class="col-9 cell-value">
          <input type="text" name="product-description" id="product-description" class="form-control" v-model="product.description">
        </div>
      </div>
      <div class="row product-price input-group-lg mb-3">
        <div class="col-3">
          <label for="product-price" class="input-group-text cell-title">Цена</label>
        </div>
        <div class="col-9 cell-value">
          <input type="number" name="product-price" id="product-price" class="form-control" v-model="product.price">
        </div>
      </div>
      <div class="row product-rating-rate input-group-lg mb-3">
        <div class="col-3">
          <label for="product-rating-rate" class="input-group-text cell-title">Рейтинг</label>
        </div>
        <div class="col-9 cell-value">
          <input type="number" name="product-rating" id="product-rating-rate" class="form-control" v-model="product.rating.rate">
        </div>
      </div>
      <div class="row product-rating-count input-group-lg mb-3">
        <div class="col-3">
          <label for="product-rating-count" class="input-group-text cell-title">Рейтинг (кол-во)</label>
        </div>
        <div class="col-9 cell-value">
          <input type="number" name="product-rating" id="product-rating-count" class="form-control" v-model="product.rating.count">
        </div>
      </div>
      <div class="row">
        <button type="button" class="btn btn-primary" @click="addProduct">Добавить</button>
      </div>
    </div>

  </div>
</template>

<script setup>

import { ref } from 'vue';

const emit = defineEmits(['saving', 'newProd']);

const product = ref({ name: '', price: { min: 0, max: 0, }, rating: { min: 0, max: 0, } });

// watch(product, (val) => {
//   const PROC_NAME = 'ProductNew.watch(product)> ';
//   console.log(PROC_NAME, val);


// }, { deep: true });
function addProduct() {
  const PROC_NAME = 'ProductNew.addProduct> ';
  console.log(PROC_NAME + 'product: ', product.value);

  emit('saving', true);       // отправляем событие в родительский компонент о том, что производится загрузка списка продуктов
  fetch('https://fakestoreapi.com/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(product.value)
  })
    .then((res) => res.json())
    .then((res) => {

      emit('saving', false); // загрузка списка товаров завершена
      emit('newProd', res);
      console.log(PROC_NAME + 'Сохранён новый товар: ', res);
    })
    .finally(() => {
      // loading.value = false; 
      emit('saving', false); // загрузка списка товаров завершена
      console.log(PROC_NAME + 'Сохранение нового товара завершено');
    });

}


</script>


<style lang="scss" scoped>
// .product-card {
//   background-color: #fff;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: space-between;
//   border: 1px solid #ccc;
//   padding: 10px;
//   // width: 300px;
//   margin-left: auto;
//   margin-right: auto;
//   margin-top: 60px;
//   color: darkblue;
//   border-radius: 4px;
//   height: 380px;
//   position: relative;
// }

.cell-title {
  text-align: right;
  justify-content: right;
}

.cell-value {
  text-align: left;
}
</style>
