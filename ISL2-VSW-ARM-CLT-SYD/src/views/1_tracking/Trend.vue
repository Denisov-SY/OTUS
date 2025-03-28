<template>
  <div>
    <div class="blockt"><span class="pmx5"> {{ title_string }} </span></div>
    <!-- <div>
      Trend
    </div> -->
    <div class="row blockt-h100">
      <div class="col-12 pmy0">
        <div class="header pmy0">
          <p> Выбор параметров</p>
        </div>
        <div class="q-pa-sm q-gutter-sm pmy1">
          <!-- <q-btn no-caps class="btn-vmz" label="Обновить" @click="btnRefresh" title="Обновить. Чтение первоначального набора данных из БД с потерей несозранённых данных редактирования, если бало редактирование."/>
          <q-btn no-caps class="btn-vmz" label="Редактировать" :disable="EditJob.source_l3 === 1 || editEnable" @click="btnEditEnable" title="Включить режим редактирования."/>
          <q-btn no-caps class="btn-vmz" label="Сохранить" :disable="EditJob.source_l3 === 1 || !editEnable" @click="s_confirm(`Вы действительно хотите сохранить данные по ${curr_props.action === ACTION_VIEW ? 'редактируемому' : 'создаваемому'} Заданию?`, btnSaveJob)"  title="Сохранить данные после редактирования."/>
          <q-btn no-caps class="btn-vmz" label="Отмена" :disable="EditJob.source_l3 === 1 || !editEnable" @click="btnReturn" title="Отменить несохранённые изменения."/>
          <q-btn no-caps class="btn-vmz" label="Печать" @click="saveUrlParameters({job_id: 15, act: 'VIEW'})" style="display: none;" title="Печать."/> -->
          <div class="row fit items-center ">
            <div class="col-5 col-lg-3 px5 pmy1">
              <div class="row fit items-center justify-center">
                <div class="col-1">
                  <q-btn v-if="!props.stripNumber" dense color="primary" icon="arrow_back_ios" title="Next" @click="() => { selectStrip(-1) }" />
                </div>
                <div class="col-8 ">
                  <q-select options-dense v-model="strip" :options="optionStripNumberList" label="№ штрипса" outlined dense filled color="black" bg-color="white"
                    label-color="grey-7" class="select1">
                    <!-- filled options-dense bg-color="grey-13" color="blue-grey-1"> -->
                    <template v-slot:append>
                      <q-icon v-if="!props.stripNumber" color="black" name="update" @click="loadStripList" />
                    </template>
                  </q-select>
                </div>
                <div class="col-1">
                  <q-btn v-if="!props.stripNumber" dense color="primary" icon="arrow_forward_ios" title="Prev" @click="() => { selectStrip(+1) }" />
                </div>
              </div>
            </div>
            <div class="col-7 col-lg-5 px5 pmy1">
              <q-select options-dense v-model="wcCodeSelected" :options="wcCodeOptions" label="Рабочий центр" outlined dense filled color="black" bg-color="white"
                label-color="grey-7" class="select1" />
              <!-- filled bg-color="grey-13" color="grey-10" /> -->
            </div>
            <div class="col-4 col-lg-2 px5 pmy1">
              <q-select options-dense v-model="trendXAxisSelected" :options="trendXAxisOptions" label="X-ось" outlined dense filled color="black" bg-color="white"
                label-color="grey-7" class="select1" />
              <!-- filled bg-color="grey-13" color="grey-10" /> -->
            </div>
            <div class="col-8 col-lg-2 px5 pmy1">
              <div class="row fit justify-end items-center">
                <!-- <div class="col-12" style="text-align: right;"> -->
                <!-- <q-btn color="blue" label="Trend" @click="loadTrend(strip.value, wcCodeSelected.value)" /> -->
                <q-btn no-caps class="btn-vmz q-mx-sm" label="Перерисовать" @click="loadTrend({ stripId: strip.value, stripNumber: strip.label, wcCode: wcCodeSelected.value })"
                  title="Перерисовать графики согласно выбора." />
                <q-btn v-if="rightsStrip.trendExcel" no-caps class="btn-vmz q-mx-sm" label="Excel" @click="exportExcel(strip.value, wcCodeSelected.value)" title="Экспортировать в Excel" />
                <!-- </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row fit items-center" style="border: 1px solid green; border-radius: 5px;">
      <div class="col-12">
        <div class="row pmy-0" style="position: relative;">
          <div id="chart-trend" style="background-color: blanchedalmond; width:100%; height:600px;" class="tpep-trend">
          </div>
          <!-- <div class="tpep-sticker" :style="`top: ${ document.getElementById('chart-trend').clientHeight}px;`"></div> -->
          <!-- <div class="tpep-sticker" ></div> -->
        </div>
        <div class="row pmy-0">
          <!-- <span> {{ TrendDateBegin }} </span>
					<span> {{ TrendDateEnd }} </span> -->

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted } from "vue";
import { useQuasar, } from "quasar";
import Highcharts from "highcharts";
import _ from 'lodash';
import moment from "moment";

