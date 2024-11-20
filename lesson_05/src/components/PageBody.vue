<template>
  <div>
    <div>{{ showPage }}</div>
    <template v-if="showPage === 0">
      <!-- ProductList -->
      <product-list>

      </product-list>
    </template>
    <template v-else-if="showPage === 1">
      <div>
        ЗАКАЗ
      </div>
    </template>
    <template v-else-if="showPage === 2">
      <div>
        НОВЫЙ ТОВАР
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ProductList from './ProductList.vue';

defineProps(['showPage']);

</script>

<style lang="scss" scoped></style>