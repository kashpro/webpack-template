<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>

  <!-- в биндах парсинг URL ассетов не работает -->
  <!-- https://stackoverflow.com/questions/47313165/how-to-reference-static-assets-within-vue-javascript -->
  <!-- <div class="placeholder"><img :src="placeholderUrl" alt="Placeholder"></div> -->
  <!-- computed: {
    placeholderUrl() {
      return require(`../assets/images/${this.desk.img}`);
    },
  }, -->

</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  user-select: none;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
