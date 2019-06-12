var express = require('express');
var app = express();
var jsonfile = require('jsonfile')
var countBy = require('count-by')
var fastSort = require('fast-sort')

app.get('/', function(req, res) {
    
    var file = 'pizzas.json';
    jsonfile.readFile(file, function (err, data) {
        if (err) return res.status(200).send({error: "can't read json file: " +  err});
        
        var ingredients = countBy(data, 'toppings');
        var items = [];

        for (var i=0; i<= Object.keys(ingredients).length -1; i++ ){
            items.push({pizza: Object.keys(ingredients)[i], total: Object.values(ingredients)[i]});
        }

        var rev = fastSort(items).by([
            { desc: u => u.total },
        ]);

       return res.status(200).send(rev);
    })
});

app.listen(3000, function() {
  console.log("Server running in http://localhost:3000");
});