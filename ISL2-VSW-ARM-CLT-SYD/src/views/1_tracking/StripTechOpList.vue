<template >

	<div>
		<div class="blockt">Технологические операции со штрипсами и их параметры New </div>
		<!-- Блок фильтров -->
		<div class="row blockt-h100">
			<div class="col-12 pmy0">
				<div class="header pmy0">
					<div class="row header pmy0">
						<div class="col-6 pmy0">
							<div class="row pmy0">
								<p> Фильтры</p>
							</div>
						</div>
						<div class="col-6 pmy0 ">
							<div class="row float-right pmy0 ">
								<span> 
									<q-checkbox v-show="rightsStrip.TOFiltMemory" style="margin-top: -5px; margin-right: 15px;" v-model="FiltrStoreEdit" label="Память фильтров" dark size="xs"  
										@update:model-value="FiltrStoreEditFirstTime = true"/>
								</span>
							</div>
						</div>
					</div>
				</div>
				<div class="row pmy0">
					<div class="col-12 pmy0">
						<div class="border-silver">
							<div class="row pmy0">




								<div class="col-12 col-lg-7 pmy0 pmx0">
									<div class="row pmy0"> 
										<div class="col-8 pmy1 px5">
											<q-select emit-value map-options outlined dense options-dense color="black" bg-color="white" label-color="grey-7" v-model="MyFilter.filtPosition"
												:options="PositionList" option-label="stat" option-value="val" label="Рабочий центр" class="input2" style="width: 100%;" :disable="false"
												@update:model-value="MyFilterChange" />
										</div>
										<div class="col-2 pmy1 px5">
											<q-checkbox v-model="MyFilter.filtTrendAverage" label="тренды ср.знач" dark size="xs" @update:model-value="MyFilterChange" />
										</div>
										<div class="col-2 pmy1 px5">
											<q-input v-model="MyFilter.filtLimit"  :readonly="!rightsStrip.TOInpLimit"  :bg-color="rightsStrip.TOInpLimit ? 'white' : 'grey-7'"
												outlined filled dense color="black"  label="Лимит:" type="number" min="1" max="1000"
												input-class="input1" style="width: 100%;" @update:model-value="MyFilterChange" />
										</div>
									</div>
									<div class="row pmy0"> 
										<div class="col-2 pmy1 px5">
											<q-input v-model="MyFilter.filtStripNumber" outlined filled dense color="black" bg-color="white" label="Штрипс:" type="text"
												title="Фильтр по номеру Штрипса" input-class="input1" style="width: 100%;" @update:model-value="MyFilterChange" />
										</div>
										<div class="col-2 pmy1 px5">
											<q-input v-model="MyFilter.filtJobCode" outlined filled dense color="black" bg-color="white" label="Задание:" type="text" 
												title="Фильтр по коду Задания"	input-class="input1" style="width: 100%;" @update:model-value="MyFilterChange" />
										</div>
										<div class="col-2 pmy1 px5">
											<q-input v-model="MyFilter.filtBatch" outlined filled dense color="black" bg-color="white" label="Партия:" type="text" 
												title="Фильтр по номеру назначенной партии" input-class="input1" style="width: 100%;" @update:model-value="MyFilterChange" />
										</div>
										<div class="col-2 pmy1 px5">
											<q-input v-model="MyFilter.filtHeat" outlined filled dense color="black" bg-color="white" label="Плавка:" type="text" 
												title="Фильтр по номеру плавки" input-class="input1" style="width: 100%;" @update:model-value="MyFilterChange" />
										</div>
										<div class="col-2 pmy1 px5">
											<q-input v-model="MyFilter.filtWidth" outlined filled dense color="black" bg-color="white" label="Ширина (мм):" type="number"
												title="Фильтр по ширине штрипса" input-class="input1" style="width: 100%;" @update:model-value="MyFilterChange" />
										</div>
										<div class="col-2 pmy1 px5">
											<q-input v-model="MyFilter.filtThick" outlined filled dense color="black" bg-color="white" label="Толщина (мм):" type="number"
												title="Фильтр по толщине штрипса" input-class="input1" style="width: 100%;" @update:model-value="MyFilterChange" />
										</div>

									</div>
								</div>
								<div class="col-10 col-lg-5 pmy0 pmx0">
									<div class="row pmy0"> 
										<div class="col-5 pmx0">
											<div class="row pmy0"> 
												<div class="col-12 pmy1 px5">
													<q-input v-model="MyFilter.filtDateBeg" outlined filled dense label="От" color="black" :bg-color="MyFilter.filtWithDateInterval ? 'white' : 'grey-7'" type="datetime-local" input-class="input1"
														style="width: 100%; " :readonly="!MyFilter.filtWithDateInterval"  @update:model-value="DateBegEndChange" />
												</div>
											</div>
											<div class="row pmy0"> 
												<div class="col-12 pmy1 px5">
													<q-input v-model="MyFilter.filtDateEnd" outlined filled dense label="До" color="black" :bg-color="MyFilter.filtWithDateInterval ? 'white' : 'grey-7'" type="datetime-local" input-class="input1"
														style="width: 100%; " :readonly="!MyFilter.filtWithDateInterval" @update:model-value="DateBegEndChange" />
												</div>
											</div>
										</div>
										<div class="col-4 pmx0">	
											<div class="row justify-center items-center pmy0">
												<div class="pmy0 w-100">
													<div class="row items-center px5">
														<div class="col-sm-1" style="text-align: right;">
															<q-btn :disable="!MyFilter.filtWithDateInterval" color="dark" icon="chevron_left" @click="TimrIntervalBw" class="q-px-sm q-mx-xs"
																style="width: 100%;" />
														</div>
														<div class="col-sm-10" style="text-align: center;">
															<q-radio v-model="MyFilter.filtDateInterval" :disable="!MyFilter.filtWithDateInterval" val="1" label="Час" @update:model-value="selTimrInterval"
																size="xs" dark color="white" class="q-mr-xs pmy0" />
															<q-radio v-model="MyFilter.filtDateInterval" :disable="!MyFilter.filtWithDateInterval" val="12" label="Смена"
																@update:model-value="selTimrInterval" size="xs" dark color="white" class="q-mr-xs pmy0" />
															<q-radio v-model="MyFilter.filtDateInterval" :disable="!MyFilter.filtWithDateInterval" val="24" label="Сутки"
																@update:model-value="selTimrInterval" size="xs" dark color="white" class="q-mr-sm pmy0" />
														</div>
														<div class="col-sm-1" style="text-align: left;">
															<q-btn :disable="!MyFilter.filtWithDateInterval" color="dark" icon="chevron_right" @click="TimrIntervalFw" class="q-px-sm q-mx-xs"
																style="width: 100%;" />
														</div>
													</div>
												</div>
											</div>
											<div class="row pmy0">
												<div class="col-12 my--1" style="padding-left: 25px">
													<q-checkbox v-model="MyFilter.filtWithDateInterval" label="Фильтр времени" dark size="xs" @update:model-value="MyFilterChange" />
												</div>

											</div>
										</div>
										<div class="col-3 q-gutter-sm" style="text-align: right; padding-top: 5px;">
											<q-btn no-caps :class="btnLoadDataClass" label="Загрузить" @click="btnRefresh" 
												title="Чтение данных из БД согласно заданного временного интервала и/или фильтров" />
											<q-btn v-if="rightsStrip.TOExcel" no-caps class="btn-vmz" label="Excel" @click="BtnPrintStripTechOp" :loading="exportingData"
												title="Выгрузка отображаемого перечня параметров ТО по Штрипсам в Excel-файл." />
										</div>
									</div>
								</div>

							</div>
						</div>
					</div>
				</div>

			</div>
		</div>

		<div class="row">
			<div class="col-12 backcolor-add" :style="`${(FiltrStoreEdit && rightsStrip.TOFiltMemory) ? '' : 'display: none;'}`">
			<!-- <div class="col-12 backcolor-add"> -->
				<div class="row pmy0">
					<div class="col-12">
						<params-memory v-if="FiltrStoreEditFirstTime"  v-model="MyPageSettings" :address="MyPageAddress" 
							:saveEnable="rightsStrip.TOFiltMemorySave" 	:deleteEnable="rightsStrip.TOFiltMemoryDel" 
							:saveparams="paramsToSave"   style= "width: 100%;"
							@update:modelValue="setParamsFromStory"  @hide="FiltrStoreEdit = false"
						/>
					</div>
				</div>
			</div>
		</div>

		<!-- Таблица -->
		<div class="row blockt-h100">
			<div class="col-12 pmy0">
				<div class="header pmy0">
					<p> Штрипсы</p>
				</div>
				<div class="row pmy0 pmx5">
					<div class="col-12 col-lg-6 pmy0">
						<q-select multiple emit-value map-options outlined dense options-dense color="black" bg-color="white" label-color="grey-7" v-model="SelParams" :options="selAttr"
							option-label="label" option-value="val" label="Выбор параметров" class="input1" style="width: 100%;" :disable="false">
							<template v-slot:option="{ itemProps, opt, selected, toggleOption }">
								<!-- <q-item v-if="opt.el_show" v-bind="opt.el_show && itemProps " > -->
								<q-item v-bind="itemProps ">
									<q-item-section side size="xs" :class="selItemClass(opt)">
										<!-- <q-checkbox v-model="opt.el_enable" :label="`${opt.txt}`" :key="opt.val" color="black" size="xs" @update:model-value="selectAttrChange" /> -->
										<q-checkbox v-model="opt.el_enable" :label="`${opt.txt}`" :key="opt.val" :dark="opt.type === TGL_ALL_VAL || opt.type === 'wc'" size="xs" @update:model-value="selectAttrChange" />
									</q-item-section>
								</q-item>
							</template>

						</q-select>
					</div>
				</div>
				<div class="row pmy1 pmx5">
					<div class="col-12 py-1">
						<q-table flat bordered _title="Технологические параметры" dense separator="cell" class="table-style1" :rows="TechOpForStrips" :columns="columns"
							:visible-columns="visibleColumns" row-key="PR_STRIP_ID" :rows-per-page-options="[5, 10, 15, 20, 25, 40, 50, 0]" :pagination="{rowsPerPage: 20}"
							ref="refStripTechOpList"
							:filter="MyFilter" :filter-method="MyFilterMethod">

							<template v-slot:header="props">


								<q-tr :props="props">
									<q-th rowspan="3" :class="'col_no_move ' + ($q.dark.isActive ? 'col_no_move_bg-dark' : 'col_no_move_bg-light')"> # </q-th>
									<q-th :props="props" :key="`STRIP_NUMBER`" rowspan="3" :class="'col_no_move ' + ($q.dark.isActive ? 'col_no_move_bg-dark' : 'col_no_move_bg-light')" key=""> № Штрипса </q-th>
									<q-th :props="props" :key="`JOB_CODE`" rowspan="3"> Задание </q-th>
									<q-th :props="props" :key="`BATCH_NUMBER`" rowspan="3"> Партия </q-th>
									<q-th :props="props" :key="`HEAT`" rowspan="3"> Плавка </q-th>
									<q-th :props="props" :key="`WIDTH`" rowspan="3"> Ширина (мм) </q-th>
									<q-th :props="props" :key="`THICK`" rowspan="3"> Толщина (мм) </q-th>
									<q-th :props="props" :key="`STRENGTH_CLASS`" rowspan="3"> Класс <br> прочности </q-th>
									<q-th :props="props" :key="`STEEL_GRADE`" rowspan="3"> Марка <br> стали </q-th>
									<template v-for="wc in techOpAttr">
										<q-th v-if="wc.el_show" :colspan="wcColspan(wc)" :key="wc.POSITION_CODE"> {{ `${wc.WC_AREA}.${wc.WC_NUMBER} ${wc.POSITION} (${wc.POSITION_CODE})`}}</q-th>
									</template>
								</q-tr>
								<q-tr :props="props">
									<template v-for="wc in techOpAttr">

										<template v-for="ev in wc.events">
											<q-th v-if="wc.el_show" :colspan="evColspan(ev)" :key="`${wc.POSITION_CODE}_${ev.EVENT_CODE}`" style="border-left-width: 1px; border-left-style: solid; border-left-color: rgba(0, 0, 0, 0.12);"> {{ `${wc.WC_AREA}.${wc.WC_NUMBER} ${ev.EVENT}` }}</q-th>
										</template>

									</template>
								</q-tr>
								<q-tr :props="props">
									<template v-for="wc in techOpAttr">
										<template v-for="ev in wc.events">
											<q-th v-if="wc.el_show" :props="props" :key="`${wc.POSITION_CODE}_${ev.EVENT_CODE}_TIME`" style="border-left: 1px solid rgba(0, 0, 0, 0.12);"> Время </q-th>
											<template v-for="at in ev.attr">
												<q-th v-if="wc.el_show && ev.el_show && at.el_show" :props="props" :key="`${wc.POSITION_CODE}_${ev.EVENT_CODE}_${at.ATTR_NAME}`"> 
													{{ `${at.ATTR_NAME_VIEW}${at.MEASURE_UNITS ? ' (' + at.MEASURE_UNITS+ ')' : ''}` }}
												</q-th>
											</template>
										</template>
									</template>
								</q-tr>
							</template>


							<template v-slot:body="props">
								<q-tr :props="props">
									<!-- <q-td :class="'col_no_move ' + ($q.dark.isActive ? 'col_no_move_bg-dark' : 'col_no_move_bg-light')"> {{ `${props.row.index}` }} </q-td> -->
									<q-td :class="'col_no_move ' + ($q.dark.isActive ? 'col_no_move_bg-dark' : 'col_no_move_bg-light')"> {{ `${props.rowIndex + 1}` }} </q-td>
									<q-td :props="props" :key="`STRIP_NUMBER`" :class="'col_no_move ' + ($q.dark.isActive ? 'col_no_move_bg-dark' : 'col_no_move_bg-light')"> {{ `${props.row.STRIP_NUMBER}` }} </q-td>
									<q-td :props="props" :key="`JOB_CODE`"> {{ `${props.row.JOB_CODE}` }} </q-td>
									<q-td :props="props" :key="`BATCH_NUMBER`"> {{ `${props.row.BATCH_NUMBER}` }} </q-td>
									<q-td :props="props" :key="`HEAT`"> {{ `${props.row.HEAT}` }} </q-td>
									<!-- <q-td > {{ `${props.row.WIDTH}` }} </q-td> -->
									<q-td :props="props" :key="`WIDTH`"> {{ `${!isNaN(props.row.WIDTH) ? numberFormatter(props.row.WIDTH, 1) : (props.row.WIDTH !== null ? props.row.WIDTH : "")}` }} </q-td>
									<!-- <q-td > {{ `${props.row.THICK}` }} </q-td> -->
									<q-td :props="props" :key="`THICK`"> {{ `${!isNaN(props.row.THICK) ? numberFormatter(props.row.THICK, 2) : (props.row.THICK !== null ? props.row.THICK : "")}` }} </q-td>
									<q-td :props="props" :key="`STRENGTH_CLASS`"> {{ `${props.row.STRENGTH_CLASS ?? ''}` }} </q-td>
									<q-td :props="props" :key="`STEEL_GRADE`"> {{ `${props.row.STEEL_GRADE ?? ''}` }} </q-td>
									<template v-for="wc in techOpAttr">
										<template v-for="ev in wc.events">
											<q-td v-if="wc.el_show && ev.EVENT_CODE !== 'TREND'" > {{`${eventTime(wc, ev, props.row)}`}} </q-td>
											<!-- <q-td v-else-if="wc.el_show && ev.EVENT_CODE === 'TREND'" :key="'else' + ev.id" class="table-cell-hyperlink" @click="s_confirm(`Вы действительно хотите перейти в экран трендов для просмотра графиков штрипса №${props.row.STRIP_NUMBER}?`, GoTrend, {strip_id: props.row.PR_STRIP_ID, strip_number: props.row.STRIP_NUMBER, wc_code: wc.POSITION_CODE})"> {{`${eventTime(wc, ev, props.row)}`}} </q-td> -->
											<q-td v-else-if="wc.el_show && ev.EVENT_CODE === 'TREND'" class="table-cell-hyperlink">
												<div>
													<router-link :to="{ name: 'trend', query: { stripId: props.row.PR_STRIP_ID, stripNumber: props.row.STRIP_NUMBER,  wcCode: wc.POSITION_CODE, } }"> {{ eventTime(wc, ev, props.row) }} </router-link>
												</div>
											</q-td>
											<template v-for="at in ev.attr" :key="at.id">
												<!-- <q-td v-if="wc.el_show && ev.el_show && at.el_show" :key="at.id"> -->
													<!-- <span v-if="!(at.ATTR_NAME === 'AUZK_STATUS' && attrValue(wc, ev, at, props.row) === 'REJECTED')"> {{ attrValue(wc, ev, at, props.row) }} </span> -->
													<!-- <span v-if="at.ATTR_NAME === 'AUZK_STATUS'" class="table-cell-hyperlink" @click="showDefects(props.row, attrValue(wc, ev, at, props.row))"> {{ attrValue(wc, ev, at, props.row) }} </span> -->
													<!-- <a v-if="at.ATTR_NAME === 'AUZK_STATUS' && attrValue(wc, ev, at, props.row) === 'REJECTED'" class="table-cell-hyperlink" -->
														<!-- @click="showDefects(props.row, attrValue(wc, ev, at, props.row))"> {{ attrValue(wc, ev, at, props.row) }} </a> -->
													<!-- <a v-if="at.ATTR_NAME === 'AUZK_STATUS'" class="defect-ref">{{ attrValue(wc, ev, at, props.row) }}</a> -->
													<!-- <span v-else> {{ attrValue(wc, ev, at, props.row) }} </span> -->
												<!-- </q-td> -->
												<!-- <q-td v-if="(wc.el_show && ev.el_show && at.el_show) && (!(at.ATTR_NAME === 'AUZK_STATUS' && attrValue(wc, ev, at, props.row) === 'REJECTED'))" :key="at.id+'if'">
													<span> {{ attrValue(wc, ev, at, props.row) }} </span>
												</q-td>
												<q-td v-else-if="(wc.el_show && ev.el_show && at.el_show) && (at.ATTR_NAME === 'AUZK_STATUS' && attrValue(wc, ev, at, props.row) === 'REJECTED')" :key="at.id+'else'" class="table-cell-hyperlink">
													<span @click="showDefects(wc, ev, at, row)"> {{ attrValue(wc, ev, at, props.row) }} </span>
												</q-td> -->

												<!-- <q-td v-if="(wc.el_show && ev.el_show && at.el_show)" :class="(at.ATTR_NAME === 'AUZK_STATUS' && attrValue(wc, ev, at, props.row) === 'REJECTED') ? 'table-cell-hyperlink' : ''"> -->
												<!-- <q-td v-if="(wc.el_show && ev.el_show && at.el_show)" :class="(at.ATTR_NAME === 'AUZK_STATUS') ? 'table-cell-hyperlink' : ''"> -->
												<q-td v-if="(wc.el_show && ev.el_show && at.el_show)" :class="(at.ATTR_NAME === 'AUZK_DEFECT'  && attrValue(wc, ev, at, props.row) === ATTR_ARRAY_NAME) ? 'table-cell-hyperlink' : ''">
													<span @click="attrClick(wc, ev, at, props.row)"> {{ attrValue(wc, ev, at, props.row) }} </span>
												</q-td>

											</template>
										</template>
									</template>
								</q-tr>
							</template>
							<template v-slot:loading>
								<q-inner-loading showing />
							</template>
						</q-table>
					</div>
				</div>
			</div>
		</div>

		<q-inner-loading :showing="loading" :label="loading_label" label-class="text-teal" label-style="font-size: 1.1em" />

	</div>

