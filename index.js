#!/usr/bin/env node

const inquirer = require('inquirer');
const fs = require('fs');

const ANSWERS = fs.readdirSync(`${__dirname}/tmpl`);
const CURR_DIR = process.cwd();
let fileName;

const QUESTIONS = [
  {
    name: 'pattern-answer',
    type: 'list',
    message: 'What pattern would you like to generate?',
    choices: ANSWERS
  },
  {
    name: 'file-name',
    type: 'input',
    message: 'File name?:',
    validate: (input) => {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else return 'Filename name may only include letters, numbers, underscores and hashes.';
    }
  }
];

inquirer.prompt(QUESTIONS)
    .then(answers => {
      const projectChoice = answers['pattern-answer'];
      const filePath = `${__dirname}/tmpl/${projectChoice}`;
      fileName = answers['file-name'];
      fileName = fileName + '.js';

      createFileContents(filePath);
    });

const createFileContents = (templatePath) => {
  const filesToCreate = fs.readdirSync(templatePath);

  filesToCreate.forEach(file => {
    const origFilePath = `${templatePath}/${file}`;
    const stats = fs.statSync(origFilePath);

    if (stats.isFile()) {
      const contents = fs.readFileSync(origFilePath, 'utf8');
      const writePath = `${CURR_DIR}/${fileName}`;
      const fileExists = fs.existsSync(fileName)

      fileExists ? console.log('the filename exists, please use another name') : fs.writeFileSync(writePath, contents, 'utf8');

      return fileExists;
    }
  });
};
