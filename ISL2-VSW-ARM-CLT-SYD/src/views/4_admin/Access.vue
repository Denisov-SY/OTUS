<template>
  <div>
    <div class="blockt">Admin -> Access</div>

    <div class="row" >
      <div class="col-5">
        <div class="row  blockt-h100 block-work">
          <div class="col-12">

            <div class=" header">
              <p> Пользователи</p>
            </div>
            <!-- <q-list dense v-for="u in Users" v-bind:key="u.login">
              <q-item v-if="u.USED == 1 ?? true" clickable v-ripple :class="u.screen_select ? 'user_sel' : ''
              " @click="() => {
                  console.log('Users= ', Users);
                  Users.forEach((item) => {
                    item.screen_select = false;
                  });
                  u.screen_select = true;
                  RolesScrUpdate();
                } ">
                <q-item-section manual-focus="true">
                  <q-item-label>{{ u.FULLNAME }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list> -->

            <div v-if="!(editUserEnable || editRoleEnable || editPermissionEnable)" class="q-pa-sm q-gutter-sm pmy1">
              <!-- <q-btn no-caps class="btn-vmz" label="Обновить" @click="btnRefresh" title="Обновить. Чтение первоначального набора данных из БД с потерей несозранённых данных редактирования, если бало редактирование."/> -->
              <q-btn no-caps class="btn-vmz" label="Создать"  @click="s_confirm(`Данное действие переведёт экран в режим создания нового пользователя. Продолжить?`, BtnNewUser)" title="Создать нового пользователя."/>
              <q-btn no-caps class="btn-vmz" label="Редактировать"  @click="BtnEditUser" title="Редакьтировать пользователя."/>
              <q-btn no-caps class="btn-vmz" label="Удалить"  @click="BtnDelUser" :disable="DelUserDisable()" title="Удалить пользователя."/>
							&nbsp;&nbsp;&nbsp;
							<q-checkbox v-model="MyFilter.filtUserActiveOnly" label="Активные" dark size="md"/>
            </div>
            <q-form ref="UserEditForm" greedy>
              <div v-if="editUserEnable" class="pmy1">
                <div class="row pmy0">
                  <div class="col-12 pmy1 px5">
                    <q-input  v-model="editUser.FULLNAME" outlined filled dense color="black" bg-color="white" label="Полное имя" title="Полное имя пользователя (ФИО)" type="text"  input-class="input1" style="width: 100%;" 
                      lazy-rules="ondemand" :rules="[ myUserRules.fullname, myUserRules.fullname1, ]"/> 
                  </div>
                </div>
                <div class="row pmy0 q-mb-md">
                  <div class="col-12 pmy1 px5">
                    <q-input  v-model="editUser.DESCRIPTION" outlined filled dense color="black" bg-color="white" label="Описание" title="Описание пользователя" type="text"  input-class="input1" style="width: 100%;" /> 
                  </div>
                </div>
                <div class="row pmy0">
                  <div class="col-6">
                    <div class="row pmy0">  
                      <div class="col-12 pmy1 px5">
                        <q-input  v-model="editUser.LOGIN" outlined filled dense color="black" label="Логин" title="Логин пользователя" type="text" style="width: 100%;" 
                          :bg-color="editUser.default_user ? 'grey-7' : 'white'"  :label-color="editUser.default_user ? 'grey-3' : 'black'"
                          :disable="editUser.default_user"  :input-class="editUser.default_user ? 'input1-read-only' : 'input1'"  
                          lazy-rules="ondemand" :rules="[ myUserRules.login, myUserRules.login1, ]"/> 
                      </div>
                    </div>
                    <div class="row pmy0">  
                      &nbsp;&nbsp;&nbsp;
                      <q-checkbox v-model="editUser.USED" label="Активен" dark size="md"/> 
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="row pmy0">  
                      <div class="col-12 pmy1 px5">
                        <q-input  v-model="editUser.PASSWORD" outlined filled dense color="black" bg-color="white" label="Пароль" title="Ввод пароля" input-class="input1" style="width: 100%;" 
                          :type="isPwd ? 'password' : 'text'" lazy-rules="ondemand" :rules="[ myUserRules.password, myUserRules.password1, ]"> 
                          <template v-slot:append>
                            <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
                          </template>
                        </q-input>
                      </div>
                    </div>
                    <div class="row pmy0">  
                      <div class="col-12 pmy1 px5">
                        <q-input  v-model="editUser.PASSWORD1" outlined filled dense color="black" bg-color="white" label="Пароль ()" title="Ввод пароля" input-class="input1" style="width: 100%;" 
                          :type="isPwd1 ? 'password' : 'text'" lazy-rules="ondemand" :rules="[ myUserRules.password, myUserRules.password1, ]"> 
                          <template v-slot:append>
                            <q-icon :name="isPwd1 ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd1 = !isPwd1" />
                          </template>
                        </q-input>
                      </div>
                    </div>
                  </div>
                </div>


                <div class="row q-pa-sm q-gutter-sm pmy5">
                  <div class="col-6  pmy5">
                    <q-btn no-caps class="btn-vmz f-right" label="Сохранить"  @click="BtnSaveUser" title="Сохранить данные после редактирования." />
                  </div>
                  <div class="col-5 pmy5">
                    <q-btn no-caps class="btn-vmz" label="Отмена"  @click="s_confirm(`Хотите выйти из режима ${editUserMode === MODE_EDIT ? 'редактирования' : 'создания'} пользователя без сохранения изменений?`, BtnCancelEditUser)" title="Отменить несохранённые изменения." />
                  </div>
                </div>
              </div>
            </q-form>
            
            <div class="q-pa-md" v-if="!(editRoleEnable || editPermissionEnable)">
              <q-table flat bordered _title="Пользователи" dense separator="cell" class="table-style1" :rows="Users" :columns="columns" :visible-columns="visibleColumns"
								:filter="MyFilter" :filter-method="MyFilterMethod"
                row-key="user_id" :pagination="{rowsPerPage: 15}">


                <template v-slot:body="props">
                  <q-tr :props="props" :class="props.row.screen_select ? 'table-row-sel1' : ''" 
                      :onmousedown="(ev) => {
                        if(!editUserEnable) {
                          Users.forEach((item) => {  item.screen_select = false;      });
                          props.row.screen_select = true;
                          RolesScrUpdate();
                        }
                      } ">
                      <!-- console.log('props=', props.row.login); -->
                    <!-- <q-td v-for="col in props.cols" :key="col.name" :props="props">
                      {{ col.value }}
                    </q-td> -->
                    <q-td style="text-align: left;">   {{ props.row.FULLNAME }}  </q-td>
                    <q-td >   {{ props.row.LOGIN }}  </q-td>
                    <q-td >   {{ `${props.row.USED ? '' : 'Откл'}` }}  </q-td>
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
      <div class="col-3">
        <div class="row blockt-h100 block-work"  >
          <div class="col-12">
            <div class="header">
              <p>Роли</p>
            </div>
						<div v-if="!(editUserEnable || editRoleEnable || editPermissionEnable)" class="q-pa-sm q-gutter-sm pmy1">
              <q-btn no-caps class="btn-vmz" label="Создать"  @click="s_confirm(`Данное действие переведёт экран в режим создания новой роли. Продолжить?`, BtnNewRole)" title="Создать новую роль."/>
              <q-btn no-caps class="btn-vmz" label="Редактировать"  @click="BtnEditRole" title="Редакьтировать роль."/>
              <q-btn no-caps class="btn-vmz" label="Удалить"  @click="BtnDelRole" :disable="DelRoleDisable()" title="Удалить роль."/>
            </div>
            <q-form ref="RoleEditForm" greedy>
              <div v-if="editRoleEnable" class="pmy1">
                <div class="row pmy0">
                  <div class="col-12 pmy1 px5">
                    <q-input  v-model="editRole.ROLE"  outlined filled dense color="black" label="Наименование" title="Полное имя роли" type="text" style="width: 100%;" 
                      :bg-color="editRole.ROLE?.indexOf('default') === 0 ? 'grey-7' : 'white'"  :label-color="editRole.ROLE?.indexOf('default') === 0 ? 'grey-3' : 'black'"
                      :disable="editRole.ROLE?.indexOf('default') === 0"  :input-class="editRole.ROLE?.indexOf('default') === 0 ? 'input1-read-only' : 'input1'"  
                      lazy-rules="ondemand" :rules="[ myRoleRules.role, myRoleRules.role1, ]"/> 
                  </div>
                </div>
                <div class="row pmy0 q-mb-md">
                  <div class="col-12 pmy1 px5">
                    <q-input  v-model="editRole.DESCRIPTION" outlined filled dense color="black" bg-color="white" label="Описание" title="Описание роли" type="text"  input-class="input1" style="width: 100%;" /> 
                  </div>
                </div>
                <div class="row pmy0" style="display: none;"> 
                  <div class="col-12 pmy1 px5"> 
                    &nbsp;&nbsp;&nbsp;
                    <q-checkbox v-model="editRole.USED" label="Активен" dark size="md"/> 
                  </div>
                </div>
                <div class="row q-pa-sm q-gutter-sm pmy5">
                  <div class="col-6  pmy5">
                    <q-btn no-caps class="btn-vmz f-right" label="Сохранить"  @click="BtnSaveRole" title="Сохранить данные после редактирования." />
                  </div>
                  <div class="col-5 pmy5">
                    <q-btn no-caps class="btn-vmz" label="Отмена"  @click="s_confirm(`Хотите выйти из режима ${editRoleMode === MODE_EDIT ? 'редактирования' : 'создания'} роли без сохранения изменений?`, BtnCancelEditRole)" title="Отменить несохранённые изменения." />
                  </div>
                </div>
                <q-separator color="white"/>
              </div>
            </q-form>
            <q-list v-if="!(editPermissionEnable)" dense v-for="r in Roles" v-bind:key="r.ROLE">
              <q-item v-ripple clickable :class="role_class(r)" 
                @click="() => {
									if(!editRoleEnable) {
										Roles.forEach((item) => { 		item.screen_select = false;  			});
										r.screen_select = true;
										PermissionsScrUpdate();
									}
                }
              ">
                <q-item-section avatar>

                  <!-- <q-toggle dense v-model="r.screen_on" 
                    @update:model-value="(v) => {
                      Roles.forEach((item) => {
                        item.screen_select = false;
                      });
                      r.screen_select = true;
                      PermissionsScrUpdate();
                    } ">
                  </q-toggle> -->

                <q-checkbox v-if="editUserEnable || r.screen_on"  v-model="r.screen_on" :disable="!editUserEnable"
									label="" dark size="xs"
									@update:model-value="(v) => {
										Roles.forEach((item) => { 	item.screen_select = false; 		});
										r.screen_select = true;
										PermissionsScrUpdate();
									} "
								/>
                </q-item-section>
                <q-item-section>
                  <q-item-label >{{ r.ROLE }}</q-item-label>
                </q-item-section>
              </q-item>




            </q-list>

          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="row blockt-h100 block-work">
          <div class="col-12">
            <div class="header">
              <p>Разрешения</p>
            </div>
						<div v-if="!(editUserEnable || editRoleEnable || editPermissionEnable)" class="q-pa-sm q-gutter-sm pmy1">
              <!-- <q-btn no-caps class="btn-vmz" label="Обновить" @click="btnRefresh" title="Обновить. Чтение первоначального набора данных из БД с потерей несозранённых данных редактирования, если бало редактирование."/> -->
              <q-btn no-caps class="btn-vmz" label="Создать" @click="s_confirm(`Данное действие переведёт экран в режим создания нового разрешения. Продолжить?`, BtnNewPermission)" title="Создать новое разрешение."/>
              <q-btn no-caps class="btn-vmz" label="Редактировать" @click="BtnEditPermission" title="Редакьтировать разрешение."/>
              <q-btn no-caps class="btn-vmz" label="Удалить" @click="BtnDelPermission" :disable="DelPermissionDisable()" title="Удалить разрешение."/>
            </div>
            <q-form ref="PermissionEditForm" greedy>
              <div v-if="editPermissionEnable" class="pmy1">
                <div class="row pmy0 q-mb-md">
                  <div class="col-12 pmy1 px5">
                    <q-input  v-model="editPermission.DESCRIPTION" outlined filled dense color="black" bg-color="white" label="Наименование" title="Имя разрешения" type="text"  input-class="input1" style="width: 100%;" 
                      lazy-rules="ondemand" :rules="[ myPermissionRules.description, myPermissionRules.description1, ]"/> 
                  </div>
                </div>
                <div class="row pmy0">
                  <div class="col-12 pmy1 px5">
                    <q-input  v-model="editPermission.PERMISSION" outlined filled dense color="black"  label="Короткое имя" title="Короткое имя" type="text"  style="width: 100%;" 
                      :bg-color="editPermission.CAN_DELETE ? 'white' : 'grey-7'"  :label-color="!(editPermission.CAN_DELETE === 1) ? 'grey-3' : 'black'"
                      :disable="!(editPermission.CAN_DELETE === 1)"  :input-class="!(editPermission.CAN_DELETE === 1) ? 'input1-read-only' : 'input1'" 
                      lazy-rules="ondemand" :rules="[ myPermissionRules.permission, myPermissionRules.permission1, ]"/> 
                  </div>
                </div>
                <div class="row pmy0" style="display: none;"> 
                  <div class="col-12 pmy1 px5"> 
                    &nbsp;&nbsp;&nbsp;
                    <q-checkbox v-model="editPermission.USED" label="Активен" dark size="md"/> 
                  </div>
                </div>
                <div class="row q-pa-sm q-gutter-sm pmy5">
                  <div class="col-6  pmy5">
                    <q-btn no-caps class="btn-vmz f-right" label="Сохранить"  @click="BtnSavePermission" title="Сохранить данные после редактирования." />
                  </div>
                  <div class="col-5 pmy5">
                    <q-btn no-caps class="btn-vmz" label="Отмена"  @click="s_confirm(`Хотите выйти из режима ${editPermissionMode === MODE_EDIT ? 'редактирования' : 'создания'} разрешения без сохранения изменений?`, BtnCancelEditPermission)" title="Отменить несохранённые изменения." />
                  </div>
                </div>
                <q-separator color="white"/>
              </div>
            </q-form>
            <q-list dense v-for="p in Permissions" v-bind:key="p.PERMISSION">
              <q-item v-ripple clickable :class="permission_class(p)" 
                @click="() => { 
                  if(!editPermissionEnable) {
                    Permissions.forEach((item) => {  item.screen_select = false;    });
                    p.screen_select = true;
                  }
                }
              ">
                <q-item-section avatar>
                <q-checkbox v-if="editRoleEnable || p.screen_on"  v-model="p.screen_on" :disable="!editRoleEnable"
									label="" dark size="xs"
									@update:model-value="(v) => {
										Permissions.forEach((item) => {
											item.screen_select = false;
											});
										p.screen_select = true;
                    p.screen_users_on = v;
									} "
								/>
                </q-item-section>
                <q-item-section>
                  <q-item-label >{{ `${p.DESCRIPTION} (${p.PERMISSION})` }}</q-item-label>
                </q-item-section>
              </q-item>
							
            </q-list>
          </div>
        </div>
      </div>
    </div>

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
import { QList, QItem, QItemSection, QToggle, useQuasar } from "quasar";

