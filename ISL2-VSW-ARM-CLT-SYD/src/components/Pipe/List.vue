<template>
  <!-- <div class="row" style="border: 1px solid red;"> -->
  <div class="row" >
    <!-- {{ `Здесь будет список труб. id штрипса: ${stripId}` }} -->
    <div class="col-12 py-1">
      <q-table flat bordered _title="Трубы" dense separator="cell" class="table-style1" :rows="Pipes" :columns="columns" :visible-columns="visibleColumns" row-key="PR_PIPE_ID"
        :filter="MyFilter" :filter-method="MyFilterMethod" @row-click="cellSelect" :rows-per-page-options="[5, 10, 15, 20, 25, 40, 50, 0]" v-model:pagination="MyPagination"
        selection="single" v-model:selected="pipeSelected" :selected-rows-label="(num) => 'Выбрана Труба: ' + pipeSelected[0].PIPE_NUMBER" ref="refPipeList">

        <template v-slot:header-selection="scope">
          <!-- <q-checkbox v-model="scope.selected" /> -->

        </template>
        <template v-slot:body-selection="scope">
          <!-- <q-checkbox v-model="scope.selected" /> -->
          {{ scope.rowIndex + 1 }}
        </template>

        <template v-slot:loading>
          <q-inner-loading showing />
        </template>
      </q-table>
    </div>

    <q-inner-loading :showing="loading" :label="loading_label" label-class="text-teal" label-style="font-size: 1.1em" />
  </div>
</template>

<script setup>
import { onMounted, ref, watch, } from "vue";
import { Notify, useQuasar } from 'quasar';

import { loadData } from '../serverData';
import { tracking as url , dictionary as dict } from "../../router/dataUrl";

import moment from "moment";
import 'moment/dist/locale/ru';
// import { read, utils, writeFileXLSX } from "xlsx";
// import { set_cptable } from "xlsx";
// import * as cptable from 'xlsx/dist/cpexcel.full.mjs';

// import { isDate } from '../utils';

// const loading = ref(false);
// const loading_label = ref("");

const $q = useQuasar();

const props = defineProps({
  pipeId: Number,
  pipeNumber: Number,
  stripId: Number,
  stripNumber: String,
});

const Pipes = ref([]);
const BitStatusDict = ref([]);
const MyFilter = ref();
const pipeSelected = ref([]);
const MyPagination = ref({ rowsPerPage: 15 });
const exportingData = ref(false);

const loading = ref(false);
const loading_label = ref("");

const FORMAT_DATETIME_SEC = "YYYY-MM-DD HH:mm:ss";

// const numberFormatter0dig = new Intl.NumberFormat(undefined, { minimumFractionDigits: 0 });
// const numberFormatter1dig = new Intl.NumberFormat(undefined, { minimumFractionDigits: 1 });
// const numberFormatter2dig = new Intl.NumberFormat(undefined, { minimumFractionDigits: 2 });

// объекты формаимрования
const numberFormatterDig = [];

for(let i = 0; i < 10; i++)  numberFormatterDig[i] = new Intl.NumberFormat(undefined, { minimumFractionDigits: i });  // с запасом 0 до 10


// const bit_status_name = [
//   "00 - Сварка встык. Соединения штрипса",
//   "01 - Непровар шва. Открытая труба",
//   "02 - Необрезанный внешний валик",
//   "03 - Необрезанный внутренний валик",
//   "04 - Резерв",
//   "05 - Дефект УЗК",
//   "06 - Дефект отжига",
//   "07 - Вырез окна для изменения зазора в IBC",
//   "08 - VIS дефект 1",
//   "09 - Резерв",
//   "10 - Резерв",
//   "11 - ЛТО не используется",
//   "12 - АУЗК не используется",
//   "13 - Дефект ODM",
//   "14 - Резерв",
//   "15 - Отбор проб",    // "15 - Примерная труба",
// ];

