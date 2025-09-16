<template>

  <div>
    <div class="blockt"><span class="pmx5">Список Штрипсов</span></div>
    <!-- Блок Кнопок команд -->
    <div class="row blockt-h100">
      <div class="col-12 pmy0">
        <div class="header pmy0">
          <span> Штрипсы</span>
        </div>
        <div class="q-pa-sm q-gutter-sm pmy1">
          <q-btn no-caps :class="`${LoadDataNeed ? 'btn-vmz1' : 'btn-vmz'}`" label="Обновить" @click="loadDataStrips"
            title="Обновить. Чтение данных из БД согласно заданного временного интервала и фильтров &quotПо номеру&quot, &quotПо партиям&quot и &quotПо Заданию&quot." />
          <q-btn v-if="rightsStrip.view" no-caps class="btn-vmz" label="Просмотр" :to="{ name: 'strip', query: { action: 'view', stripId: stripSelected[0]?.PR_STRIP_ID } }"
            :disable="!(stripSelected[0]?.PR_STRIP_ID > 0)" title="Просмотр подробной информации о Штрипсе в кадре &quotШтрипс&quot." />
          <q-btn v-if="rightsStrip.new" no-caps class="btn-vmz" label="Создать" :to="{ name: 'strip', query: { action: 'new', stripId: -1 } }"
            title="Переход в кадр &quotШтрипс&quot для создания нового Штрипса." />
          <q-btn v-if="rightsStrip.new" no-caps class="btn-vmz" label="Копировать" :to="{ name: 'strip', query: { action: 'copy', stripId: stripSelected[0]?.PR_STRIP_ID } }"
            :disable="!(stripSelected[0]?.PR_STRIP_ID > 0)" title="Переход в кадр &quotШтрипс&quot для создания нового Штрипса на основе выбранного из списка." />
          <q-btn v-if="rightsStrip.del" no-caps class="btn-vmz" label="Удалить" @click="BtnDelStrip" :disable="!(stripSelected[0]?.PR_STRIP_ID > 0)" title="Удаление выбранного Штрипса." />
          <q-btn v-if="rightsStrip.excel" no-caps class="btn-vmz" label="Excel" @click="BtnPrintStrip" :loading="exportingData" title="Выгрузка списка Штрипсов в Excel-файл." />
        </div>
      </div>
    </div>
    <!-- Блок фильтров -->
    <div class="row blockt-h100">
      <div class="col-12 pmy0">
        <div class="row header pmy0">
					<div class="col-6 pmy0">
						<div class="row pmy0">
							<span> Фильтры</span>
						</div>
          </div>
          <div class="col-6 pmy0 ">
            <div class="row float-right pmy0">
							<span> 
								<q-checkbox style="margin-top: -5px;" v-model="MyFilter.addFilters" label="Дополнительные фильтры" dark size="xs" />
								&nbsp;&nbsp;
							</span>
            </div>
          </div>
        </div>
        <!-- <div class="q-pa-sm q-gutter-sm row pmy1"> -->
        <div class="row pmy0">
          <!-- <div class="col-8 col-md-12  pmy0"> -->

          <div class="col-12 col-lg-7 pmy0">
            <div class="border-silver">
              <div class="row pmy0">
                <div class="col-12">
                  <div class="row pmy0">
                    <div class="col-7">
                      <div class="row pmy0">
                        <div class="col-6">
                          <div class="row pmy0">
                            <div class="col-12 pmy1 px5">
                              <q-input v-model="MyFilter.filtDateBeg" :disable="!MyFilter.filtWithDateInterval" outlined filled dense label="От" color="black"
                                :bg-color="MyFilter.filtWithDateInterval ? 'white' : 'grey-7'" type="datetime-local" input-class="input1 w-100"
                                @update:model-value="DateBegEndChange" />
                            </div>
                          </div>
                          <div class="row pmy0 pmy1 px5">
                            <div class="col-12">
                              <q-input v-model="MyFilter.filtDateEnd" :disable="!MyFilter.filtWithDateInterval" outlined filled dense label="До" color="black"
                                :bg-color="MyFilter.filtWithDateInterval ? 'white' : 'grey-7'" type="datetime-local" input-class="input1 w-100"
                                @update:model-value="DateBegEndChange" />
                            </div>
                          </div>
                        </div>
                        <div class="col-6">
                          <div class="row justify-center items-center pmy0">
                            <div class="pmy0 w-100">
                              <div class="row items-center px5">
                                <div class="col-sm-1" style="text-align: right;">
                                  <q-btn :disable="!MyFilter.filtWithDateInterval" color="dark" icon="chevron_left" @click="TimrIntervalBw" class="q-px-sm q-mx-xs"
                                    style="width: 100%;" />
                                </div>
                                <div class="col-sm-10" style="text-align: center;">
                                  <q-radio v-model="MyFilter.filtDateInterval" :disable="!MyFilter.filtWithDateInterval" val="1" label="Час" @update:model-value="selTimrInterval"
                                    size="xs" dark color="white" class="q-mr-sm pmy0" />
                                  <q-radio v-model="MyFilter.filtDateInterval" :disable="!MyFilter.filtWithDateInterval" val="12" label="Смена"
                                    @update:model-value="selTimrInterval" size="xs" dark color="white" class="q-mr-sm pmy0" />
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
                            <div class="col-12 my--1" style="padding-left: 55px">
                              <q-checkbox v-model="MyFilter.filtWithDateInterval" label="Фильтр времени" dark size="xs" @update:model-value="MyFilterChange" />
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-5">
                      <div class="row pmy0">
                        <div class="col-2 pmy1 px5">
                        </div>
                        <div class="col-5 pmy1 px5">
                          <q-input v-model="MyFilter.filtStripNumber" outlined filled dense color="black" bg-color="white" label-color="grey-7" label="По номеру:" type="text"
                            input-class="input1" @update:model-value="MyFilterChange" style="width: 100%;" />
                        </div>
                        <div class="col-5 pmy1 px5">
                          <q-input v-model="MyFilter.filtJobCode" outlined filled dense color="black" bg-color="white" label-color="grey-7" label="По Заданию" type="text"
                            input-class="input1" @update:model-value="MyFilterChange" style="width: 100%;" />
                        </div>
                      </div>
                      <div class="row pmy0">
                        <div class="col-2 pmy1 px5">
                        </div>
                        <div class="col-5 pmy1 px5">
                          <q-input v-model="MyFilter.filtBatch" outlined filled dense color="black" bg-color="white" label-color="grey-7" label="По партиям" type="text"
                            input-class="input1" @update:model-value="MyFilterChange" style="width: 100%;" />
                        </div>
                        <div class="col-5 pmy1 px5">
													<q-input v-model="MyFilter.filtHeat" outlined filled dense color="black" bg-color="white" label-color="grey-7" label="По плавке" type="text"
														input-class="input1" style="width: 100%;" @update:model-value="MyFilterChange" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="MyFilter.addFilters" class="col-9 col-lg-5 pmy0">
            <div class="border-silver">
              <div class="row pmy0">

                <!-- <div class="col-6"> -->
                <div class="col-12">
                  <div class="row pmy0">

                    <div class="col-3 pmy1 px5">
                      <!-- <q-input v-model="MyFilter.filtHeat" outlined filled dense color="black" bg-color="white" label-color="grey-7" label="По плавке" type="text"
                        input-class="input1" style="width: 100%;" @update:model-value="MyFilterChange" /> -->
                    </div>
                    <div class="col-3 pmy1 px5">
                      <q-input v-model="MyFilter.filtLastWc" outlined filled dense color="black" bg-color="white" label-color="grey-7" label="По РЦ:" type="text"
                        input-class="input1" style="width: 100%;" @update:model-value="MyFilterChange" />
                    </div>
                    <!-- </div>
										</div>
										<div class="col-6">
											<div class="row pmy0"> -->
                    <div class="col-6 pmy1 px5">
                      <q-select emit-value map-options outlined dense clearable options-dense color="black" bg-color="white" label-color="grey-7" v-model="MyFilter.filtStatus"
                        :options="StatusList" option-label="stat" option-value="stat" label="По статусу" class="input1" style="width: 100%;" :disable="false"
                        @update:model-value="MyFilterChange">
                        <template v-slot:option="scope">
                          <q-item v-bind="scope.itemProps">
                            <q-badge v-if="scope.opt.stat === 'ЗАПЛАНИРОВАН'" class="status-planned q-px-sm q-mx-xs" :label="scope.opt.stat" />
                            <q-badge v-else-if="scope.opt.stat === 'НАЗНАЧЕН'" class="status-assigned q-px-sm q-mx-xs" :label="scope.opt.stat" />
                            <q-badge v-else-if="scope.opt.stat === 'В ПРОИЗВОДСТВЕ'" class="status-in-prod q-px-sm q-mx-xs" :label="scope.opt.stat" />
                            <q-badge v-else-if="scope.opt.stat === 'ПРОИЗВЕДЁН'" class="status-produced q-px-sm q-mx-xs" :label="scope.opt.stat" />
                            <div v-else>{{ scope.opt.stat }}</div>
                          </q-item>
                        </template>
                      </q-select>
                      <!-- :options="StatusList" option-label="stat" option-value="val" label="По статусу" class="input2" style="width: 100%;" :disable="false" /> -->
                    </div>
                  </div>
                </div>



                <!-- <div class="col-3 pmy1 px5">
									<q-select emit-value map-options outlined dense options-dense color="black" bg-color="white" label-color=$grey-7" v-model="MyFilter.filtStatus"
										:options="filtStatusList" option-label="stat" option-value="val" label="По марке стали" class="input2" style="width: 100%;" :disable="false" />
								</div> -->


              </div>
              <div class="row pmy0">
                <div class="col-12">
                  <div class="row pmy0">

                    <div class="col-3 pmy1 px5">
                      <q-input v-model="MyFilter.filtWidth" outlined filled dense color="black" bg-color="white" label-color="grey-7" label="По ширине:" type="number"
                        title="Фильтр по ширине (+/- 1мм от введённой величины)" input-class="input1" @update:model-value="MyFilterChange" style="width: 100%;" />
                    </div>
                    <div class="col-3 pmy1 px5">
                      <q-input v-model="MyFilter.filtThick" outlined filled dense color="black" bg-color="white" label-color="grey-7" label="По толщине:" type="number"
                        title="Фильтр по толщине (+/- 0,05 мм от введённой величины)" input-class="input1" @update:model-value="MyFilterChange" style="width: 100%;" />
                    </div>
                    <div class="col-3 pmy1 px5">
                      <q-input v-model="MyFilter.filtWeightMin" outlined filled dense color="black" bg-color="white" label-color="grey-7" label="По мин. весу:" type="number"
                        title="Фильтр по минимальному весу (не менее, чем)" input-class="input1" @update:model-value="MyFilterChange" style="width: 100%;" />
                    </div>
                    <div class="col-3 pmy1 px5">
                      <q-input v-model="MyFilter.filtWeightMax" outlined filled dense color="black" bg-color="white" label-color="grey-7" label="По макс. весу:" type="number"
                        title="Фильтр по максимальному весу (не более, чем)" input-class="input1" @update:model-value="MyFilterChange" style="width: 100%;" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <!-- <div class="col-12 col-lg-6 pmy0">
						<div class="border-silver">
							<div class="row pmy0">
								<div class="col-12 col-md-7">
									<div class="row pmy0">
										<div class="col-6 pmy1 px5">

										</div>
										<div class="col-6 pmy1 px5">
											
										</div>
									</div>
								</div>
								<div class="col-12 col-md-5">

								</div>
							</div>
						</div>
					</div> -->

          <!-- <div class="col-4 col-md-8 pmy0"> -->
          <div class="col-12 col-lg-6 pmy0">

          </div>


        </div>

      </div>
    </div>


    <!-- Таблица -->
    <div class="row blockt-h100 strip-list-table">
      <div class="col-12 pmy0">
        <div class="row header pmy0">
					<div class="col-6 pmy0">
						<div class="row pmy0">
							<p> {{`Штрипсы - ` }}</p>
							<span> 
								<q-checkbox style="margin-top: -5px;" v-model="AutoRefresh" :label="`${AutoRefreshTxt}`" dark size="xs" />
							</span>
						</div>
          </div>
          <div class="col-6 pmy0 ">
            <div class="row float-right pmy0">
              <p > {{`${StripsReadLastTime ? 'Время обновления: ' + StripsReadLastTime.format(FORMAT_DATETIME_SEC) : ''}` }} &nbsp;&nbsp;</p>
            </div>
          </div>
          <!-- <p> Штрипсы</p> -->
        </div>
        <div class="row pmy1 pmx5">
          <!-- <div class="border-silver"> -->
          <div class="col-12 py-1">
            <q-table flat bordered _title="Штрипсы" dense separator="cell" class="table-style1" :rows="Strips" :columns="columns" :visible-columns="visibleColumns"
              row-key="PR_STRIP_ID" :filter="MyFilter" :filter-method="MyFilterMethod" @row-click="cellSelect" :rows-per-page-options="[5, 10, 15, 20, 25, 40, 50, 0]"
              
							v-model:pagination="MyPagination"
							selection="single" v-model:selected="stripSelected"
              :selected-rows-label="(num) => 'Выбран Штрипс: ' + stripSelected[0].STRIP_NUMBER" ref="refStripList">
							<!-- :pagination="{ rowsPerPage: 15 }"  -->
              <!-- :filteredSortedRows = "StipsFilteredSortedRows" -->
              <!-- @sorted="StipsIdxNew"
							@filtered="StipsIdxNew" -->
              <!-- <template v-slot:bottom>
									Bottom
								</template> -->
              <!-- <template v-slot:pagination="scope">
									<q-btn v-if="scope.pagesNumber > 2" icon="first_page" color="grey-8" round dense flat :disable="scope.isFirstPage" @click="scope.firstPage" />
									<q-btn icon="chevron_left" color="grey-8" round dense flat :disable="scope.isFirstPage" @click="scope.prevPage" />
									<q-btn icon="chevron_right" color="grey-8" round dense flat :disable="scope.isLastPage" @click="scope.nextPage" />
									<q-btn v-if="scope.pagesNumber > 2" icon="last_page" color="grey-8" round dense flat :disable="scope.isLastPage" @click="scope.lastPage" />
								</template> -->
              <!-- :rows-per-page-options="[50]" -->
              <!-- @row-click="(evt, row, index) => {
												Strips.forEach((item) => {
													item.screen_select = false;
												});
												row.screen_select = true;
											}" -->

              <!-- console.log('index=' + index + '; row=', row); -->
              <!-- :filter="filter"
									:filter-method="(rows, terms, cols, getCellValue) => {console.log('filter-method-rows= ', rows); return [];}" -->
              <!-- <template v-slot:header="props">

									<q-tr :props="props">
										<q-th rowspan="2"> Номер <br> штрипса </q-th>
										<q-th rowspan="2"> Статус </q-th>
										<q-th rowspan="2"> Номер <br> задания </q-th>
										<q-th rowspan="2"> Номер <br> плавки </q-th>
										<q-th colspan="2"> Ширина, м </q-th>
										<q-th colspan="2"> Толщина, м </q-th>
										<q-th colspan="2"> Вес, кг </q-th>
										<q-th colspan="2"> Диаметр, м </q-th>
										<q-th rowspan="2"> Дата <br> статуса </q-th>
									</q-tr> 
									<q-tr :props="props">
										<q-th > ном. </q-th>
										<q-th > факт. </q-th>
										<q-th > ном. </q-th>
										<q-th > факт. </q-th>
										<q-th > ном. </q-th>
										<q-th > факт. </q-th>
										<q-th > ном. </q-th>
										<q-th > факт. </q-th>
									</q-tr> 

									</template> -->



              <!-- <template v-slot:body="props">
									<q-tr
										:props="props"
										:class="props.row.screen_select ? 'table-row-sel1' : ''"      
										:onmousedown="
											(ev) => {
												console.log('props=', props.row.STRIP_CODE);
												Strips.forEach((item) => {
													item.screen_select = false;
												});
												props.row.screen_select = true;
											}
										"
									>
										<q-td v-for="col in props.cols" :key="col.name"
											:class="col.name == 'STATUS_NAME' && col.value == 'ЗАПЛАНИРОВАН' ? 'bgg-green' : ''"  
										>
											{{ col.value }}
										</q-td>
									</q-tr>
								</template> -->

              <!-- <template v-slot:body-cell="props"> 
								<q-td 
										>
										{{ props.value }}
										</q-td>
								</template> -->
              <!-- :class="col.name == 'STATUS_NAME' && col.value == 'ЗАПЛАНИРОВАН' ? 'bgg-green' : ''"   -->

              <!-- :onmousedown="(props) => {
												console.log('props=', props.row.STRIP_CODE);
												Strips.forEach((item) => {
													item.screen_select = false;
												});
												props.row.screen_select = true;
											}
										" -->

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
        </div>
        <div class="row q-mx-sm">
          <div class="col-1" style="text-align: right;">
            <span>Статусы:</span>
          </div>
          <div class="col-4">
            <q-badge class="status-planned q-px-sm q-mx-xs" label="ЗАПЛАНИРОВАН" />
            <q-badge class="status-assigned q-px-sm q-mx-xs" label="НАЗНАЧЕН" />
            <q-badge class="status-in-prod q-px-sm q-mx-xs" label="В ПРОИЗВОДСТВЕ" />
            <q-badge class="status-produced q-px-sm q-mx-xs" label="ПРОИЗВЕДЁН" />
          </div>
          <!-- </div>
					<div class="row q-mx-sm"> -->
          <div class="col-2" style="text-align: right;">
            <span>Рабочие центры:</span>
          </div>
          <div class="col-4">
            <q-badge class="wc-group1 q-px-sm q-mx-xs" label="РЦ 1.1" />
            <q-badge class="wc-group2 q-px-sm q-mx-xs" label="РЦ 1.2 - РЦ 1.6" />
            <q-badge class="wc-group3 q-px-sm q-mx-xs" label="РЦ 1.7 - РЦ 2.5" />
            <q-badge class="wc-group4 q-px-sm q-mx-xs" label="РЦ 3.1 - РЦ 3.4" />
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

    <q-inner-loading :showing="loading" :label="loading_label" label-class="text-teal" label-style="font-size: 1.1em" />

  </div>

