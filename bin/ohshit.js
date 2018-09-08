#!/usr/bin/env node

const program = require("commander");
const package = require("../package.json");
const git = require("../lib/git");

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
  try {
    const { command } = await questions.init();
    git[command]();
  } catch (err) {}
}

run();
