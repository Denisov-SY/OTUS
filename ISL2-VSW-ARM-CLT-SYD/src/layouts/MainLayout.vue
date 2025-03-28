<template class="main-backcolor main-text p-2">
  <q-layout view="hHh Lpr lFf" class="main-backcolor main-text">
    <q-header class="blockt_main" :class="1 || $q.dark.isActive ? 'main-text-dark main-backcolor-dark' : 'main-text-light main-backcolor-light'">
      <q-toolbar class="main-backcolor header-menu-top">
        <q-btn flat dense round class="btn-vmz" icon="menu" aria-label="Menu" color="grey-6" @click="leftMenuOpen = !leftMenuOpen" />

        <q-toolbar-title @click="titleClick" shrink>
          <div style="height: 50px;">
          </div>
        </q-toolbar-title>
        <q-space></q-space>
        <div>

        </div>
        <q-separator inset vertical />

        <div style="height: 50px;">

        </div>

        <q-separator inset vertical />
        <div>
          <q-icon style="width: 2rem; text-align: center;" :name="user ? 'logout' : 'login'" color="grey-6" size="xs" @click="userAuthenticate" />
          <span :style="serverUsernameDifferent ? 'color: red; font-weight: bold;' : ''" :class="serverUsernameDifferent ? 'text-shine' : ''">
            {{ userLogged?.username }}
          </span>
          <q-icon style="width: 2rem; text-align: center;" :color="$q.dark.isActive ? 'grey-10' : 'grey-4'" size="xs" name="dark_mode" @click="toggleTheme" />
        </div>
        <!-- <q-separator inset vertical /> -->
        <div style="width: 4rem; text-align: center;" :title="nowDate" @click="loadInfo(true)">{{ nowTime }}</div>
      </q-toolbar>
    </q-header>


    <q-drawer class="left-side-menu" v-model="leftMenuOpen" :width="sideMenuWidth" show-if-above bordered>
    <!-- <q-drawer class="left-side-menu" v-model="leftMenuOpen" :width="sideMenuWidth" bordered> -->
      <q-list>
        <template v-for="(r1, idx) in routesMain" :key="(routesMain?.name + '-' + r1.name)">
          <q-expansion-item v-if="!!userChange && !!r1.label?.trim() && menuItemVisible(r1)" :class="(routesMain?.name + '-' + r1.name)"
            :label="r1.label" :header-inset-level="0" :content-inset-level="0.2" :default-opened="true" :to="{ name: r1.name }" active-class="left-side-menu-active">
            <template v-if="r1.children">

              <template v-for="(r2, idx) in r1.children" :key="(r1?.name + '-' + r2.name)">
                <q-expansion-item v-if="!!userChange && menuItemVisible(r2)" :class="(r1?.name + '-' + r2.name)" :label="r2.label"
                  :header-inset-level="0" :content-inset-level="0.2" :hide-expand-icon="!r2.children" :to="{ name: r2.name }" active-class="left-side-menu-active">
                  <template v-if="r2.children">

                    <template v-for="(r3, idx) in r2.children" :key="(r1?.name + '-' + r2?.name + '-' + r3.name)">
                      <q-expansion-item v-if="!!userChange && menuItemVisible(r3)" :class="(r1?.name + '-' + r2?.name + '-' + r3.name)"
                        :label="r3.label" :header-inset-level="0" :content-inset-level="0.2" :hide-expand-icon="!r3.children" :to="{ name: r3.name }"
                        active-class="left-side-menu-active">
                        <template v-if="r3.children">

                          <template v-for="(r4, idx) in r3.children" :key="(r1?.name + '-' + r2?.name + '-' + r3.name + '-' + r4.name)">
                            <q-expansion-item v-if="!!userChange && menuItemVisible(r4)"
                              :class="(r1?.name + '-' + r2?.name + '-' + r3.name + '-' + r4.name)" :label="r4.label" :header-inset-level="0" :content-inset-level="0.2"
                              :hide-expand-icon="!r4.children" :to="{ name: r4.name }" active-class="left-side-menu-active">
                              <template v-if="r4.children">

                                <template v-for="(r5, idx) in r4.children" :key="(r1?.name + '-' + r2?.name + '-' + r3.name + '-' + r4.name + '-' + r5.name)">
                                  <q-expansion-item v-if="!!userChange && menuItemVisible(r5)"
                                    :class="(r1?.name + '-' + r2?.name + '-' + r3.name + '-' + r4.name + '-' + r5.name)" :label="r5.label" :header-inset-level="0"
                                    :content-inset-level="0.2" :hide-expand-icon="!r5.children" :to="{ name: r5.name }" active-class="left-side-menu-active">
                                    <template v-if="r5.children">
                                    </template>
                                  </q-expansion-item>
                                </template>

                              </template>
                            </q-expansion-item>
                          </template>

                        </template>
                      </q-expansion-item>
                    </template>

                  </template>
                </q-expansion-item>
              </template>

            </template>
          </q-expansion-item>
        </template>
      </q-list>
    </q-drawer>




    <q-page-container class="main-backcolor main-text">
      <router-view class="main-backcolor main-text"></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { onMounted, onBeforeUnmount, ref, watch, computed, onBeforeMount } from "vue";
// import { date } from "quasar";
import { useQuasar, date } from "quasar";
import router from "../router";
import routes from "../router/routes";
import { sys as url } from "../router/dataUrl";

import UserAuthenticate from "../components/UserAuthenticate.vue";


import { loadData } from "../components/serverData";
import access from "../components/access";
// import alertPro from '../../components/alertPro.vue'
import moment from "moment";
import { useAccessStore } from "../stores/accessStore";


