const express = require("express");
const fs = require("fs");
const morgan = require("morgan");
const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})

const port = process.env.PORT;

const getAllProducts = (req, res) => {
    const products = JSON.parse(fs.readFileSync(`${__dirname}/data/products.json`)
);
    console.log(req.requestTime);    
    res.status(200).json({
        status: "success",
        timeOfRequest: req.requestTime,
        results: products.length,
        data: {
            products,
        },
    });
}

const addProduct = (req, res) => {
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
const productRouter = express.Router();
app.use("/api/v1/products", productRouter);

productRouter.route("/").get(getAllProducts).post(addProduct);
productRouter.route("/:id").get(getProductById);

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
