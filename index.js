const express = require("express");
const fs = require("fs");
const app = express();
const port = process.env.PORT;
const products = JSON.parse(fs.readFileSync(`${__dirname}/data/products.json`));
console.log(products);

app.get("/api/v1/products", (req, res) => {
    res.status(200).json({
        status: "success",
        results: products.length,
        data: {
            products,
        },
    });
})

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
