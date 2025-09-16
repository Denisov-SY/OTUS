<template >

	<div>
		<div class="blockt "> <span class="pmx5"> {{ title_string }} </span></div>
		<!-- Блок Штрипсов -->
		<div class="row blockt-h100">
			<div class="col-12 pmy0">
				<div class="header pmy0">
					<p> Команды</p>
				</div>
				<div class="q-pa-sm q-gutter-sm pmy1">
					<q-btn no-caps class="btn-vmz" label="Обновить" @click="btnRefresh" title="Обновить. Чтение первоначального набора данных из БД с потерей несозранённых данных редактирования, если бало редактирование."/>
					<q-btn v-if="curr_props.action === ACTION_VIEW && rightsStrip.edit"  no-caps class="btn-vmz" label="Редактировать" :disable="EditStrip.source_l3 === 1 || editEnable" @click="btnEditEnable" title="Включить режим редактирования."/>
					<q-btn v-if="permission_save()" no-caps class="btn-vmz" label="Сохранить" :disable="EditStrip.source_l3 === 1 || !editEnable" @click="s_confirm(`Вы действительно хотите сохранить данные по ${curr_props.action === ACTION_VIEW ? 'редактируемому' : 'создаваемому'} Штрипсу?`, btnSaveStrip)" title="Сохранить данные после редактирования." />
					<q-btn no-caps class="btn-vmz" label="Отмена" :disable="EditStrip.source_l3 === 1 || !editEnable" @click="btnReturn" title="Отменить несохранённые изменения." />
					<q-btn no-caps class="btn-vmz" label="Печать" @click="() => {}" style="display: none;" title="Печать." />
				</div>
 

			</div>
		</div>

		<!-- блок ввода данных по штрипсу -->
		<div class="row pmy0">
			<div class="col-12 col-lg-6 pmy0">
				<div class="row blockt">
					<div class="col-12 pmy0">
						<div class="header pmy0">
							<p> Изменение Штрипса</p>
						</div>
						<div class="row pmy0">
							<div class="col-12 pmy1">
								<div class="border-silver">
									<div class="row pmy0">
										<div class="col-4 pmy0">
											<div class="row pmy1">
												<q-input v-model="EditStrip.stripNumber" :readonly="read_only() || act_view" outlined dense filled color="black" 
													 label="Номер Штрипса:" type="text"  style="width: 95%; " 
													:label-color="(read_only() || act_view) ? 'grey-3' : 'black'" :bg-color="(read_only() || act_view) ? 'grey-7' : 'white'"
                          :input-class="(read_only() || act_view) ? 'input1-read-only' : 'input1'" />
											</div>
										</div>
										<div class="col-5 pmy0">
											<div class="row pmy1">
												<q-select v-model="EditStrip.prStripStatusId" emit-value map-options outlined dense options-dense color="black" 
													:options="StatusList" option-label="stat" option-value="val" 
													label="Cтатус" style="width: 95%;" 
													:bg-color="read_only() ? 'grey-7' : 'white'" :label-color="read_only() ? 'grey-3' : 'black'" 
													:class="read_only() ? 'select1-read-only' : 'select1'"
													:readonly="read_only()" />
											</div>
										</div>
										<div class="col-3 pmy0">
											<div class="row pmy1">
												<span>
													Источник: <q-chip :color="EditStrip.source_l3 ? 'green' : 'yellow'" square >  <span style="color: black;"> {{ EditStrip.source_l3 ? 'L3' : "L2" }} </span> </q-chip>
												</span>
											</div>
										</div>
									</div>
									<div class="row pmy0">
										<div class="col-3 pmy0">
											<div class="row pmy1">
												<q-input v-model="EditStrip.width" :readonly="read_only()" outlined dense filled color="black" 
													label="Ширина (мм):" type="number" style="width: 95%;  "
													:label-color="read_only() ? 'grey-3' : 'black'" :bg-color="read_only() ? 'grey-7' : 'white'"
													:input-class="EditStrip.width < limit.strip.width.min || EditStrip.width > limit.strip.width.max ? 'input1-bad-limit' : read_only() ? 'input1-read-only' : 'input1'"
													:min="limit.strip.width.min" :max="limit.strip.width.max" />
											</div>
										</div>
										<div class="col-3 pmy0">
											<div class="row pmy1">
												<q-input v-model="EditStrip.thick" :readonly="read_only()" outlined dense filled color="black" 
													label="Толщина  (мм):" type="number" style="width: 95%; "
													:label-color="read_only() ? 'grey-3' : 'black'" :bg-color="read_only() ? 'grey-7' : 'white'"
													:input-class="EditStrip.thick < limit.strip.thick.min || EditStrip.thick > limit.strip.thick.max ? 'input1-bad-limit' : read_only() ? 'input1-read-only' : 'input1'"
													:min="limit.strip.thick.min" :max="limit.strip.thick.max" />
											</div>
										</div>
										<div class="col-3 pmy0">
											<div class="row pmy1">
												<q-input v-model="EditStrip.weight" :readonly="read_only()" outlined dense filled color="black" 
													label="Вес (кг):" type="number" style="width: 95%; "
													:label-color="read_only() ? 'grey-3' : 'black'" :bg-color="read_only() ? 'grey-7' : 'white'"
													:input-class="EditStrip.weight < limit.strip.weight.min || EditStrip.weight > limit.strip.weight.max ? 'input1-bad-limit' : read_only() ? 'input1-read-only' : 'input1'"
													:min="limit.strip.weight.min" :max="limit.strip.weight.max"/>
											</div>
										</div>
									</div>


									<div class="row pmy0">

										<div class="col-3 pmy0">
											<div class="row pmy1">
												<q-input v-model="EditStrip.jobCode" :readonly="read_only()" outlined dense filled color="black" 
													label="Код Задания:" type="text" style="width: 95%; "
													:label-color="read_only() ? 'grey-3' : 'black'" :bg-color="read_only() ? 'grey-7' : 'white'"
													:input-class="read_only() ? 'input1-read-only' : 'input1'" />
											</div>
										</div>
										<div class="col-3 pmy0">
											<div class="row pmy1">
												<q-input v-model="EditStrip.heat" :readonly="read_only()" outlined dense filled color="black" 
													label="Номер плавки:" type="text" style="width: 95%; "
													:label-color="read_only() ? 'grey-3' : 'black'" :bg-color="read_only() ? 'grey-7' : 'white'"
													:input-class="read_only() ? 'input1-read-only' : 'input1'" />
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- Таблица  аттрибутов штрипса-->
				<div class="row blockt">
					<div class="col-12 pmy0">
						<div class="header pmy0">
							<p> Параметры Штрипса</p>
						</div>
						<div class="row pmy0">
							<div class="col-12 pmy1">
								<q-table flat bordered _title="Аттрибуты" dense separator="cell" class="table-style-strip-attr" :rows="EditStrip.attr" :columns="columnsAttr"
									:visible-columns="visibleColumnsAttr" row-key="PR_ATTR_ID" :filter="{}" :filter-method="MyFilterMethodAttr" virtual-scroll :rows-per-page-options="[0]">
									<template v-slot:body="props">
										<q-tr :props="props" v-if="!(props.row.ATTR_NAME.indexOf('ATT_BATCH') >= 0)">
											<q-td>
												{{ props.row.index }}
											</q-td>
											<q-td :title="props.row.ATTR_NAME !== props.row.ATTR_NAME_VIEW ? props.row.ATTR_NAME : ''"
												:class="editEnable && props.row.readonly ? 'edit-attr-readonly' : ``">
												{{ props.row.ATTR_NAME_VIEW }}
											</q-td>

											<q-td>
												<input v-if="editEnable && !props.row.readonly && !props.row.SOURCE_L3 && !(props.row.map && props.row.map.length > 0)" outlined color="black" bg-color="white" :class="`input1-tbl${attr_class(props.row)}`"
													style="width: 80%" v-model="props.row.ATTR_VALUE" :type="props.row.IS_NUMBER ? 'number' : 'text'" 
													:min="(props.row.IS_NUMBER && props.row.VALUE_MIN) ? `${props.row.VALUE_MIN}` : ''" :max="(props.row.IS_NUMBER && props.row.VALUE_MAX) ? `${props.row.VALUE_MAX}` : ''"  
												/>
												<select v-if="editEnable && !props.row.readonly && !props.row.SOURCE_L3 && (props.row.map && props.row.map.length > 0)"  v-model="props.row.ATTR_VALUE" 
													style="width: 80%" color="black" bg-color="white" class="input1-tbl edit-attr-edit">
														<option value="">
															{{  }}
														</option>
														<option v-for="option in props.row.map" :value="option.TEXT_VALUE">
															{{ option.TEXT_VALUE }}
														</option>
												</select>
												<span v-if="!(editEnable && !props.row.readonly)" :class="editEnable && props.row.readonly ? 'edit-attr-readonly' : `${attr_class(props.row)}`"> {{props.row.ATTR_VALUE}} </span>
											</q-td>

											<q-td>
												{{ props.row.MEASURE_UNITS }}
											</q-td>
											<q-td>
                        {{ props.row.SOURCE_L3 === 1 ? 'L3' : 'L2' }}
                      </q-td>
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


			</div>
			<div class="col-12 col-lg-6 pmy0">
				<div class="row pmy0">
					<div class="col-12 pmy1">
						<div class="tabs pmy0">
							<div class="tab pmy0">
								<input type="radio" id="tab1" name="tab-group" checked />
								<label for="tab1" class="tab-title">Технологические параметры</label>
								<section class="tab-content pmy0">
									<div class="row pmy0">
										<div class="col-12 pmy1">
											<q-table flat bordered _title="Технологические параметры" dense separator="cell" class="table-style-strip-attr table-techop-mb" :rows="ParamsTO"
												:columns="columnsParamsTO" :visible-columns="visibleColumnsParamsTO" virtual-scroll :rows-per-page-options="[0]">
												<!-- v-model:pagination="pagination" -->
												<!-- :row-key="PR_ATTR_ID" -->
												<!-- :filter="MyFilter"
														:filter-method="MyFilterMethodAttr" -->
												<template v-slot:body="props">
													<q-tr :props="props" class="pmy0">
														<q-td colspan="100%">
															<!-- <div class="text-left">{{props.row.POSITION}} </div> -->
															<div class="text-left table-row-wc pmy0"><q-checkbox v-model="props.row.scr_show"
																	:label="`${props.row.WC_AREA}.${props.row.WC_NUMBER}  ${props.row.POSITION} (${props.row.POSITION_CODE})`" color="black" size="xs" /> </div>
														</q-td>
													</q-tr>
													<template v-if="props.row.scr_show">
														<template v-for="ev in props.row.events" :key="ev.EVENT">
															<q-tr :props="props">
																<q-td colspan="100%">
																	<!-- <div class="text-left">{{ev.EVENT}} </div> -->
																	<div class="text-left table-row-event"> <q-checkbox v-model="ev.scr_show"
																			:label="`${ev.EVENT} : ${moment(ev.EVENT_TIME).format(FORMAT_DATETIME_TBL)}`" color="black" size="xs" /> </div>
																</q-td>
															</q-tr>

															<template v-if="ev.scr_show">
																<q-tr :props="props" v-for="attr in ev.attr" :key="attr.PR_ATTR_ID">
																	<!-- :class="props.row.screen_select ? 'table-row-sel1' : ''" :onmousedown="(ev) => { console.log('props.row=', props.row); }" -->
																	<q-td> {{ attr.ATTR_NAME_VIEW }} </q-td>
																	<!-- <q-td> {{ attr.ATTR_VALUE }} </q-td> -->

																	<!-- <q-td v-if="!((attr.ATTR_NAME === 'AUZK_STATUS' && attr.ATTR_VALUE === 'REJECTED') || attr.ATTR_VALUE === 'TREND')" > {{ (attr.IS_NUMBER && attr.VIEW_PRECISION !== null && !isNaN(attr.ATTR_VALUE))? numberFormatter(attr.ATTR_VALUE, attr.VIEW_PRECISION) : (attr.ATTR_VALUE !== null ? attr.ATTR_VALUE : "")  }} </q-td> -->
																	<q-td v-if="(attr.ATTR_NAME === 'AUZK_STATUS' && attr.ATTR_VALUE === 'REJECTED')" class="table-cell-hyperlink" @click="showDefects(ev.PR_STRIP_TRACK_ID, EditStrip.stripNumber)" > {{  attr.ATTR_VALUE  }} </q-td>
                                  <!-- <q-td v-else-if="(attr.ATTR_VALUE === 'TREND')" class="table-cell-hyperlink" @click="s_confirm(`Вы действительно хотите перейти в экран трендов для просмотра графиков штрипса №${EditStrip.stripNumber}?`, GoTrend, {strip_id: EditStrip.prStripId, strip_number: EditStrip.stripNumber, wc_code: props.row.POSITION_CODE})"> {{  attr.ATTR_VALUE  }} </q-td> -->
                                  <q-td v-else-if="(attr.ATTR_VALUE === 'TREND')" class="table-cell-hyperlink">
																		<div>
																			<router-link dense flat :to="{ name: 'trend', query: { stripId: EditStrip.prStripId, stripNumber: EditStrip.stripNumber,  wcCode: props.row.POSITION_CODE, } }" > {{ attr.ATTR_VALUE }} </router-link>
																		</div>
                                  </q-td>
                                  <q-td v-else> {{ ToTable_showValue(attr) }} </q-td>
																	<!-- <q-td v-if="(attr.ATTR_VALUE === 'TREND')" class="table-cell-hyperlink" @click="s_confirm(`Вы действительно хотите перейти в экран трендов для просмотра графиков штрипса №${EditStrip.stripNumber}?`, GoTrend, {strip_id: this.stripId, strip_number: EditStrip.stripNumber, wc_code: props.row.POSITION_CODE})" > {{  attr.ATTR_VALUE  }} </q-td> -->
																	
                                  <!-- <q-td  > 
																		<span v-if="!(at.ATTR_NAME === 'AUZK_STATUS' && attrValue(wc, ev, at, props.row) === 'REJECTED')" > {{ attrValue(wc, ev, at, props.row) }} </span>
																		<a v-if="at.ATTR_NAME === 'AUZK_STATUS' && attrValue(wc, ev, at, props.row) === 'REJECTED'" class="table-cell-hyperlink" @click="showDefects(props.row, attrValue(wc, ev, at, props.row))"> {{ attrValue(wc, ev, at, props.row) }} </a>


																		{{ (attr.IS_NUMBER && attr.VIEW_PRECISION !== null && !isNaN(attr.ATTR_VALUE))? numberFormatter(attr.ATTR_VALUE, attr.VIEW_PRECISION) : (attr.ATTR_VALUE !== null ? attr.ATTR_VALUE : "")  }} 
																	</q-td> -->
																	<q-td> {{ attr.MEASURE_UNITS }} </q-td>
																</q-tr>
															</template>
														</template>
													</template>

												</template>
												<template v-slot:loading>
													<q-inner-loading showing />
												</template>
											</q-table>
										</div>
									</div>

								</section>
							</div>
							<div class="tab">
								<input type="radio" id="tab2" name="tab-group" />
								<label for="tab2" class="tab-title">Назначенные партии</label>
								<section class="tab-content pmy0">
									<div class="row pmy0">
										<div class="col-12 pmy1">
											<q-btn no-caps class="btn-vmz" label="Добавить партию" title="Добавление партии. Только в режимне редактирования Штрипса." :disable="!editEnable" @click="AddBatchRow" />
										</div>
									</div>
									<div class="row pmy0">
										<div class="col-12 pmy1">
											<!-- <q-table flat bordered _title="Назначенные партии" dense separator="cell" class="table-style-strip-attr table-techop-mb" :rows="Batches"
												:columns="columnsBatches" :visible-columns="visibleColumnsBatches" virtual-scroll :rows-per-page-options="[0]">
												<template v-slot:body="props">
													<q-tr :props="props">
														<q-td>
															<input v-if="props.row.edit_enable" v-model="props.row.BATCH_NUMBER" outlined color="black" bg-color="white" type="text" class="input1-tbl"
																style="width: 60%" />
															<span v-if="!props.row.edit_enable"> {{props.row.BATCH_NUMBER}} </span>
														</q-td>
														<q-td> {{ `${props.row.BATCH_NUMBER && (!isNaN(parseInt(props.row.BATCH_NUMBER))) ? (parseInt(props.row.BATCH_NUMBER) % 2 === 0 ? "ЛТО" : "Без ЛТО") :
															""}` }} </q-td>
														<q-td>
															<q-btn no-caps class="btn-tbl-vmz" size="xs" :label="props.row.edit_enable ? 'Сохранить' : 'Удалить'" @click="SaveBatchRow(props.row)" />
														</q-td>
													</q-tr>
												</template>
												<template v-slot:loading>
													<q-inner-loading showing />
												</template>
											</q-table> -->

											<q-table flat bordered _title="Назначенные партии" dense separator="cell" class="table-style-strip-attr " :rows="EditStrip.attr" :columns="columnsAttrBatches"
												:visible-columns="visibleColumnsAttrBatches" row-key="PR_ATTR_ID" :filter="{}" :filter-method="MyFilterMethodAttrBatch" :rows-per-page-options="[5, 10, 15, 20, 25, 40, 50, 0]" v-model:pagination="MyPagination">
												<template v-slot:body="props">
													<q-tr :props="props" v-if="(props.row.ATTR_NAME.indexOf('ATT_BATCH_LTT') >= 0)">
														<q-td>
															{{ props.row.index }}
														</q-td>
														<q-td :title="props.row.ATTR_NAME !== props.row.ATTR_NAME_VIEW ? props.row.ATTR_NAME : ''">
															{{ `${props.row.ATTR_NAME_VIEW} ( _VTT${props.row.ATTR_NAME_VIEW.substring(13)} )` }}
														</q-td>
														<q-td>
															<input v-if="editEnable && !props.row.SOURCE_L3" outlined color="black" bg-color="white" :class="`input1-tbl${attr_class(props.row)}`"
																style="width: 80%" v-model="props.row.ATTR_VALUE" type="number" 
																:min="(props.row.IS_NUMBER && props.row.VALUE_MIN) ? `${props.row.VALUE_MIN}` : ''" :max="(props.row.IS_NUMBER && props.row.VALUE_MAX) ? `${props.row.VALUE_MAX}` : ''"  
															/>
															<span v-if="!editEnable" :class="attr_class(props.row)"> {{props.row.ATTR_VALUE}} </span>
														</q-td>
														<q-td>
															{{ (props.row.ATTR_VALUE !== null && !isNaN(parseInt(props.row.ATTR_VALUE))) ? (parseInt(props.row.ATTR_VALUE) - 1).toString() : "" }}
														</q-td>
														<q-td>
															{{ props.row.SOURCE_L3 === 1 ? 'L3' : 'L2' }}
														</q-td>
													</q-tr>

												</template>
												<template v-slot:loading>
													<q-inner-loading showing />
												</template>
											</q-table>

										</div>
									</div>
								</section>
							</div>
							<div class="tab">
								<input type="radio" id="tab3" name="tab-group" @click="() => { EditStripId = stripId; console.log('+++++++1 EditStripId=', EditStripId); }" />
								<label for="tab3" class="tab-title">Произведённые трубы</label>
								<section class="tab-content">
									<div class="row pmy0">
									<!-- <q-btn no-caps class="btn-vmz" label="+"  @click="EditStripId++" /> -->
										<div class="col-12 pmy1">
											<!-- <pipe-list-c :strip-id="(action === ACTION_VIEW && EditStripId > 0) ? EditStripId : 0"  /> -->
											<pipe-list-c :strip-id="EditStripId"  />
											<!-- {{ `Id: ${this.stripId}` }} -->
										</div>
									</div>
								</section>
							</div>



						</div>
					</div>
				</div>
			</div>
		</div>


		<q-inner-loading :showing="loading" :label="loading_label" label-class="text-teal" label-style="font-size: 1.1em" />

	</div>


