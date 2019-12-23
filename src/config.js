let config = {};
config.baseURL = `http://localhost:3005/v1`;
config.loginPath = `/users/login`;
config.updatePath = `/users/update`;
config.getNoncePath = `/users/getNonce`;
config.getPricePath = `/price/getPrice`;
config.symbol = "MATICUSDT";

let LS_KEY = {
    LOGGED_IN : "LI",
    USERNAME: "UN",
    USER_ADDRESS: "UA"
}
module.exports = {config, LS_KEY};