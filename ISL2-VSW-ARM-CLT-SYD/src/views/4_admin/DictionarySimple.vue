<template >
	<div>

		<div class="blockt">&nbsp;&nbsp;&nbsp;&nbsp;{{title_string}}</div>
		<!-- Блок Кнопок команд -->
		<div v-if="!EditMode"  class="row blockt-h100"> 
			<div class="col-12 pmy0">
				<div class="header pmy0">
					<p> Команды</p>
				</div>
				<div class="q-pa-sm q-gutter-sm pmy1">
					<q-btn no-caps :class="btnLoadDataClass" label="Обновить" @click="loadDictionary(props.dictionary)" title="Обновить. Чтение данных справочника из БД."/>
					<q-btn no-caps class="btn-vmz" label="Новая запись"  @click="BtnNew" title="Создание новой записи."/>
					<q-btn no-caps class="btn-vmz" label="Редактировать" @click="BtnEdit" title="Редактирование выбранной записи." />
					<q-btn no-caps class="btn-vmz" label="Удалить" @click="BtnDel" title="Удаление выбранной записи." />
				</div>
			</div>
		</div>
		<!-- Блок фильтров -->
		<div v-if="!EditMode"  class="row blockt-h100"> 
			<div class="col-12 pmy0">
				<div class="header pmy0">
					<p> Фильтры</p>
				</div>

				<div class="row pmy0">
					<template v-for="filter in MyFilter.addFilter">
						<div class="col-2 pmy1 px5">
							<q-input  v-model="filter.val" outlined filled dense color="black" bg-color="white" :label="label_rus(filter.name)" type="text"  input-class="input1" style="width: 100%;" /> 
						</div>
					</template>

				</div>

			</div>
		</div>


		<!-- Поле редактирлвания записи -->
		<div v-if="EditMode"  class="row blockt-h100"> 
			<div class="col-12 pmy0">
				<div class="row header pmy0">
					<p> {{EditTitle }}</p>
				</div>
				<div class="row">
					<div class="col-12" >
					</div>
				</div>
				<div class="row pmy5">
					<template v-for="field in EditRecord.addFields">
						<div class="col-4 pmy5 px5">
							<q-input  v-model="field.val" outlined filled dense color="black" bg-color="white" :label="label_rus(field.name)" type="text"  input-class="input1" style="width: 100%;" /> 
						</div>
					</template>

				</div>
				<div class="row q-pa-sm q-gutter-sm pmy5">
					<div class="col-6  pmy5">
						<q-btn no-caps class="btn-vmz f-right" label="Сохранить"  @click="BtnSave" title="Сохранить данные после редактирования." />
					</div>
					<div class="col-5 pmy5">
						<q-btn no-caps class="btn-vmz" label="Отмена"  @click="EditMode = false;" title="Отменить несохранённые изменения."/>
					</div>
				</div>


			</div>
		</div>


		<!-- Таблица -->
		<div class="row blockt-h100"> 
			<div class="col-12 pmy0">
				<div class="header pmy0">
					<p> {{ title_string }}</p>
				</div>
				<div class="row pmy1 pmx5">
					<div class="col-12 py-1">
						<q-table
							flat
							bordered
							_title="Данные справочника" 
							dense
							separator="cell"
							class="table-style1"
							:rows="CurrentDictionary"
							:columns="columns"
							:visible-columns="visibleColumns"
							row-key="index"
							:filter="MyFilter"
							:filter-method="MyFilterMethod"
							:rows-per-page-options="[5, 10, 15, 20, 25, 40, 50, 0]"
              :pagination="{rowsPerPage: 20}"
						>
							<template v-slot:body="props">
								<q-tr
									:props="props"
									:class="props.row.screen_select ? 'table-row-sel1' : ''"      
									:onmousedown="
										(ev) => {
											if(!EditMode) {
												CurrentDictionary.forEach((item) => { item.screen_select = false; });
												props.row.screen_select = true;
											}
										}
									"
								>
									<q-td v-for="col in props.cols" :key="col.name" :allign="col.allign">
										{{ col.value }}
									</q-td>
								</q-tr>

							</template>
							
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

