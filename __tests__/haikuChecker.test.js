import {
  getNumberOfSyllables,
  lineChecker,
  haikuChecker,
  counterFunction
} from "../src/haikuChecker.js";

describe("counterFunction()", () => {

  let incrementer;
  let counter;

  beforeEach(() => {
    incrementer = counterFunction();
    counter = incrementer();
  });

  test("should return 1 when it's called", () => {
    expect(counter).toEqual(1);
  });

  test("Should reset counter to 0 when reset is called", () => {
    expect(incrementer.reset()).toEqual(0);
  });

});

describe("getNumberOfSyllables()", () => {
  
  test("should return 1 syllable for 1 vowel", () => {
    expect(getNumberOfSyllables("a")).toEqual(1);
  });

  test("should return 1 syllable for double vowels", () => {
    expect(getNumberOfSyllables("tree")).toEqual(1);
  });

  test("should return 2 syllables for dipthongs ia, io, and  eo", () => {
    expect(getNumberOfSyllables("trio")).toEqual(2);
    expect(getNumberOfSyllables("alias")).toEqual(3);
    expect(getNumberOfSyllables("leo")).toEqual(2);
  });
  
  test("should remove 1 syllable for words ending in 'e' but not 'le'", () => {
    expect(getNumberOfSyllables("time")).toEqual(1);
    expect(getNumberOfSyllables("tickle")).toEqual(2);
  });

  test("should remove a syllable for words ending in 'ed'", () => {
    expect(getNumberOfSyllables("slipped")).toEqual(1);
  });

  test("should return correct syllables for -ism", () => {
    expect(getNumberOfSyllables("anarchocommunism")).toEqual(7);
  });

});  

describe("lineChecker()", () => {

  test("should return 0 syllables for lines with no words", () => {
    const array = [];
    expect(lineChecker(array)).toEqual(0);
  });

  test("should return 1 syllable for lines with a 1 syllable word", () => {
    const yesArray = ["yes"];
    expect(lineChecker(yesArray)).toEqual(1);
  });

  test("should return correct syllables for lines with multiple words", () => {
    const noArray = ["no", "pizza", "pie"];
    expect(lineChecker(noArray)).toEqual(4);
  });

});

describe("haikuChecker", () => {

  test("should return false when line 1 does not contain 5 syllables", () => {
    const poem = ["this is not five syllables", "here are seven syllables", "now five syllables"];
    expect(haikuChecker(poem)).toEqual(false);
  });

  test("should return false when line 2 does not contain 7 syllables", () => {
    const poem = ["first five syllables", "but this is only six", "now five syllables"];
    expect(haikuChecker(poem)).toEqual(false);
  });

  test("should return false when line 3 does not contain 5 syllables", () => {
    const poem = ["first five syllables", "here are seven syllables", "now not five syllables"];
    expect(haikuChecker(poem)).toEqual(false);
  });

  test("should return true when it's a haiku", () => {
    const poem = ["first five syllables", "here are seven syllables", "now five syllables"];
    expect(haikuChecker(poem)).toEqual(true);
  });

  test("should return false for a 4 line poem", () => {
    const poem = ["first five syllables", "here are seven syllables", "now five syllables", "now a fourth line!"];
    expect(haikuChecker(poem)).toEqual(false);
  });

});