export default {
  setup(props, context) {
    const PROC_NAME = "MainLayout> ";
    const $q = useQuasar();
    const accessStore = useAccessStore(); 

    const STAT_NA = 0;
    const STAT_OK = 1;
    const STAT_WARN = 2;
    const STAT_WARN1 = 3;
    const STAT_ERROR = 4;
    const STAT_NETWORK = 8;
    const MAX_DELAY = 10;
    const STAT_TXT_OK = "OK";
    const FORMAT_DATETIME_MSEC = "YYYY-MM-DD HH:mm:ss.SSS";
    // console.log("$q.screen", $q.screen);
    const nowTime = ref(date.formatDate(Date.now(), "HH:mm:ss"));
    const nowDate = ref("");
    const routesMain = ref(routes[0].children);
    const user = ref(false);
    const userLogged = ref({ username: "" });
    const userChange = ref(1);
    let diag_status = {};
    

    const sysStat = ref({

      l1: { stat: STAT_NETWORK, txt: "" },
      l2: { stat: STAT_NETWORK, txt: "" },
      l3: { stat: STAT_NETWORK, txt: "" },
      uk: { stat: STAT_NETWORK, txt: "" },
    });





    const sysStatRem = {
      l1: {},
      l2: {
        modules: [],
        schedules: [],
      },
      l3: {},
      uk: {},
    };

    const serverStartTime = ref(0);
    // const serverUsername = ref('');
    const serverUsernameDifferent = ref(false);

    const reloginNotify = ref(null);
    // let Timeout1, Timeout2, Timeout3;
    let Timeout1, Timeout2;
    let is_life = true;
    let infoReadLastTime;

    setInterval(async () => {
      // console.log("MainLayout> onMounted setInterval");
      nowTime.value = date.formatDate(Date.now(), "HH:mm:ss");
      nowDate.value = date.formatDate(Date.now(), "DD.MM.YYYY");
    }, 1000);

    // `setInterval(async () => {
    //   const PROC_NAME = "setInterval 60c> ";

    //   // console.log(PROC_NAME + '$q.appVisible: ', $q.appVisible);
    //   if ($q.appVisible) loadInfo();
    // }, 30000); // Проверка новой версии клиента - каждые 30 секунд`

    Timeout1 = setTimeout(async function load_info() {
      // Обновление по истечению интервала в 30 сек, только если нет треблования обновить вручную (не закончена работа с фильтрами)
      // if(!LoadDataNeed.value && !JobsReadLastTime.value || moment().diff(JobsReadLastTime.value) >= 600000) {   // 600000 мс = 10 мин (Если требуется обновление фильтров)
      // 	await loadDataJobs();
      // }
      if ($q.appVisible && (!infoReadLastTime || moment().diff(infoReadLastTime) >= 30000)) await loadInfo();

      
      if( is_life )  Timeout2 = setTimeout(load_info, 1000);
    }, 1000);

    onBeforeMount(() => {
      const PROC_NAME = "MainLayout.onBeforeMount> ";
      console.log(PROC_NAME + "userLogged.value: ", userLogged.value);
      console.log(PROC_NAME + "localStorage.getItem('username'): ", localStorage.getItem("username"));
      // console.log(PROC_NAME + "localStorage.getItem('permission'): ", localStorage.getItem("permission"));

      userLogged.value = {
        username: localStorage.getItem("username"),
        permission: localStorage.getItem("permission"),
      };
    }),
  
    onMounted(async () => {
      const PROC_NAME = "MainLayout.onMounted> ";
      // userLogged.value = {
      //   username: localStorage.getItem("username"),
      //   permission: localStorage.getItem("permission"),
      // };

      // Возобновление прав доступа при обновлении страницы
      if(Array.isArray(access.list()) && access.list().length > 0)   accessStore.newRights(access.list());
      
    });

    /**
     * Получение с сервера различной информации и её обработка
     */
    async function loadInfo(manual) {
      const PROC_NAME = "info" + (manual ? "(M)" : "") + " > ";

      try {
        // serverStartTime.value = 0;
        {
          const ret = await loadData({ url: url.info, params: { l1: true, l2: true, l3: true, uk: true, } });
          // const ret = await loadData({ url: url.info, params: { l1: true, l2: true, l3: true, uk: true }, });

          // if (ret.error) throw new Error(ret.error.message, { cause: ret.error });
          if (ret.error) {

            console.log(PROC_NAME + " Генерация ошибки");
            // console.log("!!!!!!!!!!!!!!!!! ret=", ret);
            throw new Error(ret.error.message, { cause: ret.error });
          }

          if (manual) {
            console.log(PROC_NAME + "data-server: ", ret);
            console.log(PROC_NAME + "client: ", {
              startTime: serverStartTime.value,
              username: userLogged.value.username,
            });
            // console.log(PROC_NAME + 'client: ', { startTime: serverStartTime.value, username: serverUsername.value });
          }
          // if (!serverUsername.value || serverUsername.value.length === 0) {
          //   serverUsername.value = ret.username;
          //   serverUsernameDifferent.value = false;
          // }
          // else
          // {
          // if (serverUsername.value !== ret.username) {
          if (userLogged.value.username && userLogged.value.username !== ret.username) {
            console.warn(
              PROC_NAME +
              'Пользователь, зарегистрированный на сервере ("' +
              (ret.username ?? "") +
              '") отличается от пользователя на клиенте ("' +
              (userLogged.value.username ?? "") +
              '").'
            );
            serverUsernameDifferent.value = true;
            if (!reloginNotify.value) {
              reloginNotify.value = $q.notify({
                group: false,
                message:
                  "Пользователь, зарегистрированный на сервере ('" +
                  (ret.username ?? "") +
                  "') отличается от пользователя на клиенте ('" +
                  (userLogged.value.username ?? "") +
                  "')",
                // type: 'warning',
                color: "orange",
                timeout: 0,
                multiLine: true,
                icon: "new_releases",
                actions: [
                  {
                    label: "Сменить пользователя",
                    color: "negative",
                    handler: async () => {
                      console.log("Смена пользователя");
                      await access.user.logout();
                      // userChange.value++;
                      userChangeFunc();
                      accessStore.newRights(access.list());
                      user.value = false;
                      userLogged.value.username = "";
                      userAuth();
                    },
                  },
                ],
              });
            }
          }
          // }
          if (!(ret.status?.l2?.db === true)) {
            // for(let key in sysStat.value) sysStat.value[key] = key === 'l2' ? STAT_ERROR : STAT_NETWORK;
            $q.notify({
              message: "Ошибка связи с БД Уровня 2! \r\n",
              color: "negative",
              icon: "warning",
            });
          }
          // sysStat.value.l1.stat = statL1(ret.status);
          // sysStat.value.l2.stat = statL2(ret.status);
          // sysStat.value.l3.stat = statL3(ret.status);
          // sysStat.value.uk.stat = statUk(ret.status);
          statL1(ret.status);
          statL2(ret.status);
          statL3(ret.status);
          statUk(ret.status);
          diag_status = ret.status || {};
					accessStore.IslNewStats(ret.status || {});  // Сохраняем для отслеживания изменений из других модулей
          infoReadLastTime = moment(); // запоминаем время последнего обновления
        }

        // console.log(PROC_NAME + 'parseUrl: ', parseUrl);
        const parseUrl = new URL(document.URL);
        if (parseUrl.port !== "5173") {
          // Дальнейшую проверку делать только если проект запущен не в режиме отладки (там перезапуск происходит автоматически)
          parseUrl.pathname = "/sys/info";
          // console.log(PROC_NAME + 'parseUrl: ', parseUrl);
          const ret = await loadData({ url: parseUrl.href }); // Запрос отправлять на веб-сервер (сервер АРМа), а не на дата-сервер
          // console.log(PROC_NAME + 'client: ', { startTime: serverStartTime.value, });
          // console.log(PROC_NAME + 'web-server: ', ret);

          if (serverStartTime.value === 0) serverStartTime.value = ret.startTime;
          else {
            if (serverStartTime.value !== ret.startTime) {
              console.warn(
                PROC_NAME +
                "Рекомендуется перезагрузить приложение для загрузки последних изменений."
              );
              $q.notify({
                message:
                  "Рекомендуется перезагрузить приложение для загрузки последних изменений",
                type: "warning",
                // color: 'orange',
                timeout: 0,
                icon: "new_releases",
                actions: [
                  {
                    label: "ПЕРЕЗАГРУЗИТЬ",
                    color: "negative",
                    handler: () => {
                      console.log("ПЕРЕЗАГРУЗКА");
                      // window.location.reload();
                      router.go(0);
                    },
                  },
                ],
              });
            }
          }
        }
      } catch (ex) {
        console.error(PROC_NAME + "ERROR", ex);
        // console.error(PROC_NAME, 'ERROR', ex ?? '');
        for (let key in sysStat.value) {
          sysStat.value[key].stat = key === "l2" ? STAT_ERROR : STAT_NETWORK;
          sysStat.value[key].txt = "Нет связи с сервером данных У2.";
        }

        $q.notify({
          message: "Ошибка загрузки системной информации! \r\n" + ex.message,
          // message: 'Ошибка загрузки системной информации! \r\n',
          color: "negative",
          icon: "warning",
        });
        statL1();
        statL2();
        statL3();
        statUk();
        diag_status = {};
				accessStore.IslNewStats({});  // Сохраняем для отслеживания изменений из других модулей
        infoReadLastTime = moment(); // запоминаем время последнего обновления
      } finally {
      }
    }

    /**
     * Вызов окна аутентификации пользователя и обработака его событий
     * @param {*} ev Событие клика мышки
     */
    async function userAuth(ev) {
      const PROC_NAME = "userAuth> ";
      // console.log(PROC_NAME + "Пользователь: ", user.value);

      if (!user.value) {
        $q.dialog({
          component: UserAuthenticate,
          componentProps: {
            // text: 'something',
            // ...more..props...
          },
        }).onOk((authenticate) => {
          user.value = !user.value;
          userLogged.value = authenticate;
          console.log(PROC_NAME + "Новый пользователь: ", userLogged.value);
          console.log(PROC_NAME + "Аутентификация: ", authenticate);

          // if (authenticate) userChange.value++;
          if (authenticate) {
            // userChange.value++;
            userChangeFunc();
            accessStore.newRights(access.list());
          }
          console.log(PROC_NAME + "userChange.value = " + userChange.value);

          if (reloginNotify.value) {
            reloginNotify.value({
              icon: "done",
              message: "Пользователь успешно зарегистрирован",
              color: "positive",
              timeout: 1000,
              actions: [],
            });
            reloginNotify.value = null;
          }

          serverUsernameDifferent.value = false;
        });
      } else {
        await access.user.logout();
        // userChange.value++;
        userChangeFunc();
        accessStore.newRights(access.list());
        user.value = false;
        userLogged.value.username = "";
        console.log(PROC_NAME + "userChange.value = " + userChange.value);
      }
    }

    // вызов окна статусов L1
    function L1Status() {
      if(true ) { // 
        $q.dialog({
          component: L1Stat,
          componentProps: {
            stat: diag_status?.l1,
            db_stat: diag_status?.l2?.db === true, 
          },
        });
      }
    }
    // вызов окна статусов L2
    function L2Status() {
      if(true ) { // 
        $q.dialog({
          component: L2Stat,
          componentProps: {
            stat: diag_status?.l2,
            db_stat: diag_status?.l2?.db === true, 
          },
        });
      }
    }
    // вызов окна статусов L3
    function L3Status() {
      if(true ) { // 
        $q.dialog({
          component: L3Stat,
          componentProps: {
            stat: diag_status?.l3,
            db_stat: diag_status?.l2?.db === true, 
          },
        });
      }
    }

    // вызов окна статусов установок Ультакрафт
    function UKStatus() {
      if(true ) { // 
        $q.dialog({
          component: UKStat,
          componentProps: {
            stat: (Array.isArray(diag_status?.uk) && diag_status?.uk) || [],
            db_stat: diag_status?.l2?.db === true, 
          },
        });
      }
    }



    function toggleTheme(params) {
      $q.dark.toggle();
    }

    function titleClick(evt) {
      const PROC_NAME = "titleClick> ";
      console.log(PROC_NAME, evt);
    }

    function sysStatClass(stat) {
      switch (stat || "") {
        case STAT_OK: {
          return "system-status-ok";
        }
        case STAT_WARN: {
          return "system-status-warn";
        }
        case STAT_WARN1: {
          return "system-status-warn1";
        }
        case STAT_ERROR: {
          return "system-status-error";
        }
        case STAT_NETWORK: {
          return "system-status-net-error";
        }
        default: {
          return "system-status-na";
        }
      }
    }

    /**
     *  Действия при смене пользователя
     */
    function userChangeFunc() {
      userChange.value++;
      console.log("router.currentRoute.value = ", router.currentRoute.value);
      const qu = {};
      for( let key in router.currentRoute.value.query)  qu[key] = router.currentRoute.value.query[key];
      const r = { name: router.currentRoute.value.name, query: qu, replace: true,};
      // console.log("------- r = ", r);
      if(!access.check(router.currentRoute.value.meta.permission.enabled)) {
        router.push({name: "errors-403",});
      } else {
        router.push(r);
        // router.reload();
      }
      // router.push(r);
      // router.push({ path: '/home', replace: true })
      // router.go(router.currentRoute);
      // router.go(0);
    }


    /**
     * Определение статуса L1
     * @param status   - статус общий
     */
    function statL1(status) {
      if (!status) {
        sysStat.value.l1.stat = STAT_NETWORK;
        sysStat.value.l1.txt = "Нет связи с сервером данных У2.";
        return;
      }
      if (!(status.l2?.db === true)) {
        sysStat.value.l1.stat = STAT_NETWORK;
        sysStat.value.l1.txt = "Ошибка связи с БД Уровня 2!";
        return;
      }
      if( status.l1?.en?.quality === STAT_TXT_OK && status.l1?.en?.timestamp === STAT_TXT_OK &&
          status.l1?.fm?.quality === STAT_TXT_OK && status.l1?.fm?.timestamp === STAT_TXT_OK &&
          status.l1?.sz?.quality === STAT_TXT_OK && status.l1?.sz?.timestamp === STAT_TXT_OK &&
          status.l1?.fn1?.quality === STAT_TXT_OK && status.l1?.fn1?.timestamp === STAT_TXT_OK &&
          status.l1?.fn2?.quality === STAT_TXT_OK && status.l1?.fn2?.timestamp === STAT_TXT_OK ) {

        sysStat.value.l1.stat = STAT_OK;
        sysStat.value.l1.txt = "";
        return;
      } else {

        if( status.l1?.fn1?.quality === STAT_TXT_OK && status.l1?.fn1?.timestamp === STAT_TXT_OK &&
            status.l1?.fn2?.quality === STAT_TXT_OK && status.l1?.fn2?.timestamp === STAT_TXT_OK ) { 
          sysStat.value.l1.stat = STAT_WARN;
          sysStat.value.l1.txt = "Нет ввязи с ПЛК стана";
          return;
        } else {
          sysStat.value.l1.stat = STAT_ERROR;
          sysStat.value.l1.txt = "Ошибка связи с ПЛК";
          return;
        }
      }
      // sysStat.value.l1.stat = STAT_OK;
      // sysStat.value.l1.txt = "";
    }

    /**
     * Определение статуса L2
     * @param status   - статус общий
     */
    function statL2(status) {
      if (!status) {
        sysStat.value.l2.stat = STAT_ERROR;
        sysStat.value.l2.txt = "Нет связи с сервером данных У2.";
        return;
      }
      if (!(status.l2?.db === true)) {
        sysStat.value.l2.stat = STAT_ERROR;
        sysStat.value.l2.txt = "Ошибка связи с БД Уровня 2!";
        return;
      }

      let cnt_err_modules = 0;
      let cnt_err_modules_v = 0;
      let cnt_err_schedules = 0;

      if ( status?.l2?.modules && !status.l2.modules.error && status.l2.modules.length > 0 ) {
        status.l2.modules.forEach(s => {
          if(s.state !== STAT_TXT_OK || (s.name !== "L3_CONNECTION" && s.timestamp !== STAT_TXT_OK))   {
            if(s.name.indexOf("ISL2-VSW-") >= 0) {
              cnt_err_modules_v++;
            } else {
              cnt_err_modules++;
            }
          } 
        });
      }
      if ( status?.l2?.schedules && !status.l2.schedules.error && status.l2.schedules.length > 0 ) {
        status.l2.schedules.forEach(s => {
          if(s.state !== STAT_TXT_OK ) cnt_err_schedules++;
        });
      }
      if(cnt_err_modules === 0 && cnt_err_modules_v === 0 && cnt_err_schedules === 0) {
          sysStat.value.l2.stat = STAT_OK;
          sysStat.value.l2.txt = "";
          return;
      } else {
        sysStat.value.l2.stat = STAT_ERROR;
        sysStat.value.l2.txt = `${cnt_err_modules_v ? "Ошибка внешних модулей. " : ""}${cnt_err_modules ? "Ошибка модулей БД. " : ""}${cnt_err_schedules ? "Ошибка процедур БД. " : ""}`;
      }




      // if ( status?.l2?.modules && !status.l2.modules.error && status.l2.modules.length > 0 ) {
        // for(let i = 0; i < status.l2.modules.length; i++) {
        // 	console.log("l2 module:" + moment(status.l2.modules[i].LAST_EXEC).format(FORMAT_DATETIME_MSEC) + " " + status.l2.modules[i].MODULE_NAME);
        // }
        // запоминание последнего времени и количества ошибок модуля
        // status.l2.modules.forEach((m) => {
        //   let mod;
        //   // let mod_set = sysStatSet.l2.modules.find((mm) => m.MODULE_NAME === mm.MODULE_NAME);
        //   let err_time = false;
        //   // if (mod_set) {

        //   // }
        //   if (sysStatRem.l2.modules.length > 0) {
        //     mod = sysStatRem.l2.modules.find((mm) => m.MODULE_NAME === mm.MODULE_NAME);

        //   }
        //   if (mod) {
        //     mod.exec_interval = moment().diff(m.LAST_EXEC);
        //     mod.runs = m.RUN_COUNT - mod.RUN_COUNT;
        //     mod.failures = m.FAILURE_COUNT - mod.FAILURE_COUNT;
        //     mod.LAST_EXEC = moment(m.LAST_EXEC).format(FORMAT_DATETIME_MSEC);
        //     mod.RUN_COUNT = m.RUN_COUNT;
        //     mod.FAILURE_COUNT = m.FAILURE_COUNT;
        //   } else {
        //     sysStatRem.l2.modules.push({
        //       MODULE_NAME: m.MODULE_NAME,
        //       LAST_EXEC: moment(m.LAST_EXEC).format(FORMAT_DATETIME_MSEC),
        //       RUN_COUNT: m.RUN_COUNT,
        //       FAILURE_COUNT: m.FAILURE_COUNT,

        //     });
        //   }
        // });
        // status.l2.schedules.forEach((m) => {
        //   let mod;
        //   if (sysStatRem.l2.schedules.length > 0) {
        //     mod = sysStatRem.l2.schedules.find((mm) => m.JOB_NAME === mm.JOB_NAME);
        //   }
        //   if (mod) {
        //     mod.start_interval = moment().diff(m.LAST_START_DATE);
        //     mod.runs = m.RUN_COUNT - mod.RUN_COUNT;
        //     mod.failures = m.FAILURE_COUNT - mod.FAILURE_COUNT;
        //     mod.LAST_START_DATE = moment(m.LAST_START_DATE).format(FORMAT_DATETIME_MSEC);
        //     mod.RUN_COUNT = m.RUN_COUNT;
        //     mod.FAILURE_COUNT = m.FAILURE_COUNT;
        //   } else {
        //     sysStatRem.l2.schedules.push({
        //       JOB_NAME: m.JOB_NAME,
        //       LAST_START_DATE: moment(m.LAST_START_DATE).format(FORMAT_DATETIME_MSEC),
        //       RUN_COUNT: m.RUN_COUNT,
        //       FAILURE_COUNT: m.FAILURE_COUNT,
        //     });
        //   }
        // });
        // console.log(PROC_NAME + " sysStatRem =", sysStatRem);
      // }

      sysStat.value.l2.stat = STAT_OK;
      sysStat.value.l2.txt = "";
    }

    /**
     * Определение статуса L3
     * @param status   - статус общий
     */
    function statL3(status) {
      if (!status) {
        sysStat.value.l3.stat = STAT_NETWORK;
        sysStat.value.l3.txt = "Нет связи с сервером данных У2.";
        return;
      }
      if (!(status.l2?.db === true)) {
        sysStat.value.l3.stat = STAT_NETWORK;
        sysStat.value.l3.txt = "Ошибка связи с БД Уровня 2!";
        return;
      }
      if (!(status.l3 === STAT_TXT_OK)) {
        sysStat.value.l3.stat = STAT_ERROR;
        sysStat.value.l3.txt = "Ошибка связи с БД Уровня 3!";
        return;
      }
      sysStat.value.l3.stat = STAT_OK;
      sysStat.value.l3.txt = "";
    }

    /**
     * Определение статуса Установок УльтраКрафт
     * @param status   - статус общий
     */
    function statUk(status) {
      if (!status) {
        sysStat.value.uk.stat = STAT_NETWORK;
        sysStat.value.uk.txt = "Нет связи с сервером данных У2.";
        return;
      }
      if (!(status.l2?.db === true)) {
        sysStat.value.uk.stat = STAT_NETWORK;
        sysStat.value.uk.txt = "Ошибка связи с БД Уровня 2!";
        return;
      }
      if(status.uk?.length > 0) {
        let cnt_err = 0;
        status.uk.forEach(s => {
          if(s.message !== STAT_TXT_OK) cnt_err++;
        });
        if(cnt_err === 0) {
          sysStat.value.uk.stat = STAT_OK;
          sysStat.value.uk.txt = "";
          return;
        } else {
          if(cnt_err === 1 && status.uk.find(s => (s.name === "UZK1"))?.message !== STAT_OK) {  // Если выкключена установка УЗК кромок, то предупреждение
            sysStat.value.uk.stat = STAT_WARN1;
            sysStat.value.uk.txt = "Выключена установка УЗК кромок";
            return;
          } else {
            sysStat.value.uk.stat = STAT_ERROR;
            sysStat.value.uk.txt = "Ошибка связи/выключены установки ультракрафт";
            return;
          }
        }
      } 
      sysStat.value.uk.stat = STAT_NETWORK;
      sysStat.value.uk.txt = "Нет связи с сервером данных У2.";
      return;
    }

    /**
     *  поиск чего-то разрешённого в текущей ветке и во всех вложенных подветках
     * @param r - ветка роутера, для которой ищется разрешение  
     */
    function menuItemVisible(r) { 
      if( access.check(r?.meta?.permission?.visible) ) return true;
      let accs = false;
       if(r?.children && r.children.length > 0) {
        r.children.forEach( c => {
          if( menuItemVisible(c) )  accs = true;
        });
       }
      return accs;
    }

    // /**
    //  * Определение статуса L2
    //  * @param status   - статус общий
    //  */
    // function statL2(status) {
    // 	if(!status)  return STAT_ERROR;
    // 	if(!(status.l2?.db === true)) return STAT_ERROR;
    // 	return STAT_OK;
    // }

    // /**
    //  * Определение статуса L3
    //  * @param status   - статус общий
    //  */
    // function statL3(status) {
    // 	if(!status)  return STAT_NETWORK;
    // 	if(!(status.l2?.db === true)) return STAT_NETWORK;
    // 	return STAT_OK;
    // }

    // /**
    //  * Определение статуса Установок УльтраКрафт
    //  * @param status   - статус общий
    //  */
    // function statUk(status) {
    // 	if(!status)  return STAT_NETWORK;
    // 	if(!(status.l2?.db === true)) return STAT_NETWORK;
    // 	return STAT_OK;
    // }

    onBeforeUnmount(() => {
      is_life = false;
      // clearTimeout(Timeout3);
      clearTimeout(Timeout2);
      clearTimeout(Timeout1);
    });

    return {
      access: access,
      leftMenuOpen: ref(true),
      sideMenuWidth: ref(184), // было 175
      nowTime: nowTime,
      nowDate: nowDate,
      routesMain: routesMain,
      titleClick: titleClick,
      user: user,
      userLogged: userLogged,
      userChange: userChange,
      userChangeFunc: userChangeFunc,
      userAuthenticate: userAuth,
      toggleTheme: toggleTheme,
      loadInfo: loadInfo,
      serverStartTime: serverStartTime,
      // serverUsername: serverUsername,
      serverUsernameDifferent: serverUsernameDifferent,
      sysStatClass: sysStatClass,
      // sysStatL1: sysStatL1,
      // sysStatL2: sysStatL2,
      // sysStatL3: sysStatL3,
      // sysStatUk: sysStatUk,
      sysStat: sysStat,
      // statL2: statL2,
      // ex: ex,
      menuItemVisible: menuItemVisible,
      L1Status: L1Status,
      L2Status: L2Status,
      L3Status: L3Status,
      UKStatus: UKStatus,
    };
  },
};


