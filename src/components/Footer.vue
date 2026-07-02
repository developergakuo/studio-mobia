<template>
  <footer class="bg-slate-900 text-slate-400 text-sm">
    <div class="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <p class="text-amber-400 font-bold text-lg mb-2">Studio Mobia</p>
        <p>Professional creative studio offering photography, video, recording and more.</p>
      </div>
      <div>
        <p class="text-white font-semibold mb-3">Services</p>
        <ul class="flex flex-col gap-1">
          <li v-for="s in services" :key="s">{{ s }}</li>
        </ul>
      </div>
      <div>
        <p class="text-white font-semibold mb-3">Get In Touch</p>
        <ul class="flex flex-col gap-1">
          <li>📧 hello@studiomobia.com</li>
          <li>📞 +254 700 000 000</li>
          <li>📍 Nairobi, Kenya</li>
        </ul>
      </div>
    </div>
    <div class="border-t border-slate-800 text-center py-4 text-xs">
      © {{ new Date().getFullYear() }} Studio Mobia. All rights reserved.
    </div>
  </footer>
</template>

<script setup>
const services = ['Photography','Video Production','Recording Studio','Content Creation','Events Coverage','Drone Services'];
</script>
