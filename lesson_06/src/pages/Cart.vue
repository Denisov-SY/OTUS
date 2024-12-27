<template>
  <div>
    <h1 class="row page-title">Корзина товаров</h1>
    <div class="row">
      <div class="col wfull">
        <div v-for="(item, index) in cart" :key="index" class="row product">
          <div class="col"> {{ index + 1 }}</div>
          <div class="col"> {{ item.title }}</div>
          <div class="col"> {{ item.quantity }} шт.</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import { onBeforeMount, ref } from 'vue';

const cart = ref([]);

function loadCart(params) {
  const PROC_NAME = 'cart.loadCart> ';

  cart.value = JSON.parse(localStorage.getItem('productList'))?.filter((item) => item.quantity > 0);
}

onBeforeMount(() => {
  loadCart();
});

</script>

<style lang="scss" scoped>
.page-title{
  justify-content: center;
}

.product{
      height: 40px;
        margin-top: 10px;
        margin-bottom: 15px;
        border-bottom: 1px solid #555;
}
</style>