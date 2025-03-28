<template>

  <!-- <div style= "width: 100%;"> -->
    <div class="row blockt-h100">
      <div class="col-12 pmy0">
        <div class="row header pmy0">
          <div class="col-6 pmy0 ">
            <div class="row float-right pmy0 ">
              <p> Память наборов фильтров</p>
            </div>
          </div>
          <div class="col-6 pmy0 ">
            <div class="row float-right pmy0 ">
							<span class="pmx0"> 
								<q-checkbox style="margin-top: -5px; margin-right: 15px;" label="" left-label size="xs"  
                  indeterminate-icon="close" unchecked-icon="close" checked-icon="close"  
                  v-model="CloseFakeMidel"   color="white" @update:model-value="on_hide()"/>
                <!-- indeterminate-icon="highlight_off" @click="on_hide()"/> -->
									<!--  v-model="FiltrStoreEdit" @update:model-value="FiltrStoreEditFirstTime = true"/> -->
							</span>
            </div>
          </div>
        </div>
        <div class="row pmy0">
          <div class="col-12 pmy0">
            <div class="border-silver">
              <div class="row pmy0">
                <div class="col-7">
                  <div class="row pmy0 pmx5" >

                    <!-- <div class="col-12 col-lg-6 col-md-6 pmy1" style="display: block; text-align: right;">  -->
                    <div class="col-12 col-lg-7 col-md-7 pmy1" > 
                      <q-btn no-caps :class="`${LoadDataNeed ? 'btn-vmz1' : 'btn-vmz'}`" label="Обновить" @click="loadDataParams"
                        title="Чтение/обновление списка наборов фильтров из БД согласно заданного фильтра" />
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <q-btn no-caps class="btn-vmz" label="Применить" @click="applyParams()" 
                        title="Применить выбранный набор" />
                    </div>
                    <div class="col-12 col-lg-5 col-md-5 pmy1" style="display: block; text-align: center;">
                      <q-input v-model="MyFilter.filtName" outlined filled dense color="black" bg-color="white" label="Имя набора (поиск):" type="text" 
                        title="Поиск по имени набора фильтров"
                        @update:model-value="MyFilterChange" input-class="input1" style="width: 100%;" />
                    </div>
                  </div>
                  <!-- Таблица -->
                  <div class="row pmy1 pmx5">
                    <div class="col-12 py-1">
                      <q-table flat bordered _title="Наборы фильтров и свойств" dense separator="cell" class="table-style1" :rows="Params" :columns="columns" :visible-columns="visibleColumns"
                        row-key="UI_PARAMS_ID" :filter="MyFilter" :filter-method="MyFilterMethod" @row-click="cellSelect" :rows-per-page-options="[5, 10, 15, 20, 25, 40, 50, 0]"
                        
                        selection="single" v-model:selected="paramsSelected" ref="refParamsList"
                        :selected-rows-label="(num) => 'Выбран набор: ' + paramsSelected[0].NAME" >
                        <template v-slot:header-selection="scope">
                        </template>
                        <template v-slot:body-selection="scope">
                          {{ scope.rowIndex + 1 }}
                        </template>

                        <template v-slot:loading>
                          <q-inner-loading showing />
                        </template>
                      </q-table>
                      <!-- v-model:pagination="MyPagination" 
                      ref="refPackageList"-->
                    </div>
                  </div>


                </div>

                

                <div class="col-5">
                  <div class="row blockt-h100">
                    <div class="col-12">
                      <div class="row pmy0" style="display: block; text-align: center;">
                        <!-- <q-btn no-caps class="btn-vmz" label="Применить выбранный набор" @click="applyParams()" 
                          title="Применить выбранный набор" /> -->
                        <!-- &nbsp;&nbsp;&nbsp;&nbsp;
                        <q-btn no-caps class="btn-vmz" label="Скрыть панель" @click="on_hide()" 
                          title="Скрыть область чтение/записи данных фильтров" /> -->
                      </div>
                      <!-- <div class="row pmy0" style="display: block; text-align: center;">
                        <span class="my-header0">  Поиск:</span>
                      </div>
                      <div class="row pmy0" >
                        <div class="col-12 col-lg-6 col-md-6 pmy1 px5" style="display: block; text-align: center;">
                          <q-input v-model="MyFilter.filtName" outlined filled dense color="black" bg-color="white" label="Наименование набора:" type="text" 
                          @update:model-value="MyFilterChange" input-class="input1" style="width: 100%;" />
                        </div>
                        <div class="col-12 col-lg-6 col-md-6 pmy1 px5" style="display: block; text-align: right;"> 
                          <q-btn no-caps :class="`${LoadDataNeed ? 'btn-vmz1' : 'btn-vmz'}`" label="Обновить" @click="loadDataParams"
                              title="Обновить. Чтение данных из БД согласно заданного фидьтра" />
                        </div>
                      </div> -->
                      <div class="row pmy0" style="display: block; text-align: center; margin-top: 10px;">
                        <span class="my-header0">  Сохранение:</span>
                      </div>
                      <div class="row pmy0" >
                        <!-- <div class="col-12 col-lg-9 col-md-9 pmy1 px5" style="display: block; text-align: center;"> -->
                        <div class="col-12 pmy1 px5" style="display: block; text-align: center;">
                          <!-- <q-input v-model="EditName" outlined filled dense label="Имя набора (для сохранения):" type="text" style="width: 100%;" 
                            :readonly="props.readonly ?? true" 
                            :label-color="(props.readonly ?? true) ? 'grey-3' : 'black'" :bg-color="(props.readonly ?? true) ? 'grey-7' : 'white'"
                            :input-class="(props.readonly ?? true) ? 'input1-read-only' : 'input1'" /> -->
                          <q-input v-model="EditName" outlined filled dense label="Имя набора (для сохранения):" type="text" style="width: 100%;" 
                            :readonly="!props.saveEnable ?? true" 
                            :label-color="(props.saveEnable ?? false) ? 'black' : 'grey-3'" :bg-color="(props.saveEnable ?? false) ? 'white' : 'grey-7'"
                            :input-class="(props.saveEnable ?? false) ? 'input1' : 'input1-read-only'" />
                        </div>
                        <div class="col-12 col-lg-3 col-md-3 pmy1 px5" style="display: block; text-align: right;"> 

                        </div>
                      </div>
                      <div class="row pmy0" style="display: block; text-align: center;">
                        <q-btn v-if="props.saveEnable" no-caps class="btn-vmz" label="Сохранить" @click="btnSaveDataParams" 
                          title="Сохранить текущие данные фильтров в БД" />
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <q-btn v-if="props.deleteEnable" no-caps class="btn-vmz" label="Удалить" @click="btnDelDataParams" 
                          title="Удалить выбранную строку" />
                      </div>
                    </div>
                  </div>
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
// import { QList, QItem, QItemSection, QToggle, useQuasar, QInput, QDialog, QCard } from "quasar";
import { ref, watch, onMounted, onUpdated, onActivated, computed } from "vue";
import { QList, QItem, QItemSection, QToggle, useQuasar, QInput } from "quasar";
import moment from "moment";

