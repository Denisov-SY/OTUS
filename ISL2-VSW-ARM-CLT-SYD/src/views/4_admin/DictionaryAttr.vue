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
						<q-input  v-model="MyFilter.name" outlined filled dense color="black" bg-color="white" label="Код атрибута" type="text"  input-class="input1" style="width: 100%;" /> 
					</div>
					<div class="col-2 pmy1 px5">
						<q-input  v-model="MyFilter.name_rus" outlined filled dense color="black" bg-color="white" label="По-русски" type="text"  input-class="input1" style="width: 100%;" /> 
					</div>
					<div class="col-2 pmy1 px5">
						<q-input  v-model="MyFilter.description" outlined filled dense color="black" bg-color="white" label="Описание" type="text"  input-class="input1" style="width: 100%;" /> 
					</div>
					<div class="col-2 pmy1 px5">
						<q-input  v-model="MyFilter.name_l3" outlined filled dense color="black" bg-color="white" label="Атрибут в L3" type="text"  input-class="input1" style="width: 100%;" /> 
					</div>
					<div class="col-4 pmy1 px5">
						<q-select emit-value map-options outlined dense clearable options-dense color="black" bg-color="white" label-color="$grey-7" v-model="MyFilter.table"
												:options="SelFiltTables" option-label="stat" option-value="stat" label="Таблица" class="input1" style="width: 100%;"  />
					</div>

				</div>

			</div>
		</div>


		<!-- Поле редактирования записи -->
		<div v-if="EditMode"  class="row blockt-h100"> 
			<div class="col-12 pmy0">
				<div class="row header pmy0">
					<p> {{EditTitle }}</p>
				</div>

				<!-- <div class="row">
					<div class="col-12" >
					</div>
				</div> -->

				<div class="row pmy0">
					<div class="col-4 ">
						<div class="row pmy0">
							<div class="col-12 pmy1 px5">
								<q-select emit-value map-options outlined dense clearable options-dense color="black" bg-color="white" label-color="$grey-7" v-model="EditRecord.table"
														:options="SelFiltTables" option-label="stat" option-value="val" label="Таблица" class="input1" style="width: 95%;"  />
							</div>
						</div>
						<div class="row pmy0">
							<div class="col-12 pmy1 px5">
								<q-input  v-model="EditRecord.name" outlined filled dense color="black" bg-color="white" label="Код атрибута" type="text"  input-class="input1" style="width: 95%;" /> 
							</div>
						</div>
						<div class="row pmy0">
							<div class="col-12 pmy1 px5">
								<q-input  v-model="EditRecord.name_rus" outlined filled dense color="black" bg-color="white" label="Наименование по-русски" type="text"  input-class="input1" style="width: 95%;" /> 
							</div>
						</div>
						<div class="row pmy0">
							<div class="col-12 pmy1 px5">
								<q-input  v-model="EditRecord.description" outlined filled dense color="black" bg-color="white" label="Описание" type="text"  input-class="input1" style="width: 95%;" /> 
							</div>
						</div>
						<div class="row pmy0">
							<div class="col-12 pmy1 px5">
								<q-input  v-model="EditRecord.name_l3" outlined filled dense color="black" bg-color="white" label="Атрибут в L3" type="text"  input-class="input1" style="width: 95%;" /> 
							</div>
						</div>

						<div class="row pmy0">
							<div class="col-12 pmy1 px5">
								<q-select emit-value map-options outlined dense options-dense color="black" bg-color="white" label-color="$grey-7" v-model="EditRecord.is_number"
														:options="SelEditTypes" option-label="stat" option-value="val" label="Тип данных" class="input1" style="width: 95%;"  />
							</div>
						</div>
					</div>

					<div v-if="EditRecord.is_number" class="col-2 ">
						<div class="row pmy0">
							<div class="col-12 pmy1 px5">
								<q-select emit-value map-options outlined dense options-dense clearable color="black" bg-color="white" label-color="$grey-7" v-model="EditRecord.measure_unit"
														:options="DictMeasureUnits" option-label="stat" option-value="val" label="Единицы измерения" class="input1" style="width: 90%;"  />
							</div>
						</div>
						<div class="row pmy0">
							<div class="col-12 pmy1 px5">
								<q-input  v-model="EditRecord.precision" outlined clearable filled dense color="black" bg-color="white" label="Точность" title="Знаков после запятой" type="number"  input-class="input1" style="width: 90%;" /> 
							</div>
						</div>
						<div class="row pmy0">
							<div class="col-12 pmy1 px5">
								<q-input  v-model="EditRecord.koef_l2_l1" outlined filled dense color="black" bg-color="white" label="Kоэффициент L1 в L2" title="Коэффициент, на который умножаются данные, получаемые из Уровня 1" type="number"  input-class="input1" style="width: 90%;" /> 
							</div>
						</div>
						<div class="row pmy0">
							<div class="col-12 pmy1 px5">
								<q-input  v-model="EditRecord.koef_l2_l3" outlined filled dense color="black" bg-color="white" label="Kоэффициент L3 в L2" title="Коэффициент, на который умножаются данные, получаемые из Уровня 3" type="number"  input-class="input1" style="width: 90%;" /> 
							</div>
						</div>
						<div class="row pmy0">
							<div class="col-12 pmy1 px5">
								<q-input  v-model="EditRecord.value_min" outlined clearable filled dense color="black" bg-color="white" label="Минимум" title="Минимально допустимое значение или ничего" type="number"  input-class="input1" style="width: 90%;" /> 
							</div>
						</div>
						<div class="row pmy0">
							<div class="col-12 pmy1 px5">
								<q-input  v-model="EditRecord.value_max" outlined clearable filled dense color="black" bg-color="white" label="Максимум" title="Максимально допустимое значение или ничего" type="number"  input-class="input1" style="width: 90%;" /> 
							</div>
						</div>

					</div>

					<div v-if="!EditRecord.mapping"  class="col-4 "> 
						<div class="row pmy0 px5">
							<q-btn no-caps class="btn-vmz" label="Добавить mapping" title="Добавление таблицы соотвествия число-текст (для целочисленных значений)"  @click="EditRecord.mapping = 1" />
						</div>
					</div>

					<div v-if="EditRecord.mapping"  class="col-6 "> 
						<div class="row pmy0">
							<div class="col-12 pmy0 text-h5 px5">
								Данные маппинга:
							</div>
						</div>
						<div class="row pmy0">
							<div class="col-12 pmy0  px5">
								<q-table
									flat bordered dense hide-bottom separator="cell" row-key="index" _title="Данные маппинга" 
									class="table-style1"
									:rows="EditRecord.map"
									:columns="columnsMapping"
									:visible-columns="visibleColumnsMapping"
									:rows-per-page-options="[0]"
								>
									<template v-slot:body="props">
										<q-tr v-if="!props.row.hidden_row" :props="props">
											<q-td style="width: 25%;">
												<input v-model="props.row.NUMBER_VALUE" type="number" outlined color="black" bg-color="white" class="input1-tbl edit-attr-edit" style="width: 80%" @update:model-value="MapRowUpdate(props.row)"	/> 
											</q-td>
											<q-td >
												<input v-model="props.row.TEXT_VALUE" type="text" outlined color="black" bg-color="white" class="input1-tbl edit-attr-edit" style="width: 96%" @update:model-value="MapRowUpdate(props.row)"	/> 
											</q-td>
											<q-td >
												<q-btn padding="none" color="dark" icon="close" @click="BtnDelMap(props.row)"  	/>
											</q-td>
										</q-tr>
									</template>

									<template v-slot:loading>
										<q-inner-loading showing  />
									</template>
								</q-table>
							</div>
						</div>
						<div class="row pmy0  px5">
							<q-btn no-caps class="btn-vmz" label="Добавить элемент" title="Добавление новой комбинации число-текст"  @click="BtnNewMap" />
						</div>

					</div>
				</div>

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
							:rows="AttrList"
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
												AttrList.forEach((item) => { item.screen_select = false; });
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

