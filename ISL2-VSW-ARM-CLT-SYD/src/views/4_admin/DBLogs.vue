<template >
	<div>

		<div class="blockt">&nbsp;&nbsp;&nbsp;&nbsp;Журнал событий</div>

		<!-- Блок фильтров -->
		<div class="row blockt-h100"> 
			<div class="col-12 pmy0">
				<div class="header pmy0">
					<p> Фильтры</p>
				</div>
				<!-- <div class="q-pa-sm q-gutter-sm row pmy1"> -->
				<div class="row pmy0">
					<div class="col-12 col-lg-5 pmy0">
						<div class="row pmy0">
							<!-- <div class="col-3 pmy0">
							</div> -->

							<div class="col-3 pmy1 px5">
								<q-btn no-caps :class="btnLoadDataClass" label="Обновить" @click="loadDataMessages" title="Чтение данных из БД с учётом всех фильтров" />
							</div>
							<div class="col-9 pmy0">
								<div class="row pmy0">
									<div class="col-6 pmy1 px5">
										<q-input  v-model="MyFilter.filtDateBeg" outlined filled dense label="От" color="black" bg-color="white" type="datetime-local"  input-class="input1"  
												@update:model-value="MyFilterChange"/> 
									</div>
									<div class="col-6 pmy1 px5">
										<q-input  v-model="MyFilter.filtDateEnd" outlined filled dense label="До" color="black" bg-color="white" type="datetime-local"  input-class="input1" 
												@update:model-value="MyFilterChange" /> 
									</div>
								</div>
							</div>

						</div>
					</div>

					<div class="col-12 col-lg-7 pmy0">
						<div class="row pmy0">
							<div class="col-2 pmy1 px5">
								<q-input  v-model="MyFilter.filtObject" outlined filled dense color="black" bg-color="white" label="Объект:" type="text"  input-class="input1" style="width: 100%;" @update:model-value="MyFilterChange" /> 
							</div>
							<div class="col-2 pmy1 px5">
								<q-input  v-model="MyFilter.filtMessage" outlined filled dense color="black" bg-color="white" label="Сообщение:" type="text"  input-class="input1" style="width: 100%;" @update:model-value="MyFilterChange" /> 
							</div>
							<div class="col-6 pmy1 px5">
								<q-select multiple emit-value map-options outlined dense options-dense color="black" bg-color="white" label-color="$grey-7" 
									v-model="MyFilter.filtTypes"
									:options="MessageTypes" 
									option-label="label" 
									option-value="val" 
									@update:model-value = "MyFilterChange"
									label="Типы сообщений" class="input_small" style="width: 100%;" :disable="false" 
									>
									<template  v-slot:option="{ itemProps, opt, selected, toggleOption }" >
											<q-item v-bind="itemProps" >
												<q-item-section side size="xs" >
													<q-checkbox :model-value="selected" :label="`${opt.label}`" color="black" size="xs"   @update:model-value="toggleOption(opt)"  /> 
												</q-item-section>
											</q-item>
									</template>
								</q-select>
							</div>
							<div class="col-2 pmy1 px5">
									<q-input  v-model="MyFilter.filtLimit" outlined filled dense color="black" bg-color="white" label="Лимит строк:" type="number" min="1" max="10000" input-class="input1" style="width: 100%;" @update:model-value="MyFilterChange" /> 
							</div>
						</div>
					</div>

				</div>

			</div>
		</div>


		<!-- Таблица -->
		<div class="row blockt-h100"> 
			<div class="col-12 pmy0">
				<div class="header pmy0">
					<p> События</p>
				</div>
				<div class="row pmy1 pmx5">

					<div class="col-12 py-1">
						<q-table
							flat
							bordered
							_title="СОбытия" 
							dense
							separator="cell"
							class="table-style-messages table-messages"
							:rows="Messages"
							:columns="columns"
							:visible-columns="visibleColumns"
							row-key="ID"
							:filter="MyFilter"
							:filter-method="MyFilterMethod"
							@row-click="cellSelect"
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

import { ref, watch, computed, onMounted } from "vue";
import { QList, QItem, QItemSection, QToggle, useQuasar, QInput , } from "quasar";

import moment from "moment";

import router from "../../router";

import { loadData } from "../../components/serverData";

import { admin as url } from "../../router/dataUrl";

import alertPro from '../../components/alertPro.vue'

const $q = useQuasar();

