let config = {};
config.loginPath = `/v1/users/login`;
config.updatePath = `/v1/users/update`;
config.getNoncePath = `/v1/users/getNonce`;
config.getPricePath = `/v1/price/getPrice`;
config.getSmartContractPath = `/v1/game/smartContract`;
config.symbol = "MATICUSDT";
config.lastPriceUnit = "USDT";
config.betDisplayUnit = "USDT";
config.requestPriceIntervalInSec = 3;
config.loginMessageToSign = "Please provide your signature to login. Tracking ID ";
config.betSignMessage = "To confirm your bet, press the sign button below. Tacking ID ";
config.endGameTopicId="0x80686c7634c916b5d7c21079bc76aa69e483abbe9cb82d47addb4cc7cb3a90d4";
config.betPlacedTopicId="0x129d4e83dabdc677d13f18c9aa3ec10b867b7ca29240cd9c6f8f30611e8f10c5";

config.state = {
    LAUNCH: "LAUNCH",
    PREPARE: "PREPARE",
    WAITING: "WAITING",
    START: "START",
    RESULT: "RESULT"
}

if(process.env.REACT_APP_STAGE === "prod") {
    config.baseURL = `https://api.moonshot.biconomy.io`;
    config.socketConnectionURL = `https://api.moonshot.biconomy.io`;
    config.biconomyDappId = "5e389e2fcdbe6d2ddbc27d97";
    config.biconomyAPIKey = "Ks6sfLzT0.d82ce0fe-8d59-4809-986e-361cd4959ae7";
    config.RPCURL = "https://betav2.matic.network";
    config.networkID="16110";
    config.portisDappId = "bedf09f0-224f-45a9-a54e-f1629c9d9592";
} else if(process.env.REACT_APP_STAGE === "test") {
    config.baseURL = `https://test.api.moonshot.biconomy.io`;
    config.socketConnectionURL = `https://test.api.moonshot.biconomy.io`;
    config.biconomyDappId = "5e0e2984401a143065a4b069";
    config.biconomyAPIKey = "DHBigbvSJ.23ec95d7-e976-4072-8058-c4f8b422ebc2";
    config.RPCURL = "https://testnet2.matic.network";
    config.networkID="8995";
    config.portisDappId = "f5515b6f-1f87-4988-9ecc-9d0556ed50d2";
} else {
    config.baseURL = `http://localhost:3010`;
    config.socketConnectionURL = `http://localhost:3010`;
    config.biconomyDappId = "5e0e2984401a143065a4b069";
    config.biconomyAPIKey = "DHBigbvSJ.23ec95d7-e976-4072-8058-c4f8b422ebc2";
    config.RPCURL = "https://testnet2.matic.network";
    config.networkID="8995";
    config.portisDappId = "f5515b6f-1f87-4988-9ecc-9d0556ed50d2";
}

let LS_KEY = {
    LOGGED_IN : "LI",
    USERNAME: "UN",
    USER_ADDRESS: "UA"
}
module.exports = {config, LS_KEY};