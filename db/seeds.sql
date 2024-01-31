INSERT INTO department (name)
VALUES  ("Sales"),
        ("Legal"),
        ("HR"),
        ("Custodial"),
        ("Finance"),
        ("Sales"),
        ("Finance"),
        ("Legal");


INSERT INTO role (title, salary, department_id)      
VALUES  ('Account Executive', 130000, 1),
        ('Attorney', 150000, 2),
        ('HR Manager', 140000, 3),
        ('Custodian', 50000, 4),
        ('Payroll', 55000, 5),
        ('Sales Manager', 170000, 1),
        ('Accountant', 110000, 5),
        ('Paralegal', 80000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)  
VALUES  ('Blanche', 'Devereaux', 1, 1),
        ('Dorothy', 'Zbornak', 2, 2),
        ('Sophia', 'Petrillo', 3, 3),
        ('Stanley', 'Zbornak', 4, 3),
        ('Rose', 'Nyland', 5, 4),
        ('Miles', 'Webber', 6, 5),
        ('Lucas', 'Hollingsworth', 7, 6),
        ('Frieda', 'Claxton', 8, 7);
