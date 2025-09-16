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
        <div class="q-pa-sm q-gutter-sm pmy1 row">
          <div class="col-4"> <q-input v-model="pipeId1" type="number" label="Труба 1" bg-color="white" input-class="input1 w-100" /> </div>
          <div class="col-4"> <q-input v-model="pipeId2" type="number" label="Труба 2" bg-color="white" input-class="input1 w-100" /> </div>
          <div class="col-4">
            <q-btn color="primary" icon="list" label="Report" @click="generateReport" />
          </div>
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
          <div class="row">
            <div class="col-4">
              <q-input v-model="uploadTemplateName" type="text" label="Имя шаблона бирки" />
            </div>
            <div class="col-6">
              <q-input type="file" name="Загрузить на сервер" multiple :loading="uploadingFile" @update:model-value="val => { uploadFile_Files = val }" />
            </div>
            <div class="col-2">
              <q-btn color="primary" icon="upload" label="Upload" @click="uploadFile" />
            </div>
          </div>
          <div class="row">
            <div class="col-2">
              <q-btn color="primary" icon="list" label="List" @click="labelGetList" />
            </div>
            <div class="col-6">
              <q-select v-model="labelSelected" :options="labelList" label="Список бирок" filled emit-value map-options />
            </div>
            <div class="col-4">
              <q-btn color="primary" icon="print" label="Print" @click="printLabel" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <q-inner-loading :showing="loadingGenerateReport" :label="'loading_label'" loadingGenerateReport="text-teal" label-style="font-size: 1.1em" />
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted, onBeforeUnmount } from "vue";
import { useQuasar, } from "quasar";
// import Highcharts from "highcharts";
// import _ from 'lodash';
// import moment from "moment";

import router from "../../router";

import access from "../../components/access";
import { label, report as url, label as urlLabel } from "../../router/dataUrl";
import { loadData, loadBlob } from "../../components/serverData";
import utils from '../../components/utils';

// import XLSX from "xlsx";
// import { set_cptable } from "xlsx";
// import * as cptable from 'xlsx/dist/cpexcel.full.mjs';

const pipeId1 = ref(171043);
const pipeId2 = ref(171047);
const loadingGenerateReport = ref(false);
const uploadingFile = ref(false);
let uploadFile_Files = {};
const uploadTemplateName = ref("templateTest02");

const labelList = ref([0, 1, 2, 3]);
const labelSelected = ref(0);

const timeouts = { t1: 0, t2: 0 };

const generateReport = async () => {
  const PROC_NAME = 'generateReport> ';

  loadingGenerateReport.value = true;
  console.log(PROC_NAME, 'pipe1 = ' + pipeId1.value, '; pipe2 = ' + pipeId2.value);

  try {
    if (Math.abs(pipeId2.value - pipeId1.value) > 100) throw "Очень большой интервал (больше 100)";

    const report = await loadData({ url: url.report.generate, params: { template: "template_test_01", options: { pipe_id: [pipeId1.value, pipeId2.value] } } });
    if (!report?.error) {
      console.log(PROC_NAME, "Report generated: ", report);

      let timeoutCheckReport = 5;
      timeouts.t1 = setTimeout(async function checkReport() {
        const PROC_NAME_1 = PROC_NAME + 'checkReport> ';


        const repChk = await loadBlob({ url: url.report.check, params: { filename: report.outputFilename }, responseType: 'blob', });
        console.log(PROC_NAME_1, "timeoutCheckReport: " + timeoutCheckReport, 'repChk: ', repChk);

        if (repChk?.data.size > 1000) {
          console.log(PROC_NAME_1, "Найден файл");

          // if (repChk?.type !== 'application/json') {
          //   // const fileNameHeader = "x-suggested-filename";
          //   // const suggestedFileName = repChk.headers[fileNameHeader];
          //   // const effectiveFileName = (suggestedFileName === undefined
          //   //   ? "allergierOchPreferenser.xls"
          //   //   : suggestedFileName);
          //   // console.log(PROC_NAME_1, `Received header [${fileNameHeader}]: ${suggestedFileName}, effective fileName: ${effectiveFileName}`);

          //   // Let the user save the file.
          //   // FileSaver.saveAs(response.data, effectiveFileName);

          const url = window.URL.createObjectURL(new Blob([repChk.data],
            { type: repChk.data.type }));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', report.outputFilename);
          // repChk.headers["content-disposition"].split("filename=")[1]);
          document.body.appendChild(link);
          link.click();

        } else
          if (--timeoutCheckReport > 0) timeouts.t1 = setTimeout(checkReport, 5000)
      }, 1000);
    }
    else throw report.error
  } catch (ex) {
    console.error(ex);
  } finally {
    loadingGenerateReport.value = false;

  }
}

onBeforeUnmount(() => {
  clearTimeout(timeouts.t1);
});

function uploadFile(evt) {
  const PROC_NAME = 'uploadFile> ';

  uploadingFile.value = true;

  const files = uploadFile_Files;
  console.log(PROC_NAME + 'file = ', files);

  const xhr = new XMLHttpRequest();

  // отслеживаем процесс отправки
  xhr.upload.onprogress = function (event) {
    console.log(`${PROC_NAME}onprogress> Отправлено ${event.loaded} из ${event.total}`);
  };

  // Ждём завершения: неважно, успешного или нет
  xhr.onloadend = function () {
    if (xhr.status == 200) {
      console.log(PROC_NAME + "onloadend> Успех");
    } else {
      console.log(PROC_NAME + "onloadend> Ошибка " + this.status);
    }
    uploadingFile.value = false;
  };

  console.log(PROC_NAME + "urlLabel: ", urlLabel);
  xhr.open("POST", urlLabel.upload);
  xhr.setRequestHeader('Content-Type', 'multipart/form-data')
  xhr.setRequestHeader('Template-Name', uploadTemplateName.value)
  xhr.send(files[0]);
  // xhr.send({name: "test01", buff: files[0]});
}

async function labelGetList(evt) {
  const PROC_NAME = 'labelGetList> ';

  const ret = await loadData({ url: label.list, params: {} });
  console.log(PROC_NAME + "label's list: ", ret);

  labelList.value = ret?.map((val, idx) => ({ label: `${val.NAME} (len: ${val.LEN_TEMPLATE})`, value: val.PRN_LABEL_TEMPLATE_ID }));
  labelSelected.value = ret[0]?.PRN_LABEL_TEMPLATE_ID;
}

async function printLabel() {
  const PROC_NAME = 'printLabel> ';

  console.log(PROC_NAME + 'Print label (id=' + labelSelected.value + ')');

  const ret = await loadData({ url: label.print, params: { id: +labelSelected.value } });
  console.log(PROC_NAME + 'result of print: ', ret);

}


</script>

<style scoped></style>