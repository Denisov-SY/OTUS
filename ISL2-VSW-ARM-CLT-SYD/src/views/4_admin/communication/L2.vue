<template >
	<div>

		<div class="blockt_loc">
			<!-- <div class="row pmy0">
				<div class="col-6 pmy0 ">
					<div class="row pmy0">
						<p> &nbsp;&nbsp;&nbsp;&nbsp;Модули Уровня 2 </p>
					</div>
				</div>
				<div class="col-6 pmy0 ">
					<div class="row float-right pmy0">
						<p> {{`${ReadLastTime ? 'Время обновления: ' + ReadLastTime.format(FORMAT_DATETIME_SEC) : ''}` }} &nbsp;&nbsp;</p>
					</div>
				</div>
			</div> -->
			<div class="row pmy0">
				<div class="col-6 pmy0 ">
					<div class="row pmy0">
						&nbsp;&nbsp;&nbsp;&nbsp;Модули Уровня 2   &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; 
						<q-checkbox style="margin-top: -5px;" v-model="AutoRefresh" :label="`${AutoRefreshTxt}`" dark size="xs" />
					</div>
				</div>
				<div class="col-6 pmy0 ">
					<div class="row float-right pmy0">
						 {{`${ReadLastTime ? 'Время обновления: ' + ReadLastTime.format(FORMAT_DATETIME_SEC) : ''}` }} &nbsp;&nbsp;
					</div>
				</div>
			</div>

						 <!-- &nbsp;&nbsp;&nbsp;&nbsp;Модули Уровня 2   &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
							<span>
								<q-checkbox style="margin-top: -3px;" v-model="AutoRefresh" :label="`${AutoRefreshTxt}`" dark size="xs" />
							</span> 
							<span class="float-right">{{`${ReadLastTime ? 'Время обновления: ' + ReadLastTime.format(FORMAT_DATETIME_SEC) : ''}` }} &nbsp;&nbsp;</span> -->
					

			
		</div>

		<div class="row pmy0">
			<div class="col-6 col-md-3 pmy1 px5">
				<q-btn no-caps :class="btnLoadDataClass" label="Обновить" @click="loadDataL2(true)" title="Чтение данных из БД с учётом всех фильтров" />
			</div>
			<div class="col-12 col-md-9 pmy1 px5">
				<q-badge :class="`q-px-sm q-mx-xs ${classISL2()}`" label="Связь с сервером У2" />
				<q-badge :class="`q-px-sm q-mx-xs ${classDBL2()}`" label="Связь с БД У2" />
			</div>
		</div>


		<!-- Таблица -->
		<div class="row blockt-h100"> 
			<div class="col-12 pmy0">
				<div class="header pmy0">
					<p> Программные модули</p>
				</div>
				<div class="row pmy1 pmx5">

					<div class="col-12 py-1">
						<q-table
							flat
							bordered
							_title="Программные модули" 
							dense
							separator="cell"
							class="table-style-stats table-stats"
							:rows="Stats_m"
							:columns="columns_m"
							:visible-columns="visibleColumns_m"
							row-key="MODULE_NAME"
							@row-click="cellSelect_m"
							:filter="MyFilter"
							:filter-method="MyFilterMethod_m"
							:rows-per-page-options="[5, 10, 15, 20, 25, 40, 50, 0]"
              :pagination="{rowsPerPage: 20}"
						>
							<template v-slot:loading>
								<q-inner-loading showing  />
							</template>
						</q-table>
					</div>
				</div>


			</div>
		</div>
		<br>
		<!-- Таблица -->
		<div class="row blockt-h100"> 
			<div class="col-12 pmy0">
				<div class="header pmy0">
					<p> Модули БД </p>
				</div>
				<div class="row pmy1 pmx5">

					<div class="col-12 py-1">
						<q-table
							flat
							bordered
							_title="Модули БД" 
							dense
							separator="cell"
							class="table-style-stats table-stats"
							:rows="Stats_m"
							:columns="columns_m"
							:visible-columns="visibleColumns"
							row-key="MODULE_NAME"
							@row-click="cellSelect"
							:filter-method="MyFilterMethod"
							:filter="MyFilter"
							:rows-per-page-options="[5, 10, 15, 20, 25, 40, 50, 0]"
              :pagination="{rowsPerPage: 20}"
						>
							<template v-slot:loading>
								<q-inner-loading showing  />
							</template>
						</q-table>
					</div>
				</div>


			</div>
		</div>
		<br>
		<!-- Таблица -->
		<div class="row blockt-h100"> 
			<div class="col-12 pmy0">
				<div class="header pmy0">
					<p> Хранимые процедуры БД </p>
				</div>
				<div class="row pmy1 pmx5">

					<div class="col-12 py-1">
						<q-table
							flat
							bordered
							_title="Хранимые процедуры БД" 
							dense
							separator="cell"
							class="table-style-stats table-stats"
							:rows="Stats_s"
							:columns="columns_s"
							:visible-columns="visibleColumns_s"
							row-key="MODULE_NAME"
							@row-click="cellSelect_s"

							:rows-per-page-options="[5, 10, 15, 20, 25, 40, 50, 0]"
              :pagination="{rowsPerPage: 20}"
						>
							<template v-slot:loading>
								<q-inner-loading showing  />
							</template>
						</q-table>
					</div>
				</div>


			</div>
		</div>



		<!-- Окно сообщения -->
		<!-- <q-dialog v-model="alert">
			<q-card>
				<q-card-section>
					<div class="text-h6">Внимание!</div>
				</q-card-section>

				<q-card-section class="q-pt-none">
					{{ alert_text }}
				</q-card-section>

				<q-card-actions align="right">
					<q-btn flat label="OK" color="primary" v-close-popup />
				</q-card-actions>
			</q-card>
		</q-dialog> -->

    <!-- Окно подтверждениия -->
    <!-- <q-dialog v-model="confirm" persistent>
      <q-card>
				<q-card-section>
					<div class="text-h6 text-center">Подтверждение</div>
				</q-card-section>
				<q-separator />
        <q-card-section class="row items-center">
					<div class="row text-body1">
						{{ confirm_text }}
					</div>
        </q-card-section>
				<q-separator />
        <q-card-actions align="right">
          <q-btn label="Нет" color="primary" v-close-popup />
          <q-btn label="Да" color="primary" v-close-popup @click="confirm_function(confirm_function_arg)" />
        </q-card-actions>
      </q-card>
    </q-dialog> -->

		<q-inner-loading
        :showing="loading"
        :label="loading_label"
        label-class="text-teal"
        label-style="font-size: 1.1em"
     />

	</div>