import { loadData, sendData } from "../../components/serverData";

import { dictionary as dict } from "../../router/dataUrl";

import alertPro from '../../components/alertPro.vue'
import confirmPro from '../../components/confirmPro.vue';

const $q = useQuasar();

const props = defineProps({

	dictionary: String,
});
const FORMAT_DATETIME_MINUTE = "YYYY-MM-DD HH:mm";
const FORMAT_DATETIME_MSEC = "YYYY-MM-DD HH:mm:ss.SSS";
const FORMAT_DATETIME_SEC = "YYYY-MM-DD HH:mm:ss";
const FORMAT_DATE = "DD.MM.YYYY"; 
const FORMAT_DATE_INPUT = "YYYY-MM-DD"; 
const ACTION_COPY = 'copy';
const ACTION_NEW = 'new';
const ACTION_EDIT = 'edit';
const ACTION_VIEW = 'view';

const MyFilter = ref({use: null, 
											addFilter: [],
											});


const EditTitle = ref("Редактирование записи");		
const EditMode = ref(false);									
const EditRecord = ref({use: 1,
												id: -1, 
											addFields: [],
											});

const btnLoadDataClass = ref("btn-vmz");

const Dict = ref([]);

const title_string = ref("Справочник");
const act_view = ref(false);
const CurrentDictionary = ref([]);


// const alert = ref(false);
// const alert_text = ref("");
// const confirm = ref(false);
// const confirm_text = ref("");
// const confirm_function = ref({});
// const confirm_function_arg = ref({});        //  Объект для передачи аргументов функции, которая будет описана в confirm_function
const loading = ref(false);
const loading_label = ref("");

const columns = ref([]);


