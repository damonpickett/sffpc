# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```

Learned from pullpayment contract that asyncTransfer transfers to escrow in a mapping function attached to the address that is owed that money and once that is used you can use withdrawPayments to withdrawPayments

Learned from reddit that ERC1155 contract is what I should use for this type of project (selling different NFTs. It's also more gas efficient)

It seems like you can't use variables from parent contracts but you can use functions.

AlienPoster deployed to: 0xAC4FaA9F63cAABDCFa629ecCEef5C4E8591c3959
RobocopPoster deployed to: 0xCa9A72c91DC755e4583393cC82313845e9E716Fc
SpaceOdyssey deployed to: 0xd845193d8cA06c0025C121d1481e6120A6B8f8BA

npx hardhat verify --network rinkeby --contract contracts/AlienPoster.sol:AlienPoster 0x5FbDB2315678afecb367f032d93F642f64180aa3

npx hardhat verify --network rinkeby --contract contracts/RobocopPoster.sol:RobocopPoster 0xCa9A72c91DC755e4583393cC82313845e9E716Fc

npx hardhat verify --network rinkeby --contract contracts/SpaceOdysseyPoster.sol:SpaceOdyssey 0xd845193d8cA06c0025C121d1481e6120A6B8f8BA

https://testnets.opensea.io/assets/0xAC4FaA9F63cAABDCFa629ecCEef5C4E8591c3959/2

AlienPoster deployed to: 0x267416f0BDD563a9E7A48D4D6E553D08256C1899
RobocopPoster deployed to: 0x10f5533aC1B285CB3ed8bC6F3d0e1f3FFf35490E
SpaceOdyssey deployed to: 0x7247dC8Dd99AFB5B07e8391EDB2fe95243eB2705

function tokenURI(uint256 tokenId_) public view override returns (string memory) {
        require(_exists(tokenId_), 'Token does not exist!');
        return string(abi.encodePacked(baseTokenUri, Strings.toString(tokenId_), ".json"));
    }

0x7Fc49f926509Df6deFcDbBd992141D1394FA5F45

Alien Contract Winner: 0x2AD4344563f9eA73a89B1d3665058c185a781CB6
SOP: 0x244D105ecb52713B1cB971db7589d617D8FEb5f3
Robo: 0x20822036dDC00eaE0cA917897E0bbFb8a01c29F7

OpenSea reads metadata from tokenURI function. THe base uri needs to be for a folder with numbered files. The assigned token ID added to the base uri ends matching the filename. The tutorial for full-mint-website had me adding .json to my uri but I think this is probably unecessary when using ipfs.