</script>


<style lang="sass">
// scoped ???

.left-side-menu
	// background-color: rgb(173, 173, 173)
	background-color: $grey-9 !important


.left-side-menu
	div
		color: $grey-1

.left-side-menu-active
	// background-color: rgba(0, 0, 0, 10%)
	// background-color: rgba(0, 0, 0, 10%)
	// border-left-style: solid
	// border-left-width: 3px
	// // border-left-color: $yellow-3
	// border-left-color: $cyan-2
	// border-radius: 9px 0px 0px 9px
	div
		// color: $yellow-3
		color: $cyan-2
		font-weight: bold

.q-router-link--exact-active
	background-color: rgba(0, 0, 0, 10%)
	border-left-style: solid
	border-left-width: 3px
	// border-left-color: $yellow-3
	border-left-color: $cyan-2
	border-radius: 9px 0px 0px 9px


.left-side-menu-router-tab
	text-align: left

.btn-vmz
	background-color: rgb(73, 73, 73)


</style>

<style lang="sass">

.header 
	height: 20px
	background-color: rgb(102, 102, 102)
	border-radius: 10px 10px 0px 0px
	margin-bottom: 1px
	padding-top: 1px
	padding-bottom: 1px 
	padding-left: 10px 

.w-100
	width: 100% !important

