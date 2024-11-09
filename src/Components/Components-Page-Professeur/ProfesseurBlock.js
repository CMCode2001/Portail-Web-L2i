import React from 'react'
import SidebarProf from './SidebarProf'
import SidebarProf2 from './SidebarProf2'
import TopBarProf from './TopBarProf'

export default function ProfesseurBlock() {
  return (
    <div>
        <TopBarProf/>
        <SidebarProf/>
        <SidebarProf2/>
    </div>
  )
}
