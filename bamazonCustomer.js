var mysql = require("mysql");
var inquirer = require("inquirer");
var consoleTable = require('console.table');
var price;
var quantity;
var total;
var stock;
var product;
var id;
var remaining_stock;
var products = [];

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
  displayProducts();
});

function displayProducts() {
  connection.query("SELECT item_id, product_name, price, stock_quantity from products", function(err, response){
      
    for(var i = 0; i < response.length; i++){
      
      products[i] = [response[i].item_id, response[i].product_name, "$"+response[i].price, response[i].stock_quantity];

    };
    console.table(["Item ID", "Product Name", "Price", "Stock"], products)
      
    buyProduct();
  });

};

 function buyProduct(){
    console.log("");
   inquirer
     .prompt([
         {
            name: "product",
            type: "input",
            message: "Enter the item number of the product you would like to purchase"
         },
         {
            name: "quantity",
            type: "input",
            message: "How many would you like to buy?"
         }

      ]).then(function(answer){
        
          connection.query(
            "SELECT item_id, price, product_name, stock_quantity FROM products WHERE item_id = " + answer.product, function(err, results){
              if(err) throw err;
                price = results[0].price;
                stock = results[0].stock_quantity;
                product = results[0].product_name;
                id = results[0].item_id;
                quantity = answer.quantity;
                total = price * quantity;
                remaining_stock = stock - quantity;

              if(stock > quantity)
                {
                  console.log("");
                  console.log("You sucessfully purchased " + quantity + " " + product + "(s)");
                  console.log("Your total for this purchase is: $" + total);
                  console.log("Remaining stock: " + remaining_stock);
                  console.log("");

                  connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                      {
                        stock_quantity: remaining_stock
                      },
                      {
                        item_id: id
                      }
                    ])
                      inquirer.
                        prompt([
                          {
                            name: "restart",
                            type: "list",
                            message: "Would you like to purchase another item?",
                            choices: ["YES", "NO"]
                          }
                        ]).then(function(answer){

                          

                            if(answer.restart === "YES")
                            {
                              console.log("you chose to buy another product");
                              displayProducts();
                            }
                            else
                            {
                              console.log("program ends here");
                              connection.end();
                            }
                  })
                    
                }
              else
                {
                  console.log("");
                  console.log("INSUFFICIENT QUANTITY, PLEASE RESELECT AN ITEM");
                  displayProducts();
                }      

            })
        
          
      }) 
}


