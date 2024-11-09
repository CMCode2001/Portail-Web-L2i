import React from 'react'
import Navbar from './Navbar/NavBar';
import Topbar from "./Navbar/Topbar";
import Middlebar from './Navbar/Middlebar';

function HeaderBlock () {
  return (
    <>
      <Topbar/>
      <Middlebar/>
      <Navbar/>
    </>
  )
}

export default HeaderBlock;