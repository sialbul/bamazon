# bamazon
The goal was to create an Amazon-like store front using Node.js and MySQL.

What Each JavaScript Does

BamazonCustomer.js

Prints the products in the store.

Prompts customer which product they would like to purchase by ID number.

Asks for the quantity.

If there is a sufficient amount of the product in stock, it will return the total for that purchase.

However, if there is not enough of the product in stock, it will tell the user that there isn't enough of the product.

If the purchase goes through, it updates the stock quantity to reflect the purchase.

It will also update the product sales in the department table.

BamazonManager.js

Starts with a menu:

View Products for Sale; it lists all of the products in the store including all of their details.

View Low Inventory; it lists all the products with less than five items in their stock.

Add to Inventory;  it allows the manager to select a product and add inventory.

Add New Product; it allows the manager to add a new product to the store.

Delete Product; it will delete the selected item from stock.

End Session; it ends the session and does not go back to the menu.