import router from "../../router";

import { loadData, sendData } from "../../components/serverData";

import { dictionary as dict } from "../../router/dataUrl";
// import { admin as url, dictionary as dict } from "../../router/dataUrl";

import alertPro from '../../components/alertPro.vue';
import confirmPro from '../../components/confirmPro.vue';

const $q = useQuasar();

// const confirm = ref(false);
// const confirm_text = ref("");
// const confirm_function = ref({});
// const confirm_function_arg = ref({});        //  Объект для передачи аргументов функции, которая будет описана в confirm_function
const loading = ref(false);
const loading_label = ref("");

const Users = ref([]);
const Roles = ref([]);
const Permissions = ref([]);
const UserEditForm = ref();
const RoleEditForm = ref();
const PermissionEditForm = ref();
// const t1 = ref(true);

const editUserEnable = ref(false);
const editUserMode = ref("");
const editUser = ref({
		USR_USER_ID	: -1,
    LOGIN       : "",
		PASSWORD		: "",
		PASSWORD1		: "",
    FULLNAME    : "",
    DESCRIPTION : "",
    USED 				: true,
    ROLES				: [],
    default_user: false,
  });
const isPwd = ref(true);
const isPwd1 = ref(true);

const editRoleEnable = ref(false);
const editRoleMode = ref("");
const editRole = ref({
		USR_ROLE_ID	: -1,
    ROLE 				: "",
    DESCRIPTION : "",
    USED 				: true,
    PERMISSIONS	: [],
  });