</template>

<script setup>

import { ref, watch, computed, onMounted, onBeforeUnmount } from "vue";
import { QList, QItem, QItemSection, QToggle, useQuasar, QInput , } from "quasar";

import moment from "moment";

import router from "../../../router";

import { loadData } from "../../../components/serverData";

import {  sys as url } from "../../../router/dataUrl";

import alertPro from '../../../components/alertPro.vue'

// Импорт короткого статуса компонентов для отслеживания их изменений
import { storeToRefs } from 'pinia'
import { useAccessStore } from "../../../stores/accessStore";
const accessStore = useAccessStore(); 
const { IslStatsCurrrent } = storeToRefs(accessStore);
// Конец - Импорт разрешений для кадров "Пакет" и "Список пакетов".


const $q = useQuasar();

const FORMAT_DATETIME_MINUTE = "YYYY-MM-DD HH:mm";
const FORMAT_DATETIME_MSEC = "YYYY-MM-DD HH:mm:ss.SSS";
const FORMAT_DATETIME_SEC = "YYYY-MM-DD HH:mm:ss";
const AUTO_REFRESH_INTERVAL = 30000;
const STAT_TXT_OK = "OK";


const btnLoadDataClass = ref("btn-vmz");

// const filtStatus =ref("");
const MessageTypes =ref([ {val: "ERR", 				label: "ERROR",    	el_enable: false, },
													{val: "WARN", 			label: "WARNING",  	el_enable: false, },
													{val: "INF", 				label: "INFORM",   	el_enable: false, },
													{val: "DETAIL", 		label: "DETAIL",   	el_enable: false, },
													{val: "DETAIL_F1", 	label: "DETAIL_F1", el_enable: false, },
													{val: "DETAIL_F2", 	label: "DETAIL_F2", el_enable: false, },]);