const columns = ref([
  {
    name: "PIPE_NUMBER",
    required: true,
    label: "Номер Трубы",
    align: "left",
    classes: (row) => cellClass(row),
    field: (row) => row.PIPE_NUMBER,
    format: (val) => `${val}`,
    sortable: true,
  },
  { name: "PR_PIPE_ID", label: "PR_PIPE_ID", field: "PR_PIPE_ID" },
  {
    name: "STATUS_NAME",
    required: true,
    label: "Статус",
    align: "center",
    // field: "STATUS_NAME",
    field: (row) => row.STATUS_NAME ?? "",
    // classes: (row) =>  (row.STATUS_NAME  === 'ЗАПЛАНИРОВАН' ? 'bgg-green' : ''),
    classes: cellStatusClass,
    // classes: 'bgg-green',
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "LAST_WC",
    required: true,
    label: "РЦ",
    align: "center",
    field: "LAST_WC",
    // field: (row) => row.WC_CODE ? `${row.WC_AREA}.${row.WC_NUMBER} ${row.WC_CODE}` : '',
    classes: cellWcClass,
    // format: (val) => `${val ?? ""}`,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "BATCH_NUMBER",
    required: true,
    label: "Партия",
    align: "center",
    field: "BATCH_NUMBER",
    classes: cellClass,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "PROGRESSIVE",
    required: true,
    label: "№",
    align: "center",
    // field: "PROGRESSIVE",
    field: (row) => row.PROGRESSIVE ?? "",
    classes: cellClass,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "JOB_CODE",
    required: true,
    label: "Номер Задания",
    align: "center",
    field: "JOB_CODE",
    classes: cellClass,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "HEAT",
    required: true,
    label: "Номер плавки",
    align: "center",
    field: "HEAT",
    classes: cellClass,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "DIAM",
    required: true,
    label: "Диаметр (мм)",
    align: "center",
    field: "DIAM",
    classes: cellClass,
    // format: (val) => numberFormatter1dig.format(+val),
    format: (val) => numberFormatter(val, 1),
    sortable: true,
    xlsx_precision: 1,
  },
  {
    name: "WALL_THICK",
    required: true,
    // label: "Толщина ном.",
    label: "Толщина ст.(мм)",
    align: "center",
    field: "WALL_THICK",
    classes: cellClass,
    // format: (val) => numberFormatter2dig.format(+val),
    format: (val) => numberFormatter(val, 2),
    sortable: true,
    xlsx_precision: 2,
  },
  {
    name: "PIPE_LENGTH",
    required: true,
    // label: "Вес ном.",
    label: "Длина (мм)",
    align: "center",
    field: "PIPE_LENGTH",
    classes: cellClass,
    // format: (val) => numberFormatter0dig.format(+val),
    format: (val) => numberFormatter(val, 0),
    sortable: true,
    xlsx_precision: 0,
  },
  {
    name: "STRENGTH_GROUP",
    required: true,
    label: "Группа прочности",
    align: "center",
    // field: "STRENGTH_GROUP",
    field: (row) => row.STRENGTH_GROUP ?? "",
    classes: cellClass,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "STANDARD",
    required: true,
    label: "НТД",
    align: "center",
    // field: "STANDARD",
    field: (row) => row.STANDARD ?? "",
    classes: cellClass,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "SOURCE",
    required: true,
    label: "Источник",
    align: "center",
    // field: (row) => row.SOURCE_L3 ? 'L3' : 'L2',
    field: "SOURCE",
    format: (val) => `${val}`,
    sortable: true,
  },
  // {
  // 	name: "STRIP_NUMBER",
  // 	required: true,
  // 	label: "Номер Штрипса",
  // 	align: "left",
  // 	classes: (row) => cellClass(row),
  // 	field: (row) => row.STRIP_NUMBER ?? "",
  // 	format: (val) => `${val}`,
  // 	sortable: true,
  // },
  {
    name: "BIT_STATUS",
    required: true,
    label: "Дефекты",
    align: "left",
    classes: (row) => cellClass(row),
    // field: (row) => row.BIT_STATUS ? bit_status_name.reduce((prev, b, idx) => `${prev}${((row.BIT_STATUS >> ((idx < 8) ? (idx + 8) : (idx - 8))) & 1) ? (prev ? "; " : "") + b : ""}`, ``) : "",
    field: (row) => row.BIT_STATUS ? BitStatusDict.value.reduce((prev, b, idx) => `${prev}${((row.BIT_STATUS >> b.BIT_NUMBER ) & 1) ? (prev ? "; " : "") + ('0' + b.BIT_NUMBER.toString()).slice(-2) + ' ' + b.NAME : ""}`, ``) : "",
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "TIME_POSITION",
    required: true,
    label: `Время позиции`,
    align: "center",
    field: "TIME_POSITION",
    classes: cellClass,
    format: (val) => `${moment(val).format(FORMAT_DATETIME_SEC)}`,
    sortable: true,
  },
  {
    name: "TIME_STATUS",
    required: true,
    label: `Время статуса`,
    align: "center",
    field: "TIME_STATUS",
    classes: cellClass,
    format: (val) => val ? `${moment(val).format(FORMAT_DATETIME_SEC)}` : "",
    sortable: true,
  },
  {
    name: "PRODUCTION_DATE",
    required: true,
    label: `В ПРОИЗВОДСТВЕ`,
    align: "center",
    field: "PRODUCTION_DATE",
    classes: cellClass,
    format: (val) => val ? `${moment(val).format(FORMAT_DATETIME_SEC)}` : "",
    sortable: true,
  },
]);