</template>

<script setup>

import { ref, watch, computed, onMounted } from "vue";
import { QList, QItem, QItemSection, QToggle, useQuasar, QInput } from "quasar";


import moment from "moment";
import 'moment/dist/locale/ru';
import { read, utils, writeFileXLSX } from "xlsx";
// import X2JS from 'x2js';
import { set_cptable } from "xlsx";
import * as cptable from 'xlsx/dist/cpexcel.full.mjs';

import { isDate } from '../../components/utils';

import router from "../../router";

import { loadData } from "../../components/serverData";
import { tracking as url, dictionary as dict  } from "../../router/dataUrl";

import UkDefects from '../../components/UltrakraftDefects.vue'
import paramsMemory from '../../components/ParamsMemory.vue';
import alertPro from '../../components/alertPro.vue'
import confirmPro from '../../components/confirmPro.vue';

// Импорт разрешений для кадров работы со штрипсами.  rightsStrip - объект с разрешениями
import { storeToRefs } from 'pinia'
import { useAccessStore } from "../../stores/accessStore";
const accessStore = useAccessStore(); 
const { rightsStrip } = storeToRefs(accessStore);
// Конец - Импорт разрешений для кадров работы со штрипсами.

const $q = useQuasar();

const props = defineProps({
  wc: Number,
  d1: String,
  d2: String,
	withDateInterval: String,
	stripNumber: String,
	jobCode: String,
	batch: String,
	heat: String,
	width: Number,
	thick: Number,
	trendAverage: String,
  limit: Number,
});







const FORMAT_DATETIME_MINUTE = "YYYY-MM-DD HH:mm";
const FORMAT_DATETIME_MINUTE_ISO = "YYYY-MM-DDTHH:mm";
const FORMAT_DATETIME_SEC = "YYYY-MM-DD HH:mm:ss";
const FORMAT_DATE = "DD.MM.YYYY"; 
const FORMAT_DATE_INPUT = "YYYY-MM-DD"; 
const EVENT_BEGIN_CODE = "BEGIN";
const EVENT_END_CODE = "END";
const TGL_ALL_VAL =  "tgl_all_checkbox";
const ATTR_ARRAY_NAME = 'Дефекты';

const e_thick = ref(2);



const MyFilter = ref({filtPosition: -1,
											// filtDateBeg: moment().add(-24, "hours").startOf("hour").format(FORMAT_DATETIME_MINUTE_ISO),
											// filtDateEnd: moment().endOf('D').format(FORMAT_DATETIME_MINUTE_ISO),
											filtDateBeg: moment().startOf("day").add(7, "hours").isBefore(moment()) ? moment().startOf("day").add(7, "hours").format(FORMAT_DATETIME_MINUTE_ISO) : moment().startOf("day").add(-17, "hours").format(FORMAT_DATETIME_MINUTE_ISO),
											filtDateEnd: moment().startOf("day").add(7, "hours").isBefore(moment()) ? moment().startOf("day").add(31, "hours").format(FORMAT_DATETIME_MINUTE_ISO) : moment().startOf("day").add(7, "hours").format(FORMAT_DATETIME_MINUTE_ISO),
											filtWithDateInterval: false,
											filtDateInterval: "24",
											filtStripNumber: "",
											filtJobCode: "",
											filtBatch: "",
											filtHeat: "",
											filtWidth: undefined,
											filtThick: undefined,
											filtTrendAverage: false,
											filtLimit: 100,
											});
const MyFilterRemember = {
											filtPosition:						MyFilter.value.filtPosition,
											filtDateBeg: 						MyFilter.value.filtDateBeg,
											filtDateEnd: 						MyFilter.value.filtDateEnd,
											filtWithDateInterval: 	MyFilter.value.filtWithDateInterval,
											filtStripNumber: 				MyFilter.value.filtStripNumber,
											filtJobCode: 						MyFilter.value.filtJobCode,
											filtBatch: 							MyFilter.value.filtBatch,
											filtHeat: 							MyFilter.value.filtHeat,
											filtTrendAverage: 			MyFilter.value.filtTrendAverage,
											filtLimit: 							MyFilter.value.filtLimit,
											row_count_fact:					0,
											};

const btnLoadDataClass = ref("btn-vmz");


const PositionList =ref();
const SelParams =ref();

const TechOpForStrips = ref([]);
const techOpAttr = ref([]);
const selAttr = ref([]);
const selAttrFromStory = ref([]);

const FiltrStoreEdit = ref(false);
const FiltrStoreEditFirstTime = ref(false);
const MyPageSettings = ref("{}");
const MyPageAddress = ref("/strips/stripTechOpList");

const exportingData = ref(false);

// const alert = ref(false);
// const alert_text = ref("");
// const confirm = ref(false);
// const confirm_text = ref("");
// const confirm_function = ref({});
// const confirm_function_arg = ref({});        //  Объект для передачи аргументов функции, которая будет описана в confirm_function
const loading = ref(false);
const loading_label = ref("");

// объекты форматирования
const numberFormatterDig = [];
for(let i = 0; i < 10; i++)  numberFormatterDig[i] = new Intl.NumberFormat(undefined, { minimumFractionDigits: i });  // с запасом 0 до 10


const columns0 = [
	{
		name: "STRIP_NUMBER",
		required: true,
		label: "Номер штрипса",
		align: "left",
		field: (row) => row.STRIP_NUMBER,
		format: (val) => `${val}`,
		sortable: true,
	},
	{ name: "PR_STRIP_ID", label: "PR_STRIP_ID", field: "PR_STRIP_ID" },
	{
		name: "JOB_CODE",
		required: true,
		label: "Номер задания",
		align: "center",
		field: "JOB_CODE",
		format: (val) => `${val}`,
		sortable: true,
	},
	{
		name: "BATCH_NUMBER",
		required: true,
		label: "Партия",
		align: "center",
		field: "BATCH_NUMBER",
		format: (val) => `${val}`,
		sortable: true,
	},
	{
		name: "HEAT",
		required: true,
		label: "Номер плавки",
		align: "center",
		field: "HEAT",
		format: (val) => `${val}`,
		sortable: true,
	},
	{
		name: "WIDTH",
		required: true,
		label: "Ширина ном.",
		align: "center",
		field: "WIDTH",
		format: (val) => `${val}`,
		sortable: true,
	},
	{
		name: "THICK",
		required: true,
		label: "Толщина ном.",
		align: "center",
		field: "THICK",
		format: (val) => `${val}`,
		sortable: true,
	},
	{
		name: "STRENGTH_CLASS",
		required: true,
		label: "Класс прочности",
		align: "center",
		field:  (row) => row.STRENGTH_CLASS ?? '',
		format: (val) => `${val}`,
		sortable: true,
	},
	{
		name: "STEEL_GRADE",
		required: true,
		label: "Марка стали",
		align: "center",
		field:  (row) => row.STEEL_GRADE ?? '',
		format: (val) => `${val}`,
		sortable: true,
	},
];

const columns = ref(columns0.map((x) => x));

// const visibleColumns = ref(["STRIP_NUMBER", "STATUS_NAME", "JOB_CODE", "HEAT", "WIDTH", "WIDTH_FACT", "THICK", "THICK_FACT", "WEIGHT",  "WEIGHT_FACT", "DIAM_FACT",  "DIAM_FACT_FACT", "CREATE_DATE",]);
const visibleColumns = ref(columns0.map((x) => x.name));

const refStripTechOpList = ref();