const FORMAT_DATETIME_MINUTE = "YYYY-MM-DD HH:mm";
const FORMAT_DATETIME_MSEC = "YYYY-MM-DD HH:mm:ss.SSS";
const FORMAT_DATETIME_SEC = "YYYY-MM-DD HH:mm:ss";
const FORMAT_DATE = "DD.MM.YYYY"; 
const FORMAT_DATE_INPUT = "YYYY-MM-DD"; 
const ACTION_COPY = 'copy';
const ACTION_NEW = 'new';
const ACTION_EDIT = 'edit';
const ACTION_VIEW = 'view';

const STAT_NEW = "N"
const STAT_DEL = "D"
const STAT_UPD = "U"

const MyFilter = ref({name: null, 
											name_rus: null, 
											description: null, 
											name_l3: null, 
											table: null,
											});


const EditTitle = ref("Редактирование записи");		
const EditMode = ref(false);									
const EditRecord = ref({use: 1,
												id: -1, 
												name: null, 
												name_rus: null, 
												description: null, 
												name_l3: null, 
												table: null,
												measure_unit: null,
												is_number: null,
												precision: 0,
												koef_l2_l1: 1,
												koef_l2_l3: 1,
												value_max: null,
												value_min: null,
												mapping: null,
												map: [],
											});

