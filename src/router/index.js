import Router from "vue-router";
import Vue from "vue";

import Content from "@/components/Content.vue"

Vue.use(Router);

const routes = [
    {path: '/', component: Content}
];

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL + "templates/",
    routes
});

export default router;