import { loadData, sendData } from "./serverData";
import { ui as url } from "../router/dataUrl";

// import access from "./access";
import alertPro from './alertPro.vue';
import confirmPro from './confirmPro.vue';
// const ThisEnable = ref(true);
const props = defineProps({
  // modelValue: {}, 
  modelValue: String,
  // showValue: Boolean,
  saveparams: String, 
  address: String,
  // readonly: Boolean,            // Если не установлено, считаем true
  saveEnable: Boolean,
  deleteEnable: Boolean,
  // maxInterval: Number,
});

const emits = defineEmits(["update:modelValue", "hide"]);

const FORMAT_DATETIME_SEC = "YYYY-MM-DD HH:mm:ss";
const loading = ref(false);
const loading_label = ref("");
const $q = useQuasar();
const Params = ref([]);
const paramsSelected = ref([]);
const LoadDataNeed = ref(false);
const refParamsList = ref(); 
const CloseFakeMidel = ref();    // Без этого работает, но ругается 

const EditName = ref("");
const EditName0 = "";
const EditId = ref(-1);

const MyFilter = ref({
	filtName: "",
});

const MyFilterRemember = { 
	filtName: 						MyFilter.value.filtName,
};


const columns = ref([
	{
		name: "NAME",
		required: true,
		label: "Имя набора фильтров",
		align: "left",
		classes: (row) => cellClass(row),
		field: (row) => row.NAME,
		format: (val) => `${val}`,
		sortable: true,
	},
	{ name: "UI_PARAMS_ID", label: "UI_PARAMS_ID", field: "UI_PARAMS_ID" },
	{ name: "ADDRESS", label: "ADDRESS", field: "ADDRESS" },
	{ name: "PARAMS", label: "PARAMS", field: "PARAMS" },
	{
		name: "MODIFY_DATE",
		required: true,
		label: `Дата изменения`,
		align: "center",
		field: "MODIFY_DATE",
		classes: cellClass,
		format: (val) => val ? `${moment(val).format(FORMAT_DATETIME_SEC)}` : "",
		sortable: true,
	},
]);

