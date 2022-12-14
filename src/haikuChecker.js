// const storeState = (initialState) => {
//   let currentState = initialState;
//   return (stateChangeFunction = state => state) => {
//     const newState = stateChangeFunction(currentState);
//     currentState = {...newState};
//     return newState;
//   };
// };

// const stateChanger = storeState({});

// const changeState = (prop) => {
//   return (value) => {
//     return (state) => ({
//       ...state, 
//       [prop]: (state[prop] || 0) + value,
//     });
//   };
// };

export const counterFunction = () => {
  let count = 0;
  const counter = () => {
    count++;
    return count;
  };

  counter.reset = () => count = 0;

  return counter;
};

const incrementer = counterFunction();

// const poem = ["line one", "line two", "line three"]
export const haikuChecker = (poem) => {
  const counter = incrementer();
  if (counter === 4){
    // more than three lines
    if (poem[counter-1]) {
      incrementer.reset();
      return false;
    } else {
      incrementer.reset();
      return true;
    }
  } else if (counter === 1 || counter === 3) {
    const lineArr = splitLine(poem[counter-1]);
    if (lineChecker(lineArr) != 5) {
      incrementer.reset();
      return false;
    } else {
      return haikuChecker(poem);
    } 
  } else if (counter === 2) {
    const lineArr = splitLine(poem[counter-1]);
    if (lineChecker(lineArr) != 7) {
      incrementer.reset();
      return false;
    } else {
      return haikuChecker(poem);
    }
  }
};

export const splitLine = (line) => {
  return line.split(" ");
};

export const lineChecker = (lineArr) => {
  const countArr = lineArr.map((word) => getNumberOfSyllables(word));
  let sum = countArr.reduce((sum, number) => {
    return sum + number;
  }, 0);
  return sum || 0;
};

//.reduce((currentValue, element, index, array) => {}

export const getNumberOfSyllables = (word) => {
  const edgeCaseNum = 
    word.match(/(eo|io|ia)/gi) != null ? word.match(/(eo|io|ia)/gi).length : 0;
    // <condition> ? <value 1> : <value 2> 
    // ? <word.match(/(eo|io|ia)/gi).length> : <0>
  if (
    word[word.length - 1].toLowerCase() === "e" && 
    word[word.length - 2].toLowerCase() != "l"
  ){
    const syllables = edgeCaseNum + word.match(/[aeiouy]+/gi).length - 1; 
    return syllables > 0 ? syllables : 1;
    // "x+" matches the preceding item "x" 1 or more times ie candy and caaaaaandy both return 1 for "/a+/" ("caaaaaandy").match(/a+/).length = 1
    //("caanaaadaa").match(/a+/).length = 3
  } else if (// only works for verbs
    (word[word.length - 1].toLowerCase() === "d" &&
    word[word.length - 2].toLowerCase() === "e") &&
    (word[word.length - 3].toLowerCase() !== "d" &&
    word[word.length - 3].toLowerCase() !== "t")
  ) {
    const syllables = edgeCaseNum + word.match(/[aeiouy]+/gi).length - 1;
    return syllables > 0 ? syllables : 1;
  } else if (
    word[word.length - 1].toLowerCase() === "m" &&
    word[word.length - 2].toLowerCase() === "s" &&
    word[word.length - 3].toLowerCase() === "i"
  ) {
    const syllables = edgeCaseNum + word.match(/[aeiouy]+/gi).length + 1;
    return syllables > 0 ? syllables : 1;
  } else {
    const syllables = edgeCaseNum + word.match(/[aeiouy]+/gi).length;
    return syllables > 0 ? syllables : 1;
  } // ("trio").match(/[aeiouy]+/gi).length === 1
    // ("trio").match(/eo|io|ia/gi).length === 1
};

// maybe add in later
// export const symbolRejector = (word) => {
//   const symbols = ["$", "%", "&", "=", "@", "#", "-"];
//   const wordArray = word.split("");
//   const symbolChecker = symbols.filter((x) => wordArray.includes(x));
//   // const numArray = [7, 14, 32, 8];
//   // const filteredArray = numArray.filter(e => e > 10);
//   // [14, 32]

//   // const wordArray = ["#", "h", "i", "%"];
//   // const symbolChecker = wordArray.filter(x => wordArray.includes(x));
//   // ["%", "#"]

//   if (symbolChecker.length == 0) {
//     return true;
//   } else {
//     return false;
//   }
// };