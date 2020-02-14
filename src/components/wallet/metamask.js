const metamaskWallet = {
    getProvider : () => {
        if(window && window.ethereum) {
            return window.ethereum;
        }
        throw new Error("web3 provider not found");
    },

    getWalletId: ()=>{
        return 3;
    },
    getUserAccount: async (web3)=> {
        await window.ethereum.enable();
        if(web3) {
            let accounts = await web3.eth.getAccounts();
            if(accounts && accounts.length) {
                return accounts[0];
            }
        }
        return;
    },
    init: async ()=>{
        if(window.ethereum) {
            await window.ethereum.enable();
        }
    },
    // Whether we can open wallet screen using wallet apis
    isWalletOpenSupported: false
}

export default metamaskWallet;