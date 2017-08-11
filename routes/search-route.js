// Dependencies
// =============================================================
const express = require('express');

const router = express.Router();
const db = require("../models");

//search
// =============================================================
router.get('/search', (req, res, next) => {
    console.log(req.query);
    let plantName = req.query.plantName;
    db.plants.findAll({
        where: {
            name: {
                $like: `%${plantName}%`
            }
        }
    }).then(function (data) {
        let hbsObject = {};
        if (data.length === 1) {
            hbsObject = {
                results: data[0], 
            }
            
            // let plantData = data[0];
            // let favData = data[0].favorites;
            // let isFav = false;
            // let userId = req.user.userId;
    
            // for(let i = 0; i < favData.length; i++){
            //     if(favData[i].userId === userId){
            //         isFav = true
            //     }
            // }
            
            // console.log(data[0].favorites.length);
            // console.log(JSON.stringify(data));
            // console.log("isFav: ", isFav);
            
            res.render('plant', hbsObject);
        } else {
            console.log("Number of results: ", data.length);
            hbsObject = {
                results: data, 
                searchTerm: plantName, 
                resultCount: data.length
            }
            res.render('results', hbsObject);
        }
    });
});

module.exports = router;