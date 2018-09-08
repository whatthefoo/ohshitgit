const git = require("simple-git")();
const speak = require("./speak");
const execa = require("execa");

module.exports = {
  timemachine: async () => {
    git.log(["-g", "--abbrev-commit", "--pretty=oneline"], (err, result) => {
      if (!err) {
        console.log(result);
      }
    });
  }
};
