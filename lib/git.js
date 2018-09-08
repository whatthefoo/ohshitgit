const { promisify } = require("util");
const git = require("simple-git")();
const questions = require("./questions");

module.exports = {
  timemachine: function() {
    git.log({ splitter: "::" }, async (err, commits) => {
      if (!err) {
        const { commit } = await questions.selectCommit(commits.all);
        console.log(this);
      }
    });
  },
  revert: function(hash) {
    git.revert(hash, [], function(err, result) {
      console.log(result);
    });
  }
};
