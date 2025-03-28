<template>
  <q-dialog ref="dialog-defects" @hide="onDialogHide" full-width persistent>
    <q-card class="q-dialog-plugin bg-grey-5" bordered style="padding: 1px; ">


      <q-card-section class="row items-center">
        <!-- <q-avatar icon="signal_wifi_off" color="primary" text-color="white" /> -->
        <div class="col-10" style="text-align: center;">
          <span style=" font-size: 1rem;"> Дефекты (РЦ: {{ (wc.number / 100).toFixed(0) }}.{{ wc.number % 100 }} - {{ event.viewCode }}) штрипса:</span>
          <span style=" font-size: 1.2rem; padding-left: 0.5rem;"> {{ stripNumber }}</span>
        </div>
        <div class="col-2">
          <div class="row justify-end">
            <q-btn color="secondary" label="Excel" @click="BtnPrintDefect" no-caps class="btn-vmz" />
          </div>
        </div>
      </q-card-section>
      <q-card-section align="center">
        <div class="row">
          <div class="col-12 q-py-sm">
            <q-table flat bordered hide-bottom _title="Дефекты" dense separator="cell" class="table-style1" :rows="defects_rows" :columns="defects_cols" virtual-scroll
              :rows-per-page-options="[0]" ref="refDefects">
            </q-table>
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="center">
        <!-- <q-btn color="primary" label="Ок" @click="onOKClick" no-caps size="lg" class="button-enter-cancel" :loading="loadingData" /> -->
        <!-- <q-btn color="secondary" label="Закрыть" @click="onCancelClick" no-caps size="lg" class="button-enter-cancel" /> -->
        <q-btn color="secondary" label="Закрыть" @click="onCancelClick" no-caps class="btn-vmz" />

      </q-card-actions>
    </q-card>
  </q-dialog>


  <q-inner-loading :showing="loadingData" label="подождите. Идёт загрузка данных" label-class="text-teal" label-style="font-size: 1.1em" />
  <!-- <q-inner-loading :showing="loading" :label="loading_label" label-class="text-teal" label-style="font-size: 1.1em" /> -->
</template>

<script>
import { onMounted, ref, watch, computed } from "vue";

import { Notify, useQuasar } from 'quasar';

import { loadData } from './serverData';
import { tracking as url } from "../router/dataUrl";

import moment from "moment";
import 'moment/dist/locale/ru';
import { read, utils, writeFileXLSX } from "xlsx";
// import X2JS from 'x2js';
import { set_cptable } from "xlsx";
import * as cptable from 'xlsx/dist/cpexcel.full.mjs';

import { isDate } from '../components/utils';

// const loading = ref(false);
// const loading_label = ref("");

const exportingData = ref(false);
// const refDefects = ref();

// import access from './access';

