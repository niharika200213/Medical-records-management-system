require('babel-register');
require('dotenv').config();

module.exports = {

  networks: {
    development:{
      host:"127.0.0.1",
      port:8545,
      network_id:"*",
      chainId:"2018"
    },
  },
  contracts_directory:'./src/contracts/',
  contracts_build_directory:'./src/abis/',
  compilers: {
    solc: {
      version: "0.8.13",  
      optimizer:{
        enabled:true,
        runs:200
      }   
    }
  },
};