"use strict";

const assert = require("assert");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// An object that represents the three stacks of Towers of Hanoi;
// * each key is an array of Numbers:
// * A is the far-left,
// * B is the middle,
// * C is the far-right stack
// * Each number represents the largest to smallest tokens:
// * 4 is the largest,
// * 1 is the smallest

let stacks = {
  //  0  1  2  3
  a: [4, 3, 2, 1],
  b: [],
  c: [],
};

// Start here. What is this function doing?
const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
};

// Next, what do you think this function should do?
const movePiece = (startStack, endStack) => {
  // Your code here
  //remove from old stack to new stack
  //pop() to remove the number from the array and push() pushes the removed number into a new array
  let piece = stacks[startStack].pop();
  stacks[endStack].push(piece);
};

// Before you move, should you check if the move it actually allowed? Should 3 be able to be stacked on 2
const isLegal = (startStack, endStack) => {
  // Your code here
  //is something in starting stack
  //if stack is empty, move number
  //or if number is smaller than number already there, move number
  //if stack is not empty or number is not smaller than do not move=false
  //if there is a piece in ending stack
  //is my piece smaller than it?

  if (stacks[endStack].length == 0){
    return true
  } else if (stacks[startStack].slice(-1) < stacks[endStack].slice(-1)){
  return true
  } else{
    return false
  }
};

// What is a win in Towers of Hanoi? When should this function run?
const checkForWin = () => {
  //does stack b have all 4 (in the proper order)
  if (stacks.b.length == 4) {
    console.log("You won!")
    return true;
  }else {
    return false;
  }
};

// When is this function called? What should it do with its argument?
const towersOfHanoi = (startStack, endStack) => {
  // Your code here
  //check if the move is legal using isLegal()
  //print illegal if not legal
  //else call movePiece() 
  // check for win with checkForWin()
  //return either congrats or keep playing
  if (isLegal(startStack, endStack)){

    movePiece(startStack,endStack)

    checkForWin()
  } else {    
  console.log("Illigal move. Try again")
}
  
};

const getPrompt = () => {
  printStacks();
  rl.question("start stack: ", (startStack) => {
    rl.question("end stack: ", (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
};

// Tests

if (typeof describe === "function") {
  describe("#towersOfHanoi()", () => {
    it("should be able to move a block", () => {
      towersOfHanoi("a", "b");
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe("#isLegal()", () => {
    it("should not allow an illegal move", () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: [],
      };
      assert.equal(isLegal("a", "b"), false);
    });
    it("should allow a legal move", () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: [],
      };
      assert.equal(isLegal("a", "c"), true);
    });
  });
  describe("#checkForWin()", () => {
    it("should detect a win", () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });
} else {
  getPrompt();
}