</template>

<script setup>
// defineOptions({
//   inheritAttrs: false
// });
import { ref, watch, computed, onMounted } from "vue";
import { QList, QItem, QItemSection, QToggle, useQuasar, QInput, QDialog, QCard } from "quasar";
// import { QInput as QInputB } from "quasar";

import moment from "moment";
// import 'moment/dist/locale/ru';
import router from "../../router";

// import access from "../../components/access";
import { loadData, sendData } from "../../components/serverData";
// import DatePicker from '../../components/DatePicker1.vue';

import { tracking as url, dictionary as dict } from "../../router/dataUrl";

import UkDefects from '../../components/UltrakraftDefects.vue'

import alertPro from '../../components/alertPro.vue'
import confirmPro from '../../components/confirmPro.vue';
import pipeListC from '../../components/Pipe/List.vue'

// Импорт разрешений для кадров "Штрипс" и "Список штрипсов".  rightsStrip - объект с разрешениями
import { storeToRefs } from 'pinia'
import { useAccessStore } from "../../stores/accessStore";
const accessStore = useAccessStore(); 
// const { rStrip, rStripNew, rStripEdit, rStripDel, rStripList,  rStripExcel } = storeToRefs(accessStore);
const { rightsStrip } = storeToRefs(accessStore);
// Конец - Импорт разрешений для кадров "Штрипс" и "Список штрипсов".

