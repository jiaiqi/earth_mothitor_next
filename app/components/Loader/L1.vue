<script lang="ts" setup>

</script>

<template>
  <div class="loader-container">
    <div class="loader" />
  </div>
</template>

<style scoped>
.loader-container {
  height: 100px;
  width: 100px;
  display: inline-block;
}
.loader {
  color: #333;
  font-size: 10px;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  position: relative;
  text-indent: -9999em;
  animation: mulShdSpin 1.3s infinite linear;
  transform: translateZ(0) translateX(-50%) translateY(-50%);
  left: 50%;
  top: 50%;
}

@keyframes mulShdSpin {
  0%,
  100% {
    box-shadow:
      0 -3em 0 0.2em,
      2em -2em 0 0em,
      3em 0 0 -1em,
      2em 2em 0 -1em,
      0 3em 0 -1em,
      -2em 2em 0 -1em,
      -3em 0 0 -1em,
      -2em -2em 0 0;
  }
  12.5% {
    box-shadow:
      0 -3em 0 0,
      2em -2em 0 0.2em,
      3em 0 0 0,
      2em 2em 0 -1em,
      0 3em 0 -1em,
      -2em 2em 0 -1em,
      -3em 0 0 -1em,
      -2em -2em 0 -1em;
  }
  25% {
    box-shadow:
      0 -3em 0 -0.5em,
      2em -2em 0 0,
      3em 0 0 0.2em,
      2em 2em 0 0,
      0 3em 0 -1em,
      -2em 2em 0 -1em,
      -3em 0 0 -1em,
      -2em -2em 0 -1em;
  }
  37.5% {
    box-shadow:
      0 -3em 0 -1em,
      2em -2em 0 -1em,
      3em 0em 0 0,
      2em 2em 0 0.2em,
      0 3em 0 0em,
      -2em 2em 0 -1em,
      -3em 0em 0 -1em,
      -2em -2em 0 -1em;
  }
  50% {
    box-shadow:
      0 -3em 0 -1em,
      2em -2em 0 -1em,
      3em 0 0 -1em,
      2em 2em 0 0em,
      0 3em 0 0.2em,
      -2em 2em 0 0,
      -3em 0em 0 -1em,
      -2em -2em 0 -1em;
  }
  62.5% {
    box-shadow:
      0 -3em 0 -1em,
      2em -2em 0 -1em,
      3em 0 0 -1em,
      2em 2em 0 -1em,
      0 3em 0 0,
      -2em 2em 0 0.2em,
      -3em 0 0 0,
      -2em -2em 0 -1em;
  }
  75% {
    box-shadow:
      0em -3em 0 -1em,
      2em -2em 0 -1em,
      3em 0em 0 -1em,
      2em 2em 0 -1em,
      0 3em 0 -1em,
      -2em 2em 0 0,
      -3em 0em 0 0.2em,
      -2em -2em 0 0;
  }
  87.5% {
    box-shadow:
      0em -3em 0 0,
      2em -2em 0 -1em,
      3em 0 0 -1em,
      2em 2em 0 -1em,
      0 3em 0 -1em,
      -2em 2em 0 0,
      -3em 0em 0 0,
      -2em -2em 0 0.2em;
  }
}
</style>
