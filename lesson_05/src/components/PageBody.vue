<template>
  <div>
    <div v-show="!loading && !saving">
      <template v-if="pageNum === 0">
        <!-- ProductList -->
        <product-list @loading="(ev) => loading = ev" :filter="filter">
        </product-list>
      </template>
      <template v-else-if="pageNum === 1">
        <div class="text-center">
          ЗАКАЗ
        </div>
      </template>
      <template v-else-if="pageNum === 2">
        <div>
          <product-new @saving="(ev) => saving = ev" @new-prod="addNewProduct(ev)"></product-new>
        </div>
      </template>
    </div>
    <div v-show="loading || saving" class="loading">
      <span v-if="loading">
        Загрузка...
      </span>
      <span v-if="saving">
        Сохранение...
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import ProductList from './ProductList.vue';
import ProductNew from './ProductNew.vue';

const props = defineProps(['showPage', 'filter']);

const loading = ref(false);
const saving = ref(false);
const pageNum = ref(0);     // Номер страницы
const productNew = ref(0);
// const productNew = ref({ name: '', price: { min: 0, max: 0, }, rating: { min: 0, max: 0, } });

function addNewProduct(params) {
  const PROC_NAME = 'PageBody.addNewProduct> ';

  productNew.value = params;
  pageNum.value = 0;
  console.log(PROC_NAME, params);
}

watch(props, (val) => { pageNum.value = val.showPage; });

</script>

<style lang="scss" scoped>
.loading {
  text-align: center;
}
</style>