.w-95
	width: 95% !important

.blockt_main
	// border: 2px solid white
	border-width: 2px
	border-style: solid
	border-radius: 5px
	margin-right: 2px
	margin-bottom: 10px
	inheritAttrs: false

	
.blockt
	border: 2px 
	// border-color: rgba(255, 255, 255)
	border: 2px solid white
	border-radius: 10px
	margin-left: 3px
	margin-right: 2px
	margin-bottom: 3px 
	margin-top: 2px
	padding-left: 1rem
	// padding: 1px
	inheritAttrs: false

.blockt-h100 
	height: 100%
	border: 2px solid white
	border-radius: 10px
	margin-left: 3px 
	margin-right: 2px 
	margin-bottom: 3px 
	margin-top: 2px 

.border-silver 
	border: 1px solid silver
	padding: 5px
	margin-left: 5px
	margin-right: 5px
	margin-bottom: 5px

// .input1
// 	// background-color: rgba(0, 0, 0, 10%)
// 	font-size: 14pt !important
// 	font-weight: bold !important
// 	// height: 10px !important

.input0
		height: 80px !important

.input1
	// background-color: rgba(0, 0, 0, 10%)
	font-size: 12pt !important
	font-weight: bold !important
	// height: 10px !important

.input2
	div.q-field__control
		.q-field__native
			color: black