const $q = useQuasar();

const props = defineProps({
  // dateBeg: String,
  // dateEnd: String,
   stripId: Number,
   action: String,
});

const FORMAT_DATE = "DD.MM.YYYY"; 
const FORMAT_DATE_INPUT = "YYYY-MM-DD"; 
const FORMAT_DATETIME_TBL = "YYYY.MM.DD HH:mm:ss";

const ACTION_COPY = 'copy';
const ACTION_NEW = 'new';
const ACTION_EDIT = 'edit';
const ACTION_VIEW = 'view';

const STAT_DEFAULT = "ЗАПЛАНИРОВАН";

const SAVE_ACTION_NEW = 'N';
const SAVE_ACTION_UPD = 'U';
const SAVE_ACTION_DEL = 'D';

const title_string = ref("Новый Штрипс");
const act_view = ref(false);

// const MyFilter = ref({filtStrip: "",            /// Это здесь вообще не надо
// 											filtStatus: 0,
// 											filtDateBeg: moment().add(-30, "days").format(FORMAT_DATE_INPUT),
// 											filtDateEnd: moment().format(FORMAT_DATE_INPUT),
// 											});

const EditStrip = ref({   stripNumber: "",            
											prStripStatusId: null,
											width: 0,
											thick: 0,
											weight: 0,
											stripWeight: 0,
											jobCode: "",
											heat: "",
											steelGrade: "",
											source_l3: 0,
											attr:[],
											
											});

const Strip0 = {   		stripNumber: "",            // Для запоминания первоначальных данных штрипса
											prStripStatusId: null,
											width: 0,
											thick: 0,
											weight: 0,
											stripWeight: 0,
											jobCode: "",
											heat: "",
											steelGrade: "",
											source_l3: 0,
											attr:[],
											
											};



// const MyFilterRemember = {filtStrip: "", 
// 											filtStatus: "",
// 											filtDateBeg: moment().add(-30, "days").format(FORMAT_DATE_INPUT),
// 											filtDateEnd: moment().format(FORMAT_DATE_INPUT),
// 											};

// const btnLoadDataClass = ref("btn-vmz");

// const StatusList =ref([{val: 1, stat: "Новый",   },
// 													{val: 2, stat: "Выполняется",   },
// 													{val: 3, stat: "Старый",   },
// 													{val: 4, stat: "Выполнен",   },
// 													{val: 5, stat: "Закрыт",   },]);

const StatusList =ref([]);

const editEnable = ref(true);         // Разрешение редактирования

// const Strips = ref([]);

const ParamsTO = ref([]);

const EditStripId = ref(0);         // 
// const Strips = ref([]);

// Окна сообщения и подтверждения
// const alert = ref(false);             //  Для обычного окна сообщения
// const alert_text = ref("");
// const confirm = ref(false);						//  Для обычного окна подтверждения
// const confirm_text = ref("");
// const confirm_function = ref({});
// const confirm_function_arg = ref({});        //  Объект для передачи аргументов функции, которая будет описана в confirm_function
const loading = ref(false);
const loading_label = ref("");
const MyPagination = ref({ rowsPerPage: 15 });

// объекты формаимрования
const numberFormatterDig = [];

for(let i = 0; i < 10; i++)  numberFormatterDig[i] = new Intl.NumberFormat(undefined, { minimumFractionDigits: i });  // с запасом 0 до 10

// Это ещё проверить, понадобится ли
// function dateChange(newDate, newForce) {
// 	const PROC_NAME = "DayByHour.dateChange> "
// 	console.log(`${PROC_NAME}newDate = "${moment(newDate).format(FORMAT_DATE)}", force = "${newForce}"`);
// 	selectedDate.value = newDate;
// 	// loadHistProdForce.value = newForce;

// }



const columnsAttr = ref([
		{
		name: "index",
		required: true,
		label: "#",
		align: "center",
		field: (row) => row.index,
		format: (val) => `${val}`,
		sortable: true,
	},
	{
		name: "ATTR_NAME_VIEW",
		required: true,
		label: "Наименование",
		align: "left",
		field: (row) => row.ATTR_NAME_VIEW,
		format: (val) => `${val}`,
		sortable: true,
	},
	{ name: "PR_ATTR_ID", label: "PR_ATTR_ID", field: "PR_ATTR_ID" },
  { name: "ATTR_NAME", label: "ATTR_NAME", field: "ATTR_NAME" },
	
	{
		name: "ATTR_VALUE",
		required: true,
		label: "Значение",
		align: "center",
		field: "ATTR_VALUE",
		format: (val) => `${val}`,
		sortable: true,
	},
	{
		name: "MEASURE_UNITS",
		required: true,
		label: "Ед. изм.",
		align: "center",
		field: "MEASURE_UNITS",
		format: (val) => `${val !== null ? val : ""}`,
		sortable: true,
	},
	{
		name: "SOURCE_L3",
		required: true,
		label: "Источник",
		align: "center",
		field: "SOURCE_L3",
		format: (val) => `${val === 1 ? "L3" : "L2"}`,
		sortable: true,
	},
	
]);

const visibleColumnsAttr = ref(["idx", "ATTR_NAME_VIEW", "ATTR_VALUE", "MEASURE_UNITS", "SOURCE_L3",]);


const columnsAttrBatches = ref([
		{
		name: "index",
		required: true,
		label: "#",
		align: "center",
		field: (row) => row.index,
		format: (val) => `${val}`,
		sortable: true,
	},
	{
		name: "ATTR_NAME_VIEW",
		required: true,
		label: "Наименование",
		align: "left",
		field: (row) => row.ATTR_NAME_VIEW,
		format: (val) => `${val}`,
		sortable: true,
	},
	{ name: "PR_ATTR_ID", label: "PR_ATTR_ID", field: "PR_ATTR_ID" },
  { name: "ATTR_NAME", label: "ATTR_NAME", field: "ATTR_NAME" },
	
	{
		name: "ATTR_VALUE",
		required: true,
		label: "С ЛТО",
		align: "center",
		field: "ATTR_VALUE",
		format: (val) => `${val}`,
		sortable: true,
	},
	{
		name: "WITHOUT_LTO",
		required: true,
		label: "Без ЛТО",
		align: "center",
		field: "ATTR_VALUE",
		format: (val) => `${val !== null ? val : ""}`,
		sortable: true,
	},
	{
		name: "SOURCE_L3",
		required: true,
		label: "Источник",
		align: "center",
		field: "SOURCE_L3",
		format: (val) => `${val === 1 ? "L3" : "L2"}`,
		sortable: true,
	},
	
]);


const visibleColumnsAttrBatches = ref(["idx", "ATTR_NAME_VIEW", "ATTR_VALUE", "WITHOUT_LTO", "SOURCE_L3",]);
// const paginationAttr = ref({ rowsPerPage: 0 });

const columnsParamsTO = ref([
	{
		name: "ATTR_NAME_VIEW",
		required: true,
		label: "Наименование",
		align: "left",
		field: (row) => row.ATTR_NAME_VIEW,
		format: (val) => `${val}`,
		sortable: true,
	},
	{ name: "PR_ATTR_ID", label: "PR_ATTR_ID", field: "PR_ATTR_ID" },
	
	{
		name: "ATTR_VALUE",
		required: true,
		label: "Значение",
		align: "center",
		field: "ATTR_VALUE",
		format: (val) => `${val}`,
		sortable: true,
	},
	{
		name: "MEASURE_UNITS",
		required: true,
		label: "Ед. изм.",
		align: "center",
		field: "MEASURE_UNITS",
		format: (val) => `${val !== null ? val : ""}`,
		sortable: true,
	},

]);


// const paginationParamsTO = ref({ rowsPerPage: 0 });


// const visibleColumnsParamsTO = ref(["idx", "ATTR_NAME_RUS", "ATTR_VALUE", "MEASURE_UNITS", ]);
const visibleColumnsParamsTO = ref([ "ATTR_NAME_VIEW", "ATTR_VALUE", "MEASURE_UNITS", ]);


const Batches = ref([]);


/**
 * Отображаемые столбцы аттестационных партий
 */
// const visibleColumnsBatches = ref([ "BATCH_NUMBER", "LTO",  ]);

// const paginationBatches = ref({ rowsPerPage: 0 });


const limit = ref({ 
	strip: { weight : 	{ min: 10, max: 10000,},
					width: { min: 170, max: 600,},
					thick: 	{ min: 3, max: 12.7,},
			
	}
});

const load_data_ok = {strip: false, strip_status: false, attr: false, tech_op: false,}

const curr_props = { stripId: null,  action: null, }
// Стартовая  При загрузке кадра
onMounted(async () => {
	const PROC_NAME = "onMounted> ";
	console.log(`${PROC_NAME}Начало`);

	console.log(`${PROC_NAME}`, props);
	// console.log(`${PROC_NAME}`, props.dateBeg, props.dateEnd);

  const onMountedStripId = props?.stripId;
  const onMountedAction = props?.action;
	curr_props.stripId = props?.stripId;
	curr_props.action = props?.action;

	// EditStripId.value = props?.stripId || 0;

	loadDataFromDB();

  setTimeout(() => {
    console.log(PROC_NAME + 'setTimeout> ', props, onMountedStripId, onMountedAction);
    saveUrlParameters({ stripId: onMountedStripId, act: onMountedAction });
  }, 100);

});



/**
 * загрузка данных с сервера. Инициализация экрана
 */
