<script setup>

</script>

<template>
<div class="categories-item">
  <div class="text">231321</div>
  <div class="num">(111)</div>
</div>
</template>

<style scoped>
.categories-item {
  position: relative;
  margin: 6px 0;
  padding: 0.12em 0.4em 0.12em 1.4em;
  height: 30px;
  display: flex;
  align-items: center;
  color: var(--font-color);
}

.categories-item .text {
  cursor: pointer;
  transition: .3s;
}

.categories-item .num {
  margin-left: 20px;
  color: #4c4948;
  font-size: 14px;
}

.categories-item .text:hover {
  color: var(--active-font-color);
}

.categories-item::before {
  position: absolute;
  top: 0.67em;
  left: 0;
  width: 0.43em;
  height: 0.43em;
  border: 0.215em solid #49b1f5;
  border-radius: 0.43em;
  background: 0 0;
  content: '';
  cursor: pointer;
  -webkit-transition: all .3s ease-out;
  -moz-transition: all .3s ease-out;
  -o-transition: all .3s ease-out;
  -ms-transition: all .3s ease-out;
  transition: all .3s ease-out;
}
</style>