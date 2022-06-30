import React from 'react';
import Poster from './Poster';
import space from '../images/2001-330x505.png'
import alien from '../images/alien330x495.png'
import robocop from '../images/robocop330x510.png'

function Minter() {

    return (
        <div className='minter'>
            <Poster src={space}/>
            <Poster src={alien}/>
            <Poster src={robocop}/>
        </div>
    )

}

export default Minter;