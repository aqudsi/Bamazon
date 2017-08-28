var mysql = require("mysql");
var inquirer = require("inquirer");
var consoleTable = require('console.table');
var addInventory;
var price;
var stock;
var product;
var id;
var inventory = [];
var inventoryLow = [];



// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  console.log("\nConnected to the Bamazon database \n");
  options();
  // pulls 

});

function productsForSale(){
	console.log("")
	connection.query("SELECT item_id, product_name, price, stock_quantity from products", function(err, response){
      
    for(var i = 0; i < response.length; i++){
      
      inventory[i] = [response[i].item_id, response[i].product_name, "$"+response[i].price, response[i].stock_quantity];

    };
    console.table(["Item ID", "Product Name", "Price", "Stock"], inventory)
    restart();
  });
  
}  

function lowInventory(){
	console.log("")
	console.log("Low Inventory:")
	console.log("")
		connection.query("SELECT item_id, product_name, price, stock_quantity from products", function(err, response){
			for(var i = 0; i < response.length; i++){
		      if(response[i].stock_quantity < 5){
		      	inventoryLow[i] = [response[i].item_id, response[i].product_name, "$"+response[i].price, response[i].stock_quantity];
		  	  }
		    };
   		 	console.table(["Item ID", "Product Name", "Price", "Stock"], inventoryLow)
			console.log("")
			  inquirer.
			    prompt([
			      {
			        name: "add",
			        type: "list",
			        message: "Would you like to add to the inventory?",
			        choices: ["YES", "NO"]
			      }
			    ]).then(function(answer){

			        if(answer.add === "YES")
			        {
			          addToInventory();
			        }
			        else
			        {
			          options();
			        }
				});
		});
	
}

function addToInventory(){
	console.log("")
	console.log("Add to Inventory:")
	console.log("")

	inquirer
     .prompt([
         {
            name: "product",
            type: "input",
            message: "Enter the item number of the product you would like to add to"
         },
         {
            name: "quantity",
            type: "input",
            message: "How many would you like to add to the stock?"
         }

      ]).then(function(answer){
      	  connection.query(
		    "SELECT item_id, product_name, stock_quantity FROM products WHERE item_id = " + answer.product, function(err, results){
		      if(err) throw err;
		        stock = parseInt(results[0].stock_quantity);
		        product = results[0].product_name;
		        quantity = parseInt(answer.quantity);
		      	addInventory = parseInt(quantity + stock);
		      	id = answer.product;
		      
		  connection.query(
            "UPDATE products SET ? WHERE ?",
	            [
	              {
	                stock_quantity: addInventory
	              },
	              {
	                item_id: id
	              }
	            ])
		    console.log("")
		  	console.log("You added " +  quantity + " " + product + "(s) to Bamazon's stock")
		  	console.log("There are now a total of " + parseInt(addInventory) + " " + product + "(s) in Bamazon's stock")
			restart();
		});
      });
	};
	
function addNewProduct(){
	console.log("")
	console.log("Add New Product")
	console.log("")

	inquirer
     .prompt([
         {
            name: "product",
            type: "input",
            message: "Enter the name of the product you would like to add:"
         },
         {
            name: "stock",
            type: "input",
            message: "How many would you like to add to Bamazon's stock?"
         },
         {
            name: "department",
            type: "input",
            message: "Which department should it be added to?"
         },
         {
            name: "price",
            type: "input",
            message: "Set the price of the product:"
         }
      ]).then(function(answer){
	      	var newProduct = answer.product;
	      	var newStock = answer.stock;
	      	var newDepartment = answer.department;
	      	var newPrice = parseInt(answer.price);

	      	connection.query(
	      		"INSERT INTO products SET ?",
			        {
			          product_name: newProduct,
			          stock_quantity: newStock,
			          department_name: newDepartment,
			          price: newPrice
			        },
			        console.log("\nYou added " + newStock + " " + newProduct + "(s) to the " + newDepartment + " department, priced at $" + newPrice + " each." )
	      		)
	      	restart();
      });
	
}

function restart(){
  console.log("");
  inquirer.
    prompt([
      {
        name: "restart",
        type: "list",
        message: "Would you like to do something else?",
        choices: ["YES", "NO"]
      }
    ]).then(function(answer){

        if(answer.restart === "YES")
        {
          options();
        }
        else
        {
          console.log("program ends here");
          connection.end();
        }
	});
}	

function options(){
  console.log("");
  inquirer
	.prompt([
		{
			name: "options",
			type: "list",
			message: "What would you like to do?",
			choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
		}
	]).then(function(answer){
		switch(answer.options){
		  case "View Products for Sale":
			productsForSale();
			break;

		  case "View Low Inventory":
		  	lowInventory();
		  	break;

		  case "Add to Inventory":
		  	addToInventory();
		  	break;

		  case "Add New Product":
		  	addNewProduct();
		  	break;	  		
		}
	});
}	

