<template>
  <div class="container">
    <div class="product-card">
      <div class="rating">
        <!-- {{ props.product.rating.rate }} -->
        <span class="hint-star star" :title="'Rate: ' + props.product?.rating?.rate + ' Count: ' + props.product?.rating?.count">
          <i :class="['bi', props.product?.rating?.rate >= .5 ? 'bi-star-fill' : 'bi-star']" aria-hidden="true"></i>
          <i :class="['bi', props.product?.rating?.rate >= 1.5 ? 'bi-star-fill' : 'bi-star']" aria-hidden="true"></i>
          <i :class="['bi', props.product?.rating?.rate >= 2.5 ? 'bi-star-fill' : 'bi-star']" aria-hidden="true"></i>
          <i :class="['bi', props.product?.rating?.rate >= 3.5 ? 'bi-star-fill' : 'bi-star']" aria-hidden="true"></i>
          <i :class="['bi', props.product?.rating?.rate >= 4.5 ? 'bi-star-fill' : 'bi-star']" aria-hidden="true"></i>
        </span>
      </div>
      <div class="product-image">
        <img :src="props.product.image" :alt="props.product.title" />
        <div class="info">
          <h2> Description </h2>
          <div>
            <p>
              {{ props.product.description }}
            </p>
          </div>
        </div>
      </div>
      <div class="product-details">
        <h2 class="product-title">{{ props.product.title }}</h2>
        <h4 class="product-price"> ${{ props.product.price }}</h4>
        <div v-if="Quantity > 0">
          <button class="add-to-cart-btn" @click="addToCart(1)">+</button>
          Cart: {{ Quantity }}
          <button class="add-to-cart-btn" @click="addToCart(-1)">-</button>
        </div>
        <div v-else>
          <button class="add-to-cart-btn" @click="addToCart">Add to Cart</button>
        </div>
        <router-link :to="{ name: 'product', params: { id: props.product.id ?? 0 } }"><button class="view-btn"> View</button></router-link>
      </div>
    </div>
  </div>
</template>

<script setup>

import { onBeforeMount } from 'vue';

// import { onMounted } from 'vue';
const props = defineProps({
  product: Object,
});

const Quantity = ref(props.product.quantity ?? 0);
// onMounted(() => {
//   const PROC_NAME = 'Product.onMount> ';
//   // console.log(PROC_NAME + 'props.product: ', props.product);
// });
const prod = ref(props.product);

onBeforeMount(() => {
  const PROC_NAME = 'Product.onBeforeMount> ';
  console.log(PROC_NAME + 'props.product: ', props.product);
  
  // prod.value = JSON.parse(localStorage.getItem('productList'))?.find(item => item.id === props.product.id);

});

function addToCart(quantity) {
  const PROC_NAME = 'Product.addToCart> ';
  window.globalReadStorage.value++;
  console.log(PROC_NAME + 'window.globalReadStorage: ', window.globalReadStorage.value, 'quantity=' + quantity);

  const prod = JSON.parse(localStorage.getItem('productList'))?.find(item => item.id === props.product.id);
  prod?.quantity += quantity;
  Quantity.value += quantity;
  localStorage.setItem('productList', JSON.stringify(prod));

  // const cart = JSON.parse(localStorage.getItem('cart'));
  // const cartOne = cart.find(item => item.id === props.product.id);
  // if (cartOne || cartOne.quantity > 0) {
  //   cartOne.quantity += quantity;
  // } else {
  //   const prodOne = props.product;
  //   prodOne.quantity = 1;
  //   cart.push(prodOne);
  // }
  // localStorage.setItem('cart', JSON.stringify(cart));
}

</script>


<style lang="scss" scoped>
.product-card {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ccc;
  padding: 10px;
  // width: 300px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 60px;
  color: darkblue;
  border-radius: 4px;
  height: 380px;
  position: relative;
}

.rating {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  width: 1rem;
}

.hint-star {
  display: inline-block;
  // margin-left: 0.5em;
  color: gold;
  width: 50%;

  z-index: 9;
  position: relative;
}

.product-image {
  // width: 100%;
  height: 200px;
  margin-bottom: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // transition: all 0.3s ease-out;

  // display: inline-block;
  position: relative;
  overflow: hidden;
  width: 100%;
  // height: 100%;
  // float: right;
  // width: 45%;
  // display: inline-block;
}

.info {
  background: rgba(27, 26, 26, 0.9);
  // font-family: 'Bree Serif', serif;
  transition: all 0.3s ease-out;
  transform: translateX(-105%);
  position: absolute;
  line-height: 1.5;
  text-align: left;
  font-size: 12px;
  // cursor: no-drop;
  color: #FFF;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  // scroll-
}

.info h2 {
  text-align: center;
}

.info p {
  margin: 0;
  padding: 0 0.5rem 0 0.5rem;
}

.product-image:hover .info {
  transform: translateX(0);
}

// .product-image:hover img {
//   transition: all 0.3s ease-out;
// }

// .product-image:hover img {
//   transform: scale(1.2, 1.2);
// }

.product-image img {
  max-width: 100%;
  max-height: 100%;
  width: min-content;
}

.product-title {
  font-size: 18px;
  margin: 0;
  text-align: center;
}

.product-price {
  font-size: 20px;
  margin: 0;
  text-align: center;
  color: black
}

.add-to-cart-btn,
.view-btn {
  background-color: cornflowerblue;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 10px;
  cursor: pointer;
  border-radius: 3px;
  transition: all 0.25s ease;
}

.add-to-cart-btn:hover,
.view-btn:hover {
  opacity: 0.8;
}
</style>