const visibleColumns = ref(["NAME", "MODIFY_DATE",]);

onMounted(async () => {

// onUpdated(async () => {
	const PROC_NAME = "onMounted> ";
	// console.log(`${PROC_NAME} Начало - props.showValue= `, showV.value);
	// console.log(`${PROC_NAME} this._inactive=`, _inactive);
	// loadDictionaryPackageStatus();
	loadDataParams();
});



/**
 * обработка выбора строки
 * @param evt 
 * @param row 
 * @param index 
 */
function cellSelect(evt, row, index) {
	Params.value.forEach((item) => {
		item.screen_select = false;
	});
	row.screen_select = true;
	// console.log("Params.value = ", Params.value);
	paramsSelected.value.length = 0;
	paramsSelected.value.push(row);
  EditId.value = row.UI_PARAMS_ID;
  EditName.value = row.NAME;
}

async function loadDataParams() {    // Загрузка даннных
	const PROC_NAME ="loadDataParams>";
	if (!loading.value) s_loading(true, "Подождите, загружаются данные по сохранённым фильтрам");  // 

	console.log(PROC_NAME + "Запрос данных по сохранённым фильтрам");
	const ret_params = await loadData({
		url: url.params.get, params: {
			...(props.address && props.address.trim().length > 0 && { "address": props.address }),
			...(MyFilter.value.filtName && MyFilter.value.filtName.trim().length > 0 && { "name": `%${MyFilter.value.filtName.trim()}%` }),
		}
	});
	MyFilterRemember.filtName 					= MyFilter.value.filtName;

	console.log(PROC_NAME + " ret_params = ", ret_params);

	if (ret_params.error) {
		// s_loading(false);
		s_alert("Загрузка данных по сохранённым фильтрам произошла с ошибкой. Повторите попытку позже", ret_params.error.message ?? "");
	} else {
		if (ret_params.length === 0) {
			s_alert("По заданным условиям по сохранённым фильтрам не найдено данных");
		}
		// Сортировка массива по адресам (на всякий случай, хотя не должно быть разных адресов) и по имени  
		ret_params.sort((a,b) => {
			if( (a.ADDRESS || '') !==  (b.ADDRESS || '') ) {
				if((a.ADDRESS || '') > (b.ADDRESS || '')) return 1;
				if((a.ADDRESS || '') < (b.ADDRESS || '')) return -1;
			} else {
        if((a.NAME || '') > (a.NAME || '')) return 1;
        if((a.NAME || '') < (a.NAME || '')) return -1;
      }
			return 0;
		});
		ret_params.forEach((item, idx) => {
			item.screen_select = Params.value?.find(s => (s.UI_PARAMS_ID	=== item.UI_PARAMS_ID))?.screen_select ?? false;    // восстанавливаем ввыбранную строку, если была
			item.hidden_row = Params.value?.find(s => (s.UI_PARAMS_ID === item.UI_PARAMS_ID))?.hidden_row ?? false;   // Возможно, лиишнее, но не повредит
		});
		Params.value = ret_params;
	}
  s_loading(false);
};

