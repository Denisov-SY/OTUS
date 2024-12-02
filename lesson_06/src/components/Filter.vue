<template>
  <div>
    <!-- <div class="row mb-2">
      <div class="col-12 text-center">
        <label for="Name" @click="() => { console.log(filter) }">Название: </label>
        <input type="text" class="input-name mx-2" v-model="filter.name" />
      </div>
    </div> -->
    <div class="row mb-2">
      <div class="col-3">
        <label for="price">Цена:</label>
      </div>
      <div class="col-9">
        <input type="number" class="input-number" v-model="filter.price.min" /> - <input type="number" class="input-number" v-model="filter.price.max" />
      </div>
    </div>
    <div class="row mb-2">
      <div class="col-3">
        <label for="rating">Рейтинг:</label>
      </div>
      <div class="col-9">
        <input type="number" class="input-number" v-model="filter.rating.min" /> - <input type="number" class="input-number" v-model="filter.rating.max" />
      </div>
    </div>
    <div class="row">
      <div class="col"> <button type="button" @click="closeFilter">Закрыть</button> </div>
      <div class="col"><button type="button" @click="clearFilter">Очистить</button></div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const model = defineModel('filter');
const emit = defineEmits(['showFilt']);
// const filter = ref({ price: { min: 0, max: 0, }, name: '', rating: { min: 0, max: 0, } });
const filter = ref(model ?? { price: { min: 0, max: 0, }, name: '', rating: { min: 0, max: 0, } });



// watch(() => JSON.stringify(filter.value), (val) => {
//   const PROC_NAME = 'watch(filter)> ';
//   console.log(PROC_NAME, val);
// });

watch(filter, (val) => {
  // const PROC_NAME = 'Filter.watch(filter)> ';
  // console.log(PROC_NAME, val);
  model.value = val;
}, { deep: true });

function closeFilter(ev) {
  console.log("closeFilter");
  emit('showFilt', false);
}

function clearFilter(ev) {
  console.log("clearFilter");
  filter.value = { price: { min: 0, max: 0, }, name: '', rating: { min: 0, max: 0, } };
  emit('showFilt', false);
}

</script>

<style lang="scss" scoped>
.input-number {
  width: 3rem;
  text-align: center;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}

.input-name {
  width: 7rem;
  // margin-left: 0.5rem;
}
</style>