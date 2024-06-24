import {defineStore} from "pinia";
import {generateWords} from "./word-generator.ts";

export const useGame = defineStore("trainer", {
  state: () => ({
    running: false,
    words: [] as string[],
    completedWords: [] as string[],
    uncompletedWords: [] as string[],
    activeWord: null as null |string,
    score: 0,
    startTime: 0,
    sinceLastWord: 0,
    endTime: null as null | number,
  }),
  actions: {
    startGame(){
      this.words = generateWords();
      this.completedWords = [];
      this.uncompletedWords = [...this.words];
      this.activeWord = null;
      this.startTime = Date.now();
      this.sinceLastWord = this.startTime;
      this.endTime = null;
      this.score = 0;
      this.running = true;
    },
    setActiveWordStartingWith(start: string){
      if (this.running && this.activeWord == null && start.trim() !== ""){
        const firstOneFound = this.uncompletedWords.find(word => word.startsWith(start));
        this.activeWord = firstOneFound ? firstOneFound : null;
      }
    },
    checkWord(word: string){
      this.setActiveWordStartingWith(word);
      if(this.activeWord === word){
        const now = Date.now();
        const timeForWord = (now - this.sinceLastWord);
        const timePerCharacter = timeForWord / word.length;
        const scoreForWord = 100 + ( 100.0 * 1000.0 / timePerCharacter);
        this.score += Math.floor(scoreForWord);
        this.completedWords = [...this.completedWords, word];
        this.uncompletedWords = this.uncompletedWords.filter(w => w !== word);
        this.activeWord = null;
        this.sinceLastWord = now;
        if (this.uncompletedWords.length === 0){
          this.running = false;
          this.endTime = now;
        }
      }
    },
  }
});

