import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("../layout/Layout.vue"),

      children: [
        {
          path: "",
          name: "home",
          component: () => import("../views/HomeView.vue"),
        },
      ],
    },
  ],
});

export default router;