const visibleColumns = ref(["PIPE_NUMBER", "STATUS_NAME", "LAST_WC", "BATCH_NUMBER", "PROGRESSIVE", "JOB_CODE", "HEAT", "DIAM", "WALL_THICK", "PIPE_LENGTH", "STRENGTH_GROUP", "STANDARD", "SOURCE", "BIT_STATUS", "TIME_POSITION", "TIME_STATUS", "PRODUCTION_DATE",]);

const props_rem = {};

onMounted(async () => {
  const PROC_NAME = "Pipe.List.onMounted> ";
  for (let key in props )  props_rem[key] = props[key] ;     // Запоминаем первоначальный набор свойств
  console.log(PROC_NAME + `НАЧАЛО: stripId= ${props.stripId}`);
  // console.log(PROC_NAME + `Pipes.value= ${context}`);
  // console.log(PROC_NAME + `this.Pipes = `, this.Pipes);
  // console.log(PROC_NAME + `Pipes.value = `, Pipes.value);
  // loadDataPipes({pipeId: this.pipeId || null, pipeNumber: this.pipeNumber || null, stripId: this.stripId || null, stripNumber: this.stripNumber || null});
  // loadDataPipes(props);

});


// // Просмотр одного параметра
// watch(() => props.stripId, (_new, _old) => {
//   const PROC_NAME = 'Pipe.List.watch(props)> ';
//   console.log(`${PROC_NAME} props.stripId: `, props.stripId);
//   console.log(`${PROC_NAME} _new: `, _new);
//   console.log(`${PROC_NAME} _old: `, _old);
//   // console.log(`${PROC_NAME}`, _new, _old);
   
//   if (_new !== _old && _new > 0) {
//     console.log(`${PROC_NAME}stripId: `, _new);
//     // console.log(`${PROC_NAME}to: `, _new.dateRange.to, selTimeTo.value);
//     // watchPropsDateRange(_new.modelValue);
//     loadDataPipes(props);
//   }
// },
//   {
//     // deep: true,      // Глубокий watch для проверки всех вложенных элементов, но new будет равно old, так как оба ссылаются на один и тот же объект
//     // immediate: true
//   }   
// );


// Просмотр изменения любого из параметра
watch(() => props, (_new, _old) => {
    const PROC_NAME = 'Pipe.List.watch(props)> ';
    // console.log(`${PROC_NAME} props.stripId: `, props.stripId);
    console.log(`${PROC_NAME} props: `, _new);
    // console.log(`${PROC_NAME} _old: `, _old);
    // console.log(`${PROC_NAME}`, _new, _old);
    let change = false;
    let prop_ok = false;
    for (let key in props )   {
      if(props[key])  prop_ok = true;   
      if(props[key] !== (props_rem[key]))  change = true;   
    }
        
    if (prop_ok && change) {
      // console.log(`${PROC_NAME}props: `, _new);
      loadDataPipes(props);
      for (let key in props )  props_rem[key] = props[key] ;     // Запоминаем текущий набор свойств
    }
  },
  {
    deep: true,      // Глубокий watch для проверки всех вложенных элементов, но new будет равно old, так как оба ссылаются на один и тот же объект
    // immediate: true
  }
);


