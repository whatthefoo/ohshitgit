const inquirer = require("inquirer");

module.exports = {
  init: () => {
    const questions = [
      {
        name: "command",
        type: "list",
        message: "Select an option",
        choices: [
          {
            name: "I fucked up. I need a time machine!",
            value: "timemachine"
          },
          {
            name:
              "I committed and immediately realized I need to add one small change!",
            value: "addToCommit"
          },
          {
            name: "I need to change the message on my last commit!",
            value: "changeCommitMessage"
          },
          {
            name:
              "Delete everything I've done locally, and make everything up to date with the remote branch!",
            value: "resetToRemoteBranch"
          },
          {
            name: "I accidentally committed to the wrong branch!",
            value: "regretCommitToBranch"
          },
          {
            name: "I tried to run a diff but nothing happened?!",
            value: "noDiff"
          },
          {
            name: "Fuck this noise, I give up.",
            value: "fuckEverything"
          }
        ]
      }
    ];
    return inquirer.prompt(questions);
  },
  selectHead: (heads, message) => {
    const question = heads.reduce(
      (acc, head) => {
        return {
          ...acc,
          choices: [...acc.choices, { name: head.message, value: head.head }]
        };
      },
      {
        name: "head",
        type: "list",
        message: message,
        choices: []
      }
    );
    return inquirer.prompt([question]);
  },
  selectCommit: (commits, message) => {
    const question = commits.reduce(
      (acc, commit) => {
        return {
          ...acc,
          choices: [
            ...acc.choices,
            { name: commit.message, value: commit.hash }
          ]
        };
      },
      {
        name: "commit",
        type: "list",
        message: message,
        choices: []
      }
    );
    return inquirer.prompt([question]);
  },
  selectCommits: (commits, message) => {
    const question = commits.reduce(
      (acc, commit) => {
        return {
          ...acc,
          choices: [
            ...acc.choices,
            { name: commit.message, value: commit.hash }
          ]
        };
      },
      {
        name: "selectedCommits",
        type: "checkbox",
        message: message,
        choices: []
      }
    );
    return inquirer.prompt([question]);
  },
  selectBranch: branches => {
    const question = branches.reduce(
      (acc, branch) => {
        return {
          ...acc,
          choices: [...acc.choices, { name: branch, value: branch }]
        };
      },
      {
        name: "selectedBranch",
        type: "list",
        message: "Select a branch",
        choices: []
      }
    );
    return inquirer.prompt([question]);
  },
  allOrIndividualFiles: () => {
    return inquirer.prompt([
      {
        name: "files",
        type: "list",
        message: "Fuck up's happen! What do you want to do?",
        choices: [
          {
            name: "Add all my changes to last commit!",
            value: "all"
          },
          {
            name: "Let me add individual files to the last commit!",
            value: "individual"
          }
        ]
      }
    ]);
  },
  newCommitMessage: previousMessage => {
    return inquirer.prompt([
      {
        name: "commitMessage",
        type: "input",
        message: "Enter a new commit message",
        default: previousMessage
      }
    ]);
  },
  newBranch: () => {
    return inquirer.prompt([
      {
        name: "newBranchName",
        type: "input",
        message: "Enter a name for the new branch"
      }
    ]);
  },
  selectFiles: files => {
    const question = files.reduce(
      (acc, file) => {
        return {
          ...acc,
          choices: [...acc.choices, { name: file.path, value: file.path }]
        };
      },
      {
        name: "selectedFiles",
        type: "checkbox",
        message: "Select the files you want to add to your last commit",
        choices: []
      }
    );

    return inquirer.prompt([question]);
  },
  removeAndClone: () => {
    return inquirer.prompt([
      {
        name: "fuckIt",
        type: "confirm",
        message:
          "Warning! This will delete your local project, and clone it again. You will loose all local changes"
      }
    ]);
  }
};
