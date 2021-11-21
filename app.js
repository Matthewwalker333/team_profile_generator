const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Code to use inquirer to gather information about the development team members,
// and to create objects for each team member.
const teamMembers = [];

function start() {
    managerQuery();
}

function managerQuery() {
    inquirer.prompt([{
            type: "input",
            name: "name",
            message: "What is the name of the team manager?"
        },
        {
            type: "input",
            name: "id",
            message: "Team Manager's ID number:"
        },
        {
            type: "input",
            name: "email",
            message: "Team Manager's email address:"
        },
        {
            type: "input",
            name: "officeNumber",
            message: "Team Manager's office number:"
        }
    ]).then(val => {
        const manager = new Manager(val.name, val.id, val.email, val.officeNumber);
        console.log(manager)
        teamMembers.push(manager);
        addTeamMember();
    })
};

function addTeamMember() {
    inquirer.prompt([{
        type: "list",
        name: "what_type",
        message: "Add an engineer or intern to the team?",
        choices: ["Engineer", "Intern", "Not at this time"]
    }]).then(val => {

        if (val.what_type === "Engineer") {
            engineerQuery();
        } else if (val.what_type === "Intern") {
            internQuery();
        } else {
            createFile();
        }
    })
}