const editPermissionEnable = ref(false);
const editPermissionMode = ref("");
const editPermission = ref({
		USR_PERMISSION_ID	: -1,
    PERMISSION				: "",
    DESCRIPTION 			: "",
    CAN_DELETE        : 1,
    USED 							: true,
  });



const MyFilter = ref({  
	filtUserActiveOnly: true,  

});

const MODE_NEW = "new"
const MODE_EDIT = "edit"

const STAT_STATE = ""
const STAT_NEW = "N"
// const STAT_UPD = "U"
const STAT_DEL = "D"
const STAT_DEL_NEW = "DN"

const columns = ref([
  {
    name: "FULLNAME",
    required: true,
    label: "Пользователь",
    align: "left",
    field: (row) => row.FULLNAME,
    format: (val) => `${val}`,
    sortable: true,
  },
  { name: "USR_USER_ID", label: "USR_USER_ID", field: "USR_USER_ID" },
  {
    name: "LOGIN",
    required: true,
    label: "Логин",
    align: "center",
    field: "LOGIN",
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "USED",
    required: true,
    label: "Статус",
    align: "center",
    field: "USED",
    format: (val) => `${row.USED ? '' : 'Откл'}`,
    sortable: true,
  },
]);

const visibleColumns = ref(["FULLNAME", "LOGIN", "USED"]);


const load_data_ok = {users: false, roles: false, permissions: false, };

onMounted(async () => {
  const PROC_NAME = "onMounted> ";
  console.log(`${PROC_NAME}Начало`);

  // const ret_users = await loadData({ url: dict.access.user.list, params: { withRoles: true } });

  // console.log("ret_users = ", ret_users);

	loadUsers();
	loadRoles();
  loadPermissions();
  // const ret_roles = await loadData({ url: dict.access.role.list, params: { withPermissions: true } });
  // console.log("ret_roles = ", ret_roles);
  // const ret_permissions = await loadData({ url: dict.access.permission.list, params: {} });
  // console.log("ret_permissions = ", ret_permissions);


  // ret_users.forEach((item) => {
  //   item.screen_select = false;
  // });
  // Users.value = ret_users;

  // ret_roles.forEach((item) => {
  //   item.screen_on = false;
  //   item.screen_select = false;
  // });
  // Roles.value = ret_roles;

  // ret_permissions.forEach((item) => {
  //   item.screen_on = false;
  //   item.screen_select = false;
  // });
  // Permissions.value = ret_permissions;

  // console.log(`${PROC_NAME}r_data: `, r_data);

});



/**
 * Загрузка пользователей
 */
async function loadUsers() {    // Загрузка даннных
	const PROC_NAME = "loadUsers> ";
	load_data_ok.users = false;
	
	if(!loading.value) s_loading(true, "Подождите, Загрузка данных пользователей");  // 

	const ret_users = await loadData({ url: dict.access.user.list, params: { role: '%' } });

	// if(ret_template?.error) {
	// 	s_loading(false);
	// 	s_alert("При загрузке данных по щаблонам произошла ошибка. Повторите попытку позже");
	// 	return;
	// }
	console.log(PROC_NAME + "С сервера получен список пользователей: ret_users = ", ret_users);

	if(ret_users?.error) {
		s_loading(false);
		// s_alert("Загрузка данных по щаблонам произошла с ошибкой. Повторите попытку позже");
		s_alert("Загрузка данных пользователей произошла с ошибкой. Повторите попытку позже", ret_users.error.message ?? "");
	} else {
		if (!Array.isArray(ret_users)) {
			s_alert("Не найдено данных по пользователям");
		} else {
			ret_users.forEach(u => {
				u.hidden_row = false;
				u.screen_select  = Users.value?.find(uu => (uu.USR_USER_ID === u.USR_USER_ID))?.screen_select ?? false;
			});
			ret_users.sort((a, b) => {
				if(a.FULLNAME > b.FULLNAME)  return 1;
				if(a.FULLNAME < b.FULLNAME)  return -1;
				return 0;
			});
			Users.value = ret_users;
		}
		
		load_data_ok.users = true;
		load_data_check();
	}
}


