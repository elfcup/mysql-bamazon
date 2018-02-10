var inquirer = require("inquirer");
var mysql = require("mysql");
var table = require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "NeptunePluto101",
    database: "bamazon"
});

connection.connect(function(error) {
    if (error) {
        console.log(error);
    } else {
        runSearch();
    }
});

function runSearch() {
    connection.query("SELECT item_id, product_name, department_name, price FROM products", function(error, result, fields) {
        if (error) {
            console.log(error);
        } else {
            console.table(result);
            // console.log(result);
            askQuestions();
        }
    });
}

function askQuestions() {
    inquirer
        .prompt([{
                type: "input",
                message: "Which item number are you interested in purchasing?",
                name: "itemID"
            },
            {
                type: "input",
                message: "How many of this item would you like to purchase?",
                name: "quantity"
            }
        ])
        .then(function(userResponse) {
            console.log("You selected item number: ", userResponse.itemID);
            console.log("You selected this many item(s): ", userResponse.itemAmount);
            // connection.connect(function(err) {
            //     if (err) throw err;
            connection.query("SELECT item_id, product_name, department_name, price FROM products WHERE item_ID = ?", [userResponse.itemID], function(error, result, fields) {
                    if (error) {
                        console.log(error);
                    }
                    if (userResponse.itemID > 10) {
                        console.log("Item not for sale, please select item number from table");
                        askQuestions();
                    } else {
                        console.table(result);
                        // var stockAmount = connection.query("SELECT stock_quantity FROM products", function(error, results, fields) {
                        //        if (error) {
                        //         console.log(error);
                        //        }
                        //     })

                        //   if (userResponse.quantity > stockAmount) {
                        //     console.log("Not enough stock");
                        //   }

                        // else  {console.log("You may purchase this");
                        //         console.log(result);
                        //     }


                    }

 // console.log("Not enough stock!");

            })
        });

};













// con.connect(function(err) {
//   if (err) throw err;
//   con.query("SELECT * FROM customers", function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);
//   });
// });






// use bamazon;
// create table products (
//   item_id INT NOT NULL auto_increment primary key,
//   product_name VARCHAR(30),
//   department_name VARCHAR(30),
//   price decimal(10, 2),
//   stock_quantity INT
//     );

//     insert into products (product_name, department_name, price, stock_quantity)
//     values ("star wars lego", "toy", 30, 1000);

//     insert into products (product_name, department_name, price, stock_quantity)
//     values ("harry potter lego", "toy", 45, 1000);

//     insert into products (product_name, department_name, price, stock_quantity)
//     values ("lord of rings lego", "toy", 55, 1000);

//     insert into products (product_name, department_name, price, stock_quantity)
//     values ("space lego", "toy", 70, 1000);

//     insert into products (product_name, department_name, price, stock_quantity)
//     values ("monorail lego", "toy", 90, 1000);

//     insert into products (product_name, department_name, price, stock_quantity)
//     values ("mass effect", "video game", 25, 1000);

//     insert into products (product_name, department_name, price, stock_quantity)
//     values ("skyrim", "video game", 25, 1000);

//     insert into products (product_name, department_name, price, stock_quantity)
//     values ("apples", "produce", 5, 1000);

//     insert into products (product_name, department_name, price, stock_quantity)
//     values ("carrot juice", "produce", 5, 1000);

//     insert into products (product_name, department_name, price, stock_quantity)
//     values ("pineapple", "produce", 5, 1000);

//

// getData();

//          console.log(“item_id: “,answers.itemNum);
// console.log(“Amount Ordered: “,answers.quantity);
// for (let i = 0; i < array.length; i++)
// } else {
//     console.log("\nWelcome User!");
//     newUserSearch();
// }
// }