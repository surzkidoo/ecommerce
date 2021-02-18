const {
    query
} = require('express');
const express = require('express')
const router = express.Router()
const categorymodel = require('../models/category.js');

var category = new categorymodel();


router.get("/add/", (req, res) => {
 res.render("addcategory");
})


router.get("/paginate", (req, res) => {
    var call = async () => {

        data = await category.paginate(1);
        console.log(data);

    }

    call();

});


router.get("/:slug/", (req, res) => {
    var data = {};
    slug = req.params.slug.replace(/-/g, (' '));
    var label = {
        slug
    }

    var call = async () => {
        try {
            let page = 0;
            qs="?";
            for( let [name,value] of Object.entries(req.query)){
                if(name=="p") break;
                qs+=`${name}=${value}&`;
            }
            if(qs.lenght>1) qs.substring(0,qs.length-1);
            if (req.query.p != null) {
                page = req.query.p;
            }
            if (req.query.brand != null && req.query.min != null && req.query.max != null) {
                data = await category.filter(slug, req.query.brand, Number.parseInt(req.query.min), Number.parseInt(req.query.max), page);
                size = await category.filterSize(slug, req.query.brand, Number.parseInt(req.query.min), Number.parseInt(req.query.max));
                
            } else {
                data = await category.get(slug, page);
                size= await category.size(slug)
            }
            res.render("category.ejs", {
                Data: data,
                category: label,
                size,
                page,
                qs
            });

        } catch (e) {
            console.log(e);
        }
    }
    call();

})



router.post("/delete", (req, res) => {

})
router.get("/all", (req, res) => {

})
module.exports = router;