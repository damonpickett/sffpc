import React, { useState } from 'react';
import { ethers, BigNumber } from 'ethers';

function Poster(props) {

    const [mintAmount, setMintAmount] = useState(1);

    const handleDecrement = () => {
        if (mintAmount <= 1) return;
        setMintAmount(mintAmount - 1);
    };

    const handleIncrement = () => {
        if (mintAmount >= 3) return;
        setMintAmount(mintAmount + 1);
    };

    return (
        <div className='nft'>
            <div className='poster'>
                <img src={props.src} alt='space-odyssey'></img>
            </div>
            <div className='controls'>
                <button 
                    className='incdec'
                    onClick={handleDecrement}
                    >-</button>
                <input type='number' value={mintAmount}></input>
                <button 
                    className='incdec'
                    onClick={handleIncrement}
                    >+</button>
                <button className='mint-button'>Mint</button>
            </div>
        </div>
    )
}

export default Poster;