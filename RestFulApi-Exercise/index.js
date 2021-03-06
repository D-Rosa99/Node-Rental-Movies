require('express-async-errors');
const config = require('config');
require('./init/api-startUp')();
require('./init/db-startUp')();

if(!config.get('JWTkey')){
    console.error('FATA ERROR: JWTkey is not define');
    process.exit(1);
};

process.on('uncaughtException', () => {
    console.log('there was an error, the execution will end');
    process.exit(1);
});

process.on('unhandledRejection', () => {
    console.log('there was an error, the execution will end');
    process.exit(1);
});
