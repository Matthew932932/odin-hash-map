#!/usr/bin/env node

// your code

//!!!!!!!!!!!Turns out I was taking a bit of code from each section
//and implemented bucketIndexInternalArr.push({key,value});
//when it sould have been bucketIndexInternalArr.push([key,value]);


//code I found didn't work, maybe I didn't
//convert it properly BUUT I used the general
//concept. it makes an array at the index of the 
//bucket array. Then push(s) onto the array if 
//there is a collision. I think the intention of 
//the code I found was to make an array of arrays
//but I ended up getting an array of objects. So I
// just used .key instead of the code I found using [][]
//
//working pretty good. haven't implemented upping capacity
//yet. But what I would do is change the 'this.capacity' to 
//32(i think it is multiple of 2) then make a function
//which creates a new buckets array of copies the old
//buckets to it. rehashing with % 32 as they copy over 
//to thier new index.

class HashMapCl {
  
  constructor() {
    this.capacity = 16;
    this.buckets = new Array(this.capacity).fill(null); //st
    this.loadFactor = 0.75;
  }

  hash(key) {
    let hashCode = 0;
      
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }
    console.log(hashCode);
    hashCode = hashCode % this.capacity;
    console.log(hashCode);
    return hashCode;
  } 

  set(key,value) {
    const index = this.hash(key);
    if (!this.buckets[index]){
      //making a new array at the index, effectively 
      //'the' required linked list with the use of push, 
      //at least for the puspose of this project
      this.buckets[index] = [];    
      //console.log(this.buckets);
    }

    const bucketIndexInternalArr = this.buckets[index];
    // for (let i = 0; i < bucketS.length; i++) {
    //   if (bucketS[i][0] === key) {
    //     bucketS[i][1] = value;
    //     return;
    //   }
    // }

    bucketIndexInternalArr.push({key,value});
    //console.log(this.buckets);


  }

  get(key) {
    const index = this.hash(key);
    const bucketIndexInternalArr = this.buckets[index];
    if(!bucketIndexInternalArr)
    {
      return "empty";
    }

    for (let i = 0; i < bucketIndexInternalArr.length; i++) {
      //console.log("h1")
      //console.log(bucketIndexInternalArr[0].key)
      //console.log(bucketIndexInternalArr[1][i])
      if (bucketIndexInternalArr[i].key === key) {
        //console.log("h2")
        return bucketIndexInternalArr[i].value;
      }
    }

    return "failed";
    
  }
  
}

let HashMapClOb = new HashMapCl();
//HashMapClOb.set("John", "49");
//HashMapClOb.set("Sallort", "45");
//HashMapClOb.set("Solo", "34");
//HashMapClOb.set("Gina", "78");
HashMapClOb.set('banana', 'yellow')
HashMapClOb.set('carrot', 'orange')
HashMapClOb.set('dog', 'brown');
HashMapClOb.set('elephant', 'gray')
HashMapClOb.set('frog', 'green')
HashMapClOb.set('grape', 'purple')
HashMapClOb.set('hat', 'black')
HashMapClOb.set('ice cream', 'white')
HashMapClOb.set('jacket', 'blue')
HashMapClOb.set('kite', 'pink')
HashMapClOb.set('lion', 'golden')
console.log(HashMapClOb.buckets);
console.log("get elephant: " + HashMapClOb.get("elephant"));
console.log("get lion: " + HashMapClOb.get("lion"));
//console.log(HashMapClOb.get("Solo"));
//console.log(HashMapClOb.get("apple"));


