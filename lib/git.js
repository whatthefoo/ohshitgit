const git = require("simple-git")();
const questions = require("./questions");

module.exports = {
  timemachine: () => {
    git.log(
      ["-g", "--abbrev-commit", "--pretty=oneline"],
      async (err, commits) => {
        if (!err) {
          const { commit } = await questions.selectCommit(commits.all);
        }
      }
    );
  }
};
