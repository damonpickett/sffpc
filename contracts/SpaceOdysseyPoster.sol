// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// imports
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/security/PullPayment.sol';

// contract
contract SpaceOdysseyPoster is ERC721, Ownable, PullPayment {

    // constants
    uint256 public immutable mintPrice;
    uint256 public totalSupply;
    uint256 public immutable maxSupply;
    uint256 public immutable maxPerWallet;
    bool public mintEnabled;
    string internal baseTokenUri;
    mapping (address => uint256) public walletMints;

    // constructor
        // initialize variables
    constructor() payable ERC721('SpaceOdysseyPoster', 'SOP') {
        mintPrice = 0.01 ether;
        totalSupply = 0;
        maxSupply = 1000;
        maxPerWallet = 3;
    }

    event Received(address, uint);
    receive() external payable {
        emit Received(msg.sender, msg.value);
    }

    // functions
    function setMintEnabled(bool mintEnabled_) external onlyOwner {
        mintEnabled = mintEnabled_;
    }

    function setBaseTokenUri(string calldata baseTokenUri_) external onlyOwner {
        baseTokenUri = baseTokenUri_;
    }

    function tokenURI(uint256 tokenId_) public view override returns (string memory) {
        require(_exists(tokenId_), 'Token does not exist!');
        return string(abi.encodePacked(baseTokenUri, Strings.toString(tokenId_)));
    }

    function withdrawPayments(address payable payee) public override onlyOwner virtual {
        super.withdrawPayments(payee);
    }

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
}