async function loadDataFromDB() {
	s_loading(true, "Подождите, загружаются данные");
	loadDictionaryStripStatus();   // Загрузка справочника статусов штрипсов

	if(curr_props.stripId && curr_props.stripId > 0) {
		load_data_ok.strip = false;
		loadDataStripForId(curr_props.stripId);
		if(curr_props.action && curr_props.action === ACTION_VIEW) 		{
			title_string.value = "Просмотр данных Штрипса ";
			editEnable.value = false;       // Запрет режима редактирования
			loadDataTechOpForStripId(curr_props.stripId);  //Технологич. опрерации актуальны только для того штрипса, который уже есть (не для нового, или того, который создаётся копированием)
		} else {
			load_data_ok.tech_op = true;
		}

	} else {
		load_data_ok.strip = true;
		load_data_ok.tech_op = true;
	}

  // console.log("!!!!! load_data_ok = ", load_data_ok);
	if(curr_props.action && curr_props.action === ACTION_COPY) 		title_string.value = "Копирование Штрипса";

	if( curr_props.action === ACTION_NEW || !curr_props.action)  { 
		load_data_ok.attr = false;
		loadDataAttr();
	} else {
		load_data_ok.attr = true;
	}

	if(curr_props.action && curr_props.action === ACTION_VIEW)  {
		// edit_mode = curr_props.action;
		act_view.value = true;    // для запрета редактирования номера задания
	}

}
// };



async function loadDataStripForId(id) {    // Загрузка даннных по конкретно выбранному штрипсу
	load_data_ok.strip = false;
	const ret_strip = await loadData({ url: url.strip.get, params: {id: id,} });

	if(ret_strip?.error) {
		s_loading(false);
    // s_alert("При загрузке данных Штрипсов произошла ошибка. Повторите попытку позже." + (access.check('admin') ? '\n' + ret_strip.error.message : ''));
    s_alert("При загрузке данных Штрипсов произошла ошибка. Повторите попытку позже.", ret_strip.error.message ?? '');
		return;
	}


  if(ret_strip?.length === 0)  {
			s_alert("По заданным условиям не найдено данных");
	}



	console.log("ret_strip = ", ret_strip);
	// let batch = [];

  if(ret_strip?.PR_STRIP_ID > 0) {   // При поиске по id либо нашёл, либо нашёл, но только 1 запись
		// Присваиваем Значения основных параметров экранным элементам и запоминаем их
		EditStrip.value.prStripId 			= Strip0.prStripId 				= ret_strip.PR_STRIP_ID;
		EditStrip.value.stripNumber			= Strip0.stripNumber			= ret_strip.STRIP_NUMBER;
		EditStrip.value.prStripStatusId = Strip0.prStripStatusId 	= ret_strip.PR_STRIP_STATUS_ID;
		EditStrip.value.width 					= Strip0.width 						= ret_strip.WIDTH;
		EditStrip.value.thick						= Strip0.thick						= ret_strip.THICK;
		EditStrip.value.weight					= Strip0.weight						= ret_strip.WEIGHT;
		EditStrip.value.jobCode					= Strip0.jobCode					= ret_strip.JOB_CODE;
		EditStrip.value.heat						= Strip0.heat							= ret_strip.HEAT;
		EditStrip.value.steelGrade			= Strip0.steelGrade				= ret_strip.STEEL_GRADE;
		EditStrip.value.source_l3				= Strip0.source_l3				= curr_props.action === ACTION_COPY ? 0 : ret_strip.SOURCE_L3;

    // EditStrip.value.source_l3 = Strip0.source_l3 = ret_strip.SOURCE_ID;
    // EditStrip.value.readonly = Strip0.readonly = ret_strip.readonly;
		// EditStrip.value.createDate			= Strip0.createDate				= moment(ret_strip.CREATE_DATE).format(FORMAT_DATE_INPUT);

		if(ret_strip.attr) {
			// Сортировка, чтоб вынести неиспользуемые аттрибуты вниз таблицы
			ret_strip.attr.sort((a, b) => {
				if(a.PR_STRIP_ATTR_ID !== null && b.PR_STRIP_ATTR_ID === null) return -1;
				if(a.PR_STRIP_ATTR_ID === null && b.PR_STRIP_ATTR_ID !== null) return 1;
				return a.ATTR_NAME_VIEW - b.ATTR_NAME_VIEW;
			});
			// Запоминаем первоначальные значения аттрибутовl
			let idx_attr = 0;
			let idx_attr_batch = 0;
			Strip0.attr = ret_strip.attr.map((at, idx, arr) => { return { 
																									// index:					at.ATTR_NAME.indexOf("ATT_BATCH") >= 0 ? ++idx_attr_batch : ++idx_attr,
																									index:					at.ATTR_NAME.indexOf("ATT_BATCH_LTT") >= 0 ? ++idx_attr_batch : (at.ATTR_NAME.indexOf("ATT_BATCH_VTT") < 0 ? ++idx_attr : -1),
																									ATTR_NAME:			at.ATTR_NAME,
																									ATTR_NAME_RUS:	at.ATTR_NAME_RUS,
																									ATTR_NAME_VIEW:	at.ATTR_NAME_VIEW,
																									ATTR_VALUE:			at.ATTR_VALUE,
																									IS_NUMBER:			at.IS_NUMBER,
																									PR_ATTR_ID:			at.PR_ATTR_ID,
																									PR_STRIP_ATTR_ID:	at.PR_STRIP_ATTR_ID,
																									VIEW_PRECISION:	at.VIEW_PRECISION,
																									MEASURE_UNITS:	at.MEASURE_UNITS,
																									VALUE_MAX:			at.VALUE_MAX,
																									VALUE_MIN:			at.VALUE_MIN,
                                                  SOURCE_L3: 			curr_props.action === ACTION_COPY ? 0 : at.SOURCE_L3,
																									map:            at.ATTR_MAP, // ? JSON.parse(at.ATTR_MAP).map((a) => {return {NUMBER_VALUE: a.number_value, TEXT_VALUE: a.text_value,} }) : [], 
                                                  readonly: 			at.readonly,
																									att_show:       at.ATTR_NAME.indexOf("ATT_BATCH_LTT") >= 0 && at.PR_STRIP_ATTR_ID,
																							};});
			// Формируем таблицу данных аттрибутов
			idx_attr = 0;
			idx_attr_batch = 0;
			EditStrip.value.attr = ret_strip.attr.map((at, idx, arr) => { return { 
																									// index:					at.ATTR_NAME.indexOf("ATT_BATCH") >= 0 ? ++idx_attr_batch : ++idx_attr,
																									index:					at.ATTR_NAME.indexOf("ATT_BATCH_LTT") >= 0 ? ++idx_attr_batch : (at.ATTR_NAME.indexOf("ATT_BATCH_VTT") < 0 ? ++idx_attr : -1),
																									ATTR_NAME:			at.ATTR_NAME,
																									ATTR_NAME_RUS:	at.ATTR_NAME_RUS,
																									ATTR_NAME_VIEW:	at.ATTR_NAME_VIEW,
																									ATTR_VALUE:			at.ATTR_VALUE,
																									IS_NUMBER:			at.IS_NUMBER,
																									PR_ATTR_ID:			at.PR_ATTR_ID,
																									PR_STRIP_ATTR_ID:	at.PR_STRIP_ATTR_ID,
																									VIEW_PRECISION:	at.VIEW_PRECISION,
																									MEASURE_UNITS:	at.MEASURE_UNITS, 
																									VALUE_MAX:			at.VALUE_MAX,
																									VALUE_MIN:			at.VALUE_MIN,
                                                  SOURCE_L3: 			curr_props.action === ACTION_COPY ? 0 : at.SOURCE_L3,
																									map:            at.ATTR_MAP, // ? JSON.parse(at.ATTR_MAP).map((a) => {return {NUMBER_VALUE: a.number_value, TEXT_VALUE: a.text_value,} }) : [], 
																									// edit_enable:		!at.readonly,
                                                  readonly: 			at.readonly,
																									att_show:       at.ATTR_NAME.indexOf("ATT_BATCH_LTT") >= 0 && at.PR_STRIP_ATTR_ID,
																							};});

			base_limit_find(ret_strip.attr);

			// //  Заполнение отдельного массива партий.
			// ret_strip.attr.forEach((at) => {
			// 	if ((at.ATTR_NAME.indexOf("ATT_BATCH") >= 0) && (at.PR_STRIP_ATTR_ID)) {
			// 		batch.push({
			// 			BATCH_NUMBER: 		at.ATTR_VALUE,
			// 			PR_ATTR_ID:				at.PR_ATTR_ID,
			// 			PR_STRIP_ATTR_ID:	at.PR_STRIP_ATTR_ID,
			// 			// LTO:              (at.ATTR_VALUE &&  (!isNaN(parseInt(at.ATTR_VALUE))) ? (parseInt(at.ATTR_VALUE) % 2 === 0 ? "ЛТО" : "Без ЛТО") : ""),
			// 			// edit_enable:      false,
			// 			status:			 			"",
			// 			old:              true,
			// 		});
			// 	}
			// });

		}

		// console.log("batch = ", batch);
		// Batches.value = batch;
	} 
  
	// // Поишем отдельно назначенные партии 
  // console.log("batch = ", batch);
	// Batches.value = batch;


  if(curr_props.action && curr_props.action === ACTION_COPY)  {
		EditStrip.value.stripNumber = "";                // При копировании номер штрипса должен изментиться
	}
  load_data_ok.strip = true;
	load_data_check();
};


