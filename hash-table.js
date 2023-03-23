const sha256 = require("js-sha256");

class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable {
  constructor(numBuckets = 4) {
    // Your code here
    this.count = 0;
    this.capacity = numBuckets;
    this.data = [];
    for (let i = 0; i < numBuckets; i++) {
      this.data.push(null);
    }
  }

  hash(key) {
    // Your code here
    return parseInt(sha256(key).substring(0, 8), 16);
  }

  hashMod(key) {
    // Your code here
    return this.hash(key) % this.capacity;
  }

  insertNoCollisions(key, value) {
    // Your code here
    let index = this.hashMod(key);
    if (this.data[index] === null) {
      this.data[index] = new KeyValuePair(key, value);
      this.count++;
    } else {
      throw new Error("hash collision or same key/value pair already exists!");
    }
  }

  insertWithHashCollisions(key, value) {
    // Your code here
    let index = this.hashMod(key);
    if (this.data[index] === null) {
      this.data[index] = new KeyValuePair(key, value);
      this.count++;
    } else {
      let curr = this.data[index];
      this.data[index] = new KeyValuePair(key, value);
      this.data[index].next = curr;
      this.count++;
    }
  }
  insert(key, value) {
    // Your code here
    let index = this.hashMod(key);
    if (this.data[index] === null) {
      this.data[index] = new KeyValuePair(key, value);
      this.count++;
    } else {
      let curr = this.data[index];
      while (curr.next) {
        curr = curr.next;
      }
      if (curr.key === key) {
        curr.value = value;
        return;
      }
      this.data[index] = new KeyValuePair(key, value);
      this.data[index].next = curr;
      this.count++;
    }
  }
}
module.exports = HashTable;
