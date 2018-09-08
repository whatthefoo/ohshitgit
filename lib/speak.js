const chalk = require("chalk");

module.exports = {
  error: string => {
    return console.log(chalk.bgRed.black(string));
  },
  success: string => {
    return console.log(chalk.bgGreen.black(string));
  },
  normal: string => {
    return console.log(string);
  }
};