async function loadDataAttr() {    // Загрузка даннных справочника по аттрибутам штрипса (необходимо в том случае, если новый штрипс (не редактирование и не копия))
	load_data_ok.attr = false;
	const ret_attr = await loadData({ url: dict.attr.list, params: {attrTable: 'PR_STRIP', } });
	//const ret_attr = await loadData({ url: dict.attr.list, params: {attrTable: 'PR_STRIP', withoutAttBatch: true, } });

	if(ret_attr?.error) {
		s_loading(false);
		// s_alert("При загрузке данных атрибутов Штрипсов произошла ошибка. Повторите попытку позже");
		s_alert("При загрузке данных атрибутов Штрипсов произошла ошибка. Повторите попытку позже", ret_attr.error.message ?? "");
		return;
	}

	console.log("ret_attr = ", ret_attr);
 	// Если это явным образом новый штрипс, вводимый с нуля
	//  Заполняем массив аттрибутов для редактирования

		// Присваиваем Значения основных параметров экранным элементам и запоминаем их
		EditStrip.value.prStripId 			= Strip0.prStripId 				= -1;
		EditStrip.value.stripNumber			= Strip0.stripNumber			= "";
		// EditStrip.value.prStripStatusId = Strip0.prStripStatusId 	= null;  // устанавливается при загрузке справочника
		EditStrip.value.width 					= Strip0.width 						= 0;
		EditStrip.value.thick						= Strip0.thick						= 0;
		EditStrip.value.weight					= Strip0.weight						= 0;
		EditStrip.value.jobCode					= Strip0.jobCode					= "";
		EditStrip.value.heat						= Strip0.heat							= "";
		EditStrip.value.steelGrade			= Strip0.steelGrade				= "";
		EditStrip.value.source_l3				= Strip0.source_l3				=  0;
		// EditStrip.value.createDate			= Strip0.createDate				= moment(ret_strip.CREATE_DATE).format(FORMAT_DATE_INPUT);

		if(ret_attr?.length === 0)  {
    s_alert("Нет даных по списку аттрибутов");
  }

				


	if(ret_attr?.length > 0) {
		ret_attr.sort((a, b) => {	 return a.ATTR_NAME_VIEW - b.ATTR_NAME_VIEW;	});
		let idx_attr = 0;
		let idx_attr_batch = 0;
		Strip0.attr 					= ret_attr.map((at, idx, arr) => { return { 
																index:						at.ATTR_NAME.indexOf("ATT_BATCH_LTT") >= 0 ? ++idx_attr_batch : (at.ATTR_NAME.indexOf("ATT_BATCH_VTT") < 0 ? ++idx_attr : -1),
																ATTR_NAME:				at.ATTR_NAME,
																ATTR_NAME_RUS:		at.ATTR_NAME_RUS,
																ATTR_NAME_VIEW:		at.ATTR_NAME_VIEW,
																ATTR_VALUE:				null,
																IS_NUMBER:				at.IS_NUMBER,
																PR_ATTR_ID:				at.PR_ATTR_ID,
																PR_STRIP_ATTR_ID:	null,
																VIEW_PRECISION:		at.VIEW_PRECISION,
																MEASURE_UNITS:		at.MEASURE_UNITS, 
																SOURCE_L3:				0,
																VALUE_MAX:				at.VALUE_MAX,
																VALUE_MIN:				at.VALUE_MIN,
																map:            	at.map ? at.map.map((a) => {return {NUMBER_VALUE: a.NUMBER_VALUE, TEXT_VALUE: a.TEXT_VALUE,} }) : [], 
																// edit_enable:			true,
																readonly: 				at.readonly,
																att_show:       	false,
														};});
		idx_attr = 0;
		idx_attr_batch = 0;
		EditStrip.value.attr 	= ret_attr.map((at, idx, arr) => { return { 
																// index:						at.ATTR_NAME.indexOf("ATT_BATCH") >= 0 ? ++idx_attr_batch : ++idx_attr,
																index:						at.ATTR_NAME.indexOf("ATT_BATCH_LTT") >= 0 ? ++idx_attr_batch : (at.ATTR_NAME.indexOf("ATT_BATCH_VTT") < 0 ? ++idx_attr : -1),
																ATTR_NAME:				at.ATTR_NAME,
																ATTR_NAME_RUS:		at.ATTR_NAME_RUS,
																ATTR_NAME_VIEW:		at.ATTR_NAME_VIEW,
																ATTR_VALUE:				null,
																IS_NUMBER:				at.IS_NUMBER,
																PR_ATTR_ID:				at.PR_ATTR_ID,
																PR_STRIP_ATTR_ID:	null,
																VIEW_PRECISION:		at.VIEW_PRECISION,
																MEASURE_UNITS:		at.MEASURE_UNITS, 
																SOURCE_L3:				0,
																VALUE_MAX:				at.VALUE_MAX,
																VALUE_MIN:				at.VALUE_MIN,
																map:            	at.map ? at.map.map((a) => {return {NUMBER_VALUE: a.NUMBER_VALUE, TEXT_VALUE: a.TEXT_VALUE,} }) : [], 
																// edit_enable:			true,
																readonly: 				at.readonly,
																att_show:       	false,
														};});

		base_limit_find(ret_attr);											
	}
  load_data_ok.attr = true;
	load_data_check();
};


/**
 * Однозначные участники запрета редактирования для сокращения выражений в разметке
 */
function read_only() {
	return !editEnable.value || (EditStrip.value.source_l3 === 1) || !permission_save();;
};



/**
 * Добавление строки для ввода нового значения партии
 */
function AddBatchRow() {
	// Batches.value.push({
	// 				BATCH_NUMBER: 		0,
	// 				PR_ATTR_ID:				0,
	// 				PR_STRIP_ATTR_ID:	0,
	// 				// edit_enable:      true,
	// 				status:			 			SAVE_ACTION_NEW,
	// 				old:              false,
	// 			});
	s_alert(`Внимание!. Добавление партии является частью операции редактирования Штрипса. Сохранение изменений произойдёт при сохранении параметров Штрипса (кнопка "Сохранить").`);
	for(let i = 0; i < EditStrip.value.attr?.length; i++ ) 
		if(EditStrip.value.attr[i].ATTR_NAME.indexOf("ATT_BATCH_LTT") >= 0 && !EditStrip.value.attr[i].att_show) {
			EditStrip.value.attr[i].att_show = true;
			return;
		}
	s_alert("Лимит добавления партий на один Штрипс исчерпан");
};




/**
 * Загрузка данных ТО c текущим штрипсом
 * @param {Number} id id штрипса
 */
async function loadDataTechOpForStripId(id) {    // Загрузка даннных по конкретно выбранному штрипсу
	load_data_ok.tech_op = false;
	const ret = await loadData({ url: url.techOp.strip.get, params: {stripId: id,} });
	console.log("!!!! loadDataTechOpForStripId ret = ", ret);
	if(ret.error) {
		s_loading(false);
		// s_alert("При загрузке данных технологических операций произошла ошибка. Повторите попытку позже");
		s_alert("При загрузке данных технологических операций произошла ошибка. Повторите попытку позже", ret.error.message ?? "");
		return;
	}
  const ret_tecOp = ret[0]?.wcs || []; 
	
	
	console.log("ret_tecOp = ", ret_tecOp);
	ret_tecOp.forEach((wc) => {
	  wc.scr_show = true;
		if(wc.events) {
			wc.events.forEach((ev) => {
				ev.scr_show = false;
			});
		}
	});

	ParamsTO.value = ret_tecOp;

	load_data_ok.tech_op = true;
	load_data_check();
};



// *****************************
// Загрузка справочника статусов штрипсов
async function loadDictionaryStripStatus() {    // Загрузка даннных
	load_data_ok.strip_status = false;
	const ret_dict = await loadData({ url: dict.strip.status.list, params: {} });

	console.log("ret_dict = ", ret_dict);
 
	const stats = [];

	if(ret_dict.error) {
		s_loading(false);
		// s_alert("Загрузка данных справочника статусов Штрипсов произошла с ошибкой. Повторите попытку позже");
		s_alert("Загрузка данных справочника статусов Штрипсов произошла с ошибкой. Повторите попытку позже", ret_dict.error.message ?? "");
	} else {
		if(ret_dict?.length === 0)  {
			s_alert("По справочнику статусов Штрипсов не найдено данных");
		}
		if(ret_dict?.length > 0) 
			for(let i = 0; i < ret_dict.length; i++) {
				stats.push({val: ret_dict[i].PR_STATUS_ID, stat: ret_dict[i].STATUS_NAME,});
				if(ret_dict[i].STATUS_NAME === STAT_DEFAULT && !EditStrip.value.prStripStatusId)   
				{
					// Присваисаем по умолчанию, если пока нисчего не присвоено. Если данные подтянутся по конкретному штрипсу, затрётся.
					EditStrip.value.prStripStatusId = ret_dict[i].PR_STATUS_ID;
					Strip0.prStripStatusId = ret_dict[i].PR_STATUS_ID;
				}
			}
		load_data_ok.strip_status = true;
		load_data_check();

	}

	StatusList.value = stats;   // Временно для эксперимента
};


// ********************************
// Действия по записи-обновлению штрипса