import router from "../../router";

// import access from "../../components/access";
import { tracking as url } from "../../router/dataUrl";
import { loadData, sendData } from "../../components/serverData";
import utils from '../../components/utils';

// import { read, utils, writeFileXLSX } from "xlsx";
import XLSX from "xlsx";
import { set_cptable } from "xlsx";
import * as cptable from 'xlsx/dist/cpexcel.full.mjs';

import alertPro from '../../components/alertPro.vue'

// Импорт разрешений для кадров работы со штрипсами.  rightsStrip - объект с разрешениями
import { storeToRefs } from 'pinia'
import { useAccessStore } from "../../stores/accessStore";
const accessStore = useAccessStore(); 
const { rightsStrip } = storeToRefs(accessStore);
// Конец - Импорт разрешений для кадров работы со штрипсами.


const props = defineProps({
  stripId: Number,
  stripNumber: String,
  wcCode: String,
});

const FORMAT_DATETIME = "YYYY.MM.DD HH:mm:ss";
const FORMAT_DATETIME_MINUTE = "YYYY-MM-DD HH:mm";
const FORMAT_DATETIME_MS = "YYYY.MM.DD HH:mm:ss.SSS";

const $q = useQuasar();

const exportingData = ref(false);

const toId = ref(13601);
const strip = ref({ label: '', value: '' });
const optionStripNumberList = ref([]);
const wcCodeOptions = ref([{ label: 'РЦ2.2 HFW Высокочастотная сварка', value: 'HFW' }, { label: 'РЦ2.5 LHT Оборудование для термообработки швов', value: 'LHT' }]);
const wcCodeSelected = ref({});
const trendXAxisOptions = ref(['TIMESTAMP', 'DISTANCE', 'ID']);
const trendXAxisSelected = ref('TIMESTAMP');

const title_string = ref("Тренды штрипса");

let chartTrend;
const Trends = [];

