<template>
  <div>
    <div class="row">
      <div class="col">
        <span>
          <div class="blockt"><span class="pmx5"> L1-Tag </span></div>
        </span>
      </div>
    </div>
    <!-- Команды -->
    <div class="row blockt-h100">
      <div class="col-12 pmy0">
        <div class="header pmy0">
          <p>Команды</p>
        </div>
        <div class="row q-pa-sm pmy1">
          <div class="col-6 q-px-sm">
            <q-btn color="primary" icon="refresh" label="Обновить" @click="loadTagList" />
          </div>
          <div class="col-6">
            <div class="row">
              <div class="col">
                <q-checkbox v-model="cmd.recipe" label="Привязка к рецептам" />
              </div>
              <div class="col">
                <q-select emit-value map-options outlined dense options-dense color="black" bg-color="white" label-color="$grey-7" v-model="cmd.history"
                  :options="selHistoryOptions" label="История записи в ПЛК" filled />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Фильтры -->
    <div class="row blockt-h100">
      <div class="col-12 pmy0">
        <div class="header pmy0">
          <p>Фильтры</p>
        </div>
        <div class="row q-pa-sm q-gutter-sm pmy1">
        </div>
      </div>
    </div>

    <!-- Таблица -->
    <div class="row blockt-h100">
      <div class="col-12 pmy0">
        <div class="header pmy0">
          <p> Таблица </p>
        </div>
        <div class="row q-pa-sm q-gutter-sm pmy1">
          <div class="col">
            <q-table title="Обмен У2-У1" :rows="tagRows" :columns="tagColumns" row-key="GL_TAG_ID" />
          </div>
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
import moment from "moment";

import router from "../../../router";

import access from "../../../components/access";
import { tag as url } from "../../../router/dataUrl";
import { loadData, sendData } from "../../../components/serverData";
import utils from '../../../components/utils';
import _ from "lodash";

// import XLSX from "xlsx";
// import { set_cptable } from "xlsx";
// import * as cptable from 'xlsx/dist/cpexcel.full.mjs';

const props = defineProps({
  params: String,
});

const $q = useQuasar();

const cmd = ref({
  recipe: false,
  history: null,
});

const selHistoryOptions = ref([{ label: 'Нет', value: null }, { label: 'за сегодня', value: moment().startOf('day').toDate() }, { label: 'за неделю', value: moment().startOf('weeks').toDate() }, { label: 'за месяц', value: moment().startOf('month').toDate() }])

// const filterRecipe = ref(false);



const tagColumns = ref([]);
const tagRows = ref([]);

onMounted(async () => {
  const PROC_NAME = "onMounted> ";
  console.log(PROC_NAME + 'Начало');
  // console.log(PROC_NAME + `props = `, props);

  if (props.params) {
    setTimeout(() => {
      console.log(PROC_NAME + 'setTimeout> ', props,);
      saveUrlParameters(JSON.parse(props.params));
    }, 100);
  }
});

async function loadTagList() {
  const PROC_NAME = "loadData> ";
  if (!access.check('commL1')) { console.log(PROC_NAME + 'Access denied!'); return; }
  console.log(PROC_NAME, 'НАЧАЛО');

  const params = { recipe: cmd.value.recipe, hd1: cmd.value.history };
  console.log(PROC_NAME + 'params: ', params);
  const tagList = await loadData({ url: url.get, params: params });
  // console.log(PROC_NAME, ret);
  console.log(PROC_NAME, tagList);
  if (tagList?.error) {
    $q.notify({
      message: `Ошибка чтения данных по тегам для params=${JSON.stringify(params)}:\n${tagList?.error.message}`,
      color: 'negative',
      icon: 'error',
    });
    return false;
  }

  tagInit(tagList);

}

function tagInit(tagList) {
  const PROC_NAME = "tagsInit> ";
  tagColumns.value.length = 0;
  tagRows.value.length = 0;

  tagRows.value = tagList;

  _.forIn(tagList[0], (val, prop) => {
    // console.log(PROC_NAME + 'val = ', val);
    // console.log(PROC_NAME + 'prop = ', prop);
    console.log(PROC_NAME + prop + ' = ', val);
    tagColumns.value.push({ name: prop, label: prop, field: prop, });
  });

  // for (const prop in tagList) {
  //   if (Object.hasOwnProperty.call(tagList, prop)) {
  //     const val = tagList[prop];

  //   }
  // }

  // tagColumns.value = 
}











/**
 * Сохранение параметров запрос в URL
 */
async function saveUrlParameters(params) {
  const PROC_NAME = "saveUrlParameters> ";
  console.log(`${PROC_NAME}router.currentRoute.value= `, router.currentRoute.value);
  try {
    await router.push({
      query: Object.assign({}, router.currentRoute.value.query, {
        params: JSON.stringify(params),
      }),
    }, () => { });
    console.log(`${PROC_NAME}Сохранены параметры страницы в URL (${JSON.stringify(params)})`);
    // $q.notify({
    //   message: 'Всё хорошо!!!!!!!!!!!!!!!!!!\r\n' + err.message,
    //   color: 'negative',
    //   icon: 'warning'
    // });
  } catch (err) {
    console.error(`${PROC_NAME}ОШИБКА сохранения параметров страницы в URL!!!`, err);
    // console.log($q);
    $q.notify({
      message: 'Ошибка сохранения параметров страницы в URL!\r\n' + err.message,
      color: 'negative',
      icon: 'warning'
    })
  }
}

</script>

<style scoped></style>