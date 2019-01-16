<template>
  <div id="navBar">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
</template>

<·script>
export default {
  // aparently nothing needs to go here?
};
</script>

<style>
#navBar {
  padding: 30px;
}

#navBar a {
  font-weight: bold;
  color: #2c3e50;
}

#navBar a.router-link-exact-active {
  color: #42b983;
}
</style>
