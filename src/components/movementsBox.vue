<template>
<div class="movementBoxWrapper">
  <span><font-awesome icon="chevron-down" /> {{ mvnts }}</span>
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
  props: [mvnts]
}
</script>

<style>
.movementBoxWrapper {
  position: relative;
  z-index: 4;
}
.movementBoxWrapper p {
  margin-top: 0px;
  line-height: 20px;
}
</style>
