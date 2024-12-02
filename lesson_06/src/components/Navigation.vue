<template>
  <div class="nav-menu">
    <div class="row">
      <div class="col">
        <ul>
          <li><router-link to="/">Главная</router-link></li>
          <li><router-link to="/catalog">Каталог</router-link></li>
          <li><router-link to="/order">Заказ</router-link></li>
          <li><router-link to="/new-product">Новый товар</router-link></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { computed, ref } from 'vue';
// const props = defineProps(['catalog']);

// const filter = computed(() => {
//   const PROC_NAME = 'Navigation.computed(filter)> ';
//   console.log(PROC_NAME + 'filter: ', filter.value);
//   return JSON.stringify(props.catalog);
// });

</script>

<style lang="scss" scoped>
.nav-menu {
  font-family: sans-serif;
  font-size: large;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

li {
  display: inline-block;
  margin-left: 0.5rem;
  margin-right: 1rem;

}
</style>