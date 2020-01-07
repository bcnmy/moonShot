const getTimeInSeconds = () => {
    return Math.floor(Date.now()/1000);
}

const trim = (price, decimal)=>{
    let trimmedPrice = price;
    try {
        if(trimmedPrice) {
            if(typeof trimmedPrice == 'string') {
                try {
                    trimmedPrice = parseFloat(trimmedPrice);
                } catch(error) {
                    console.log(`Error while converting string value ${trimmedPrice} to float value`);
                }
            }
            if(trimmedPrice && typeof trimmedPrice == 'number') {
                trimmedPrice =  trimmedPrice.toFixed(decimal);
            }
        }
    } catch(error) {
        console.log(`Error while trimming price ${price} upto ${decimal} decimal places`);
    }

    return trimmedPrice;
}

module.exports = {getTimeInSeconds, trim}