/**
 * Действия по кнопке Сохранить
 */
function btnSaveDataParams() {
  if(!EditName.value.trim()) {    s_alert("Не введено имя набора данных");   return;  }
  if(!(props.saveparams?.trim().length > 0))  {    s_alert("Нет данных для записи. Настройте фиильтры и повторите попытку позже");   return;  }
  if(!(props.address?.trim().length > 0))  {    s_alert("Нет данных для записи. Не сконфигурирован адрес кадра. Обратитесь к разработчикам");   return;  }
  s_confirm(`Вы действительно хотите сохранить текущие фильтры под именем "${EditName.value.trim()}"? Если набор с таким именем для данного кадра уже существует, он будет перезаписан.`, saveDataParams);
};

/**
 * Срохрание набора в БД
 */
async function saveDataParams() {
  const PROC_NAME ="saveDataParams>";
  s_loading(true, "Подождите. Производится запись данных");
  const par  = {
    ADDRESS:      props.address,
    NAME:         EditName.value.trim(),
    PARAMS:       props.saveparams,
  };
  if(EditId.value > 0 && EditName.value.trim() === EditName0)   par.UI_PARAMS_ID = EditId.value;

  console.log(PROC_NAME + "Подготовлен к записи par= ", par);
  // return;
  const ret_save = await sendData({ url: url.params.save, params: par,  });
  // обработка результата записи
  if(ret_save ) {
    console.log("ret_save= ", ret_save);
    // пока нет

    if(ret_save?.error) {
      s_loading(false);
      // s_alert("Запись данных произошла с ошибкой. Повторите попытку позже");

      if(ret_save.error.message) {
        let msg = "";
        
        if( msg ) {
          // s_alert("Ошибка записи данных. " + msg);
          s_alert(msg);
        } else {
          s_alert("Запись данных произошла с ошибкой. Повторите попытку позже", ret_save.error.message ?? "");
        }

      } else {
        s_alert("Запись данных произошла с неизвестной ошибкой. Повторите попытку позже" );
      }
    
    } else {
      // if( ret_save !== false && typeof(ret_save) === "number")  {  // Операция прошла успешно
      // return;
      if( ret_save.ui_params_id && ret_save.ui_params_id > 0 )  {  // Операция прошла успешно
        // console.log("ret_save = ", ret_save);
        // console.log("typeof(ret_save) = ", typeof(ret_save));
        s_loading(false);
        // s_alert(`Операция прошла успешно. Для продолжения редактирования шажмите кнопку "Редактировать"`);
				$q.notify({
					message: `Операция сохранения прошла успешно.`,
					type: 'positive',
					// icon: ''
				});
        EditId.value = ret_save.ui_params_id;
        loadDataParams();
      } else {
        s_loading(false);
        
        let msg = "";
        let idx = ret_save.ret_msg?.indexOf("ОШИБКА");
        console.log("idx=", idx);
        if(idx >= 0) {
          msg = ret_save.ret_msg.substring(idx);
          let idx1 = msg.indexOf("Pipe_");
          console.log("idx1=", idx1);
          if (idx1 > 0) msg = msg.substring(0, idx1);
        }
        if( msg ) {
          s_alert("Ошибка: " + msg);
          // s_alert("Ошибка записи данных. " + msg);
        } else {
          s_alert("Запись данных произошла с ошибкой. Повторите попытку позже", ret_save.ret_msg ?? "");
        }
      }
    }
  }
};


//  Удаление выбранного пакета
function btnDelDataParams(evt, go) {
	if (find_select_row(Params.value)) {
		const del_params = paramsSelected.value[0]; 
		console.log("find_select_row(Params.value)= ", del_params);
		// if (!access.check("admin")) {
		// 	s_alert(`Удаление для текущего пользователя запрещено`);
		// } else {
		// 	s_confirm(`Вы уверены, что хотите удалить набор "${del_params.NAME}"?.`,DelDataParams, { id: del_params.UI_PARAMS_ID, });
		// }
		s_confirm(`Вы уверены, что хотите удалить набор "${del_params.NAME}"?.`,DelDataParams, { id: del_params.UI_PARAMS_ID, });
	} else {
		s_alert("Не выбран набор. Выберите набор и повторите попытку");
	}
}

