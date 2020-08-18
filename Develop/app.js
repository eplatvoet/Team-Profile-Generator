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

const team = [];


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

//FUNCTION CONTAINING THE QUESTIONS USER WILL ANSWER IN ORDER TO CREATE THEIR TEAM
function promptUser(){
    return inquirer.prompt([
        //MANAGER QUESTIONS
        {
            type:"input",
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
    ]);
};
//FUNCTION ASKING IF THEY WANT TO ADD MORE EMPLOYEES
function addMoreEmployees(){
    return inquirer.prompt([
        {
            type: "list",
            name: "addMoreEmployees",
            message: "What kind of team member would you like to add next?",
            choices: [
                "Engineer",
                "Intern",
                "I don't want to add any more employees to this team"
            ] //based off this selection, switch case to other questions or pull manager repsonse. default = done & write to team.html
        }
    ])
    //if (answer.choices === "Engineer") {
    //     engineeerQuestions()
    // }
    // else if (answer.choices === "Intern") {
        // internQuestions()
        // }
    // else {
        // createTeam()
        // }
};  
        
//ENGINEER QUESTIONS
function engineeerQuestions(){
    return inquirer.prompt([
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
    ]);
    addMoreEmployees();
};
        
//INTERN QUESTIONS
function internQuestions(){
    return inquirer.prompt([
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

    ]);
    addMoreEmployees();
};

//CALL PROMPTUSER() 
promptUser();
addMoreEmployees();
//conditional statements & createTeam();
createTeam();
//
    // .then(function(team){
    //    // if !(fs.existsSync(OUTPUT_DIR)){
    // //     mkdirSync(OUTPUT_DIR)
    // //    };
    //    return fsWriteFileSync(outputPath, render(team), "utf8")
    // })
    
function createTeam() {
    const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber)
    team.push(manager)
};

function addEngineer() {
    const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github)
    team.push(engineer)

};
function addIntern() {
    const intern = new Intern(answers.name, answers.id, answers.email, answers.school)
    team.push(intern)

};



//call choices function //switch case --> instance of manager

//engineer function //const engineer = new Engineer(); //createTeam function()
//intern function //const intern = new Intern();//createTeam function()
//push info to array (for each function) -check js activities


//createTeam function() (RENDER FUNCTION) 
//WRITE FILE TO TEAM.HTML IN THE 'OUTPUT' FOLDER

//conditional statement: if there isn't one (fs.existsSync(OUTPUT_DIR)), then make one using mkdirSync(OUTPUT_DIR)
//fsWriteFileSync(outputPath, render(team), "utf8")


