<template>
  <div class = "navBar bar menuText">
    <div class='navBar home'><router-link class='menuText' to="/">HOME</router-link></div>
    <div class='navBar about'><router-link class='menuText' to="/about">ABOUT</router-link></div>
    <div class='navBar music'><router-link class='menuText' to="/music">MUSIC</router-link></div>
    <div class='navBar downloads'><router-link class='menuText' to="/downloads">DOWNLOADS</router-link></div>
    <div class='navBar contact'><router-link class='menuText' to="/contact">CONTACT</router-link></div>
  </div>
</template>

<style>
.navBar {
  background-color: #02552b;
  padding: 4px;
  padding-left: 32px;
  padding-right: 32px;
}
.bar {
  grid-row: nav;
  display: inline-grid;
  grid-template-columns: 0.5fr auto auto auto auto auto 0.5fr;
  grid-template-rows: auto;
  justify-content: center;
}
.home {
  grid-row: 1;
  grid-column: 2;
}
.about {
  grid-row: 1;
  grid-column: 3;
}
.music {
  grid-row: 1;
  grid-column: 4;
}
.downloads {
  grid-row: 1;
  grid-column: 5;
}
.contact {
  grid-row: 1;
  grid-column: 6;
}
</style>