.input2
	div.q-field__control
		.q-field__append
			.q-icon
				color: black

div.q-field__control
	.q-field__native.input1
		color: black

.input1-bad-limit
	font-size: 12pt !important
	font-weight: bold !important
	color: red !important

.input1-read-only
	font-size: 12pt !important
	font-weight: bold !important
	color: $grey-2 !important

.select1
	div
		span
			font-size: 12pt !important
			font-weight: bold !important
			// color: $grey-2 !important

.select1-read-only
	div
		span
			font-size: 12pt !important
			font-weight: bold !important
			color: $grey-2 !important



.input2
	font-size: 10pt !important
	font-weight: bold !important

.pmy0
	padding-top: 0px 
	padding-bottom: 0px 
	margin-top: 0px 
	margin-bottom: 0px 

.pmy1
	padding-top: 1px 
	padding-bottom: 1px 
	margin-top: 1px 
	margin-bottom: 1px 

.pmy5
	padding-top: 5px 
	padding-bottom: 5px 
	margin-top: 5px 
	margin-bottom: 5px 

.pmx0
	padding-left: 0px 
	padding-right: 0px 
	margin-left: 0px 
	margin-right: 0px 

.pmx1
	padding-left: 1px 
	padding-right: 1px 
	margin-left: 1px 
	margin-right: 1px 

