import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: () => import('../views/Home.vue') },
        { path: '/services', component: () => import('../views/Services.vue') },
        { path: '/services/:id', component: () => import('../views/ServiceDetail.vue') },
        { path: '/gallery', component: () => import('../views/Gallery.vue') },
        { path: '/book/:serviceId', component: () => import('../views/Booking.vue') },
        { path: '/booking/confirm/:ref', component: () => import('../views/BookingConfirm.vue') },
        { path: '/contact', component: () => import('../views/Contact.vue') },
    ],
    scrollBehavior: () => ({ top: 0 }),
});

export default router;
