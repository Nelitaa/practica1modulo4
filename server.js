const mongoose =require("mongoose");
process.on("uncaughtException", (err) => {
    console.log("uncaughtException");
    console.log("Shutting dow");
    process.exit(1);
});
const Product = require("./models/Product");
const app = require("./app");
const port = process.env.PORT;
mongoose.connect(process.env.DATABASE, {}).then((con) => {
    console.log("Connected to mongo");
});

const server = app.listen(port, () => {
    console.log(`App running on port ${port}`);
});

process.on("unhandledRejection", (err) => {
    console.log("unhandledRejection");
    console.log("Shutting dow");
    server.close(() => {
        process.exit(1);
    });
});
