// Pull in required dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");
const Table = require('cli-table');

// Define the MySQL connection parameters
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
    showInventory();
});

//create a table for showing inventory
const table = new Table({
    chars: {
        'top': '═', 'top-mid': '╤', 'top-left': '╔', 'top-right': '╗'
        , 'bottom': '═', 'bottom-mid': '╧', 'bottom-left': '╚', 'bottom-right': '╝'
        , 'left': '║', 'left-mid': '╟', 'mid': '─', 'mid-mid': '┼'
        , 'right': '║', 'right-mid': '╢', 'middle': '│'
    },
    colWidths: [5, 20, 20, 10, 10]
});

//to show inventory 
function showInventory() {
    connection.query("SELECT * FROM products", function (err, res) {

        if (err) throw err;
        table.push(["ID", "Item Name", "Department Name", "Price", "Stock"])
        for (var i = 0; i < res.length; i++) {
            // Log all results of the SELECT statement
            table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity])
        }
        console.log(table.toString());
        firstPrompt();
    })
}

// firstPrompt will prompt the user for the item/quantity they would like to purchase

function firstPrompt() {
    inquirer
        .prompt([
            {   name: "item",
                type: "input",
                message: "\n What is the Id of the product you want to buy? ",
                validate: function (value) 
                {
                    if (isNaN(value) === false) 
                    {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "quantity",
                type: "input",
                message: "\n How many would you like to buy? ",
                validate: function (value) 
                {
                    if (isNaN(value) === false)
                    {
                        return true;
                    }
                    return false;
                }
            }])
        .then(function (answer) 
        {   // Query db to confirm that the given item ID exists in the desired quantity
            var queryStr = 'SELECT item_id FROM products WHERE item_id=?';

            connection.query(queryStr, [item_id = answer.item], function (err, res) {
                if (err) throw err;

                // If the user has selected an invalid item ID, data attay will be empty
                // console.log('data = ' + JSON.stringify(data));
                if (res.length === 0) {
                    console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
                    firstPrompt();
                } else {
                    var query = "SELECT price, stock_quantity FROM products WHERE item_id= ? Limit 1";
                    connection.query(query, [answer.item], function (err, res) {
                        if (err) { console.log(err) };

                        if (res[0].stock_quantity >= answer.quantity) {
                            console.log("Good news your order is in stock!");
                            //  console.log(res[0].price);
                            console.log("All right, your total cost is " + res[0].price * answer.quantity + "!");
                            connection.query("UPDATE products SET stock_quantity = stock_quantity-" + answer.quantity + " WHERE item_id = " + answer.item);
                            shopAgain();
                        }
                        else {
                            console.log("We only have " + res[0].stock_quantity + " in our stock! ")
                            shopAgain();

                        };
                    });
                }
            })
        });

    // to continue shopping or exit
    function shopAgain() {
            inquirer
            .prompt({
                name: "action",
                type: "list",
                message: "\n Whould you like to buy something else?",
                choices: [
                    "Yes",
                    "No"
                ]
            })
            .then(function (answer2) {
                switch (answer2.action) {
                    case "Yes":
                        firstPrompt();
                        break;
                    case "No":
                        connection.end();
                        break;
                }
            });
    }
}