onMounted(async () => {
	const PROC_NAME = "onMounted> ";
	console.log(`${PROC_NAME}Начало`);

  // console.log(PROC_NAME + 'Шаблон даты/времени: ', moment().local(false).toISOString());
  // MyFilter.value.filtDateBeg = moment().local(true).toISOString().slice(0, -8);

	loadDictionaryStripPosition();

  // const onMountedWc 							= props?.wc;
	// const onMountedDateBeg 					= props?.DateBeg;
	// const onMountedDateEnd 					= props?.DateEnd;
	// const onMountedWithDateInterval = props?.withDateInterval;
	// const onMountedStripNumber 			= props?.stripNumber;
	// const onMountedJobCode 					= props?.jobCode;
	// const onMountedBatch 						= props?.batch;
	// const onMountedHeat 						= props?.heat;
	// const onMountedWidth 						= props?.width;
	// const onMountedThick 						= props?.thick;
	// const onMountedLimit 						= props?.limit;
	const onMounted = {	filtPosition 					: props?.wc,
											filtDateBeg 					: props?.d1,
											filtDateEnd 					: props?.d2,
											filtWithDateInterval	: props?.withDateInterval,
											filtStripNumber 			: props?.stripNumber,
											filtJobCode						: props?.jobCode,
											filtBatch							: props?.batch,
											filtHeat							: props?.heat,
											filtWidth							: props?.width,
											filtThick							: props?.thick,
											filtTrendAverage			: props?.trendAverage,
											filtLimit							: props?.limit,
										};


	setTimeout(() => {
		// console.log(PROC_NAME + 'setTimeout> ', props, 'wc=' + onMountedWc, 'DateBeg=' + onMountedDateBeg, 'DateEnd=' + onMountedDateEnd, 'limit=' + onMountedLimit);
		console.log(PROC_NAME + 'setTimeout> onMounted = ', onMounted);
		// saveUrlParameters({ wc: onMountedWc, d1: onMountedDateBeg, d2: onMountedDateEnd, limit: onMountedLimit});
		saveUrlParameters(onMounted);
	}, 100);


	for(let key in onMounted) {  
		if((key !== "filtWithDateInterval") && (key !== "filtTrendAverage")) {
			// if(onMounted[key] !== -1 && onMounted[key] !== "") MyFilter.value[key] = onMounted[key] || '';
			if(onMounted[key] !== undefined && onMounted[key] !== null && onMounted[key] !== -1 && onMounted[key] !== "") MyFilter.value[key] = onMounted[key] || '';
		} else  {
			MyFilter.value[key] = (onMounted[key] === 'true');
		}
 	}

	// MyFilter.value.filtPosition = onMountedWc || -1;
	// MyFilter.value.filtDateBeg = onMountedDateBeg || moment().add(-24, "hours").startOf("hour").format(FORMAT_DATETIME_MINUTE_ISO);
	// MyFilter.value.filtDateEnd = onMountedDateEnd || moment().endOf('D').format(FORMAT_DATETIME_MINUTE_ISO);
	// MyFilter.value.filtLimit = onMountedLimit || 100;
});