export default {
  props: {
    // ...your custom props
    techOpId: Number,
    stripNumber: String,
  },

  emits: [
    // REQUIRED
    'ok', 'hide'
  ],
  data() {
    return {
      wc: { number: 0, code: '', viewCode: '' },
      event: { code: '', viewCode: '' },
      defects: [],
      defects_rows: [],
      defects_cols: [],
      loadingData: false,
      refDefects: null,
    }
  },
  methods: {
    // following method is REQUIRED
    // (don't change its name --> "show")
    async show() {
      const PROC_NAME = "UltrakraftDefect.show> ";
      try {
        this.loadingData = true;

        console.log(PROC_NAME + `НАЧАЛО (techOpId = ${this.techOpId})`);
        // console.log(PROC_NAME + `НАЧАЛО (stripNumber = ${this.stripNumber})`);
        const ret = await loadData({ url: url.techOp.strip.trend, params: { toId: this.techOpId } });
        console.log(PROC_NAME + 'after loadData: ', ret);

        if (ret?.error) { throw ret.error; }

        if(ret?.length > 0)  {

          const ultraCraftWcNumber = ret[0].WC_CODE === 'UST' ? 0 : ret[0].WC_CODE === 'SUST' && ret[0].EVENT_CODE === 'EVENT01' ? 1 : ret[0].WC_CODE === 'SUST' && ret[0].EVENT_CODE === 'EVENT02' ? 2 : ret[0].WC_CODE === 'ODM' ? 3 : -1;

          this.wc = { number: +ret[0].WC_NUMBER, code: ret[0].WC_CODE, viewCode: ['УЗК кромок', 'АУЗК шва', 'АУЗК шва', 'Изм.геом.'][ultraCraftWcNumber] };
          // this.event = { code: ret[0].EVENT_CODE, viewCode: this.wc.number === 204 && ret[0].EVENT_CODE === 'EVENT01' ? 'УЗК шва' : this.wc.number === 204 && ret[0].EVENT_CODE === 'EVENT02' ? 'Профилемер' : this.wc.number === 302 && ret[0].EVENT_CODE === 'EVENT01' ? 'Изм.геом.' : 'Неизв.' };
          this.event = { code: ret[0].EVENT_CODE, viewCode: ['УЗК кромок', 'АУЗК шва', 'Профилемер', 'Изм.геом.'][ultraCraftWcNumber] };
          this.defects = JSON.parse(ret[0].TREND_JSON)?.AUZK_DEFECT;
          this.defects.sort((a, b) => (a.x - b.x));
          console.log(PROC_NAME + 'defects: ', this.defects);
          if (this.defects?.length > 0) {
            const def = {
              defectsTypes: [
                ['Расслоения', 'Отклонение по толщине'],
                ['Продольный внутренний дефект', 'Продольный наружный дефект', 'Расслоения (шов)', 'Отклонение по толщине'],
                ['Переснятый наружный грат', 'Наружный грат', 'Переснятый внутренний грат', 'Внутренний грат', 'Сдвиг кромок больше допустимого', 'Толщина ниже порога', 'Толщина выше порога', 'Неснятый внутренний грат'],
                []],
              bi: [
                ['Буфер контроля кромки А', 'Буфер контроля кромки В', 'Буфер статической калибровки', 'Буфер динамической калибровки кромки А', 'Буфер динамической калибровки кромки B'],
                ['CKL (контроль)', 'CKW (контроль)', 'CKL (статическая калибровка)', 'CKW (статическая калибровка)'],
                ['Буфер контроля', 'Буфер калибровки'],
                []],
              ai: [['Область контроля', 'Область калибровки'], ['CKL', 'CKW'], ['Область контроля', 'Область калибровки'], []],
            };


            console.log("this.defects.length = ", this.defects.length);
            console.log("this.defects[0] = ", this.defects[0]);
            this.defects_cols[0] = {
              name: `defect_name`,
              label: `Описание`,
              field: `defect_name`,
              format: (val) => `${val}`,
              required: true,
              sortable: false,
              align: "left",
            };
            // this.defects_cols[0].name     = `defect_name`; 
            // this.defects_cols[0].label    = `Номер дефекта`; 
            // this.defects_cols[0].field    = `defect_name`; 
            // this.defects_cols[0].format   = (val) => `${val}`; 
            // this.defects_cols[0].required = true;
            // this.defects_cols[0].sortable = false;
            // this.defects_cols[0].align    = "left";

            this.defects_rows[0] = { defect_name: "Тип дефекта" };
            this.defects_rows[1] = { defect_name: "Координата X (м)" };
            this.defects_rows[2] = { defect_name: "Координата Y (мм)" };
            this.defects_rows[3] = { defect_name: "Длина прямоугольника дефекта (мм)" };
            this.defects_rows[4] = { defect_name: "Ширина прямоугольника дефекта (мм)" };
            this.defects_rows[5] = { defect_name: "Длина дефекта (мм)" };
            this.defects_rows[6] = { defect_name: "Площадь дефекта (мм²)" };
            this.defects_rows[7] = { defect_name: "Значение показателя дефекта" };
            this.defects_rows[8] = { defect_name: "Номер канала, зарегистрировавшего дефект" };
            this.defects_rows[9] = { defect_name: "Буфер, в котором находится дефект" };
            this.defects_rows[10] = { defect_name: "Область объекта контроля, в которой находится дефект" };
            this.defects_rows[11] = { defect_name: "Индекс дефекта для указанного сочетания буфера и области" };
            this.defects_rows[12] = { defect_name: "Флаг дефекта" };
            this.defects_rows[13] = { defect_name: "Тэг дефекта" };
            for (let i = 1; i <= this.defects.length; i++) {

              this.defects_cols[i] = {
                name: `N${i}`,
                label: `Дефект ${i}`,
                field: `N${i}`,
                format: (val) => `${val}`,
                required: true,
                sortable: false,
                align: "center",
              };
              // this.defects_cols[i].name     = `N${i}`; 
              // this.defects_cols[i].label    = `${i}`; 
              // this.defects_cols[i].field    = `N${i}`; 
              // this.defects_cols[i].format   = (val) => `${val}`; 
              // this.defects_cols[i].required = true;
              // this.defects_cols[i].sortable = false;
              // this.defects_cols[i].align    = "center";

              this.defects_rows[0][`N${i}`] = def.defectsTypes[ultraCraftWcNumber][this.defects[i - 1].defect_type];
              this.defects_rows[1][`N${i}`] = this.defects[i - 1].x / 1000.0;
              this.defects_rows[2][`N${i}`] = this.defects[i - 1].y;
              this.defects_rows[3][`N${i}`] = this.defects[i - 1].w;
              this.defects_rows[4][`N${i}`] = this.defects[i - 1].h;
              this.defects_rows[5][`N${i}`] = this.defects[i - 1].l;
              this.defects_rows[6][`N${i}`] = this.defects[i - 1].a;
              this.defects_rows[7][`N${i}`] = this.defects[i - 1].v;
              this.defects_rows[8][`N${i}`] = this.defects[i - 1].ch;
              // this.defects_rows[9][`N${i}`] = this.defects[i - 1].bi !== undefined ? def.bi[ultraCraftWcNumber][this.defects[i - 1].bi] : '';
              this.defects_rows[9][`N${i}`] = def.bi[ultraCraftWcNumber][this.defects[i - 1].bi] ?? this.defects[i - 1].bi;
              this.defects_rows[10][`N${i}`] = def.ai[ultraCraftWcNumber][this.defects[i - 1].ai] ?? this.defects[i - 1].ai;
              this.defects_rows[11][`N${i}`] = this.defects[i - 1].i;
              this.defects_rows[12][`N${i}`] = ['-', 'игнорируется', 'брак'][this.defects[i - 1].f];
              this.defects_rows[13][`N${i}`] = this.defects[i - 1].t;
            }
            this.$refs["dialog-defects"].show();
          }
        } else {
          Notify.create({
            message: `Hе найдено дефектов по данному штрипсу ${this.stripNumber}`,
            color: 'positive',
            // icon: 'warning'
          });
        }

      } catch (err) {
        console.error(err);
        Notify.create({
          message: 'Ошибка загрузки данных по дефектам АУЗК! \r\n' + err.message,
          color: 'negative',
          icon: 'warning'
        })

      } finally {
        this.loadingData = false;
      }

    },


    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide() {
      this.$refs["dialog-defects"].hide()
    },

    onDialogHide() {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit('hide')
    },



    onCancelClick() {
      this.loadingData = false;
      // we just need to hide the dialog
      this.hide()
    },


    /**
     * Выгрузка данных штрипсов в xlsx
     */
    BtnPrintDefect(evt, go) {
      const PROC_NAME = 'exportTable> ';
      // const $q = useQuasar();
      exportingData.value = true;
      setTimeout(() => {  // Пауза нужна, чтобы успела появиться анимация выгрузки данных
        try {

          const rows = this.defects_rows, cols = this.defects_cols;
          console.log(`${PROC_NAME}rows: `, rows);
          console.log(`${PROC_NAME}cols: `, cols);
          // console.log(`${PROC_NAME}colsv: `, colsv);

          const table = Array();
          const colsWidth = [];

          if (!table[0]) table[0] = [];
          let col_number = 0;
          cols.forEach((c, j) => {
            // if(colsv.find((cv, ind, arr) => (cv === c.name)))  {   // Если колонка видимая
            table[0][col_number] = c.label;
            const x = typeof c.field === 'function' ? c.field(rows[0]) : rows[0][c.field];
            // console.log("x =", x);
            // colsWidth[col_number] = { wch: moment.isMoment(x) || moment.isDate(x) ? 15 : Math.max(c.label.length + 3, 5) };
            colsWidth[col_number] = { wch: col_number === 0 ? rows[11].defect_name.length : (moment.isMoment(x) || moment.isDate(x) ? 15 : (x.length + 3)) };
            col_number++;

          });
          for (let i = 1; i < rows.length + 1; i++) {
            let col_number = 0;
            cols.forEach((c, j) => {
              // if(colsv.find((cv, ind, arr) => (cv === c.name)))  {   // Если колонка видимая
              if (!table[i]) table[i] = [];
              const x =
                typeof c.field === 'function' ? c.field(rows[i - 1]) :		// Если функция (вычисление налету), выполняем эту ф-цию.
                  rows[i - 1][c.field];

              table[i][col_number] =
                isDate(x) ? { t: 'd', v: new Date(x), z: 'dd.mm.yyyy hh:mm' } :	// дата/время - тип Datetime
                  c.name === 'timeUnix' ? { t: 'd', v: moment(x * 1000).toDate(), z: 'dd.mm.yyyy hh:mm' } :	// unix-время - кол-во секунд от 1970г.
                    // typeof x === 'number' ? { t: 'n', v: x, z: xlsx_precision_format(c.xlsx_precision), } :			// Значения  - числа
                    typeof x === 'number' ? { t: 'n', v: x, } :			// Значения  - числа
                      { t: 's', v: x ?? '', };			// Значения  - строки
              col_number++;

            });
          }
          // console.log(`${PROC_NAME}table: `, table, colsWidth);
          // console.table(table);

          set_cptable(cptable);
          // const ws = utils.json_to_sheet(table)
          const ws = utils.aoa_to_sheet(table, { cellDates: true });
          // ws["!cols"] = cols.map(c => ({ wch: Math.max(c.label.length + 3, 5) }));  //[{}, {wpx: 140}];
          ws["!cols"] = colsWidth;
          const wb = utils.book_new();
          // console.log("WorkSheet: ", ws);
          // console.log("WorkBook: ", wb);
          utils.book_append_sheet(wb, ws, "Data");
          // const wb = utils.table_to_book(tableRef.value.$el.getElementsByTagName("TABLE")[0]);		// Работает! но выводит в файл, только то, что есть на экране.
          writeFileXLSX(wb, "defectList.xlsx");
        } catch (err) {
          console.error(`${PROC_NAME}ОШИБКА экспорта данных!!!`, err);

          console.error(err);
          Notify.create({
            message: 'Ошибка экспорта данных! \r\n' + err.message,
            color: 'negative',
            icon: 'warning'
          })
        }
        finally {
          exportingData.value = false;
        }
      }, 100);


    }



  },

  setup(props, context) {
    // const isPwd = 
    // onMounted(async () => {
    //   const PROC_NAME = "UltrakraftDefect.onMounted> ";
    //   console.log(PROC_NAME + 'НАЧАЛО');
    // });
    return {
      // isPwd: ref(true),
    }
  }
}
</script>

<style lang="sass" scoped>
.button-enter-cancel
	width: 10rem
	// padding: 
</style>



<style scoped>
.btn-vmz {
  background: linear-gradient(rgb(180, 180, 180), rgb(73, 73, 73)) !important;
  border: 2px solid white !important;
  margin-bottom: 5px !important;
}
</style>