const inquirer = require('inquirer');
const mysql = require('mysql2');
const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'D0r0thy@40',
        database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
);

function menu(){
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: 'menu',
            choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role", "exit"],
        } 
    ]) .then (answers => {
        if(answers.menu == 'view all departments') {
            viewAllDepartments() 
        }
        if(answers.menu == 'view all roles') {
            viewAllRoles() 
        }
        if(answers.menu == 'view all employees') {
            viewAllEmployees() 
        }
        if(answers.menu == 'add a department') {
            addADepartment() 
        }
        if(answers.menu == 'add a role') {
            addARole() 
        }
        if(answers.menu == 'add an employee') {
            addAnEmployee() 
        }
        if(answers.menu == 'update an employee role') {
            updateEmployeeRole() 
        }
        if(answers.menu == 'exit') {
            process.exit() 
        }
    })
};

function viewAllDepartments() {
    db.query('SELECT * FROM department;', (err, res) => {
        if(err)throw err
        console.table(res)
        menu()
    })
};

function viewAllRoles() {
    db.query('SELECT role.id, role.title, role.salary, department.name AS department FROM role INNER JOIN department ON (department.id = role.department_id);', (err, res) => {
        if(err)throw err
        console.table(res)
        menu()
    })
};

function viewAllEmployees() {
    db.query('SELECT * FROM employee;', (err, res) => {
        if(err)throw err
        console.table(res)
        menu()
    })
};

function addADepartment() {
    inquirer.prompt([
        {
            type: "input",
            message: "Name of the department?",
            name: 'departmentname',  
        }
    ]) .then(dep => {

        db.query(`INSERT INTO department (name) VALUES ('${dep.departmentname}')`, (err, res) => {
            if(err)throw err
            console.table(res)
            console.log("Added" + dep.departmentname + "to the database")
            menu()
        })
    }) 
    };

function addARole() { 
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of the role?',
            name: 'rolename',
        },
        {
            type: 'input',
            message: 'What is the salary of the role?',
            name: 'salary',
        },
        {
            type: 'list',
            message: 'Which department does this role belong to?',
            name: 'assign',
            choices: [1, 2, 3, 4, 5
            ]
        }
    ])  .then(newrole => {

        db.query(`INSERT INTO role (title, salary, department_id) VALUES ('${newrole.rolename}', '${newrole.salary}', '${newrole.assign}')`, (err, res) => {
            if(err)throw err
            console.table(res)
            menu()
        })
    })
};

function addAnEmployee() {
    inquirer.prompt ([
        {
            type: 'input',
            message: 'First name:',
            name: 'nameone',
        },
        {
            type: 'input',
            message: 'Last name:',
            name: 'nametwo',
        },
        {
            type: 'list',
            message: 'Employee role?',
            name: 'employrole',
            choices: [1, 2, 3, 4, 5, 6, 7, 8]
        },
        {
            type: 'list',
            message: 'Employee manager?',
            name: 'employmanager',
            choices: [1, 2, 3, 4, 5]
        },
    ])  .then(newemploy => {

        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${newemploy.nameone}', '${newemploy.nametwo}', '${newemploy.employrole}', '${newemploy.employmanager}')`, (err, res) => {
            if(err) throw err
            console.table(res)
            menu()
        })
    })
        
}; 

function updateEmployeeRole() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'Select employee:',
            name: 'employupdate',
            choices: ['Rose', 'Blanche', 'Dorothy', 'Sophia', 'Stanley', 'Miles', 'Lucas', 'Frieda', 'Max']
        },
        {
            type: 'input',
            message: 'Which role do you want to assign?',
            name: 'employnewrole',
        }
    ])  .then(newupdate => {

        db.query(`INSERT INTO employee (first_name, role_id) VALUES ('${newupdate.employupdate}', '${newupdate.employnewrole}')`, (err, res) => {
            if(err) throw err
            console.table(res)
            menu()

        })
    })
};

menu()