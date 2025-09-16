// import router from "../router";
import { loadData } from "./serverData";
// import { mill as url } from "../router/dataUrl";
import { sys as url } from "../router/dataUrl";
import routes from "../router/routes";
// import { useAccessStore } from "../stores/accessStore";
// const accessStore = useAccessStore(); 

const noDb = false;

const Permissions = [];
const defaultPerm = [
  "general",
  "tracking",
  "job",
  "strip",
  "manage",
  "access",
  "dict",
  "admin",
  "root",
];

const loadLoginUrl = url.login;
const loadLogoutUrl = url.logout;

const access = {
  
  user: {
    login: async (
      { username, password } = { username: null, password: null },
    ) => {
      const ret = !noDb
        ? // username || password ?
          await loadData({
            url: loadLoginUrl,
            params: {
              ...(!!username && { username: username }),
              ...(!!password && { password: password }),
            },
          })
        : undefined;
      // : {
      //     username: " ",
      //     password: "",
      //     permissions: defaultPerm,
      //   };
      return ret;
      // return ret && !ret.error
      //   ? ret
      //   : { username: " ", password: "", permissions: defaultPerm };
      // return  { username: " ", password: "", permissions: defaultPerm };
    },
    logout: async () => {
      const ret = await loadData({
        url: loadLogoutUrl,
      });
      await access.create();
      return ret;
    },
  },
  create: async function ({ username, password, permissions } = {}) {
    const PROC_NAME = "access.create> ";
    // perm.forEach
    // Permissions.concat(defaultPerm);
    // console.log(PROC_NAME + "НАЧАЛО username=" + JSON.stringify(username) + "; permissions=" + JSON.stringify(permissions));
    // console.log(PROC_NAME + "localStorage username=" + JSON.stringify(localStorage.getItem("username")) + "; permissions=" + JSON.stringify(localStorage.getItem("permissions")));
    Permissions.length = 0;
    try {
      if (username === undefined && permissions === undefined) {
        const ret = await access.user.login();
        // const ret = await access.user.login({ username: " ", password: "-" });     // Логин при первом запуске проекта должен быть без подставления логина/пароля, чтобы принудительно не сбрасывать их на сервере
        // defaultPerm.forEach(p => {
        // if(!permissions.includes("root")) permissions.push("root");
        // });
        username = ret.username;
        permissions = ret.permissions;
      }

      // permissions.forEach((p) => Permissions.push(p));
      if(Array.isArray(permissions) && permissions.length > 0 && permissions[0] !== null) {
        permissions.forEach((p) => {
          if(!Permissions.includes(p)) Permissions.push(p);   // чтоб избежать повторений
          permiss_find(p, routes[0]);
          // if(p.indexOf("job") === 0 && !Permissions.includes("common")) Permissions.push("common");
        });
        if(!Permissions.includes("root")) Permissions.push("root");   // чтоб избежать повторений
      } else {
        // console.log( `${PROC_NAME} 000 --- Нет разрешений для пользователя "${username}"`);
        Permissions.push("root");
      }

      // if (!Permissions.includes("general"))  Permissions.push("general");
      
      // if (!Permissions.includes("tracking"))  Permissions.push("tracking");

      // if (username) {
      //   if (username === "prn" && password === "prn") {
      //     defaultPerm.forEach((p) => {
      //       Permissions.push(p);
      //     });
      //     Permissions.push("millPrn");
      //   }
      //   if (username === "admin" && password === "admin") {
      //     defaultPerm.forEach((p) => {
      //       Permissions.push(p);
      //     });
      //     Permissions.push("millPrn", "admin");
      //   }
      // } else {
      //   defaultPerm.forEach((p) => {
      //     Permissions.push(p);
      //   });
      // }
      // На всякий случай
      if(Permissions.length === 0) {
        // console.log( `${PROC_NAME} Нет разрешений для пользователя "${username}"`);
        Permissions.push("root"); 
      }

      localStorage.setItem("username", username);
      localStorage.setItem("permission", JSON.stringify(Permissions));
      
      // console.log("useAccessStore = ", useAccessStore);
      // accessStore.newRights(Permissions);


      // console.log( `${PROC_NAME}Разрешения для пользователя "${username}" получены!`,   permissions, );
      // console.log( `${PROC_NAME}Разрешения для пользователя "${username}" созданы УСПЕШНО!`, Permissions, );
    } catch (ex) {
      console.error(
        `${PROC_NAME}Ошибка создания разрешений для пользователя "${username}"`,
        ex,
      );
    }
  },

  check: function (permission) {
    // const PROC_NAME = "access.check> ";
    // console.log(`${PROC_NAME}perm = "${permission}"`, Permissions);

    // Если permission не задан (undefined), то проверку на доступ не проводить - однозначно разрешать.
    return permission ? Permissions.includes(permission) : true;
  },

  list: function () {
    return Permissions;
  },
  
  isReady: function () {
    return Permissions.length > 0;
  },
};


// Поиск разрешений в ветках роутера для того, чтоб добавить к списку разрешений разрешения для родительских веток в роутере 
function permiss_find(permiss, branch) {
  let perm_vis = false;
  let perm_enabl = false;
  // Прогон, чтоб выявить возможное наличие разрешения во вложенных ветках
  if(branch?.children && branch.children.length > 0) {  
    branch.children.forEach(b => {
      const r = permiss_find(permiss, b);
      if(r?.vis ) perm_vis = true;
      if(r?.enabl ) perm_enabl = true;
    });
  }
  // Проверка текущей ветки
  if(branch?.meta?.permission?.visible === permiss)  perm_vis = true;
  if(branch?.meta?.permission?.enabled === permiss)  perm_enabl = true;
  // Добавление разрешений текушей ветки, если выявлена такая необходимость
  if(perm_vis   && branch?.meta?.permission?.visible && !Permissions.includes(branch.meta.permission.visible)) Permissions.push(branch.meta.permission.visible); 
  if(perm_enabl && branch?.meta?.permission?.enabled && !Permissions.includes(branch.meta.permission.enabled)) Permissions.push(branch.meta.permission.enabled); 
  // Возврашщаем результирующие разрешения текущей ветки
  return { vis: perm_vis, enabl: perm_enabl,};
}

export default access;
// export default {
//   create: access.create,
//   check: access.check,
// };

// await access.create();

// console.log(`ACCESS BEGIN 01`);

// access.create().finally(() => {
//   const PROC_NAME = "access.create> ";
//   console.log(`${PROC_NAME}После завершения`);
// });

// for (let i = 0; i < 10; i++) {
//   console.log(`Permissions.length = ${Permissions.length}`);
// }