// const SelTypes =ref([]);


const MyFilter = ref({
	filt0: false,
});

const Stats_m = ref([]);
const Stats_s = ref([]);
const Stats = ref({});
const ReadLastTime = ref();
const AutoRefresh =  ref(false);
const AutoRefreshTxt =  ref("");

// const alert = ref(false);
// const alert_text = ref("");
// const confirm = ref(false);
// const confirm_text = ref("");
// const confirm_function = ref({});
// const confirm_function_arg = ref({});        //  Объект для передачи аргументов функции, которая будет описана в confirm_function
const loading = ref(false);
const loading_label = ref("");


const columns_m = ref([
	{
		name: "MODULE_NAME",
		required: true,
		label: "Модуль",
		align: "left",
		field: "MODULE_NAME",
		classes: cellClassName,
		format: (val) => `${val}`,
		sortable: true,
	},

	{
		name: "SCHEDULE_ENABLED",
		required: false,
		label: "Запущено",
		align: "center",
		field: (row) => row.SCHEDULE_ENABLED || "",
		classes: cellClassEnable,
		format: (val) => `${!val ? "" : val === "TRUE" ? "Запущен" : "Остановлен"}`,
		sortable: true,
	},
	{
		name: "REPEAT_INTERVAL",
		required: true,
		label: "Интервал (c)",
		align: "center",
		field: (row) => (row.REPEAT_INTERVAL?.indexOf("FREQ=SECONDLY;INTERVAL=") >= 0) ? parseInt(row.REPEAT_INTERVAL.substring("FREQ=SECONDLY;INTERVAL=".length)) : (row.REPEAT_INTERVAL_M ? row.REPEAT_INTERVAL_M / 1000 : ""),
		classes: cellClassTimestamp,
		format: (val) => `${val}`,
		sortable: true,
	},
	{
		name: "CURRENT_PAUSE",
		required: true,
		label: "Пауза (с)",
		align: "center",
		field: (row) => row.CURRENT_PAUSE,
		classes: cellClassTimestamp,
		format: (val) => `${val}`,
		sortable: true,
	},
	{
		name: "RUN_COUNT",
		required: true,
		label: "Запусков",
		align: "center",
		field: (row) => row.RUN_COUNT,
		classes: cellClass,
		format: (val) => `${val}`,
		sortable: true,
	},
	{
		name: "LAST_DURATION",
		required: true,
		label: "Длительность (мс)",
		align: "center",
		field: (row) => row.LAST_DURATION,
		classes: cellClass,
		format: (val) => `${val}`,
		sortable: true,
	},
	{
		name: "AVG_DURATION",
		required: true,
		label: `Ср. длительность (мс)`,
		align: "center",
		field: (row) => row.AVG_DURATION,
		classes: cellClass,
		format: (val) => `${val}`,
		sortable: true,
	},
	{
		name: "MAX_DURATION",
		required: true,
		label: `Макс. длительность (мс)`,
		align: "center",
		field: (row) => row.MAX_DURATION,
		classes: cellClass,
		format: (val) => `${val}`,
		sortable: true,
	},
	// {
	// 	name: "fail",
	// 	required: true,
	// 	label: "Ошибок",
	// 	align: "center",
	// 	field: "fail",
	// 	classes: cellClass,
	// 	format: (val) => `${val}`,
	// 	sortable: true,
	// },
	{
		name: "FAILURE_COUNT",
		required: true,
		label: "Ошибок",
		align: "center",
		field: "FAILURE_COUNT",
		classes: cellClassFail,
		format: (val) => `${val}`,
		sortable: true,
	},
	// {
	// 	name: "MESSAGE",
	// 	required: true,
	// 	label: "Сообщение",
	// 	align: "left",
	// 	field: "MESSAGE",
	// 	classes: cellClass,
	// 	format: (val) => `${val}`,
	// 	sortable: true,
	// },
	{
		name: "LAST_EXEC",
		required: true,
		label: "Последний запуск",
		align: "left",
		field: "LAST_EXEC",
		classes: cellClassTimestamp,
		format: (val) => `${moment(val).format(FORMAT_DATETIME_MSEC)}`,
		sortable: true,
	},
	
]);