async function loadTrend({ stripId, stripNumber, wcCode }) {
  const PROC_NAME = "loadTrend> ";
  // if (!access.check('strip')) { console.log(PROC_NAME + 'Access denied!'); return; }
  console.log(PROC_NAME, stripId, wcCode);
  saveUrlParameters({ wc: wcCode, id: stripId, num: stripNumber });

  const ret = await loadData({ url: url.techOp.strip.trend, params: { "strip-id": stripId, "wc-code": wcCode } });
  // console.log(PROC_NAME, ret);
  console.log(PROC_NAME + 'after loadData. ret: ', ret);
  if (!ret?.error && (ret.length > 0)) {

    const trOptions = chartTrend.getOptions();
    chartTrend.destroy();
    if (trOptions.series) trOptions.series.length = 0;
    if (trOptions.yAxis) trOptions.yAxis.length = 0;
    trOptions.xAxis[0].type = (trendXAxisSelected.value === 'TIMESTAMP') ? 'datetime' : 'linear';

    chartTrend = Highcharts.chart('chart-trend', trOptions);

    // title_string.value = `Тренды штрипса № ${strip.value.label}`;
    title_string.value = `Тренды штрипса № ${stripNumber}`;
    const trend = {};
    Trends.length = 0;
    ret.forEach(r => {
      if (r.ATTR_NAME.substring(0, 5) === 'TREND') r.ATTR_NAME = r.ATTR_NAME.substring(6);       // Убираем из названия атрибута префикс "TREND_"
      r.array = (JSON.parse(r.TREND_JSON))[r.ATTR_NAME];
      // console.log(PROC_NAME, r);
      // if (r.ATTR_NAME === 'TIMESTAMP') { for (let idx = 0; idx < r.array?.length; idx++) { r.array[idx] = new Date(r.array[idx]).getTime(); } }
      if (r.ATTR_NAME === 'TIMESTAMP') {
        for (let idx = 0; idx < r.array?.length; idx++) {
          // if( idx === 0 || idx === r.array?.length - 1 )  console.log(`TIMESTAMP[${idx}] = `, r.array[idx]);
          if (idx === 0 || idx === r.array?.length - 1) title_string.value += ` ${idx === 0 ? " Начало" : " Окончание"}: ${moment(r.array[idx]).format(FORMAT_DATETIME)}`;
          r.array[idx] = new Date(r.array[idx]).getTime();
        }
      } else if (r.KOEF_L2_L1 !== 1) {
        // r.array.map(v => v * r.KOEF_L2_L1);
        for (let idx = 0; idx < r.array?.length; idx++) {
          r.array[idx] = +(r.array[idx] * r.KOEF_L2_L1).toFixed(r.VIEW_PRECISION ?? 0);
        }
      }
      trend[r.ATTR_NAME === 'ID' || r.ATTR_NAME === 'TIMESTAMP' ? r.ATTR_NAME : r.ATTR_NAME_RUS || r.ATTR_NAME] = r;
      // Trends.push({ attr_name: r.ATTR_NAME, values: r.array })
      // Trends.push([r.ATTR_NAME].concat(r.array));
      if (r.ATTR_NAME !== 'ID' && r.ATTR_NAME !== 'EVENT_ENDTO')
        Trends.push([r.ATTR_NAME === 'TIMESTAMP' ? r.ATTR_NAME : r.ATTR_NAME_RUS || r.ATTR_NAME].concat(r.array));
    });


    const xAxis = trend[trendXAxisSelected.value]?.array;
    console.log(PROC_NAME, trend);
    // console.log(PROC_NAME + 'zip: ', _.zip(xAxis, trend['POWER'].trend));

    for (const trName in trend) {
      if (Object.hasOwnProperty.call(trend, trName)) {
        const tr = trend[trName];
        if (trName !== trendXAxisSelected.value) {
          chartTrend.addAxis({ titile: { text: trName }, visible: false, id: trName, }, false, false);
          chartTrend.addSeries({
            name: trName.toLowerCase(),
            data: _.zip(xAxis, tr.array),
            yAxis: trName, //(trName === trendXAxisSelected.value) ? 0 : 1,
            visible: trName !== 'ID' && trName !== 'TIMESTAMP',
          }, false);
        }
      }
    }

    chartTrend.yAxis[0].visible = false;
    chartTrend.yAxis[1].visible = false;
    chartTrend.redraw();

  } else {
    if (ret?.error) {
      // $q.notify({
      //   message: `Ошибка чтения трендов для stripId=${stripId}, wc=${wcCode}:\n${ret?.error.message}`,
      //   color: 'negative',
      //   icon: 'error'
      // });
      s_alert(`Ошибка чтения трендов для stripId=${stripId}, wc=${wcCode}`, ret.error.message ?? "");
    } else {
      $q.notify({
        message: `Для штрипса stripId=${stripId} на wc=${wcCode} трендов не найдено`,
        color: 'warning',
        icon: 'warning'
      });
    }
    
  }
}

async function loadStripList() {
  const PROC_NAME = "loadStripList> ";
  // if (!access.check('strip')) { console.log(PROC_NAME + 'Access denied!'); return; }
  console.log(PROC_NAME, 'НАЧАЛО');

  const stripList = await loadData({ url: url.strip.list, params: { "strip-status": ["В ПРОИЗВОДСТВЕ", "ПРОИЗВЕДЕНО"], "row-limit": 25, } });
  // console.log(PROC_NAME, ret);
  console.log(PROC_NAME, stripList);
  if (!stripList?.error) {
    optionStripNumberList.value.length = 0;
    stripList.forEach(s => { optionStripNumberList.value.push({ label: s.STRIP_NUMBER.substring(0, 7) + '-' + s.STRIP_NUMBER.substring(7, 9) + '-' + s.STRIP_NUMBER.substring(9, 11), value: s.PR_STRIP_ID, }) });
    // ''.substring(0, 7) + '-'
  }
}