async function loadDataTechOp() {    // Загрузка даннных
	const PROC_NAME = "loadDataTechOp> ";

  s_loading(true, "Подождите. Идёт загрузка данных");
	console.log(PROC_NAME + "MyFilter= ", MyFilter.value);
	// saveUrlParameters({ wc: MyFilter.value.filtPosition, d1: MyFilter.value.filtDateBeg, d2: MyFilter.value.filtDateEnd, limit: MyFilter.value.filtLimit });
	saveUrlParameters(MyFilter.value);

	const ret_techOp = await loadData({ url: url.techOp.strip.get, params: {
		...(MyFilter.value.filtLimit && !isNaN(parseInt(MyFilter.value.filtLimit)) && parseInt(MyFilter.value.filtLimit) > 0 && { "row-limit": parseInt(MyFilter.value.filtLimit) }),
		...(MyFilter.value.filtPosition && MyFilter.value.filtPosition > 0 && { positionId: MyFilter.value.filtPosition }),
		// ...(MyFilter.value.filtDateBeg && moment(MyFilter.value.filtDateBeg).isValid() && { dateBeg: MyFilter.value.filtDateBeg }),
		// ...(MyFilter.value.filtDateEnd && moment(MyFilter.value.filtDateEnd).isValid() && { dateEnd: MyFilter.value.filtDateEnd }),
		...(MyFilter.value.filtWithDateInterval && MyFilter.value.filtDateBeg && moment(MyFilter.value.filtDateBeg).isValid() && { dateBeg: MyFilter.value.filtDateBeg }),
		...(MyFilter.value.filtWithDateInterval && MyFilter.value.filtDateEnd && moment(MyFilter.value.filtDateEnd).isValid() && { dateEnd: MyFilter.value.filtDateEnd }),
		...(MyFilter.value.filtStripNumber && MyFilter.value.filtStripNumber.trim().length > 0 && { "strip-num": `%${MyFilter.value.filtStripNumber}%`}),
		...(MyFilter.value.filtJobCode && MyFilter.value.filtJobCode.trim().length > 0 && { "job-code": `%${MyFilter.value.filtJobCode}%`}),
		...(MyFilter.value.filtBatch && MyFilter.value.filtBatch.trim().length > 0 && { "batch": `%${MyFilter.value.filtBatch}%`}),
		...(MyFilter.value.filtHeat && MyFilter.value.filtHeat.trim().length > 0 && { "heat":`%${MyFilter.value.filtHeat}%`}),
		...(MyFilter.value.filtTrendAverage && { "trends": true,}),
		// "trends": true,
	} });


	for(let key in MyFilterRemember)  MyFilterRemember[key] = MyFilter.value[key];

	MyFilterChange();
	
	console.log(PROC_NAME + "ret_techOp = ", ret_techOp);

	// Сформируем массив, содержащий полный набор аттрибутов в выборке, разбитый на РЦ и события (исходим из того, что РЦ в будущем может быть не один)
	const all_attr = [];
	const columns_new = columns0.map((x) => x);
	let wc_current;
	let ev_current;

	//  Сначала РЦ
	if (ret_techOp.error) {
		s_loading(false);
		// s_alert("Загрузка данных произошла с ошибкой. Повторите попытку позже");
		s_alert("Загрузка данных произошла с ошибкой. Повторите попытку позже", ret_techOp.error.message ?? "");
	} else {
		if (ret_techOp.length === 0) {
			s_alert("По заданным условиям не найдено данных");
		}
    
		// ret_techOp.sort((a, b) => {    // сортировка штрипсов по времени
		// 	if(MyFilter.value.filtPosition > 0) {	    // Если  выбран какой-то один РЦ
    //     const a_time = a.wcs[0]?.events[0]?.EVENT_TIME ? moment(a.wcs[0].events[0].EVENT_TIME) : null;
    //     const b_time = b.wcs[0]?.events[0]?.EVENT_TIME ? moment(b.wcs[0].events[0].EVENT_TIME) : null;
		// 		if(a_time && b_time) return moment(a_time).diff(b_time);
		// 		if(a_time && !b_time) return -1;
		// 		if(!a_time && b_time) return 1;
		// 		return 0;
		// 	} else {  // Все РЦ.
		// 		const a_time1 = a.wcs?.find(w => (w.WC_AREA === 1 && w.WC_NUMBER === 1))?.events[0]?.EVENT_TIME;
		// 		const a_time2 = a.wcs?.find(w => (w.WC_AREA === 1 && w.WC_NUMBER === 2))?.events[0]?.EVENT_TIME;
		// 		const b_time1 = b.wcs?.find(w => (w.WC_AREA === 1 && w.WC_NUMBER === 1))?.events[0]?.EVENT_TIME;
		// 		const b_time2 = b.wcs?.find(w => (w.WC_AREA === 1 && w.WC_NUMBER === 2))?.events[0]?.EVENT_TIME;
		// 		if(a_time2 && b_time2) return moment(a_time2).diff(b_time2);
		// 		if(a_time2 && !b_time2) return -1;
		// 		if(!a_time2 && b_time2) return 1;
		// 		// если ни у одного штрипса нет ТО на РЦ1.1
		// 		if(a_time1 && b_time1) return moment(a_time1).diff(b_time1);
		// 		if(a_time1 && !b_time1) return -1;
		// 		if(!a_time1 && b_time1) return 1;
		// 		return 0;
		// 	}
		// });
		ret_techOp.sort((a, b) => {    // сортировка штрипсов по времени  --- в обратном порядке
			if(MyFilter.value.filtPosition > 0) {	    // Если  выбран какой-то один РЦ
        const a_time = a.wcs[0]?.events[0]?.EVENT_TIME ? moment(a.wcs[0].events[0].EVENT_TIME) : null;
        const b_time = b.wcs[0]?.events[0]?.EVENT_TIME ? moment(b.wcs[0].events[0].EVENT_TIME) : null;
				if(a_time && b_time) return moment(b_time).diff(a_time);
				if(a_time && !b_time) return 1;
				if(!a_time && b_time) return -1;
				return 0;
			} else {  // Все РЦ.
				const a_time1 = a.wcs?.find(w => (w.WC_AREA === 1 && w.WC_NUMBER === 1))?.events[0]?.EVENT_TIME;
				const a_time2 = a.wcs?.find(w => (w.WC_AREA === 1 && w.WC_NUMBER === 2))?.events[0]?.EVENT_TIME;
				const b_time1 = b.wcs?.find(w => (w.WC_AREA === 1 && w.WC_NUMBER === 1))?.events[0]?.EVENT_TIME;
				const b_time2 = b.wcs?.find(w => (w.WC_AREA === 1 && w.WC_NUMBER === 2))?.events[0]?.EVENT_TIME;
				if(a_time2 && b_time2) return moment(b_time2).diff(a_time2);
				if(a_time2 && !b_time2) return 1;
				if(!a_time2 && b_time2) return -1;
				// если ни у одного штрипса нет ТО на РЦ1.1
				if(a_time1 && b_time1) return moment(b_time1).diff(a_time1);
				if(a_time1 && !b_time1) return 1;
				if(!a_time1 && b_time1) return -1;
				return 0;
			}
		});
	 

		if( !ret_techOp.error && ret_techOp.length > 0 ) {

			// найдём средние значение для трендов, если таковые есть
			ret_techOp.forEach((strip, idx) => {

				if( strip.wcs && strip.wcs.length > 0)  {
					strip.wcs.forEach((wc) => {
						if(wc.events && wc.events.length > 0) {
							wc.events.forEach((ev) => {
								if(Array.isArray( ev.trends)) {
									const dist = ev.trends.find(t => (Array.isArray(t.TREND_JSON?.DISTANCE)))?.TREND_JSON?.DISTANCE;
									if( dist ) {
										ev.trends.forEach((t) => {
											if(t.TREND_JSON) {
												for( let key in t.TREND_JSON ) {    // тут нет массива, просто чтоб вытянуть имя массива по ключу
													if(Array.isArray(t.TREND_JSON[key]) && t.TREND_JSON[key].length === dist.length)  {   // на всякий сучай длины должны быть одинаковыми
														const arr = t.TREND_JSON[key];
														let val_sum = 0.0;
														let k_sum = 0.0;
														const len = dist[dist.length - 1] - dist[0];
														// if(len != 0 && arr.length > 1) {  
														if((dist[dist.length - 1] - dist[0]) != 0 && arr.length > 1) {  
															// val_sum += arr[0] / (arr.length - 1);           // крайние значения с коэффициентами пропорционально количеству интервалов между дискретами
															// k_sum += 1 / ((arr.length - 1)); 
															// val_sum += arr[arr.length - 1] / (arr.length - 1);   // крайние значения с коэффициентами пропорционально количеству интервалов между дискретами
															// k_sum += 1 / ((arr.length - 1));                   
															// for( let i = 1; i < arr.length - 1; i++) {    
															// 	val_sum += arr[i] * (dist[i+1] - dist[i-1]) / len;     // Остальные - пропорционпльно интервалу между двемя соседними дискретам (вправо и влево)
															// 	k_sum += (dist[i+1] - dist[i-1]) / len;
															// }
															
															val_sum += arr[0] * ((dist[1] - dist[0]) > 0 ? (dist[1] - dist[0]) : 0);           // крайние значения с коэффициентами, равными крайнему интервалу
															k_sum += (dist[1] - dist[0]) > 0 ? (dist[1] - dist[0]) : 0; 
															val_sum += arr[arr.length - 1] * ((dist[arr.length - 1] - dist[arr.length - 2]) > 0 ? (dist[arr.length - 1] - dist[arr.length - 2]) : 0);   // крайние значения с коэффициентами, равными крайнему интервалу
															k_sum += (dist[arr.length - 1] - dist[arr.length - 2]) > 0 ? (dist[arr.length - 1] - dist[arr.length - 2]) : 0;                   
															for( let i = 1; i < arr.length - 1; i++) {    
																val_sum += arr[i] * ((dist[i+1] - dist[i-1]) > 0 ? (dist[i+1] - dist[i-1]) : 0);     // Остальные - с коэффициентами, равными интервалу между двумя соседними дискретами (вправо и влево)
																k_sum += (dist[i+1] - dist[i-1]) > 0 ? (dist[i+1] - dist[i-1]) : 0;
															}
															const attr = ev.attr?.find(a => ((a.ATTR_NAME.indexOf(key) === 0) || (a.ATTR_NAME.indexOf(key) === 6) ));
															// if( attr ) attr.ATTR_VALUE = ((val_sum / k_sum) * (t.KOEF_L2_L1 || 1)).toString();
															// if( attr ) attr.ATTR_VALUE = ((val_sum / (( dist[dist.length - 1] - dist[0] )  * 2 )) * (t.KOEF_L2_L1 || 1)).toString();  //  Сумма коэффициентов = Удвоенной длине (dist[dist.length - 1] - dist[0]) * 2
															if( attr && (k_sum !== 0)) {
																attr.ATTR_VALUE = (( val_sum / k_sum ) * (t.KOEF_L2_L1 || 1)).toString();  //  Сумма коэффициентов (k_sum) = Удвоенной длине (dist[dist.length - 1] - dist[0]) * 2) , но не всегда, как выяснилось 
																attr.ATTR_NAME_VIEW += " - ср.знач.";
															}
														}
													}
												}
											}
										});

										// Рассчёт К-фактора 
										if(wc.POSITION_CODE === "HFW") {  // \Если были тренды сварки
											const kf_p = ev.attr?.find(a => (a.ATTR_NAME === "TREND_HFW_POWER"))?.ATTR_VALUE;    // мощность сварки (кВТ)
											const kf_v = ev.attr?.find(a => (a.ATTR_NAME === "TREND_MILL_SPEED"))?.ATTR_VALUE;    // скорость линии (м/мин)
											const kf_t = strip.THICK;    																												 // толщина металла (мм)
											if(kf_p && (kf_p !== "TREND") && !isNaN(parseFloat(kf_p)) && kf_v && (kf_v !== "TREND") && !isNaN(parseFloat(kf_v)) ) {
												const attr_kf = ev.attr?.find(a => (a.ATTR_NAME === "TREND_EVENT_ENDTO"));        // подставляем в параметр TREND_EVENT_ENDTO, для которого нет тренда
												if(attr_kf) {
													attr_kf.ATTR_VALUE = (parseFloat(kf_p) / ( strip.THICK * Math.pow(parseFloat(kf_v), 0.65) )).toString();
													attr_kf.IS_NUMBER = 1;
													attr_kf.VIEW_PRECISION = 3;
												}
											}
										}
									}
								}
							});
						}
					});
				}
			});
			
			// Конец - найдём средние значение для трендов, если таковые есть






			ret_techOp.forEach((strip, idx) => {
				// const attr_strip = {};
				// strip["index"] = idx + 1;
				strip.index = idx + 1;
				strip.attr_value_for_sort = {};
				if( strip.wcs && strip.wcs.length > 0)  {
					strip.wcs.forEach((wc) => {
						if( !all_attr.find((wca, ind, arr) => (wca.PR_STRIP_POSITION_ID === wc.PR_STRIP_POSITION_ID)))    
							all_attr.push({	PR_STRIP_POSITION_ID: 	wc.PR_STRIP_POSITION_ID,
															id: 										wc.PR_STRIP_POSITION_ID,
															POSITION: 							wc.POSITION,
															POSITION_CODE: 					wc.POSITION_CODE,
															WC_AREA: 								wc.WC_AREA,
															WC_NUMBER: 							wc.WC_NUMBER,
															events:                 [],
															el_show:								true,
														});

						wc_current = all_attr.find((wca, ind, arr) => (wca.PR_STRIP_POSITION_ID === wc.PR_STRIP_POSITION_ID));  // запомнили  РЦ в результирующем массиве

						if(wc.events && wc.events.length > 0) {
							wc.events.forEach((ev) => {
								// strip[`${wc.POSITION_CODE}_${ev.EVENT_CODE}_TIME`] = ev.EVENT_TIME;
								// strip[`${wc.POSITION_CODE}_${ev.EVENT_CODE}_TIME`] = eventTime(wc, ev, strip);
								// Добавляем в строку (в attr_value_for_sort) время ТО (для обесперчения сортировки)	
								strip.attr_value_for_sort[`${wc.POSITION_CODE}_${ev.EVENT_CODE}_TIME`] = eventTime(wc, ev, strip);


								if( !wc_current.events.find((eva, ind, arr) => (eva.PR_STRIP_TRACK_EVENT_ID === ev.PR_STRIP_TRACK_EVENT_ID))) {
									wc_current.events.push({	
																						id: 											ev.PR_STRIP_TRACK_EVENT_ID,
																						EVENT: 										ev.EVENT,
																						EVENT_CODE: 							ev.EVENT_CODE,
																						PR_STRIP_TRACK_EVENT_ID: 	ev.PR_STRIP_TRACK_EVENT_ID,
																						// EVENT_TIME: 							ev.EVENT_TIME,
																						attr:                 		[],
																						el_show:									true,
																					});
									// Добавляем в строку время ТО (для обесперчения сортировки)	
									// strip[`${wc.POSITION_CODE}_${ev.EVENT_CODE}_TIME`] = eventTime(wc, ev, strip);
									// strip[`${wc.POSITION_CODE}_${ev.EVENT_CODE}_TIME`] = ev.EVENT_TIME;
									// const kkey = `${wc.POSITION_CODE}_${ev.EVENT_CODE}_TIME`
									// attr_strip[kkey] = ev.EVENT_TIME;

									// Добавляем Добавляем колонку времени ТО (для обесперчения сортировки)	
								  columns_new.push({
										name: `${wc.POSITION_CODE}_${ev.EVENT_CODE}_TIME`,
										required: true,
										label: "Время",
										align: "center",
										// classes: (row) => cellClass(row),
										field: (row) => row.attr_value_for_sort[`${wc.POSITION_CODE}_${ev.EVENT_CODE}_TIME`],
										// field: `${wc.POSITION_CODE}_${ev.EVENT_CODE}_TIME`,
										format: (val) => `${val}`,
										sortable: true,
									});
								}   


								ev_current = wc_current.events.find((eva, ind, arr) => (eva.PR_STRIP_TRACK_EVENT_ID === ev.PR_STRIP_TRACK_EVENT_ID));     // запомнили  событие в результирующем массиве
								

								if(ev.attr && ev.attr.length > 0) {
									ev.attr.forEach((at) => {
										// Добавляем в строку (в attr_value_for_sort) значение аттрибута (для обесперчения сортировки)
										strip.attr_value_for_sort[`${wc.POSITION_CODE}_${ev.EVENT_CODE}_${at.ATTR_NAME}`] = attrValueForSort(at);
										if( !ev_current.attr.find((ata, ind, arr) => (ata.PR_ATTR_ID === at.PR_ATTR_ID)))  {
											ev_current.attr.push({	id: 						at.PR_ATTR_ID,
																							ATTR_NAME:			at.ATTR_NAME,
																							ATTR_NAME_RUS: 	at.ATTR_NAME_RUS,
																							ATTR_NAME_VIEW: at.ATTR_NAME === "TREND_EVENT_ENDTO" ? "К-фактор" : at.ATTR_NAME_VIEW,        // Для TREND_EVENT_ENDTO подменяем название
																							IS_NUMBER: 			at.IS_NUMBER,
																							MEASURE_UNITS: 	at.MEASURE_UNITS,
																							PR_ATTR_ID: 		at.PR_ATTR_ID,
																							VIEW_PRECISION: at.VIEW_PRECISION,
																							el_show:				true,

																						});
											// Добавляем колонку значения аттрибута (для обесперчения сортировки)	
											columns_new.push({
												name: `${wc.POSITION_CODE}_${ev.EVENT_CODE}_${at.ATTR_NAME}`,
												required: true,
												label: `${at.ATTR_NAME_VIEW}${at.MEASURE_UNITS ? ' (' + at.MEASURE_UNITS+ ')' : ''}`,
												align: "center",
												// classes: (row) => cellClass(row),
												field: (row) => row.attr_value_for_sort[`${wc.POSITION_CODE}_${ev.EVENT_CODE}_${at.ATTR_NAME}`],
												// field: `${wc.POSITION_CODE}_${ev.EVENT_CODE}_TIME`,
												format: (val) => `${val}`,
												sortable: true,
											});
										}  
									});
								}
							});
						}
					}); 
				}
				// console.log("attr_strip = ", attr_strip);
			}); 
		}

		






								// <q-tr :props="props">
								// 	<template v-for="wc in techOpAttr">
								// 		<template v-for="ev in wc.events">
								// 			<q-th v-if="wc.el_show" :key="ev.id" style="border-left: 1px solid rgba(0, 0, 0, 0.12);"> Время </q-th>
								// 			<template v-for="at in ev.attr">
								// 				<q-th v-if="wc.el_show && ev.el_show && at.el_show" :key="at.id"> {{ `${at.ATTR_NAME_VIEW}${at.MEASURE_UNITS ? ' (' + at.MEASURE_UNITS+ ')' : ''}` }}
								// 				</q-th>
								// 			</template>
								// 		</template>
								// 	</template>
								// </q-tr>


								// <q-tr :props="props">
								// 	<q-td :class="'col_no_move ' + ($q.dark.isActive ? 'col_no_move_bg-dark' : 'col_no_move_bg-light')"> {{ `${props.row.index}` }} </q-td>
								// 	<q-td :class="'col_no_move ' + ($q.dark.isActive ? 'col_no_move_bg-dark' : 'col_no_move_bg-light')"> {{ `${props.row.STRIP_NUMBER}` }} </q-td>
								// 	<q-td > {{ `${props.row.JOB_CODE}` }} </q-td>
								// 	<q-td > {{ `${props.row.BATCH_NUMBER}` }} </q-td>
								// 	<q-td > {{ `${props.row.HEAT}` }} </q-td>
								// 	<!-- <q-td > {{ `${props.row.WIDTH}` }} </q-td> -->
								// 	<q-td > {{ `${!isNaN(props.row.WIDTH) ? numberFormatter(props.row.WIDTH, 1) : (props.row.WIDTH !== null ? props.row.WIDTH : "")}` }} </q-td>
								// 	<!-- <q-td > {{ `${props.row.THICK}` }} </q-td> -->
								// 	<q-td > {{ `${!isNaN(props.row.THICK) ? numberFormatter(props.row.THICK, 2) : (props.row.THICK !== null ? props.row.THICK : "")}` }} </q-td>
								// 	<template v-for="wc in techOpAttr">
								// 		<template v-for="ev in wc.events">
								// 			<q-td v-if="wc.el_show && ev.EVENT_CODE !== 'TREND'" :key="ev.id"> {{`${eventTime(wc, ev, props.row)}`}} </q-td>
								// 			<!-- <q-td v-else-if="wc.el_show && ev.EVENT_CODE === 'TREND'" :key="'else' + ev.id" class="table-cell-hyperlink" @click="s_confirm(`Вы действительно хотите перейти в экран трендов для просмотра графиков штрипса №${props.row.STRIP_NUMBER}?`, GoTrend, {strip_id: props.row.PR_STRIP_ID, strip_number: props.row.STRIP_NUMBER, wc_code: wc.POSITION_CODE})"> {{`${eventTime(wc, ev, props.row)}`}} </q-td> -->
								// 			<q-td v-else-if="wc.el_show && ev.EVENT_CODE === 'TREND'" :key="'else' + ev.id" class="table-cell-hyperlink">
								// 				<div>
								// 					<router-link :to="{ name: 'trend', query: { stripId: props.row.PR_STRIP_ID, stripNumber: props.row.STRIP_NUMBER,  wcCode: wc.POSITION_CODE, } }"> {{ eventTime(wc, ev, props.row) }} </router-link>
								// 				</div>
								// 			</q-td>
								// 			<template v-for="at in ev.attr" :key="at.id">
								// 				<!-- <q-td v-if="wc.el_show && ev.el_show && at.el_show" :key="at.id"> -->
								// 					<!-- <span v-if="!(at.ATTR_NAME === 'AUZK_STATUS' && attrValue(wc, ev, at, props.row) === 'REJECTED')"> {{ attrValue(wc, ev, at, props.row) }} </span> -->
								// 					<!-- <span v-if="at.ATTR_NAME === 'AUZK_STATUS'" class="table-cell-hyperlink" @click="showDefects(props.row, attrValue(wc, ev, at, props.row))"> {{ attrValue(wc, ev, at, props.row) }} </span> -->
								// 					<!-- <a v-if="at.ATTR_NAME === 'AUZK_STATUS' && attrValue(wc, ev, at, props.row) === 'REJECTED'" class="table-cell-hyperlink" -->
								// 						<!-- @click="showDefects(props.row, attrValue(wc, ev, at, props.row))"> {{ attrValue(wc, ev, at, props.row) }} </a> -->
								// 					<!-- <a v-if="at.ATTR_NAME === 'AUZK_STATUS'" class="defect-ref">{{ attrValue(wc, ev, at, props.row) }}</a> -->
								// 					<!-- <span v-else> {{ attrValue(wc, ev, at, props.row) }} </span> -->
								// 				<!-- </q-td> -->
								// 				<!-- <q-td v-if="(wc.el_show && ev.el_show && at.el_show) && (!(at.ATTR_NAME === 'AUZK_STATUS' && attrValue(wc, ev, at, props.row) === 'REJECTED'))" :key="at.id+'if'">
								// 					<span> {{ attrValue(wc, ev, at, props.row) }} </span>
								// 				</q-td>
								// 				<q-td v-else-if="(wc.el_show && ev.el_show && at.el_show) && (at.ATTR_NAME === 'AUZK_STATUS' && attrValue(wc, ev, at, props.row) === 'REJECTED')" :key="at.id+'else'" class="table-cell-hyperlink">
								// 					<span @click="showDefects(wc, ev, at, row)"> {{ attrValue(wc, ev, at, props.row) }} </span>
								// 				</q-td> -->

								// 				<!-- <q-td v-if="(wc.el_show && ev.el_show && at.el_show)" :class="(at.ATTR_NAME === 'AUZK_STATUS' && attrValue(wc, ev, at, props.row) === 'REJECTED') ? 'table-cell-hyperlink' : ''"> -->
								// 				<!-- <q-td v-if="(wc.el_show && ev.el_show && at.el_show)" :class="(at.ATTR_NAME === 'AUZK_STATUS') ? 'table-cell-hyperlink' : ''"> -->
								// 				<q-td v-if="(wc.el_show && ev.el_show && at.el_show)" :class="(at.ATTR_NAME === 'AUZK_DEFECT'  && attrValue(wc, ev, at, props.row) === ATTR_ARRAY_NAME) ? 'table-cell-hyperlink' : ''">
								// 					<span @click="attrClick(wc, ev, at, props.row)"> {{ attrValue(wc, ev, at, props.row) }} </span>
								// 				</q-td>

								// 			</template>
								// 		</template>
								// 	</template>
								// </q-tr>





		// Теперь упорядочим результирующиё массив/объект
		if (all_attr.length > 0) {
			all_attr.sort((a, b) => (a.WC_AREA * 100 + a.WC_NUMBER) - (b.WC_AREA * 100 + b.WC_NUMBER));   // отсортируем РЦ
			all_attr.forEach((wc) => {
				if(wc.events && wc.events.length > 0) {
					wc.events.sort((a, b) => {           // отсортируем собфтия, если их больше одного
						if( a.EVENT_CODE === EVENT_BEGIN_CODE ||  b.EVENT_CODE === EVENT_END_CODE )  return -1;
						if( b.EVENT_CODE === EVENT_BEGIN_CODE ||  a.EVENT_CODE === EVENT_END_CODE )  return 1;
						return a.EVENT_CODE - b.EVENT_CODE;
					});   

					wc.events.forEach((ev) => {
						if(ev.attr && ev.attr.length > 0) {
							ev.attr.sort((a, b) => { 	return a.ATTR_NAME_VIEW - b.ATTR_NAME_VIEW;		});     // отсортируем атрибуты внутри события
						}
					});
				}
			});
		}

		console.log("all_attr= ", all_attr);


		// теперь меню выбора аттрибутов
		const sel_attr = [];
		
		// Добавляем вначале элемент "Все РЦ"
		if(all_attr.length > 0) {
			sel_attr.push({	val: 						TGL_ALL_VAL, 
											label:  				``,
											txt:  					`Все РЦ`,
											type: 					TGL_ALL_VAL,
											id:         		-1000,
											el_enable:  		selAttr.value?.find(a => (a.val === TGL_ALL_VAL))?.el_enable ?? true,
											el_enable_old:  selAttr.value?.find(a => (a.val === TGL_ALL_VAL))?.el_enable_old ?? true,
											el_show:				true,   
										});
		}

		all_attr.forEach((wc) => {
			sel_attr.push({	val: 						`wc${wc.WC_AREA}.${wc.WC_NUMBER}`, 
											label:  				``,
											txt:  					`${wc.WC_AREA}.${wc.WC_NUMBER} ${wc.POSITION} (${wc.POSITION_CODE})`,
											type: 					"wc",
											id:         		wc.PR_STRIP_POSITION_ID,
											el_enable:  		selAttr.value?.find(a => (a.val === `wc${wc.WC_AREA}.${wc.WC_NUMBER}`))?.el_enable ?? true,
											el_enable_old:  selAttr.value?.find(a => (a.val === `wc${wc.WC_AREA}.${wc.WC_NUMBER}`))?.el_enable_old ?? true,
											el_show:				selAttr.value?.find(a => (a.val === `wc${wc.WC_AREA}.${wc.WC_NUMBER}`))?.el_show ?? true,   
										});
			if(wc.events) {
				wc.events.forEach((ev) => {
					sel_attr.push({	val: 						`wc${wc.WC_AREA}.${wc.WC_NUMBER}.ev${ev.PR_STRIP_TRACK_EVENT_ID}`, 
													label:  				``,
													txt:	  				`${ev.EVENT}`,
													type: 					"ev",
													id:         		ev.PR_STRIP_TRACK_EVENT_ID,
													wc_id:					wc.PR_STRIP_POSITION_ID,
													el_enable:  		selAttr.value?.find(a => (a.val === `wc${wc.WC_AREA}.${wc.WC_NUMBER}.ev${ev.PR_STRIP_TRACK_EVENT_ID}`))?.el_enable ?? (ev.EVENT_CODE === "TREND" ? false : true),
													el_enable_old:  selAttr.value?.find(a => (a.val === `wc${wc.WC_AREA}.${wc.WC_NUMBER}.ev${ev.PR_STRIP_TRACK_EVENT_ID}`))?.el_enable_old ?? true,
													el_show:				selAttr.value?.find(a => (a.val === `wc${wc.WC_AREA}.${wc.WC_NUMBER}.ev${ev.PR_STRIP_TRACK_EVENT_ID}`))?.el_show ?? true,   
												});
					if(ev.attr) {
						ev.attr.forEach((at) => {
							sel_attr.push({	val: 						`wc${wc.WC_AREA}.${wc.WC_NUMBER}.ev${ev.PR_STRIP_TRACK_EVENT_ID}.at${at.PR_ATTR_ID}`, 
															label:  				``,
															txt:	  				`${at.ATTR_NAME_VIEW}`,
															type: 					"at",
															id:         		at.PR_ATTR_ID,
															wc_id:					wc.PR_STRIP_POSITION_ID,
															ev_id:					ev.PR_STRIP_TRACK_EVENT_ID,
															el_enable:  		selAttr.value?.find(a => (a.val === `wc${wc.WC_AREA}.${wc.WC_NUMBER}.ev${ev.PR_STRIP_TRACK_EVENT_ID}.at${at.PR_ATTR_ID}`))?.el_enable ?? true,
															el_enable_old:  selAttr.value?.find(a => (a.val === `wc${wc.WC_AREA}.${wc.WC_NUMBER}.ev${ev.PR_STRIP_TRACK_EVENT_ID}.at${at.PR_ATTR_ID}`))?.el_enable_old ?? true,
															el_show:				selAttr.value?.find(a => (a.val === `wc${wc.WC_AREA}.${wc.WC_NUMBER}.ev${ev.PR_STRIP_TRACK_EVENT_ID}.at${at.PR_ATTR_ID}`))?.el_show ?? true,   
														});

						});
					}
				});
			}
		});


		techOpAttr.value = all_attr;

		//  // Если установка списка атрибутов РЦ (selAttr) - в первый раз, а считанный из истории наботр фильтров уже есть, подмешаем состояние из истории в selAttr
		if(sel_attr.length > 0 && selAttr.value?.length === 0 && selAttrFromStory.value?.length > 0)  {  
			selAttrFromStory.value.forEach(a => { 
				if( sel_attr.find(aa => (aa.val === a.val)) )  sel_attr.find(aa => (aa.val === a.val)).el_enable = a.enable;
			});
		}


		selAttr.value = sel_attr;
		console.log("sel_attr= ", sel_attr);
		// loading.value = false;
		selectAttrChange();
		s_loading(false);

		if(ret_techOp.length === MyFilter.value.filtLimit) {
			$q.notify({message: `Выбраны только последние ${ret_techOp.length} записей по заданным условиям (фильтрам). <br> Возможно, не все необходимые данные отражаются в выборке.`, 
			position: "top", textColor: "yellow", html: true,});
		}


		s_loading(false);
	}



	if( !ret_techOp.error )  {
		MyFilterRemember.row_count_fact = ret_techOp.length;
		
		columns.value = columns_new;
	 	TechOpForStrips.value = ret_techOp;
		console.log("columns.value=", columns.value);
		console.log("TechOpForStrips.value=", TechOpForStrips.value);

	}
	
};



