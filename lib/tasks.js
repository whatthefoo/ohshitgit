const speak = require("./speak");
const git = require("./git");
const questions = require("./questions");

module.exports = {
  timemachine: async function() {
    const commits = await git.getCommitList();
    const { commit } = await questions.selectCommit(commits);
    git.resetTo(commit);
  },
  addToCommit: async function() {
    const { files } = await questions.allOrIndividualFiles();
    const diffFiles = await git.getDiffFiles();

    if (diffFiles.length < 1) {
      speak.success("You don't have any unsaved changes");
      process.exit();
    }

    if (files === "all") {
      git.addAll();
      git.ammend();
    }

    if (files === "individual") {
      const { selectedFiles } = await questions.selectFiles(diffFiles);

      if (selectedFiles.length < 1) {
        speak.error("You didn't choose any files to add");
        process.exit();
      }

      git.add(selectedFiles);
      git.ammend();
    }
  }
};
