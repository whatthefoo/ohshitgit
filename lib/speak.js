const chalk = require("chalk");
const ora = require("ora");

module.exports = {
  error: string => {
    return console.log(chalk.bgRed.black(string));
  },
  success: string => {
    return ora(string).succeed();
  },
  normal: string => {
    return console.log(string);
  }
};
