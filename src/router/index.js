import Router from "vue-router";
import Vue from "vue";

import Content from "@/components/Content.vue"

Vue.use(Router);

const routes = [
    {path: '/', component: Content},
    {path: '/:id', component: Content},
    /*{path: '/edit/:id', component: Edit},
    {path: '/edit/', component: C404},
    {path: '*', component: C404}*/
];

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;