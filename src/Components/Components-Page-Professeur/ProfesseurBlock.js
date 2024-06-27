import React from 'react'
import Topbar from '../Header/Navbar/Topbar'
import SidebarProf from './SidebarProf'
import SidebarProf2 from './SidebarProf2'

export default function ProfesseurBlock() {
  return (
    <div>
        <Topbar/>
        <SidebarProf/>
        <SidebarProf2/>
    </div>
  )
}
