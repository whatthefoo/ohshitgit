#!/usr/bin/env node

const tasks = require("../lib/tasks");
const clear = require("clear");
const figlet = require("figlet");

const project = require("../lib/project");
const questions = require("../lib/questions");
const speak = require("../lib/speak");

if (!project.gitExist()) {
  speak.error(
    "Could not locate your git project. Try again in the root folder of your project"
  );
  process.exit();
}

async function run() {
  clear();
  speak.normal(figlet.textSync("Shit!"));

  try {
    const { command } = await questions.init();
    tasks[command]();
  } catch (err) {}
}

run();
