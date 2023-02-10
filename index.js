const fs = require('fs');
const inquirer = require('inquirer');
const createHtml = require('./src/createHtml');

const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

let team = [];

const title = ['Engineer', 'Intern'];
var addMore = false;

// questions for the manager
const managerQuestions = [
    {
        type: 'input',
        name: 'name',
        message: "Enter manager's name:",
        validate: (name) => { return name != "" }
    },
    {
        type: 'input',
        name: 'id',
        message: "Enter manager's id:",
        validate: (id) => { return id != "" }
    },
    {
        type: 'input',
        name: 'email',
        message: "Enter manager's email:",
        validate: function (email) {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
        },
    },
    {
        type: 'input',
        name: 'office',
        message: "Enter manager's office number:",
        validate: (office) => { return office != "" }
    },
    {
        type: 'confirm',
        name: 'confirmNewEmployee',
        message: 'Add another team member?',
        default: false
    },

];

// questions for the engineer and intern
const employeeQuestions = [
    {
        type: 'input',
        name: 'name',
        message: "Enter employee's name:",
        validate: (name) => { return name != "" }
    },
    {
        type: 'input',
        name: 'id',
        message: "Enter employee's id:",
        validate: (id) => { return id != "" }
    },
    {
        type: 'input',
        name: 'email',
        message: "Enter employee's email:",
        validate: function (email) {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
        },
    },
    {
        type: 'list',
        name: 'title',
        message: 'Enter title of this team member:',
        choices: title,
    },
    {
        type: 'input',
        name: 'github',
        message: "Please enter engineers's github username:",
        when: (input) => input.title === "Engineer",
        validate: (github) => { return github != "" }
    },
    {
        type: 'input',
        name: 'school',
        message: "Please enter intern's school name:",
        when: (input) => input.title === "Intern",
        validate: (school) => { return school != "" }
    },
    {
        type: 'confirm',
        name: 'confirmNewEmployee',
        message: 'Add another team member?',
        default: false
    },
];

const addManager = () => {
    return inquirer.prompt(managerQuestions)

}

const addNewEmployees = () => {
    return inquirer.prompt(employeeQuestions)
        .then(answers => {
            console.log(answers)
            let { name, id, email, title, github, school, confirmNewEmployee } = answers;
            let employee;
            if (title === "Engineer") {
                employee = new Engineer(name, id, email, github);
            }
            else if (title === "Intern") {
                employee = new Intern(name, id, email, school);
            }
            team.push(employee);
            console.log(team)
            if (confirmNewEmployee) {
                return addNewEmployees();
            }
        })
        .then(() => { return createHtml(team) })
        .then(html => { return writeToFile(html) })
        .catch(err => { console.log(err) });
}

const writeToFile = (html) => {
    const filename = "./index.html";
    fs.writeFile(filename, html, function (err) {
        err ? console.log(err) : console.log(filename + " created!")
    });
}

function init() {

    //  adding manager and other employees as needed
    addManager()
        .then(answers => {
            const { name, id, email, office, confirmNewEmployee } = answers;
            const manager = new Manager(name, id, email, office);
            team.push(manager);
            if (answers.confirmNewEmployee) {
                addNewEmployees ()
                // inquirer.prompt(employeeQuestions)
                addEmployees = true;
            }
        })
       
}

init();