</template>

<script setup>
// defineOptions({
//   inheritAttrs: false
// });
import { ref, watch, computed, onMounted, onBeforeUnmount, } from "vue";
import { QList, QItem, QItemSection, QToggle, useQuasar, QInput } from "quasar";
// import { QInput as QInputB } from "quasar";

import moment from "moment";
import 'moment/dist/locale/ru';
import { read, utils, writeFileXLSX } from "xlsx";
// import X2JS from 'x2js';
import { set_cptable } from "xlsx";
import * as cptable from 'xlsx/dist/cpexcel.full.mjs';

// import router from "../../router";
import { isDate } from '../../components/utils';

// import 'moment/dist/locale/ru';
import router from "../../router";

import { loadData, sendData } from "../../components/serverData";
// import DatePicker from '../../components/DatePicker1.vue';

import { tracking as url, dictionary as dict } from "../../router/dataUrl";

import alertPro from '../../components/alertPro.vue'
import confirmPro from '../../components/confirmPro.vue';

// Импорт разрешений для кадров "Штрипс" и "Список штрипсов".  rightsStrip - объект с разрешениями
import { storeToRefs } from 'pinia'
import { useAccessStore } from "../../stores/accessStore";
const accessStore = useAccessStore(); 
// const { rStrip, rStripNew, rStripEdit, rStripDel, rStripList,  rStripExcel } = storeToRefs(accessStore);
const { rightsStrip } = storeToRefs(accessStore);
// Конец - Импорт разрешений для кадров "Штрипс" и "Список штрипсов".


