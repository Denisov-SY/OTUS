<template>
  <header>
    <div class="row">
      <div class="col" style="width: 120rem; justify-content: start;">
        <navigation></navigation>
      </div>
      <div class="spacer"></div>

      <div class="col ">
        <form class="" role="search" @submit="changeFilter">
          <div class="input-group flex-nowrap">
            <span class="input-group-text dropdown-toggle filter-button" id="addon-wrapping" aria-expanded="false" @click="() => { showFilter = !showFilter; }">
              <i class="bi bi-search"> </i>
            </span>
            <form v-if="showFilter" class="dropdown-menu p-4">
              <div>
                <comp-filter v-model:filter="filter" @show-filt="(ev) => { showFilter = ev }"> </comp-filter>
              </div>
            </form>
            <input type="text" class="" style="height: 1rem; padding: 5px;" placeholder="Поиск" v-model="filter.name">
            <!-- <span class="input-group-text filter-button" @click="() => { showFilter = false; }"> <i class="bi bi-x-lg"> </i> </span> -->
          </div>
        </form>
      </div>
      <div class="col show-time">{{ currentTime }}</div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

import Navigation from './Navigation.vue';
import CompFilter from './Filter.vue';

const readStorage = defineModel('readStorage');

// const filter = defineModel('filter');
const filter = ref({ name: '', price: { min: 0, max: 0, }, rating: { min: 0, max: 0, } })

const showFilter = ref(false);
const currentTime = ref('');

watch(filter, () => {
  const PROC_NAME = 'PageHeader.watch(filter)> ';
  // console.log(PROC_NAME + 'filter: ', filter.value);
  localStorage.setItem('filter', JSON.stringify(filter.value));
  readStorage.value++;
}, { deep: true });

// watch(showFilter, () => {
//   const PROC_NAME = 'PageHeader.watch(showFilter)> ';
//   console.log(PROC_NAME + 'showFilter: ', showFilter.value);
// });

// const saveFilter = computed(() => { return filter.value; });
// const filter = ref({});

// function openFilter(params) {
//   const PROC_NAME = 'openFilter> ';
//   console.log(PROC_NAME, params);

//   // const myModal = new Modal(document.getElementById('exampleModal'), {})

// }

function changeFilter(ev) {
  ev.preventDefault();
  // console.log('search', filter.value);

}

setInterval(() => { currentTime.value = new Date().toLocaleTimeString(); }, 1000);
</script>

<style lang="scss" scoped>
header {
  background-color: #eee;
  padding: 10px;
  border-bottom: 1px solid #333;
  margin-bottom: 20px;
  border-radius: 5px 5px 0px 0px;
}

.filter-button {
  cursor: pointer;
}

.spacer {
  width: 100%;
}

.input-group {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.input-group-text {
  cursor: pointer;
  border: 1px solid #333;
  border-radius: 5px;
  color: #333;
  width: 100%;
  height: 100%;
  background-color: #eee;
  padding: 0.3rem;

}

.dropdown-menu {
  position: absolute;
  top: 2rem;
  left: 0;
  background-color: #eee;
  border: 1px solid #333;
  padding: 1rem;
  z-index: 999;
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