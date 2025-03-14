import React from 'react'
import {NavLink} from 'react-router-dom'
import './Navbar.css'
import { useContext } from 'react'
import { TransactionContext } from '../context/TransactionContext'

export const Navbar = () => {
  const { connectWallet, connectAccount } = useContext(TransactionContext);
  return (
    <nav className='gradient-bg-services'>
      <span className='text-white'>Logo</span>
        <ul className='text-white flex gap-5 justify-center'>
            <li><NavLink to={'/home'}>Home</NavLink></li>
            <li><NavLink to={'/about'}>About</NavLink></li>
            <li><NavLink to={'/contact'}>Contact</NavLink></li>
            <li><NavLink to={'/transactions'}>Transactions</NavLink></li>
            <li><NavLink to={'/verification'}>Verification</NavLink></li>
            {!connectAccount && (
            <button
              onClick={connectWallet}
              className="blue-glassmorphism w-40  hover:bg-[#2546bd]"
            >
              Connect Wallet
            </button>
          )}
        </ul>
    </nav>
  )
}