const $q = useQuasar();

const props = defineProps({
	dateBeg: String,
	dateEnd: String,
	// Status: Number,
	stripNumber: String,
	jobCode: String,
	batch: String,
	limit: Number,
	withDateInterval: String,
	heat: String,
	lastWc: String,
	status: String,
	width: Number,
	thick: Number,
	weightMin: Number,
	weightMax: Number,
	addFilters: String,
});
const FORMAT_DATETIME_MINUTE = "YYYY-MM-DD HH:mm";
const FORMAT_DATETIME_SEC = "YYYY-MM-DD HH:mm:ss";
const FORMAT_DATETIME_MINUTE_ISO = "YYYY-MM-DDTHH:mm";
const FORMAT_DATE = "DD.MM.YYYY";
const FORMAT_DATE_INPUT = "YYYY-MM-DD";
const AUTO_REFRESH_REC_LIMIT = 1000;
const AUTO_REFRESH_INTERVAL = 60000;
const REC_LIMIT = 1000;
// const minSelectedDate = computed(() => moment( { year: 2023, month: 12, day: 1 }));
// const maxSelectedDate = computed(() => moment().endOf("day"));


const MyFilter = ref({
	filtStripNumber: "",
	filtJobCode: "",
	filtHeat: "",
	filtBatch: "",
	filtLastWc: "",
	filtWidth: undefined,
	filtThick: undefined,
	filtWeightMin: undefined,
	filtWeightMax: undefined,
	filtStatus: "",
	// filtDateBeg: moment().add(-24, "hours").startOf("hour").format(FORMAT_DATETIME_MINUTE),
	// filtDateEnd: moment().format(FORMAT_DATETIME_MINUTE),
  filtDateBeg: moment().startOf("day").add(7, "hours").isBefore(moment()) ? moment().startOf("day").add(7, "hours").format(FORMAT_DATETIME_MINUTE_ISO) : moment().startOf("day").add(-17, "hours").format(FORMAT_DATETIME_MINUTE_ISO),
  filtDateEnd: moment().startOf("day").add(7, "hours").isBefore(moment()) ? moment().startOf("day").add(31, "hours").format(FORMAT_DATETIME_MINUTE_ISO) : moment().startOf("day").add(7, "hours").format(FORMAT_DATETIME_MINUTE_ISO),
	filtDateInterval: "24",
	filtWithDateInterval: false,
	addFilters: false,
});
const MyFilterRemember = {//filtStrip: "", 
	// filtStatus: "",
	filtDateBeg:						MyFilter.value.filtDateBeg,
	filtDateEnd: 						MyFilter.value.filtDateEnd,
	filtWithDateInterval: 	MyFilter.value.filtWithDateInterval,
	filtStripNumber: 				MyFilter.value.filtStripNumber,
	filtJobCode: 						MyFilter.value.filtJobCode,
	filtBatch: 							MyFilter.value.filtBatch,
	filtHeat: 							MyFilter.value.filtHeat,
	// addFilters: 						MyFilter.value.addFilters,
	row_count_fact:					0,
};


// const btnLoadDataClass = ref("btn-vmz");
const LoadDataNeed = ref(false);

// const filtStatus =ref("");
// const filtStatusList =ref([{val: 1, stat: "Новый",   },
// 													{val: 2, stat: "Выполняется",   },
// 													{val: 3, stat: "Старый",   },
// 													{val: 4, stat: "Выполнен",   },
// 													{val: 5, stat: "Закрыт",   },]);
// const filtStatusList =ref( ["Новый", "Выполняется",  "Старый",  "Выполнен",  "Закрыт"]);
const StatusList = ref();




const Strips = ref([]);
const stripSelected = ref([]);
const StripsReadLastTime = ref("");
const AutoRefresh =  ref(false);
const AutoRefreshTxt =  ref("");
const MyPagination= ref({ rowsPerPage: 15 });
// const StipsFilteredSortedRows = ref([]);
// const Roles = ref([]);
// const Permissions = ref([]);
// const t1 = ref(true);

// const alert = ref(false);
// const alert_text = ref("");
// const confirm = ref(false);
// const confirm_text = ref("");
// const confirm_function = ref({});
// const confirm_function_arg = ref({});        //  Объект для передачи аргументов функции, которая будет описана в confirm_function
const loading = ref(false);
const loading_label = ref("");
const exportingData = ref(false);
const refStripList = ref();

// const stripIdSelected = ref(-1);

// // Это ещё проверить, понадобится ли
// function dateChange(newDate, newForce) {
// 	const PROC_NAME = "DayByHour.dateChange> "
// 	console.log(`${PROC_NAME}newDate = "${moment(newDate).format(FORMAT_DATE)}", force = "${newForce}"`);
// 	selectedDate.value = newDate;
// 	// loadHistProdForce.value = newForce;

// 	// setTimeout(() => {
// 	// 	router.push({ query: moment().isSame(moment(newDate), 'day') ? {} : { date: moment(newDate).format(FORMAT_DATETIME_ISO) } }, () => { });
// 	// }, 100);

// 	// LoadHistProd(selectedDate.value, loadHistProdForce.value);
// }

// const numberFormatter0dig = new Intl.NumberFormat(undefined, { minimumFractionDigits: 0 });
// const numberFormatter1dig = new Intl.NumberFormat(undefined, { minimumFractionDigits: 1 });
// const numberFormatter2dig = new Intl.NumberFormat(undefined, { minimumFractionDigits: 2 });

// объекты формаимрования
const numberFormatterDig = [];

for(let i = 0; i < 10; i++)  numberFormatterDig[i] = new Intl.NumberFormat(undefined, { minimumFractionDigits: i });  // с запасом 0 до 10

