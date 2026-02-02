<script setup lang="ts">
// Mobile sign-in with dynamic QR code
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <VoltCard class="max-w-md w-full">
      <template #title>
        <h1 class="text-2xl font-bold text-white text-center">
          Sign In with QR Code
        </h1>
      </template>
      <template #content>
        <!-- QR Code placeholder -->
        <div class="bg-background-dark p-8 rounded-lg mb-6 flex items-center justify-center">
          <div class="w-64 h-64 bg-white rounded flex items-center justify-center">
            <Icon name="heroicons:qr-code" class="h-32 w-32 text-gray-400" />
          </div>
        </div>

        <p class="text-gray-400 text-center text-sm">
          Scan this QR code with your mobile device to sign in
        </p>
      </template>
    </VoltCard>
  </div>
</template>
