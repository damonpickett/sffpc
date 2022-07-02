import React from 'react';
import { Link } from 'react-router-dom';

function Header({ accounts, setAccounts, modal, setModal }) {

    const isConnected = Boolean(accounts[0]);

    async function connectAccount() {
        if (window.ethereum){
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts',
            });
            setAccounts(accounts)
        }
    }

    return (
        <div className='header'>
            <nav>
                <Link className='home' to='/'><h1>Sci-Fi Film Poster Club</h1></Link>
                <Link className='nav-link' to="/about">About</Link>
            </nav>
            <div className='header-buttons'>
                <button className='ripple' onClick={() => {setModal(true)}}>Instructions</button>
                {isConnected ? (
                <p>Wallet Connected</p>
                ) : (
                    <button
                    className='ripple'
                    onClick={connectAccount}
                    >Connect Wallet</button>
                )}
            </div>
        </div>
    )

}

export default Header;





