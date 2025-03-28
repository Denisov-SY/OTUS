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
					<q-btn no-caps class="btn-vmz" label="Копировать" @click="BtnCopy" title="Копирование выбранной записи." />
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
						<q-input  v-model="MyFilter.name" outlined filled dense color="black" bg-color="white" label="Имя шаблона" type="text"  input-class="input1" style="width: 100%;" /> 
					</div>
					<div class="col-2 pmy1 px5">
						<q-input  v-model="MyFilter.description" outlined filled dense color="black" bg-color="white" label="Описание" type="text"  input-class="input1" style="width: 100%;" /> 
					</div>
					<div class="col-2 pmy1 px5">
						<q-input  v-model="MyFilter.marker_id" outlined filled dense color="black" bg-color="white" label="ID в Маркер" type="number" min="0" max="9999999" input-class="input1" style="width: 100%;" /> 
					</div>
					<div class="col-2 pmy1 px5">
						<q-input  v-model="MyFilter.status_name" outlined filled dense color="black" bg-color="white" label="Статус" type="text"  input-class="input1" style="width: 100%;" /> 
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
						<q-input  v-model="EditRecord.name" outlined filled dense color="black" bg-color="white" label="Имя шаблона" type="text"  input-class="input1" style="width: 100%;" /> 
					</div>
					<div class="col-8 pmy1 px5">
						<q-input  v-model="EditRecord.description" outlined filled dense color="black" bg-color="white" label="Описание" type="text"  input-class="input1" style="width: 100%;" /> 
					</div>
				</div>
				<div class="row pmy0"> 
					<div class="col-2 pmy1 px5">
						<q-input  v-model="EditRecord.marker_id" outlined filled dense color="black" bg-color="white" label="ID в Маркер" type="number" min="0" max="9999999" input-class="input1" style="width: 100%;" /> 
					</div>
					<div class="col-6 pmy1 px5">
						<q-select emit-value map-options outlined dense options-dense clearable color="black" bg-color="white" label-color="$grey-7" v-model="EditRecord.package_status"
							:options="DictPackageStatus" option-label="stat" option-value="val" label="Статус" class="select1" style="width: 100%;"  />
					</div>
					<div class="col-4 pmy1 px5">
						<q-select emit-value map-options outlined dense options-dense color="black" bg-color="white" label-color="$grey-7" v-model="EditRecord.multi_page"
							:options="SelMultyPage" option-label="stat" option-value="val" label="Многостраничность" class="select1" style="width: 100%;"  />
					</div>
				</div>
				<div class="row pmy0"> 
					<div class="col-12 pmy1 px5">
						<!-- <div style="width: auto; overflow-x: auto; white-space: nowrap;"> -->
							<q-input  v-model="EditRecord.fill_label_data" outlined filled dense autogrow color="black" bg-color="white" label="Запрос" title="Знаков после запятой" type="textarea"  input-class="input1" style="width: 100%;" /> 
							<!-- <q-input  v-model="EditRecord.fill_label_data" outlined filled dense autogrow color="black" bg-color="white" label="Запрос" title="Знаков после запятой" type="textarea"  input-class="input1" style="width: auto; overflow-x: auto; white-space: nowrap;"/>  -->
						<!-- </div> -->
						
					</div>
				</div>



				<!-- <div class="row pmy0">
					<div class="col-4 ">
						<div class="row pmy0">
							<div class="col-12 pmy1 px5">
								<q-input  v-model="EditRecord.name" outlined filled dense color="black" bg-color="white" label="Код шаблона" type="text"  input-class="input1" style="width: 100%;" /> 
							</div>
						</div>
						<div class="row pmy0">
							<div class="col-12 pmy1 px5">
								<q-input  v-model="EditRecord.description" outlined filled dense color="black" bg-color="white" label="Описание" type="text"  input-class="input1" style="width: 100%;" /> 
							</div>
						</div>
						<div class="row pmy0">
							<div class="col-12 pmy1 px5">
								<q-input  v-model="EditRecord.marker_id" outlined filled dense color="black" bg-color="white" label="ID в Маркер" type="number" min="0" max="9999999" input-class="input1" style="width: 100%;" /> 
							</div>
						</div>
						<div class="row pmy0">
							<div class="col-12 pmy1 px5">
								<q-select emit-value map-options outlined dense options-dense clearable color="black" bg-color="white" label-color="$grey-7" v-model="EditRecord.package_status"
														:options="DictPackageStatus" option-label="stat" option-value="val" label="Статус" class="select1" style="width: 100%;"  />
							</div>
						</div>
						<div class="row pmy0">
							<div class="col-12 pmy1 px5">
								<q-select emit-value map-options outlined dense options-dense color="black" bg-color="white" label-color="$grey-7" v-model="EditRecord.multi_page"
														:options="SelMultyPage" option-label="stat" option-value="val" label="Многостраничность" class="select1" style="width: 100%;"  />
							</div>
						</div>
					</div>
					<div class="col-8 ">
						<div class="row pmy0">
							<div class="col-12 pmy1 px5">
								<q-input  v-model="EditRecord.fill_label_data" outlined filled dense autogrow color="black" bg-color="white" label="Запрос" title="Знаков после запятой" type="textarea"  input-class="input1" style="width: 100%;" /> 
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
							:rows="LabelTemplateList"
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
												LabelTemplateList.forEach((item) => { item.screen_select = false; });
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