const FORMAT_DATETIME_MINUTE = "YYYY-MM-DD HH:mm";
const FORMAT_DATETIME_MSEC = "YYYY-MM-DD HH:mm:ss.SSS";
const FORMAT_DATE = "DD.MM.YYYY"; 
const FORMAT_DATE_INPUT = "YYYY-MM-DD"; 
const ACTION_COPY = 'copy';
const ACTION_NEW = 'new';
const ACTION_EDIT = 'edit';
const ACTION_VIEW = 'view';

const MyFilter = ref({filtDateBeg: moment().add(-1, "hours").format(FORMAT_DATETIME_MINUTE),
											filtDateEnd: moment().format(FORMAT_DATETIME_MINUTE),
											filtObject: "",
											filtMessage: "",
											filtTypes: ["ERR", "WARN", "INF", ],   // По умолчанию должны быть установлены
											filtLimit: 500,
											});
const MyFilterRemember = 	{	filtDateBeg: MyFilter.value.filtDateBeg,
														filtDateEnd: MyFilter.value.filtDateEnd,
														filtObject: "",
														filtMessage: "",
														filtTypes: ["ERR", "WARN", "INF", ],   // По умолчанию должны быть установлены
														filtLimit: MyFilter.value.filtLimit,
														};
const btnLoadDataClass = ref("btn-vmz");

// const filtStatus =ref("");
const MessageTypes =ref([ {val: "ERR", 				label: "ERROR",    	el_enable: false, },
													{val: "WARN", 			label: "WARNING",  	el_enable: false, },
													{val: "INF", 				label: "INFORM",   	el_enable: false, },
													{val: "DETAIL", 		label: "DETAIL",   	el_enable: false, },
													{val: "DETAIL_F1", 	label: "DETAIL_F1", el_enable: false, },
													{val: "DETAIL_F2", 	label: "DETAIL_F2", el_enable: false, },]);
// const SelTypes =ref([]);




const Messages = ref([]);

// const alert = ref(false);
// const alert_text = ref("");
// const confirm = ref(false);
// const confirm_text = ref("");
// const confirm_function = ref({});
// const confirm_function_arg = ref({});        //  Объект для передачи аргументов функции, которая будет описана в confirm_function
const loading = ref(false);
const loading_label = ref("");


const columns = ref([
	{
		name: "REC_DATE",
		required: true,
		label: "Время",
		align: "left",
		field: "REC_DATE",
		classes: cellClass,
		format: (val) => `${moment(val).format(FORMAT_DATETIME_MSEC)}`,
		sortable: true,
	},
	{
		name: "OBJECT_NAME",
		required: true,
		label: "Объект",
		align: "left",
		field: (row) => row.OBJECT_NAME,
		classes: cellClass,
		format: (val) => `${val}`,
		sortable: true,
	},
	{
		name: "MESSAGE_TYPE",
		required: true,
		label: "Тип",
		align: "center",
		field: "MESSAGE_TYPE",
		classes: cellStatusClass,
		format: (val) => `${val}`,
		sortable: true,
	},
	
	{
		name: "MESSAGE",
		required: true,
		label: "Сообщение",
		align: "left",
		field: "MESSAGE",
		classes: cellClass,
		format: (val) => `${val}`,
		sortable: true,
	},
	{
		name: "REC_USER",
		required: true,
		label: "Приложение",
		align: "center",
		field: "REC_USER",
		classes: cellClass,
		format: (val) => `${val}`,
		sortable: true,
	},
	{
		name: "REC_MACHINE",
		required: true,
		label: "Узел",
		align: "left",
		field: "REC_MACHINE",
		classes: cellClass,
		format: (val) => `${val}`,
		sortable: true,
	},
	{
		name: "REC_OS_USER",
		required: true,
		label: "Пользователь",
		align: "center",
		field: "REC_OS_USER",
		classes: cellClass,
		format: (val) => `${val}`,
		sortable: true,
	},
	{
		name: "REC_PROGRAM",
		required: true,
		label: "Программа-инициатор",
		align: "left",
		field: "REC_PROGRAM",
		classes: cellClass,
		format: (val) => `${val}`,
		sortable: true,
	},
	{
		name: "ID",
		required: true,
		label: "ID",
		align: "center",
		field: "ID",
		classes: cellClass,
		format: (val) => `${val}`,
		sortable: true,
	},
]);

const visibleColumns = ref(["REC_DATE", "OBJECT_NAME", "MESSAGE_TYPE", "MESSAGE", "REC_USER", "REC_MACHINE", "REC_OS_USER", "REC_PROGRAM", "ID", ]);




onMounted(async () => {
	const PROC_NAME = "onMounted> ";
	console.log(`${PROC_NAME}Начало`);

  loadDataMessages();
	// console.log("ret_jobs = ", ret_jobs);

	
});