const columns = ref([
	// {
	// 	name: "index",
	// 	required: true,
	// 	label: "#",
	// 	align: "left",
	// 	classes: (row) => cellClass(row),
	// 	field: (row) => row.index,
	// 	format: (val) => `${val}`,
	// 	sortable: false,
	// },
	{
		name: "STRIP_NUMBER",
		required: true,
		label: "Номер Штрипса",
		align: "left",
		classes: (row) => cellClass(row),
		field: (row) => row.STRIP_NUMBER,
		format: (val) => `${val}`,
		sortable: true,
	},
	{ name: "PR_STRIP_ID", label: "PR_STRIP_ID", field: "PR_STRIP_ID" },

	{
		name: "STATUS_NAME",
		required: true,
		label: "Статус",
		align: "center",
		field: "STATUS_NAME",
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
		name: "BATCH",
		required: true,
		label: "Партия",
		align: "center",
		field: "BATCH",
		// field: (row) => `${row.BATCHES ? row.BATCHES.map(b => b.batch).join(',') : ""}`,
		classes: cellClass,
		// format: (val) => `${val ? val.map(b => b.batch).join(',') : ""}`,
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
		name: "STRENGTH_CLASS",
		required: true,
		label: "Класс прочности",
		align: "center",
		field:  (row) => row.STRENGTH_CLASS ?? '',
		classes: cellClass,
		format: (val) => `${val}`,
		sortable: true,
	},
	{
		name: "STEEL_GRADE",
		required: true,
		label: "Марка стали",
		align: "center",
		field:  (row) => row.STEEL_GRADE ?? '',
		classes: cellClass,
		format: (val) => `${val}`,
		sortable: true,
	},
	{
		name: "WIDTH",
		required: true,
		// label: "Ширина ном.",
		label: "Ширина (мм)",
		align: "center",
		field: "WIDTH",
		classes: cellClass,
		// format: (val) => numberFormatter1dig.format(+val),
		format: (val) => numberFormatter(val, 1),
		sortable: true,
		xlsx_precision: 1,
	},
	// {
	// 	name: "WIDTH_FACT",
	// 	required: true,
	// 	label: "Ширина факт.",
	// 	align: "center",
	// 	field: "WIDTH",
	// 	format: (val) => `${val}`,
	// 	sortable: true,
	// },
	{
		name: "THICK",
		required: true,
		// label: "Толщина ном.",
		label: "Толщина (мм)",
		align: "center",
		field: "THICK",
		classes: cellClass,
		// format: (val) => numberFormatter2dig.format(+val),
		format: (val) => numberFormatter(val, 2),
		sortable: true,
		xlsx_precision: 2,
	},
	// {
	// 	name: "THICK_FACT",
	// 	required: true,
	// 	label: "Толщина факт.",
	// 	align: "center",
	// 	field: "THICK",
	// 	format: (val) => `${val}`,
	// 	sortable: true,
	// },
	{
		name: "WEIGHT",
		required: true,
		// label: "Вес ном.",
		label: "Вес (кг)",
		align: "center",
		field: "WEIGHT",
		classes: cellClass,
		// format: (val) => numberFormatter0dig.format(+val),
		format: (val) => numberFormatter(val, 0),
		sortable: true,
		xlsx_precision: 0,
	},
	// {
	// 	name: "WEIGHT_FACT",
	// 	required: true,
	// 	label: "Вес факт.",
	// 	align: "center",
	// 	field: "WEIGHT",
	// 	format: (val) => `${val}`,
	// 	sortable: true,
	// },
	{
		name: "DIAM",
		required: true,
		// label: "Диаметр ном.",
		label: "Диаметр внутр.(мм)",
		align: "center",
		field: "DIAM",
		classes: cellClass,
		// format: (val) => numberFormatter0dig.format(+val),
		format: (val) => numberFormatter(val, 0),
		sortable: true,
		xlsx_precision: 0,
	},
	{
		name: "SOURCE_L3",
		required: true,
		label: "Источник",
		align: "center",
		// field: "SOURCE_L3",
		field: (row) => row.SOURCE_L3 ? 'L3' : 'L2',
		format: (val) => `${val}`,
		// format: (val) => `${val ? 'L3' : 'L2'}`,
		sortable: true,
	},
	{
		name: "CREATE_DATE",
		required: true,
		label:  `"ЗАПЛАНИРОВАН"`,
		align: "center",
		field: "CREATE_DATE",
		classes: cellClass,
		format: (val) => `${moment(val).format(FORMAT_DATETIME_MINUTE)}`,
		sortable: true,
	},
	{
		name: "ENTRY_DATE",
		required: true,
		label: `"НАЗНАЧЕН"`,
		align: "center",
		field: "ENTRY_DATE",
		classes: cellClass,
		format: (val) => val ? `${moment(val).format(FORMAT_DATETIME_MINUTE)}` : "",
		sortable: true,
	},
	{
		name: "PROD_DATE",
		required: true,
		label: `"В ПРОИЗВОДСТВЕ"`,
		align: "center",
		field: "PROD_DATE",
		classes: cellClass,
		format: (val) => val ? `${moment(val).format(FORMAT_DATETIME_MINUTE)}` : "",
		sortable: true,
	},
]);

// const visibleColumns = ref(["STRIP_NUMBER", "STATUS_NAME", "JOB_CODE", "HEAT", "STEEL_GRADE", "WIDTH", "WIDTH_FACT", "THICK", "THICK_FACT", "WEIGHT",  "WEIGHT_FACT", "DIAM_FACT",  "DIAM_FACT_FACT", "CREATE_DATE",]);
// const visibleColumns = ref(["STRIP_NUMBER", "STATUS_NAME", "JOB_CODE", "HEAT", "WIDTH", "WIDTH_FACT", "THICK", "THICK_FACT", "WEIGHT",  "WEIGHT_FACT", "DIAM_FACT",  "DIAM_FACT_FACT", "CREATE_DATE",]);
const visibleColumns = ref(["STRIP_NUMBER", "STATUS_NAME", "LAST_WC", "BATCH", "JOB_CODE", "HEAT", "WIDTH", "THICK", "WEIGHT", "DIAM", "SOURCE_L3", "CREATE_DATE", "ENTRY_DATE", "PROD_DATE",]);



const load_data_ok = { strips: true, strip_status: false, }

let Timeout1, Timeout2, Timeout3, Timeout4;
let is_life = true;

onMounted(async () => {
	const PROC_NAME = "onMounted> ";
	// console.log(`${PROC_NAME}Начало (Высота экрана: ${$q.screen.height}px)`);
	console.log(`${PROC_NAME}Начало (Высота экрана: ${$q.screen.height}px)`);

	const onMounted = {	filtDateBeg 					: props?.dateBeg,
											filtDateEnd 					: props?.dateEnd,
											filtStripNumber 			: props?.stripNumber,
											filtJobCode						: props?.jobCode,
											filtBatch							: props?.batch,
											filtWithDateInterval	: props?.withDateInterval,
											filtHeat							: props?.heat,
											filtLastWc						: props?.lastWc,
											filtStatus						: props?.status,
											filtWidth							: props?.width,
											filtThick							: props?.thick,
											filtWeightMin					: props?.weightMin,
											filtWeightMax					: props?.weightMax,
											addFilters						: props?.addFilters,
										};
	console.log(PROC_NAME + "onMounted =", onMounted );

	for(let key in onMounted) {
		if(key !== "filtWithDateInterval" && key !== "addFilters") {
			if(onMounted[key] !== undefined && onMounted[key] !== null) MyFilter.value[key] = onMounted[key] || '';
		} else  {
			MyFilter.value[key] = (onMounted[key] === 'true');
		}
 	}
	

	loadDictionaryStripStatus();
	// loadDataStrips();
	stripListRead()

	// setTimeout(() => {
  //   console.log(PROC_NAME + 'setTimeout> ', props, onMountedStripId, onMountedAction);
  //   saveUrlParameters({ stripId: onMountedStripId, act: onMountedAction });
  // }, 100);
	Timeout1 = setTimeout(() => {
    console.log(PROC_NAME + 'setTimeout> ', props, onMounted);
    saveUrlParameters(onMounted);
  }, 100);

});


/**
 * Функция, запускающая постоянный цикл обновления данных в таблице
 */
