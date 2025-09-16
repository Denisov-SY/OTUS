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
					<q-btn no-caps :class="btnLoadDataClass" label="Обновить" @click="loadDictionary()" title="Обновить. Чтение данных справочника из БД." />
					<q-btn no-caps class="btn-vmz" label="Новая запись"  @click="BtnNew" title="Создание новой записи." />
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

					<div class="col-2 pmy1 px5">
						<q-input  v-model="MyFilter.name" outlined filled dense color="black" bg-color="white" label="Имя принтера" type="text"  input-class="input1" style="width: 100%;" /> 
					</div>
					<div class="col-2 pmy1 px5">
						<q-input  v-model="MyFilter.description" outlined filled dense color="black" bg-color="white" label="Описание" type="text"  input-class="input1" style="width: 100%;" /> 
					</div>
					<div class="col-2 pmy1 px5">
						<q-input  v-model="MyFilter.ip" outlined filled dense color="black" bg-color="white" label="IP-адрес" type="text"  input-class="input1" style="width: 100%;" /> 
					</div>
					<div class="col-2 pmy1 px5">
						<q-input  v-model="MyFilter.pos_code" outlined filled dense color="black" bg-color="white" label="Позиция" type="text"  input-class="input1" style="width: 100%;" /> 
					</div>
					<!-- <div class="col-4 pmy1 px5">
						<q-select emit-value map-options outlined dense clearable options-dense color="black" bg-color="white" label-color="$grey-7" v-model="MyFilter.table"
												:options="SelFiltTables" option-label="stat" option-value="stat" label="Таблица" class="input1" style="width: 100%;"  />
					</div> -->

				</div>

			</div>
		</div>


		<!-- Поле редактирования записи -->
		<div v-if="EditMode"  class="row blockt-h100"> 
			<div class="col-12 pmy0">
				<div class="row header pmy0">
					<p> {{EditTitle }}</p>
				</div>
				<div class="row pmy0"> 
					<div class="col-4 pmy1 px5">
						<q-input  v-model="EditRecord.name" outlined filled dense color="black" bg-color="white" label="Имя принтера" type="text"  input-class="input1" style="width: 100%;" /> 
					</div>
					<div class="col-8 pmy1 px5">
						<q-input  v-model="EditRecord.description" outlined filled dense color="black" bg-color="white" label="Описание" type="text"  input-class="input1" style="width: 100%;" /> 
					</div>
				</div>
				<div class="row pmy0"> 
					<div class="col-4 pmy1 px5">
						<q-input  v-model="EditRecord.ip" outlined filled dense color="black" bg-color="white" label="IP-адрес" type="text"  input-class="input1" style="width: 100%;" /> 
					</div>
					<div class="col-3 pmy1 px5">
						<q-select emit-value map-options outlined dense options-dense clearable color="black" bg-color="white" label-color="$grey-7" v-model="EditRecord.pipe_position"
							:options="DictDictPipePosition" option-label="stat" option-value="val" label="Позиция" class="select1" style="width: 100%;"  />
					</div>

				</div>




				<!-- <div class="row pmy0">
					<div class="col-4 ">
						<div class="row pmy0">
							<div class="col-12 pmy1 px5">
								<q-input  v-model="EditRecord.name" outlined filled dense color="black" bg-color="white" label="Код принтера" type="text"  input-class="input1" style="width: 100%;" /> 
							</div>
						</div>
						<div class="row pmy0">
							<div class="col-12 pmy1 px5">
								<q-input  v-model="EditRecord.description" outlined filled dense color="black" bg-color="white" label="Описание" type="text"  input-class="input1" style="width: 100%;" /> 
							</div>
						</div>
						<div class="row pmy0">
							<div class="col-12 pmy1 px5">
								<q-input  v-model="EditRecord.ip" outlined filled dense color="black" bg-color="white" label="IP-адрес" type="text" input-class="input1" style="width: 100%;" /> 
							</div>
						</div>
						<div class="row pmy0">
							<div class="col-12 pmy1 px5">
								<q-select emit-value map-options outlined dense options-dense clearable color="black" bg-color="white" label-color="$grey-7" v-model="EditRecord.pipe_position"
														:options="DictDictPipePosition" option-label="stat" option-value="val" label="Позиция" class="select1" style="width: 100%;"  />
							</div>
						</div>

					</div>

				</div> -->

				<div class="row q-pa-sm q-gutter-sm pmy5">
					<div class="col-6  pmy5">
						<q-btn no-caps class="btn-vmz f-right" label="Сохранить"  @click="BtnSave" title="Сохранить данные после редактирования." />
					</div>
					<div class="col-5 pmy5">
						<q-btn no-caps class="btn-vmz" label="Отмена"  @click="EditMode = false;" title="Отменить несохранённые изменения." />
					</div>
				</div>

			</div>
		</div>

		<!-- Таблица -->
		<div class="row blockt-h100"> 
			<div class="col-12 pmy0">
				<div class="header pmy0">
					<p> Атрибуты</p>
				</div>
				<div class="row pmy1 pmx5">
					<div class="col-12 py-1">
						<q-table
							flat
							bordered
							_title="Данные Атрибутов" 
							dense
							separator="cell"
							class="table-style1"
							:rows="LabelPrinterList"
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
												LabelPrinterList.forEach((item) => { item.screen_select = false; });
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