async function loadDataPipes(this_props) {    // Загрузка даннных
  const PROC_NAME = "loadDataPipes>";
  console.log(PROC_NAME + "this_props= ", this_props);
  // console.log("MyPagination.value= ", MyPagination.value);
  // if (!loading.value) s_loading(true, "Подождите, загружаются данные");  // 

  // load_data_ok.pipes = false;

  // if(!(this.pipeId || this.pipeNumber || this.stripId || this.stripNumber))   {
  if (!this_props.stripId) {
    console.log(PROC_NAME + "Поиск труб не производится. Не задано условий для поиски труб");
    return;
  }
  // Предварительно убеждаемся, что скачан справочник битов дефектов 
  if(!(BitStatusDict.value?.length > 0))  {
    await loadDictionaryBitStatus();
    if(!(BitStatusDict.value?.length > 0)) return;
  }
  

  console.log(PROC_NAME + "Запрос данных по трубам");
  s_loading(true, "Подождите. Производится запрос данных по трубам");
  const ret_pipes = await loadData({
    url: url.pipe.list, params: {
      // ...(this.pipeId && +this.pipeId > 0 && { "pipe-id": +this.pipeId }),
      // ...(this.pipeNumber && +this.pipeNumber > 0 && { "pipe-number": +this.pipeNumber }),
      // ...(this.stripId && +this.stripId > 0 && { "strip-id": +this.stripId }),
      ...(this_props.stripId && +this_props.stripId > 0 && { "strip-id": +this_props.stripId }),
      // ...(this.stripNumber && this.stripNumber.trim().length > 0 && { "strip-number": `%${this.stripNumber.trim()}%` }),
    }
  });


  console.log("ret_pipes = ", ret_pipes);
  // console.log("ret_roles = ", ret_roles);

  if (ret_pipes.error) {
    s_loading(false);
    // $q.notify({
		// 			message: `Загрузка данных труб произошла с ошибкой. Повторите попытку позже.`,
		// 			type: 'negative',
		// 			// icon: ''
		// 		});
    s_alert("Загрузка данных труб произошла с ошибкой. Повторите попытку позже", ret_pipes.error.message ?? "");
  } else {
    if (ret_pipes.length === 0) {
    	// s_alert("По заданным условиям не найдено данных");
      $q.notify({
					message: `По заданным условиям не найдено данных/`,
					type: 'negative',
					// icon: ''
				});
    }
    // Сортировка массива последний вверху
    ret_pipes.sort((a, b) => {
      if (a.PROD_DATE && b.PROD_DATE) {
        if (a.PROD_DATE > b.PROD_DATE) return -1;
        if (a.PROD_DATE < b.PROD_DATE) return 1;
        if (a.PROD_DATE === b.PROD_DATE) return 0;  //  Вообще - это невозможно в реальнсти, но пусть болтается
      }
      if (a.PROD_DATE && !b.PROD_DATE) return 1;
      if (!a.PROD_DATE && b.PROD_DATE) return -1;

      if (a.ENTRY_DATE && b.ENTRY_DATE) {  // Для назначенных - сортировка по партиям
        if (a.BATCH_NUMBER > b.BATCH_NUMBER) return -1;
        if (a.BATCH_NUMBER < b.BATCH_NUMBER) return 1;
        if (a.BATCH_NUMBER === b.BATCH_NUMBER) return b.PR_PIPE_ID - a.PR_PIPE_ID;
      }
      if (!a.ENTRY_DATE && !b.ENTRY_DATE) {
        if (a.CREATE_DATE > b.CREATE_DATE) return -1;
        if (a.CREATE_DATE < b.CREATE_DATE) return 1;
        if (a.CREATE_DATE === b.CREATE_DATE) return b.PR_PIPE_ID - a.PR_PIPE_ID;
      }
      if (a.ENTRY_DATE && !b.ENTRY_DATE) return 1;
      if (!a.ENTRY_DATE && b.ENTRY_DATE) return -1;
    });
    ret_pipes.forEach((item, idx) => {
      item.LAST_WC = item.CODE ? `${item.CODE}` : '';
      item.screen_select = Pipes.value?.find(s => (s.PR_PIPE_ID === item.PR_PIPE_ID))?.screen_select ?? false;    // восстанавливаем ввыбранную строку, если была
      item.hidden_row = Pipes.value?.find(s => (s.PR_PIPE_ID === item.PR_PIPE_ID))?.hidden_row ?? false;   // Возможно, лиишнее, но не повредит
      item.DIAM = isNaN(parseFloat(item.DIAM)) ? item.DIAM : parseFloat(item.DIAM);    // Иначе при загрузке в xlsx воспринимается как текстовое и не преобразовывавется
    });

    Pipes.value = ret_pipes;
    // load_data_ok.pipes = true;
     s_loading(false);
  }

};