const columns_s = ref([
	{
		name: "JOB_NAME",
		required: true,
		label: "Процедура",
		align: "left",
		field: "JOB_NAME",
		classes: cellClassName,
		format: (val) => `${val}`,
		sortable: true,
	},
	{
		name: "JOB_ACTION",
		required: true,
		label: "JOB_ACTION",
		align: "left",
		field: "JOB_ACTION",
		classes: cellClass,
		format: (val) => `${val}`,
		sortable: true,
	},
	{
		name: "ENABLED",
		required: false,
		label: "Запущено",
		align: "center",
		field: (row) => row.ENABLED || "",
		classes: cellClassEnable,
		format: (val) => `${!val ? "" : val === "TRUE" ? "Запущен" : "Остановлен"}`,
		sortable: true,
	},
	{
		name: "STATE",
		required: false,
		label: "Состояние",
		align: "center",
		field: (row) => row.STATE || "",
		classes: cellClassState,
		format: (val) => `${val}`,
		sortable: true,
	},
	{
		name: "LAST_RUN_DURATION",
		required: true,
		label: "Длительность (мс)",
		align: "center",
		field: (row) => row.LAST_RUN_DURATION,
		classes: cellClass,
		format: (val) => `${val}`,
		sortable: true,
	},
	{
		name: "RUN_COUNT",
		required: true,
		label: "Запусков",
		align: "center",
		field: (row) => row.RUN_COUNT,
		classes: cellClass,
		format: (val) => `${val}`,
		sortable: true,
	},
	{
		name: "FAILURE_COUNT",
		required: true,
		label: "Ошибок",
		align: "center",
		field: "FAILURE_COUNT",
		classes: cellClassFail,
		format: (val) => `${val}`,
		sortable: true,
	},


	{
		name: "LAST_START_DATE",
		required: true,
		label: "Последний запуск",
		align: "left",
		field: "LAST_START_DATE",
		classes: cellClass,
		format: (val) => `${moment(val).format(FORMAT_DATETIME_MSEC)}`,
		sortable: true,
	},
	{
		name: "NEXT_RUN_DATE",
		required: true,
		label: "Следующий запуск",
		align: "left",
		field: "NEXT_RUN_DATE",
		classes: cellClass,
		format: (val) => `${moment(val).format(FORMAT_DATETIME_MSEC)}`,
		sortable: true,
	},


	
]);
// const visibleColumns = ref(["REC_DATE", "OBJECT_NAME", "MESSAGE_TYPE", "MESSAGE", "REC_USER", "REC_MACHINE", "REC_OS_USER", "REC_PROGRAM", "ID", ]);
const visibleColumns = ref(["MODULE_NAME", "SCHEDULE_ENABLED", "REPEAT_INTERVAL", "CURRENT_PAUSE", "RUN_COUNT", "LAST_DURATION", "AVG_DURATION", "MAX_DURATION", "fail", "LAST_EXEC", ]);
const visibleColumns_m = ref(["MODULE_NAME", "REPEAT_INTERVAL", "CURRENT_PAUSE", "RUN_COUNT", "LAST_DURATION", "AVG_DURATION", "MAX_DURATION", "fail", "LAST_EXEC", ]);
const visibleColumns_s = ref(["JOB_NAME", "JOB_ACTION", "ENABLED", "STATE", "LAST_RUN_DURATION", "RUN_COUNT", "FAILURE_COUNT", "LAST_START_DATE", "NEXT_RUN_DATE", ]);