const btnLoadDataClass = ref("btn-vmz");

const SelFiltTables = ref([]);
const SelEditTables = ref([]);
const SelEditTypes = ref([ {stat: "Число", val: 1,}, {stat: "Текст", val: 0,},]);  




const DictMeasureUnits = ref([]);



const title_string = ref("Справочник атрибутов");

const AttrList = ref([]);

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
		name: "PR_ATTR_ID",
		required: true,
		label: "ID",
		align: "left",
		field: (row) => row.PR_ATTR_ID,
		format: (val) => `${val}`,
		sortable: true,
	},
	{
		name: "ATTR_NAME",
		required: true,
		label: "Код атрибута",
		align: "center",
		field: "ATTR_NAME",
		format: (val) => `${val}`,
		sortable: true,
	},
	{
		name: "ATTR_NAME_RUS",
		required: true,
		label: "Наименование по-русски",
		align: "center",
		field: "ATTR_NAME_RUS",
		format: (val) => `${val ?? ""}`,
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
		name: "ATTR_NAME_L3",
		required: true,
		label: "Атрибут в L3",
		align: "center",
		field: "ATTR_NAME_L3",
		format: (val) => `${val ?? ""}`,
		sortable: true,
	},
	{
		name: "IS_NUMBER",
		required: true,
		label: "Формат",
		align: "center",
		field: "IS_NUMBER",
		format: (val) => `${val ? "число" : "текст"}`,
		sortable: true,
	},
	{
		name: "VIEW_PRECISION",
		required: true,
		label: "Точность",
		align: "center",
		field: "VIEW_PRECISION",
		format: (val) => `${val ?? ""}`,
		sortable: true,
	},
	{
		name: "KOEF_L2_L1",
		required: true,
		label: "Kоэффициент L1 в L2",
		align: "center",
		field: "KOEF_L2_L1",
		format: (val) => `${val ?? ""}`,
		sortable: true,
	},
	{
		name: "KOEF_L2_L3",
		required: true,
		label: "Kоэффициент L3 в L2",
		align: "center",
		field: "KOEF_L2_L3",
		format: (val) => `${val ?? ""}`,
		sortable: true,
	},
	{
		name: "VALUE_MIN",
		required: true,
		label: "Минимум",
		align: "center",
		field: "VALUE_MIN",
		format: (val) => `${val ?? ""}`,
		sortable: true,
	},
	{
		name: "VALUE_MAX",
		required: true,
		label: "Максимум",
		align: "center",
		field: "VALUE_MAX",
		format: (val) => `${val ?? ""}`,
		sortable: true,
	},
	{
		name: "ATTR_TABLE",
		required: true,
		label: "Таблица",
		align: "center",
		field: "ATTR_TABLE",
		format: (val) => `${val ?? ""}`,
		sortable: true,
	},
	{
		name: "MEASURE_UNITS",
		required: true,
		label: "Ед. изм.",
		align: "center",
		field: "MEASURE_UNITS",
		format: (val) => `${val ?? ""}`,
		sortable: true,
	},
	{
		name: "mapping_str",
		required: true,
		label: "Маппинг",
		align: "center",
		field: "mapping_str",
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
	{ name: "PR_ATTR_TABLE_ID", label: "PR_ATTR_TABLE_ID", field: "PR_ATTR_TABLE_ID" },
	{ name: "PR_MEASURE_UNITS_ID", label: "PR_MEASURE_UNITS_ID", field: "PR_MEASURE_UNITS_ID" },
	{ name: "USE", label: "USE", field: "USE" },
	{ name: "TABLE_DESCRIPTION", label: "TABLE_DESCRIPTION", field: "TABLE_DESCRIPTION" },
]);