/**
 * Действия по кнопке "Сохранить" Подготовка объекта для передачи его для записи в БД
 */
 async function btnSaveStrip()  {
	const strip = {};

	if(EditStrip.value.stripNumber.trim().length === 0 )  				{ s_alert("Не указан номер штрипса."); return; }
	if( isNaN(parseFloat( EditStrip.value.width)))  { { s_alert(`Некорректно указана Ширина.`); return; } }
	if( parseFloat( EditStrip.value.width) < limit.value.strip.width.min )  	{ s_alert(`Величина Ширины меньше допустимого значения (${limit.value.strip.width.min}).`); return; } 
	if( parseFloat( EditStrip.value.width) > limit.value.strip.width.max )  	{ s_alert(`Величина Ширины больше допустимого значения (${limit.value.strip.width.max}).`); return; } 
	if( isNaN(parseFloat( EditStrip.value.thick)))  { { s_alert(`Некорректно указана Толщина.`); return; } }
	if( parseFloat( EditStrip.value.thick) < limit.value.strip.thick.min )  	{ s_alert(`Величина Толщины меньше допустимого значения (${limit.value.strip.thick.min}).`); return; } 
	if( parseFloat( EditStrip.value.thick) > limit.value.strip.thick.max )  	{ s_alert(`Величина Толщины больше допустимого значения (${limit.value.strip.thick.max}).`); return; } 
	if( isNaN(parseFloat( EditStrip.value.weight)))  { { s_alert(`Некорректно указан Вес.`); return; } }
	if( parseFloat( EditStrip.value.weight) < limit.value.strip.weight.min )  	{ s_alert(`Величина Веса меньше допустимого значения (${limit.value.strip.weight.min}).`); return; } 
	if( parseFloat( EditStrip.value.weight) > limit.value.strip.weight.max )  	{ s_alert(`Величина Веса больше допустимого значения (${limit.value.strip.weight.max}).`); return; } 
	// if(EditStrip.value.steelGrade.trim().length === 0 )  				{ s_alert("Не указана марка стали штрипса."); return; }
	if(EditStrip.value.jobCode.trim().length === 0 )  				{ s_alert("Не указан номер (код) Задания для штрипса."); return; }
	if(EditStrip.value.heat.trim().length === 0 )  				{ s_alert("Не указан номер плавки для штрипса."); return; }

  if(EditStrip.value.attr?.length > 0) {   // проверка атрибутов (кроме номеров партий) 
		for(let i = 0; i < EditStrip.value.attr.length; i++ ) {
			if(!(EditStrip.value.attr[i].ATTR_NAME.indexOf('ATT_BATCH') >= 0) && EditStrip.value.attr[i].IS_NUMBER && EditStrip.value.attr[i].ATTR_VALUE !== null && EditStrip.value.attr[i].ATTR_VALUE.toString().trim().length > 0 && !EditStrip.value.attr[i].readonly && !(EditStrip.value.attr[i].map?.length > 0)) {   // Если атрибут числовой и он есть и он - не номер партии
					if( isNaN(parseFloat( EditStrip.value.attr[i].ATTR_VALUE)))  { { s_alert(`Некорректно указана величина для параметра "${EditStrip.value.attr[i].ATTR_NAME_VIEW}".`); return; } }
					if( EditStrip.value.attr[i].VALUE_MIN !== null && parseFloat( EditStrip.value.attr[i].ATTR_VALUE) < EditStrip.value.attr[i].VALUE_MIN )  { 
						{ s_alert(`Величина параметра "${EditStrip.value.attr[i].ATTR_NAME_VIEW}" меньше допустимого значения (${EditStrip.value.attr[i].VALUE_MIN }).`); return; } 
					}
					if( EditStrip.value.attr[i].VALUE_MAX !== null && parseFloat( EditStrip.value.attr[i].ATTR_VALUE) > EditStrip.value.attr[i].VALUE_MAX )  { 
						{ s_alert(`Величина параметра "${EditStrip.value.attr[i].ATTR_NAME_VIEW}" больше допустимого значения (${EditStrip.value.attr[i].VALUE_MAX }).`); return; } 
					}
			}
		}
	}

  if(EditStrip.value.attr?.length > 0) {   // проверка атрибутов (номеров партий) 
		for(let i = 0; i < EditStrip.value.attr.length; i++ ) {
			// if(EditStrip.value.attr[i].ATTR_NAME.indexOf('ATT_BATCH') >= 0 && EditStrip.value.attr[i].ATTR_VALUE !== null && EditStrip.value.attr[i].ATTR_VALUE.toString().trim().length > 0  && !(EditStrip.value.attr[i].map?.length > 0)) {   // Если атрибут есть и он - номер партии
			if(EditStrip.value.attr[i].ATTR_NAME.indexOf('ATT_BATCH_LTT') >= 0 && EditStrip.value.attr[i].ATTR_VALUE !== null && EditStrip.value.attr[i].ATTR_VALUE.toString().trim().length > 0  && !(EditStrip.value.attr[i].map?.length > 0)) {   // Если атрибут есть и он - номер партии
					if( isNaN(parseInt( EditStrip.value.attr[i].ATTR_VALUE)))  { { s_alert(`Некорректно указан номер партии "${EditStrip.value.attr[i].ATTR_NAME_VIEW}".`); return; } }
					if(/\D+/.test(EditStrip.value.attr[i].ATTR_VALUE))  { { s_alert(`Некорректно указан номер партии "${EditStrip.value.attr[i].ATTR_NAME_VIEW}".`); return; } }
					if( parseInt( EditStrip.value.attr[i].ATTR_VALUE) % 2 === 1)  { { s_alert(`Значение номера партии "${EditStrip.value.attr[i].ATTR_NAME_VIEW}" должно быть чётным (с ЛТО).`); return; } }
					if( EditStrip.value.attr[i].VALUE_MIN !== null && parseInt( EditStrip.value.attr[i].ATTR_VALUE) < EditStrip.value.attr[i].VALUE_MIN )  { 
						{ s_alert(`Величина номера партии "${EditStrip.value.attr[i].ATTR_NAME_VIEW}" меньше допустимого значения (${EditStrip.value.attr[i].VALUE_MIN }).`); return; } 
					}
					if( EditStrip.value.attr[i].VALUE_MAX !== null && parseInt( EditStrip.value.attr[i].ATTR_VALUE) > EditStrip.value.attr[i].VALUE_MAX )  { 
						{ s_alert(`Величина номера партии "${EditStrip.value.attr[i].ATTR_NAME_VIEW}" больше допустимого значения (${EditStrip.value.attr[i].VALUE_MAX }).`); return; } 
					}
					// console.log('REG EXP ', '"' + EditStrip.value.attr[i].ATTR_VALUE + '"', /\D+/.test(EditStrip.value.attr[i].ATTR_VALUE));
			}
		}
	}

	
	// Если изначально было действие по созданию нового штрипса (с нуля или копированием)
	// if(curr_props.action && (curr_props.action === ACTION_COPY || curr_props.action === ACTION_NEW)) {
	if (!curr_props.action || (curr_props.action === ACTION_COPY) || (curr_props.action === ACTION_NEW)) {

  	// Блок проверок
		// Создание 
		strip.PR_STRIP_ID = -1;
		strip.general = {
							STRIP_NUMBER:				EditStrip.value.stripNumber.trim(), 
							PR_STRIP_STATUS_ID: +(EditStrip.value.prStripStatusId),
							WIDTH: 							+(EditStrip.value.width),
							THICK: 							+(EditStrip.value.thick),
							WEIGHT: 						+(EditStrip.value.weight),
							JOB_CODE: 					EditStrip.value.jobCode.trim(),
							HEAT: 							EditStrip.value.heat.trim(),
							// STEEL_GRADE: 				EditStrip.value.steelGrade.trim(),
							};

		if( EditStrip.value.attr && EditStrip.value.attr.length > 0 )  { 
			EditStrip.value.attr.forEach((at, idx, arr) => {
				// if(at.ATTR_VALUE !== null && at.ATTR_NAME !== "WIDTH_ACTUAL" && at.ATTR_NAME !== "THICKNESS_ACTUAL" && at.ATTR_NAME !== "WEIGHT_ACTUAL") {
				if(at.ATTR_VALUE !== null && at.ATTR_NAME !== "WIDTH_ACTUAL" && at.ATTR_NAME !== "THICKNESS_ACTUAL" && at.ATTR_NAME !== "WEIGHT_ACTUAL" && at.ATTR_NAME.indexOf("ATT_BATCH_VTT") < 0) {
					if(!strip.attr) strip.attr = [];
					strip.attr.push({ ATTR_VALUE:			at.ATTR_VALUE.toString().trim(),
														PR_ATTR_ID:			at.PR_ATTR_ID,
														// action:         at.action === SAVE_ACTION_DEL ? SAVE_ACTION_DEL : SAVE_ACTION_UPD,
													});
					if(at.ATTR_NAME.indexOf("ATT_BATCH_LTT") >= 0)  {  // Если есть партия "С ЛТО" 
						// console.log("+------аттрибут:", at);				
						const vtt_id = arr.find(aarr => (aarr.ATTR_NAME === `ATT_BATCH_VTT${at.ATTR_NAME.substring(13)}`))?.PR_ATTR_ID;
						if( vtt_id )  {
							strip.attr.push({ ATTR_VALUE:			(+((at.ATTR_VALUE).toString().trim()) - 1).toString(),
																PR_ATTR_ID:			vtt_id,
							});
						}

					}
				  // if
				}
			});
		}

	}

	// Если было редактирование готового штрипса
	if(curr_props.action && curr_props.action === ACTION_VIEW ) {

  	// Блок проверок
		// Создание 


		strip.PR_STRIP_ID = curr_props.stripId ? curr_props.stripId : undefined;
		if( EditStrip.value.stripNumber.trim() !== Strip0.stripNumber ||
				EditStrip.value.prStripStatusId 	!== Strip0.prStripStatusId ||
				+(EditStrip.value.width) 					!== Strip0.width ||
				+(EditStrip.value.thick) 					!== Strip0.thick ||
				+(EditStrip.value.weight)		 			!== Strip0.weight ||
				EditStrip.value.jobCode.trim()						!== Strip0.jobCode ||
				// EditStrip.value.steelGrade.trim()			!== Strip0.steelGrade ||
				EditStrip.value.heat .trim()							!== Strip0.heat ) 								
		{	
			strip.general = {
						STRIP_NUMBER:				EditStrip.value.stripNumber.trim(), 
						PR_STRIP_STATUS_ID: +(EditStrip.value.prStripStatusId),
						WIDTH: 							+(EditStrip.value.width),
						THICK: 							+(EditStrip.value.thick),
						WEIGHT: 						+(EditStrip.value.weight),
						JOB_CODE: 					EditStrip.value.jobCode.trim(),
						HEAT: 							EditStrip.value.heat.trim(),
						// STEEL_GRADE: 				EditStrip.value.steelGrade,
						};
		}
		// "WIDTH_ACTUAL" || attr.ATTR_NAME === "THICKNESS_ACTUAL" || attr.ATTR_NAME === "WEIGHT_ACTUAL"
		EditStrip.value.attr.forEach((at, idx, arr) => {
			const strip0_attr = Strip0.attr.find((att) => (att.PR_ATTR_ID === at.PR_ATTR_ID ));
			// if(strip0_attr && at.ATTR_NAME !== "WIDTH_ACTUAL" && at.ATTR_NAME !== "THICKNESS_ACTUAL" && at.ATTR_NAME !== "WEIGHT_ACTUAL") {   //если найден такой же элемент и заодно обойдём посылку праметров, которые есть в general
			if(strip0_attr && at.ATTR_NAME !== "WIDTH_ACTUAL" && at.ATTR_NAME !== "THICKNESS_ACTUAL" && at.ATTR_NAME !== "WEIGHT_ACTUAL" && at.ATTR_NAME.indexOf("ATT_BATCH_VTT") < 0) {   //если найден такой же элемент и заодно обойдём посылку праметров, которые есть в general
				if(!(strip0_attr.ATTR_VALUE === null && at.ATTR_VALUE === null) && strip0_attr.ATTR_VALUE !== at.ATTR_VALUE.toString().trim())   {           // Если значение изменилось и параметр не удалён  или Если параметр удалён
					if(!strip.attr)  strip.attr = [];
					strip.attr.push({ PR_STRIP_ATTR_ID: at.PR_STRIP_ATTR_ID,
													...((at.ATTR_VALUE && at.ATTR_VALUE.toString().trim().length > 0) && { ATTR_VALUE: at.ATTR_VALUE.toString().trim() }),
													...((at.ATTR_VALUE && at.ATTR_VALUE.toString().trim().length > 0) && { PR_ATTR_ID: at.PR_ATTR_ID }),
												});
					if(at.ATTR_NAME.indexOf("ATT_BATCH_LTT") >= 0)  {  // Если изменилась партия "С ЛТО" 
						// console.log("+------аттрибут:", at);				
						const vtt = arr.find(aarr => (aarr.ATTR_NAME === `ATT_BATCH_VTT${at.ATTR_NAME.substring(13)}`));
						if( vtt && !(!vtt.PR_STRIP_ATTR_ID && !(at.ATTR_VALUE && at.ATTR_VALUE.toString().trim().length > 0)) )  {  // Избегаем попытки удаления несуществующего атрибута (нечётной партии из ранее введённых, где были только чётные)
							strip.attr.push({ PR_STRIP_ATTR_ID: vtt.PR_STRIP_ATTR_ID,
													...((at.ATTR_VALUE && at.ATTR_VALUE.toString().trim().length > 0) && { ATTR_VALUE: (+((at.ATTR_VALUE).toString().trim()) - 1).toString() }),
													...((at.ATTR_VALUE && at.ATTR_VALUE.toString().trim().length > 0) && { PR_ATTR_ID: vtt.PR_ATTR_ID }), 
							});
						}

					}
				} 
					
			} 
			// if(Strip0.attr.find((att, ind, arr) => (att.PR_ATTR_ID === at.PR_ATTR_ID ))) {   //если найден такой же элемент
			// 	if((Strip0.attr.find((att, ind, arr) => (att.PR_ATTR_ID === at.PR_ATTR_ID )).ATTR_VALUE !== at.ATTR_VALUE && !(at.action && at.action === SAVE_ACTION_DEL))  ||
			// 	(at.action && at.action === SAVE_ACTION_DEL))   {           // Если значение изменилось и параметр не удалён  или Если параметр удалён
			// 		if(!strip.attr)  strip.attr = [];
			// 		strip.attr.push({ ATTR_VALUE:			at.ATTR_VALUE,
			// 										PR_ATTR_ID:			at.PR_ATTR_ID,
			// 										PR_STRIP_ATTR_ID: at.PR_STRIP_ATTR_ID,
			// 										action:         at.action === SAVE_ACTION_DEL ? SAVE_ACTION_DEL : SAVE_ACTION_UPD,
			// 									});
			// 	} 

					
			// } else {  // Если в старом массиве не найдено, значит она новая
			// 		if(!strip.attr)  strip.attr = [];
			// 		strip.attr.push({ ATTR_VALUE:			at.ATTR_VALUE,
			// 										PR_ATTR_ID:			at.PR_ATTR_ID,
			// 										PR_STRIP_ATTR_ID: null,
			// 										action:         SAVE_ACTION_NEW,
			// 									});

			// }
			
		});




		if(!(strip.PR_STRIP_ID && strip.PR_STRIP_ID > 0 && (strip.general || strip.attr))) {    // Если при редактировании не были изменены основные параметры или аттрибуты
			s_alert("Нет изменившихся параметров для записи");
			return;
		}

	}

  // Собственно запись




	console.log("Подготовленный к отправке strip: ", strip);

	if(strip.PR_STRIP_ID && (strip.general || strip.attr)) {  // Если был сформирован объект strip для записи
		s_loading(true, "Подождите. Производится запись данных");
		const ret_save = await sendData({ url: url.strip.save, params: {strip: strip ,} });
		// обработка результата записи
		if(ret_save ) {
			console.log("ret_save= ", ret_save);
			// пока нет

			if(ret_save?.error) {
				s_loading(false);
				// s_alert("Запись данных произошла с ошибкой. Повторите попытку позже");
				s_alert("Запись данных произошла с ошибкой. Повторите попытку позже", ret_save.error.message ?? "");
			} else {
				if( ret_save !== false && typeof(ret_save) === "number")  {  // Операция прошла успешно
					// console.log("ret_save = ", ret_save);
					// console.log("typeof(ret_save) = ", typeof(ret_save));
					s_loading(false);
					s_alert(`Операция прошла успешно. Для продолжения редактирования шажмите кнопку "Редактировать"`);

					editEnable.value = false;              // Выходим из режима редактирования
					curr_props.stripId = ret_save;
					curr_props.action = ACTION_VIEW;
					loadDataFromDB(); 
					
				} else {
					s_loading(false);
					s_alert("Запись данных произошла с неопределённой ошибкой. Повторите попытку позже");
				}

				
				
				// loadAttr();    // Перечитываем справочник
			}
		}
	}
	// } else s_alert("Нет изменившихся параметров для записи");



};


