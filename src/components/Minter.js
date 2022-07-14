import React, { useState } from 'react';
import Poster from './Poster';
import space from '../images/2001-330x505.png'
import alien from '../images/alien330x495.png'
import robocop from '../images/robocop330x510.png'
import { ethers, BigNumber } from 'ethers';
import alienPosterNFT from '../AlienPoster.json';
import robocopPosterNFT from '../RobocopPoster.json';
import spaceOdysseyPosterNFT from '../SpaceOdysseyPoster.json';

const alienAddress = '0x2AD4344563f9eA73a89B1d3665058c185a781CB6'
const robocopAddress = '0x20822036dDC00eaE0cA917897E0bbFb8a01c29F7'
const spaceOdysseyAddress = '0x244D105ecb52713B1cB971db7589d617D8FEb5f3'

function Minter({ accounts, setAccounts }) {

    const [mintAmount1, setMintAmount1] = useState(1);
    const [mintAmount2, setMintAmount2] = useState(1);
    const [mintAmount3, setMintAmount3] = useState(1);

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
                const response = await contract.mint(BigNumber.from(mintAmount1), {
                    value: ethers.utils.parseEther((0.01 * mintAmount1).toString())
                });
                console.log('response: ', response);
            } catch (err) {
                console.log('error: ', err)
            }
        }
    }

    async function handleAlienMint() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                alienAddress,
                alienPosterNFT.abi,
                signer
            );
            try {
                const response = await contract.mint(BigNumber.from(mintAmount2), {
                    value: ethers.utils.parseEther((0.01 * mintAmount2).toString())
                });
                console.log('response: ', response);
            } catch (err) {
                console.log('error: ', err)
            }
        }
    }

    async function handleRobocopMint() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                robocopAddress,
                robocopPosterNFT.abi,
                signer
            );
            try {
                const response = await contract.mint(BigNumber.from(mintAmount3), {
                    value: ethers.utils.parseEther((0.01 * mintAmount3).toString())
                });
                console.log('response: ', response);
            } catch (err) {
                console.log('error: ', err)
            }
        }
    }

    return (
        <div className='minter'>
            <Poster
                src={space}
                onClick={handleSpaceOdysseyMint} 
                mintAmount={mintAmount1}
                setMintAmount={setMintAmount1}
                accounts={accounts} 
                setAccounts={setAccounts}
                />
            <Poster 
                src={alien}
                onClick={handleAlienMint}
                mintAmount={mintAmount2}
                setMintAmount={setMintAmount2}
                accounts={accounts} 
                setAccounts={setAccounts}
                />
            <Poster 
                src={robocop}
                onClick={handleRobocopMint}
                mintAmount={mintAmount3}
                setMintAmount={setMintAmount3}
                accounts={accounts} 
                setAccounts={setAccounts}
                />
        </div>
    )

}

export default Minter;