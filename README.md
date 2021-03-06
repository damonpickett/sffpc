# Sci-Fi Film Poster Club

## Purpose

The Sci-Fi Film Poster Club is a mock NFT project. I [(Damon Pickett)](https://damonpickett.github.io/portfolio/) built this site to hone my skills in developing front-end interfaces that interact with smart contracts.

This app allows users to connect their ethereum wallets and purchase NFT’s representing the film poster of their choice.

Upon purchasing an NFT with RinkebyETH, the user can then view their NFT on OpenSea’s testnet.

Users are limited to 3 NFTs per poster via the respective smart contract. Each NFT costs 0.01 RinkebyETH.

As the owner, I am able to withdraw the revenue generated by the contracts.

The front-end was built with React.js, Ethers.js, and Hardhat. The smart contracts use the ERC721 standard and were written in Solidity. The metadata for the NFTs is stored on [IPFS](https://ipfs.io/).

If you have any questions and would like to get in touch, please feel free to contact me through my [online portfolio](https://damonpickett.github.io/portfolio/).

## Tech Stack

### Solidity
The smart contracts were written in Solidity. Each poster has its own corresponding ERC721 token. The primary function of the contracts is to allow the user to mint an NFT:

```sol
function mint(uint256 quantity_) public payable {
        require(mintEnabled, 'Minting not enabled.');
        require(msg.value == quantity_ * mintPrice, 'wrong mint value');
        require(totalSupply + quantity_ <= maxSupply, 'sold out');
        require(walletMints[msg.sender] + quantity_ <= maxPerWallet, 'exceed max wallet');
        walletMints[msg.sender] += quantity_;
        _asyncTransfer(owner(), msg.value);

        for (uint i = 0; i < quantity_; i++) {
            uint256 newTokenId = totalSupply + 1;
            totalSupply++;
            _safeMint(msg.sender, newTokenId);
        }
    }
```

The `mint` function first checks that the contract owner has enabled minting, then that the user has submitted the correct amount of RinkebyETH, then that the max supply of the given NFT has not been exceeded, and finally that the user has not purchased more than the alotted three.

The function then records the new NFT purchase by the user via a `mapping` function and transfers the ETH to an escrow account to be withdrawn by the owner.

Finally, a for-loop, based on the quantity of NFTs purchased, runs to mint the new tokens.

### React.js
The front-end was built with React.js. It is a simple, two-page site with a Home page, and an About page. The most prominent feature of the front-end is the `Minter` component which houses the `Poster` components.

Each `Poster` component contains a poster, buttons for incrementing or decrementing the quantity amount, and an input field which displays the quantity selected. Beneath these controls is the 'MINT' button which is displayed through conditional rendering. If the user has not connected their Ethereum wallet then the message "Connect your wallet to mint" is displayed instead:

`Poster.js`
```js
 {isConnected ? (
                <button onClick={props.onClick}className='mint-button ripple'>Mint</button>
                ) : (
                    <p>Connect your wallet to mint</p>
                )}
```

Each `Poster` component inherits its properties via `useState`:

`Minter.js`
```js
return (
        <div className='minter'>
            <Poster
                src={space}
                onClick={handleSpaceOdysseyMint} 
                mintAmount={mintAmount}
                setMintAmount={setMintAmount}
                accounts={accounts} 
                setAccounts={setAccounts}
                />
            <Poster 
                src={alien}
                onClick={handleAlienMint}
                mintAmount={mintAmount}
                setMintAmount={setMintAmount}
                accounts={accounts} 
                setAccounts={setAccounts}
                />
            <Poster 
                src={robocop}
                onClick={handleRobocopMint}
                mintAmount={mintAmount}
                setMintAmount={setMintAmount}
                accounts={accounts} 
                setAccounts={setAccounts}
                />
        </div>
    )
```

### Ethers.js
Ethers.js is used to allow the front-end to communicate with the smart contract:

`Minter.js`
```js
async function handleSpaceOdysseyMint() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                spaceOdysseyAddress,
                spaceOdysseyPosterNFT.abi,
                signer
            );
            try {
                const response = await contract.mint(BigNumber.from(mintAmount), {
                    value: ethers.utils.parseEther((0.01 * mintAmount).toString())
                });
                console.log('response: ', response);
            } catch (err) {
                console.log('error: ', err)
            }
        }
    }
```

When minting a token, first we create an object representing our wallet called `provider`. This is done with via `ethers.providers.Web3Provider(window.ethereum)`

We then assign the wallet address to our `signer` variable via `provider.getSigner();`

We then create a `contract` object via `ethers.Contract` which bundles our contract address, contract abi, and signer.

We now have access to our contract's functionality. We call the `mint` function and employ the ether.js `BigNumber` object which allows for mathematical operations on numbers outside of javascript's safe range of values.

### Hardhat
By installing Hardhat, we are able to access hardhat functions through our CLI that allow us to `clean`, `compile`, `run` scripts, and `verify` our smart contract on the blockchain (which allows us to use read its code and use its functions on the [block explorer](https://rinkeby.etherscan.io/))

Hardhat also gives us our `hardhat.config.js` file where we connect our app and wallet to the network/blockchain.

## Lessons Learned

### One Contract is Better than Three
In this project I was building on the skills I'd learned in my last project in which I wrote a smart contract in the ERC721 standard. That project however only featured one type of token. I did not consider how building for three different tokens might change alter my code as compared to my previous project.

As I approached this problem and what it would mean for my code, I reached out to the community on the Solidity subreddit and asked them what the appropriate standard is. I learned that I could use ERC721, but that ERC1155 was developed for this purpose specifically.

I decided to stick with ERC721 for this project. I recognize that it's sub-optimal, but I thought that it would be best for my development in the long run to accustomize myself with ERC721 further, and to use the ERC1155 in my next project.

I'm glad I did. In doing so I learned more about Solidity without the further complication of learning a new standard simultaneously. The experience I've gained in writing in Solidity I can take with me to my next project.

### How OpenSea Reads Metadata
In building my last project (which was guided), it never sunk in for me how OpenSea read my NFT's metadata. In building this project, I struggled to get my images and image descriptions displayed on the OpenSea testnet. I learned that OpenSea finds the metadata through the `tokenURI` function in my smart contract.

```sol
function tokenURI(uint256 tokenId_) public view override returns (string memory) {
        require(_exists(tokenId_), 'Token does not exist!');
        return string(abi.encodePacked(baseTokenUri, Strings.toString(tokenId_)));
    }
```

This showed me how to structure my metadata locally (naming the json files with numbers which essentially go on to be their token ID's), and how to set my base token URI.


