<script setup>
import Comp1 from './components/Comp1.vue'
import Comp2 from './components/Comp2.vue'
</script>

<template>
  <div>
    test:
  </div>
  <div class="content">
    <Comp1 msg="COMPONENT 1 content" />
    <Comp2 msg="COMPONENT 2 content" />
  </div>
</template>





<style lang="scss" scoped>
.content {
  display: flex;
  justify-content: center;
  gap: 5rem;
}
</style>