/**
 * Загрузка ролей
 */
async function loadRoles() {    // Загрузка даннных ролей
	const PROC_NAME = "loadRoles> ";
	load_data_ok.roles = false;
	
	if(!loading.value) s_loading(true, "Подождите, Загрузка данных ролей");  // 

	const ret_roles = await loadData({ url: dict.access.role.list, params: { permission: '%' } });

	console.log(PROC_NAME + "С сервера получен список ролей: ret_roles = ", ret_roles);

	if(ret_roles?.error) {
		s_loading(false);
		// s_alert("Загрузка данных по щаблонам произошла с ошибкой. Повторите попытку позже");
		s_alert("Загрузка данных ролей произошла с ошибкой. Повторите попытку позже", ret_roles.error.message ?? "");
	} else {
		if (!Array.isArray(ret_roles)) {
			s_alert("Не найдено данных по ролям");
		} else {
			ret_roles.forEach(r => {
				r.hidden_row = false;
				r.screen_select = Roles.value?.find(rr => (rr.USR_ROLE_ID === r.USR_ROLE_ID))?.screen_select ?? false;
        r.screen_on = false;
			});
			ret_roles.sort((a, b) => {
				if(a.ROLE > b.ROLE)  return 1;
				if(a.ROLE < b.ROLE)  return -1;
				return 0;
			});
			Roles.value = ret_roles;
		}
		
		load_data_ok.roles = true;
		load_data_check();
	}
}


/**
 * Загрузка ролей
 */
async function loadPermissions() {    // Загрузка даннных разрешений
	const PROC_NAME = "loadPermissions> ";
	load_data_ok.permissions = false;
	
	if(!loading.value) s_loading(true, "Подождите, Загрузка данных разрешений");  // 

	const ret_permissions = await loadData({ url: dict.access.permission.list, params: {} });

	console.log(PROC_NAME + "С сервера получен список разрешений: ret_permissions = ", ret_permissions);

	if(ret_permissions?.error) {
		s_loading(false);
		// s_alert("Загрузка данных по щаблонам произошла с ошибкой. Повторите попытку позже");
		s_alert("Загрузка данных разрешений произошла с ошибкой. Повторите попытку позже", ret_permissions.error.message ?? "");
	} else {
		if (!Array.isArray(ret_permissions)) {
			s_alert("Не найдено данных по разрешениям");
		} else {
			ret_permissions.forEach(p => {
				p.hidden_row = false;
				p.screen_select = Permissions.value?.find(pp => (pp.USR_PERMISSION_ID === p.USR_PERMISSION_ID))?.screen_select ?? false;
				p.screen_users_on = false;
			});
			ret_permissions.sort((a, b) => {
				if(a.DESCRIPTION > b.DESCRIPTION)  return 1;
				if(a.DESCRIPTION < b.DESCRIPTION)  return -1;
				return 0;
			});
			Permissions.value = ret_permissions;
		}
		
		load_data_ok.permissions = true;
		load_data_check();
	}
}

/**
 * Действия по кнопке создания нового пользователя
 */
function BtnNewUser() {
	const PROC_NAME = "BtnNewUser>";
  editUser.value = {
		USR_USER_ID	: -1,
    LOGIN 			: "",
		PASSWORD		: "",
		PASSWORD1		: "",
    FULLNAME 		: "",
    DESCRIPTION : "",
    USED 				: true,
    ROLES				: [],
    default_user: false,
  };
  editUserMode.value = MODE_NEW;
  editUserEnable.value = true;
  RolesScrUpdate();
} 

/**
 * Действия по кнопке редактирования пользователя
 */
function BtnEditUser() {
	const PROC_NAME = "BtnEditUser>";
  const row = Users.value?.find(row => row.screen_select );
  if(!row) {  s_alert("Не выбрана стока для редактирования");   return;   }
  s_confirm(`Данное действие переведёт экран в режим редактирования пользователя "${row.FULLNAME}". Продолжить?`, EditUser, {row: row,});
} 

/**
 * Редактирование пользователя
 */
function EditUser({row}) {
	const PROC_NAME = "EditUser>";
	editUser.value = {
    USR_USER_ID	: row.USR_USER_ID,
    LOGIN 			: row.LOGIN,
		PASSWORD		: row.PASSWORD,
		PASSWORD1		: row.PASSWORD,
    FULLNAME 		: row.FULLNAME,
    DESCRIPTION : row.DESCRIPTION,
    USED 				: row.USED == 1,
    // ROLES				: row.ROLES?.map(r => {return {usr_role_id: r.usr_role_id, usr_role_id_old: r.usr_role_id, used: r.used, stat: "", }}) || [],
    ROLES				: row.ROLES?.map(r => {return {usr_role_id: r.usr_role_id, used: r.used, }}) || [],
    default_user: row.LOGIN === ' ' || row.LOGIN === 'admin',
  };
	editUserMode.value = MODE_EDIT;
  editUserEnable.value = true;
  PermissionsScrUpdate();
	console.log(PROC_NAME + " editUser.value =", editUser.value);
} 


/**
 * Действия по кнопке удаления пользователя
 */
function BtnDelUser() {
  const row = Users.value?.find(row => row.screen_select );
  if(!row) {  s_alert("Не выбран пользователь для удаления");   return;   }
  s_confirm(`Вы действительно хотите удалить пользователя "${row.FULLNAME}"?`, DelUser, row);
} 

/**
 * Удалениe пользователя
 */
async function DelUser(row) {
  const PROC_NAME = "DelUser> ";

  try {
    const delUser = { USR_USER_ID: row.USR_USER_ID, need_delete: true, };
    console.log(PROC_NAME, "Удаление учётной записи пользователя: ", delUser);
    s_loading(true, "Подождите. Производится удаление учётной записи пользователя");
    const ret = await sendData({ url: dict.access.user.save, params: delUser });
    console.log(PROC_NAME + "Результат удаления пользователя. ret: ", ret);

    if (ret?.error) {
      throw new Error(ret.error.message, { cause: ret.error });
    }
    
    if(ret?.id && ret?.id < 0 )  {
      // если было успешное удаление 
      $q.notify({
        message: `Данные пользователя успешно удалены из БД`,
        type: 'positive',
        // icon: ''
      });
    } else {
      s_alert('Что-то пошло не так. Повторите попытку позже.');
    }
  } catch (ex) {
    console.error(PROC_NAME, 'ERROR', ex);
    s_alert(`Ошибка удаления данных пользователя! Повторите попытку позже`, ex.message ?? "");

  } finally {
    s_loading(false);
  }

  // editUserEnable.value = false;
  await loadUsers();
  RolesScrUpdate();
}

