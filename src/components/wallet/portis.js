const Portis = require('@portis/web3');
const portis = new Portis('bedf09f0-224f-45a9-a54e-f1629c9d9592', {
        nodeUrl: 'https://betav2.matic.network',
        chainId: 16110
    });

const portisWallet = {
    getProvider : () => {
        if(portis && portis.provider) {
            return portis.provider;
        }
        throw new Error("web3 provider not found");
    },

    getWalletId: ()=>{
        return 1;
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

    },
    // Whether we can open wallet screen using wallet apis
    isWalletOpenSupported: true,
    openWallet: ()=>{
        return portis.showPortis();
    }
}

export default portisWallet;