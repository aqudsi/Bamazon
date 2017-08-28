# Bamazon

Reference the screenshots directory, with the respective png files for this explanation:

Explanation for bamazonCustomer.js

bamazon_functionality.png

	-This image displays the initial table of products.

	-The program then asks you to enter an item number, and how many you'd like to purchase (3 laptops in this case)

	-Based on your entry, it will display a success message with the item of choice and its respective quantity.

	-it will also display the total cost for the purchase ($3000 in this case) and the remaining stock for the item (7 in this case)

	-then it asks you if you'd like to purchase another item in a list format
	-in the background, the database is updated

bamazon_functionality2.png

	-this image displays everything from the last image as well as the updated table.
	-we selected to purchase another product, so the program displays the updated table and asks you which item you'd like to buy as well as the quantity. 
	-we chose to purchase 4 CD Albums, for $40. The remaining stock is 6.

bamazon_functionality3.png

	-displays the table and results from bamazon_functionality3.png
	-we chose not to purchase another item, so the program ends 

bamazon_functionality4.png

	-this image shows what happens when you attempt to purchase more of an item than is available in stock

	-the program will log "INSUFFICIENT QUANTITY, PLEASE RESELECT AN ITEM" and the program will display the table again, and ask you to enter an item number and how many you'd like to purchase. 
=======================================================================================================================================================

Explanation for bamazonManager.js
 
bamazon_functionality5.png

	-establishes connection to Bamazon database

	-gives you 4 options:
		-View Products for Sale
		-View Low Inventory
		-Add to Inventory
		-Add New Product

bamazon_functionality6.png		

	-if you select View Products for Sale, it displays all the current items in the database with their respective ids, names, prices, and stocks. it then asks you if you'd like to do something else (brings you back to selection screen)

	-if you select view Low Inventory, it displays the item number, name, price, and stock of any items in the database that have less than 5 in their stock. it then asks you if you'd like to do something else (brings you back to selection screen)

	-if you select Add to Inventory, it asks you to enter in the item number of the product you'd like to add to, and the quantity. After that it tells you how many you just added to that item's stock, and the new total. it then asks you if you'd like to do something else (brings you back to selection screen)

	-if you select Add New Product, it asks you to enter in the name of the product you're adding, the quantity for its stock, which department, and to set the price. It'll then display a message telling you what you just did, and then asks you if you'd like to do something else (brings you back to selection screen)
	
bamazon_functionality7.png
	-shows the changes we made earlier
	-this also shows that the program ends once you select NO for "would you like to do something else"