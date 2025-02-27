<template>
  <div v-if="canInstall" class="install-prompt" role="alert">
    <div class="install-content">
      <p>Installez BookVerse sur votre appareil pour y accéder plus facilement !</p>
      <button @click="install" class="install-button">
        Installer l'application
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const deferredPrompt = ref<any>(null)
const canInstall = ref(false)

const handleBeforeInstallPrompt = (e: Event) => {
  e.preventDefault()
  deferredPrompt.value = e
  canInstall.value = true
}

const install = async () => {
  if (!deferredPrompt.value) return

  deferredPrompt.value.prompt()
  const { outcome } = await deferredPrompt.value.userChoice

  if (outcome === 'accepted') {
    console.log('Application installée avec succès')
    canInstall.value = false
  }
  
  deferredPrompt.value = null
}

onMounted(() => {
  window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
})

onUnmounted(() => {
  window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
})
</script>

<style scoped>
.install-prompt {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  padding: 1rem 1.5rem;
  border-radius: 25px;
  box-shadow: 0 4px 20px rgba(74, 103, 65, 0.15);
  z-index: 1000;
  animation: slideUp 0.3s ease;
}

.install-content {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.install-button {
  padding: 0.8rem 1.5rem;
  background: var(--header-gradient);
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.install-button:hover,
.install-button:focus {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(74, 103, 65, 0.2);
  outline: none;
}

@keyframes slideUp {
  from {
    transform: translate(-50%, 100%);
    opacity: 0;
  }
  to {
    transform: translate(-50%, 0);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .install-prompt {
    bottom: 10px;
    left: 10px;
    right: 10px;
    transform: none;
  }

  .install-content {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .install-button {
    width: 100%;
  }
}
</style> 