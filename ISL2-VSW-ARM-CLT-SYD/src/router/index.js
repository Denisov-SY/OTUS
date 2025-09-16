import { createRouter, createWebHistory } from "vue-router";
import { useQuasar } from "quasar";
import routes from "./routes";
import access from "../components/access";

const router = createRouter({

  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) {
    next({
      path: "/errors/404",
      // query: { redirect: to.fullPath },
    });
  } else {
    if (
      to.matched.some((record) => !access.check(record.meta.permission.enabled))
    ) {
      // этот путь требует авторизации, проверяем залогинен ли
      // пользователь, и если нет, перенаправляем на страницу с сообщением об ошибке отсутствия доступа
      // if (!auth.loggedIn())
      {
        next({
          path: "/errors/403",
          // query: { redirect: to.fullPath },
        });
        // } else {
        //   next();
      }
    } else {
      next(); // всегда так или иначе нужно вызвать next()!
    }
  }
});

export default router;
