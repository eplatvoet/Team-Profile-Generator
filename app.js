const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Employee = require("./lib/Employee.js");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//GLOBAL VARIABLE SET UP TO PUSH ANSWERS INTO THIS ARRAY
const team = [];

//FUNCTION CONTAINING THE QUESTIONS USER WILL ANSWER IN ORDER TO CREATE THEIR TEAM
function promptUser() {
    return inquirer.prompt([
        //MANAGER QUESTIONS 
        {
            type: "input",
            name: "name",
            message: "What is the manager's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is the manager's id?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the manager's email?"
        },
        {
            type: "input",
            name: "officeNumber",
            message: "What is the manager's office number?"
        }
    ])
        .then(function (answers) {
            createTeam(answers)
            addMoreEmployees()
        })
};

//FUNCTION ASKING IF THEY WANT TO ADD MORE EMPLOYEES
function addMoreEmployees() {
    inquirer.prompt([
        {
            type: "list",
            name: "addMore",
            message: "What kind of team member would you like to add next?",
            choices: [
                "Engineer",
                "Intern",
                "I don't want to add any more employees to this team"
            ]
        }
    ])
        .then(function (answers) {
            console.log(answers)
            //BASED OFF USER CHOICE, ONE OF THE FOLLOWING WILL BE EXECUTED:
            if (answers.addMore === "Engineer") {
                engineeerQuestions()
            }
            else if (answers.addMore === "Intern") {
                internQuestions()
            }
            else {
                createHTML()
            }
        })
};

//ENGINEER QUESTIONS
function engineeerQuestions() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the name of the Engineer?"
        },
        {
            type: "input",
            name: "id",
            message: "What is their ID number?"
        },
        {
            type: "input",
            name: "email",
            message: "What is their email?"
        },
        {
            type: "input",
            name: "github",
            message: "What is their GitHub username?"
        }
    ])
        .then(function (answers) {
            addEngineer(answers)
            addMoreEmployees()
        })
};

//INTERN QUESTIONS
function internQuestions() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the name of the Intern?"
        },
        {
            type: "input",
            name: "id",
            message: "What is their ID number?"
        },
        {
            type: "input",
            name: "email",
            message: "What is their email?"
        },
        {
            type: "input",
            name: "school",
            message: "What school do they attend?"
        }
    ])
        .then(function (answers) {
            addIntern(answers)
            addMoreEmployees()
        })
};

//FUNCTION TO CREATE THE HTML DOCUMENT
function createHTML() {

    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
    };
    return fs.writeFileSync(outputPath, render(team), "utf8")

}

//FUNCTIONS CREATED TO PUSH ANSWERS TO ARRAY
function createTeam(answers) {
    console.log("createTeam answers:", answers)
    const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber)
    team.push(manager)
    console.log("created Team", team)
};

function addEngineer(answers) {
    console.log("addEngineer:", answers)
    const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github)
    team.push(engineer)
    console.log("engineer added to team: ", team)

};
function addIntern(answers) {
    console.log("addIntern:", answers)
    const intern = new Intern(answers.name, answers.id, answers.email, answers.school)
    team.push(intern)
    console.log("intern added to team:", team)

};

//FUNCTIOIN TO INITIALIZE PROGRAM
function init() {
    promptUser()
        .then(function () {
            console.log("Have a nice day!")
        })
};

//START!
init();