<template>
  <div>
    <router-view :read-storage="props.readStorage"></router-view>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { RouterView } from 'vue-router';  // Переключение страниц

const props = defineProps(['readStorage']);
</script>

<style lang="scss" scoped>

</style>