async function loadDataMessages() {    // Загрузка даннных

	s_loading(true, "Подождите, загружаются данные");

	const ret_messages = await loadData({ url: url.dbLogs, params: {
	...(MyFilter.value.filtDateBeg && moment(MyFilter.value.filtDateBeg).isValid() && { d1: MyFilter.value.filtDateBeg }),
	...(MyFilter.value.filtDateEnd && moment(MyFilter.value.filtDateEnd).isValid() && { d2: MyFilter.value.filtDateEnd }),
	...(MyFilter.value.filtTypes && MyFilter.value.filtTypes.length > 0 && { type: MyFilter.value.filtTypes.join(',') }),
	...(MyFilter.value.filtLimit && { limit: MyFilter.value.filtLimit }),
	...(MyFilter.value.filtMessage && MyFilter.value.filtMessage.trim().length > 0 && { msg: MyFilter.value.filtMessage.trim() }),
	...(MyFilter.value.filtObject && MyFilter.value.filtObject.trim().length > 0 && { obj: MyFilter.value.filtObject.trim() }),


	} });


	MyFilterRemember.filtDateBeg = MyFilter.value.filtDateBeg;
	MyFilterRemember.filtDateEnd = MyFilter.value.filtDateEnd;
	MyFilterRemember.filtObject = MyFilter.value.filtObject;
	MyFilterRemember.filtMessage = MyFilter.value.filtMessage;
	MyFilterRemember.filtLimit = MyFilter.value.filtLimit;
	MyFilterRemember.filtTypes = [];
	MyFilter.value.filtTypes.forEach((type) => { MyFilterRemember.filtTypes.push(type); });


	console.log("ret_messages = ", ret_messages);

  if(ret_messages?.error) {
		s_loading(false);
		// s_alert("Загрузка данных произошла с ошибкой. Повторите попытку позже");
		s_alert("Загрузка данных произошла с ошибкой. Повторите попытку позже", ret_messages.error.message ?? "");
	} else {
		if(ret_messages?.length === 0)  {
			s_alert("По заданным условиям не найдено данных");
		}
		let i = 0;
		ret_messages.forEach((item) => {
			item.screen_select = false;
			item.hidden_row = false;
			item.executed = 0;                    // временно. Пока нет процента исполнения заказа
			item.index = ++i;
		});

		Messages.value = ret_messages;
		MyFilterChange();

		s_loading(false);
	}




	
};

/**
 * Фильтр типов сообщений - действия по выбору типов сообщений (для красивой картинки)
 * @param {*} v 
 */
 function selectTypesChange(v) {
	// console.log("SelTypes.value (1) = ", SelTypes.value);
	const sel = [];
	MessageTypes.value.forEach((t)=> {
		t.el_enable = false;
	});
	MyFilter.value.filtTypes.forEach((t)=> { 
		MessageTypes.value.find((mt, ind, arr) => (mt.val === t)).el_enable = true;
	});
};


// Если выбрано начальное время либо конечере время за пределами интервала, по которому производился поиск,
// подсветить кнопку "обновить"
function MyFilterChange() {
	let need = false;
  // Времена
	if( (MyFilter.value.filtDateBeg && moment(MyFilter.value.filtDateBeg).isValid() && MyFilterRemember.filtDateBeg && moment(MyFilterRemember.filtDateBeg).isValid() 
					&& moment(MyFilterRemember.filtDateBeg).isAfter(moment(MyFilter.value.filtDateBeg)))
	    || (MyFilter.value.filtDateEnd && moment(MyFilter.value.filtDateEnd).isValid() && MyFilterRemember.filtDateEnd && moment(MyFilterRemember.filtDateEnd).isValid() 
			    && moment(MyFilterRemember.filtDateEnd).isBefore(moment(MyFilter.value.filtDateEnd)) )   )    {

		need = true;
	}

	//  Объект
	if( MyFilterRemember.filtObject.length > 0) {            // проверка только если запомнен фильтпр
		if( MyFilter.value.filtObject.length === 0 ) {
			need = true;
		} else {
			if(MyFilter.value.filtObject.indexOf(MyFilterRemember.filtObject) < 0 )   need = true;
		}
	}
	
	//  Сообщение
	if( MyFilterRemember.filtMessage.length > 0) {            // проверка только если запомнен фильтпр
		if( MyFilter.value.filtMessage.length === 0 ) {
			need = true;
		} else {
			if(MyFilter.value.filtMessage.indexOf(MyFilterRemember.filtMessage) < 0 )   need = true;
		}
	}
	
	// Типы сообщений
	if( !( MyFilterRemember.filtTypes.length === 0 || MyFilterRemember.filtTypes.length === MessageTypes.value.length) )   // Если запомнен полный выбор, проверка обходится
	{ 
		if(MyFilter.value.filtTypes.length === 0 ) {
		 need = true; 
		} else {
			MyFilter.value.filtTypes.forEach((type) => {
				// need =  !MyFilterRemember.filtTypes.find((rtype, ind, arr) => (rtype === type));
				if ( !MyFilterRemember.filtTypes.find((rtype, ind, arr) => (rtype === type)) )   need = true;
			});
		}
	
	}
		
	// Лимит
  if ( MyFilterRemember.filtLimit && MyFilter.value.filtLimit > MyFilterRemember.filtLimit)		need = true;			
	

  	// console.log('!!!! выход за рамки DateBeg')
		btnLoadDataClass.value = need ?"btn-vmz1" : "btn-vmz";

	  console.log("btnLoadDataClass.value = ", btnLoadDataClass.value);
	  console.log("MyFilter.value.filtTypes	 = ", MyFilter.value.filtTypes);
};


