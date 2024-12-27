<template>
  <header>
    <div class="row">
      <div class="col" style="width: 120rem; justify-content: start;">
        <navigation></navigation>
      </div>
      <div class="spacer"></div>

      <prod-filter></prod-filter>

      <div class="col show-time">{{ currentTime }}</div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

import Navigation from './Navigation.vue';
import ProdFilter from './Filter.vue';

// const readStorage = defineModel('readStorage');

// const filter = ref({ name: '', price: { min: 0, max: 0, }, rating: { min: 0, max: 0, } })

const currentTime = ref(new Date().toLocaleTimeString());

setInterval(() => { currentTime.value = new Date().toLocaleTimeString(); }, 1000);
</script>

<style lang="scss" scoped>
header {
  background-color: #eee;
  padding: 10px;
  border-bottom: 1px solid #333;
  margin-bottom: 20px;
  border-radius: 5px 5px 0px 0px;
  height: 40px;
}

.spacer {
  width: 100%;
}

.show-time {
  text-align: right;
  font-size: large;
  font-weight: bold;
  font-family: sans-serif;
  color: #111;
  padding-left: 1rem;
  padding-right: 1rem;
}
</style>