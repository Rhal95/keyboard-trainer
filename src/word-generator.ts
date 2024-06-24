const WORD_COUNT = 10;
const WORD_TYPES = ["short", "medium", "long", "random", "function call", "assignment", "import", "arrow function", "calculation", "property"] as const;

export function generateWords(): string[] {
  return Array.from({length: WORD_COUNT}, randomWordType).map(generateWord);
}

export function randomWordType(){
  return pick(WORD_TYPES);
}

function short() {
  return pick(SHORT_WORDS);
}

function medium() {
  return pick(MEDIUM_WORDS);
}

function long() {
  return `${pick(VERBS)}${pick(ADJECTIVES)}${pick(NOUNS)}`;
}

function expr(){
  return pick([short(), property(), calc()])
}

function property(){
  return `${pick([short(), medium(), long()])}.${pick([short(), medium(), long()])}`;
}

function funcCall() {
  return `${pick([short(), medium(), long()])}(${pick(['', arrowFunc(), func()])})`;
}

function arrowFunc() {
  return `() => ${pick([expr(), `{${expr()}}`])}`;
}

function importStmt() {
  return `import {${pick([short(), medium(), long()])}} from "${pick([short(), medium(), long()])}";`;
}

function assignment() {
  return `${pick([short(), medium(), long()])} = ${pick([short(), medium(), long(),])}`;
}

function calc(){
  return `${pick([short(), medium(), property()])} ${pick(["+", "-", "*", "/"])} ${pick([short(), medium(), property()])}`;
}

function func(){
  return `function ${pick([medium(), long()])}(${pick([short(), medium(), long()])}){${expr()}}`;
}

export function generateWord(type: typeof WORD_TYPES[number]): string {
  switch (type) {
    case "calculation":
      return calc();
    case "property":
      return property();
    case "short":
      return short();
    case "medium":
      return medium();
    case "long":
      return long();
    case "function call":
      return funcCall()
    case "assignment":
      return assignment();
    case "import":
      return importStmt();
    case "arrow function":
      return arrowFunc()
    case "random":
      return randomWord();
    default:
      ((t: never): never => {
        throw new Error(`Unknown word type: ${t}`)
      })(type);
  }
}

export function randomWord() {
  const length = Math.floor(Math.random() * 5) + 3;
  return Array.from({length}, () => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join("");
}

const SHORT_WORDS = ["i", 'x', 'y', 'z', 'a', 'app', 'foo', 'bar', 'baz'];
const MEDIUM_WORDS = [
  "canvas",
  "element",
  "document",
  "window",
  "game",
  "keyboard",
  "controller"
];


const VERBS = ["generate", "calculate", "set", "replace", "add", "remove", "create", "destroy", "update", "render"];
const ADJECTIVES = ["Random", "Short", "Long", "Medium", "Fast", "Slow", "Quick", "Lazy", "Smart", "Dumb"];
const NOUNS = ["Word", "Number", "String", "Array", "Object", "Function", "Variable", "Constant", "Expression", "Statement"];

function pick<T>(array: readonly T[]): T{
  return array[Math.floor(Math.random() * array.length)];
}