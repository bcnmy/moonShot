let config = {};
config.baseURL = `http://localhost:3005`;
config.loginPath = `/v1/users/login`;
config.updatePath = `/v1/users/update`;
config.getNoncePath = `/v1/users/getNonce`;
config.getPricePath = `/v1/price/getPrice`;
config.getSmartContractPath = `/v1/game/smartContract`;
config.symbol = "MATICUSDT";
config.lastPriceUnit = "USDT";
config.betDisplayUnit = "USDT";
config.requestPriceIntervalInSec = 3;
config.socketConnectionURL = `http://localhost:3005`;
config.loginMessageToSign = "Please provide your signature to login. Tracking ID ";
config.betSignMessage = "Please provide your signature to place your bet. Tacking ID ";
config.endGameTopicId="0x80686c7634c916b5d7c21079bc76aa69e483abbe9cb82d47addb4cc7cb3a90d4";
config.betPlacedTopicId="0x129d4e83dabdc677d13f18c9aa3ec10b867b7ca29240cd9c6f8f30611e8f10c5";

config.biconomyDappId = "5e0e2984401a143065a4b069";
config.biconomyAPIKey = "DHBigbvSJ.23ec95d7-e976-4072-8058-c4f8b422ebc2";

config.state = {
    LAUNCH: "LAUNCH",
    PREPARE: "PREPARE",
    WAITING: "WAITING",
    START: "START",
    RESULT: "RESULT"
}

let LS_KEY = {
    LOGGED_IN : "LI",
    USERNAME: "UN",
    USER_ADDRESS: "UA"
}
module.exports = {config, LS_KEY};