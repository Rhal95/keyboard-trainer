import {describe, expect, it} from "vitest";
import {randomWord, generateWords} from "./word-generator.ts";

describe("word-generator", () => {
  it("should generate words", () => {
    const strings = generateWords();
    expect(strings).to.have.length(10);
  });
  it('should generate a random word', () => {
    for (let i = 0; i < 100; i++) {
      const word = randomWord();
      expect(word).to.be.a('string');
      expect(word).to.have.length.greaterThan(2);
      expect(word).to.have.length.lessThan(8);
    }
  });
});