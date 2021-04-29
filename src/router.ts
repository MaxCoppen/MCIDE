import { createWebHistory, createRouter } from "vue-router";

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('./views/Home.vue')
    },
    {
        path: '/project/env',
        name: 'env',
        component: () => import('./views/projects/Environment.vue')
    },
    {
        path: '/editor/dotnet',
        name: 'dotnet',
        component: () => import('./views/projects/dotnet/Editor.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router