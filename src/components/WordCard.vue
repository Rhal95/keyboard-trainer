<script setup lang="ts">
import {useGame} from "../store.ts";

const {word, currentInput} = defineProps<{ word: string, currentInput: string }>();
const game = useGame();

</script>

<template>
  <div v-if="game.activeWord === word">
    <span v-for="(c, i) of word" :class="c != null ? currentInput.charAt(i) === '' ? '' : c === currentInput.charAt(i) ? 'correct' : 'wrong' : 'additional'">{{ c }}</span>
    <span v-for="c of currentInput.slice(word.length)" class="additional">{{c}}</span>
  </div>
  <span v-else>{{ word }}</span>
</template>

<style scoped>
.correct{
  color: green;
}
.wrong{
  color: red;
}
.additional{
  color: orange;
  text-decoration: underline wavy;
}
</style>