<template>
  <dir>
    <div class="cards" v-for="card in cards" :key="card.id">
      <v-card elevation="5">
        <v-card-title>{{ card.title }}</v-card-title>
        <v-card-text>{{ card.description }}</v-card-text>
        {{ card.price }}€
        <v-card-subtitle>{{ card.id }} - {{ card.userId }}</v-card-subtitle>
      </v-card>
    </div>
  </dir>
</template>

<script>
export default {
  name: "Multi-cards",
  props: ["cards"],
};
</script>
<style>
.cards {
  max-height: 150px;
  max-width: 300px;
  text-align: center;
  margin: 10px;
  display: inline-block;
}
</style>