/**
 * Загрузка справочника рабочих центров для штрипсов
 */
async function loadDictionaryStripPosition() {    // Загрузка даннных
	const positions = [];
  s_loading(true, "Загружаются данные о рабочих центрах (РЦ)")
	const ret_dict = await loadData({ url: dict.strip.position.list, params: {} });
	console.log("ret_dict_position = ", ret_dict);

	if (ret_dict.error) {
		s_loading(false);
		// s_alert("Загрузка данных произошла с ошибкой. Повторите попытку позже");
		s_alert("Загрузка данных справочника рабочих центров произошла с ошибкой. Повторите попытку позже", ret_dict.error.message ?? "");
	} else {
		if (ret_dict.length === 0) {
			s_alert("По данным о рабочих центрах (РЦ) не найдено данных");
		}

		if(ret_dict?.length > 0) {
			positions.push({val: -1, stat: `Все РЦ`,});
			for(let i = 0; i < ret_dict.length; i++) {
				positions.push({val: ret_dict[i].PR_STRIP_POSITION_ID, stat: `${ret_dict[i].WC_AREA}.${ret_dict[i].WC_NUMBER} ${ret_dict[i].DESCRIPTION} (${ret_dict[i].WC_NUMBER} ${ret_dict[i].CODE})`,});
			}
		}
		s_loading(false);
	}

	PositionList.value = positions;   //
};



function selItemClass(opt) {
	if(opt.type === TGL_ALL_VAL)  return  "sel_item_all";
	if(opt.type === "wc")  return  "sel_item_wc";
	if(opt.type === "ev")  return  "sel_item_evrnt";
	if(opt.type === "at")  return  "sel_item_attr";
	return "";
};


function selectAttrChange(v, evt) {

	// console.log("v= ", v);
	// console.log("evt= ", evt);
	// console.log("evtю.key= ", evt.key);

	let wc_id = -1;
	let ev_id = -1;
	let wc_enable = true;
	let ev_enable = true;
	let wc_current = {}; 
	let ev_current = {};
	let at_current = {};

	// selAttr.value.forEach((at) => {
	// });

	let i = 0;
	let attr;
	let wc_idx = 0;
	let ev_idx = 0;
  while ( i < selAttr.value.length) {
    attr = selAttr.value[i];

		if(attr.val === TGL_ALL_VAL && attr.el_enable !== attr.el_enable_old ) {   // Если был изменён элемент  "Выключить всё"
			attr.el_enable_old = attr.el_enable;
			// Элемент "Выключить всё" - первый, так что изменяем всё, чт после него
			while ( i < selAttr.value.length - 1) {
				i++;
				selAttr.value[i].el_enable_old = selAttr.value[i].el_enable = attr.el_enable;
			}
		} else {   // Остальные элементы
			if(attr.type === "wc")  {
				wc_idx = i;
				if(attr.el_enable !== attr.el_enable_old) { // Если щёлкнули по РЦ, найти все атрибуты до следующего РЦ и перещёлкнуть их
					attr.el_enable_old = attr.el_enable;
					let j = i + 1;
					while ( j < selAttr.value.length && selAttr.value[j].type !== "wc") {  // До следующего РЦ
						selAttr.value[j].el_enable_old = selAttr.value[j].el_enable = attr.el_enable;
						j++;
					}
					i = selAttr.value.length;
				}
			} else {
				if(attr.type === "ev")  {
					ev_idx = i;
					if(attr.el_enable !== attr.el_enable_old) { // Если щёлкнули по событию, найти все атрибуты до следующего события и перещёлкнуть их
						attr.el_enable_old = attr.el_enable;
						let j = i + 1;
						while ( j < selAttr.value.length && selAttr.value[j].type !== "wc" && selAttr.value[j].type !== "ev") {  // До следующего события
							selAttr.value[j].el_enable_old = selAttr.value[j].el_enable = attr.el_enable;
							j++;
						}
						if(attr.el_enable) { // Если щёлкнули по атрибуту и включили его, на всякий случай включить родительские РЦ 
							selAttr.value[wc_idx].el_enable_old = selAttr.value[wc_idx].el_enable = attr.el_enable;
						}
						// i = selAttr.value.length;
						i = j - 1;
					}
					
				} else {
					if(attr.type === "at")  {
						if(attr.el_enable !== attr.el_enable_old) { // Если щёлкнули по атрибуту и включили его, на всякий случай включить родительские РЦ и  Событие
							attr.el_enable_old = attr.el_enable;
							if(attr.el_enable) { // Если щёлкнули по атрибуту и включили его, на всякий случай включить родительские РЦ и  Событие
								selAttr.value[ev_idx].el_enable_old = selAttr.value[ev_idx].el_enable = attr.el_enable;
								selAttr.value[wc_idx].el_enable_old = selAttr.value[wc_idx].el_enable = attr.el_enable;
							}
							i = selAttr.value.length;
						}
					}
				}
			}
		}
		i++;
	}



	selAttr.value.forEach((at) => {
		if(at.type === "wc") {
			wc_id = at.id;
			wc_enable = at.el_enable;  																													     // Разрешение текущ РЦ запоминаем
			wc_current = techOpAttr.value.find((twc, ind, arr) => (twc.PR_STRIP_POSITION_ID === wc_id));     // ищем РЦ в объекте аттрибутов
			if(wc_current) wc_current.el_show = wc_enable;                                                           // Разрешения отображения группы столбцов (для данного РЦ) в таблице
		}
		if(at.type === "ev" && at.wc_id === wc_id) {
			ev_id = at.id;
			ev_enable = at.el_enable;																																	// Разрешение текущего события запоминаем
			at.el_show = wc_enable;																																		// Отображение события в списке событий для выбора
			if(wc_current?.events) {
				ev_current = wc_current.events.find((tev, ind, arr) => (tev.PR_STRIP_TRACK_EVENT_ID === ev_id));     // ищем событие в объекте аттрибутов
				if(ev_current) ev_current.el_show = ev_enable;                                          // Разрешения отображения группы столбцов (для данного события) в таблице
			}

		}
		if(at.type === "at" && at.wc_id === wc_id && at.ev_id === ev_id) {
			at.el_show = wc_enable && ev_enable;																										// Отображение атрибута в списке событий для выбора
			if(ev_current?.attr) {
				at_current = ev_current.attr.find((tat, ind, arr) => (tat.PR_ATTR_ID === at.id));     								// ищем атрибут в объекте аттрибутов
				if(at_current) at_current.el_show = at.el_enable;                                          // Разрешения отображения группы столбцов (для данного события) в таблице
			}
		}
	});

	// console.log("selAttr.value= ", selAttr.value);
	console.log("selAttr: techOpAttr.value= ", techOpAttr.value);

};



// ********************************
// Действия по кнопке "обновить"
// Запрос данных с сервера для режима просмотра

function btnRefresh()  {

	refreshTechOpData();
};


/**
 * Обновление данных
 */
async function refreshTechOpData() {
//  console.log("Обновление даенных");
	loadDataTechOp();
};



// поиск выбранной строки для перехода на другой экран. Пока не запариваемся на то, есть ли она на текущей странице
function find_select_row(rows) {
	if(rows?.length > 0) {
		return rows.find((row, ind, arr) => (row.screen_select === true && row.hidden_row === false)); 
	}
	return null;
}

// // *********************************
// // действия по выбору временного интервала радиокнопками
// function selTimrInterval(value, evt)  {
// 	if( MyFilter.value.filtDateBeg && moment(MyFilter.value.filtDateBeg).isValid() ) {
// 		MyFilter.value.filtDateBeg = moment(MyFilter.value.filtDateBeg).startOf("hour").format(FORMAT_DATETIME_MINUTE);
// 		MyFilter.value.filtDateEnd = moment(MyFilter.value.filtDateBeg).add( value, "hours").format(FORMAT_DATETIME_MINUTE);
// 	}
// };


/**
 * проверка временных интервалов,
 */


// *********************************
// действия по выбору временного интервала радиокнопками
function selTimrInterval(value, evt) {
	console.log("selTimrInterval = ", value);

	if (MyFilter.value.filtDateEnd && moment(MyFilter.value.filtDateEnd).isValid()) {
		if (value == 1) {
			MyFilter.value.filtDateEnd = moment().startOf("hour").add(1, "hours").format(FORMAT_DATETIME_MINUTE);
			MyFilter.value.filtDateBeg = moment().startOf("hour").format(FORMAT_DATETIME_MINUTE);
		}
		if (value == 12) {
			if (moment().startOf("day").add(19, "hours").isBefore(moment())) {
				MyFilter.value.filtDateBeg = moment().startOf("day").add(19, "hours").format(FORMAT_DATETIME_MINUTE);
			} else {
				if (moment().startOf("day").add(7, "hours").isBefore(moment())) {
					MyFilter.value.filtDateBeg = moment().startOf("day").add(7, "hours").format(FORMAT_DATETIME_MINUTE);
				} else {
					MyFilter.value.filtDateBeg = moment().startOf("day").add(-5, "hours").format(FORMAT_DATETIME_MINUTE);
				}
			}
			MyFilter.value.filtDateEnd = moment(MyFilter.value.filtDateBeg).add(12, "hours").format(FORMAT_DATETIME_MINUTE);
		}
		if (value == 24) {
			if (moment().startOf("day").add(7, "hours").isBefore(moment())) {
				MyFilter.value.filtDateBeg = moment().startOf("day").add(7, "hours").format(FORMAT_DATETIME_MINUTE);
			} else {
				MyFilter.value.filtDateBeg = moment().startOf("day").add(-17, "hours").format(FORMAT_DATETIME_MINUTE);
			}
			MyFilter.value.filtDateEnd = moment(MyFilter.value.filtDateBeg).add(24, "hours").format(FORMAT_DATETIME_MINUTE);
		}
		DateBegEndChange();

	}
};

