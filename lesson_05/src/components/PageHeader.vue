<template>
  <div>
    <header class="p-3 mb-3 border-bottom">
      <div class="container">
        <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <!-- <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none">
            <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap">
              <use xlink:href="#bootstrap"></use>
            </svg>
          </a> -->

          <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <!-- <li><a href="#" class="nav-link px-2 link-secondary">Overview</a></li> -->
            <li><a href="#" class="nav-link px-2 link-body-emphasis" :class="showPage === 0 ? 'fw-bold' : ''" @click="showPage = 0">Список товаров</a></li>
            <li><a href="#" class="nav-link px-2 link-body-emphasis" :class="showPage === 1 ? 'fw-bold' : ''" @click="showPage = 1">Заказ</a></li>
            <li><a href="#" class="nav-link px-2 link-body-emphasis" :class="showPage === 2 ? 'fw-bold' : ''" @click="showPage = 2">Новый товар</a></li>
          </ul>

          <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
            <div class="input-group flex-nowrap">
              <span class="input-group-text dropdown-toggle filter-button" id="addon-wrapping" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                <i class="bi bi-search"> </i>
              </span>
              <form class="dropdown-menu p-4">
                <div>
                  <comp-filter v-model:filter="filter"> </comp-filter>
                </div>
                <!-- <div class="mb-3">
                  <label for="exampleDropdownFormEmail2" class="form-label">Email address</label>
                  <input type="email" class="form-control" id="exampleDropdownFormEmail2" placeholder="email@example.com">
                </div>
                <div class="mb-3">
                  <label for="exampleDropdownFormPassword2" class="form-label">Password</label>
                  <input type="password" class="form-control" id="exampleDropdownFormPassword2" placeholder="Password">
                </div>
                <div class="mb-3">
                  <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="dropdownCheck2">
                    <label class="form-check-label" for="dropdownCheck2">
                      Remember me
                    </label>
                  </div>
                </div>
                <button type="button" class="btn btn-primary">Sign in</button> -->
              </form>
              <input type="text" class="form-control" placeholder="Поиск" aria-label="Поиск" aria-describedby="addon-wrapping" v-model="filter.name">
              <span class="input-group-text filter-button" @click="() => { filter.name = ''; filter.price.min = 0; filter.price.max = 0; filter.rating.min = 0; filter.rating.max = 0; }"> <i class="bi bi-x-lg"> </i> </span>
              <!-- <button type="button" @click="() => { console.log(filter) }">qqq</button> -->
            </div>
          </form>
          <!-- Modal -->



          <!-- <div class="dropdown text-end">
            <a href="#" class="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" class="rounded-circle">
            </a>
            <ul class="dropdown-menu text-small">
              <li><a class="dropdown-item" href="#">New project...</a></li>
              <li><a class="dropdown-item" href="#">Settings</a></li>
              <li><a class="dropdown-item" href="#">Profile</a></li>
              <li>
                <hr class="dropdown-divider">
              </li>
              <li><a class="dropdown-item" href="#">Sign out</a></li>
            </ul>
          </div> -->
        </div>
      </div>
    </header>
  </div>
</template>

<script setup>
// import { Modal } from 'bootstrap';
import CompFilter from './Filter.vue';

const showPage = defineModel('page');
const filter = defineModel('filter');

// const filter = ref({});

// function openFilter(params) {
//   const PROC_NAME = 'openFilter> ';
//   console.log(PROC_NAME, params);

//   // const myModal = new Modal(document.getElementById('exampleModal'), {})

// }
</script>

<style lang="scss" scoped>
.filter-button {
  cursor: pointer;
}
</style>