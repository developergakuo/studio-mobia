<template>
  <div class="section bg-slate-50 min-h-screen">
    <div class="max-w-2xl mx-auto">
      <h1 class="section-title">Contact Us</h1>
      <p class="section-sub">Have questions? We'd love to hear from you.</p>

      <div class="grid md:grid-cols-2 gap-8 mb-10">
        <div v-for="c in contacts" :key="c.label" class="bg-white rounded-xl border border-slate-200 p-5 flex items-start gap-4">
          <span class="text-3xl">{{ c.icon }}</span>
          <div>
            <p class="font-semibold text-slate-700">{{ c.label }}</p>
            <p class="text-slate-500 text-sm mt-1">{{ c.value }}</p>
          </div>
        </div>
      </div>

      <form class="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col gap-4">
        <div>
          <label class="label">Name</label>
          <input v-model="form.name" class="input" placeholder="Your name" />
        </div>
        <div>
          <label class="label">Email</label>
          <input v-model="form.email" type="email" class="input" placeholder="you@example.com" />
        </div>
        <div>
          <label class="label">Message</label>
          <textarea v-model="form.message" class="input" rows="5" placeholder="Tell us what you need..." />
        </div>
        <button type="submit" class="btn-primary">Send Message</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const form = ref({ name: '', email: '', message: '' });
const contacts = [
  { icon: '📧', label: 'Email', value: 'hello@studiomobia.com' },
  { icon: '📞', label: 'Phone', value: '+254 700 000 000' },
  { icon: '📍', label: 'Location', value: 'Nairobi, Kenya' },
  { icon: '🕐', label: 'Hours', value: 'Mon–Sat 8am–7pm' },
];
</script>
