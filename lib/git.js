const git = require("simple-git")();
const ListLogSummary = require("simple-git/src/responses/ListLogSummary");
const speak = require("./speak");

module.exports = {
  getHistory: function() {
    return new Promise((resolve, reject) => {
      git.raw(
        ["reflog", "--pretty=format:%gd;%gs" + ListLogSummary.COMMIT_BOUNDARY],
        (err, result) => {
          if (!err) {
            const reflogs = ListLogSummary.parse(result, ";", [
              "head",
              "message"
            ]);
            resolve(reflogs.all);
          }
          resolve([]);
        }
      );
    });
  },
  getAllCommits(branch = null) {
    console.log(branch);
    return new Promise((resolve, reject) => {
      git.log(["master"], (err, commits) => {
        if (!err) {
          resolve(commits.all);
        }
        reject(err);
      });
    });
  },
  getLocalCommits() {
    return new Promise((resolve, reject) => {
      git.log(["@{u}.."], (err, commits) => {
        if (!err) {
          resolve(commits.all);
        }
        reject(err);
      });
    });
  },
  getCurrentBranchName() {
    return new Promise((resolve, reject) => {
      git.raw(["symbolic-ref", "--short", "HEAD"], (err, branch) => {
        if (!err) {
          resolve(branch);
        }
        reject(err);
      });
    });
  },
  getLatestCommit: async function() {
    return new Promise((resolve, reject) => {
      git.log(["@{u}.."], (err, commits) => {
        if (!err) {
          resolve(commits.all[0]);
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
  getLocalBranches: async function() {
    return new Promise((resolve, reject) => {
      git.branchLocal((err, branches) => {
        if (!err) {
          resolve(branches.all);
        }
        reject(err);
      });
    });
  },
  resetHead: (head = "HEAD~", mode = "--soft") => {
    // https://stackoverflow.com/questions/49388201/git-revert-back-to-certain-commit-without-changing-history-and-creating-a-new-co
    git.raw(["reset", head, mode], function(err, result) {
      if (!err) {
        speak.success("Reset to " + head);
      }
    });
  },
  resetToCommit: function(hash) {
    // https://stackoverflow.com/questions/49388201/git-revert-back-to-certain-commit-without-changing-history-and-creating-a-new-co
    git.raw(["read-tree", "-u", "--reset", hash], function(err, result) {
      if (!err) {
        speak.success("Successfully reverted back to selected commit");
      }
    });
  },
  stash() {
    git.raw(["stash"], function(err, result) {
      if (!err) {
        speak.success(`Stashed changes`);
      }
    });
  },
  stashPop() {
    git.raw(["stash", "pop"], function(err, result) {
      if (!err) {
        speak.success(`Applied stash`);
      }
    });
  },
  createBranch: branchName => {
    git.raw(["branch", branchName], function(err, result) {
      if (!err) {
        speak.success(`Created new branch with name ${branchName}`);
      }
    });
  },
  checkout: branchName => {
    git.raw(["checkout", branchName], function(err, result) {
      if (!err) {
        speak.success(`Checked out to ${branchName}`);
      }
    });
  },
  addAll: function() {
    git.add(["."], function(err, result) {
      if (!err) {
        speak.success("Added all files");
      }
    });
  },
  add: function(files) {
    git.add(files, function(err, result) {
      if (!err) {
        speak.success("Added selected files");
      }
    });
  },
  amend: function(message) {
    git.raw(["commit", "--amend", "-m", message], function(err, result) {
      if (!err) {
        speak.success("Updated commit");
      }
    });
  },
  diffStaged() {
    git.raw(["diff", "--staged"], function(err, result) {
      if (!err) {
        speak.normal(result);
      }
    });
  }
};
