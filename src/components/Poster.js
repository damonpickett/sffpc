import React, { useState } from 'react';

function Poster(props) {

    const isConnected = Boolean(props.accounts[0]);

    const handleDecrement = () => {
        if (props.mintAmount <= 1) return;
        props.setMintAmount(props.mintAmount - 1);
    };

    const handleIncrement = () => {
        if (props.mintAmount >= 3) return;
        props.setMintAmount(props.mintAmount + 1);
    };

    return (
        <div className='nft'>
            <div className='poster'>
                <img src={props.src} alt='space-odyssey'></img>
            </div>
            <div className='controls'>
                <button 
                    className='incdec ripple'
                    onClick={handleDecrement}
                    >-</button>
                <input type='number' value={props.mintAmount}></input>
                <button 
                    className='incdec ripple'
                    onClick={handleIncrement}
                    >+</button>
                {isConnected ? (
                <button onClick={props.onClick}className='mint-button ripple'>Mint</button>
                ) : (
                    <p>Connect your wallet to mint</p>
                )}
            </div>
        </div>
    )
}

export default Poster;