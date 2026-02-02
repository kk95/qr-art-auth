<script setup lang="ts">
// Default layout for QR Art Auth
</script>

<template>
  <div class="min-h-screen bg-background-dark">
    <!-- Header -->
    <header class="sticky top-0 z-40 border-b border-border bg-header-bg">
      <div class="container mx-auto flex items-center justify-between px-4 py-4">
        <div class="flex items-center space-x-2">
          <Icon name="heroicons:qr-code" class="h-8 w-8 text-primary" />
          <h1 class="text-xl font-bold text-white">QR Art Auth</h1>
        </div>

        <nav class="flex items-center space-x-4">
          <NuxtLink to="/" class="text-gray-300 hover:text-white">
            Home
          </NuxtLink>
          <NuxtLink to="/dashboard" class="text-gray-300 hover:text-white">
            Dashboard
          </NuxtLink>
          <NuxtLink to="/auth/signin" class="text-gray-300 hover:text-white">
            Sign In
          </NuxtLink>
        </nav>
      </div>
    </header>

    <!-- Main Content -->
    <main role="main" class="container mx-auto px-4 py-8">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="border-t border-border bg-header-bg py-6 mt-12">
      <div class="container mx-auto px-4 text-center text-gray-400">
        <p>&copy; 2026 QR Art Auth. AI-powered QR code generation.</p>
      </div>
    </footer>
  </div>
</template>
