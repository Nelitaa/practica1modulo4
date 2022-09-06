const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.json());

const port = process.env.PORT;

const getAllProducts = (req, res) => {
    const products = JSON.parse(fs.readFileSync(`${__dirname}/data/products.json`)
);
        
    res.status(200).json({
        status: "success",
        results: products.length,
        data: {
            products,
        },
    });
}

const addProducts = (req, res) => {
    const products = JSON.parse(fs.readFileSync(`${__dirname}/data/products.json`)
);
products.push(req.body);
fs.writeFileSync(`${__dirname}/data/products.json`, JSON.stringify(products));
res.status(200).json({
    status: "success",
        data: {
            products,
        },
    });
}

const getProductById = (req, res) => {
    const products = JSON.parse(fs.readFileSync(`${__dirname}/data/products.json`)
);

    const foundProduct = products.find(p => p.id == req.params.id);
    if(foundProduct){
        return res.status(200).json({
            status: "success",
            data: {
                product: foundProduct,
            },
        });     
    } 
    res.status(404).json({
        status: "not found",  
    });   
}

app.get("/api/v1/products", getAllProducts);
app.post("/api/v1/products", addProducts);
app.get("/api/v1/products/:id", getProductById);

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
