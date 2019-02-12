var app = new Vue({
  el: "#app",
  data: {
    message: "Hello Pandas! I am a Panda! "
  },
  methods: {
    slowReplace: async function(word) {
      // returns back a promise
      return new Promise(resolve => {
        setTimeout(() => {
          let result = word.replace("a", "🐼");
          resolve(result);
        }, 1000); // setting a timeout of 1s then replace the world with an emoji
      });
    },
    reset: function() {
      this.message = "Hello Pandas! I am a Panda!";
    },
    run: async function() {
      this.message = "(running)";
      let result = "";
      // Wait on each promise to be resolved in serial.
      result += await this.slowReplace("Hello "); // await for a 1s because of the timeout
      result += await this.slowReplace("Pandas! ");
      result += await this.slowReplace("I ");
      result += await this.slowReplace("am ");
      result += await this.slowReplace("a ");
      result += await this.slowReplace("Panda!");

      this.message = result;
      console.log(result);
    },
    runParallel: async function() {
      this.message = "(running)";
      let result = "";
      // Put all the promises in an array.
      let promises = [];
      promises.push(this.slowReplace("Hello "));
      promises.push(this.slowReplace("Pandas! "));
      promises.push(this.slowReplace("I "));
      promises.push(this.slowReplace("am "));
      promises.push(this.slowReplace("a "));
      promises.push(this.slowReplace("Panda! "));

      // Wait until all promises in the array have been fulfilled.
      let allResults = await Promise.all(promises);
      // In for loops, 'in' gives you each array index and 'of' gives you each array item.
      for (let eachResponse of allResults) {
        // "in" will return the index // "of" will return the object
        result = result + eachResponse;
      }
      this.message = result;
    }
  }
});