function TimrIntervalBw() {
	if (MyFilter.value.filtDateBeg && moment(MyFilter.value.filtDateBeg).isValid() && MyFilter.value.filtDateEnd && moment(MyFilter.value.filtDateEnd).isValid()) {
		if (+MyFilter.value.filtDateInterval == 1) {
			MyFilter.value.filtDateEnd = moment(MyFilter.value.filtDateEnd).add(-1, "hours").format(FORMAT_DATETIME_MINUTE);
			MyFilter.value.filtDateBeg = moment(MyFilter.value.filtDateBeg).add(-1, "hours").format(FORMAT_DATETIME_MINUTE);
		}
		if (+MyFilter.value.filtDateInterval == 12) {
			MyFilter.value.filtDateEnd = moment(MyFilter.value.filtDateEnd).add(-12, "hours").format(FORMAT_DATETIME_MINUTE);
			MyFilter.value.filtDateBeg = moment(MyFilter.value.filtDateBeg).add(-12, "hours").format(FORMAT_DATETIME_MINUTE);
		}
		if (+MyFilter.value.filtDateInterval == 24) {
			MyFilter.value.filtDateEnd = moment(MyFilter.value.filtDateEnd).add(-24, "hours").format(FORMAT_DATETIME_MINUTE);
			MyFilter.value.filtDateBeg = moment(MyFilter.value.filtDateBeg).add(-24, "hours").format(FORMAT_DATETIME_MINUTE);
		}
		DateBegEndChange();
	}
}

function TimrIntervalFw() {
	if (MyFilter.value.filtDateBeg && moment(MyFilter.value.filtDateBeg).isValid() && MyFilter.value.filtDateEnd && moment(MyFilter.value.filtDateEnd).isValid()) {
		if (+MyFilter.value.filtDateInterval == 1 || +MyFilter.value.filtDateInterval == 12 || +MyFilter.value.filtDateInterval == 24) {
			MyFilter.value.filtDateEnd = moment(MyFilter.value.filtDateEnd).add(+MyFilter.value.filtDateInterval, "hours").format(FORMAT_DATETIME_MINUTE);
			MyFilter.value.filtDateBeg = moment(MyFilter.value.filtDateBeg).add(+MyFilter.value.filtDateInterval, "hours").format(FORMAT_DATETIME_MINUTE);
		}
		DateBegEndChange();
	}
}


function DateBegEndChange() {
	
	// Новое значение интервала в фильтрах
	if( MyFilter.value.filtDateBeg && moment(MyFilter.value.filtDateBeg).isValid() && MyFilter.value.filtDateEnd && moment(MyFilter.value.filtDateEnd).isValid())    {
		// console.log('!!!! выход за рамки DateBeg')
		MyFilter.value.filtDateInterval = moment(MyFilter.value.filtDateEnd).diff(MyFilter.value.filtDateBeg, 'hours').toString();
	} 
	MyFilterChange();
};


/**
 * Расчёт количества видимых колонок для одного РЦ
 * @param {*} wc 
 */
function wcColspan(wc) {
	let colspan = 0;
	if(wc?.events) {
		wc.events.forEach((ev) => {
			if(ev.el_show) {
				colspan += evColspan(ev);
			} else 
			colspan += 1;
		});
	}
	return colspan;
}

/**
 *  Расчёт количества видимых колонок для одного события
 * @param {*} ev 
 */
function evColspan(ev) {
	let colspan = 1;  // Время события будет всегда
	if(ev?.attr) {
		ev.attr.forEach((at) => {
			if(at.el_show && ev.el_show) colspan++;
		});
	}
	return colspan;
}



/**
 * Поиск времени события в строке row по заданным РЦ (wc) и событию (ev)
 * @param {*} wc 
 * @param {*} ev 
 * @param {*} row 
 */
function eventTime(wc, ev, row) {
  if( row?.wcs && wc && ev)  {
    let event_time = row.wcs.find((rwc, ind, arr) => (rwc.PR_STRIP_POSITION_ID === wc.PR_STRIP_POSITION_ID))?.events?.find((rev, ind, arr) => (rev.PR_STRIP_TRACK_EVENT_ID === ev.PR_STRIP_TRACK_EVENT_ID))?.EVENT_TIME;    
	  return  event_time ? moment(event_time).format(FORMAT_DATETIME_SEC) : "";        
	}
	return  "";
}


/**
 * Поиск значения аттрибута в строке row по заданным РЦ (wc) и событию (ev) и атрибуту (at)
 * @param {*} wc рабочий центр (объект)
 * @param {*} ev событие (объект)
 * @param {*} at атрибут (объект)
 * @param {*} row строка
 * @returns Строка для вывода в таблицу
 */
function attrValue(wc, ev, at, row) {
  const PROC_NAME = 'attrValue> ';

  // if( row?.wcs && wc && ev && at)  {
  //   let attr_value = row.wcs.find((rwc, ind, arr) => (rwc.PR_STRIP_POSITION_ID === wc.PR_STRIP_POSITION_ID))?.events?.find((rev, ind, arr) => (rev.PR_STRIP_TRACK_EVENT_ID === ev.PR_STRIP_TRACK_EVENT_ID))?.attr?.find((rat, ind, arr) => (rat.PR_ATTR_ID === at.PR_ATTR_ID))?.ATTR_VALUE;    
  //   return  attr_value ? attr_value : "";        
  // }
  // return  "";
  if (row?.wcs && wc && ev && at) {
    const attr = row.wcs.find((rwc, ind, arr) => (rwc.PR_STRIP_POSITION_ID === wc.PR_STRIP_POSITION_ID))?.events?.find((rev, ind, arr) => (rev.PR_STRIP_TRACK_EVENT_ID === ev.PR_STRIP_TRACK_EVENT_ID))?.attr?.find((rat, ind, arr) => (rat.PR_ATTR_ID === at.PR_ATTR_ID));
    if (attr) {

			// Проверка на строку с дефектами АУЗК
			if (attr.ATTR_NAME === 'AUZK_DEFECT' && attr.ATTR_VALUE === 'ARRAY') {   // Там, где именно есть значение
				return ATTR_ARRAY_NAME;
			}
			// числовые "хорошие"
      if (attr.IS_NUMBER && attr.VIEW_PRECISION !== null && attr.ATTR_VALUE !== null) {   // Для числовых (хороших)
        return !isNaN(attr.ATTR_VALUE) ? numberFormatter(attr.ATTR_VALUE, attr.VIEW_PRECISION) : (attr.ATTR_VALUE !== null ? attr.ATTR_VALUE : "");
      }

			// Даты
      if (attr.ATTR_NAME.endsWith('TIME')) return (new Date(attr.ATTR_VALUE)).toLocaleString();
      // if (attr.ATTR_NAME === 'AUZK_DEFECT') return `<a @click="showDefects()">${attr.ATTR_VALUE !== null ? attr.ATTR_VALUE : ""}</a>`
      // if (attr.ATTR_NAME === 'AUZK_STATUS' && attr.ATTR_VALUE === 'REJECTED') console.log(PROC_NAME, wc, ev, at, row);//return `<a @click="showDefects()">REJECTED</a>`
      // if (attr.ATTR_NAME === 'AUZK_STATUS') console.log(PROC_NAME + 'wc:', wc, 'ev:', ev, 'at:', at, 'row:', row);//return `<a @click="showDefects()">REJECTED</a>`
      return attr.ATTR_VALUE !== null ? attr.ATTR_VALUE : "";                    // Для текстовых и "плохих" числовых
    }
  }
  return "";
}

/**
 * подстановка значения аттрибута для сортировки
 * @param {*} at атрибут (имя)
 * @returns значение аттрибута для сортировки
 */
function attrValueForSort(attr) {
  const PROC_NAME = 'attrValueForSort> ';
	if (attr) {

		// Проверка на строку с дефектами АУЗК
		if (attr.ATTR_NAME === 'AUZK_DEFECT' && attr.ATTR_VALUE === 'ARRAY') {   // Там, где именно есть значение
			return ATTR_ARRAY_NAME;
		}
		// числовые "хорошие"
		if (attr.IS_NUMBER && attr.VIEW_PRECISION !== null && attr.ATTR_VALUE !== null) {   // Для числовых (хороших)
			// return !isNaN(attr.ATTR_VALUE) ? numberFormatter(attr.ATTR_VALUE, attr.VIEW_PRECISION) : (attr.ATTR_VALUE !== null ? attr.ATTR_VALUE : "");
			return +attr.ATTR_VALUE;
		}

		// Даты
		if (attr.ATTR_NAME.endsWith('TIME')) return (new Date(attr.ATTR_VALUE)).toLocaleString();
		return attr.ATTR_VALUE !== null ? attr.ATTR_VALUE : "";                    // Для текстовых и "плохих" числовых
	}
  return "";
}






/**
 * Выгрузка данных ТО штрипсов в xlsx
 */