/**
 * Блокировка удаления пользователя для системных пользователtq (default)
 */
 function DelUserDisable() {
  if(!Users.value?.find(row => row.screen_select)) return true;
  return (!Users.value?.find(row => row.screen_select)?.CAN_DELETE);
}

/**
 * Действия по кнопке сохранения пользователя
 */
async function BtnSaveUser() {
  const PROC_NAME = "BtnSaveUser>";
  let check = false;
  await UserEditForm.value.validate().then(success => {     
		if (success) {
			check = true;
		}
		else {
			s_alert("Данные пользователя введены некорректно. Введите данные и повторите попытку позже");
		}
	});
	if(!check)  return;
  // Формируем объект с данными для записи
  const user = {
    LOGIN 			: editUser.value.LOGIN.trim(),
		PASSWORD		: editUser.value.PASSWORD?.trim(),
    FULLNAME 		: editUser.value.FULLNAME.trim(),
    DESCRIPTION : editUser.value.DESCRIPTION.trim() || ' ',
    USED 				: editUser.value.USED ? 1 : 0,
    // ROLES				: row.ROLES?.map(r => {return {usr_role_id: r.usr_role_id, usr_role_id_old: r.usr_role_id, used: r.used, stat: "", }}) || [],
    ROLES				: [],
    ...(editUser.value.USR_USER_ID > 0 && {USR_USER_ID: editUser.value.USR_USER_ID}),
  };
  // роли
  Roles.value.forEach(r => {
    if(r.screen_on) {
      user.ROLES.push({
        usr_role_id: r.USR_ROLE_ID, 
        // stat: editUserMode.value === MODE_NEW ? STAT_NEW : (Users.value?.find(row => row.screen_select )?.ROLES?.find(rr => (r.usr_role_id === rr.usr_role_id)) ? STAT_STATE : STAT_NEW),
        stat: editUserMode.value === MODE_NEW ? STAT_NEW : (editUser.value.ROLES?.find(rr => (r.USR_ROLE_ID === rr.usr_role_id)) ? STAT_STATE : STAT_NEW),
      });
    }
    
  });
  if(editUserMode.value === MODE_EDIT)  {   // Если редактирование, добавить ещё удаляемые роли, если найдутся
    // Users.value?.find(row => row.screen_select )?.ROLES?.forEach(r => {
    editUser.value.ROLES?.forEach(r => {
      //Если в старом наборе есть, а в новом - нет
      // if(!editUser.value.ROLES?.find(rr => (r.usr_role_id === rr.usr_role_id)))  user.ROLES.push({  usr_role_id: r.usr_role_id,   stat: STAT_DEL, });
      if( !(Roles.value.find(rr => (r.usr_role_id === rr.USR_ROLE_ID ))?.screen_on) )  user.ROLES.push({  usr_role_id: r.usr_role_id,   stat: STAT_DEL, });
    });
  }
  
  // console.log(PROC_NAME + " user=", user);
  s_confirm(`Вы действительно хотите сохранить данные пользователя "${editUser.value.FULLNAME}"?`, () => {SaveUser(user)}, );
}

/**
 * Сохранение пользователя
 */
async function SaveUser(user) {
  const PROC_NAME = "SaveUser> ";

  console.log(PROC_NAME, "Сохранение данных пользователя: ", user);

  try {
    s_loading(true, "Подождите. Производится запись данных пользователя");

    const ret = await sendData({ url: dict.access.user.save, params: user });
    console.log(PROC_NAME + "ret = ", ret);

    if (ret?.error) {
      throw new Error(ret.error.message, { cause: ret.error });
    }
      
    if(ret?.id && ret?.id > 0 ) {
      // если было успешное сохранение 
      $q.notify({
        message: `Данные пользователя успешно сохранены в БД`,
        type: 'positive',
        // icon: ''
      });
    } else {
      s_alert('Что-то пошло не так. Повторите попытку позже.');
    }

  } catch (ex) {
    console.error(PROC_NAME, 'ERROR', ex);
    s_alert(`Ошибка сохранения данных пользователя! Повторите попытку позже`, ex.message ?? "");

  } finally {
    // waitingSaveTemplate.value = false;
    s_loading(false);
  }


  editUserEnable.value = false;
  await loadUsers();
  RolesScrUpdate();
}

/**
 * Действия по кнопке отмены создания/редактирования пользователя
 */
function BtnCancelEditUser() {
  editUserEnable.value = false;
  RolesScrUpdate();
}


/**
 * Набор функций валидации полей пользователя
 */
const myUserRules = {
	fullname: (val) => {  // Не введено имя пользователя
		if( !val?.trim() ) return "Не введено имя пользователя";      
		return true;
	},
	fullname1: (val) => {  // Имя пользователя совпадает с другим именем сохранённого пользователя
		if(Users.value?.find(u => (val?.trim() === u.FULLNAME && editUser.value.USR_USER_ID !== u.USR_USER_ID))) {
			return 'Пльзователь существует';
		} 
    return true;
	},
	login: (val) => {  // Не введено имя пользователя
		if( (!val?.trim()) && (!editUser.value.default_user) ) return "Не введён логин";      
		return true;
	},
	login1: (val) => {  // логин совпадает с другим логином
		if(Users.value?.find(u => (val?.trim() === u.LOGIN && editUser.value.USR_USER_ID !== u.USR_USER_ID))) { 	return 'Не уникальный логин';	} 
    return true;
	},
	password: (val) => {  // Не введён пароль
    // if( (!val?.trim()) && !(editUser.value.default_user && val === ' ' ))  return "Не введён пароль";      
    if( (!val?.trim()) && !(editUser.value.default_user && editUser.value.LOGIN === ' ' ))  return "Не введён пароль";      
		return true;
	},
	password1: (val) => {  // логин совпадает с другим логином
    if(!(editUser.value.default_user && editUser.value.LOGIN === ' ' && !editUser.value.PASSWORD?.trim() && !editUser.value.PASSWORD1?.trim() ))   {   // Если это не пользователь по умолчанию с пустым паролем
      if(editUser.value.PASSWORD?.trim() !== editUser.value.PASSWORD1?.trim()) {  	return 'Пароль не подтверждён';	} 
    }
    return true;
	},
}



/**
 * Действия по кнопке создания новой роли
 */
function BtnNewRole() {
	const PROC_NAME = "BtnNewRole>";
	editRole.value = {
		USR_ROLE_ID	: -1,
    ROLE 				: "",
    DESCRIPTION : "",
    USED 				: true,
    PERMISSIONS	: [],
  };
	editRoleMode.value = MODE_NEW;
	editRoleEnable.value = true;
  RolesScrUpdate();

} 

