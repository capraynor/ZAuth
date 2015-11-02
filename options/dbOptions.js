/**
 * Created by raynorchan on 15-11-2.
 */
module.exports = {
    DBADDRESS: 'mongodb://localhost/ZAuth',
    DBOPT:{
        server: {poolSize: 5},
        user: process.env.DB_USERNAME || "",
        pass: process.env.DB_PASSWORD || "",
        auto_reconnect: true,
        socketOptions: {keepAlive: 1}
    }
};