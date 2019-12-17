let config = {};
config.baseURL = `http://localhost:3000`;
config.loginPath = `/users/login`;
config.updatePath = `/users/update`;
config.getNoncePath = `/users/getNonce`;
config.getPricePath = `/getprice`;

let LS_KEY = {
    LOGGED_IN : "LI",
    USERNAME: "UN",
    USER_ADDRESS: "UA"
}
module.exports = {config, LS_KEY};