function selectStrip(shift) {
  const PROC_NAME = 'selectStrip> ';
  // console.log(PROC_NAME + 'optionStripNumberList=', optionStripNumberList.value);
  console.log(PROC_NAME + 'strip=', strip.value);
  // if (strip.value.value)
  //   optionStripNumberList.value.some((s, idx, arr) => { if (s.value === strip.value.value) { strip.value = arr[idx + shift]; return true; } else return false; })
  // else strip.value = optionStripNumberList.value[0];

  optionStripNumberList.value.some((s, idx, arr) => { if (s.value === strip.value.value && idx + shift > 0 && idx + shift < arr.length) { strip.value = arr[idx + shift]; return true; } else return false; })
}

function exportExcel() {
  const PROC_NAME = 'exportExcel> ';
  exportingData.value = true;
  setTimeout(() => {  // Пауза нужна, чтобы успела появиться анимация выгрузки данных
    try {
      console.log(PROC_NAME + 'Trends: ', Trends);
      const colsWidth = new Array(Trends.length + 1);

      const aoa = new Array(Trends[0].length); // Array of Arrays
      let iTarget = 0;
      for (let i = 0; i < Trends.length; i++) {
        const timestamp = Trends[i][0] === 'TIMESTAMP'
        // if (Trends[i][0] !== 'ID' && Trends[i][0] !== 'EVENT_ENDTO') 
        {
          if(!timestamp) iTarget++;
          for (let j = 0; j < Trends[i].length; j++) {
            if (!aoa[j]) aoa[j] = new Array(Trends.length + 1);
            const x = Trends[i][j];
            // aoa[j][i] = Trends[i][j];

            // if(timestamp) aoa[j][0] = j === 0 ? { t: 's', v: x ?? '', } : timestamp ? { t: 'd', v: new Date(x), z: 'dd.mm.yyyy hh:mm' } : typeof x === 'number' ? { t: 'n', v: x } : { t: 's', v: x ?? '', };
            // else aoa[j][i+1] = j === 0 ? { t: 's', v: x ?? '', } : timestamp ? { t: 'd', v: new Date(x), z: 'dd.mm.yyyy hh:mm' } : typeof x === 'number' ? { t: 'n', v: x } : { t: 's', v: x ?? '', };

            aoa[j][timestamp ? 0 : iTarget] = j === 0 ? { t: 's', v: x ?? '', } : timestamp ? { t: 'd', v: moment(x).format(FORMAT_DATETIME_MS), z: 'dd.mm.yyyy hh:mm:ss' } : typeof x === 'number' ? { t: 'n', v: x } : { t: 's', v: x ?? '', };
          }
        }
      }
      colsWidth[0] = 15;
      aoa[0][0].v = 'Время измерения';
      console.log(PROC_NAME + 'aoa: ', aoa);

      set_cptable(cptable);
      // create worksheet
      const ws = XLSX.utils.aoa_to_sheet(aoa, { cellDates: true });
      ws["!cols"] = [{ wch: 20 }];//colsWidth;
      // create workbook and export
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Data");
      XLSX.writeFileXLSX(wb, "Trends.xlsx");
    } catch (err) {
      console.error(`${PROC_NAME}ОШИБКА экспорта данных!!!`, err);
      // console.log($q);
      // $q.notify({
      //   message: 'Ошибка экспорта данных! \r\n' + err.message,
      //   color: 'negative',
      //   icon: 'warning'
      // })
      s_alert( 'Ошибка экспорта данных!', err.message ?? "");
    }
    finally {
      exportingData.value = false;
    }
  }, 100);

}

