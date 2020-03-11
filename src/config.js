let config = {};
config.fortmaticError="Error: Failed to subscribe to new newBlockHeaders to confirm the transaction receipts.";
config.loginPath = `/v1/users/login`;
config.updatePath = `/v1/users/update`;
config.getNoncePath = `/v1/users/getNonce`;
config.getPricePath = `/v1/price/getPrice`;
config.withdrawFunds = `/v1/users/withdraw`;
config.depositFunds = `/v1/deposit/deposit-funds`;
config.updateTxn = `/v1/users/withdraw/update-hash`;
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
    config.fortmaticId="pk_live_B854A73ECD01198D";
    config.env = "prod";
} else if(process.env.REACT_APP_STAGE === "test") {
    config.baseURL = `https://test.api.moonshot.biconomy.io`;
    config.socketConnectionURL = `https://test.api.moonshot.biconomy.io`;
    config.biconomyDappId = "5e0e2984401a143065a4b069";
    config.biconomyAPIKey = "DHBigbvSJ.23ec95d7-e976-4072-8058-c4f8b422ebc2";
    config.RPCURL = "https://testnet2.matic.network";
    config.networkID="8995";
    config.portisDappId = "f5515b6f-1f87-4988-9ecc-9d0556ed50d2";
    config.fortmaticId="pk_test_E711F7ECCF0C5727";
    config.env = "test";
} else {
    config.baseURL = `http://localhost:5000`;
    config.socketConnectionURL = `http://localhost:5000`;
    config.biconomyDappId = "5e4fbfeb017972c16c62d934";
    config.biconomyAPIKey = "895snrqRM.6208f104-4ff3-4051-b818-8ab73d951acb";
    config.RPCURL = "https://testnet2.matic.network";
    config.networkID="8995";
    config.portisDappId = "f5515b6f-1f87-4988-9ecc-9d0556ed50d2";
    config.fortmaticId="pk_test_E711F7ECCF0C5727";
    config.env = "test";
}

let LS_KEY = {
    LOGGED_IN : "LI",
    USERNAME: "UN",
    USER_ADDRESS: "UA",
    WALLET_SELECTED: "WS"
}
module.exports = {config, LS_KEY};