// Действия по удалению
async function DelDataParams({ id }) {
	console.log("id набора для удаления= ", id);

	if (id && id > 0 ) {   // 
		s_loading(true, "Выполняется операция удаления");
		const ret_save = await sendData({ url: url.params.save, params: { UI_PARAMS_ID: id,  }, });
		// обработка результата записи
		if (ret_save) {
			console.log("ret_save= ", ret_save);
			// пока нет
		}
		if (ret_save?.error) {
			s_loading(false);
			s_alert(`Операция удаления завершена с ошибкой. Повторите попытку позже.`, ret_save.error.message ?? "");
		} else {
			// if (ret_save === true) {   // Если удаление прошло успешно
			if (ret_save.ui_params_id && ret_save.ui_params_id > 0) {   // Если удаление прошло успешно
				// Необходимо обновить список
				s_loading(false);
				loadDataParams();
        EditId.value = -1;
        EditName.value = "";
			} else {   // по идее, этой ситуации быть не должно
				s_loading(false);
				s_alert("Операция удаления завершена некорректно");
				loadDataParams();
			}
		}
	} else {  
		
	}
}

// Применеие выбранных параметров. передача в v-model внешнего объекта
function applyParams() {
  if (find_select_row(Params.value)) {
		const sel_params = paramsSelected.value[0]; 
		console.log("find_select_row(Params.value)= ", sel_params);
    emits("update:modelValue", sel_params.PARAMS);
	} else {
		s_alert("Не выбран набор. Выберите набор и повторите попытку");
	}
};

function on_hide() {
  // emits("update:modelValue", { from: selTimeFrom.value, to: selTimeTo.value, });
  CloseFakeMidel.value = null;  // Чтоб значок не "темнел", когда модель в true
  emits('hide');
}


// поиск выбранной строки для перехода на другой экран. Пока не запариваемся на то, есть ли она на текущей странице
function find_select_row(rows) {
	// if(rows && rows.isArray()) {
	if (rows?.length > 0) {
		return rows.find((row, ind, arr) => (row.screen_select === true && row.hidden_row === false));
	}
	return null;
}

// класс для выбранной строки
function cellClass(row) {
	return row.screen_select ? 'table-row-sel2' : '';
}

/**
 * Проверка фильтров на факт изменения ситуации (охвата необходимого контента предыдущим запросом) после поседней загрузки данных
 */
 function MyFilterChange() {
	const PROC_NAME = "MyFilterChange";
	let need = false;

  //  Имя
  if( MyFilterRemember.filtName.length > 0) {            // проверка только если запомнен фильтпр
    if( MyFilter.value.filtName.length === 0 ) {
      need = true;
    } else {
      if(MyFilter.value.filtName.indexOf(MyFilterRemember.filtName) < 0 )   need = true;
    }
  }

	LoadDataNeed.value = need;
};


// Обработка фильтров
function MyFilterMethod(rows, terms, cols, getCellValue) {
	const PROC_NAME = "MyFilterMethod>";
	// console.log(PROC_NAME + 'filter-method-terms= ', terms);
	// console.log('filter-m/ethod rows= ', rows);
	let idx = 0;
	if (rows?.length) {
		for (let i = 0; i < rows.length; i++) {
			if (terms.filtName && (rows[i].NAME || "").indexOf(terms.filtName) < 0) { rows[i].hidden_row = true; continue; };
			rows[i].hidden_row = false;
		}
	}
	// console.log('filter-method-rows= ', rows);
	return rows.filter(item => item.hidden_row === false) || [];
};


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


// вызов ожидания загрузки данных
function s_loading(show_enable, txt) {
	if (show_enable) loading_label.value = txt;
	loading.value = show_enable;
}
</script>

<style lang="sass" scoped>
.my-header0
	font-size: 14pt 
  
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
</style>