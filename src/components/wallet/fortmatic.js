const FortMatic = require('fortmatic');
const {config} = require('../../config');
const fortmatic = new FortMatic(config.fortmaticId, {
        rpcUrl: config.RPCURL,
        chainId: config.networkID
    });

const fortMaticWallet = {
    getProvider : () => {
        if(fortmatic && fortmatic.getProvider) {
            return fortmatic.getProvider();
        }
        console.log("web3 provider not found");
        throw new Error("web3 provider not found");
    },

    getWalletId: ()=>{
        return 2;
    },
    getUserAccount: async (web3)=> {
        if(web3) {
            let accounts = await web3.eth.getAccounts();
            if(accounts && accounts.length) {
                return accounts[0];
            }
        }
        return;
    },

    init: async ()=>{
        await fortmatic.getProvider().enable();
    },
    isWalletOpenSupported: false
}

export default fortMaticWallet;