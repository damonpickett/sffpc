import React from 'react';
import { Link } from 'react-router-dom';

function Header({ accounts, setAccounts }) {

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
            <Link className='home' to='/'><h1>Sci-Fi Film Poster Club</h1></Link>
            <Link className='links' to="/about">About</Link>
            <button >Instructions</button>
            {isConnected ? (
            <p>Wallet Connected</p>
            ) : (
                <button
                onClick={connectAccount}
                >Connect Wallet</button>
            )}
            
        </div>
    )

}

export default Header;





