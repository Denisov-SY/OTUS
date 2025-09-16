import MainLayout from "../layouts/MainLayout.vue";

import Root from "../views/Root.vue";

// import Job from "../views/1_tracking/Job.vue";
// import JobList from "../views/1_tracking/JobList.vue";
import Strip from "../views/1_tracking/Strip.vue";
import StripList from "../views/1_tracking/StripList.vue";
import StripTechOpList from "../views/1_tracking/StripTechOpList.vue";
import Trend from "../views/1_tracking/Trend.vue";

// import Pipe from "../views/1_tracking/Pipe.vue";
// import PipeList from "../views/1_tracking/PipeList.vue";
// import PipeTechOpList from "../views/1_tracking/PipeTechOpList.vue";
// import PipeDefectReport from "../views/1_tracking/PipeDefectReport.vue";
// import PackageList from "../views/1_tracking/PackageList.vue";
// import Package from "../views/1_tracking/Package.vue";


// import RecipeTemplate from "../views/2_recipes/RecipeTemplate.vue";
// import RecipeEdit from "../views/2_recipes/RecipeEdit.vue";

// import RC from "../views/3_workcenters/RC.vue";
// import WcMUST from "../views/3_workcenters/WcMUST.vue";
// import WcPLS from "../views/3_workcenters/WcPLS.vue";
// import WcSMP from "../views/3_workcenters/WcSMP.vue";

import Admin from "../views/4_admin/Admin.vue";
// import CommL1Tag from "../views/4_admin/communication/L1Tag.vue";
// import CommL1Log from "../views/4_admin/communication/L1Log.vue";
// import L2 from "../views/4_admin/communication/L2.vue";
// import CommL3 from "../views/4_admin/communication/L3.vue";
import Access from "../views/4_admin/Access.vue";
import DBLogs from "../views/4_admin/DBLogs.vue";
import DictionarySimple from "../views/4_admin/DictionarySimple.vue";
import DictionaryAttr from "../views/4_admin/DictionaryAttr.vue";
import DictionaryLabelTemplate from "../views/4_admin/DictionaryLabelTemplate.vue";
import DictionaryLabelPrinter from "../views/4_admin/DictionaryLabelPrinter.vue";

import testReport from "../views/4_admin/testReport.vue";

import e403 from "../views/e403.vue";
import e404 from "../views/e404.vue";