function BtnPrintStripTechOp(evt, go) {
  const PROC_NAME = 'exportTable> ';
  exportingData.value = true;
  setTimeout(() => {  // Пауза нужна, чтобы успела появиться анимация выгрузки данных
    try {
      const rows = refStripTechOpList.value.filteredSortedRows;    //, cols = refStripList.value.columns, colsv = refStripList.value.visibleColumns ;
      console.log(`${PROC_NAME}rows: `, rows);
      // console.log(`${PROC_NAME}cols: `, cols);
      // console.log(`${PROC_NAME}colsv: `, colsv);                              
                                 
      const table = Array();    
      const colsWidth = [];
			
			// строка 0
			let row_number = 0;   // строка
      if (!table[row_number]) table[row_number] = [];
      let col_number = 0;
      table[row_number][col_number] = "№ Штрипса";
			colsWidth[col_number] = { wch: Math.max(table[row_number][col_number].length + 3, 5) };
			col_number++;
      table[row_number][col_number] = "Задание";
			colsWidth[col_number] = { wch: Math.max(table[row_number][col_number].length + 3, 5) };
			col_number++;
      table[row_number][col_number] = "Партия";
			colsWidth[col_number] = { wch: Math.max(table[row_number][col_number].length + 3, 5) };
			col_number++;
      table[row_number][col_number] = "Плавка";
			colsWidth[col_number] = { wch: Math.max(table[row_number][col_number].length + 3, 5) };
			col_number++;
      table[row_number][col_number] = "Ширина (мм)";
			colsWidth[col_number] = { wch: Math.max(table[row_number][col_number].length + 3, 5) };
			col_number++;
      table[row_number][col_number] = "Толщина (мм)";
			colsWidth[col_number] = { wch: Math.max(table[row_number][col_number].length + 3, 5) };
			col_number++;
      table[row_number][col_number] = "Класс прочности";
			colsWidth[col_number] = { wch: Math.max(table[row_number][col_number].length + 3, 5) };
			col_number++;
      table[row_number][col_number] = "Марка стали";
			colsWidth[col_number] = { wch: Math.max(table[row_number][col_number].length + 3, 5) };
			col_number++;

			techOpAttr.value.forEach((wc, idx)=> {
				if(wc.el_show) {
					for(let ii = 0; ii < wcColspan(wc); ii++) {
						table[row_number][col_number] = `${wc.WC_AREA}.${wc.WC_NUMBER} ${wc.POSITION} (${wc.POSITION_CODE})`;
						col_number++;
					}
				}
    	});


			// строка 1
			row_number++;   // строка
      if (!table[row_number]) table[row_number] = [];
			col_number = 0;
      table[row_number][col_number] = "№ Штрипса";
			col_number++,
      table[row_number][col_number] = "Задание";
			col_number++;
      table[row_number][col_number] = "Партия";
			col_number++;
      table[row_number][col_number] = "Плавка";
			col_number++;
      table[row_number][col_number] = "Ширина (мм)";
			col_number++;
      table[row_number][col_number] = "Толщина (мм)";
			col_number++;
      table[row_number][col_number] = "Класс прочности";
			col_number++;
      table[row_number][col_number] = "Марка стали";
			col_number++;
			techOpAttr.value.forEach((wc, idx)=> {
				if(wc.el_show && wc.events?.length > 0) {
					wc.events.forEach((ev, idx_ev)=> {
						for(let ii = 0; ii < evColspan(ev); ii++) {
							table[row_number][col_number] = `${wc.WC_AREA}.${wc.WC_NUMBER} ${ev.EVENT}`;
							col_number++;
						}
					});
				}
    	});

			// строка 2
			row_number++;   // строка
      if (!table[row_number]) table[row_number] = [];
			col_number = 0;
      table[row_number][col_number] = "№ Штрипса";
			col_number++,
			table[row_number][col_number] = "Задание";
			col_number++;
      table[row_number][col_number] = "Партия";
			col_number++;
      table[row_number][col_number] = "Плавка";
			col_number++;
      table[row_number][col_number] = "Ширина (мм)";
			col_number++;
      table[row_number][col_number] = "Толщина (мм)";
			col_number++;
      table[row_number][col_number] = "Класс прочности";
			col_number++;
      table[row_number][col_number] = "Марка стали";
			col_number++;
			techOpAttr.value.forEach((wc, idx)=> {
				if(wc.el_show && wc.events?.length > 0) {
					wc.events.forEach((ev, idx_ev)=> {
						table[row_number][col_number] = "Время";
						colsWidth[col_number] = { wch: 15 };
						col_number++;
						if(ev.el_show && ev.attr?.length > 0) { 
							for(let i = 0; i < ev.attr.length; i++) {
								let at = ev.attr[i];
								if(at.el_show) {
									table[row_number][col_number] = `${at.ATTR_NAME_VIEW}${at.MEASURE_UNITS ? ' (' + at.MEASURE_UNITS+ ')' : ''}`;
									colsWidth[col_number] = { wch: Math.max(table[row_number][col_number].length + 3, 5) };
									col_number++;
								}
							}
						}
					});
				}
    	});

		  // теперь добавляем собственно тело

      for (let j = 0; j < rows.length; j++) {
				row_number++;   // строка
				if (!table[row_number]) table[row_number] = [];
				col_number = 0;
				// console.log(`rows[${j}].STRIP_NUMBER = `, rows[j].STRIP_NUMBER);
				table[row_number][col_number] = `${rows[j].STRIP_NUMBER}`;
				col_number++,
				table[row_number][col_number] = `${rows[j].JOB_CODE}`;
				col_number++,
				table[row_number][col_number] = `${rows[j].BATCH_NUMBER}`;
				col_number++,
				table[row_number][col_number] = `${rows[j].HEAT}`;
				col_number++,
				// table[row_number][col_number] = `${rows[j].WIDTH}`;
				table[row_number][col_number] = { t: 'n', v: parseFloat(rows[j].WIDTH), z: xlsx_precision_format(1), }
				col_number++,
				// table[row_number][col_number] = `${rows[j].THICK}`;
				table[row_number][col_number] = { t: 'n', v: parseFloat(rows[j].THICK), z: xlsx_precision_format(2), }
				col_number++,
				table[row_number][col_number] = `${rows[j].STRENGTH_CLASS ?? ''}`;
				col_number++,
				table[row_number][col_number] = `${rows[j].STEEL_GRADE ?? ''}`;
				col_number++,


				techOpAttr.value.forEach((wc, idx)=> {
					if(wc.el_show && wc.events?.length > 0) {
						wc.events.forEach((ev, idx_ev)=> {
							const x = eventTime(wc, ev, rows[j]);
							// table[row_number][col_number] = `${eventTime(wc, ev, rows[j])}`;
              table[row_number][col_number] = isDate(x) ? { t: 'd', v: moment(x).format(FORMAT_DATETIME_MINUTE), z: 'dd.mm.yyyy hh:mm' } : { t: 's', v: x ?? '', };
							// colsWidth[col_number] = { wch: 15 };
							col_number++;
							if(ev.el_show && ev.attr?.length > 0) { 
								for(let i = 0; i < ev.attr.length; i++) {
									let at = ev.attr[i];
									if(at.el_show) {
										const val = attrValue(wc, ev, at, rows[j]);
										// table[row_number][col_number] = `${attrValue(wc, ev, at, rows[j])}`;
										// table[row_number][col_number] = isDate(val) ? { t: 'd', v: new Date(val), z: 'dd.mm.yyyy hh:mm' } :	// дата/время - тип Datetime
											// c.name === 'timeUnix' ? { t: 'd', v: moment(x * 1000).toDate(), z: 'dd.mm.yyyy hh:mm' } :	// unix-время - кол-во секунд от 1970г.
												// (typeof val === 'number' || at.IS_NUMBER ) ? (at.IS_NUMBER ? { t: 'n', v: +val, z: xlsx_precision_format(at.VIEW_PRECISION), } : { t: 's', v: val ?? '', } ) :			// Значения  - числа
												  table[row_number][col_number] =  (typeof val === 'number' && at.IS_NUMBER) ? { t: 'n', v: parseFloat(val), z: xlsx_precision_format(at.VIEW_PRECISION), } :			// Значения  - числа
													{ t: 's', v: val ?? '', };			// Значения  - строки
										// colsWidth[col_number] = { wch: Math.max(table[row_number][col_number].length + 3, 5) };
										col_number++;
									}
								}
							}
						});
					}
				});

        // cols.forEach((c, j) => {
        //   if(colsv.find((cv, ind, arr) => (cv === c.name)))  {   // Если колонка видимая
        //     if (!table[i]) table[i] = [];
        //     const x =
        //       typeof c.field === 'function' ? c.field(rows[i - 1]) :		// Если функция (вычисление налету), выполняем эту ф-цию.
        //         rows[i - 1][c.field];

          //   table[i][col_number] =
          //     isDate(x) ? { t: 'd', v: new Date(x), z: 'dd.mm.yyyy hh:mm' } :	// дата/время - тип Datetime
          //       c.name === 'timeUnix' ? { t: 'd', v: moment(x * 1000).toDate(), z: 'dd.mm.yyyy hh:mm' } :	// unix-время - кол-во секунд от 1970г.
          //         typeof x === 'number' ? { t: 'n', v: x, z: xlsx_precision_format(c.xlsx_precision), } :			// Значения  - числа
          //           { t: 's', v: x ?? '', };			// Значения  - строки
          //   col_number++;
          // }

        // });
      }










      // console.log(`${PROC_NAME}table: `, table, colsWidth);
      // console.table(table);

      set_cptable(cptable);
      // const ws = utils.json_to_sheet(table)
      const ws = utils.aoa_to_sheet(table, { cellDates: true });
      // ws["!cols"] = cols.map(c => ({ wch: Math.max(c.label.length + 3, 5) }));  //[{}, {wpx: 140}];
      ws["!cols"] = colsWidth;

			if(!ws["!merges"]) ws["!merges"] = [];

      // table[row_number][col_number] = "Партия";
			// col_number++;
      // table[row_number][col_number] = "Плавка";
			// col_number++;
      // table[row_number][col_number] = "Ширина";
			// col_number++;
      // table[row_number][col_number] = "Толщина";


			// Объединение ячеек в заголовке

			let col0 = 0;
			ws["!merges"].push({ s: { r: 0, c: col0 }, 	e: { r: 2, c: col0 }  	});   //  № Штрипса
			col0++;
			ws["!merges"].push({ s: { r: 0, c: col0 }, 	e: { r: 2, c: col0 }  	});   //  Задание
			col0++;
			ws["!merges"].push({ s: { r: 0, c: col0 }, 	e: { r: 2, c: col0 }  	});   //  Партия
			col0++;
			ws["!merges"].push({ s: { r: 0, c: col0 }, 	e: { r: 2, c: col0 }  	});   //  Плавка
			col0++;
			ws["!merges"].push({ s: { r: 0, c: col0 }, 	e: { r: 2, c: col0 }  	});   //  Ширина
			col0++;
			ws["!merges"].push({ s: { r: 0, c: col0 }, 	e: { r: 2, c: col0 }  	});   //  Толщина
			col0++;
			ws["!merges"].push({ s: { r: 0, c: col0 }, 	e: { r: 2, c: col0 }  	});   //  Класс прочности
			col0++;
			ws["!merges"].push({ s: { r: 0, c: col0 }, 	e: { r: 2, c: col0 }  	});   //  Марка стали
			col0++;
			// ws["!merges"].push({ s: { r: 0, c: 1 }, 	e: { r: 0, c: 1 }  	});
			// let col0 = 1;
			let col1 = col0;
			techOpAttr.value.forEach((wc, idx)=> {
								
				if(wc.el_show) {
					ws["!merges"].push({ s: { r: 0, c: col0 }, 	e: { r: 0, c: col0 + wcColspan(wc) - 1 } 	});  // 
					col0 += wcColspan(wc);
					if(wc.events?.length > 0) {
						wc.events.forEach((ev, idx_ev)=> {
							ws["!merges"].push({ s: { r: 1, c: col1 }, 	e: { r: 1, c: col1 + evColspan(ev) - 1 } 	});
							col1 += evColspan(ev);
						});
					}
				}

    	});



      const wb = utils.book_new();
      // console.log("WorkSheet: ", ws);
      // console.log("WorkBook: ", wb);
      utils.book_append_sheet(wb, ws, "Data");
      // const wb = utils.table_to_book(tableRef.value.$el.getElementsByTagName("TABLE")[0]);		// Работает! но выводит в файл, только то, что есть на экране.
      writeFileXLSX(wb, "stripTechOpList.xlsx");
    } catch (err) {
      console.error(`${PROC_NAME}ОШИБКА экспорта данных!!!`, err);
      // console.log($q);
      // $q.notify({
      //   message: 'Ошибка экспорта данных! \r\n' + err.message,
      //   color: 'negative',
      //   icon: 'warning'
      // })
			s_alert('Ошибка экспорта данных!', err.message ?? "");
    }
    finally {
      exportingData.value = false;
    }
  }, 100);
}



/**
 * Вычисление объекта для сохранения в истори фильтров
 */
 const paramsToSave = computed(() => {
	const PROC_NAME = "paramsToSave = computed> "
	// console.log("computed() !!!!!!!!!!!!!!!!! ");
	const save = {};
	for (let key in MyFilter.value ) save[key] = MyFilter.value[key];
	save.sel_attr = [];
	if(selAttr.value?.length > 0) {
		for (let i = 0; i < selAttr.value?.length; i++ ) {
			save.sel_attr.push({val: selAttr.value[i].val, enable: selAttr.value[i].el_enable,	});
		}
	}
	// console.log(PROC_NAME + "save= ", save);
	return JSON.stringify(save);
});


/**
* Установка фильтров по считанному из истории набору
*/
function setParamsFromStory() {
	const read = JSON.parse(MyPageSettings.value);
	for (let key in read ) 
		if(key !== "sel_attr")  MyFilter.value[key] = read[key];
	
	// подмешивание считанных из истории в выбор аттрибутов ТО
	if(read.sel_attr?.length > 0) {
		if(selAttr.value?.length > 0) {   // Если набор фильтров считан после того, как был произведён первый селект

			read.sel_attr.forEach(a => { 
				if( selAttr.value.find(aa => (aa.val === a.val)) )  selAttr.value.find(aa => (aa.val === a.val)).el_enable = a.enable;
			});
			selectAttrChange();   // произвести изменение в таблице (и в элементе выбора параметров - тоже)
		}
		selAttrFromStory.value = read.sel_attr;  // созраняем на всякий случай
	} else {
		selAttrFromStory.value = [];  // созраняем , чтоб было понятно, что в считанном ничего нет (обнулить предыдушее, если есть)
	}
	MyFilterChange();
	MyFilter.value.filtChange++;
};


/**
 * Проверка фильтров на предмет того, надо ли обновлять данные из БД
 */
function MyFilterChange() {

	const PROC_NAME = "MyFilterChange";
	let need = false;
  // Времена
	// Изменение времени имеет смысл только если режим использования временного интервала был включен и остался включен
	if( (MyFilter.value.filtWithDateInterval && MyFilterRemember.filtWithDateInterval )
		&& (MyFilter.value.filtDateBeg && moment(MyFilter.value.filtDateBeg).isValid() && MyFilterRemember.filtDateBeg && moment(MyFilterRemember.filtDateBeg).isValid()
		&& moment(MyFilterRemember.filtDateBeg).isAfter(moment(MyFilter.value.filtDateBeg)))
		|| (MyFilter.value.filtDateEnd && moment(MyFilter.value.filtDateEnd).isValid() && MyFilterRemember.filtDateEnd && moment(MyFilterRemember.filtDateEnd).isValid()
			&& moment(MyFilterRemember.filtDateEnd).isBefore(moment(MyFilter.value.filtDateEnd))))    {
		need = true;
	}

	

  // // Времена
	// if( (MyFilter.value.filtDateBeg && moment(MyFilter.value.filtDateBeg).isValid() && MyFilterRemember.filtDateBeg && moment(MyFilterRemember.filtDateBeg).isValid() 
	// 				&& moment(MyFilterRemember.filtDateBeg).isAfter(moment(MyFilter.value.filtDateBeg)))
	//     || (MyFilter.value.filtDateEnd && moment(MyFilter.value.filtDateEnd).isValid() && MyFilterRemember.filtDateEnd && moment(MyFilterRemember.filtDateEnd).isValid() 
	// 		    && moment(MyFilterRemember.filtDateEnd).isBefore(moment(MyFilter.value.filtDateEnd)) )   )    {

	// 	need = true;
	// }

	//  РЦ
	if((MyFilterRemember.filtPosition > 0 && MyFilter.value.filtPosition < 0) 
		|| (MyFilterRemember.filtPosition > 0 && MyFilter.value.filtPosition > 0 && MyFilterRemember.filtPosition !== MyFilter.value.filtPosition )) {
		need = true;
	}
		
	// Лимит
  if ( MyFilterRemember.filtLimit && MyFilter.value.filtLimit > MyFilterRemember.filtLimit)		need = true;			
	
	// Проверка фильтров по Номеру штрипса, Заданию, Партии и Плавке имеет смысл только если использование временного интервала не изменилось
	if( (MyFilter.value.filtWithDateInterval && MyFilterRemember.filtWithDateInterval ) || (!MyFilter.value.filtWithDateInterval && !MyFilterRemember.filtWithDateInterval )  ) {
		//  Номер штрипса
		if( MyFilterRemember.filtStripNumber.length > 0) {            // проверка только если запомнен фильтпр
			if( MyFilter.value.filtStripNumber.length === 0 ) {
				need = true;
			} else {
				if(MyFilter.value.filtStripNumber.indexOf(MyFilterRemember.filtStripNumber) < 0 )   need = true;
			}
		}
		// if( MyFilterRemember.filtStripNumber.length === 0 && MyFilter.value.filtStripNumber.length > 0 && MyFilterRemember.row_count_fact === REC_LIMIT )  need = true;
		if( MyFilterRemember.filtStripNumber !== MyFilter.value.filtStripNumber && MyFilterRemember.row_count_fact === MyFilterRemember.limit )  need = true;


		//  Код задания
		if( MyFilterRemember.filtJobCode.length > 0) {            // проверка только если запомнен фильтпр
			if( MyFilter.value.filtJobCode.length === 0 ) {
				need = true;
			} else {
				if(MyFilter.value.filtJobCode.indexOf(MyFilterRemember.filtJobCode) < 0 )   need = true;
			}
		}
		// if( MyFilterRemember.filtJobCode.length === 0 && MyFilter.value.filtJobCode.length > 0 && MyFilterRemember.row_count_fact === REC_LIMIT )  need = true;
		if( MyFilterRemember.filtJobCode !== MyFilter.value.filtJobCode && MyFilterRemember.row_count_fact === MyFilterRemember.limit )  need = true;

		//  Партия 
		if( MyFilterRemember.filtBatch.length > 0) {            // проверка только если запомнен фильтпр
			if( MyFilter.value.filtBatch.length === 0 ) {
				need = true;
			} else {
				if(MyFilter.value.filtBatch.indexOf(MyFilterRemember.filtBatch) < 0 )   need = true;
			}
		}
		// if( MyFilterRemember.filtBatch.length === 0 && MyFilter.value.filtBatch.length > 0 && MyFilterRemember.row_count_fact === REC_LIMIT )  need = true;
		if( MyFilterRemember.filtBatch !== MyFilter.value.filtBatch && MyFilterRemember.row_count_fact === MyFilterRemember.limit )  need = true;

		//  Плавка 
		if( MyFilterRemember.filtHeat.length > 0) {            // проверка только если запомнен фильтпр
			if( MyFilter.value.filtHeat.length === 0 ) {
				need = true;
			} else {
				if(MyFilter.value.filtHeat.indexOf(MyFilterRemember.filtHeat) < 0 )   need = true;
			}
		}
		// if( MyFilterRemember.filtHeat.length === 0 && MyFilter.value.filtHeat.length > 0 && MyFilterRemember.row_count_fact === REC_LIMIT )  need = true;
		if( MyFilterRemember.filtHeat !== MyFilter.value.filtHeat && MyFilterRemember.row_count_fact === MyFilterRemember.limit )  need = true;

	}
	// Изменение использования временного интервала
	// if(MyFilter.value.filtWithDateInterval !== MyFilterRemember.filtWithDateInterval)  need = true;
	if(!MyFilter.value.filtWithDateInterval && MyFilterRemember.filtWithDateInterval)  need = true;
	if(MyFilter.value.filtWithDateInterval && !MyFilterRemember.filtWithDateInterval && MyFilterRemember.row_count_fact === MyFilterRemember.limit)  need = true;

  // Изменение параметра "Тренды ср.знач."
	if(MyFilter.value.filtTrendAverage && !MyFilterRemember.filtTrendAverage)  need = true;

	btnLoadDataClass.value = need ?"btn-vmz1" : "btn-vmz";
	// console.log("btnLoadDataClass.value = ", btnLoadDataClass.value);
	// console.log("MyFilter.value.filtTypes	 = ", MyFilter.value.filtTypes);
	saveUrlParameters(MyFilter.value);
};