const visibleColumns = ref([]);


	onMounted(async () => {
		const PROC_NAME = "onMounted> ";
		console.log(`${PROC_NAME}Начало`);

		console.log("onMounted props = ", props);
		if(props?.dictionary) {
			loadDictionary(props.dictionary);
		}

	});




	/**
	 * Загрузка справочника по параметру
	 */
	async function loadDictionary(dictionary) {    // Загрузка даннных
		const ret_dict = [];
		let dict_url;

		if(dictionary) {
			switch (dictionary) {
					case "MeasureUnits": 		dict_url = dict.measureUnit.list;      
						title_string.value = "Справочник единиц измерения";  break;

			}
		}

		if(dict_url) {
			s_loading(true, "Подождите, загружаются данные");
			const ret_dict = await loadData({ url: dict_url, params: {} });
			console.log("ret = ", ret_dict);

			if(ret_dict?.error) {
				s_loading(false);
				s_alert("Загрузка данных произошла с ошибкой. Повторите попытку позже", ret_dict.error.message ?? "");
			} else {
				if(ret_dict?.length === 0)  {
					s_alert("Для данного справочника не найдено данных");
				}
				ret_dict.forEach((item, idx) => {
					item.screen_select = false;
					item.hidden_row = false;
					item.index = idx;

				});
				
				if(ret_dict?.length > 0)  {
					if(columns.value.length === 0)  {   // Если инициализации колонок ещё не было
						columns.value.length = 0;
						for (let key in ret_dict[0] )  {
							if(key !== "screen_select" && key !== "hidden_row") {

								columns.value.push({
									name: key,
									required: true,
									label: label_rus(key),
									align: "left",
									field: key,

									format: key === "CREATE_DATE" || key === "MODIFY_DATE" ? (val) => `${moment(val).format(FORMAT_DATETIME_SEC)}` : (val) => `${val}`,
									sortable: true,
								},);
							}

							if (key !== "screen_select" && key !== "hidden_row" && key !== "CREATE_DATE" && key !== "MODIFY_DATE" && key !== "MODIFY_USER" && key !== "USE" && key !== "index" 
									&& key.lastIndexOf('_ID') !==  key.length - 3 ) 	{
								if( !MyFilter.value.addFilter.find((f, ind, arr) => (f.name === key))  )   MyFilter.value.addFilter.push({name: key, val: "", });        // Добавляем фильтры для нестандартных полей и подя DESCRIPTION
								if( !EditRecord.value.addFields.find((f, ind, arr) => (f.name === key))  )   EditRecord.value.addFields.push({name: key, val: "", });        // Добавляем поля редактирования для нестандартных полей и подя DESCRIPTION
							}

							console.log("MyFilter.value.addFilter = ", MyFilter.value.addFilter);
						}
						columns.value.sort(columns_sort);
						visibleColumns.value.length = 0;

						columns.value.forEach( (col) => {  if( col.name !== "USE")	visibleColumns.value.push(col.name); 	});

						console.log("columns.value = ", columns.value);

					}

					CurrentDictionary.value = ret_dict;
					console.log("CurrentDictionary.value = ", CurrentDictionary.value);
				

					s_loading(false);
				}
			}
		}

	};


	/**
	 * Запись в спраочник по параметру
	 */
	async function saveDictionary(dictionary) {    // Загрузка даннных
		// const ret_dict = [];
		let dict_url;

		if(dictionary) {
			switch (dictionary) {
					case "MeasureUnits": 		dict_url = dict.measureUnit.save;      break;

			}
		}
		console.log("dict_url = ", dict_url);
		if(dict_url) {
			s_loading(true, "Подождите. Производится запись данных");
			// Формируем список параметров для передачи в БД
			let save_params;
			if( !EditMode.value ) {      // Запись не из режима редактирования - это удаление
				save_params = {id: EditRecord.value.id, };
			} else {                     // Запись из режима редактирования (новая или редактируемая)
				save_params = {
					use: EditRecord.value.use ? 1 : 0,
					...(EditRecord.value?.id > 0 && { id: EditRecord.value.id }),
				};
				EditRecord.value.addFields.forEach(field => { save_params[field.name] = field.val.trim(); } );
			}
		
			console.log("save_params = ", save_params);
			const ret = await loadData({ url: dict_url, params: save_params });


			console.log("ret = ", ret);

			if(ret?.error) {
				s_loading(false);
				if(ret.error.errorNum === 20007) {
					s_alert("Запись данных произошла с ошибкой. Попытка удаления элемента, который используется.", ret.error.message ?? "");
					/* впоследствии, возможно надо будет выдавать собщение errorMessage */
				} else {
					s_alert("Запись данных произошла с ошибкой. Повторите попытку позже", ret.error.message ?? "");
				}
				
			} else {
				if( ret.ret_id > 0 || ret.ret_id < 0)  {  // Операция прошла успешно
					s_alert("Операция прошла успешно");
				}

				s_loading(false);
				EditMode.value = false;              // Выходим из режима редактирования
				loadDictionary(props.dictionary);    // Перечитываем справочник
			}

		} else {
			s_alert("Что-то пошло не так. Перезагрузите страницу");
		}

	};





	/**
	 * формирование русского названия поля справочника
	 */
	function label_rus(key_eng) {
		if( key_eng && key_eng.lastIndexOf('_ID') ===  key_eng.length - 3 )  return "ID"; 
		switch (key_eng) {
					case "index": 					return "№";      							// Общие
					case "CREATE_DATE": 		return "Время создания";      // Общие
					case "MODIFY_DATE": 		return "Время изменения";     // Общие
					case "MODIFY_USER": 		return "Пользователь";     		// Общие
					case "USE": 				return "Активно";      				// Общие
					case "DESCRIPTION": 		return "Описание";      			// Общие
					case "MEASURE_UNITS":		return "Ед. изм.";      // Единицы измерения
					default:   return key_eng;
			}
	}

	/**
	 * Сортировка колонок для расположения в таблице
	 */
	function columns_sort(a, b) {
		// начало
		if( a.name === "index")  return  -1;
		if( b.name === "index")  return  1;
		if( a.name.lastIndexOf('_ID') ===  a.name.length - 3)  return  -1;  
		if( b.name.lastIndexOf('_ID') ===  b.name.length - 3)  return  1;
		// теперь с конца
		if( a.name === "MODIFY_USER")  return  1;
		if( b.name === "MODIFY_USER")  return  -1;
		if( a.name === "MODIFY_DATE")  return  1;
		if( b.name === "MODIFY_DATE")  return  -1;
		if( a.name === "CREATE_DATE")  return  1;
		if( b.name === "CREATE_DATE")  return  -1;
		if( a.name === "USE")  return  1;
		if( b.name === "USE")  return  -1;
		if( a.name === "DESCRIPTION")  return  1;
		if( b.name === "DESCRIPTION")  return  -1;
		// Остальные поля - в серединке
		return a.name - b.name;
	}



	// ************* Кнопки.


	/**
	 * Действия по кнопке "новоая запись"
	 */
	function BtnNew() {
		EditTitle.value = "Создание новой записи"
		EditRecord.value.use = true;
		EditRecord.value.id  = -1;
		EditRecord.value.addFields.forEach( (field) => {field.val = ""});
		EditMode.value = true;
	}

	/**
	 * Действия по кнопке "Редактировать"
	 */
	function BtnEdit() {
		if( find_select_row(CurrentDictionary.value) )  {
			let row = find_select_row(CurrentDictionary.value);
			let id_key;
			for(let key in row) {
				if( key.lastIndexOf('_ID') ===  key.length - 3) { id_key = key;  break; }
			}
			if(id_key) {
				EditTitle.value = "Редактирование записи";
				EditRecord.value.use = row.USE === 1 ? true : false;
				EditRecord.value.id  = row[id_key];
				EditRecord.value.addFields.forEach( (field) => {field.val = row[field.name];});
				EditMode.value = true;
			} else {
				s_alert("Что-то пошло не так. Выберите строку и повторите попытку");   // сообщение на экран
			}


		} else {
			s_alert("Не выбрана строка. Выберите строку и повторите попытку");   // сообщение на экран
		}
	}


	/**
	 * Действия по кнопке "Сохранить"
	 */
	async function BtnSave() {
		if( edit_check() ) {
			saveDictionary(props.dictionary );
		}
	}  


