import {beforeEach, describe, it, expect} from 'vitest';
import {createPinia, setActivePinia} from "pinia";
import {useGame} from "./store.ts";

describe('store', () => {
  beforeEach(()=>{
    setActivePinia(createPinia())
  })

  it('should initialize the store on start', () => {
    const game = useGame();
    const now = Date.now();
    game.startGame();
    expect(game.startTime).to.be.approximately(now, 100);
    expect(game.endTime).to.be.null;
    expect(game.words).not.to.be.empty;
    expect(game.completedWords).to.be.empty;
    expect(game.uncompletedWords).to.contain.all.members(game.words);
    expect(game.activeWord).to.be.null;
    expect(game.score).to.be.equal(0);
    expect(game.running).to.be.true;
  })

  it('should set the first word active when typing its first letter', () => {
    const game = useGame();
    game.startGame();
    const firstWord = game.words[0];
    game.setActiveWordStartingWith(firstWord[0]);
    expect(game.activeWord).to.be.equal(firstWord);
  });

  it('should not change the active word after it was set', () => {
    const game = useGame();
    game.startGame();
    const firstWord = game.words[0];
    const secondWord = game.words[1];
    game.setActiveWordStartingWith(firstWord[0]);
    expect(game.activeWord).to.be.equal(firstWord);
    game.setActiveWordStartingWith(secondWord[0]);
    expect(game.activeWord).to.be.equal(firstWord);
  });

  it('should not mark a word as completed if it is not the active word', () => {
    const game = useGame();
    game.startGame();
    const firstWord = game.words[0];
    const secondWord = game.words[1];
    game.checkWord(firstWord[0]);
    expect(game.activeWord).to.be.equal(firstWord);
    game.checkWord(secondWord);
    expect(game.activeWord).to.be.equal(firstWord);
    expect(game.completedWords).to.be.empty;
    expect(game.score).to.be.equal(0);
  });

  it('should not mark a word as completed if it is not entered exactly', () => {
    const game = useGame();
    game.startGame();
    const firstWord = game.words[0];
    game.setActiveWordStartingWith(firstWord[0]);
    game.checkWord(firstWord + 'o');
    expect(game.activeWord).to.be.equal(firstWord);
    expect(game.completedWords).to.be.empty;
    expect(game.score).to.be.equal(0);
  });

  it('should complete a word if it is entered exactly', () => {
    const game = useGame();
    game.startGame();
    const firstWord = game.words[0];
    game.setActiveWordStartingWith(firstWord[0]);
    game.checkWord(firstWord);
    expect(game.activeWord).to.be.null;
    expect(game.completedWords).to.contain(firstWord);
    expect(game.score).to.be.greaterThan(0);
  });
  it('should not select a word as active on empty input', () => {
    const game = useGame();
    game.startGame();
    game.setActiveWordStartingWith('');
    expect(game.activeWord).to.be.null;
  });
});