async function stripListRead() {
	const PROC_NAME = "stripListRead> ";
	Timeout2 = setTimeout(async function  strips_data_read() {
		// Обновление по истечению интервала в 1 мин, только если таблица установлена на первую страницу и нет треблования обновить вручную (не закончена работа с фильтрами)
		if((AutoRefresh.value || !StripsReadLastTime.value) && !LoadDataNeed.value && MyPagination.value.page === 1 && (!StripsReadLastTime.value || moment().diff(StripsReadLastTime.value) >= AUTO_REFRESH_INTERVAL) && (MyFilterRemember.row_count_fact <= AUTO_REFRESH_REC_LIMIT)) {   // 60000 мс = 1 мин (Если требуется обновление фильтров)
		// console.log("FILE_NAME = ", FILE_NAME);
			await loadDataStrips(); 
			// AutoRefreshTxt.value = `- Автообновление через ${parseInt((AUTO_REFRESH_INTERVAL - moment().diff(PipesReadLastTime.value)) / 1000)} сек.`;
		} else {
			if(!AutoRefresh.value || LoadDataNeed.value || (MyFilterRemember.row_count_fact > AUTO_REFRESH_REC_LIMIT) || (MyPagination.value.page !== 1)) {
				AutoRefreshTxt.value = `Автообновление отключено`;
			} else {
				// AutoRefreshTxt.value = `- Автообновление через ${parseInt((AUTO_REFRESH_INTERVAL - moment().diff(PipesReadLastTime.value)) / 1000)} сек.`;
				AutoRefreshTxt.value = StripsReadLastTime.value ? `Автообновление через ${parseInt((AUTO_REFRESH_INTERVAL - moment().diff(StripsReadLastTime.value)) / 1000)} сек.` : "";
				// const t_diff = parseInt((AUTO_REFRESH_INTERVAL - moment().diff(StripsReadLastTime.value)) / 1000);
				// AutoRefreshTxt.value = StripsReadLastTime.value ? `Автообновление через ${(t_diff - t_diff %  60) / 60} мин. ${("0" + (t_diff %  60).toString()).slice(-2)} сек.` : "";
			}
		}
		
		try{
			if( is_life ) Timeout3 = setTimeout(strips_data_read, 1000);
		} catch (err) {
      console.error(`${PROC_NAME}ОШИБКА цикла чтения данных!!!`, err);
			// s_alert('Ошибка экспорта данных!', err.message ?? "");
    }
		// if(!LoadDataNeed.value && MyPagination.value.page === 1 && (!StripsReadLastTime.value || moment().diff(StripsReadLastTime.value) >= 60000)) {   // 60000 мс = 1 мин (Если требуется обновление фильтров)
		// 	await loadDataStrips(); 
		// }
	}, 100);
}




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
					dateBeg						: save_params.filtDateBeg || '',
					dateEnd						: save_params.filtDateEnd || '',
					stripNumber				: save_params.filtStripNumber || '',
					jobCode						: save_params.filtJobCode || '',
					batch							: save_params.filtBatch || '',
					withDateInterval	: save_params.filtWithDateInterval || '',
					heat							: save_params.filtHeat || '',
					lastWc						: save_params.filtLastWc || '',
					status						: save_params.filtStatus || '',
					addFilters				: save_params.addFilters || '',
					...(save_params.filtWidth !== null && {width: save_params.filtWidth}),
					...(save_params.filtThick !== null && {thick: save_params.filtThick}),
					...(save_params.filtWeightMin !== null && {weightMin: save_params.filtWeightMin}),
					...(save_params.filtWeightMax !== null && {weightMax: save_params.filtWeightMax}),
					
					// width: save_params.filtWidth ?? '',
					// thick: save_params.filtThick ?? ''
					// weightMin: save_params.filtWeightMin ?? ''
					// weightMax: save_params.filtWeightMax ?? '',
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





async function loadDataStrips() {    // Загрузка даннных

	// console.log("MyPagination.value= ", MyPagination.value);
	if (!loading.value) s_loading(true, "Подождите, загружаются данные");  // 

	load_data_ok.strips = false;
	// console.log("dateBeg: ", (MyFilter.value.filtDateBeg && moment(MyFilter.value.filtDateBeg).isValid() && { dateBeg: MyFilter.value.filtDateBeg }));
	// console.log("dateEnd: ", (MyFilter.value.filtDateEnd && moment(MyFilter.value.filtDateEnd).isValid() && { dateEnd: MyFilter.value.filtDateEnd }));
	const ret_strips = await loadData({
		url: url.strip.list, params: {
			...(MyFilter.value.filtWithDateInterval && MyFilter.value.filtDateBeg && moment(MyFilter.value.filtDateBeg).isValid() && { dateBeg: MyFilter.value.filtDateBeg }),
			...(MyFilter.value.filtWithDateInterval && MyFilter.value.filtDateEnd && moment(MyFilter.value.filtDateEnd).isValid() && { dateEnd: MyFilter.value.filtDateEnd }),
			"row-limit": REC_LIMIT,
		...(MyFilter.value.filtStripNumber && MyFilter.value.filtStripNumber.trim().length > 0 && { "strip-number": MyFilter.value.filtStripNumber.trim() }),
		...(MyFilter.value.filtJobCode && MyFilter.value.filtJobCode.trim().length > 0 && { "job-code": MyFilter.value.filtJobCode.trim() }),
		...(MyFilter.value.filtBatch && MyFilter.value.filtBatch.trim().length > 0 && { "batch": MyFilter.value.filtBatch.trim() }),
		...(MyFilter.value.filtHeat && MyFilter.value.filtHeat.trim().length > 0 && { "heat": MyFilter.value.filtHeat.trim() }),

		}
	});
	// props.DateBeg = MyFilter.value.filtDateBeg;
	// props.DateEnd = MyFilter.value.filtDateEnd;


	MyFilterRemember.filtDateBeg 					= MyFilter.value.filtDateBeg;
	MyFilterRemember.filtDateEnd 					= MyFilter.value.filtDateEnd;
	MyFilterRemember.filtWithDateInterval = MyFilter.value.filtWithDateInterval;
	MyFilterRemember.filtStripNumber 			= MyFilter.value.filtStripNumber;
	MyFilterRemember.filtJobCode 					= MyFilter.value.filtJobCode;
	MyFilterRemember.filtBatch 						= MyFilter.value.filtBatch;
	MyFilterRemember.filtHeat 						= MyFilter.value.filtHeat;
	


	console.log("ret_strips = ", ret_strips);
	// console.log("ret_roles = ", ret_roles);

	if (ret_strips.error) {
		s_loading(false);
		// s_alert("Загрузка данных произошла с ошибкой. Повторите попытку позже");
		s_alert("Загрузка данных произошла с ошибкой. Повторите попытку позже", ret_strips.error.message ?? "");
		StripsReadLastTime.value = moment();        // запоминаем время последнего обновления
	} else {
		if (ret_strips.length === 0) {
			s_alert("По заданным условиям не найдено данных");
		}
		// Сортировка массива последний вверху
		ret_strips.sort((a,b) => {
			if( a.PROD_DATE && b.PROD_DATE ) {
				if(a.PROD_DATE > b.PROD_DATE) return -1;
				if(a.PROD_DATE < b.PROD_DATE) return 1;
				if(a.PROD_DATE === b.PROD_DATE)  return 0;  //  Вообще - это невозможно в реальнсти, но пусть болтается
			}
			if( a.PROD_DATE && !b.PROD_DATE ) return 1;
			if( !a.PROD_DATE && b.PROD_DATE ) return -1;
			// Ниже сработает только если у обоих нет PROD_DATE
			// if( a.ENTRY_DATE && b.ENTRY_DATE ) {
			// 	if(a.ENTRY_DATE > b.ENTRY_DATE) return -1;
			// 	if(a.ENTRY_DATE < b.ENTRY_DATE) return 1;
			// 	if(a.ENTRY_DATE === b.ENTRY_DATE) {
			// 		if(a.BATCH > b.BATCH)  return -1;
			// 		if(a.BATCH < b.BATCH)  return 1;
			// 		if(a.BATCH === b.BATCH)  return b.PR_STRIP_ID - a.PR_STRIP_ID;
			// 	}
			// }
			if( a.ENTRY_DATE && b.ENTRY_DATE ) {  // Для назначенных - сортировка по партиям
				if(a.BATCH > b.BATCH)  return -1;
				if(a.BATCH < b.BATCH)  return 1;
				if(a.BATCH === b.BATCH)  return b.PR_STRIP_ID - a.PR_STRIP_ID;
			}
			if( !a.ENTRY_DATE && !b.ENTRY_DATE ) {
				if(a.CREATE_DATE > b.CREATE_DATE) return -1;
				if(a.CREATE_DATE < b.CREATE_DATE) return 1;
				if(a.CREATE_DATE === b.CREATE_DATE) return b.PR_STRIP_ID - a.PR_STRIP_ID;
			}
			if( a.ENTRY_DATE && !b.ENTRY_DATE ) return 1;
			if( !a.ENTRY_DATE && b.ENTRY_DATE ) return -1;
		});
		ret_strips.forEach((item, idx) => {
			item.LAST_WC = item.WC_CODE ? `${item.WC_AREA}.${item.WC_NUMBER} ${item.WC_CODE}` : '';
			item.BATCH = `${item.BATCHES ? item.BATCHES.map(b => b.batch).join(',') : ""}`;
			item.screen_select = Strips.value?.find(s => (s.PR_STRIP_ID === item.PR_STRIP_ID))?.screen_select ?? false;    // восстанавливаем ввыбранную строку, если была
			item.hidden_row = Strips.value?.find(s => (s.PR_STRIP_ID === item.PR_STRIP_ID))?.hidden_row ?? false;   // Возможно, лиишнее, но не повредит
			// item.executed = 0;                    // временно. Пока нет процента исполнения заказа
			item.DIAM = isNaN(parseFloat(item.DIAM)) ? item.DIAM : parseFloat(item.DIAM);    // Иначе при загрузке в xlsx воспринимается как текстовое и не преобразовывавется
		});
		MyFilterRemember.row_count_fact = ret_strips.length;
		if(ret_strips.length === REC_LIMIT) {
			$q.notify({message: `Выбраны только последние ${ret_strips.length} записей по заданным условиям (фильтрам). <br> Возможно, не все необходимые данные отражаются в выборке.`, 
			position: "top", textColor: "yellow", html: true,});
		}
		StripsReadLastTime.value = moment();        // запоминаем время последнего обновления
		Strips.value = ret_strips;

		DateBegEndChange();

		load_data_ok.strips = true;
		load_data_check();
		// s_loading(false);
	}



};




