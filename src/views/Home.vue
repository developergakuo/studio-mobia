<template>
  <div>
    <!-- Hero -->
    <section class="relative bg-slate-900 text-white min-h-[90vh] flex items-center">
      <div class="max-w-6xl mx-auto px-4 py-24">
        <p class="text-amber-400 font-semibold uppercase tracking-widest mb-4">Professional Creative Studio</p>
        <h1 class="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Capture.<br/>Create.<br/><span class="text-amber-400">Inspire.</span>
        </h1>
        <p class="text-slate-300 text-lg max-w-xl mb-10">
          Studio Mobia is Nairobi's premier creative studio. From photography to drone footage,
          recording sessions to full video productions — we bring your vision to life.
        </p>
        <div class="flex flex-wrap gap-4">
          <RouterLink to="/services" class="btn-primary">View Services</RouterLink>
          <RouterLink to="/gallery" class="btn-outline">See Our Work</RouterLink>
        </div>
      </div>
    </section>

    <!-- Services preview -->
    <section class="section bg-white">
      <div class="max-w-6xl mx-auto">
        <p class="text-amber-500 font-semibold uppercase tracking-widest mb-2">What We Do</p>
        <h2 class="section-title">Our Services</h2>
        <p class="section-sub">Everything your project needs, under one roof.</p>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div v-for="s in serviceHighlights" :key="s.label"
            class="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50 hover:bg-amber-50 transition-colors cursor-pointer"
            @click="$router.push('/services')">
            <span class="text-4xl mb-3">{{ s.icon }}</span>
            <p class="font-semibold text-slate-800">{{ s.label }}</p>
          </div>
        </div>
        <div class="mt-10 text-center">
          <RouterLink to="/services" class="btn-primary">Book a Session →</RouterLink>
        </div>
      </div>
    </section>

    <!-- Why us -->
    <section class="section bg-slate-900 text-white">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl font-bold mb-10 text-center">Why Studio Mobia?</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="r in reasons" :key="r.title" class="text-center">
            <p class="text-amber-400 text-4xl mb-4">{{ r.icon }}</p>
            <p class="font-bold text-lg mb-2">{{ r.title }}</p>
            <p class="text-slate-400 text-sm">{{ r.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section bg-amber-500 text-white text-center">
      <div class="max-w-2xl mx-auto">
        <h2 class="text-3xl font-bold mb-4">Ready to create something amazing?</h2>
        <p class="mb-8 text-amber-100">Book your session today and secure your slot with a small deposit.</p>
        <RouterLink to="/services" class="bg-white text-amber-600 font-bold px-8 py-3 rounded-lg hover:bg-amber-50 transition-colors">
          Get Started
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup>
const serviceHighlights = [
  { icon: '📸', label: 'Photography' },
  { icon: '🎬', label: 'Video Production' },
  { icon: '🎙️', label: 'Recording Studio' },
  { icon: '📱', label: 'Content Creation' },
  { icon: '🎉', label: 'Events Coverage' },
  { icon: '🏠', label: 'Real Estate' },
  { icon: '📦', label: 'Product Shoots' },
  { icon: '🚁', label: 'Drone Services' },
];
const reasons = [
  { icon: '🏆', title: 'Professional Quality', desc: 'State-of-the-art equipment and experienced creatives deliver results that exceed expectations.' },
  { icon: '⚡', title: 'Fast Turnaround', desc: 'We respect your deadlines. Quick delivery without compromising on quality.' },
  { icon: '💰', title: 'Transparent Pricing', desc: 'No hidden fees. See exactly what you get and secure your booking with a small deposit.' },
];
</script>
