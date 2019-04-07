const connect = require('connect');
const serveStatic = require('serve-static');
const openBrowser = require("react-dev-utils/openBrowser");

connect()
    .use(serveStatic(__dirname))
    .listen(8080, function () {
        const url = "http://localhost:8080";

        console.log(`Server running on 8080...`);
        console.log(`Launching ${url}...`);

        openBrowser(url);
    });