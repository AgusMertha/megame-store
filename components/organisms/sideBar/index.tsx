import React from 'react'
import SidebarItem from '../../molecules/sidebarItem'
import Footer from './footer'
import Profile from './profile'

interface sidebarProps {
  activeMenu: 'overview' | 'transactions' | 'settings'
}

export default function SideBar(props: sidebarProps) {
  const {activeMenu} = props
  return (
    <section className="sidebar">
      <div className="content pt-50 pb-30 ps-30">
        <Profile/>
        <div className="menus">
          <SidebarItem title={'Overview'} active={activeMenu == 'overview'} icon={'/icon/sidebar/overview.svg'} href="/member"/>
          <SidebarItem title={'Transactions'} active={activeMenu == 'transactions'} icon={'/icon/sidebar/transaction.svg'} href="/member/transactions"/>
          <SidebarItem title={'Messages'} icon={'/icon/sidebar/message.svg'} href="/member"/>
          <SidebarItem title={'Card'} icon={'/icon/sidebar/card.svg'} href="/member"/>
          <SidebarItem title={'Rewards'} icon={'/icon/sidebar/reward.svg'} href="/member"/>
          <SidebarItem title={'Settings'} active={activeMenu == 'settings'} icon={'/icon/sidebar/setting.svg'} href="/member/edit-profile"/>
          <SidebarItem title={'Log Out'} icon={'/icon/sidebar/logout.svg'} href="/member"/>
        </div>
        <Footer/>
      </div>
    </section>
  )
}
