var mysql = require("mysql");
var inquirer = require("inquirer");
const Table = require('cli-table');


const table = new Table({
    chars: {
        'top': '═', 'top-mid': '╤', 'top-left': '╔', 'top-right': '╗'
        , 'bottom': '═', 'bottom-mid': '╧', 'bottom-left': '╚', 'bottom-right': '╝'
        , 'left': '║', 'left-mid': '╟', 'mid': '─', 'mid-mid': '┼'
        , 'right': '║', 'right-mid': '╢', 'middle': '│'
    },
    colWidths: [5, 20, 20, 10, 10]


});


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Efemir.2010",
    database: "bamazon"
});
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    firstCheck();
});

// showInventory will retrieve the current inventory from the database and output it to the console

function showInventory() {
    connection.query("SELECT * FROM products", function (err, res) {

        if (err) throw err;
        table.push(["ID", "Item Name", "Department Name", "Price", "Stock"])
        for (var i = 0; i < res.length; i++) {
            // Log all results of the SELECT statement
            table.push(
                [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity])
        }
        console.log(table.toString());
        firstCheck();
    })
}

// firstCheck will present menu options to the manager and trigger appropriate logic

function firstCheck() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "\n What would you like to do?",
            choices: [
                "View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product",
                "Remove Item",
                "Exit"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View Products for Sale":
                    showInventory();
                    break;

                case "View Low Inventory":
                    lowInventory();
                    break;

                case "Add to Inventory":
                    addInventory();
                    break;

                case "Add New Product":
                    addNewProduct();
                    break;

                case "Remove Item":
                    removeItem();
                    break;


                case "Exit":
                    connection.end();
                    break;
            }
        });
}

// lowInventory will display a list of products with the available quantity below 5

function lowInventory() {
    var query = "SELECT * FROM products WHERE stock_quantity < 5"
    connection.query(query, function (err, res) {
        if (res.length < 1) {
            console.log("There is no item with an inventory lower than 5!")
            firstCheck();
        }

        else {
            for (var i = 0; i < res.length; i++) {

                // Log all results of the SELECT statement
                table.push(
                    [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity])
            }
            console.log(table.toString());
            firstCheck();

        }
    })
}
// addInventory will guilde a user in adding additional quantify to an existing item

function addInventory() {
    inquirer
        .prompt([
            {
                name: "item",
                type: "input",
                message: "\n What is the item number of the item you would like to restock? ",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },

            {
                name: "quantity",
                type: "input",
                message: "\n What is the quantity you would like to add? ",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }])
        .then(function (answer3) {
            // Query db to confirm that the given item ID exists in the desired quantity
            var queryStr = 'SELECT item_id FROM products WHERE item_id=?';

            connection.query(queryStr, [item_id = answer3.item], function (err, res) {
                if (err) throw err;

                // If the user has selected an invalid item ID, data attay will be empty
                // console.log('data = ' + JSON.stringify(data));
                if (res.length === 0) {
                    console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
                } else {
                    var query = "SELECT stock_quantity FROM products WHERE item_id= ? Limit 1";
                    connection.query("UPDATE products SET stock_quantity = stock_quantity+" + answer3.quantity + " WHERE item_id = " + answer3.item);

                };
            });
            firstCheck();
        })}

    // addNewProduct will guide the user in adding a new product to the inventory

    function addNewProduct() {
        inquirer
            .prompt([
                {
                    name: "ID",
                    type: "input",
                    message: "\n Add ID number? ",
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    }
                },
                {
                    name: "Name",
                    type: "input",
                    message: "\n What is name of product you would like to stock?",

                },
                {
                    name: "Department",
                    type: "input",
                    message: "\n What is the department for product?",

                },
                {
                    name: "Price",
                    type: "input",
                    message: "\n What is the price for item?",
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    }
                },
                {
                    name: "Quantity",
                    type: "input",
                    message: "\n What is the quantity you would like to add?",
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    },

                }])
            .then(function (answer3) {
                connection.query('INSERT INTO products (item_id,product_name,department_name,price,stock_quantity) VALUES ("' + answer3.ID + '","' + answer3.Name + '","' + answer3.Department + '",' + answer3.Price + ',' + answer3.Quantity + ')');

                firstCheck();
            })
    }

    // remove any item from stock
    function removeItem() {
        inquirer.prompt([{
            name: "ID",
            type: "input",
            message: "What is the item number of the item you would like to remove?"
        }]).then(function (answer4) {
            var id = answer4.ID;
            removeInventory(id);
        });
    };

    function removeInventory(id) {
        connection.query('DELETE FROM Products WHERE item_id = ' + id);
        showInventory();
    }