const FORMAT_DATETIME_MINUTE = "YYYY-MM-DD HH:mm";
const FORMAT_DATETIME_MSEC = "YYYY-MM-DD HH:mm:ss.SSS";
const FORMAT_DATETIME_SEC = "YYYY-MM-DD HH:mm:ss";
const FORMAT_DATE = "DD.MM.YYYY"; 
const FORMAT_DATE_INPUT = "YYYY-MM-DD"; 
const IPFORMAT = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

const MyFilter = ref({name: null, 
											description: null, 
											ip: null, 
											pos_code: null, 
											table: null,
											});


const EditTitle = ref("Редактирование записи");		
const EditMode = ref(false);									
const EditRecord = ref({//use: 1,
												id: -1, 
												name: null, 
												description: null, 
												ip: null, 
												pipe_position: null,
												});


const btnLoadDataClass = ref("btn-vmz");


const SelMultyPage = ref([ {stat: "Многостраничная", val: 1,}, {stat: "1 лист", val: 0,},]);  




const DictDictPipePosition = ref([]);



const title_string = ref("Справочник прнтеров бирок");

const LabelPrinterList = ref([]);

const loading = ref(false);
const loading_label = ref("");


const columns = ref([
	{
		name: "LBL_PRINTER_ID",
		required: true,
		label: "ID",
		align: "left",
		field: (row) => row.LBL_PRINTER_ID,
		format: (val) => `${val}`,
		sortable: true,
	},
	{
		name: "NAME",
		required: true,
		label: "Имя Принтера",
		align: "center",
		field: "NAME",
		format: (val) => `${val}`,
		sortable: true,
	},
	{
		name: "DESCRIPTION",
		required: true,
		label: "Описание",
		align: "center",
		field: "DESCRIPTION",
		format: (val) => `${val ?? ""}`,
		sortable: true,
	},
	{
		name: "IP",
		required: true,
		label: `IP-адрес`,
		align: "center",
		field: "IP",
		format: (val) => `${val ?? ""}`,
		sortable: true,
	},
	{
		name: "POS_CODE",
		required: true,
		label: "Позиция",
		align: "center",
		field: "POS_CODE",
		format: (val) => `${val ?? ""}`,
		sortable: true,
	},
	{
		name: "CREATE_DATE",
		required: true,
		label: "Время создания",
		align: "center",
		field: "CREATE_DATE",
		format: (val) => `${moment(val).format(FORMAT_DATETIME_SEC)}`,
		sortable: true,
	},
	{
		name: "MODIFY_DATE",
		required: true,
		label: "Время изменения",
		align: "center",
		field: "MODIFY_DATE",
		format: (val) => `${moment(val).format(FORMAT_DATETIME_SEC)}`,
		sortable: true,
	},
	{
		name: "MODIFY_USER",
		required: true,
		label: "Пользовательг",
		align: "center",
		field: "MODIFY_USER",
		format: (val) => `${val ?? ""}`,
		sortable: true,
	},
	{ name: "PR_PIPE_POSITION_ID", label: "PR_PIPE_POSITION_ID", field: "PR_PIPE_POSITION_ID" },

]);