let Timeout1, Timeout2;
let is_life = true;
let isl_stats_old = "{}"

onMounted(async () => {
	const PROC_NAME = "onMounted> ";
	console.log(`${PROC_NAME}Начало`);

  // loadDataL2();
	dataStatRead();
	// console.log("ret_jobs = ", ret_jobs);

	
});

onBeforeUnmount(() => {
	is_life = false;
  clearTimeout(Timeout2);
  clearTimeout(Timeout1);
});


/**
 * Функция, запускающая постоянный цикл обновления данных в таблицf[]
 */
 async function dataStatRead() {
  const PROC_NAME = "dataStatRead> ";
	
	Timeout1 = setTimeout(async function  stats_data_read() {
		// Обновление по истечению интервала в 30 секунд. или после изменения статуса вверху мин, 
		if(!ReadLastTime.value || (AutoRefresh.value && ((moment().diff(ReadLastTime.value) >= AUTO_REFRESH_INTERVAL) || (isl_stats_old	!== IslStatsCurrrent.value)))) {   // 30000 мс = 30 сек 
			isl_stats_old	= IslStatsCurrrent.value;
			await loadDataL2(); 
		} else {
			if(!AutoRefresh.value ) {
				AutoRefreshTxt.value = `Автообновление отключено`;
			} else {
				AutoRefreshTxt.value = ReadLastTime.value ? `Автообновление через ${parseInt((AUTO_REFRESH_INTERVAL - moment().diff(ReadLastTime.value)) / 1000)} сек.` : "";
			}
		}

		try{
			if( is_life ) Timeout2 = setTimeout(stats_data_read, 1000);
		} catch (err) {
      console.error(`${PROC_NAME} ОШИБКА цикла чтения данных!!!`, err);
    }

		
  
	}, 100);
}



async function loadDataL2(force) {    // Загрузка даннных

	s_loading(true, "Подождите, загружаются данные");
	const ret_l2 = await loadData({ url: url.detail, params: { l2: force ? "force" : "true", l1: force ? "force" : "true",	} });
	console.log("ret_l2 = ", ret_l2);
	Stats.value = ret_l2;
	ReadLastTime.value = moment();
  if(ret_l2?.error) {
		s_loading(false);
		s_alert("Загрузка данных произошла с ошибкой. Повторите попытку позже", ret_l2.error.message ?? "");
		Stats_m.value = [];
		Stats_s.value = [];
	} else {
		if(Array.isArray(ret_l2?.status?.l2?.modules))  {
			let i = 0;
			ret_l2.status.l2.modules.forEach((item) => {
				item.screen_select = false;
				item.hidden_row = false;
				item.index = ++i;
			});
			Stats_m.value =  ret_l2.status.l2.modules;
		} else {
			Stats_m.value = [];
		}
		if(Array.isArray(ret_l2?.status?.l2?.schedules		))  {
			let i = 0;
			ret_l2.status.l2.schedules.forEach((item) => {
				item.screen_select = false;
				item.hidden_row = false;
				item.index = ++i;
			});
			Stats_s.value =  ret_l2.status.l2.schedules;
		} else {
			Stats_s.value = [];
		}
		MyFilter.value.filt0 = true;
		s_loading(false);
	}




	
};

// Статус связи с сервером У2
function classISL2() {
	if(!Stats.value || Stats.value?.error) return  "system-status-error";
	if(Stats.value?.status?.l2 ) return "system-status-ok1";
	return "system-status-na";
}
// Статус связи с БД У2
function classDBL2() {
	if(!Stats.value || Stats.value?.error) return  "system-status-net-error";
	if(Stats.value?.status?.l2?.db === true	) { 
		return "system-status-ok1"; 
	} else {
		return  "system-status-error";
	} 
}