export default [
  {
    path: "/",
    name: "root",
    components: { root: MainLayout, default: Root },
    meta: {
      permission: {
        enabled: "root",
        visible: "root",
        // enabled: "false",
        // visible: "false",
      },
    },
    // defaultName: "melt",
    children: [
      // strips
      {
        path: "strips",
        name: "strips",
        label: "Штрипсы",
        visible: true,
        defaultName: "stripList",
        meta: {
          permission: {
            enabled: "strips",
            visible: "strips",
          },
        },
        children: [
          {
            path: "stripList",
            name: "stripList",
            component: StripList,
            label: "Список штрипсов",
            visible: true,
            meta: {
              permission: {
                enabled: "stripList",
                visible: "stripList",
              },
            },
            props: (route) => ({
              dateBeg: route.query.dateBeg,
              dateEnd: route.query.dateEnd,
              stripNumber: route.query.stripNumber,
              jobCode: route.query.jobCode,
              batch: route.query.batch,
              limit: +route.query.limit,
              withDateInterval: route.query.withDateInterval,
              heat: route.query.heat,
              lastWc: route.query.lastWc,
              width: +route.query.width,
              thick: +route.query.thick,
              weightMin: +route.query.weightMin,
              weightMax: +route.query.weightMax,
              status: route.query.status,
              addFilters: route.query.addFilters,
            }),
          },
          {
            path: "strip",
            name: "strip",
            component: Strip,
            label: "Штрипс",
            visible: true,
            meta: {
              permission: {
                enabled: "strip",
                visible: "strip",
              },
            },
            props: (route) => ({
              stripId: +route.query.stripId,
              action: route.query.action,
            }),
          },
          {
            path: "stripTechOpList",
            name: "stripTechOpList",
            component: StripTechOpList,
            label: "ТО штрипсов",
            visible: true,
            meta: {
              permission: {
                enabled: "stripTO",
                visible: "stripTO",
              },
            },
            props: (route) => ({
              wc:
                route.query.wc !== undefined &&
                route.query.wc !== null &&
                route.query.wc !== ""
                  ? +route.query.wc
                  : -1,
              d1: route.query.d1,
              d2: route.query.d2,
              withDateInterval: route.query.withDateInterval,
              stripNumber: route.query.stripNumber,
              jobCode: route.query.jobCode,
              batch: route.query.batch,
              heat: route.query.heat,
              width:
                route.query.width !== undefined &&
                route.query.width !== null &&
                route.query.width !== ""
                  ? +route.query.width
                  : -1,
              thick:
                route.query.thick !== undefined &&
                route.query.thick !== null &&
                route.query.thick !== ""
                  ? +route.query.thick
                  : -1,
              trendAverage: route.query.trendAverage,
              limit:
                route.query.limit !== undefined &&
                route.query.limit !== null &&
                route.query.limit !== ""
                  ? +route.query.limit
                  : -1,
            }),
          },
          {
            path: "trend",
            name: "trend",
            component: Trend,
            label: "График",
            meta: {
              permission: {
                enabled: "stripTrend",
                visible: "stripTrend",
              },
            },
            props: (route) => ({
              stripId: +route.query.stripId,
              stripNumber: route.query.stripNumber,
              wcCode: route.query.wcCode,
            }),
          },
        ],
      },


      // manage
      {
        path: "manage",
        name: "manage",
        label: "Управление",
        visible: true,
        defaultName: "manage-dbLogs",
        meta: {
          permission: {
            enabled: "manage",
            visible: "manage",
          },
        },
        children: [
          // manage-sys - Система
          {
            path: "sys",
            name: "manage-sys",
            component: Admin,
            label: "Система",
            meta: {
              permission: {
                enabled: "admin_disable",
                // visible: "admin",
                visible: "admin_disable",
              },
            },
          },

          // manage-access - Управление доступом
          {
            path: "access",
            name: "manage-access",
            component: Access,
            label: "Управление доступом",
            meta: {
              permission: {
                enabled: "access", //"general", //
                visible: "access", //"general", //
                // enabled: "nnn", //"general", //
                // visible: "nnn", //"general", //
              },
            },
          },
          // manage-dbLogs - Журнал событий
          {
            path: "dbLogs",
            name: "manage-dbLogs",
            component: DBLogs,
            label: "Журнал событий",
            meta: {
              permission: {
                enabled: "logJournal", //"admin",
                visible: "logJournal", //"admin",
              },
            },
          },
          // manage-dict - Справочники
          {
            path: "dict",
            name: "manage-dict",
            label: "Справочники",
            visible: true,
            defaultName: "dict-attr",
            meta: {
              permission: {
                enabled: "dictionarys",
                visible: "dictionarys",
              },
            },
            children: [
              {
                path: "measureUnits",
                name: "dict-MeasureUnits",
                component: DictionarySimple,
                label: "Ед.измерения",
                meta: {
                  permission: {
                    enabled: "dictMeasureUnit", //"admin",
                    visible: "dictMeasureUnit", //"admin",
                  },
                },
                props: (route) => ({
                  dictionary: "MeasureUnits",
                }),
              },
              {
                path: "attr",
                name: "dict-attr",
                component: DictionaryAttr,
                label: "Атрибуты",
                meta: {
                  permission: {
                    enabled: "dictAttr", //"admin",
                    visible: "dictAttr", //"admin",
                  },
                },
              },
              {
                path: "labelPrinter",
                name: "dict-LabelPrinter",
                component: DictionaryLabelPrinter,
                label: "Принтеры",
                meta: {
                  permission: {
                    enabled: "dictLabelPrinter", //"admin",
                    visible: "dictLabelPrinter", //"admin",
                  },
                },
              },
              {
                path: "labelTemplate",
                name: "dict-LabelTemplate",
                component: DictionaryLabelTemplate,
                label: "Шаблоны бирок",
                meta: {
                  permission: {
                    enabled: "dictLabelTemplate", //"admin",
                    visible: "dictLabelTemplate", //"admin",
                  },
                },
              },
            ],
          },
          // manage-dbLogs - Журнал событий
          {
            path: "testReport",
            name: "manage-testReport",
            component: testReport,
            label: "Отчёты(test)",
            meta: {
              permission: {
                enabled: "admin_disable", //"admin",
                // visible: "manage", //"admin",
                visible: "admin_disable",
              },
            },
          },
        ],
      },
      // errors
      {
        path: "errors",
        name: "errors",
        defaultName: "errors-403",
        meta: {
          permission: {
            // enabled: "general",
            visible: "false",
          },
        },
        children: [
          {
            path: "403",
            name: "errors-403",
            component: e403,
            label: "Доступ запрещён",
            meta: {
              permission: {
                // enabled: "general",
                visible: "false",
              },
            },
          },
          {
            path: "404",
            name: "errors-404",
            component: e404,
            label: "Страница не найдена",
            meta: {
              permission: {
                // enabled: "general",
                visible: "false",
              },
            },
          },
        ],
      },
    ],
  },
];
