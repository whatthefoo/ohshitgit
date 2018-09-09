const git = require("simple-git")();
const speak = require("./speak");

module.exports = {
  getCommitList: function() {
    return new Promise((resolve, reject) => {
      git.log({}, (err, commits) => {
        if (!err) {
          resolve(commits.all);
        }
        reject(err);
      });
    });
  },
  getDiffFiles: function() {
    return new Promise((resolve, reject) => {
      git.status(function(err, status) {
        if (!err) {
          // array of unstaged files
          resolve(status.files);
        }
        reject(err);
      });
    });
  },
  resetTo: function(hash) {
    // https://stackoverflow.com/questions/49388201/git-revert-back-to-certain-commit-without-changing-history-and-creating-a-new-co
    git.raw(["read-tree", "-u", "--reset", hash], function(err, result) {
      if (!err) {
        speak.success("Successfully reverted back to selected commit");
      }
    });
  },
  addAll: function() {
    git.add(["."], function(err, result) {
      if (!err) {
        speak.success("Staged all files");
      }
    });
  },
  add: function(files) {
    git.add(files, function(err, result) {
      if (!err) {
        speak.success("Staged selected files");
      }
    });
  },
  amend: function(message) {
    git.raw(["commit", "--amend", "-m", message], function(err, result) {
      if (!err) {
        speak.success("Add files to last commit");
      }
    });
  }
};
