<template>
  <footer class="row ">
    <div class="col">
      <svg class="bi" width="30" height="24">
        <use xlink:href="#bootstrap"></use>
      </svg>

      <span class="">© 2024 OTUS Vue.js Lesson 06</span>
    </div>

    <!-- <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
        <li class="ms-3"><a class="text-body-secondary" href="#"><svg class="bi" width="24" height="24">
              <use xlink:href="#twitter"></use>
            </svg></a></li>
        <li class="ms-3"><a class="text-body-secondary" href="#"><svg class="bi" width="24" height="24">
              <use xlink:href="#instagram"></use>
            </svg></a></li>
        <li class="ms-3"><a class="text-body-secondary" href="#"><svg class="bi" width="24" height="24">
              <use xlink:href="#facebook"></use>
            </svg></a></li>
      </ul> -->
  </footer>
</template>

<script setup>

</script>

<style lang="scss" scoped>
footer {
  justify-content: center;
    background-color: #eee;
      padding: 10px;
      border-top: 1px solid #333;
      margin-top: 20px;
      border-radius: 0px 0px 5px 5px;
}

footer span {
  font-family: sans-serif;
  font-size: large;
}
</style>