/**
* Проверки перед попыткой записи
*/
function edit_check() {
	// let check = true;
	if(!edit_change_check() ) {
		s_alert("Запись не была изменена (не отличается от исходной)");  return false;
	}
	if(edit_null_check() ) {
		s_alert("Одно или несколько полей редактирования не заполнены");  return false;
	}
	return true;
}


	/** 
	 * Поиск отличий в редакторе и исходной строке. Возвращает true, если есть отличающиеся поля
	 */
	function edit_change_check() {
		let check = false;
		if(EditRecord.value.id && EditRecord.value.id > 0) {
			let id_key;
			let find_row;

			for(let i = 0; i < columns.value.length; i++ ) {
				// console.log("columns.value ", columns.value[i]);
				if( columns.value[i].name.lastIndexOf('_ID') ===  columns.value[i].name.length - 3) { id_key = columns.value[i].name;  break; }
			}
			console.log("edit_change_check()  id_key = ", id_key);
			if(id_key) {
				find_row = CurrentDictionary.value.find((row, ind, arr) => (row[id_key] === EditRecord.value.id ));
				if(find_row) {

					if(EditRecord.value.use !== ( find_row.USE === 1 ))     return true;
					console.log("1 check = ", check);
					EditRecord.value.addFields.forEach((field) => {
						console.log("field.val.trim()  = ", field.val.trim() );
						console.log("find_row[field.name]  = ", find_row[field.name] );
						if( field.val.trim() !== find_row[field.name]) check = true;
						console.log("2 check = ", check);
					});   
				}
			}

		} else check = true;
		return check;
	}


	/** 
	 * Поиск пустых полей в редакторе. Возвращает true, если найдёт незаполненное поле
	 */
	function edit_null_check() {
		let check = false;

		EditRecord.value.addFields.forEach(field => {
			if( field.val.trim() === "" || field.val.trim() === null ) check = true;
		}); 

		return check;
	}