/**
 * Действия по кнопке редактирования роли
 */
function BtnEditRole() {
	const PROC_NAME = "BtnEditRole>";
  const row = Roles.value?.find(row => row.screen_select );
  if(!row) {  s_alert("Не выбрана стока для редактирования");   return;   }
	s_confirm(`Данное действие переведёт экран в режим редактирования роли "${row.ROLE}". Продолжить?`, EditRole, {row: row,});
} 

/**
 * Редактирование роли
 */
function EditRole({row}) {
	const PROC_NAME = "EditRole>";
	editRole.value = {
		USR_ROLE_ID : row.USR_ROLE_ID,
		ROLE 				: row.ROLE,
		DESCRIPTION : row.DESCRIPTION,
		USED 				: row.USED == 1,
		PERMISSIONS	: row.PERMISSIONS?.map(p => {return {usr_permission_id: p.usr_permission_id, used: p.used, }}) || [],
	};
	editRoleMode.value = MODE_EDIT;
	editRoleEnable.value = true;
  RolesScrUpdate();
} 

/**
 * Действия по кнопке удаления роли
 */
function BtnDelRole() {
  const row = Roles.value?.find(row => row.screen_select );
  if(!row) {  s_alert("Не выбрана стока для удаления");   return;   }
  s_confirm(`Вы действительно хотите удалить роль "${row.ROLE}"?`, DelRole, row);
} 

/**
 * Удалениe роли
 */
async function DelRole(row) {
  const PROC_NAME = "DelRole> ";
  try {
    const delRole = { USR_ROLE_ID: row.USR_ROLE_ID, need_delete: true, };
    console.log(PROC_NAME + "Удаление роли доступа: ", row);
    s_loading(true, "Подождите. Производится удаление роли доступа");
    const ret = await sendData({ url: dict.access.role.save, params: delRole });
    console.log(PROC_NAME + "Результат удаления роли доступа. ret: ", ret);
    if (ret?.error) {
      throw new Error(ret.error.message, { cause: ret.error });
    }
    
    if(ret?.id && ret?.id < 0 )  {
      // если было успешное удаление 
      $q.notify({
        message: `Данные роли успешно удалены из БД`,
        type: 'positive',
        // icon: ''
      });
    } else {
      s_alert('Что-то пошло не так. Повторите попытку позже.');
    }
  } catch (ex) {
    console.error(PROC_NAME, 'ERROR', ex);
    s_alert(`Ошибка удаления данных роли! Повторите попытку позже`, ex.message ?? "");
  } finally {
    s_loading(false);
  }

  // editUserEnable.value = false;
  await loadRoles();
  PermissionsScrUpdate();
}


/**
 * Блокировка удаления роли для системных ролей (default)
 */
function DelRoleDisable() {
  if(!Roles.value?.find(row => row.screen_select)) return true;
  return (Roles.value?.find(row => row.screen_select)?.ROLE?.indexOf("default") === 0 );
}

/**
 * Действия по кнопке сохранения роли
 */
async function BtnSaveRole() {
  const PROC_NAME = "BtnSaveRole>";
  let check = false;
  await RoleEditForm.value.validate().then(success => {
    if (success) {
      check = true;
    }
    else {
      s_alert("Данные роли введены некорректно. Введите данные и повторите попытку позже");
    }
  });
  if (!check) return;
  // Формируем объект с данными для записи
  const role = {
    ROLE: editRole.value.ROLE.trim(),
    DESCRIPTION: editRole.value.DESCRIPTION.trim() || ' ',
    USED: editRole.value.USED ? 1 : 0,
    PERMISSIONS: [],
    ...(editRole.value.USR_ROLE_ID > 0 && { USR_ROLE_ID: editRole.value.USR_ROLE_ID }),
  };
  // разрешения
  Permissions.value.forEach(p => {
    if (p.screen_on) {
      role.PERMISSIONS.push({
        usr_permission_id: p.USR_PERMISSION_ID,
        // stat: editRoleMode.value === MODE_NEW ? STAT_NEW : (Roles.value?.find(row => row.screen_select )?.ROLES?.find(rr => (r.usr_role_id === rr.usr_role_id)) ? STAT_STATE : STAT_NEW),
        stat: editRoleMode.value === MODE_NEW ? STAT_NEW : (editRole.value.PERMISSIONS?.find(pp => (p.USR_PERMISSION_ID === pp.usr_permission_id)) ? STAT_STATE : STAT_NEW),
      });
    }

  });
  if (editRoleMode.value === MODE_EDIT) {   // Если редактирование, добавить ещё удаляемые  разрешения, если найдутся
    editRole.value.PERMISSIONS?.forEach(p => {
      //Если в старом наборе есть, а в новом - нет
      if (!(Permissions.value.find(pp => (p.usr_permission_id === pp.USR_PERMISSION_ID))?.screen_on)) role.PERMISSIONS.push({ usr_permission_id: p.usr_permission_id, stat: STAT_DEL, });
    });
  }

  // console.log(PROC_NAME + " role=", role);
  s_confirm(`Вы действительно хотите сохранить данные роли "${editRole.value.ROLE}"?`, () => { SaveRole(role) },);
}

/**
 * Сохранение роли
 */
async function SaveRole(role) {
  const PROC_NAME = "SaveRole> ";


  try {
    console.log(PROC_NAME, "Сохранение данных роли доступа: ", role);
    s_loading(true, "Подождите. Производится запись данных роли доступа");
    const ret = await sendData({ url: dict.access.role.save, params: role });
    console.log(PROC_NAME + "ret = ", ret);
    if (ret?.error) {
      throw new Error(ret.error.message, { cause: ret.error });
    }
      
    if(ret?.id && ret?.id > 0 ) {
      // если было успешное сохранение 
      $q.notify({
        message: `Данные роли успешно сохранены в БД`,
        type: 'positive',
        // icon: ''
      });
    } else {
      s_alert('Что-то пошло не так. Повторите попытку позже.');
    }

  } catch (ex) {
    console.error(PROC_NAME, 'ERROR', ex);
    s_alert(`Ошибка сохранения данных роли! Повторите попытку позже`, ex.message ?? "");

  } finally {
    s_loading(false);
  }

  editRoleEnable.value = false;
  await loadRoles();
  // RolesScrUpdate();
  PermissionsScrUpdate();
}

/**
 * Действия по кнопке отмены создания/редактирования роли
 */
function BtnCancelEditRole() {
  editRoleEnable.value = false;
  RolesScrUpdate();
}

/**
 * Набор функций валидации полей роли
 */