// Обработка фильтров
function MyFilterMethod(rows, terms, cols, getCellValue) {  
	
	return rows.filter(item => item.hidden_row === false && item.MODULE_NAME.indexOf("ISL2-VSW-") < 0 ) || [];
};

// Обработка фильтров
function MyFilterMethod_m(rows, terms, cols, getCellValue) {  
	
	return rows.filter(item => item.hidden_row === false && item.MODULE_NAME.indexOf("ISL2-VSW-") >= 0 ) || [];
};






function cellClass(row) {
 
	return row.screen_select ? 'table-row-sel2' : '';  
	
}


function cellClassTimestamp(row) { 
  if(row?.TIMESTAMP && (row.TIMESTAMP !== STAT_TXT_OK)) return  'table-row-err';
	return row.screen_select ? 'table-row-sel2' : '';  
}
function cellClassFail(row) { 
  if(row?.fail  && (row.fail > 0)) return  'table-row-err';
	return row.screen_select ? 'table-row-sel2' : '';  
}
function cellClassEnable(row) { 
  if((row?.SCHEDULE_ENABLED && (row.SCHEDULE_ENABLED === 'FALSE')) || (row?.ENABLED && (row.ENABLED === 'FALSE'))) return  'table-row-err';
	return row.screen_select ? 'table-row-sel2' : '';  
}
function cellClassState(row) { 
  if(row?.STATE && (row.STATE !== "SCHEDULED")) return  'table-row-err';
	return row.screen_select ? 'table-row-sel2' : '';  
}



function cellClassName(row) { 
  if((cellClassTimestamp(row) === 'table-row-err') || (cellClassFail(row) === 'table-row-err') || (cellClassEnable(row) === 'table-row-err') || (cellClassState(row) === 'table-row-err')) return  'table-row-err';
	return row.screen_select ? 'table-row-sel2' : '';  
}


function cellStatusClass(row) {
	return row.screen_select ? (row.MESSAGE_TYPE  === 'ERROR' ? 'bg-red-5' :  row.MESSAGE_TYPE  === 'WARNING' ? 'bg-yellow-4' : "table-row-sel2") : 
			(row.MESSAGE_TYPE  === 'ERROR' ? 'bg-red-14' : row.MESSAGE_TYPE  === 'WARNING' ? 'bg-yellow-7' : "") ;
}

function cellSelect(evt, row, index)  {
	// console.log("evt=", evt);
	Stats_m.value.forEach((item) => {
		if(item.MODULE_NAME.indexOf("ISL2-VSW-") < 0 )  item.screen_select = false;
	});
	row.screen_select = true;
	// console.log("Strips.value = ", Strips.value);
}

function cellSelect_m(evt, row, index)  {
	// console.log("evt=", evt);
	Stats_m.value.forEach((item) => { 
		if(item.MODULE_NAME.indexOf("ISL2-VSW-") >=0 )  item.screen_select = false;
	});
	row.screen_select = true;
	// console.log("Strips.value = ", Strips.value);
}

function cellSelect_s(evt, row, index)  {
	// console.log("evt=", evt);
	Stats_s.value.forEach((item) => {
		item.screen_select = false;
	});
	row.screen_select = true;
	// console.log("Strips.value = ", Strips.value);
}





// // вызов обычного окна сообщения
// function s_alert(txt) {
//  alert_text.value = txt;
//  alert.value = true;
// }

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

// // вызов окна сообщения из confirm  (txt в объекте)
// function confirm_s_alert({txt}) {
//  alert_text.value = txt;
//  alert.value = true;
// }

// // вызов обычного окна подтверждения
// function s_confirm(txt, func, arg) {
//  confirm_text.value = txt;
//  confirm_function.value = func;
//  confirm_function_arg.value = arg || {};         // Все аргументы при наличии передаются через объект
//  confirm.value = true;
// }





