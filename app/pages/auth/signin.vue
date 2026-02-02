<script setup lang="ts">
// Mobile sign-in with dynamic QR code
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <div class="bg-card-bg p-8 rounded-lg max-w-md w-full">
      <h1 class="text-2xl font-bold text-white mb-6 text-center">
        Sign In with QR Code
      </h1>

      <!-- QR Code placeholder -->
      <div class="bg-background-dark p-8 rounded-lg mb-6 flex items-center justify-center">
        <div class="w-64 h-64 bg-white rounded flex items-center justify-center">
          <Icon name="heroicons:qr-code" class="h-32 w-32 text-gray-400" />
        </div>
      </div>

      <p class="text-gray-400 text-center text-sm">
        Scan this QR code with your mobile device to sign in
      </p>
    </div>
  </div>
</template>
