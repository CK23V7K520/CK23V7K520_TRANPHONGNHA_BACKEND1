const app = require("./app");
const config = require("./app/config");
const MongoDB = require("./app/utils/mongodb.util");

//start server
// const POST = config.app.port;
// app.listen(POST, () => {
//     console.log(`Server is running on port ${POST}.`);
//  });

async function startServer() {
    try {
        // console.log(config);
        // console.log(MongoDB);
        console.log(config.db?.uri);

        await MongoDB.connect(config.db.uri);
        console.log("Connect to the database!");

        const PORT = config.app.port;
        app.listen(PORT, () => {
            console.log(`Server connect to the database! ${PORT}`);
        });
    } catch (error) {
        console.log("Cannot connect to the database!", error);
        process.exit();
    }
}

startServer();