const MyFilter = ref({name: null, 
											description: null, 
											marker_id: null, 
											status_name: null, 
											table: null,
											});


const EditTitle = ref("Редактирование записи");		
const EditMode = ref(false);									
const EditRecord = ref({//use: 1,
												id: -1, 
												name: null, 
												description: null, 
												marker_id: null, 
												package_status: null,
												multi_page: 0,
												fill_label_data: null,
												});


const btnLoadDataClass = ref("btn-vmz");


const SelMultyPage = ref([ {stat: "Многостраничная", val: 1,}, {stat: "1 лист", val: 0,},]);  




const DictPackageStatus = ref([]);



const title_string = ref("Справочник шаблонов бирок");

const LabelTemplateList = ref([]);

const loading = ref(false);
const loading_label = ref("");


const columns = ref([
	{
		name: "LBL_TEMPLATE_ID",
		required: true,
		label: "ID",
		align: "left",
		field: (row) => row.LBL_TEMPLATE_ID,
		format: (val) => `${val}`,
		sortable: true,
	},
	{
		name: "NAME",
		required: true,
		label: "Имя Шаблона",
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
		name: "MARKER_ID",
		required: true,
		label: `ID в "Маркер"`,
		align: "center",
		field: "MARKER_ID",
		format: (val) => `${val ?? ""}`,
		sortable: true,
	},
	{
		name: "STATUS_NAME",
		required: true,
		label: "Статус",
		align: "center",
		field: "STATUS_NAME",
		format: (val) => `${val ?? ""}`,
		sortable: true,
	},
	{
		name: "MULTI_PAGE",
		required: true,
		label: "Многостраничная",
		align: "center",
		field: "MULTI_PAGE",
		format: (val) => `${val ? "Многостраничная" : ""}`,
		sortable: true,
	},
	{
		name: "L1_STATUS",
		required: true,
		label: "Статус L1",
		align: "center",
		field: "L1_STATUS",
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
	{ name: "PR_PACKAGE_STATUS_ID", label: "PR_PACKAGE_STATUS_ID", field: "PR_PACKAGE_STATUS_ID" },

]);


const visibleColumns = ref([ "LBL_TEMPLATE_ID", "NAME", "DESCRIPTION", "MARKER_ID", "STATUS_NAME", "MULTI_PAGE", "L1_STATUS", "CREATE_DATE", "MODIFY_DATE", "MODIFY_USER", ]);


const load_data_ok = {labelTemplate: false, package_status: false, }


	onMounted(async () => {
		const PROC_NAME = "onMounted> ";
		console.log(`${PROC_NAME}Начало`);

		loadDictionary();
	});



	async function loadDictionary() {
		s_loading(true, "Подождите, загружаются данные");
		loadLabelTemplate();
		// loadDictTables();
		loadDictPackageStatus();
	}



	/**
	 * Загрузка справочника шаблонов (основная таблица)
	 */
	async function loadLabelTemplate() {    // Загрузка даннных
		load_data_ok.labelTemplate = false;
		if(!loading.value)  s_loading(true, "Подождите, Обновление справочника");  // Для обновления после того, как были внесены изменения
		
		const ret_templ = await loadData({ url: dict.label.template.list, params: {"w-data-fill-proc": 1,} });

		console.log("ret_templ = ", ret_templ);

		if(ret_templ?.error) {
			s_loading(false);
			s_alert("При загрузке данных шаблонов произошла ошибка. Повторите попытку позже", ret_templ.error.message ?? "");
		} else {
			if(ret_templ?.length === 0)  {
				s_alert("Для данного справочника не найдено данных");
			}
			ret_templ.forEach((item, idx) => {
				item.screen_select = false;
				item.hidden_row = false;
				item.index = idx;
				// item.mapping_str = "";
				// if(item.map?.length > 0)  {
				// 	item.mapping_str = item.map.reduce( (result, map_el) => {return result += `${map_el.NUMBER_VALUE}-${map_el.TEXT_VALUE} `}, "");
				// }
			});
			
			if(ret_templ?.length > 0)  {
				ret_templ.sort((a,b) => {
					if(a.NAME > b.NAME) return 1;
					if(a.NAME < b.NAME) return -1;
					return 0;
				});
				LabelTemplateList.value = ret_templ;

			}

			load_data_ok.labelTemplate = true;
			load_data_check();
		}

	}


		
	/**
	 * Загрузка справочника статусов пакетов
	 */
	async function loadDictPackageStatus() {    // Загрузка даннных
		load_data_ok.package_status = false;
		const ret_dict = await loadData({ url: dict.package.status.list, params: {} });

		console.log("ret_dict PackageStatus = ", ret_dict);
	
		let units = [];

		if(ret_dict.error) {
			s_loading(false);
			s_alert("Загрузка данных справочника статусов пакетов произошла с ошибкой. Повторите попытку позже", ret_dict.error.message ?? "");
		} else {
			if(ret_dict?.length === 0)  {
				s_alert("По справочнику статусов пакетов  не найдено данных");
			}
			if(ret_dict?.length > 0) 
				for(let i = 0; i < ret_dict.length; i++) {
					units.push({val: ret_dict[i].PR_STATUS_ID, stat: `${ret_dict[i].STATUS_NAME} (L1 - ${ret_dict[i].L1_STATUS})`,});
				}
				// console.log("1 units= ", units);
				units.sort((a,b) => (a.stat > b.stat ? 1 : a.stat === b.stat ? 0 : -1));
				// console.log("2 units= ", units);
			load_data_ok.package_status = true;
			load_data_check();

		}

		DictPackageStatus.value = units;   // 
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
					template: {
						// USE: 										EditRecord.value.use ? 1 : 0,
						NAME: 									EditRecord.value.name?.trim(),
						DESCRIPTION: 						EditRecord.value.description?.trim(),
						MARKER_ID: 							parseInt(EditRecord.value.marker_id),
						PR_PACKAGE_STATUS_ID: 	EditRecord.value.package_status,
						MULTI_PAGE: 						EditRecord.value.multi_page,
						FILL_LABEL_DATA: 				EditRecord.value.fill_label_data?.trim(),
						USE:										1,
					},
					...(EditRecord.value?.id > 0 && { id: EditRecord.value.id }),
				};
			}
		
			console.log("save_params = ", save_params);

			const ret_save = await sendData({ url: dict.label.template.save, params: save_params });

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
				loadLabelTemplate();    // Перечитываем справочник
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
		EditRecord.value.marker_id  = 0;
		EditRecord.value.package_status  = null;
		EditRecord.value.multi_page  = 0;
		EditRecord.value.fill_label_data  = "";
		EditMode.value = true;
	}


	/**
	 * Действия по кнопке "Редактировать"
	 */
	function BtnEdit() {
		if( find_select_row(LabelTemplateList.value) )  {
			let row = find_select_row(LabelTemplateList.value);
			if(row) {
				EditTitle.value = "Редактирование записи";
				EditRecord.value.id  						= row.LBL_TEMPLATE_ID;
				// EditRecord.value.use 						= row.USE === 1 ? true : false;
				EditRecord.value.name  						= row.NAME;
				EditRecord.value.description 	 		= row.DESCRIPTION;
				EditRecord.value.marker_id  			= row.MARKER_ID;
				EditRecord.value.package_status 	= row.PR_PACKAGE_STATUS_ID;
				EditRecord.value.multi_page  			= row.MULTI_PAGE ? 1 : 0 ;
				EditRecord.value.fill_label_data	= row.FILL_LABEL_DATA;
				
				EditMode.value = true;
			} else {
				s_alert("Что-то пошло не так. Выберите строку и повторите попытку");   // сообщение на экран
			}


		} else {
			s_alert("Не выбрана строка. Выберите строку и повторите попытку");   // сообщение на экран
		}
	}

	/**
	 * Действия по кнопке "Редактировать"
	 */
	function BtnCopy() {
		if( find_select_row(LabelTemplateList.value) )  {
			let row = find_select_row(LabelTemplateList.value);
			if(row) {
				EditTitle.value = "Копирование записи";
				EditRecord.value.id  						= -1;
				// EditRecord.value.use 						= row.USE === 1 ? true : false;
				EditRecord.value.name  						= "";
				EditRecord.value.description 	 		= row.DESCRIPTION;
				EditRecord.value.marker_id  			= row.MARKER_ID;
				EditRecord.value.package_status 	= row.PR_PACKAGE_STATUS_ID;
				EditRecord.value.multi_page  			= row.MULTI_PAGE ? 1 : 0 ;
				EditRecord.value.fill_label_data	= row.FILL_LABEL_DATA;
				
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
			let find_row = LabelTemplateList.value.find((row, ind, arr) => (row.LBL_TEMPLATE_ID === EditRecord.value.id ));
			if(find_row) {
				// if((EditRecord.value.use ? 1 : 0 ) !== find_row.USE )  check = true;
				if(EditRecord.value.name?.trim() !== find_row.ATTR_NAME )  check = true;
				if(EditRecord.value.description?.trim() !== find_row.DESCRIPTION )  check = true;
				if(+EditRecord.value.marker_id !== find_row.MARKER_ID )  check = true;
				if(EditRecord.value.package_status !== find_row.PR_PACKAGE_STATUS_ID )  check = true;
				if(EditRecord.value.multi_page !== find_row.MULTI_PAGE )  check = true;
				if(EditRecord.value.fill_label_data?.trim() !== find_row.FILL_LABEL_DATA?.trim() )  check = true;
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
			s_alert(`Поле "Имя шаблона" не заполнено`);
			return true;
		} 
		const row_same = LabelTemplateList.value.find(t => (t.NAME === EditRecord.value.name.trim()));
		if(row_same && (EditRecord.value.id <= 0 || EditRecord.value.id !== row_same.LBL_TEMPLATE_ID)) {
			s_alert(`Запись с таким полем "Имя шаблона" уже существует`);
			return true;
		}
		if(!EditRecord.value.description || EditRecord.value.description.trim() === "" ) {
			s_alert(`Поле "Описание" не заполнено`);
			return true;
		} 
		if(!EditRecord.value.marker_id || isNaN(parseFloat(EditRecord.value.marker_id)) || parseFloat(EditRecord.value.marker_id) <= 0 || parseFloat(EditRecord.value.marker_id) > 9999999 ) {
			s_alert(`Некорректно задано значение ID бирки в системе "Маркер"`);
			return true;
		} 
		if(!EditRecord.value.package_status || EditRecord.value.package_status <= 0 ) {
			s_alert(`Не выбрана Статус бирки`);
			return true;
		} 
		if(!EditRecord.value.fill_label_data || EditRecord.value.fill_label_data.trim() === "" ) {
			s_alert(`Поле "Запрос" не заполнено`);
			return true;
		} 
		return check;
	}




//  Удаление выбранной строки
function BtnDel() {


		if( find_select_row(LabelTemplateList.value) )  {
 
			let row = find_select_row(LabelTemplateList.value);
			console.log(`строка для удаления= `, row);
			let message = `Вы уверены, что хотите удалить строку: ID = "${row.LBL_TEMPLATE_ID},"  Имя шаблона = "${row.NAME},"  Описание = "${row.DESCRIPTION},"`;
			s_confirm(`${message} ?`, DelRow, {id: row.LBL_TEMPLATE_ID,});



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
	// console.log('filter-method-terms= ', terms.filtStatus);
	if(rows?.length) {
		for(let i = 0; i < rows.length; i++) {
			if(terms.name && (rows[i].NAME.toUpperCase()).indexOf(terms.name.toUpperCase()) < 0) { rows[i].hidden_row = true; continue; };
			if(terms.description && (!rows[i].DESCRIPTION || rows[i].DESCRIPTION?.toUpperCase()?.indexOf(terms.description.toUpperCase()) < 0)) { rows[i].hidden_row = true;  continue; };
			if(terms.marker_id && (!rows[i].MARKER_ID || rows[i].MARKER_ID?.toString()?.indexOf(terms.marker_id) < 0)) { rows[i].hidden_row = true;  continue; };
			if(terms.status_name && (!rows[i].STATUS_NAME || rows[i].STATUS_NAME?.toUpperCase()?.indexOf(terms.status_name.toUpperCase()) < 0)) { rows[i].hidden_row = true;  continue; };
			// if(terms.table && rows[i].ATTR_TABLE !== terms.table) {rows[i].hidden_row = true;  continue;};
	
			rows[i].hidden_row = false;
		}
	}
	// console.log('terms.filtStatus= ', terms.filtStatus);
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
