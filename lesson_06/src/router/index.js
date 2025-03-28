/** @format */

import {createWebHistory, createRouter} from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "root",
      // props: {
      //   filter: false,
      // },
      component: () => import("../pages/ProductList.vue"),
    },
    {
      path: "/catalog",
      name: "catalog",
      // props: {
      //   filter: false,
      // },
      component: () => import("../pages/ProductList.vue"),
    },
    {
      path: "/order",
      name: "order",
      component: () => import("../pages/Order.vue"),
    },
    {
      path: "/product/:id",
      name: "product",
      component: () => import("../pages/Product.vue"),
      props: true,
    },

    {
      path: "/new-product",
      name: "newProduct",
      component: () => import("../pages/ProductNew.vue"),
    },
    {
      path: "/cart",
      name: "cart",
      component: () => import("../pages/Cart.vue"),
    },
  ],
});

export default router;
