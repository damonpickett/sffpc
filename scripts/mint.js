const { task } = require('hardhat/config');
const { getContract } = require('./helpers');
const fetch = require('node-fetch');

// Set base token URI
task('set-base-token-uri', 'Sets the base token URI for the deployed smart contract')
.addParam('baseUrl', 'The base of the tokenURI endpoint to set')
.setAction(async function (taskArguments, hre) {
    const contract = await getContract('AlienPoster', hre);
    const transactionResponse = await contract.setBaseTokenUri(taskArguments.baseUrl, {
        gasLimit: 500_000,
    });
    console.log(`Transaction Hash: ${transactionResponse.hash}`);
});

// Mint a token to an address
task("mint", "Mints from the NFT contract")
.addParam("address", "The address to receive a token")
.setAction(async function (taskArguments, hre) {
    const contract = await getContract("AlienPoster", hre);
    const transactionResponse = await contract.mint(taskArguments.address, {
        gasLimit: 500_000,
    });
    console.log(`Transaction Hash: ${transactionResponse.hash}`);
});

// Retrieve the token URI based on token ID
task("token-uri", "Fetches the token metadata for the given token ID")
.addParam("tokenId", "The tokenID to fetch metadata for")
.setAction(async function (taskArguments, hre) {
    const contract = await getContract("AlienPoster", hre);
    const response = await contract.tokenUri(taskArguments.tokenId, {
        gasLimit: 500_000,
    });
    
    const metadata_url = response;
    console.log(`Metadata URL: ${metadata_url}`);

    const metadata = await fetch(metadata_url).then(res => res.json());
    console.log(`Metadata fetch response: ${JSON.stringify(metadata, null, 2)}`);
});