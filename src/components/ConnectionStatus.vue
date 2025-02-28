<template>
  <div :class="['connection-status', { 'is-offline': !isOnline }]">
    <span class="status-icon">
      {{ isOnline ? '🟢' : '🔴' }}
    </span>
    <span class="status-text">
      {{ isOnline ? 'En ligne' : 'Hors ligne' }}
    </span>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isOnline = ref(navigator.onLine)

function updateOnlineStatus() {
  isOnline.value = navigator.onLine
}

onMounted(() => {
  window.addEventListener('online', updateOnlineStatus)
  window.addEventListener('offline', updateOnlineStatus)
})

onUnmounted(() => {
  window.removeEventListener('online', updateOnlineStatus)
  window.removeEventListener('offline', updateOnlineStatus)
})
</script>

<style scoped>
.connection-status {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: var(--card-background);
  padding: 8px 16px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: var(--card-shadow);
  transition: all 0.3s ease;
  z-index: 1000;
}

.connection-status.is-offline {
  background: #fee2e2;
  animation: pulse 2s infinite;
}

.status-icon {
  font-size: 12px;
}

.status-text {
  color: var(--text-color);
  font-size: 0.9rem;
  font-weight: 500;
}

.is-offline .status-text {
  color: #dc2626;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

@media (max-width: 768px) {
  .connection-status {
    bottom: 16px;
    right: 16px;
    padding: 6px 12px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .connection-status {
    transition: none;
  }

  .connection-status.is-offline {
    animation: none;
  }
}
</style>
