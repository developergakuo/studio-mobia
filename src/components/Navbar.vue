<template>
  <nav class="bg-slate-900 text-white sticky top-0 z-50">
    <div class="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
      <RouterLink to="/" class="text-amber-400 font-bold text-xl tracking-wide">Studio Mobia</RouterLink>

      <!-- Desktop -->
      <div class="hidden md:flex items-center gap-8">
        <RouterLink v-for="link in links" :key="link.to" :to="link.to"
          class="text-sm font-medium hover:text-amber-400 transition-colors"
          :class="route.path === link.to ? 'text-amber-400' : 'text-slate-300'">
          {{ link.label }}
        </RouterLink>
        <RouterLink to="/services" class="btn-primary text-sm py-2 px-4">Book a Session</RouterLink>
      </div>

      <!-- Mobile hamburger -->
      <button class="md:hidden text-white text-2xl" @click="menuOpen = !menuOpen">☰</button>
    </div>

    <!-- Mobile menu -->
    <div v-if="menuOpen" class="md:hidden bg-slate-800 px-4 pb-4 flex flex-col gap-3">
      <RouterLink v-for="link in links" :key="link.to" :to="link.to"
        class="text-slate-200 py-2 font-medium border-b border-slate-700"
        @click="menuOpen = false">
        {{ link.label }}
      </RouterLink>
      <RouterLink to="/services" class="btn-primary text-center text-sm" @click="menuOpen = false">Book a Session</RouterLink>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const menuOpen = ref(false);
const links = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
];
</script>
