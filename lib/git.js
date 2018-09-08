const { promisify } = require("util");
const git = require("simple-git")();
const questions = require("./questions");
const speak = require("./speak");

module.exports = {
  timemachine: function() {
    git.log({ splitter: "::" }, async (err, commits) => {
      if (!err) {
        const { commit } = await questions.selectCommit(commits.all);
        this.revert(commit);
      }
    });
  },
  revert: function(hash) {
    git.revert(hash, [], function(err, result) {
      if (!err) {
        speak.success("Successfully reverted back to selected commit");
      }
    });
  }
};