const myRoleRules = {
	role: (val) => {  // Не введено имя роли
		if( !val?.trim() ) return "Не введено имя роли";      
		return true;
	},
	role1: (val) => {  // Имя роли совпадает с другим именем сохранённой роли
		if(Roles.value?.find(r => (val?.trim() === r.ROLE && editRole.value.USR_ROLE_ID !== r.USR_ROLE_ID))) { 	return 'Не уникальное имя роли'; 	} 
    return true;
  },
}

/**
 * Действия по кнопке создания нового разрешения
 */
function BtnNewPermission() {
	const PROC_NAME = "BtnNewPermission>";
	editPermission.value = {
		USR_PERMISSION_ID	: -1,
    PERMISSION				: "",
    DESCRIPTION 			: "",
    CAN_DELETE        : 1,
    USED 							: true,
  };
	editPermissionEnable.value = true;
	editPermissionMode.value = MODE_NEW;
  PermissionsScrUpdate();
} 

/**
 * Действия по кнопке редактирования разрешения
 */
function BtnEditPermission() {
	const PROC_NAME = "BtnEditPermission>";
  const row = Permissions.value?.find(row => row.screen_select );
  if(!row) {  s_alert("Не выбрана стока для редактирования");   return;   }
	s_confirm(`Данное действие переведёт экран в режим редактирования разрешения "${row.DESCRIPTION}". Продолжить?`, EditPermission, {row: row,});
} 

/**
 * Действия по кнопке редактирования разрешения
 */
function EditPermission() {
	const PROC_NAME = "EditPermission>";
  const row = Permissions.value?.find(row => row.screen_select );
  if(!row) {  s_alert("Не выбрана стока для редактирования");   return;   }
	editPermission.value = {
    USR_PERMISSION_ID	: row.USR_PERMISSION_ID,
    PERMISSION				: row.PERMISSION,
    DESCRIPTION 			: row.DESCRIPTION,
    CAN_DELETE        : row.CAN_DELETE,
    USED 							: row.USED == 1,
  };
	editPermissionEnable.value = true;
	editPermissionMode.value = MODE_EDIT;
  PermissionsScrUpdate();
} 

/**
 * Действия по кнопке удаления разрешения
 */
function BtnDelPermission() {
  const row = Permissions.value?.find(row => row.screen_select );
  if(!row) {  s_alert("Не выбрана стока для удаления");   return;   }
  s_confirm(`Вы действительно хотите удалить разрешение "${row.DESCRIPTION}"?`, DelPermission, row);
} 


/**
 * Удалениe разрешения
 */
async function DelPermission(row) {
  const PROC_NAME = "DelPermission> ";
  try {
    const delPermission = { USR_PERMISSION_ID: row.USR_PERMISSION_ID, need_delete: true, };
    console.log(PROC_NAME + "Удаление разрешения доступа: ", row);
    s_loading(true, "Подождите. Производится удаление разрешения доступа");
    const ret = await sendData({ url: dict.access.permission.save, params: delPermission });
    console.log(PROC_NAME + "Результат удаления разрешения доступа. ret: ", ret);
    if (ret?.error) {
      throw new Error(ret.error.message, { cause: ret.error });
    }
    
    if(ret?.id && ret?.id < 0 )  {
      // если было успешное удаление 
      $q.notify({
        message: `Данные разрешения успешно удалены из БД`,
        type: 'positive',
        // icon: ''
      });
    } else {
      s_alert('Что-то пошло не так. Повторите попытку позже.');
    }
  } catch (ex) {
    console.error(PROC_NAME, 'ERROR', ex);
    s_alert(`Ошибка удаления данных разрешения! Повторите попытку позже`, ex.message ?? "");
  } finally {
    s_loading(false);
  }

  // editUserEnable.value = false;
  await loadPermissions();
  // PermissionsScrUpdate();
}

/**
 * Блокировка удаления разрешениря для системных разрешений
 */
function DelPermissionDisable() {
  return Permissions.value?.find(row => row.screen_select)?.CAN_DELETE ? false : true;
}


/**
 * Действия по кнопке сохранения разрешения
 */
async function BtnSavePermission() {
  const PROC_NAME = "BtnSavePermission>";
  let check = false;
  await PermissionEditForm.value.validate().then(success => {
    if (success) {
      check = true;
    }
    else {
      s_alert("Данные разрешения введены некорректно. Введите данные и повторите попытку позже");
    }
  });
  if (!check) return;
  // Формируем объект с данными для записи
  const permission = {
    PERMISSION:   editPermission.value.PERMISSION.trim(),
    DESCRIPTION:  editPermission.value.DESCRIPTION.trim(),
    CAN_DELETE:   editPermission.value.CAN_DELETE,
    USED:         editPermission.value.USED ? 1 : 0,
    ...(editPermission.value.USR_PERMISSION_ID > 0 && { USR_PERMISSION_ID: editPermission.value.USR_PERMISSION_ID }),
  };
  console.log(PROC_NAME + " permission=", permission);
  s_confirm(`Вы действительно хотите сохранить данные разрешения "${editPermission.value.DESCRIPTION}"?`, () => { SavePermission(permission) },);
}

/**
 * Сохранение разрешения
 */
async function SavePermission(permission) {
  const PROC_NAME = "SavePermission>";
  console.log(PROC_NAME, "Сохранение данных разрешения доступа: ", permission);

  try {
    s_loading(true, "Подождите. Производится запись разрешения доступа");
    const ret = await sendData({ url: dict.access.permission.save, params: permission });
    console.log(PROC_NAME + "ret = ", ret);
    if (ret?.error) {
      throw new Error(ret.error.message, { cause: ret.error });
    }
      
    if(ret?.id && ret?.id > 0 ) {
      // если было успешное сохранение 
      $q.notify({
        message: `Данные разрешения успешно сохранены в БД`,
        type: 'positive',
        // icon: ''
      });
    } else {
      s_alert('Что-то пошло не так. Повторите попытку позже.');
    }

  } catch (ex) {
    console.error(PROC_NAME, 'ERROR', ex);
    s_alert(`Ошибка сохранения данных разрешения! Повторите попытку позже`, ex.message ?? "");
  } finally {
    s_loading(false);
  }

  editPermissionEnable.value = false;
  await loadPermissions();
  // RolesScrUpdate();
  PermissionsScrUpdate();

  // editPermissionEnable.value = false;
  // await loadPermissions();
  // RolesScrUpdate();
}

/**
 * Действия по кнопке отмены создания/редактирования разрешения
 */
function BtnCancelEditPermission() {
  editPermissionEnable.value = false;
  RolesScrUpdate();
}

/**
 * Набор функций валидации полей разрешения
 */