// *****************************
// Загрузка справочника статусов штрипсов
async function loadDictionaryStripStatus() {    // Загрузка даннных

	const stats = [];
	load_data_ok.strip_status = false;
	if (!loading.value) s_loading(true, "Подождите, загружаются данные");  // 

	const ret_dict = await loadData({ url: dict.strip.status.list, params: {} });

	console.log("ret_dict = ", ret_dict);

	if (ret_dict?.error) {
		s_loading(false);
		// s_alert("Загрузка данных произошла с ошибкой. Повторите попытку позже");
		s_alert("Загрузка данных произошла с ошибкой. Повторите попытку позже", ret_dict.error.message ?? "");
	} else {
		if (ret_dict.length === 0) {
			s_alert("Не найдено данных по справочнику статусов Штрипсов");
		}
		if (ret_dict?.length > 0) {
			for (let i = 0; i < ret_dict.length; i++) {
				stats.push({ val: ret_dict[i].PR_STATUS_ID, stat: ret_dict[i].STATUS_NAME, });
			}
		}

		StatusList.value = stats;
		load_data_ok.strip_status = true;
		load_data_check();
		// s_loading(false);
	}


};

/**
 * Проверка, загружено ли всё для отображеня на странице
 */
function load_data_check() {
	let ok = true;
	for (let key in load_data_ok)
		if (!load_data_ok[key]) ok = false;

	if (ok) s_loading(false);  // Загрузка окончена
}



// ************* Кнопки.
// // переход в кадр Strip для просмотра выбранного штрипса
// function BtnViewStrip(evt, go) {
// 	if (find_select_row(Strips.value)) {
// 		let opts = {
// 			to: {
// 				name: 'strip',
// 				query: {
// 					action: 'view',
// 					stripId: stripSelected.value[0].PR_STRIP_ID, //find_select_row(Strips.value).PR_STRIP_ID,
// 				},
// 			}
// 		};
// 		go(opts);     /// собственно переход

// 	} else {
// 		alert_text.value = "Не выбран Штрипс. Выберите Штрипс и повторите попытку";
// 		alert.value = true;  // сообщение на экран
// 	}
// 	// navigateToRouterLink(null, opts);
// }

// // переход в кадр Strip для создания нового штрипса
// function BtnNewStrip(evt, go) {
// 	let opts = {
// 		to: {
// 			name: 'strip',
// 			query: {
// 				action: 'new',
// 				stripId: -1,
// 			},
// 		}
// 	};
// 	go(opts);     /// собственно переход
// }

// // переход в кадр Strip для копирования выбранного штрипса
// function BtnCopyStrip(evt, go) {
// 	if (find_select_row(Strips.value)) {
// 		let opts = {
// 			to: {
// 				name: 'strip',
// 				query: {
// 					action: 'copy',
// 					stripId: stripSelected.value[0].PR_STRIP_ID, //find_select_row(Strips.value).PR_STRIP_ID,
// 				},
// 			}
// 		};
// 		go(opts);     /// собственно переход

// 	} else {
// 		alert_text.value = "Не выбран Штрипс. Выберите Штрипс и повторите попытку";
// 		alert.value = true;  // сообщение на экран
// 	}
// }

//  Удаление выбранного штрипса
function BtnDelStrip(evt, go) {
	if (find_select_row(Strips.value)) {
		const strip = stripSelected.value[0]; //find_select_row(Strips.value);
		console.log("find_select_row(Strips.value)= ", strip);

		if (strip.SOURCE_L3) {
			s_alert("Выбранный Штрипс создан в Уровне 3. Удаление должно быть произведено в Уровне 3");
		} else {

			s_confirm(`Вы уверены, что хотите удалить Штрипс № ${strip.STRIP_NUMBER}`, DelStrip, { id: strip.PR_STRIP_ID, });
		}
	} else {
		s_alert("Не выбран Штрипс. Выберите Штрипс и повторите попытку");
	}
}


// Действия по удалению
async function DelStrip({ id }) {
	console.log("id Штрипса для удаления= ", id);

	// 
	if (id && id > 0) {
		s_loading(true, "Выполняется операция удаления");
		const ret_save = await sendData({ url: url.strip.save, params: { strip: { PR_STRIP_ID: id, } }, });
		// обработка результата записи
		if (ret_save) {
			console.log("ret_save= ", ret_save);
			// пока нет
		}
		if (ret_save?.error) {
			s_loading(false);
			// a_alert("Операция удаления завершена с ошибкой")
			// s_confirm(`Операция удаления завершена с ошибкой. Повторите попытку позже. Хотите посмотреть текст ошибки?`, confirm_s_alert, { txt: `Ошибка (name): ${ret_save.error.name} <br> Сообщение (message): ${ret_save.error.message}`, });
			s_alert(`Операция удаления завершена с ошибкой. Повторите попытку позже.`, ret_save.error.message ?? "");
		} else {
			if (ret_save === true) {   // Если удаление прошло успешно
				// Необходимо обновить список
				s_loading(false);
				loadDataStrips();
			} else {   // по идее, этой ситуации быть не должно
				s_loading(false);
				s_alert("Операция удаления завершена некорректно");
				loadDataStrips();
			}
		}


	}

}

















/**
 * Выгрузка данных штрипсов в xlsx
 */
