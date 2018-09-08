const chalk = require("chalk");
const ora = require("ora");

module.exports = {
  error: string => {
    return console.log(chalk.bgRed.black(string));
  },
  success: string => {
    return console.log(ora().succeed(string));
  },
  normal: string => {
    return console.log(string);
  }
};
