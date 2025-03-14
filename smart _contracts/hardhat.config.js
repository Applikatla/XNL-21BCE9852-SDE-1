require("@nomicfoundation/hardhat-toolbox");

//https://eth-holesky.g.alchemy.com/v2/URsTZprMHu2Gbqs0fFdHnX7I0hSl5dkX

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.27",
  networks: {
    holesky: {
      url: 'https://eth-holesky.g.alchemy.com/v2/URsTZprMHu2Gbqs0fFdHnX7I0hSl5dkX',
      accounts: [ 'Add your metamask private key to deploy your contract' ]
    }
  }
};