.pmx5
	padding-left: 5px 
	padding-right: 5px 
	margin-left: 5px 
	margin-right: 5px 

.px5
	padding-left: 5px 
	padding-right: 5px 

.txt-big-1
	font-size: 14pt 

table
	tr
		td.table-row-sel2
			background-color: rgba(0, 0, 0, 10%)
		td.table-row-del-sel2
			background-color: $red-2
		td.table-row-del
			background-color: $red-11
		td.table-row-add-sel2
			background-color: $green-4
		td.table-row-add
			background-color: $green-12
		td.table-row-err
			background-color: $red-7
			color: white

.table-row-sel1
	// background-color: $blue-grey-7
	background-color: rgba(0, 0, 0, 5%)
	// color: $blue-grey-1
	// color: #000000 

// Подсветка данных в ячейке таблицы в виде гиперссылки
table
	tr
		td.table-cell-hyperlink
			color: -webkit-link
			cursor: pointer
			text-decoration: underline

.table-style1
	thead tr th
		// color: #FFFFFF 
		// border-color: #FFFFFF 
		text-align: center !important
		vertical-align: middle !important
		// background-color: rgb(70, 69, 64) !important
		font-size: 10pt !important
		font-weight: bold
		border-bottom-width: 2px
		border-bottom-style: solid
		border-bottom-color: $grey-6

	tr td 
			text-align: center
			vertical-align: middle !important
			// color: #000000

	tr.undefined td
		text-align: center
		vertical-align: middle !important
		font-size: 12pt !important
		font-weight: bold
		// font-style: italic
		border-top-width: 2px
		border-top-style: solid
		border-top-color: $grey-6

