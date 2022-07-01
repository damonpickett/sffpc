import React from 'react';

const Modal = (props) => {
    if (!props.modal) {
        return null
    }

    return (
        <div className="modal" onClick={() => props.setModal(false)}>
            <div className="modal-canvas">
                <div className='exit-button'>
                    <button onClick={() => props.setModal(false)}>X</button>
                </div>
                <div className="modal-header">
                    <h3>Instructions</h3>
                 </div>
                <div className="modal-body">
                    <p>Connect your Ethereum wallet via the 'Connect Wallet' button</p>
                    <p>Connect your wallet to the Rinkeby Testnet</p>
                    <p>You'll need RinkebyETH tokens to interact with the blockchain. You can collect RinkebyETH from the <a href='https://rinkebyfaucet.com/' target='_blank' rel='noreferrer'>Rinkeby Faucet</a></p>
                    <p>Once your wallet is connected you'll be able to choose the number of tokens you'd like to mint. The maximum is 3</p>
                    <p>Click the 'Mint' button to purchase an NFT. You can verify your transaction via your wallet address' transaction history in the <a href='https://rinkeby.etherscan.io/' target='_blank' rel='noreferrer'>Rinkeby Testnet</a></p>
                </div>
                <div className="modal-header">
                    <h3>Further Info</h3>
                </div>
                <div className="modal-body">
                    <p>Click <a href='https://rinkeby.etherscan.io/address/0x244D105ecb52713B1cB971db7589d617D8FEb5f3#code' target='_blank' rel='noreferrer'>here</a> to view the '2001: A Space Odyssey' NFT's smart contract.</p>
                    <p>Click <a href='https://rinkeby.etherscan.io/address/0x2AD4344563f9eA73a89B1d3665058c185a781CB6#code' target='_blank' rel='noreferrer'>here</a> to view the 'Alien' NFT's smart contract.</p>
                    <p>Click <a href='https://rinkeby.etherscan.io/address/0x20822036dDC00eaE0cA917897E0bbFb8a01c29F7#code' target='_blank' rel='noreferrer'>here</a> to view the 'Robocop' NFT's smart contract.</p>
                </div>
            </div>
        </div>
    )

}

export default Modal;