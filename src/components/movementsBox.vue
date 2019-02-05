<template>
<div class="movementBoxWrapper">
  <div class="showMoreMvmts">
    <font-awesome icon="chevron-down" />
    <p class="mvmts">MOVEMENTS</p>
  </div>
  <div class="moreMvmts" v-bind:style="columnsCalc">
    <div v-for="mvmt in mvmts"
      class="mvmt"
      v-text="mvmt"
    ></div>
  </div>
</div>
</template>

<script>

import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faChevronDown);

export default {
  components: {
    'font-awesome': FontAwesomeIcon
  },
  props: ['mvmts'],
  computed: {
    columnsCalc () { return `gridTemplateColumns: repeat(${this.mvmts.length}, auto)` }
  }
}
</script>

<style>

p.mvmts {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 13px;
  display: inline-block;
}
.mvmt {
  font-size: 13px;
  font-family: 'Nunito Sans', sans-serif;
  grid-row: auto;
  padding-right: 20px;
  padding-left: 20px;
}
.moreMvmts {
  display: inline-grid;
  grid-template-rows: auto;
}
.movementBoxWrapper {
  position: relative;
  z-index: 4;
}
.movementBoxWrapper p {
  margin-top: 0px;
  line-height: 20px;
}
</style>
