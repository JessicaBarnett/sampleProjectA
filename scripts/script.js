$(document).ready(function(){

  // Renders 2 sample templates.
  
  function userTable() {
    var data = { users: [
                  {username: "alan", firstName: "Alan", lastName: "Johnson", email: "alan@test.com" },
                  {username: "allison", firstName: "Allison", lastName: "House", email: "allison@test.com" },
                  {username: "ryan", firstName: "Ryan", lastName: "Carson", email: "ryan@test.com" }
              ]};
    $("#user-table").html(App.templates.user_table(data));
  }

  function shoes() {
    var shoesData = [{name: 'nike', price: 68.00},
                     {name: 'converse', price: 40.00},
                     {name: 'sandals', price: 20.00}];

     $("#shoe-list").append (App.templates.shoe_list(shoesData));
  }

  userTable();
  shoes();
});