/* Статус штрипса: ЗАПЛАНИРОВАН */
div div	.status-planned
	background-color: $grey-1
	color: black
	border-radius: 9px

/* Статус задания/штрипса: НАЗНАЧЕН */
div div .status-assigned
	background-color: $light-green-12
	color: black
	border-radius: 9px

/* Статус штрипса/трубы : В ПРОИЗВОДСТВЕ */
div div	.status-in-prod
	background-color: $green-10
	color: white
	border-radius: 9px

/* Статус штрипса/трубы : ПРОИЗВЕДЁН */
div div	.status-produced
	background-color: $blue-10
	color: white
	border-radius: 9px

/* Статус трубы : ЗАДЕРЖАНА ДЛЯ РЕМОНТА */
div div	.status-repair-detained
	background-color: $light-green-12
	color: black
	border-radius: 9px

/* Статус трубы : РЕМОНТ */
div div	.status-repairing
	background-color: $light-green-12
	color: black
	border-radius: 9px

/* Статус трубы : УДАЛЕНА */
div div	.status-deleted
	background-color: rgba(255, 69, 0, 100%)
	color: white
	border-radius: 9px

/* Статус трубы : УДАЛЕНА ИЗ HMI */
div div	.status-deleted-hmi
	background-color: rgba(255, 69, 0, 100%)
	color: white
	border-radius: 9px



/* Статус задания: ЗАПЛАНИРОВАНО */
div div	.status-job-planned
	// background-color: $grey-1
	background-color: rgba(255, 255, 255, 100%)
	color: black
	border-radius: 9px

/* Статус задания: В ПРОИЗВОДСТВЕ */
div div	.status-job-in-prod
	// background-color: $green-10
	background-color: rgba(0, 191, 255, 100%)
	color: white
	border-radius: 9px

/* Статус задания ВЫПОЛНЕНО */
div div	.status-executed
	// background-color: $blue-10
	background-color: rgba(0, 128, 0, 100%)
	color: white
	border-radius: 9px

/* Статус задания ЗАДЕРЖАНО/ */
div div	.status-detained
	// background-color: $blue-10
	background-color: rgba(255, 165, 0, 100%)
	color: white
	border-radius: 9px

/* Статус задания ВЫПОЛНЕНО ЧАСТИЧНО/ */
div div	.status-partially-executed
	// background-color: $blue-10
	background-color: rgba(70, 130, 180, 100%)
	color: white
	border-radius: 9px

/* Статус задания СЗ ЗАДЕРЖАН/ */
div div	.status-sz-detained
	// background-color: $blue-10
	background-color: rgba(255, 255, 255, 100%)
	color: black
	border-radius: 9px

/* Статус задания ГОТОВ К ЗАКРЫТИЮ/ */
div div	.status-ready-closing
	// background-color: $blue-10
	background-color: rgba(255, 99, 71, 100%)
	color: white
	border-radius: 9px

/* Статус задания ПЕРЕМЕЩЕНО/ */
div div	.status-moved
	// background-color: $blue-10
	background-color: rgba(255, 255, 255, 100%)
	color: black
	border-radius: 9px

/* Статус задания УДАЛЕНО/ */
div div	.status-removed
	// background-color: $blue-10
	background-color: rgba(255, 69, 0, 100%)
	color: white
	border-radius: 9px


/* Подсветка первого РЦ1.1 (первой групы) */
div div .wc-group1
	background-color: $light-green-12
	color: black
	border-radius: 9px

/* Подсветка первого РЦ1.1 (первой групы), если выбран */
div div .wc-group1-sel
	background-color: $light-green-5
	color: black
	border-radius: 9px