// Обработка фильтров
function MyFilterMethod(rows, terms, cols, getCellValue) {  
	
	console.log('filter-method-terms= ', terms.filtStatus);

	if(rows?.length) {
		for(let i = 0; i< rows.length; i++) {
			if(terms.filtObject && (rows[i].OBJECT_NAME).indexOf(terms.filtObject) < 0)   {rows[i].hidden_row = true;  continue;};
			if(terms.filtMessage && (rows[i].MESSAGE).indexOf(terms.filtMessage) < 0)   {rows[i].hidden_row = true;  continue;};
			if(terms.filtTypes && !checkRowType(rows[i], terms.filtTypes))   {rows[i].hidden_row = true;  continue;};
			if(terms.filtDateBeg && moment(terms.filtDateBeg).isValid() && moment(terms.filtDateBeg).isAfter(moment(rows[i].REC_DATE)) )  {rows[i].hidden_row = true;  continue;};
			if(terms.filtDateEnd && moment(terms.filtDateEnd).isValid() && moment(terms.filtDateEnd).isBefore(moment(rows[i].REC_DATE)) )  {rows[i].hidden_row = true;  continue;};
			if(terms.filtLimit && +(terms.filtLimit) > 0 && rows[i].index > +(terms.filtLimit))   {rows[i].hidden_row = true;  continue;};
			rows[i].hidden_row = false;
		}
	}
	// console.log('filter-method-rows= ', rows);

	return rows.filter(item => item.hidden_row === false) || [];
};

/**
 * Проверка наличия в массиве sel_types подстроки, содержащейся в row. Для фильтров
 * @param {*} row 
 * @param {*} sel_types 
 */
function checkRowType(row, sel_types) {
	let ok = false;
	if(row?.MESSAGE_TYPE && sel_types && sel_types.length > 0) {
		
		sel_types.forEach((type) => {
			if( type.indexOf("DETAIL") < 0)  {
				if( row.MESSAGE_TYPE.indexOf(type) >= 0) ok = true;
			} else {  																									// Для DETAIL, DETAIL_F1, DETAIL_F2 - проверка на строгое совпадение
				if(row.MESSAGE_TYPE == type)  ok = true;
			}
     
		});
		
	} else {
		if(sel_types && sel_types.length === 0)  ok = true;
	}
	return ok;
};


function cellClass(row) {
 
	return row.screen_select ? 'table-row-sel2' : '';  
	
}
function cellStatusClass(row) {
	return row.screen_select ? (row.MESSAGE_TYPE  === 'ERROR' ? 'bg-red-5' :  row.MESSAGE_TYPE  === 'WARNING' ? 'bg-yellow-4' : "table-row-sel2") : 
			(row.MESSAGE_TYPE  === 'ERROR' ? 'bg-red-14' : row.MESSAGE_TYPE  === 'WARNING' ? 'bg-yellow-7' : "") ;
}

function cellSelect(evt, row, index)  {
	Messages.value.forEach((item) => {
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



.hidden-row 
	display: none



q-btn
	border: 0px !important

.input_small
	font-size: 8pt !important
	// font-weight: bold !important

</style>



<style lang="sass">

.table-style-messages

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




.table-messages	.bg-red-5
	background-color: $red-5  
	color: white 

.table-messages	.bg-red-14
	background-color: $red-14  
	color: white 

.table-messages	.bg-yellow-4
	background-color: $yellow-4  
	color: black 

.table-messages	.bg-yellow-7
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