// ********************************
// Действия по кнопке "Редактировать"
// Включенние режима редактирования, если он выключен (для режима просмотра задания)
function btnEditEnable() {
	if(curr_props.action === ACTION_VIEW && !editEnable.value)  {
		title_string.value = "редактирование существующего Штрипса";
		editEnable.value = true;
	} 

};

// ********************************
// Действия по кнопке "обновить"
// Запрос данных с сервера для режима просмотра

async function btnRefresh()  {
	// if(curr_props.action === ACTION_VIEW ) {
		if(editEnable.value) {
			s_confirm("При обновлении данных будут потеряны все несохранённые изменения. Продолжить?", refreshJobData)
			// confirm_text.value = "Обновление данных отменит все незаписанные изменения. Продолжить?"
			// confirm_function.value = refreshJobData;
			// confirm.value = true;
		} else {
			refreshJobData();
		}
		
	// }
};

async function refreshJobData() {
//  editEnable.value = false;
//  console.log("Обновление даенных");
 loadDataFromDB();
};


// ********************************
// Действия по кнопке "Отмена"
// возврат к данным первоначальной загрузки страницы

function btnReturn()  {

if(editEnable.value) {
	s_confirm("Отменить все несохранённые изменения?", returnJobData)
	// confirm_text.value = "Обновление данных отменит все незаписанные изменения. Продолжить?"
	// confirm_function.value = refreshJobData;
	// confirm.value = true;
} 

// }
};


function returnJobData() {
//  editEnable.value = false;
	console.log("Отмена");
	// EditStrip.value.prStripId 			= Strip0.prStripId 				= -1;
	EditStrip.value.stripNumber			= Strip0.stripNumber;
	EditStrip.value.prStripStatusId = Strip0.prStripStatusId;
	EditStrip.value.width 					= Strip0.width;
	EditStrip.value.thick						= Strip0.thick;
	EditStrip.value.weight					= Strip0.weight;
	EditStrip.value.jobCode					= Strip0.jobCode;
	EditStrip.value.heat						= Strip0.heat;
	EditStrip.value.steelGrade			= Strip0.steelGrade;
	EditStrip.value.attr = Strip0.attr.map((at, idx, arr) => { return { 
																									index:					 	at.idx,
																									ATTR_NAME:				at.ATTR_NAME,
																									ATTR_NAME_RUS:		at.ATTR_NAME_RUS,
																									ATTR_NAME_VIEW:		at.ATTR_NAME_VIEW,
																									ATTR_VALUE:				at.ATTR_VALUE,
																									IS_NUMBER:				at.IS_NUMBER,
																									PR_ATTR_ID:				at.PR_ATTR_ID,
																									PR_STRIP_ATTR_ID:	at.PR_STRIP_ATTR_ID,
																									VIEW_PRECISION:		at.VIEW_PRECISION,
																									MEASURE_UNITS:		at.MEASURE_UNITS, 
																									// edit_enable:			true, 
																									SOURCE_L3:				at.SOURCE_L3,
																									VALUE_MAX:				at.VALUE_MAX,
																									VALUE_MIN:				at.VALUE_MIN,
																									map:            	at.map ? at.map.map((a) => {return {NUMBER_VALUE: a.NUMBER_VALUE, TEXT_VALUE: a.TEXT_VALUE,} }) : [], 
																									readonly: 				at.readonly, 
																									att_show:					at.att_show,                          
																							};});

	if(curr_props.action && curr_props.action === ACTION_COPY)  {
		EditStrip.value.jobCode = "";                // При копировании номер задания должен изментиться
	}
	if(curr_props.action && curr_props.action === ACTION_VIEW) 		{
			title_string.value = "Просмотр Штрипса";
			editEnable.value = false;       // Запрет режима редактирования
	}
};


/**
 * Поиск лимитов базовых атрибутов задания
 * @param {*} attrs    массив атрибутов
 */
 function base_limit_find(attrs) {
	if(attrs?.length > 0) {
		let attr = attrs.find((a) => ( a.ATTR_NAME === "WEIGHT_ACTUAL"));  // диаметр
		if(attr) {
			if(attr.VALUE_MIN !== null && !isNaN(attr.VALUE_MIN))  limit.value.strip.weight.min = attr.VALUE_MIN;
			if(attr.VALUE_MAX !== null && !isNaN(attr.VALUE_MAX))  limit.value.strip.weight.max = attr.VALUE_MAX;
		}
		attr = attrs.find((a) => ( a.ATTR_NAME === "WIDTH_ACTUAL"));  // номинальная длина
		if(attr) {
			// console.log("attr = ", attr);
			if(attr.VALUE_MIN !== null && !isNaN(attr.VALUE_MIN))  limit.value.strip.width.min = attr.VALUE_MIN;
			if(attr.VALUE_MAX !== null && !isNaN(attr.VALUE_MAX))  limit.value.strip.width.max = attr.VALUE_MAX;
		}
		attr = attrs.find((a) => ( a.ATTR_NAME === "THICKNESS_ACTUAL"));  // толщина стенки
		if(attr) {
			if(attr.VALUE_MIN !== null && !isNaN(attr.VALUE_MIN))  limit.value.strip.thick.min = attr.VALUE_MIN;
			if(attr.VALUE_MAX !== null && !isNaN(attr.VALUE_MAX))  limit.value.strip.thick.max = attr.VALUE_MAX;
		}
		// console.log("limit.value.pipe.diam.min", limit.value.pipe.diam.min);
		// console.log("limit.value.pipe.diam.max", limit.value.pipe.diam.max);
		// console.log("limit.value.pipe.nLength.min", limit.value.pipe.nLength.min);
		// console.log("limit.value.pipe.nLength.max", limit.value.pipe.nLength.max);
		// console.log("limit.value.pipe.thick.min", limit.value.pipe.thick.min);
		// console.log("limit.value.pipe.thick.max", limit.value.pipe.thick.max);


	}
};