/* Подсветка  групы РЦ1.2 - РЦ1.6   */
div div .wc-group2
	background-color: $green-10
	color: white
	border-radius: 9px

/* Подсветка  групы РЦ1.2 - РЦ1.6,  если выбран */
div div .wc-group2-sel
	background-color: $green-7
	color: white
	border-radius: 9px

/* Подсветка  групы РЦ1.7 - РЦ2.5   */
div div .wc-group3
	background-color: $light-blue-12
	color: black
	border-radius: 9px

/* Подсветка  групы РЦ1.7 - РЦ2.5,  если выбран */
div div .wc-group3-sel
	background-color: $light-blue-5
	color: black
	border-radius: 9px

/* Подсветка  групы РЦ3.1 - РЦ3.4..   */
div div .wc-group4
	background-color: $blue-10
	color: white
	border-radius: 9px

/* Подсветка  групы РЦ3.1 - РЦ3.4,  если выбран */
div div .wc-group4-sel
	background-color: $blue-14
	color: white
	border-radius: 9px

.backcolor-add
	background-color: $blue-grey-8  

div div .system-status-ok
	background-color: $grey-8
	// background-color: rgba(255, 69, 0, 100%)
	// color: $light-green-14
	color: $green-14
	border-radius: 5px
	font-size: 20px
	// font-weight: bold

div div .system-status-ok1
	background-color: $light-green-14
	color: black
	border-radius: 5px
	font-size: 20px

div div .system-status-error
	background-color: $red
	color: white
	border-radius: 5px
	font-size: 20px
	// font-weight: bold

div div .system-status-net-error
	background-color: $purple
	color: white
	border-radius: 5px
	font-size: 20px
	// font-weight: bold

div div .system-status-warn
	background-color: $yellow
	color: black
	border-radius: 5px
	font-size: 20px
	// font-weight: bold

div div .system-status-warn1
	background-color: $grey-8
	color: $yellow
	border-radius: 5px
	font-size: 20px
	// font-weight: bold

div div .system-status-na
	// background-color: $purple-12
	background-color: white
	// color: white
	color: black
	border-radius: 5px
	font-size: 20px
	// font-weight: bold

  





.input1-tbl
	border: 0px  !important
	height: 18px
	font-size: 14px
	text-align: center
	margin: 0px !important

.edit-attr-readonly
	font-style: italic
	color: dodgerblue


</style>


<style lang="sass" scoped>

.main-backcolor-dark
	background-color: $dark-page

.main-backcolor-light
	background-color: white

.text-shine
	// color: red
	// background-color: black
	// text-shadow: 0 -1px rgba(0,0,0,.1)
	-webkit-animation: blink1 2s linear infinite
	animation: blink1 2s linear infinite

</style>

<style>
.q-field--error .q-field__bottom {
  padding: 0;
}

.q-field--error .q-field__bottom .q-field__messages {
  color: lightpink;
}
</style>


<style scoped>
.header-menu-top {
  /* height: 25px; */
  /* background-color: rgb(102, 102, 102); */
  /* border-radius: 10px 10px 0px 0px; */
  /* margin-bottom: 5px; */
  padding-left: 10px;
}

/* ----------------------------ОСНОВНОЙ ЦВЕТ ТЕКСТА, ОСНОВНОЙ ЦВЕТ ФОНА--------------------------------------------------- */

.main-text {
  color: white;
}

.main-text-dark {
  color: white;
}

.main-text-light {
  color: rgb(73, 73, 73);
}

/* .main-backcolor {
  background-color: rgb(70, 69, 64);
} */

/* -------------------БЛОК, ЗАГОЛОВОК БЛОКА, СЕРАЯ РАМКА------------------------------------------------------------------------------- */


.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.ver-blockt {
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  justify-content: center !important;
}

.hor-blockt {
  display: flex;
  justify-content: space-around;
  margin: 5px;
}



/* -------------------------КНОПКИ-------------------------------------------------------------------------------------------------------- */




.btn-vmz-nav {
  background: linear-gradient(rgb(180, 180, 180), rgb(73, 73, 73));
  color: white !important;
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


/* --------------------------БЛОКИ ОСНОВНОГО ЭКРАНА------------------------------------------------------------------------ */

#main {
  width: 83%;
  background: rgb(70, 69, 64);
  color: white;
  padding-left: 5px;
  /* padding-right: 5px; */
  float: left;
}

#aside {
  width: 17%;
  padding-left: 20px;
  background: rgb(70, 69, 64);
  color: white;
  border-right: 2px solid white;
  float: left;
  /* position: relative; */
}

/* -------------------------СПИСОК/МЕНЮ----------------------------------------------------------------------------------------  */

.details-link {
  color: white;
  text-decoration: none;
}

.details-link:hover {
  border: 1px solid yellow;
}


/* -------------------------КНОПКИ-------------------------------------------------------------------------------------------------------- */

.btn-plus {
  background: linear-gradient(rgb(180, 180, 180), rgb(73, 73, 73)) !important;
  border: 2px solid white !important;
  font-size: 10pt !important;
  color: white !important;
  width: 29px;
  height: 29px;
  border-radius: 5px;
}

.btn-big {
  background: linear-gradient(rgb(180, 180, 180), rgb(73, 73, 73)) !important;
  border: 2px solid white !important;
  font-size: 90% !important;
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
</style>

<style>
@-webkit-keyframes blink1 {
  0% {
    color: rgba(255, 0, 0, 1);
  }

  50% {
    color: rgba(255, 0, 0, 0);
  }

  100% {
    color: rgba(255, 0, 0, 1);
  }
}

@keyframes blink1 {
  0% {
    color: rgba(255, 0, 0, 1);
  }

  50% {
    color: rgba(255, 0, 0, 0);
  }

  100% {
    color: rgba(255, 0, 0, 1);
  }
}
</style>