function BtnPrintStrip(evt, go) {
  const PROC_NAME = 'exportTable> ';
  exportingData.value = true;
  Timeout4 = setTimeout(() => {  // Пауза нужна, чтобы успела появиться анимация выгрузки данных
    try {
      // console.log(`${PROC_NAME}refStripList: `, refStripList.value);
      const rows = refStripList.value.filteredSortedRows, cols = refStripList.value.columns, colsv = refStripList.value.visibleColumns ;
      console.log(PROC_NAME + 'rows: ', rows);
      console.log(PROC_NAME + 'cols: ', cols);
      console.log(PROC_NAME + 'colsv: ', colsv);

      const table = Array();
      const colsWidth = [];

      if (!table[0]) table[0] = [];
      let col_number = 0;
      cols.forEach((c, j) => {
        if(colsv.find((cv, ind, arr) => (cv === c.name)))  {   // Если колонка видимая
          table[0][col_number] = c.label;
          const x = typeof c.field === 'function' ? c.field(rows[0]) : rows[0][c.field];
          colsWidth[col_number] = { wch: moment.isMoment(x) || moment.isDate(x) ? 15 : Math.max(c.label.length + 3, 5) };
          col_number++;
        }
        // table[0][j] = c.label;
        // const x = typeof c.field === 'function' ? c.field(rows[0]) : rows[0][c.field];
        // colsWidth[j] = { wch: moment.isMoment(x) || moment.isDate(x) ? 15 : Math.max(c.label.length + 3, 5) };
      });
      for (let i = 1; i < rows.length + 1; i++) {
        let col_number = 0;
        cols.forEach((c, j) => {
          if(colsv.find((cv, ind, arr) => (cv === c.name)))  {   // Если колонка видимая
            if (!table[i]) table[i] = [];
            const x =
              typeof c.field === 'function' ? c.field(rows[i - 1]) :		// Если функция (вычисление налету), выполняем эту ф-цию.
                rows[i - 1][c.field];
            // console.log(x, isDate(x))
            // table[i][col_number] =
            //   isDate(x) ? { t: 'd', v: new Date(x), z: 'dd.mm.yyyy hh:mm' } :	// дата/время - тип Datetime
            //     c.name === 'timeUnix' ? { t: 'd', v: moment(x * 1000).toDate(), z: 'dd.mm.yyyy hh:mm' } :	// unix-время - кол-во секунд от 1970г.
            //       typeof x === 'number' ? { t: 'n', v: x, z: (j > 0) ? '#,##0.00' : '###', } :			// Значения  - числа
            //         { t: 's', v: x ?? '', };			// Значения  - строки
            table[i][col_number] =
              isDate(x) ? { t: 'd', v: moment(x).format(FORMAT_DATETIME_MINUTE), z: 'dd.mm.yyyy hh:mm' } :	// дата/время - тип Datetime
                c.name === 'timeUnix' ? { t: 'd', v: moment(x * 1000).toDate(), z: 'dd.mm.yyyy hh:mm' } :	// unix-время - кол-во секунд от 1970г.
                  typeof x === 'number' ? { t: 'n', v: x, z: xlsx_precision_format(c.xlsx_precision), } :			// Значения  - числа
                    { t: 's', v: x ?? '', };			// Значения  - строки
            col_number++;
          }

          // moment.isMoment(x) || moment.isDate(x) ? { t: 'd', v: moment(x).toDate(), z: 'dd.mm.yyyy hh:mm' } :	// дата/время - тип Datetime
          //   c.name === 'timeUnix' ? { t: 'd', v: moment(x * 1000).toDate(), z: 'dd.mm.yyyy hh:mm' } :	// unix-время - кол-во секунд от 1970г.
          //     typeof x === 'number' ? { t: 'n', v: x, z: (j > 0) ? '#,##0.00' : '###', } :			// Значения  - числа
          //       { t: 's', v: x ?? '', };			// Значения  - строки

          // table[i][j] =
          //   i === 0 ? c.label :
          //     // c.name === 'datetime' ? moment(rows[i - 1][c.field]).toDate() :	// дата/время - тип Datetime
          //     moment.isMoment(rows[i - 1][c.field]) || moment.isDate(rows[i - 1][c.field]) ? { t: 'd', v: moment(rows[i - 1][c.field]).toDate(), z: 'dd.mm.yyyy hh:mm' } :	// дата/время - тип Datetime
          //       c.name === 'timeUnix' ? { t: 'd', v: moment(rows[i - 1][c.field] * 1000).toDate(), z: 'dd.mm.yyyy hh:mm' } :	// unix-время - кол-во секунд от 1970г.
          //         // c.name === 'timeUnix' ? moment(rows[i - 1][c.field] * 1000).toDate() :	// unix-время - кол-во секунд от 1970г.
          //         typeof c.field === 'function' ? c.field(rows[i - 1]) :		// Если функция (вычисление налету), выполняем эту ф-цию.
          //           // typeof c.field === 'number' ? rows[i - 1][c.field].toFixed(2) :
          //           typeof rows[i - 1][c.field] === 'number' ? { t: 'n', v: rows[i - 1][c.field], z: '#,##0.00', } :			// Значения  - числа
          //             { t: 's', v: rows[i - 1][c.field] ?? '', };			// Значения  - строки
          // // { v: rows[i - 1][c.field], z: '#,00'};			// Значения  - числа
          // if (Number.isNaN(table[i][j])) table[i][j] = '';
          // if (i === 1) console.log(PROC_NAME + i + ': columns[' + j + ']' + (typeof c.field) + '/' + (typeof rows[i - 1][c.field]), rows[i - 1][c.field]);
          // if ((i === 0) || (i === 1)) console.log(PROC_NAME + i + ': columns[' + j + ']' + (typeof c.field), (i === 0) ? c.label : (typeof c.field === 'function' ? c.field(rows[i - 1]) : rows[i - 1][c.field]));
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
      writeFileXLSX(wb, "stripList.xlsx");
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


	// if (find_select_row(Strips.value)) {


	// 	// Подумать... 
	// } else {
	// 	alert_text.value = "Не выбран штрипс. Выберите штрипс и повторите попытку";
	// 	alert.value = true;  // сообщение на экран
	// }
}







// // Действия по удалению
// function goDelStrip(go) {
// 			console.log("!!!!!!!!!!!!!!!!**********************Функция передалась");
// 			let opts = {to: {
// 											name: 'strip',
// 											query: 	{
// 																action: 'close',
// 																stripId: find_select_row(Strips.value).PR_STRIP_ID,
// 															}, 
// 								}};
// 			// go(opts);     /// собственно переход
// } 




// поиск выбранной строки для перехода на другой экран. Пока не запариваемся на то, есть ли она на текущей странице
function find_select_row(rows) {
	// if(rows && rows.isArray()) {
	if (rows?.length > 0) {
		return rows.find((row, ind, arr) => (row.screen_select === true && row.hidden_row === false));
	}
	return null;
}

// *********************************
// действия по выбору временного интервала радиокнопками
function selTimrInterval(value, evt) {
	console.log("selTimrInterval = ", value);
	// if( MyFilter.value.filtDateBeg && moment(MyFilter.value.filtDateBeg).isValid() ) {
	// 	MyFilter.value.filtDateBeg = moment(MyFilter.value.filtDateBeg).startOf("hour").format(FORMAT_DATETIME_MINUTE);
	// 	MyFilter.value.filtDateEnd = moment(MyFilter.value.filtDateBeg).add( value, "hours").format(FORMAT_DATETIME_MINUTE);
	// }
	// if( MyFilter.value.filtDateEnd && moment(MyFilter.value.filtDateEnd).isValid() ) {
	// 	MyFilter.value.filtDateEnd = moment().startOf("hour").add( 1, "hours").format(FORMAT_DATETIME_MINUTE);
	// 	MyFilter.value.filtDateBeg = moment().add( -15, "minutes").startOf("hour").add( 1, "hours").add( -value, "hours").format(FORMAT_DATETIME_MINUTE);
	// }
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


// *********************************
// Если выбрано начальное время либо конечере время за пределами интервала, по которому производился поиск,
// подсветить кнопку "обновить"
function DateBegEndChange() {



	// Новое значение интервала в фильтрах
	if (MyFilter.value.filtDateBeg && moment(MyFilter.value.filtDateBeg).isValid() && MyFilter.value.filtDateEnd && moment(MyFilter.value.filtDateEnd).isValid()) {
		// console.log('!!!! выход за рамки DateBeg')
		MyFilter.value.filtDateInterval = moment(MyFilter.value.filtDateEnd).diff(MyFilter.value.filtDateBeg, 'hours').toString();
	}
	MyFilterChange();
};



/**
 * Проверка фильтров на факт изменения ситуации (охвата необходимого коонтента предыдущим запросом) после поседней загрузки данных
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

	// Проверка фильтров по Номеру штрипса, Заданию и Партии имеет смысл только если использование временного интервала не изменилось
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
		if( MyFilterRemember.filtStripNumber !== MyFilter.value.filtStripNumber && MyFilterRemember.row_count_fact === REC_LIMIT )  need = true;


		//  Код задания
		if( MyFilterRemember.filtJobCode.length > 0) {            // проверка только если запомнен фильтпр
			if( MyFilter.value.filtJobCode.length === 0 ) {
				need = true;
			} else {
				if(MyFilter.value.filtJobCode.indexOf(MyFilterRemember.filtJobCode) < 0 )   need = true;
			}
		}
		// if( MyFilterRemember.filtJobCode.length === 0 && MyFilter.value.filtJobCode.length > 0 && MyFilterRemember.row_count_fact === REC_LIMIT )  need = true;
		if( MyFilterRemember.filtJobCode !== MyFilter.value.filtJobCode && MyFilterRemember.row_count_fact === REC_LIMIT )  need = true;

		//  Партия 
		if( MyFilterRemember.filtBatch.length > 0) {            // проверка только если запомнен фильтпр
			if( MyFilter.value.filtBatch.length === 0 ) {
				need = true;
			} else {
				if(MyFilter.value.filtBatch.indexOf(MyFilterRemember.filtBatch) < 0 )   need = true;
			}
		}
		// if( MyFilterRemember.filtBatch.length === 0 && MyFilter.value.filtBatch.length > 0 && MyFilterRemember.row_count_fact === REC_LIMIT )  need = true;
		if( MyFilterRemember.filtBatch !== MyFilter.value.filtBatch && MyFilterRemember.row_count_fact === REC_LIMIT )  need = true;

		//  Плавка
		if( MyFilterRemember.filtHeat.length > 0) {            // проверка только если запомнен фильтпр
			if( MyFilter.value.filtHeat.length === 0 ) {
				need = true;
			} else {
				if(MyFilter.value.filtHeat.indexOf(MyFilterRemember.filtHeat) < 0 )   need = true;
			}
		}
		if( MyFilterRemember.filtHeat !== MyFilter.value.filtHeat && MyFilterRemember.row_count_fact === REC_LIMIT )  need = true;

	}
	// Изменение использования временного интервала
	// if(MyFilter.value.filtWithDateInterval !== MyFilterRemember.filtWithDateInterval)  need = true;
	if(!MyFilter.value.filtWithDateInterval && MyFilterRemember.filtWithDateInterval)  need = true;
	if(MyFilter.value.filtWithDateInterval && !MyFilterRemember.filtWithDateInterval && MyFilterRemember.row_count_fact === REC_LIMIT)  need = true;


	// console.log('!!!! выход за рамки DateBeg')
	// btnLoadDataClass.value = need ?"btn-vmz1" : "btn-vmz";
	LoadDataNeed.value = need;

	// console.log("btnLoadDataClass.value = ", btnLoadDataClass.value);
	// console.log("MyFilter.value.filtTypes	 = ", MyFilter.value.filtTypes);


	// setTimeout(() => {
    // console.log(PROC_NAME + 'setTimeout> ', props, onMountedStripId, onMountedAction);
    saveUrlParameters(MyFilter.value);
  // }, 100);
};







// Обработка фильтров
function MyFilterMethod(rows, terms, cols, getCellValue) {

	// console.log('filter-method-terms= ', terms.filtStatus);
	// console.log('filter-m/ethod rows= ', rows);
	let idx = 0;
	if (rows?.length) {
		for (let i = 0; i < rows.length; i++) {
			if (terms.filtStripNumber && (rows[i].STRIP_NUMBER).indexOf(terms.filtStripNumber) < 0) { rows[i].hidden_row = true; continue; };
			if (terms.filtJobCode && (rows[i].JOB_CODE).indexOf(terms.filtJobCode) < 0) { rows[i].hidden_row = true; continue; };
			if (terms.filtBatch && (rows[i].BATCH).indexOf(terms.filtBatch) < 0) { rows[i].hidden_row = true; continue; };
			if (terms.filtHeat && (rows[i].HEAT).indexOf(terms.filtHeat) < 0) { rows[i].hidden_row = true; continue; };
			if (terms.filtWithDateInterval && terms.filtDateBeg && moment(terms.filtDateBeg).isValid() && moment(terms.filtDateBeg).isAfter(moment(rows[i].CREATE_DATE))) { rows[i].hidden_row = true; continue; };
			if (terms.filtWithDateInterval && terms.filtDateEnd && moment(terms.filtDateEnd).isValid() && moment(terms.filtDateEnd).isSameOrBefore(moment(rows[i].CREATE_DATE))) { rows[i].hidden_row = true; continue; };
			if (terms.addFilters && terms.filtLastWc && (rows[i].LAST_WC).indexOf(terms.filtLastWc) < 0) { rows[i].hidden_row = true; continue; };
			if (terms.addFilters && !isNaN(parseFloat(terms.filtWidth)) && rows[i].WIDTH && ((rows[i].WIDTH < parseFloat(terms.filtWidth) - 1) || (rows[i].WIDTH > parseFloat(terms.filtWidth) + 1))) { rows[i].hidden_row = true; continue; };
			if (terms.addFilters && !isNaN(parseFloat(terms.filtThick)) && rows[i].THICK && ((rows[i].THICK < parseFloat(terms.filtThick) - 0.05) || (rows[i].THICK > parseFloat(terms.filtThick) + 0.05))) { rows[i].hidden_row = true; continue; };
			if (terms.addFilters && !isNaN(parseFloat(terms.filtWeightMin)) && rows[i].WEIGHT && rows[i].WEIGHT < parseFloat(terms.filtWeightMin) ) { rows[i].hidden_row = true; continue; };
			if (terms.addFilters && !isNaN(parseFloat(terms.filtWeightMax)) && rows[i].WEIGHT && rows[i].WEIGHT > parseFloat(terms.filtWeightMax) ) { rows[i].hidden_row = true; continue; };
			if (terms.addFilters && terms.filtStatus && rows[i].STATUS_NAME !== terms.filtStatus) { rows[i].hidden_row = true; continue; };
			// rows[i].index = ++idx;
			rows[i].hidden_row = false;
		}
	}

	// console.log('terms.filtStatus= ', terms.filtStatus);
	// console.log('filter-method-rows= ', rows);

	return rows.filter(item => item.hidden_row === false) || [];
};

// /**
//  * функция, обрабатывающая результирующий масив после фильтрации и сортировки
//  */
// function StipsIdxNew() {
// 	console.log("StipsIdxNew сработала");
// 	StipsFilteredSortedRows.value.forEach((row, idx) => { row.index = idx;}) ;
// }
	


function cellClass(row) {
	// console.log('row.STRIP_NUMBER  =', row.STRIP_NUMBER);
	// return (row.STATUS_NAME  === 'ЗАПЛАНИРОВАН' ? 'bg-light-green-12' : '');
	// return row.screen_select ? 'bg-blue-grey-2' : '';  
	return row.screen_select ? 'table-row-sel2' : '';

}

/**
 * Подсветка статуса штрипса
 */
function cellStatusClass(row) {
  return row.screen_select ? (row.STATUS_NAME === 'НАЗНАЧЕН' ? 'bg-light-green-5' : row.STATUS_NAME === 'В ПРОИЗВОДСТВЕ' ? 'bg-green-7' : row.STATUS_NAME === 'ПРОИЗВЕДЁН' ? 'bg-blue-14' : row.STATUS_NAME === 'ЗАПЛАНИРОВАН' ? 'status-planned' : "table-row-sel2") :
    (row.STATUS_NAME === 'НАЗНАЧЕН' ? 'status-assigned' : row.STATUS_NAME === 'В ПРОИЗВОДСТВЕ' ? 'status-in-prod' : row.STATUS_NAME === 'ПРОИЗВЕДЁН' ? 'status-produced' : row.STATUS_NAME === 'ЗАПЛАНИРОВАН' ? 'status-planned' : "");
}

/**
 * подсветка рабочего центра
 */
function cellWcClass(row) {
	return row.screen_select ? (row.WC_AREA === 1 && row.WC_NUMBER === 1 ? 'wc-group1-sel' : 
		row.WC_AREA === 1 && row.WC_NUMBER >= 1  && row.WC_NUMBER <= 6 ? 'wc-group2-sel' : 
		(row.WC_AREA === 1 && row.WC_NUMBER >= 7) || row.WC_AREA === 2  ? 'wc-group3-sel' :
		row.WC_AREA === 3   ? 'wc-group4-sel' :	"table-row-sel2") :
		(row.WC_AREA === 1 && row.WC_NUMBER === 1 ? 'wc-group1' : 
		row.WC_AREA === 1 && row.WC_NUMBER >= 1  && row.WC_NUMBER <= 6 ? 'wc-group2' : 
		(row.WC_AREA === 1 && row.WC_NUMBER >= 7) || row.WC_AREA === 2  ? 'wc-group3' :
		row.WC_AREA === 3   ? 'wc-group4' :	"");
}

function cellSelect(evt, row, index) {
	Strips.value.forEach((item) => {
		item.screen_select = false;
	});
	row.screen_select = true;
	// console.log("Strips.value = ", Strips.value);
	stripSelected.value.length = 0;
	stripSelected.value.push(row);
}

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
// function confirm_s_alert({ txt }) {
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


onBeforeUnmount(() => {
	is_life = false;
  clearTimeout(Timeout4);
  clearTimeout(Timeout3);
  clearTimeout(Timeout2);
  clearTimeout(Timeout1);
});

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




</style>



<style lang="sass">
// .strip-list-table	.strip-status-planned
// 	background-color: $grey-10
// 	color: black
// 	border-radius: 9px

.strip-list-table	.bg-light-green-5
	background-color: $light-green-5
	color: black
	border-radius: 9px

// .strip-list-table	.bg-light-green-12
// 	background-color: $light-green-12
// 	color: black

.strip-list-table	.bg-green-7
	background-color: $green-7
	color: white
	border-radius: 9px

// .strip-list-table	.bg-green-10
// 	background-color: $green-10
// 	color: white

// .strip-list-table	.bg-blue-10
// 	background-color: $blue-10
// 	color: white

.strip-list-table	.bg-blue-14
	background-color: $blue-14
	color: white
	border-radius: 9px

.strip-list-table	.bg-blue-grey-2
	background-color: $blue-grey-2
	color: black
	border-radius: 9px


.strip-list-table	.wc-group1-sel
	background-color: $light-green-5
	color: black
	border-radius: 9px


.my--1
	margin-top: -1px 
	margin-bottom: -1px 


.selected
	font-weight: bold
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
	position: relative;
	/* Относительное позиционирование */
}

.tab,
.tab-title {
	display: inline-block;
	/* Выстраиваем по горизонтали */
}

.tab input[type='radio'] {
	display: none;
}

.tab-title {
	background-color: rgb(102, 102, 102);
	/* Цвет фона */
	padding: 5px 10px;
	/* Поля вокруг текста */
	border: 2px solid white;
	/* Параметры рамки */
	border-radius: 10px 10px 0px 0px;
	border-bottom: none;
	/* Снизу линию убираем */
}

.tab-content {
	position: absolute;
	/* Абсолютное позиционирование */
	border: 2px solid white;
	/* Параметры рамки */
	border-radius: 0px 10px 10px 10px;
	padding: 10px;
	/* Поля вокруг текста */
	left: 0;
	/* Размещаем у левого края */
	width: calc(100% - 20px);
	display: none;
	/* Прячем вкладку */
}

.tab :checked+.tab-title {
	position: relative;
	/* Относительное позиционирование */

	background-color: rgb(70, 69, 64);
	top: 2px;
	/* Сдвигаем вниз */
	z-index: 1;
	/* Отображаем поверх содержимого */
}

.tab :checked~.tab-content {
	display: block;
	/* Показываем активную вкладку */
}

.tab :checked~.tab-title {
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