// *****************************
// Загрузка справочника битовой сборки
async function loadDictionaryBitStatus() {    // Загрузка даннных
	const PROC_NAME = "loadDictionaryBitStatus>";
	// load_data_ok.bit_status = false;
  s_loading(true, "Подождите. Производится запрос данных Справочника автоматических дефектов");
	const ret_dict = await loadData({ url: dict.pipe.bit_status.list, params: {} });

	console.log(PROC_NAME + " ret_dict = ", ret_dict);
 
	const bit_status = [];

	if(ret_dict.error) {

		// s_alert("Загрузка данных справочника дефектов У1 произошла с ошибкой. Повторите попытку позже", ret_dict.error.message ?? "");
    $q.notify({
					message: `Загрузка данных справочника дефектов У1 произошла с ошибкой. Повторите попытку позже`,
					type: 'negative',
					// icon: ''
				});
	} else {
		if(ret_dict?.length === 0)  {
			// s_alert("По справочнику дефектов У1 не найдено данных");
      $q.notify({
					message: `По справочнику дефектов У1 не найдено данных`,
					type: 'negative',
					// icon: ''
				});
		}
		if(ret_dict?.length > 0) {
			ret_dict.sort((a, b) => (a.BIT_NUMBER - b.BIT_NUMBER));
			// EditPipe.value.bit_status = ret_dict.map((b, idx) => ({bit_number: b.BIT_NUMBER, name: b.NAME, code: b.CODE, bit: b.BIT, val: false,}));  // установка для новой трубы. 
			BitStatusDict.value = ret_dict;
		}

	}

	console.log("Cправочник битов дефектов =", ret_dict);
  s_loading(false);
	// BitStatusDict.value = ret_dict;
	// StrengthGroupList.value = strength_groups;   // 
};











// async function loadDataPipe() {    // Загрузка даннных по конкретно выбранной трубе
//   const PROC_NAME = 'loadDataPipe> ';
//   // load_data_ok.pipe = false;
//   const ret_pipe = await loadData({ url: url.pipe.get, params: { id: id, } });

//   if (ret_pipe?.error) {
//     // s_loading(false);
//     // // s_alert("При загрузке данных труб произошла ошибка. Повторите попытку позже." + (access.check('admin') ? '\n' + ret_pipe.error.message : ''));
//     // s_alert("При загрузке данных труб произошла ошибка. Повторите попытку позже.", ret_pipe.error.message ?? '');

//     // тут сам разбирайся, как сделать вывод на экран аварийного сообщения
//     console.log("При загрузке данных труб произошла ошибка. Повторите попытку позже.", ret_pipe.error.message ?? '');
//     $q.notify({
//       message: "При загрузке данных труб произошла ошибка. Повторите попытку позже. " + ret_pipe.error.message ?? '',
//     	color: 'negative',
//     	icon: 'warning'
//     })

//     return;
//   }
//   console.log(PROC_NAME + "Возврат данных с сервера (данные по трубе с id=" + id + "): ", ret_pipe);
//   // if (ret_pipe?.length === 0) {
//   //   // s_alert("По заданным условиям не найдено данных");
//   //   console.log("По заданным условиям не найдено данных");
//   //   $q.notify({
//   //     message: "По заданным условиям не найдено данных",
//   //   	color: 'negative',
//   //   	icon: 'warning'
//   //   })
//   // }

// }

function cellClass(row) {
  // console.log('row.PIPE_NUMBER  =', row.PIPE_NUMBER);
  // return (row.STATUS_NAME  === 'ЗАПЛАНИРОВАН' ? 'bg-light-green-12' : '');
  // return row.screen_select ? 'bg-blue-grey-2' : '';  
  return row.screen_select ? 'table-row-sel2' : '';

}

/**
 * Подсветка статуса трубы
 */
