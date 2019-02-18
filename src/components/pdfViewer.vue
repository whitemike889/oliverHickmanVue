<template>
    <div class="coverImage"
      v-on:mouseover="coverHover=true"
      v-on:mouseleave="coverHover=false"
      >
      <img v-bind:src="`${publicPath}CO3_cover.jpg`"/>
      <font-awesome
        icon="eye"
        class="fa-eye"
        v-bind:class="{faEyeHover: coverHover}"
        v-on:mouseover="coverHover=true"
        v-on:mouseleave="coverHover=false"
      />
    </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faEye);

export default {
  name: 'pdf-viewer',
  components: {
    'font-awesome': FontAwesomeIcon
  },
  data: function() {
    return {
      publicPath: process.env.BASE_URL,
      coverHover: false
    }
  }
}
</script>

<style>
.coverImage{
  grid-column: cover;
  position: relative;
}
.coverImage img{
  width: 100%;
  height: 100%;
  object-fit: cover;
  overflow: hidden;
  -webkit-filter: brightness(100%);
  transition: all 0.3s ease;
}
.coverImage img:hover {
  -webkit-filter: brightness(85%);
  cursor: pointer;
}
.fa-eye{
  position: absolute;
  right: 15px;
  top: 14px;
  z-index: 1;
  transition: all 0.3s ease;
  padding: 2px;
  border-radius: 2px;
}
.faEyeHover {
  background-color: #02552b;
  color: #fff;
  cursor: pointer;
}
</style>
