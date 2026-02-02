<script setup lang="ts">
// Landing page for QR Art Auth
</script>

<template>
  <div class="flex flex-col items-center justify-center py-12">
    <!-- Hero Section -->
    <div class="text-center max-w-3xl">
      <Icon name="heroicons:qr-code" class="mx-auto h-20 w-20 text-primary mb-6" />

      <h1 class="text-5xl font-bold text-white mb-6">
        Welcome to QR Art Auth
      </h1>

      <p class="text-xl text-gray-300 mb-8">
        SaaS for QR education, mobile device-flow auth, and AI-generated "blended" QR codes
      </p>

      <div class="flex justify-center space-x-4">
        <VoltButton
          label="Get Started"
          severity="primary"
          size="large"
          @click="$router.push('/dashboard')"
        />

        <VoltSecondaryButton
          label="Sign In"
          size="large"
          @click="$router.push('/auth/signin')"
        />
      </div>
    </div>

    <!-- Features Section -->
    <div class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
      <VoltCard>
        <template #content>
          <Icon name="heroicons:academic-cap" class="h-12 w-12 text-primary mb-4" />
          <h3 class="text-xl font-semibold text-white mb-2">QR Education</h3>
          <p class="text-gray-400">
            Learn about QR codes with error correction level H (30%)
          </p>
        </template>
      </VoltCard>

      <VoltCard>
        <template #content>
          <Icon name="heroicons:device-phone-mobile" class="h-12 w-12 text-primary mb-4" />
          <h3 class="text-xl font-semibold text-white mb-2">Mobile Auth</h3>
          <p class="text-gray-400">
            Secure device-flow authentication using dynamic QR codes
          </p>
        </template>
      </VoltCard>

      <VoltCard>
        <template #content>
          <Icon name="heroicons:sparkles" class="h-12 w-12 text-primary mb-4" />
          <h3 class="text-xl font-semibold text-white mb-2">AI-Generated Art</h3>
          <p class="text-gray-400">
            Create beautiful blended QR codes with ControlNet AI
          </p>
        </template>
      </VoltCard>
    </div>
  </div>
</template>
