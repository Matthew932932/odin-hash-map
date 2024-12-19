#!/usr/bin/env node

// your code

//!!!!!!!! Note on get and set at the very bottom!!!!!!!!!!

function playerCreatorCon(name, score) {

  this.name = name;
  this.score = score;

  let privateCon = "private CON";
  // this.getPrivate = function() {
  //   console.log(privateCon);
  // };
  this.getPrivate = getPrivateF;    //this works as does above
  function getPrivateF() {
    console.log("private con 1: " + privateCon);
  }

}

playerCreatorCon.prototype.increment = function () {
  this.score++;
};
playerCreatorCon.prototype.updateName = function (newName) {
  this.name = newName;
};
playerCreatorCon.prototype.sharedVar = "heyCon";


let playerCon = new playerCreatorCon("John", 8);

playerCon.increment(); // 9

console.log("Con: " + playerCon.name);
console.log("Con: " + playerCon.score);
playerCon.updateName("FrankCon");
console.log("Con Updated name: " + playerCon.name);
console.log("Con shared var: " + playerCon.sharedVar);
//console.log("private CON: " + prtivateCon);
playerCon.getPrivate();




// don't love this structure, see FR for prefered
function playerCreatorF(name, score) {
  return {
    name: name,
    score: score,
    increment() {
      return (this.score += 1);
    },
  };
}

let playerF = playerCreatorF("John", 8);

playerF.increment(); // 9

console.log("F: " + playerF.name);
console.log("F: " + playerF.score);




function playerCreatorFR(name, score) {
  let sharedVar = "hey1"; //i.e. returned in the factory
  let privateVar = 0; //i.e. not returned in the factory

  function increment() {
    return (this.score += 1);
  }

  function updateName(newName) {
    console.log("up name pre" + this.name);
    this.name = newName;
    console.log("up name post" + this.name);
  }

  function incrementPrvB() {
    console.log("FR in private var: " + privateVar);
    privateVar += 1;
    console.log("FR in private var post: " + privateVar);
  }

  function getPrv() {
    return privateVar;
  }

  return {
    name,
    score,
    sharedVar,
    increment,
    updateName,
    incrementPrvB,
    getPrv,
  };
}

const playerFR = playerCreatorFR("John", 8);

playerFR.increment(); // 9

console.log("FR name: " + playerFR.name);
console.log("FR sacore: " + playerFR.score);

playerFR.updateName("Frank");
console.log("FR Updated name: " + playerFR.name);

console.log("FR shared var1: " + playerFR.sharedVar);
playerFR.sharedVar = "heyNow";
console.log("FR shared var1 changed: " + playerFR.sharedVar);
playerFR.incrementPrvB();
//console.log("private var should fail FR: " + playerFR.privateVar);  //should fail does fail
console.log("FR get private var: " + playerFR.getPrv());

const playerFR2 = playerCreatorFR("Fred", 13);
console.log("FR2 shared var1: " + playerFR2.name + " " + playerFR2.sharedVar);

class playerCreatorC {
  sharedVar = "heyC";
  #privateVar = 1;

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

  incrementClPrv() {
    console.log("CL in private var: " + this.#privateVar);
    this.#privateVar += 1;
    console.log("CL in private var post: " + this.#privateVar);
  }

  getCPrv() {
    return this.#privateVar;
  }
}

let playerC = new playerCreatorC("John", 8);

playerC.increment(); // 9

console.log("C name: " + playerC.name);
console.log("C score: " + playerC.score);

playerC.updateName("Frank");
console.log("C Updated name: " + playerC.name);

console.log("C sharedVar: " + playerC.sharedVar);
playerC.incrementClPrv();
//console.log("C should not work privateVar: " + playerC.privateVar);
console.log("C private Var: " + playerC.getCPrv());



// GET and SET
//essentially changes the .something into a fucntion call
//where the equals is the argument into the function
//especiallt ingenious implemented in class, as below example,
//because it invoke the .something on initialisation and therefore
//can use it as an initialise check as well as property update
//checks. Haven't fully figured out the exact syntax for this into
//a Fact or a Con but i'm sure it can be done.

const student = {
  firstName: 'Monica',
  
  //accessor property(setter)
  set changeName(newName) {
      this.firstName = newName;
  }
};

console.log(student.firstName); // Monica
// change(set) object property using a setter
student.changeName = 'Sarah';
console.log(student.firstName); // Sarah


const language = {
  set current(name) {
    this.log.push(name);
  },
  log: [],
};

language.current = 'EN';
language.current = 'FA';

console.log(language.log);
// Expected output: Array ["EN", "FA"]


class User {

  constructor(name) {
    // invokes the setter  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    this.name = name;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    if (value.length < 4) {
      console.log("Name is too short.");
      return;
    }
    this._name = value;
  }
}

let user = new User("John");
console.log(user.name); // John
user = new User(""); // Name is too short.
user.name = "Bob";
user.name = "Tommy";
console.log(user.name);
let user2 = new User("Tim");