//  Удаление выбранной строки
function BtnDel() {
	if( find_select_row(CurrentDictionary.value) )  {
		if( find_select_row(CurrentDictionary.value) )  {
			let row = find_select_row(CurrentDictionary.value);
			let id_key;
			for(let key in row) {
				if( key.lastIndexOf('_ID') ===  key.length - 3) { id_key = key;  break; }
			}
			if(id_key) {
				console.log(`строка для удаления= `, row);
				console.log(`id для удаления= `, row[id_key]);
				let message = "Вы уверены, что хотите удалить строку:";
				EditRecord.value.addFields.forEach((field) => { message += `${label_rus(field.name)}: "${row[field.name]}", `});
				s_confirm(`${message} ?`, DelRow, {id: row[id_key],});
			}  else {
				s_alert("Что-то пошло не так. Выберите строку и повторите попытку");   // сообщение на экран
			}
		} else {
			s_alert("Что-то пошло не так. Выберите строку и повторите попытку");   // сообщение на экран
		}
	} else {
		s_alert("Не выбрана строка. Выберите строку и повторите попытку");   // сообщение на экран
	}
}


// Действия по удалению
async function DelRow({id}) {
	console.log("id строки для удаления= ", id);
	EditRecord.value.id = id;
	saveDictionary(props.dictionary );

} 



// поиск выбранной строки для перехода на другой экран. Пока не запариваемся на то, есть ли она на текущей странице
function find_select_row(rows) {
	if(rows?.length > 0) {
		return rows.find((row, ind, arr) => (row.screen_select === true && row.hidden_row === false)); 
	}
	return null;
}



// Обработка фильтров
function MyFilterMethod(rows, terms, cols, getCellValue) {  
	
	console.log('terms= ', terms);

	if(rows?.length) {
		let hidden;
		for(let i = 0; i< rows.length; i++) {
			hidden = false;
			terms.addFilter.forEach((filter) => {
				// console.log('filter= ', filter);
				if(filter.val && rows[i][filter.name].indexOf(filter.val) < 0)   {hidden = true;};
			});
			

			rows[i].hidden_row = hidden;
		}
	}
	// console.log('filter-method-rows= ', rows);

	return rows.filter(item => item.hidden_row === false) || [];
};


	// // вызов обычного окна сообщения
	// function s_alert(txt) {
	// 	alert_text.value = txt;
	// 	alert.value = true;
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
	// 	alert_text.value = txt;
	// 	alert.value = true;
	// }

	// вызов обычного окна подтверждения
	function s_confirm(txt, conf_func, conf_arg) {
		if(txt ) { // 
			$q.dialog({
				component: confirmPro,
				componentProps: {
					confirm_text: txt,
					onOk1: () => {      // Если нажата "Да"
						if(conf_func) conf_func(conf_arg || {});
					},
				},
			});
		}
	}

// // вызов обычного окна подтверждения
	// function s_confirm(txt, func, arg) {
	// 	confirm_text.value = txt;
	// 	confirm_function.value = func;
	// 	confirm_function_arg.value = arg || {};         // Все аргументы при наличии передаются через объект
	// 	confirm.value = true;
	// }

	// вызов ожидания загрузки данных
	function s_loading(show_enable, txt)  {
		if(show_enable) loading_label.value = txt;
		loading.value = show_enable;
	}


</script>

<!-- <style lang="sass" scoped> -->

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

.f-right
	float: right

</style>



<style lang="sass">

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
