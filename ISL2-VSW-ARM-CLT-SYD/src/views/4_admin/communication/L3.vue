<template>
  <div>
    <div class="row">
      <div class="col">
        <span>
          <div class="blockt"><span class="pmx5"> L3 </span></div>
        </span>
      </div>
    </div>
    <!-- Фильтры -->
    <div class="row blockt-h100">
      <div class="col-12 pmy0">
        <div class="header pmy0">
          <p> Фильтры</p>
        </div>
        <div class="q-pa-sm q-gutter-sm pmy1">
        </div>
      </div>
    </div>

    <!-- Таблица -->
    <div class="row blockt-h100">
      <div class="col-12 pmy0">
        <div class="header pmy0">
          <p> Таблица </p>
        </div>
        <div class="q-pa-sm q-gutter-sm pmy1">
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted } from "vue";
import { useQuasar, } from "quasar";
// import Highcharts from "highcharts";
// import _ from 'lodash';
// import moment from "moment";

import router from "../../../router";

import access from "../../../components/access";
import { tracking as url } from "../../../router/dataUrl";
import { loadData, sendData } from "../../../components/serverData";
import utils from '../../../components/utils';

// import XLSX from "xlsx";
// import { set_cptable } from "xlsx";
// import * as cptable from 'xlsx/dist/cpexcel.full.mjs';

</script>

<style scoped></style>