import React from 'react'
import '../../Styles/Propos.css'
import About from './components/About'
import Debouches from './components/Debouches'
import Objectifs from './components/Objectifs'


export default function AproposL2i() {
  return (
    <div className='propos'>
      <About/>
      <Objectifs/>
      <Debouches></Debouches>
    </div>
  )
}
