const { promisify } = require("util");
const git = require("simple-git")();
const questions = require("./questions");
const speak = require("./speak");

module.exports = {
  timemachine: function() {
    git.log({}, async (err, commits) => {
      if (!err) {
        const { commit } = await questions.selectCommit(commits.all);
        this.reset(commit);
      }
    });
  },
  reset: function(hash) {
    // https://stackoverflow.com/questions/49388201/git-revert-back-to-certain-commit-without-changing-history-and-creating-a-new-co
    git.raw(["read-tree", "-u", "--reset", hash], function(err, result) {
      if (!err) {
        speak.success("Successfully reverted back to selected commit");
      }
    });
  }
};
