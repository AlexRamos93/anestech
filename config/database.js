require('dotenv').config();

if (process.env.NODE_ENV === 'test') {
    module.exports = {
        username: process.env.DB_TEST_USERNAME,
        password: process.env.DB_TEST_PASSWORD,
        database: process.env.DATABASE_TEST,
        host: process.env.DB_HOST_TEST,
        dialect: 'mysql',
    };
} else {
    module.exports = {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DATABASE,
        host: process.env.DB_HOST,
        dialect: 'mysql',
    };
}
