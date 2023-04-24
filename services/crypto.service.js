const cryptoJS = require('crypto-js')
require('../config/config')

const encrypt =  async function(plaintext){
    let ciphertext;
    ciphertext = cryptoJS.AES.encrypt(plaintext.toString(),CONFIG.secretKey).toString();
    return ciphertext;
}
module.exports.encrypt = encrypt

const decrypt = async function(ciphertext){
    let plaintext;
    const bytes = cryptoJS.AES.decrypt(ciphertext.toString(),CONFIG.secretKey);
    plaintext = bytes.toString(cryptoJS.enc.Utf8);
    console.log('check121',plaintext);
    return plaintext
}

module.exports.decrypt = decrypt