function cellStatusClass(row) {
  // return row.screen_select ? (row.STATUS_NAME === 'НАЗНАЧЕН' ? 'bg-light-green-5' : row.STATUS_NAME === 'В ПРОИЗВОДСТВЕ' ? 'bg-green-7' : row.STATUS_NAME === 'ПРОИЗВЕДЁН' ? 'bg-blue-14' : row.STATUS_NAME === 'ЗАПЛАНИРОВАН' ? 'status-planned' : "table-row-sel2") :
  //   (row.STATUS_NAME === 'НАЗНАЧЕН' ? 'status-assigned' : row.STATUS_NAME === 'В ПРОИЗВОДСТВЕ' ? 'status-in-prod' : row.STATUS_NAME === 'ПРОИЗВЕДЁН' ? 'status-produced' : row.STATUS_NAME === 'ЗАПЛАНИРОВАН' ? 'status-planned' : "");
  switch (row.STATUS_NAME) {
    case "В ПРОИЗВОДСТВЕ": return "status-in-prod";
    case "ЗАДЕРЖАНА ДЛЯ РЕМОНТА": return "status-repair-detained";
    case "РЕМОНТ": return "status-repairing";
    case "ПРОИЗВЕДЕНА": return "status-produced";
    case "УДАЛЕНА": return "status-deleted";
    case "УДАЛЕНА ИЗ HMI": return "status-deleted-hmi";
    default: return "";
  }
}


/**
 * подсветка рабочего центра
 */
function cellWcClass(row) {
  return row.screen_select ? (row.WC_AREA === 1 && row.WC_NUMBER === 1 ? 'wc-group1-sel' :
    row.WC_AREA === 1 && row.WC_NUMBER >= 1 && row.WC_NUMBER <= 6 ? 'wc-group2-sel' :
      (row.WC_AREA === 1 && row.WC_NUMBER >= 7) || row.WC_AREA === 2 ? 'wc-group3-sel' :
        row.WC_AREA === 3 ? 'wc-group4-sel' : "table-row-sel2") :
    (row.WC_AREA === 1 && row.WC_NUMBER === 1 ? 'wc-group1' :
      row.WC_AREA === 1 && row.WC_NUMBER >= 1 && row.WC_NUMBER <= 6 ? 'wc-group2' :
        (row.WC_AREA === 1 && row.WC_NUMBER >= 7) || row.WC_AREA === 2 ? 'wc-group3' :
          row.WC_AREA === 3 ? 'wc-group4' : "");
}

function MyFilterMethod(rows, terms, cols, getCellValue) {
  return rows;
};

function cellSelect(evt, row, index) {
  Pipes.value.forEach((item) => {
    item.screen_select = false;
  });
  row.screen_select = true;
  // console.log("Pipes.value = ", Pipes.value);
  pipeSelected.value.length = 0;
  pipeSelected.value.push(row);
};

// вызов ожидания загрузки данных
function s_loading(show_enable, txt)  {
 if(show_enable) loading_label.value = txt;
 loading.value = show_enable;
}

/**
 * Форматирование числа val на nDigits знаков после запятой
 */
 function numberFormatter(val, nDigits) {
	if( val !== null && nDigits !== null && nDigits >= 0 && nDigits < numberFormatterDig.length)  {
		if(nDigits === 0) {
			return numberFormatterDig[nDigits].format(Math.round(+val));
		} else {
			return numberFormatterDig[nDigits].format(+val);
		}
	} 
	return val;
}

// export default {
//   props: {
//     pipeId: Number,
//     pipeNumber: Number,
//     stripId: Number,
//     stripNumber: String,
//     // stripNumber: String,
//   },
//   // attrs: {
//   //   Pipes: [],
//   // },
//   // attrs() {
//   //   return {
//   //     Pipes: [],
//   //   }
//   // },
//   data() {
//     return {

//     }
//   },
//   methods: {
//     // Обработка фильтров


//   },
//   setup(props, context) {

//     onMounted(async () => {
//       const PROC_NAME = "Pipe.List.onMounted> ";
//       console.log(PROC_NAME + `НАЧАЛО: stripId= ${props.stripId}`);
//       // console.log(PROC_NAME + `Pipes.value= ${context}`);
//       // console.log(PROC_NAME + `this.Pipes = `, this.Pipes);
//       console.log(PROC_NAME + `this.Pipes = `, Pipes.value);
//       // loadDataPipes({pipeId: this.pipeId || null, pipeNumber: this.pipeNumber || null, stripId: this.stripId || null, stripNumber: this.stripNumber || null});
//       loadDataPipes(props);
//     });
//     return {
//       // isPwd: ref(true),
//     }
//   }

// }
</script>

<style scoped></style>