const visibleColumns = ref([ "PR_ATTR_ID", "ATTR_NAME", "ATTR_NAME_RUS", "ATTR_NAME_VIEW", "DESCRIPTION", "ATTR_NAME_L3", "IS_NUMBER", "VIEW_PRECISION", "KOEF_L2_L1", "KOEF_L2_L3", 
														"VALUE_MIN", "VALUE_MAX", "ATTR_TABLE", "MEASURE_UNITS","mapping_str", "CREATE_DATE", "MODIFY_DATE", "MODIFY_USER", ]);


const columnsMapping = ref([
	{ name: "PR_ATTR_MAP_ID", label: "PR_ATTR_MAP_ID", field: "PR_ATTR_MAP_ID" },
	{
		name: "NUMBER_VALUE",
		required: true,
		label: "Число",
		align: "left",
		field: (row) => row.NUMBER_VALUE,
		format: (val) => `${val}`,
		sortable: true,
		// class: "number-column",
		// style: 'width: 40px !importent;',
	},
	{
		name: "TEXT_VALUE",
		required: true,
		label: "Текст",
		align: "left",
		field: (row) => row.TEXT_VALUE,
		format: (val) => `${val}`,
		sortable: true,
		// style: 'width: 60%',
	},
	{
		name: "DEL",
		required: true,
		label: "",
		align: "left",
		field: (row) => row.status,
		format: (val) => `${val}`,
		sortable: true,
		// style: 'width: 15%',
	},

]);

const visibleColumnsMapping = ref([ "NUMBER_VALUE", "TEXT_VALUE", "DEL",  ]);




const load_data_ok = {attr: false, table: false, measure_unit: false, }


	onMounted(async () => {
		const PROC_NAME = "onMounted> ";
		console.log(`${PROC_NAME}Начало`);

		loadDictionary();
	});



	async function loadDictionary() {
		s_loading(true, "Подождите, загружаются данные");
		loadAttr();
		loadDictTables();
		loadDictMeasureUnits();
	}



	/**
	 * Загрузка справочника атрибутов (основная таблица)
	 */
	async function loadAttr() {    // Загрузка даннных
		load_data_ok.attr = false;
		if(!loading.value)  s_loading(true, "Подождите, Обновление справочника");  // Для обновления после того, как были внесены изменения
		
		const ret_attr = await loadData({ url: dict.attr.list, params: {} });

		// if(ret_attr?.error) {
		// 	s_loading(false);
		// 	s_alert("При загрузке данных атрибутов произошла ошибка. Повторите попытку позже", ret_attr.error.message ?? "");
		// 	return;
		// }

		console.log("ret_attr = ", ret_attr);

		if(ret_attr?.error) {
			s_loading(false);
			s_alert("При загрузке данных атрибутов произошла ошибка. Повторите попытку позже", ret_attr.error.message ?? "");
		} else {
			if(ret_attr?.length === 0)  {
				s_alert("Для данного справочника не найдено данных");
			}
			ret_attr.forEach((item, idx) => {
				item.screen_select = false;
				item.hidden_row = false;
				item.index = idx;
				item.mapping_str = "";
				if(item.map?.length > 0)  {
					item.mapping_str = item.map.reduce( (result, map_el) => {return result += `${map_el.NUMBER_VALUE}-${map_el.TEXT_VALUE} `}, "");
				}

			});
			
			if(ret_attr?.length > 0)  {

				AttrList.value = ret_attr;
				
			}

			load_data_ok.attr = true;
			load_data_check();
		}

	}


		
