const http = require('http');

const config = require('./config/config');
const initApi = require('./api');

async function run() {
    const expressApp = await initApi(config);
    const server = http.createServer(expressApp);

    const port = config.server.PORT || 3000;
    server.listen(port, () => {
        // eslint-disable-next-line no-console
        console.log(`Server started @ ${port}`);
    });

    process.on('unhandledRejection', (err) => {
        // eslint-disable-next-line no-console
        console.error('unhandledRejection', err);
    });
}

run();
