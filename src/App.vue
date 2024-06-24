<script setup lang="ts">
import {useGame} from "./store.ts";
import {ref, watchEffect} from "vue";
import WordCard from "./components/WordCard.vue";

const game = useGame();
const inputContent = ref('');
const inputRef = ref<HTMLInputElement | null>(null);

watchEffect(() => {
  if (game.activeWord == null) {
    inputContent.value = '';
  }
});

function classOfWord(word: string) {
  if (game.completedWords.includes(word)) {
    return 'completed';
  }
  if (game.activeWord === word) {
    return 'active';
  }
  return '';
}

const now = ref(Date.now());

setInterval(() => {
  now.value = Date.now()
}, 100);

</script>

<template>
  <main>
    <button v-if="!game.running" @click="()=>{game.startGame(); inputRef?.focus()}">Start Game</button>
    <output>Score: {{ game.score }}</output>
    <time v-if="game.running">{{ (now - game.startTime) / 1000 }}s</time>
    <time v-else-if="game.endTime">{{ (game.endTime - game.startTime) / 1000 }}s</time>
    <ul>
      <li v-for="word in game.words.filter(w=>!game.completedWords.includes(w))" :class="classOfWord(word)">
        <WordCard :word="word" :currentInput="inputContent"/>
      </li>
    </ul>
    <input ref="inputRef" type="text" :value="inputContent"
           @input="e=>{inputContent = (e.target as HTMLInputElement).value.trimStart(); game.checkWord(inputContent);}">
    <ul>
      <li v-for="word in game.words.filter(w=>game.completedWords.includes(w))" :class="classOfWord(word)">
        <WordCard :word="word" :currentInput="inputContent"/>
      </li>
    </ul>
  </main>
</template>

<style scoped>
main {
  display: grid;
  grid: auto-flow / 1fr;
  justify-items: center;
  width: fit-content;
  margin: 0 auto;
}

main > ul {
  all: unset;
  display: flex;
  flex-direction: column-reverse;
  grid: repeat(2, 1fr) / repeat(5, 1fr);
  align-content: center;
  justify-items: center;
  gap: 0.5rem;
}

main > ul:last-child {
  flex-direction: column;
}

main > ul > li {
  all: unset;
  border: 1px solid gray;
  border-radius: 8px;
  margin: 0.5rem;
  padding: 0.25rem 0.5rem;
  font-family: monospace;
  font-size: 1.5rem;
}

main > ul > li.active {
  background-color: lightskyblue;
}

main > ul > li.completed {
  background-color: palegreen;
}

input {
  font-size: large;
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
  width: calc(100% - 1rem);
  box-sizing: border-box;
}
</style>
