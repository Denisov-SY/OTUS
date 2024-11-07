<template>
  <div>
    <h2 class="header">Component 1</h2>
    <p>{{ msg }}</p>
  </div>

</template>

<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<style lang="scss" scoped>
.header {
  color: blue;
}
</style>