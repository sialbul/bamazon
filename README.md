# bamazon
The goal was to create an Amazon-like store front using Node.js and MySQL.


<strong><h2> What Each JavaScript Does</h2></strong>

Created a database in MySql and named Bamazon.

Created a table in database called Products with the following columns:
<ol>

<li>item_id (unique id for each product)</li>

<li>product_name (Name of product)</li>

<li>department_name</li>

<li>price (cost to customer)</li>

<li>stock_quantity (how much of the product is available in stores)</li>
</ol>

I populated the database with 10+ different products.

There is a Node application called BamazonCustomer.js. Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.

<strong>BamazonCustomer.js</strong>
<ul>
<li>Prints the products in the store.</li>

<li>Prompts customer which product they would like to purchase by ID number.</li>

<li>Asks for the quantity.</li>

<li>If there is a sufficient amount of the product in stock, it will return the total for that purchase.</li>

<li>However, if there is not enough of the product in stock, it will tell the user that there isn't enough of the product.</li>

<li>If the purchase goes through, it updates the stock quantity to reflect the purchase.</li>

<li>It will also update the product sales in the department table.</li>
</ul>

<strong>BamazonManager.js</strong>

Starts with a menu which shows;

<ul>
<li>View Products for Sale; it lists all of the products in the store including all of their details.</li>

<li>View Low Inventory; it lists all the products with less than five items in their stock.</li>

<li>Add to Inventory;  it allows the manager to select a product and add inventory.</li>

<li>Add New Product; it allows the manager to add a new product to the store.</li>

<li>Delete Product; it will delete the selected item from stock.</li>

<li>End Session; it ends the session and does not go back to the menu.</li>
</ul>

