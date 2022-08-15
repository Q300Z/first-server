<template>
  <div id="app">
    <Multicards :cards="this.cards" />
  </div>
</template>

<script>
import Multicards from "./components/cards.vue";
//
export default {
  name: "App",
  components: {
    Multicards,
  },
  data: function () {
    return {
      cards: [],
    };
  },
  created() {
    fetch("http://localhost:3000/api/stuff")
      .then((response) => response.json())
      .then((data) => (this.cards = data));
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
