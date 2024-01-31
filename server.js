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
    ]) .then (answers=> {
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
}

function viewAllDepartments() {
    db.query('SELECT * FROM department;', (err, res) => {
        if(err)throw err
        console.table(res)
        menu()
    })
}

function viewAllRoles() {
    db.query('SELECT * FROM role;', (err, res) => {
        if(err)throw err
        console.table(res)
        menu()
    })
}

function viewAllEmployees() {
    db.query('SELECT * FROM employee;', (err, res) => {
        if(err)throw err
        console.table(res)
        menu()
    })
}
function addADepartment() {
    inquirer.prompt([
        {
            type: "input",
            message: "What Department would you like to add?",
            name: 'departmentname',  
        }
    ]) .then(dep => {

        db.query(`INSERT INTO department (name) VALUES  ("${dep.department}")`, (err, res) => {
            if(err)throw err
            console.table(res)
            menu()
        })
    }) 
    }

menu()