/**
 * Загрузка справочника единиц измерения
 */
async function loadDictMeasureUnits() {    // Загрузка даннных
	load_data_ok.measure_unit = false;
	const ret_dict = await loadData({ url: dict.measureUnit.list, params: {} });

	console.log("ret_dict measureUnit = ", ret_dict);
 
	let units = [];

	if(ret_dict.error) {
		s_loading(false);
		s_alert("Загрузка данных справочника единиц измерения произошла с ошибкой. Повторите попытку позже", ret_dict.error.message ?? "");
	} else {
		if(ret_dict?.length === 0)  {
			s_alert("По справочнику единиц измерения не найдено данных");
		}
		if(ret_dict?.length > 0) 
			for(let i = 0; i < ret_dict.length; i++) {
				units.push({val: ret_dict[i].PR_MEASURE_UNITS_ID, stat: ret_dict[i].MEASURE_UNITS,});
			}
			// console.log("1 units= ", units);
		  units.sort((a,b) => (a.stat > b.stat ? 1 : a.stat === b.stat ? 0 : -1));
			console.log("2 units= ", units);
		load_data_ok.measure_unit = true;
		load_data_check();

	}

	DictMeasureUnits.value = units;   // 
};


/**
 * Загрузка справочника Таблиц, к которым относятся атрибуты
 */
 async function loadDictTables() {    // Загрузка даннных
	load_data_ok.table = false;
	const ret_dict = await loadData({ url: dict.attrTable.list, params: {} });

	console.log("ret_dict Tables = ", ret_dict);
 
	const units = [];

	if(ret_dict.error) {
		s_loading(false);
		s_alert("Загрузка данных справочника таблиц, к которым относятся атрибуты, произошла с ошибкой. Повторите попытку позже", ret_dict.error.message ?? "");
	} else {
		if(ret_dict?.length === 0)  {
			s_alert("По справочнику таблиц, к которым относятся атрибуты, не найдено данных");
		}
		if(ret_dict?.length > 0) 

			for(let i = 0; i < ret_dict.length; i++) {
				units.push({val: ret_dict[i].PR_ATTR_TABLE_ID, stat: ret_dict[i].ATTR_TABLE,});
			}
		
		load_data_ok.table = true;
		load_data_check();

	}

	SelFiltTables.value = units;   // Селект в фильтрах
	SelEditTables.value = units;   // Селект в окне редактирования
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
					attr: {
						USE: 										EditRecord.value.use ? 1 : 0,
						ATTR_NAME: 							EditRecord.value.name?.trim(),
						ATTR_NAME_RUS: 					EditRecord.value.name_rus?.trim(),
						DESCRIPTION: 						EditRecord.value.description?.trim(),
						ATTR_NAME_L3: 					EditRecord.value.name_l3?.trim(),
						PR_ATTR_TABLE_ID: 			EditRecord.value.table,
						IS_NUMBER: 							EditRecord.value.is_number,
						PR_MEASURE_UNITS_ID: 		EditRecord.value.is_number ? EditRecord.value.measure_unit : null,
						VIEW_PRECISION: 				EditRecord.value.is_number ? parseInt(EditRecord.value.precision) : 0,
						KOEF_L2_L1: 						EditRecord.value.is_number ? parseFloat(EditRecord.value.koef_l2_l1) : 1,
						KOEF_L2_L3: 						EditRecord.value.is_number ? parseFloat(EditRecord.value.koef_l2_l3) : 1,
						VALUE_MAX: 							(EditRecord.value.value_max) && parseFloat(EditRecord.value.value_max),
						VALUE_MIN: 							(EditRecord.value.value_min) && parseFloat(EditRecord.value.value_min),
					},
					...(EditRecord.value?.id > 0 && { id: EditRecord.value.id }),
				};
				if(EditRecord.value.map?.length > 0) {    // Если изначально был маппинг, или с ним были манипуляции
					let upd_cnt = 0;

					let map_arr = [];
					EditRecord.value.map.forEach((r, idx) => {
						if(r.status !== "") upd_cnt++;
						if(!r.hidden_row ) map_arr.push({ NUMBER_VALUE: r.NUMBER_VALUE, TEXT_VALUE: r.TEXT_VALUE,});
					});
					if(upd_cnt > 0)  {
						save_params.map = map_arr;
					}
				}


			}
		
			console.log("save_params = ", save_params);

			const ret_save = await sendData({ url: dict.attr.save, params: save_params });

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
				loadAttr();    // Перечитываем справочник
			}

	};



	// ************* Кнопки.

	/**
	 * Действия по кнопке "новоая запись"
	 */
	function BtnNew() {
		EditTitle.value = "Создание новой записи"
		EditRecord.value.use = true;
		EditRecord.value.id  = -1;
		EditRecord.value.name  = "";
		EditRecord.value.name_rus  = "";
		EditRecord.value.description  = "";
		EditRecord.value.name_l3  = "";
		EditRecord.value.table  = null;
		EditRecord.value.measure_unit  = null;
		EditRecord.value.is_number  = 1;
		EditRecord.value.precision  = 0;
		EditRecord.value.koef_l2_l1  = 1;
		EditRecord.value.koef_l2_l3  = 1;
		EditRecord.value.value_max  = null;
		EditRecord.value.value_min  = null;
		EditRecord.value.mapping = false,
		EditRecord.value.map = [];

		EditMode.value = true;
	}

	/**
	 * Действия по кнопке "Редактировать"
	 */
	function BtnEdit() {
		if( find_select_row(AttrList.value) )  {
			let row = find_select_row(AttrList.value);
			if(row) {
				EditTitle.value = "Редактирование записи";
				EditRecord.value.id  						= row.PR_ATTR_ID;
				EditRecord.value.use 						= row.USE === 1 ? true : false;
				EditRecord.value.name  					= row.ATTR_NAME;
				EditRecord.value.name_rus  			= row.ATTR_NAME_RUS;
				EditRecord.value.description 	 	= row.DESCRIPTION;
				EditRecord.value.name_l3  			= row.ATTR_NAME_L3;
				EditRecord.value.table  				= row.PR_ATTR_TABLE_ID;
				EditRecord.value.measure_unit  	= row.PR_MEASURE_UNITS_ID;
				EditRecord.value.is_number  		= row.IS_NUMBER ? 1 : 0 ;
				EditRecord.value.precision  		= row.VIEW_PRECISION ?? 0;
				EditRecord.value.koef_l2_l1  		= row.KOEF_L2_L1;
				EditRecord.value.koef_l2_l3  		= row.KOEF_L2_L3;
				EditRecord.value.value_max  		= row.VALUE_MAX;
				EditRecord.value.value_min  		= row.VALUE_MIN;
				EditRecord.value.mapping        = row.map?.length > 0 ? true : false,
				EditRecord.value.map 						= [];
				if(row.map?.length > 0)  {
					for(let i = 0; i < row.map.length; i++)   {
						EditRecord.value.map.push({ 
                PR_ATTR_MAP_ID:  row.map[i].PR_ATTR_MAP_ID,
                NUMBER_VALUE:    row.map[i].NUMBER_VALUE,
                TEXT_VALUE:      row.map[i].TEXT_VALUE,
								status:          "",
								hidden_row:      false,
						});
					}
					EditRecord.value.map.sort((a,b) => a.NUMBER_VALUE - b.NUMBER_VALUE);
				}

					
				EditMode.value = true;
			} else {
				s_alert("Что-то пошло не так. Выберите строку и повторите попытку");   // сообщение на экран
			}


		} else {
			s_alert("Не выбрана строка. Выберите строку и повторите попытку");   // сообщение на экран
		}
	}

	/**
	 * действия по кнопке "Добавить комбинацию" для маппинга
	 */
	function BtnNewMap() {
		if(EditRecord.value.map) {
			EditRecord.value.map.push({ 
                PR_ATTR_MAP_ID:  null,
                NUMBER_VALUE:    (EditRecord.value.map?.filter(m => !m.hidden_row)?.length > 0) ? EditRecord.value.map.filter(m => !m.hidden_row)[EditRecord.value.map.filter(m => !m.hidden_row).length-1]?.NUMBER_VALUE + 1 : 1,
                TEXT_VALUE:      "",
								status:          STAT_NEW,
								hidden_row:      false,
						});
		}
	}

	/**
	 * Удалить строку из маппинга
	 */
	function BtnDelMap(row)  {
		console.log("row = ", row);
		if(row) {
			if(row.PR_ATTR_MAP_ID !== null)   row.status = STAT_DEL;
			row.hidden_row = true;
		}
		let map_cnt = 0;
		EditRecord.value.map.forEach((row => { if( !row.hidden_row ) map_cnt++; }));
		EditRecord.value.mapping = (map_cnt > 0);
	}

	/**
	 * При изменении строки в маппинге выставить статус обновления (для неновых строк)
	 */
	function MapRowUpdate(row) {
		if( row.status !== STAT_NEW )  row.status = STAT_UPD;
	}


	/**
	 * Действия по кнопке "Сохранить"
	 */
	async function BtnSave() {
		if( edit_check() ) {
			saveDictionary( );
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
			let find_row = AttrList.value.find((row, ind, arr) => (row.PR_ATTR_ID === EditRecord.value.id ));
			if(find_row) {
				if((EditRecord.value.use ? 1 : 0 ) !== find_row.USE )  check = true;
				if(EditRecord.value.name?.trim() !== find_row.ATTR_NAME )  check = true;
				if(EditRecord.value.name_rus?.trim() !== find_row.ATTR_NAME_RUS )  check = true;
				if(EditRecord.value.description?.trim() !== find_row.DESCRIPTION )  check = true;
				if(EditRecord.value.name_l3?.trim() !== find_row.ATTR_NAME_L3 )  check = true;
				if(EditRecord.value.table !== find_row.PR_ATTR_TABLE_ID )  check = true;
				if(EditRecord.value.is_number !== find_row.IS_NUMBER )  check = true;
				if(EditRecord.value.measure_unit !== find_row.PR_MEASURE_UNITS_ID )  check = true;
				if(+EditRecord.value.precision !== find_row.VIEW_PRECISION )  check = true;
				if(+EditRecord.value.koef_l2_l1 !== find_row.KOEF_L2_L1 )  check = true;
				if(+EditRecord.value.koef_l2_l3 !== find_row.KOEF_L2_L3 )  check = true;
				if(+EditRecord.value.value_max !== find_row.VALUE_MAX )  check = true;
				if(+EditRecord.value.value_min !== find_row.VALUE_MIN )  check = true;
				//  Возможно лишняя., но не повредит
				for( let i = 0; i < find_row.map.length; i++ ) {
					if(!EditRecord.value.map.find((r, ind, arr) => {r.PR_ATTR_MAP_ID === find_row.map[i].PR_ATTR_MAP_ID && r.status === ""}) )  check = true;
			
				}
				// енившихся строк в маппинге
				for( let i = 0; i < EditRecord.value.map.length; i++ ) {
					if(!EditRecord.value.map[i].PR_ATTR_MAP_ID )  {
						check = true;
					} else {
						let row = find_row.map.find((r, ind, arr) => {r.PR_ATTR_MAP_ID === EditRecord.value.map[i].PR_ATTR_MAP_ID });
						if(row) {
							if(row.NUMBER_VALUE !== +EditRecord.value.map[i].NUMBER_VALUE || row.TEXT_VALUE !== EditRecord.value.map[i].TEXT_VALUE || EditRecord.value.map[i].status === STAT_DEL) check = true;

						} else check = true;
					}
					// if(!EditRecord.value.map.find((r, ind, arr) => {r.PR_ATTR_MAP_ID === row[i].PR_ATTR_MAP_ID && r.status === ""}) )  check = true;
				}
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
			s_alert(`Поле "Код атрибута" не заполнено`);
			return true;
		} 

		if(!EditRecord.value.table || EditRecord.value.table <= 0 ) {
			s_alert(`Не выбрана таблица, к которой относится атрибут`);
			return true;
		} 
		if(EditRecord.value.is_number ) {

			if( EditRecord.value.precision && EditRecord.value.precision !== null && EditRecord.value.precision.toString().length > 0 && (isNaN(parseInt(EditRecord.value.precision)) || parseInt(EditRecord.value.precision) < 0 || parseInt(EditRecord.value.precision) > 6)) {
				console.log("parseInt(EditRecord.value.precision) = ", parseInt(EditRecord.value.precision));
				s_alert(`Некорректно задано значение количества знаков после запятой (допустимо от 0 до 6  или пустая строка)`);
				return true;
			} 
			if(!EditRecord.value.koef_l2_l1 || isNaN(parseFloat(EditRecord.value.koef_l2_l1)) || parseFloat(EditRecord.value.koef_l2_l1) === 0 ) {
				s_alert(`Некорректно задано значение коэффициента L1 в L2. Или задано значение ноль`);
				return true;
			} 
			if(!EditRecord.value.koef_l2_l3 || isNaN(parseFloat(EditRecord.value.koef_l2_l3)) || parseFloat(EditRecord.value.koef_l2_l3) === 0 ) {
				s_alert(`Некорректно задано значение коэффициента L3 в L2. Или задано значение ноль`);
				return true;
			} 
			// Проверка маппинга
			if(EditRecord.value.map?.length > 0 ) {
				let ok = true;
				let duble = false;
				let map_cnt = 0;
				EditRecord.value.map.forEach((r, idx) => { 
					if( !(r.hidden_row) && (isNaN(parseInt(r.NUMBER_VALUE)) || r.TEXT_VALUE.trim === "" ))  {
						if( isNaN(parseInt(r.NUMBER_VALUE)) || r.TEXT_VALUE.trim === "" )  ok = false; 
						if( EditRecord.value.map.find( ( row, index) => ( idx !== index &&  !(row.hidden_row) && parseInt(r.NUMBER_VALUE) === parseInt(row.NUMBER_VALUE)) ) )  duble = true;
						map_cnt++;  // 
					}
				});
				if( map_cnt > 0 && !EditRecord.value.is_number )  {
					s_alert(`Для нечислового поля маппинг недопустим`);
					return true;
				}

				if( !ok ) {
					s_alert(`Одно или несколько значений маппинга задано некорректно`);
					return true;
				}
				if( duble ) {
					s_alert(`Допущено дублирование значений маппинга (только целочисленные значения)`);
					return true;
				}
			}
		} 
		return check;
	}




//  Удаление выбранной строки
function BtnDel() {


		if( find_select_row(AttrList.value) )  {
 
			let row = find_select_row(AttrList.value);
			console.log(`строка для удаления= `, row);
			let message = `Вы уверены, что хотите удалить строку: ID = "${row.PR_ATTR_ID},"  Код атрибута = "${row.ATTR_NAME},"  По-русски = "${row.ATTR_NAME_RUS},"`;
			s_confirm(`${message} ?`, DelRow, {id: row.PR_ATTR_ID,});



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
			if(terms.name && (rows[i].ATTR_NAME.toUpperCase()).indexOf(terms.name.toUpperCase()) < 0) { rows[i].hidden_row = true; continue; };
			if(terms.name_rus && (!rows[i].ATTR_NAME_RUS || rows[i].ATTR_NAME_RUS?.toUpperCase()?.indexOf(terms.name_rus.toUpperCase()) < 0)) { rows[i].hidden_row = true;  continue; };
			if(terms.description && (!rows[i].DESCRIPTION || rows[i].DESCRIPTION?.toUpperCase()?.indexOf(terms.description.toUpperCase()) < 0)) { rows[i].hidden_row = true;  continue; };
			if(terms.name_l3 && (!rows[i].ATTR_NAME_L3 || rows[i].ATTR_NAME_L3?.toUpperCase()?.indexOf(terms.name_l3.toUpperCase()) < 0)) { rows[i].hidden_row = true;  continue; };
			if(terms.table && rows[i].ATTR_TABLE !== terms.table) {rows[i].hidden_row = true;  continue;};
	
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
