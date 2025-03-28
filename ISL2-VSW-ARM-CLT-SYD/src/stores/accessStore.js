import { ref, computed } from "vue"
import { defineStore } from "pinia"
// const R_JOB = "job";
// const R_JOB_LIST = "jobList";
// const R_JOB_NEW = "jobNew";
// const R_JOB_EDIT = "jobEdit";
// const R_JOB_DEL = "jobDel";
// const R_JOB_EXCEL = "jobExcel";
const R_STRIP = "strip";
const R_STRIP_LIST = "stripList";
const R_STRIP_NEW = "stripNew";
const R_STRIP_EDIT = "stripEdit";
const R_STRIP_DEL = "stripDel";
const R_STRIP_EXCEL = "stripExcel";
const R_PIPE = "pipe";
const R_PIPE_LIST = "pipeList";
const R_PIPE_NEW = "pipeNew";
const R_PIPE_EDIT = "pipeEdit";
const R_PIPE_DEL = "pipeDel";
const R_PIPE_EXCEL = "pipeExcel";
const R_PIPE_INP_LIMIT = "pipeInpLimit";
const R_PIPE_INP_DATE = "pipeInpDate";
export const useAccessStore = defineStore("accessStore", () => {

  const rights = ref("[]");
  const stats = ref("{}");   // Это не о доступах. Это хранение краткого перечня статусов для отслеживания их изменения

  // Задания 
  const rightsJob = computed(() => {
    const r_arr = JSON.parse(rights.value);
    if(Array.isArray(r_arr)) {
      return {
        view:   r_arr.includes("job"),          // Задание - Доступ к кадру
        new:    r_arr.includes("jobNew"),       // Задание - Создать
        edit:   r_arr.includes("jobEdit"),      // Задание - Редактировать ранее созданное
        del:    r_arr.includes("jobDel"),       // Задание - Удалить
        list:   r_arr.includes("jobList"),      // Задания - Доступ к кадру
        excel:  r_arr.includes("jobExcel"),     // Задания - выгрузка в Excel
      };
    } else {
      return {
        view:   false,     // Задание - Доступ к кадру
        new:    false,     // Задание - Создать
        edit:   false,     // Задание - Редактировать ранее созданное
        del:    false,     // Задание - Удалить
        list:   false,     // Задания - Доступ к кадру
        excel:  false,     // Задания - выгрузка в Excel
      };
    }
  });


  // Штрипсы 
  const rightsStrip = computed(() => {
    const r_arr = JSON.parse(rights.value);
      return Array.isArray(r_arr) ? {
        view:             r_arr.includes("strip"),                    // Штрипс - Доступ к кадру
        new:              r_arr.includes("stripNew"),                 // Штрипс - Создать
        edit:             r_arr.includes("stripEdit"),                // Штрипс - Редактировать ранее созданное
        del:              r_arr.includes("stripDel"),                 // Штрипс - Удалить
        list:             r_arr.includes("stripList"),                // Штрипсы - Доступ к кадру
        excel:            r_arr.includes("stripExcel"),               // Штрипсы - выгрузка в Excel
        trend:            r_arr.includes("stripTrend"),               // Тренды штрипсов - Доступ к кадру
        trendExcel:       r_arr.includes("stripTrendExcel"),          // Тренды штрипсов - выгрузка в Excel
        TO:               r_arr.includes("stripTO"),                  // ТО Штрипсов - Доступ к кадру
        TOExcel:          r_arr.includes("stripTOExcel"),             // ТО Штрипсов - выгрузка в Excel
        TOInpLimit:       r_arr.includes("stripTOInpLimit"),          // ТО Штрипсов - ручной ввод лимита записей
        TOFiltMemory:     r_arr.includes("stripTOFiltMemory"),        // ТО Штрипсов - Память фильтров - Доступ (Применить)
        TOFiltMemorySave: r_arr.includes("stripTOFiltMemorySave"),    // ТО Штрипсов - Память фильтров - Сохранить
        TOFiltMemoryDel:  r_arr.includes("stripTOFiltMemoryDel"),     // ТО Штрипсов - Память фильтров - Удалить
      } :  
      {
        view:             false,    // Штрипс - Доступ к кадру
        new:              false,    // Штрипс - Создать
        edit:             false,    // Штрипс - Редактировать ранее созданное
        del:              false,    // Штрипс - Удалить
        list:             false,    // Штрипсы - Доступ к кадру
        excel:            false,    // Штрипсы - выгрузка в Excel
        trend:            false,    // Тренды штрипсов - Доступ к кадру
        trendExcel:       false,    // Тренды штрипсов - выгрузка в Excel
        TO:               false,    // ТО Штрипсов - Доступ к кадру
        TOExcel:          false,    // ТО Штрипсов - выгрузка в Excel
        TOInpLimit:       false,    // ТО Штрипсов - ручной ввод лимита записей
        TOFiltMemory:     false,    // ТО Штрипсов - Память фильтров - Доступ (Применить)
        TOFiltMemorySave: false,    // ТО Штрипсов - Память фильтров - Сохранить
        TOFiltMemoryDel:  false,    // ТО Штрипсов - Память фильтров - Удалить
      };
  });

  // Трубы 
  const rightsPipe = computed(() => {
    const r_arr = JSON.parse(rights.value);
      return Array.isArray(r_arr) ? {
        view:             r_arr.includes("pipe"),                   // Труба - Доступ к кадру
        new:              r_arr.includes("pipeNew"),                // Труба - Создать
        edit:             r_arr.includes("pipeEdit"),               // Труба - Редактировать ранее созданное
        del:              r_arr.includes("pipeDel"),                // Труба - Удалить
        list:             r_arr.includes("pipeList"),               // Трубы - Доступ к кадру
        excel:            r_arr.includes("pipeExcel"),              // Трубы - выгрузка в Excel
        inpLimit:         r_arr.includes("pipeInpLimit"),           // Трубы - ручной ввод лимита записей
        inpDate:          r_arr.includes("pipeInpDate"),            // Трубы - ручной ввод даты и времени
        TO:               r_arr.includes("pipeTO"),                 // ТО Труб - Доступ к кадру
        TOExcel:          r_arr.includes("pipeTOExcel"),            // ТО Труб - выгрузка в Excel
        TOInpLimit:       r_arr.includes("pipeTOInpLimit"),         // ТО Труб - ручной ввод лимита записей
        TOFiltMemory:     r_arr.includes("pipeTOFiltMemory"),       // ТО Труб - Память фильтров - Доступ (Применить)
        TOFiltMemorySave: r_arr.includes("pipeTOFiltMemorySave"),   // ТО Труб - Память фильтров - Сохранить
        TOFiltMemoryDel:  r_arr.includes("pipeTOFiltMemoryDel"),    // ТО Труб - Память фильтров - Удалить
        DR:               r_arr.includes("pipeDR"),                 // Отчёт о дефетах труб - Доступ к кадру
        DRExcel:          r_arr.includes("pipeDRExcel"),            // Отчёт о дефетах труб - выгрузка в Excel
        DRInpLimit:       r_arr.includes("pipeDRInpLimit"),         // Отчёт о дефетах труб - ручной ввод лимита записей
        DRFiltMemory:     r_arr.includes("pipeDRFiltMemory"),       // Отчёт о дефетах труб - Память фильтров - Доступ (Применить)
        DRFiltMemorySave: r_arr.includes("pipeDRFiltMemorySave"),   // Отчёт о дефетах труб - Память фильтров - Сохранить
        DRFiltMemoryDel:  r_arr.includes("pipeDRFiltMemoryDel"),    // Отчёт о дефетах труб - Память фильтров - Удалить
      } :  
      {
        view:             false,   // Труба - Доступ к кадру
        new:              false,   // Труба - Создать
        edit:             false,   // Труба - Редактировать ранее созданное
        del:              false,   // Труба - Удалить
        list:             false,   // Трубы - Доступ к кадру
        excel:            false,   // Трубы - выгрузка в Excel
        inpLimit:         false,   // Трубы - ручной ввод лимита записей
        inpDate:          false,   // Трубы - ручной ввод даты и времени
        TO:               false,   // ТО Труб - Доступ к кадру
        TOExcel:          false,   // ТО Труб - выгрузка в Excel
        TOInpLimit:       false,   // ТО Труб - ручной ввод лимита записей
        TOFiltMemory:     false,   // ТО Труб - Память фильтров - Доступ (Применить)
        TOFiltMemorySave: false,   // ТО Труб - Память фильтров - Сохранить
        TOFiltMemoryDel:  false,   // ТО Труб - Память фильтров - Удалить
        DR:               false,   // Отчёт о дефетах труб - Доступ к кадру
        DRExcel:          false,   // Отчёт о дефетах труб - выгрузка в Excel
        DRInpLimit:       false,   // Отчёт о дефетах труб - ручной ввод лимита записей
        DRFiltMemory:     false,   // Отчёт о дефетах труб - Память фильтров - Доступ (Применить)
        DRFiltMemorySave: false,   // Отчёт о дефетах труб - Память фильтров - Сохранить
        DRFiltMemoryDel:  false,   // Отчёт о дефетах труб - Память фильтров - Удалить
      };
  });

  // Пакеты
  const rightsPackage = computed(() => {
    const r_arr = JSON.parse(rights.value);
      return Array.isArray(r_arr) ? {
        view:     r_arr.includes("package"),          // Пакет - Доступ к кадру
        new:      r_arr.includes("packageNew"),       // Пакет - Создать
        edit:     r_arr.includes("packageEdit"),      // Пакет - Редактировать ранее созданное
        del:      r_arr.includes("packageDel"),       // Пакет - Удалить
        label:    r_arr.includes("packageLabel"),     // Пакет - Печать бирки
        list:     r_arr.includes("packageList"),      // Пакеты - Доступ к кадру
        excel:    r_arr.includes("packageExcel"),     // Пакеты - выгрузка в Excel
        inpLimit: r_arr.includes("packageInpLimit"),  // Пакеты - ручной ввод лимита записей
      } :  
      {
        view:   false,     // Пакет - Доступ к кадру
        new:    false,     // Пакет - Создать
        edit:   false,     // Пакет - Редактировать ранее созданное
        del:    false,     // Пакет - Удалить
        label:  false,     // Пакет - Печать бирки
        list:   false,     // Пакеты - Доступ к кадру
        excel:  false,     // Пакеты - выгрузка в Excel
        inpLimit:  false,  // Пакеты - ручной ввод лимита записей
      };
  });


  // Рецепты
  const rightsRecipe = computed(() => {
    const r_arr = JSON.parse(rights.value);
      return Array.isArray(r_arr) ? {
        view:             r_arr.includes("recipe"),          // Рецепт - Доступ к кадру
        new:              r_arr.includes("recipeNew"),       // Рецепт - Создать
        edit:             r_arr.includes("recipeEdit"),      // Рецепт - Редактировать ранее созданнsq
        del:              r_arr.includes("recipeDel"),       // Рецепт - Удалить
        send:             r_arr.includes("recipeSend"),      // Рецепт - Удалить
        template:         r_arr.includes("recipeTemplate"),          // Шаблоны рецептов - Доступ к кадру
        templateNew:      r_arr.includes("recipeTemplateNew"),       // Шаблоны рецептов - Создать
        templateEdit:     r_arr.includes("recipeTemplateEdit"),      // Шаблоны рецептов - Редактировать ранее созданнsq
        templateDel:      r_arr.includes("recipeTemplateDel"),       // Шаблоны рецептов - Удалить
      } :  
      {
        view:             false,     // Рецепт - Доступ к кадру
        new:              false,     // Рецепт - Создать
        edit:             false,     // Рецепт - Редактировать ранее созданное
        del:              false,     // Рецепт - Удалить
        send:             false,     // Рецепт - Печать бирки
        template:         false,      // Шаблоны рецептов - Доступ к кадру
        templateNew:      false,      // Шаблоны рецептов - Создать
        templateEdit:     false,      // Шаблоны рецептов - Редактировать ранее созданнsq
        templateDel:      false,      // Шаблоны рецептов - Удалить
      };
  });



  // // Задание - Доступ к кадру
  // const rJob = computed(() => {
  //   const r_arr = JSON.parse(rights.value);
  //   return Array.isArray(r_arr) ? r_arr.includes(R_JOB) : false;
  // });
  // // Задание - Создать
  // const rJobNew = computed(() => {
  //   const r_arr = JSON.parse(rights.value);
  //   return Array.isArray(r_arr) ? r_arr.includes(R_JOB_NEW) : false;
  // });
  // // Задание - Редактировать ранее созданное
  // const rJobEdit = computed(() => {
  //   const r_arr = JSON.parse(rights.value);
  //   return Array.isArray(r_arr) ? r_arr.includes(R_JOB_EDIT) : false;
  // });
  // // Задание -Удалить
  // const rJobDel = computed(() => {
  //   const r_arr = JSON.parse(rights.value);
  //   return Array.isArray(r_arr) ? r_arr.includes(R_JOB_DEL) : false;
  // });
  // // Задания - Доступ к кадру
  // const rJobList = computed(() => {
  //   const r_arr = JSON.parse(rights.value);
  //   return Array.isArray(r_arr) ? r_arr.includes(R_JOB_LIST) : false;
  // });
  // // Задания - выгрузка в Excel
  // const rJobExcel = computed(() => {
  //   const r_arr = JSON.parse(rights.value);
  //   return Array.isArray(r_arr) ? r_arr.includes(R_JOB_EXCEL) : false;
  // });

  // // Штрипс - Доступ к кадру
  // const rStrip = computed(() => {
  //   const r_arr = JSON.parse(rights.value);
  //   return Array.isArray(r_arr) ? r_arr.includes(R_STRIP) : false;
  // });
  // // Штрипс - Создать
  // const rStripNew = computed(() => {
  //   const r_arr = JSON.parse(rights.value);
  //   return Array.isArray(r_arr) ? r_arr.includes(R_STRIP_NEW) : false;
  // });
  // // Штрипс - Редактировать ранее созданное
  // const rStripEdit = computed(() => {
  //   const r_arr = JSON.parse(rights.value);
  //   return Array.isArray(r_arr) ? r_arr.includes(R_STRIP_EDIT) : false;
  // });
  // // Штрипс -Удалить
  // const rStripDel = computed(() => {
  //   const r_arr = JSON.parse(rights.value);
  //   return Array.isArray(r_arr) ? r_arr.includes(R_STRIP_DEL) : false;
  // });
  // // Штрипсы - Доступ к кадру
  // const rStripList = computed(() => {
  //   const r_arr = JSON.parse(rights.value);
  //   return Array.isArray(r_arr) ? r_arr.includes(R_STRIP_LIST) : false;
  // });
  // // Штрипсы - выгрузка в Excel
  // const rStripExcel = computed(() => {
  //   const r_arr = JSON.parse(rights.value);
  //   return Array.isArray(r_arr) ? r_arr.includes(R_STRIP_EXCEL) : false;
  // });
  
  // // Труба - Доступ к кадру
  // const rPipe = computed(() => {
  //   const r_arr = JSON.parse(rights.value);
  //   return Array.isArray(r_arr) ? r_arr.includes(R_PIPE) : false;
  // });
  // // Труба - Создать
  // const rPipeNew = computed(() => {
  //   const r_arr = JSON.parse(rights.value);
  //   return Array.isArray(r_arr) ? r_arr.includes(R_PIPE_NEW) : false;
  // });
  // // Труба - Редактировать ранее созданное
  // const rPipeEdit = computed(() => {
  //   const r_arr = JSON.parse(rights.value);
  //   return Array.isArray(r_arr) ? r_arr.includes(R_PIPE_EDIT) : false;
  // });
  // // Труба -Удалить
  // const rPipeDel = computed(() => {
  //   const r_arr = JSON.parse(rights.value);
  //   return Array.isArray(r_arr) ? r_arr.includes(R_PIPE_DEL) : false;
  // });
  // // Трубы - Доступ к кадру
  // const rPipeList = computed(() => {
  //   const r_arr = JSON.parse(rights.value);
  //   return Array.isArray(r_arr) ? r_arr.includes(R_PIPE_LIST) : false;
  // });
  // // Трубы - выгрузка в Excel
  // const rPipeExcel = computed(() => {
  //   const r_arr = JSON.parse(rights.value);
  //   return Array.isArray(r_arr) ? r_arr.includes(R_PIPE_EXCEL) : false;
  // });
  // // Трубы - ручной ввод лимита записей
  // const rPipeInpLimit = computed(() => {
  //   const r_arr = JSON.parse(rights.value);
  //   return Array.isArray(r_arr) ? r_arr.includes(R_PIPE_INP_LIMIT) : false;
  // });
  // // Трубы - ручной ввод даты и времени
  // const rPipeInpDate = computed(() => {
  //   const r_arr = JSON.parse(rights.value);
  //   return Array.isArray(r_arr) ? r_arr.includes(R_PIPE_INP_DATE) : false;
  // });

  // Это не о доступах. Это для хранения краткого перечня статусов для отслеживания их изменения
  const IslStatsCurrrent = computed(() => {
    return stats.value || "{}";
  });


  function newRights(new_rights) {
    rights.value = JSON.stringify( Array.isArray(new_rights) ? new_rights : [] );
  }


  // Это не о доступах. Это для хранения краткого перечня статусов для отслеживания их изменения
  function IslNewStats(new_stats) {
    stats.value = JSON.stringify( new_stats ? new_stats : {} );
  }
    // return {rJob, rJobNew, rJobEdit, rJobDel, rJobList,  rJobExcel, 
    //         rStrip, rStripNew, rStripEdit, rStripDel, rStripList,  rStripExcel, 
    //         rPipe, rPipeNew, rPipeEdit, rPipeDel, rPipeList,  rPipeExcel, rPipeInpLimit, rPipeInpDate, 
    //         rights, newRights};
    return {rightsJob, rightsStrip, rightsPipe, rightsPackage, rightsRecipe,
            rights, newRights,
            stats, IslStatsCurrrent, IslNewStats,};
});