#!/usr/bin/env node

// your code

function playerCreatorCon(name, score) {
  this.name = name;
  this.score = score;
}

playerCreatorCon.prototype.increment = function () {
  this.score++;
};


function playerCreatorF(name, score) {
  return {
    name: name,
    score: score,
    increment() {
      return (this.score += 1);
    },
  };
}

function playerCreatorFR(name, score) {
  
  
  let sharedVar = "hey1";
  let privateVar = "hey2";
  
  function increment() {
    return (this.score += 1);
  }

  function updateName(newName) {
    this.name = newName;
  }

  // function incrementPrvA() {
  //   console.log(this.privateVar);
  //   //this.privateVar += 1;

  // }

  const incrementPrvB = () => {console.log(this.privateVar);}

  function getPrv() {
    console.log(this.privateVar);
    return this.privateVar;
  }

  return { name, score, sharedVar, increment, updateName, incrementPrvB, getPrv };
}

let playerFR = playerCreatorFR("John", 8);

playerFR.increment(); // 9

console.log("FR: " + playerFR.name);
console.log("FR: " + playerFR.score);

playerFR.updateName("Frank")
console.log("Updated name FR: " + playerFR.name);

console.log("shared var1: " + playerFR.sharedVar);
playerFR.incrementPrvB;
//console.log("incrementPrv FR: " + playerFR.privateVar);  //doesn't work, as expected
//console.log(playerFR.getPrv());

class playerCreatorC {
  constructor(name, score) {
    this.name = name;
    this.score = score;
  }

  increment() {
    this.score++;
  }

  updateName(newName) {
    this.name = newName;
  }

}

let playerCon = new playerCreatorCon("John", 8);

playerCon.increment(); // 9

console.log("Con: " + playerCon.name);
console.log("Con: " + playerCon.score);


let playerF = playerCreatorF("John", 8);

playerF.increment(); // 9

console.log("F: " + playerF.name);
console.log("F: " + playerF.score);





let playerC = new playerCreatorC("John", 8);

playerC.increment(); // 9

console.log("C: " + playerC.name);
console.log("C: " + playerC.score);

playerC.updateName("Frank")
console.log("Updated name: " + playerC.name);