/**
 * Подстановка класа в аттрибуты зависимости от лимита 
 * @param {*} attr 
 */
 function attr_class(attr) {
	if(attr) {
		// if(!editEnable.value && attr.)
		if(attr.IS_NUMBER && !(attr.map?.length > 0) && attr.ATTR_VALUE !== null && !isNaN(parseFloat(attr.ATTR_VALUE))) {
			if(attr.VALUE_MIN !== null && !isNaN(attr.VALUE_MIN) && parseFloat(attr.ATTR_VALUE) < attr.VALUE_MIN )  return " edit-attr-bad-limit";
			if(attr.VALUE_MAX !== null && !isNaN(attr.VALUE_MAX) && parseFloat(attr.ATTR_VALUE) > attr.VALUE_MAX )  return " edit-attr-bad-limit";
		}
		return " edit-attr-edit"
	} 
	return "";
}



/**
 * Сохранение параметров запрос в URL
 */
async function saveUrlParameters({ stripId, act }) {
  const PROC_NAME = "saveUrlParameters> ";
  console.log(`${PROC_NAME}router.currentRoute.value= `, router.currentRoute.value);
  try {
    await router.push({
      query: Object.assign({}, router.currentRoute.value.query, {
        stripId: stripId || '',
        action: act || '',
      }),
    }, () => { });
    console.log(`${PROC_NAME}Сохранены параметры страницы в URL`);
  } catch (err) {
    console.error(`${PROC_NAME}ОШИБКА сохранения параметров страницы в URL!!!`, err);
    // console.log($q);
    // $q.notify({
    //   message: 'Ошибка сохранения параметров страницы в URL!\r\n' + err.message,
    //   color: 'negative',
    //   icon: 'warning'
    // })
		s_alert('Ошибка сохранения параметров страницы в URL!', err.message ?? "");
  }
}













// Эксперимент для будущей разработки
// let exp_wc_number = 0;
// function AddWc () {

// 	let wc = {};
// 	exp_wc_number++;
// 	wc.PR_STRIP_POSITION_ID = 999
// 	wc.WC_AREA              = 3
// 	wc.WC_NUMBER            = exp_wc_number;
// 	wc.POSITION_CODE        = `P_${exp_wc_number}`;
// 	wc.POSITION             = `РЦ_${exp_wc_number}`;
// 	wc.scr_show 						= true;
// 	wc.events               = [];
// 	let ev = {};
// 	ev.PR_STRIP_TRACK_ID       = 99999;
// 	ev.PR_STRIP_TRACK_EVENT_ID = 77777;
// 	ev.EVENT_CODE              = "";
// 	ev.EVENT                   = "начало";
// 	ev.EVENT_TIME              = moment();
// 	ev.scr_show 							 = false;
// 	ev.attr                    = [];
// 	ev.attr.push({
//                       PR_STRIP_TRACK_ATTR_ID  : 3,
//                       PR_ATTR_ID              : 3,
//                       ATTR_VALUE              : 345,
//                       ATTR_NAME_RUS           : "Атртрибут 1",
//                       IS_NUMBER               : 1,
//                       VIEW_PRECISION          : 0,
//                       MEASURE_UNITS           : "мм",
        
//                     }); 
// 	ev.attr.push({
//                       PR_STRIP_TRACK_ATTR_ID  : 3,
//                       PR_ATTR_ID              : 3,
//                       ATTR_VALUE              : "байпас",
//                       ATTR_NAME_RUS           : "Атртрибут 2",
//                       IS_NUMBER               : 1,
//                       VIEW_PRECISION          : 0,
//                       MEASURE_UNITS           : "",
        
//                     }); 
// 	wc.events.push(ev); 
// 	ev = {};
// 	ev.PR_STRIP_TRACK_ID       = 99999;
// 	ev.PR_STRIP_TRACK_EVENT_ID = 77777;
// 	ev.EVENT_CODE              = "";
// 	ev.EVENT                   = "конец";
// 	ev.EVENT_TIME              = moment();
// 	ev.scr_show 							 = false;
// 	ev.attr                    = [];
// 	ev.attr.push({
//                       PR_STRIP_TRACK_ATTR_ID  : 3,
//                       PR_ATTR_ID              : 3,
//                       ATTR_VALUE              : 346,
//                       ATTR_NAME_RUS           : "Атртрибут 1",
//                       IS_NUMBER               : 1,
//                       VIEW_PRECISION          : 0,
//                       MEASURE_UNITS           : "мм",
        
//                     }); 
// 	ev.attr.push({
//                       PR_STRIP_TRACK_ATTR_ID  : 3,
//                       PR_ATTR_ID              : 3,
//                       ATTR_VALUE              : "в работе",
//                       ATTR_NAME_RUS           : "Атртрибут 2",
//                       IS_NUMBER               : 1,
//                       VIEW_PRECISION          : 0,
//                       MEASURE_UNITS           : "",
        
//                     }); 
// 	wc.events.push(ev); 

// 	ParamsTO.value.push(wc);



// }



/**
 * Вызов всплывающего окна с дефектами АУЗК по id события (tech_op_id)
 */
function showDefects(tech_op_id, strip_number) {
	const PROC_NAME = 'showDefects> ';

	console.log(PROC_NAME + 'НАЧАЛО Дефекты АУЗК штрипса', strip_number);
	// console.log('selectedRow.STRIP_NUMBER = ', selectedRow.STRIP_NUMBER);

	if(tech_op_id && strip_number) { // 
			$q.dialog({
				component: UkDefects,
				componentProps: {

					techOpId: tech_op_id,
					stripNumber: strip_number,
				}

			}).onOk(() => {
				console.log(PROC_NAME + 'onOk');
			})

	}
}


/**
 * разрешение на кнопку "Сохранить"
 */
 function permission_save() {
 	// return (curr_props.action && (curr_props.action === ACTION_VIEW) && access.check(R_EDIT)) ||
	//  				((!curr_props.action || (curr_props.action === ACTION_NEW) || (curr_props.action === ACTION_COPY)) && access.check(R_NEW));
 	return (curr_props.action && (curr_props.action === ACTION_VIEW) && rightsStrip.value.edit) ||
	 				((!curr_props.action || (curr_props.action === ACTION_NEW) || (curr_props.action === ACTION_COPY)) && rightsStrip.value.new);
};


// /**
//  * переход в кадр Job для просмотра выбранного задания
//  */
// function GoTrend({strip_id, strip_number, wc_code}) {
//   // router.push({ name: 'trend', params: { props: { stripId: 777,   wcCode: "WCWC", } } });
//   router.push({ name: 'trend', query: { stripId: strip_id, stripNumber: strip_number,  wcCode: wc_code, } });
//   // router.push({ name: 'trend', params: { stripId: 777,   wcCode: "WCWC", } });
// 	// router.push({ name: 'trend', props: { stripId: 777,   wcCode: "WCWC", } });
//   // navigateToRouterLink(null, opts);
// }

function ToTable_showValue(attr){
  return attr.ATTR_MAP ?? ((attr.IS_NUMBER && attr.VIEW_PRECISION !== null && !isNaN(attr.ATTR_VALUE)) ? numberFormatter(attr.ATTR_VALUE, attr.VIEW_PRECISION) : (attr.ATTR_VALUE !== null ? attr.ATTR_VALUE : ""));
};


function MyFilterMethodAttr(rows, terms, cols, getCellValue) {
  return rows.filter(v => !(v.ATTR_NAME.indexOf('ATT_BATCH') >= 0) && (v.PR_STRIP_ATTR_ID || editEnable.value));
};

function MyFilterMethodAttrBatch(rows, terms, cols, getCellValue) {
  return rows.filter(v => (v.ATTR_NAME.indexOf('ATT_BATCH_LTT') >= 0) && (v.PR_STRIP_ATTR_ID || editEnable.value) && v.att_show);
};


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

/**
 * Проверка, загружено ли всё для отображеня на странице
 */
 function load_data_check() {
	let ok = true;
	for (let key in load_data_ok ) 
		if ( !load_data_ok[key] ) ok = false;

	if (ok)  s_loading (false);  // Загрузка окончена
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

</script>



<!-- <style lang="sass" scoped> -->

<style lang="sass" scoped>


.hidden-row 
	display: none


q-btn
	border: 0px !important

// .edit-attr-readonly
// 	font-style: italic
// 	color: dodgerblue

.edit-attr-edit
	font-weight: bold
	// color: black

.edit-attr-bad-limit
	font-weight: bold
	color: red

// .table-cell-hyperlink
// 	color: -webkit-link
// 	cursor: pointer
// 	text-decoration: underline

</style>


<style lang="sass">
.table-style-strip-attr

	// height: 450px

	// .q-table__top

	thead tr th
		color: #FFFFFF 
		border-color: #FFFFFF 
		text-align: center !important
		vertical-align: middle !important
		background-color: rgb(70, 69, 64) !important
		font-size: 10pt !important
		position: sticky !important
		z-index: 1  !important
		//color: #FFFFFF 
		//border-color: #FFFFFF 
		//text-align: center !important
		//vertical-align: middle !important
		//background-color: rgb(70, 69, 64) !important
		//font-size: 10pt !important
		
	tr td 
		text-align: center
		vertical-align: middle !important
		// color: #000000

	//tr th	
	//	position: sticky !important
	//	z-index: 5 !important





.table-row-wc
	background-color: rgba(0, 0, 0, 60%)
	color: white
	font-weight: bold
	font-size: 10pt

.table-row-event
	background-color: rgba(0, 0, 0, 10%)
	font-weight: bold
	font-size: 10pt
	// color: $blue-grey-1
	padding-left: 2rem


.h450
	height: 450px

.table-techop-height
	height: 597px

.table-techop-mb
	margin-bottom: -4px !important

.input-tbl
	outline: none  !important


.input2-tbl
	border: none  !important

.btn-tbl-vmz 
	background: $grey-3 !important
	border: 2px solid white !important
	margin-bottom: 0px !important
	margin-top: 0px !important
	padding-bottom: 0px !important
	padding-top: 0px !important
	font-size: 12px !important

</style>


<!--
<style scoped>
:deep(.input-box .q-field__control),
:deep(.input-box .q-field__marginal) {
  height: 14px;
  font-size: 14px;
}
</style>
-->


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