onMounted(async () => {
  const PROC_NAME = "onMounted> ";
  console.log(`${PROC_NAME}Начало`);
  console.log(`props = `, props);


  wcCodeSelected.value = wcCodeOptions.value[0];

  // console.log(`${PROC_NAME}Тренд: ` + Trend.value.length + ' элемента. 0-й элемент: ', Trend.value[0]);

  chartTrend = Highcharts.chart("chart-trend", {
    chart: {
      backgroundColor: "rgba(255, 255, 255, 0)",
    },
    time: {
      useUTC: false,
    },
    title: {
      text: `График`,
    },

    plotOptions: {
      series: {

        marker: {
          enabled: false,
        },
      },
    },
    tooltip: {

      shared: true,

      xDateFormat: "%H:%M",

    },

    xAxis: {
      type: "datetime",

      crosshair: {

        color: "darkgrey",
      },

    },


    accessibility: { enabled: false },
  })


  //  Инициализация. 
  if (props.stripNumber) {    //  Если в форму переданы параметры штрипса, то форма будет отображать только данные этого штрипса
    optionStripNumberList.value.length = 0;
    optionStripNumberList.value.push({ label: props.stripNumber.substring(0, 7) + '-' + props.stripNumber.substring(7, 9) + '-' + props.stripNumber.substring(9, 11), value: props.stripId, });
    strip.value = optionStripNumberList.value[0];
    wcCodeSelected.value = wcCodeOptions.value.find((opt, ind, arr) => (opt.value === props.wcCode));
    await loadTrend({ stripId: props.stripId, stripNumber: props.stripNumber, wcCode: props.wcCode })
  } else {                    // Если просто открыли форму, последние 25(?) штрипсов "В производстве" и "Произведён" ищутся для выбора
    await loadStripList();
  }

  const onMountedWcCode = props.wcCode;
  const onMountedStripId = props.stripId;
  const onMountedStripNumber = props.stripNumber;

  setTimeout(() => {
    console.log(PROC_NAME + 'setTimeout> ', props, 'WcCode=' + onMountedWcCode, 'StripId=' + onMountedStripId, 'StripNumber=' + onMountedStripNumber);
    saveUrlParameters({ wc: onMountedWcCode, id: onMountedStripId, num: onMountedStripNumber, });
  }, 100);

  console.log(`${PROC_NAME}Конец`);
});

/**
 * Сохранение параметров запрос в URL
 */
async function saveUrlParameters({ id, num, wc }) {
  const PROC_NAME = "saveUrlParameters> ";
  console.log(`${PROC_NAME}router.currentRoute.value= `, router.currentRoute.value);
  try {
    await router.push({
      query: Object.assign({}, router.currentRoute.value.query, {
        stripId: id || '',
        stripNumber: num?.replaceAll('-', '') || '',
        wcCode: wc || '',
      }),
    }, () => { });
    console.log(`${PROC_NAME}Сохранены параметры страницы в URL (id=${id}, num='${num}', wc='${wc}')`);
    // $q.notify({
    //   message: 'Всё хорошо!!!!!!!!!!!!!!!!!!\r\n' + err.message,
    //   color: 'negative',
    //   icon: 'warning'
    // });
  } catch (err) {
    console.error(`${PROC_NAME}ОШИБКА сохранения параметров страницы в URL!!!`, err);
    // console.log($q);
    // $q.notify({
    //   message: 'Ошибка сохранения параметров страницы в URL!\r\n' + err.message,
    //   color: 'negative',
    //   icon: 'warning'
    // })
    s_alert('Ошибка сохранения параметров страницы в URL!', err.message ?? "");
  }
}


// вызов окна сообщения c дополнительной информацией
function s_alert(txt, txt_error) {
  if(txt ) { // 
    $q.dialog({
      component: alertPro,
      componentProps: {
        alert_text: txt,
        alert_text_error: txt_error ?? "",
      }
    }).onOk(() => {
			//
    })
	}
};

</script>

<style lang="sass" scoped>

</style>



<style scoped>
/* -------------------------КНОПКИ-------------------------------------------------------------------------------------------------------- */

.btn-vmz {
  background: linear-gradient(rgb(180, 180, 180), rgb(73, 73, 73)) !important;
  border: 2px solid white !important;
  /* margin-bottom: 5px !important; */
}

.btn-vmz1 {
  background: linear-gradient(rgb(180, 180, 180), rgb(73, 73, 73)) !important;
  border: 2px solid lime !important;
  margin-bottom: 5px !important;
}

.tpep-sticker {
  position: absolute;
  /* bottom: 0; */
  top: 550 !important;
  right: 0;
  width: 50px;
  height: 50px;
  background-color: #ff0000;
  z-index: 10;
}

.tpep-trend {
  position: absolute;
  top: 0;
  left: 0;
}
</style>