const myPermissionRules = {
	description: (val) => {  // Не введено имя разрешения
		if( !val?.trim() ) return "Не введено имя разрешения";      
		return true;
	},
	description1: (val) => {  // Имя разрешения совпадает с другим именем сохранённого разрешения
		if(Permissions.value?.find(p => (val?.trim() === p.DESCRIPTION && editPermission.value.USR_PERMISSION_ID !== p.USR_PERMISSION_ID))) { 	return 'Не уникальное имя разрешения'; 	} 
    return true;
  },
	permission: (val) => {  // Не введено короткое имя разрешения
		if( !val?.trim() ) return "Не введено короткое имя";      
		return true;
	},
	permission1: (val) => {  // Короткое имя разрешения совпадает с другим коротким именем сохранённого разрешения
		if(Permissions.value?.find(p => (val?.trim() === p.PERMISSION && editPermission.value.USR_PERMISSION_ID !== p.USR_PERMISSION_ID))) { 	return 'Не уникальное короткое имя'; 	} 
    return true;
  },
}



/**
 * 
 */
function RolesScrUpdate() {
  const PROC_NAME = "RolesScrUpdate>";
  // console.log(PROC_NAME);
  if(editUserEnable.value && (editUserMode.value === MODE_NEW)) {
    Roles.value.forEach((item) => {    item.screen_on = false;    });
  } else {
    if(editRoleEnable.value ) {  // 
      Roles.value.forEach((item) => {    item.screen_on = false;    });
    } else {
      Roles.value.forEach((item) => {    item.screen_on = checkRole(item.USR_ROLE_ID);    });
    }
  }
  PermissionsScrUpdate();
}


function PermissionsScrUpdate() {
  if(editPermissionEnable.value) {
    Permissions.value.forEach((p) => {
      p.screen_on = false;
      p.screen_users_on = false;
    });
    return;
  } 
  if(editRoleEnable.value) {
    Permissions.value.forEach((p) => {
      // p.screen_on = false;
      // p.screen_on = !!(editRole.value.PERMISSIONS?.find(pp => (pp.usr_permission_id === p.USR_PERMISSION_ID)));
      p.screen_users_on = editRoleMode.value === MODE_EDIT ? p.screen_on : false;
      // p.screen_select = false;
    });
    return;
  } 
  if(editUserEnable.value) {
    Permissions.value.forEach((p) => {
      // p.screen_on = false;
      p.screen_on = !!(Roles.value?.find(r => (r.screen_select))?.PERMISSIONS?.find(pp => (pp.usr_permission_id === p.USR_PERMISSION_ID)));
      let permis_on = false;
      Roles.value?.forEach(r => {
        if(r.screen_on && r.PERMISSIONS?.length > 0)  {
          r.PERMISSIONS.forEach(pp => { if(pp.usr_permission_id === p.USR_PERMISSION_ID) permis_on = true;});
        }
      });
      p.screen_users_on = permis_on;
      // p.screen_select = false;
    });
    return;
  } 
  Permissions.value.forEach((p) => {
    // p.screen_on = false;
    p.screen_on = !!(Roles.value?.find(r => (r.screen_select))?.PERMISSIONS?.find(pp => (pp.usr_permission_id === p.USR_PERMISSION_ID)));
		p.screen_users_on = false;
    // p.screen_select = false;
  });

  Users.value?.find(u => (u.screen_select))?.ROLES?.forEach(r => {
		Roles.value?.find(rr => (r.usr_role_id === rr.USR_ROLE_ID))?.PERMISSIONS?.forEach(p => {
			const permis = Permissions.value?.find(pp => (p.usr_permission_id === pp.USR_PERMISSION_ID));
			if(permis) {
				permis.screen_users_on = true;
			}
			
		});
	});
  // Roles.value.forEach((r) => {
  //   if (r.screen_on) {
  //     r.permissions?.forEach((r_p) => {
  //       Permissions.value.find((p, ind, arr) => p.USR_PERMISSION_ID == r_p).screen_on = true;
  //       if (r.screen_select)
  //         Permissions.value.find((p, ind, arr) => p.USR_PERMISSION_ID  == r_p).screen_select = true;
  //     });
  //   }
  // });
	Permissions.value.forEach((p) => {
    p.screen_select = p.screen_select;
  });
}

/**
 * проверка наличия у выбранного в списке пользователя роли, заданной role_id
 */
function checkRole(role_id) {           // При отрисовке найти, какие роли должны быть отрисованы
  const sel_user = Users.value.find((el, ind, arr) => el.screen_select === true);
  // return sel_user ? sel_user.roles.includes(role_id) : false;
  return sel_user ? (sel_user.ROLES?.find(r => (r.usr_role_id === role_id)) !== undefined) : false;
  return true;
}

/**
 * Класс - подсветка для ролей
 */
function role_class(r) {
  if(r.screen_select && r.screen_on) return "item-sel-users-on";
  if(r.screen_select) return "item-sel";
	if(r.screen_on) return "item-users-on";
	return "";
}

/**
 * Класс - подсветка для разрешений
 */
function permission_class(p) {
  if(p.screen_select && p.screen_users_on) return "item-sel-users-on";
  if(p.screen_select) return "item-sel";
	if(p.screen_users_on && p.screen_on) return "item-users-on1";
	if(p.screen_users_on) return "item-users-on";
	return "";
}





// Обработка фильтров
function MyFilterMethod(rows, terms, cols, getCellValue) {  
	
	// console.log('filter-method-terms= ', terms.filtStatus);

	if(rows?.length) {
		for(let i = 0; i< rows.length; i++) {
			if(terms.filtUserActiveOnly && !rows[i].USED)     {rows[i].hidden_row = true;  continue;};
			
			rows[i].hidden_row = false;
		}
	}

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


<style lang="sass" scoped>

.item-users-on
	// background-color: $light-green-12
	// color: $light-green-12 
	color: $green-11 

.item-users-on1
	// background-color: $light-green-12
	// color: $light-green-12 
	color: $green-12 

.item-sel-users-on
	background-color: $grey-8
	color: $green-12
	// font-weight: bold
	// color: $blue-grey-1

.item-sel
	background-color: $grey-8
	// color: $green-12
	// font-weight: bold
	// color: $blue-grey-1

.item-on
	// background-color: $grey-8
	font-weight: bold
	// color: $blue-grey-1






// .table-style1

// 	thead tr th
// 		color: #FFFFFF
// 		border-color: #FFFFFF
// 		text-align: center !important
// 		vertical-align: middle !important
// 		background-color: rgb(70, 69, 64) !important
// 		font-size: 10pt !important

// 	tr td 
// 			text-align: center
// 			vertical-align: middle !important
// 			color: #000000 !important

.block-work
	max-height: 87vh 
	overflow-y: auto

.f-right
	float: right

</style>

<style scoped>



.btn-vmz {
  background: linear-gradient(rgb(180, 180, 180), rgb(73, 73, 73)) !important;
  border: 2px solid white !important;
  margin-bottom: 5px !important;
}

.btn-vmz-nav {
  background: linear-gradient(rgb(180, 180, 180), rgb(73, 73, 73));
  color: white !important;
}

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





</style>