const visibleColumns = ref([ "LBL_PRINTER_ID", "NAME", "DESCRIPTION", "IP", "POS_CODE", "CREATE_DATE", "MODIFY_DATE", "MODIFY_USER", ]);


const load_data_ok = {labelPrinter: false, pipe_position: false, }


	onMounted(async () => {
		const PROC_NAME = "onMounted> ";
		console.log(`${PROC_NAME}Начало`);

		loadDictionary();
	});



	async function loadDictionary() {
		s_loading(true, "Подождите, загружаются данные");
		loadLabelPrinter();
		// loadDictTables();
		loadDictPipePosition();
	}



	/**
	 * Загрузка справочника принтеров (основная таблица)
	 */
	async function loadLabelPrinter() {    // Загрузка даннных
		load_data_ok.labelPrinter = false;
		if(!loading.value)  s_loading(true, "Подождите, Обновление справочника");  // Для обновления после того, как были внесены изменения
		
		const ret_print = await loadData({ url: dict.label.printer.list, params: {} });

		console.log("ret_print = ", ret_print);

		if(ret_print?.error) {
			s_loading(false);
			s_alert("При загрузке данных принтеров произошла ошибка. Повторите попытку позже", ret_print.error.message ?? "");
		} else {
			if(ret_print?.length === 0)  {
				s_alert("Для данного справочника не найдено данных");
			}
			ret_print.forEach((item, idx) => {
				item.screen_select = false;
				item.hidden_row = false;
				item.index = idx;
			});
			
			if(ret_print?.length > 0)  {
				ret_print.sort((a,b) => {
					if(a.NAME > b.NAME) return 1;
					if(a.NAME < b.NAME) return -1;
					return 0;
				});
				LabelPrinterList.value = ret_print;
			}

			load_data_ok.labelPrinter = true;
			load_data_check();
		}

	}


		
	/**
	 * Загрузка справочника позиций пакетов
	 */
	async function loadDictPipePosition() {    // Загрузка даннных
		load_data_ok.pipe_position = false;
		const ret_dict = await loadData({ url: dict.pipe.position.list, params: {} });

		console.log("ret_dict PipePosition = ", ret_dict);
	
		let units = [];

		if(ret_dict.error) {
			s_loading(false);
			s_alert("Загрузка данных справочника позиций труб произошла с ошибкой. Повторите попытку позже", ret_dict.error.message ?? "");
		} else {
			if(ret_dict?.length === 0)  {
				s_alert("По справочнику позиций труб не найдено данных");
			}
			if(ret_dict?.length > 0) 
				for(let i = 0; i < ret_dict.length; i++) {
					if(ret_dict[i].POS_TYPE === "BC" || ret_dict[i].POS_TYPE === "SC" || ret_dict[i].POS_TYPE === "SPARE")
						units.push({val: ret_dict[i].PR_PIPE_POSITION_ID, stat: `${ret_dict[i].CODE}`,});
				}
				// console.log("1 units= ", units);
				units.sort((a,b) => (a.stat > b.stat ? 1 : a.stat === b.stat ? 0 : -1));
				// console.log("2 units= ", units);
			load_data_ok.pipe_position = true;
			load_data_check();

		}

		DictDictPipePosition.value = units;   // 
	};

	/**
	 * Запись в справочник по параметру
	 */
	async function saveDictionary() {    // Загрузка даннных

			s_loading(true, "Подождите. Производится запись данных");
			// Формируем список параметров для передачи в БД
			let save_params;
			if( !EditMode.value ) {      // Запись не из режима редактирования - это удаление
				save_params = {id: EditRecord.value.id, };
			} else {                     // Запись из режима редактирования (новая или редактируемая)
				save_params = {
					printer: {
						// USE: 										EditRecord.value.use ? 1 : 0,
						NAME: 									EditRecord.value.name?.trim(),
						DESCRIPTION: 						EditRecord.value.description?.trim(),
						IP: 										EditRecord.value.ip?.trim(),
						PR_PIPE_POSITION_ID: 		EditRecord.value.pipe_position,
						USE:										1,
					},
					...(EditRecord.value?.id > 0 && { id: EditRecord.value.id }),
				};
			}
		
			console.log("save_params = ", save_params);

			const ret_save = await sendData({ url: dict.label.printer.save, params: save_params });

			console.log("ret_save = ", ret_save);

			if(ret_save?.error) {
				s_loading(false);
				s_alert("Запись данных произошла с ошибкой. Повторите попытку позже", ret_save.error.message ?? "");
			} else {
				if( ret_save.id > 0 )  {  // Операция прошла успешно
					s_alert("Операция прошла успешно");
				}

				s_loading(false);
				EditMode.value = false;              // Выходим из режима редактирования
				loadLabelPrinter();    // Перечитываем справочник
			}

	};



	// ************* Кнопки.

	/**
	 * Действия по кнопке "новоая запись"
	 */
	function BtnNew() {
		EditTitle.value = "Создание новой записи"
		// EditRecord.value.use = true;
		EditRecord.value.id  = -1;
		EditRecord.value.name  = "";
		EditRecord.value.description  = "";
		EditRecord.value.ip  = "";
		EditRecord.value.pipe_position  = null;
		EditMode.value = true;
	}


	/**
	 * Действия по кнопке "Редактировать"
	 */
	function BtnEdit() {
		if( find_select_row(LabelPrinterList.value) )  {
			let row = find_select_row(LabelPrinterList.value);
			if(row) {
				EditTitle.value = "Редактирование записи";
				EditRecord.value.id  						= row.LBL_PRINTER_ID;
				// EditRecord.value.use 						= row.USE === 1 ? true : false;
				EditRecord.value.name  						= row.NAME;
				EditRecord.value.description 	 		= row.DESCRIPTION;
				EditRecord.value.ip  							= row.IP;
				EditRecord.value.pipe_position 		= row.PR_PIPE_POSITION_ID;
				
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
			s_confirm(`Сохранить введёные данные?`, saveDictionary, {});
			// saveDictionary( );
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
	if(edit_value_check() ) {
		// s_alert("Одно или несколько полей редактирования не заполнены");  return false;
		return false;
	}
	return true;
}


	/** 
	 * Поиск отличий в редакторе и исходной строке. Возвращает true, если есть отличающиеся поля
	 */
	function edit_change_check() {
		let check = false;
		if(EditRecord.value.id && EditRecord.value.id > 0) {
			let find_row = LabelPrinterList.value.find((row, ind, arr) => (row.LBL_PRINTER_ID === EditRecord.value.id ));
			if(find_row) {
				// if((EditRecord.value.use ? 1 : 0 ) !== find_row.USE )  check = true;
				if(EditRecord.value.name?.trim() !== find_row.ATTR_NAME )  check = true;
				if(EditRecord.value.description?.trim() !== find_row.DESCRIPTION )  check = true;
				if(EditRecord.value.ip?.trim() !== find_row.IP )  check = true;
				if(EditRecord.value.pipe_position !== find_row.PR_PIPE_POSITION_ID )  check = true;
			}
		} else {
			check = true;
		}
		return check;
	}


	/** 
	 * Поиск пустых и плохих полей в редакторе. Возвращает true, если найдёт незаполненное или плохое поле
	 */
	function edit_value_check() {
		let check = false;

		if(!EditRecord.value.name || EditRecord.value.name.trim() === "" ) {
			s_alert(`Поле "Имя принтера" не заполнено`);
			return true;
		} 
		const row_same = LabelPrinterList.value.find(p => (p.NAME === EditRecord.value.name.trim()));
		if(row_same && (EditRecord.value.id <= 0 || EditRecord.value.id !== row_same.LBL_TEMPLATE_ID)) {
			s_alert(`Запись с таким полем "Имя принтера" уже существует`);
			return true;
		}
		if(!EditRecord.value.description || EditRecord.value.description.trim() === "" ) {
			s_alert(`Поле "Описание" не заполнено`);
			return true;
		} 
		if(!EditRecord.value.ip || EditRecord.value.ip.trim() === "" ) {
			s_alert(`Поле "IP-адрес" не заполнено`);
			return true;
		} 
		if(!IPFORMAT.test(EditRecord.value.ip.trim()) ) {
			s_alert(`Поле "IP-адрес" заполнено неверно`);
			return true;
		} 

		// if(inputText.value.match(ipformat))
		// .test(myForm.emailAddr.value)


		// if(!EditRecord.value.pipe_position || EditRecord.value.pipe_position <= 0 ) {
		// 	s_alert(`Не выбрана Позиция принтера`);
		// 	return true;
		// } 
		return check;
	}




//  Удаление выбранной строки
function BtnDel() {


		if( find_select_row(LabelPrinterList.value) )  {
 
			let row = find_select_row(LabelPrinterList.value);
			console.log(`строка для удаления= `, row);
			let message = `Вы уверены, что хотите удалить строку: ID = "${row.LBL_PRINTER_ID},"  Имя принтера = "${row.NAME},"  Описание = "${row.DESCRIPTION},"`;
			s_confirm(`${message} ?`, DelRow, {id: row.LBL_PRINTER_ID,});



		} else {
			s_alert("Что-то пошло не так. Выберите строку и повторите попытку");   // сообщение на экран
		}

}


	// Действия по удалению
	async function DelRow({id}) {
		console.log("id строки для удаления= ", id);
    EditRecord.value.id = id;
		saveDictionary();
		
	} 



// поиск выбранной строки для перехода на другой экран. Пока не запариваемся на то, есть ли она на текущей странице
function find_select_row(rows) {
	// if(rows && rows.isArray()) {
	if(rows?.length > 0) {
		return rows.find((row, ind, arr) => (row.screen_select === true && row.hidden_row === false)); 
	}
	return null;
}


/**
 * Обработка фильтров
 */
function MyFilterMethod(rows, terms, cols, getCellValue) {  
	if(rows?.length) {
		for(let i = 0; i < rows.length; i++) {
			if(terms.name && (rows[i].NAME.toUpperCase()).indexOf(terms.name.toUpperCase()) < 0) { rows[i].hidden_row = true; continue; };
			if(terms.description && (!rows[i].DESCRIPTION || rows[i].DESCRIPTION?.toUpperCase()?.indexOf(terms.description.toUpperCase()) < 0)) { rows[i].hidden_row = true;  continue; };
			if(terms.ip && (!rows[i].IP || rows[i].IP?.toUpperCase()?.indexOf(terms.ip.toUpperCase()) < 0)) { rows[i].hidden_row = true;  continue; };
			if(terms.pos_code && (!rows[i].POS_CODE || rows[i].POS_CODE?.toUpperCase()?.indexOf(terms.pos_code.toUpperCase()) < 0)) { rows[i].hidden_row = true;  continue; };
			// if(terms.table && rows[i].ATTR_TABLE !== terms.table) {rows[i].hidden_row = true;  continue;};
	
			rows[i].hidden_row = false;
		}
	}
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

/**
 * Проверка, загружено ли всё для отображеня на странице
 */
function load_data_check() {
	let ok = true;
	for (let key in load_data_ok ) 
		if ( !load_data_ok[key] ) ok = false;

	if (ok)  s_loading (false);  // Загрузка окончена
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
//.table-style-attr-map
//	thead tr th
//		// color: #FFFFFF 
//		// border-color: #FFFFFF 
//		text-align: center !important
//		vertical-align: middle !important
//		// background-color: rgb(70, 69, 64) !important
//		font-size: 10pt !important
//		font-weight: bold
//
//	tr td 
//			text-align: center
//			vertical-align: middle !important
//			// color: #000000
//
//	tr td.number-column
//			text-align: center
//			vertical-align: middle !important
//			width: 10pt
//			// color: #000000

			

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
 
.btn-vmz-small {
	background: linear-gradient(rgb(180, 180, 180), rgb(73, 73, 73)) !important;
	border: 2px solid white !important;
	margin-bottom: 5px !important;
	padding-top: 1px;
	padding-bottom: 1px;
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
