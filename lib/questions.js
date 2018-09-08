const inquirer = require("inquirer");

module.exports = {
  init: () => {
    const questions = [
      {
        name: "command",
        type: "list",
        message: "Oh shit! What did you do?!",
        choices: [
          {
            name:
              "I did something terribly wrong, please tell me git has a magic time machine?!",
            value: "timemachine"
          },
          {
            name:
              "I committed and immediately realized I need to make one small change!",
            value: "addToCommit"
          },
          {
            name: "I need to change the message on my last commit!",
            value: "change-commit-message"
          },
          {
            name:
              "I accidentally committed something to master that should have been on a brand new branch!",
            value: "regret-commit-to-master"
          },
          {
            name: "I accidentally committed to the wrong branch!",
            value: "regret-commit-to-branch"
          },
          {
            name: "I tried to run a diff but nothing happened?!",
            value: "no-diff"
          },
          {
            name: "Fuck this noise, I give up.",
            value: "fuck-everything"
          }
        ]
      }
    ];
    return inquirer.prompt(questions);
  },
  selectCommit: commits => {
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
        message:
          "Select the commit you want to revert to. Make sure you have no uncomitted changes",
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
  }
};
