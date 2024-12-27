<template>
  <div>
    <div class="row">
      <div class="col ">
        <form class="" role="search" @submit="changeFilter">
          <div class="input-group flex-nowrap">
            <span class="input-group-text dropdown-toggle filter-button" id="addon-wrapping" aria-expanded="false" @click="() => { showDropdown = !showDropdown; }">
              <i class="bi bi-search"> </i>
            </span>
            <form v-if="showDropdown" class="dropdown-menu p-4">
              <div>
                <!-- <comp-filter v-model:filter="filter" @show-filt="(ev) => { showFilter = ev }"> </comp-filter> -->

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
            </form>
            <input type="text" class="" style="height: 1rem; padding: 5px;" placeholder="Поиск" v-model="filter.name">
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

// const model = defineModel('filter');
// const emit = defineEmits(['showFilt']);
// const filter = ref({ price: { min: 0, max: 0, }, name: '', rating: { min: 0, max: 0, } });

// const readStorage = defineModel('readStorage');

const filter = ref({ price: { min: 0, max: 0, }, name: '', rating: { min: 0, max: 0, } });

const showDropdown = ref(false);

// watch(() => JSON.stringify(filter.value), (val) => {
//   const PROC_NAME = 'watch(filter)> ';
//   console.log(PROC_NAME, val);
// });

// watch(filter, (val) => {
//   // const PROC_NAME = 'Filter.watch(filter)> ';
//   // console.log(PROC_NAME, val);
//   model.value = val;
// }, { deep: true });

watch(filter, () => {
  const PROC_NAME = 'PageHeader.watch(filter)> ';
  // console.log(PROC_NAME + 'filter: ', filter.value);
  localStorage.setItem('filter', JSON.stringify(filter.value));
  window.globalReadStorage.value++;
  // readStorage.value++;
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

function changeFilter(ev) {
  ev.preventDefault();
  // console.log('search', filter.value);

}


</script>

<style lang="scss" scoped>
.input-number {
  width: 2.0rem;
  text-align: center;
  margin-left: 0.3rem;
  margin-right: 0.3rem;
}

.input-name {
  width: 7rem;
  // margin-left: 0.5rem;
}

.filter-button {
  cursor: pointer;
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
  border-radius: 0px 0px 5px 5px;
}

.mb-2{
  margin-bottom: 0.5rem;
}
</style>