// Обработка фильтров
function MyFilterMethod(rows, terms, cols, getCellValue) {  
	
	// console.log('filter-method-terms= ', terms.filtStatus);

	if(rows?.length) {
		for(let i = 0; i< rows.length; i++) {
			if(terms.filtStripNumber && (rows[i].STRIP_NUMBER).indexOf(terms.filtStripNumber) < 0)   {rows[i].hidden_row = true;  continue;};
			if(terms.filtJobCode && (rows[i].JOB_CODE).indexOf(terms.filtJobCode) < 0)   {rows[i].hidden_row = true;  continue;};
			if(terms.filtHeat && (rows[i].HEAT).indexOf(terms.filtHeat) < 0)   {rows[i].hidden_row = true;  continue;};
			if(terms.filtBatch && (rows[i].BATCH_NUMBER).indexOf(terms.filtBatch) < 0)   {rows[i].hidden_row = true;  continue;};

			if(terms.filtWithDateInterval &&  terms.filtDateBeg && moment(terms.filtDateBeg).isValid()) {
				let cnt0 = 0;
				let cnt = 0;
				if(rows[i].wcs?.length > 0) {
					rows[i].wcs.forEach (w => {
						if(w.events?.length > 0) {
							w.events.forEach (e => {
								cnt0++;
								if(	moment(terms.filtDateBeg).isAfter(moment(e.EVENT_TIME)) )  cnt++;   // считаем события раньще начального времени
							});
						} 
					});
				}
				if(cnt0 && cnt === cnt0)   {rows[i].hidden_row = true;  continue;};
			}
			if(terms.filtWithDateInterval && terms.filtDateEnd && moment(terms.filtDateEnd).isValid()) {
				let cnt0 = 0;
				let cnt = 0;
				if(rows[i].wcs?.length > 0) {
					rows[i].wcs.forEach (w => {
						if(w.events?.length > 0) {
							w.events.forEach (e => {
								cnt0++;
								if(	moment(terms.filtDateEnd).isSameOrBefore(moment(e.EVENT_TIME)) )  cnt++;   // считаем события, не позднее конечного времени
							});
						} 
					});
				}
				if(cnt0 && cnt === cnt0)   {rows[i].hidden_row = true;  continue;};
			}

			if (!isNaN(parseFloat(terms.filtWidth)) && rows[i].WIDTH && ((rows[i].WIDTH < parseFloat(terms.filtWidth) - 1) || (rows[i].WIDTH > parseFloat(terms.filtWidth) + 1))) { rows[i].hidden_row = true; continue; };
			if (!isNaN(parseFloat(terms.filtThick)) && rows[i].THICK && ((rows[i].THICK < parseFloat(terms.filtThick) - 0.05) || (rows[i].THICK > parseFloat(terms.filtThick) + 0.05))) { rows[i].hidden_row = true; continue; };
			// if(terms.filtDateBeg && moment(terms.filtDateBeg).isValid() && moment(terms.filtDateBeg).isAfter(moment(rows[i].CREATE_DATE)) )  {rows[i].hidden_row = true;  continue;};
			// if(terms.filtDateEnd && moment(terms.filtDateEnd).isValid() && moment(terms.filtDateEnd).isSameOrBefore(moment(rows[i].CREATE_DATE)) )  {rows[i].hidden_row = true;  continue;};
			
			rows[i].hidden_row = false;
		}
	}
	// console.log('filter-method-rows= ', rows);

	return rows.filter(item => item.hidden_row === false) || [];
};


/**
 * создание строки формата для выгрузки числа в xlsx-файл по заданному количеству цифр после запятой (precision)
 */
function xlsx_precision_format(precision)  {
  let xlsx_format = "###";
  if(!isNaN(precision) && +precision >= 0 && +precision <= 10) {   // Ограничим на всякий случай
    xlsx_format = "# ##0";
    if(+precision > 0) {
      xlsx_format += ".";
      for( let i = 0; i < +precision; i++ )  xlsx_format += "0";
    }
  }
  return xlsx_format;
}


// // вызов обычного окна сообщения
// function s_alert(txt) {
// 	alert_text.value = txt;
// 	alert.value = true;
// }
// // вызов окна сообщения из confirm  (txt в объекте)
// function confirm_s_alert({ txt }) {
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
function s_loading(show_enable, txt) {
	if (show_enable) loading_label.value = txt;
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

function attrClick(wc, ev, at, row) {
	const PROC_NAME = 'attrClick> ';
	console.log(PROC_NAME + `НАЧАЛО (wc="${wc.POSITION_CODE}", ev="${ev.EVENT_CODE}", at="${at.ATTR_NAME}")`, row);
	// console.log(PROC_NAME + 'РЦ: wc=', wc);
	// console.log(PROC_NAME + 'Событие: ev=', ev);
	// console.log(PROC_NAME + 'Атрибут: at=', at);
	// console.log(PROC_NAME + 'Строка: row=', row);

	// if (at.ATTR_NAME === 'AUZK_STATUS' && attrValue(wc, ev, at, row) === 'REJECTED') {
	// if (at.ATTR_NAME === 'AUZK_STATUS') {
	if (at.ATTR_NAME === 'AUZK_DEFECT' && attrValue(wc, ev, at, row) === ATTR_ARRAY_NAME) {
		showDefects(wc, ev, at, row);
	}
}

function showDefects(wc, ev, at, row) {
	const PROC_NAME = 'showDefects> ';
	// console.log(PROC_NAME + 'НАЧАЛО (techOpId=' + techOpId + ')');
	console.log(`${PROC_NAME}НАЧАЛО (wc="${wc.PR_STRIP_POSITION_ID}", ev="${ev.PR_STRIP_TRACK_EVENT_ID}") `, row);
	const techopId = row.wcs.find((rwc, ind, arr) => (rwc.PR_STRIP_POSITION_ID === wc.PR_STRIP_POSITION_ID))?.events?.find((rev, ind, arr) => (rev.PR_STRIP_TRACK_EVENT_ID === ev.PR_STRIP_TRACK_EVENT_ID))?.PR_STRIP_TRACK_ID;
	console.log(PROC_NAME + 'techopId = ', techopId);

	if (techopId) {
		$q.dialog({
			component: UkDefects,
			componentProps: {
				techOpId: techopId,
				stripNumber: row.STRIP_NUMBER,
			}

		}).onOk(() => {
			console.log(PROC_NAME + 'onOk');
		})
	}
	// if(status === "REJECTED") { // Только для тех штрипсов, где обнаружены дефекты
	// 	// const attr = row.wcs.find((rwc, ind, arr) => (rwc.POSITION_CODE === 'SUST'))?.events?.find((rev, ind, arr) => (rev.EVENT_CODE === 'END'))?.PR_STRIP_TRACK_ID;
	// 	if(selectedRow?.wcs) {
	// 		const techOpId = selectedRow.wcs.find((rwc, ind, arr) => (rwc.POSITION_CODE === 'SUST'))?.events?.find((rev, ind, arr) => (rev.EVENT_CODE === 'END'))?.PR_STRIP_TRACK_ID;
	// 		$q.dialog({
	// 			component: UkDefects,
	// 			componentProps: {
	// 				// text: 'something',
	// 				// ...more..props...
	// 				techOpId: techOpId,
	// 				stripNumber: selectedRow.STRIP_NUMBER,
	// 			}

	// 		}).onOk(() => {
	// 			console.log(PROC_NAME + 'onOk');
	// 		})
	// 	}
	// }
}

// /**
//  * Сохранение параметров запрос в URL
//  */
// async function saveUrlParameters({ wc, d1, d2, limit }) {
//   const PROC_NAME = "saveUrlParameters> ";
//   console.log(`${PROC_NAME}router.currentRoute.value= `, router.currentRoute.value);
//   try {
//     await router.push({
//       query: Object.assign({}, router.currentRoute.value.query, {
//         wc: wc || '',
//         d1: d1 || '',
//         d2: d2 || '',
//         limit: limit || '',
//       }),
//     }, () => { });
// 		console.log(`${PROC_NAME}Сохранены параметры страницы в URL (wc=${wc}, d1='${d1}', d2='${d2}', limit=${limit})`);
//     // $q.notify({
//     //   message: 'Всё хорошо!!!!!!!!!!!!!!!!!!\r\n' + err.message,
//     //   color: 'negative',
//     //   icon: 'warning'
//     // });
//   } catch (err) {
//     console.error(`${PROC_NAME}ОШИБКА сохранения параметров страницы в URL!!!`, err);
//     // console.log($q);
//     $q.notify({
//       message: 'Ошибка сохранения параметров страницы в URL!\r\n' + err.message,
//       color: 'negative',
//       icon: 'warning'
//     })
//   }
// }


/**
 * Сохранение параметров запрос в URL
 */
async function saveUrlParameters(save_params) {
  const PROC_NAME = "saveUrlParameters> ";
  console.log(`${PROC_NAME}router.currentRoute.value= `, router.currentRoute.value);
  console.log(`${PROC_NAME}save_params= `, save_params);
	if(save_params) {
		try {
			await router.push({
				query: Object.assign({}, router.currentRoute.value.query, {
					wc								: save_params.filtPosition || '',
					d1								: save_params.filtDateBeg || '',
					d2								: save_params.filtDateEnd || '',
					withDateInterval	: save_params.filtWithDateInterval || '',
					stripNumber				: save_params.filtStripNumber || '',
					jobCode						: save_params.filtJobCode || '',
					batch							: save_params.filtBatch || '',
					heat							: save_params.filtHeat || '',
					width							:	save_params.filtWidth || '',
					thick							:	save_params.filtThick || '',
					trendAverage			: save_params.filtTrendAverage || '',
					limit							:	save_params.filtLimit || '',
				}),
			}, () => { });
			console.log(`${PROC_NAME}Сохранены параметры страницы в URL`);
		} catch (err) {
			console.error(`${PROC_NAME}ОШИБКА сохранения параметров страницы в URL!!!`, err);
			// console.log($q);
			// $q.notify({
			// 	message: 'Ошибка сохранения параметров страницы в URL!\r\n' + err.message,
			// 	color: 'negative',
			// 	icon: 'warning'
			// })
			s_alert('Ошибка сохранения параметров страницы в URL!', err.message ?? "");
		}
	}

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

.col_no_move
	position: sticky
	left: 0
	z-index: 1
	border-right-width: 1px
	border-right-style: solid
	//style="border-right: 1px solid;"
	// background-color: #ffffff !important

.col_no_move_bg
	// background-color: $dark-page
	background-color: #ffffff
	//background-color: #ffffff !important

.col_no_move_bg-light
	background-color: #ffffff

.col_no_move_bg-dark
	background-color: $dark-page

.sel_item_all
	padding-left: 2px !important
	// margin-left: 2px !important
	background-color: rgba(0, 0, 0, 80%)
	color: white

.sel_item_wc
	padding-left: 2px !important
	// margin-left: 2px !important
	background-color: rgba(0, 0, 0, 60%)
	color: white

.sel_item_evrnt
	padding-left: 12px !important
	// margin-left: 12px !important
	background-color: rgba(0, 0, 0, 10%)

.sel_item_attr
	padding-left: 22px !important
	// margin-left: 22px !important



// 	.table-row-wc
// 	background-color: rgba(0, 0, 0, 60%)
// 	color: white
// 	font-weight: bold
// 	font-size: 10pt

// .table-row-event
// 	background-color: rgba(0, 0, 0, 10%)
// 	font-weight: bold
// 	font-size: 10pt


// .table-cell-hyperlink
// 	color: -webkit-link
// 	cursor: pointer
// 	text-decoration: underline

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