// вызов ожидания загрузки данных
function s_loading(show_enable, txt)  {
 if(show_enable) loading_label.value = txt;
 loading.value = show_enable;
}


</script>



<style lang="sass" scoped>

.blockt-h100-loc 
	height: 100%
	border: 2px solid white
	border-radius: 10px
	margin-left: 3px 
	margin-right: 2px 
	margin-bottom: 3px 
	margin-top: 2px 


.blockt_loc
	border: 2px 
	// border-color: rgba(255, 255, 255)
	border: 2px solid white
	border-radius: 10px
	margin-left: 3px
	margin-right: 2px
	margin-bottom: 3px 
	margin-top: 2px
	padding-left: 1rem
	// padding: 1px
	inheritAttrs: true



.hidden-row 
	display: none



q-btn
	border: 0px !important

.input_small
	font-size: 8pt !important
	// font-weight: bold !important

</style>



<style lang="sass">

.table-style-stats

	thead tr th
		color: #FFFFFF 
		border-color: #FFFFFF 
		text-align: center !important
		vertical-align: middle !important
		background-color: rgb(70, 69, 64) !important
		font-size: 10pt !important

	tr td 
			// text-align: center
			vertical-align: middle !important
			color: #000000 




.table-stats	.bg-red-5
	background-color: $red-5  
	color: white 

.table-stats	.bg-red-14
	background-color: $red-14  
	color: white 

.table-stats	.bg-yellow-4
	background-color: $yellow-4  
	color: black 

.table-stats	.bg-yellow-7
	background-color: $yellow-7  
	color: black 

		
</style>



<style scoped>

.btn-vmz {
	background: linear-gradient(rgb(180, 180, 180), rgb(73, 73, 73)) !important;
	border: 2px solid white !important;
	margin-bottom: 5px !important;
}

.btn-vmz1 {
	background: linear-gradient(rgb(180, 180, 180), rgb(73, 73, 73)) !important;
	border: 2px solid lime !important;
	margin-bottom: 5px !important;
}



.user_sel {
	background-color: white !important;
}
	


/* -------------------------КНОПКИ-------------------------------------------------------------------------------------------------------- */



.btn-vmz-nav {
	background: linear-gradient(rgb(180, 180, 180), rgb(73, 73, 73));
	color: white !important;
}


/* ----------------------------ВКЛАДКИ------------------------------------------------------------------------------------------------------- */

.tabs {
	position: relative; /* Относительное позиционирование */
}
.tab,
.tab-title {
	display: inline-block; /* Выстраиваем по горизонтали */
}
.tab input[type='radio'] {
	display: none;
}
.tab-title {
	background-color: rgb(102, 102, 102); /* Цвет фона */
	padding: 5px 10px; /* Поля вокруг текста */
	border: 2px solid white; /* Параметры рамки */
	border-radius: 10px 10px 0px 0px;
	border-bottom: none; /* Снизу линию убираем */
}
.tab-content {
	position: absolute; /* Абсолютное позиционирование */
	border: 2px solid white; /* Параметры рамки */
	border-radius: 0px 10px 10px 10px;
	padding: 10px; /* Поля вокруг текста */
	left: 0; /* Размещаем у левого края */
	width: calc(100% - 20px);
	display: none; /* Прячем вкладку */
}
.tab :checked + .tab-title {
	position: relative; /* Относительное позиционирование */

	background-color: rgb(70, 69, 64);
	top: 2px; /* Сдвигаем вниз */
	z-index: 1; /* Отображаем поверх содержимого */
}
.tab :checked ~ .tab-content {
	display: block; /* Показываем активную вкладку */
}
.tab :checked ~ .tab-title {
	border-bottom-color: rgb(70, 69, 64);
}

/* --------------------------ТЕКСТОВЫЕ ПОЛЯ И ПОЛЯ ВВОДА/ВЫВОДА--------------------------------------------------- */

.field {
	clear: both;
	text-align: right;
	/* line-height: 25px; */
}

.label_left {
	float: left;
	padding-right: 10px;
}



</style>
