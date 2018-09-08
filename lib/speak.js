const chalk = require("chalk");

module.exports = {
  error: string => {
    return console.log(chalk.red(string));
  }
};
