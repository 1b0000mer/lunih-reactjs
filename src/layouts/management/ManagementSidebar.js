import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  CSidebar,
  CSidebarBrand,
  CSidebarHeader,
  CSidebarToggler,
  CSidebarFooter,
  CCloseButton
} from '@coreui/react';

import CIcon from '@coreui/icons-react';

import { AppSidebarNav } from './AppSidebarNav';
import nav from './nav';

import { logo } from '../../assets/brand/logo';
import { sygnet } from '../../assets/brand/sygnet';

function ManagementSidebar() {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CSidebar 
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}>
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand href="/">
          <CIcon customClassName="sidebar-brand-full" icon={logo} height={32} />
          <CIcon customClassName="sidebar-brand-narrow" icon={sygnet} height={32} />
        </CSidebarBrand>
        <CCloseButton
          className="d-lg-none" //hidden
          dark
          onClick={() => dispatch({ type: 'set', sidebarShow: false })}
        />
      </CSidebarHeader>
      
      <AppSidebarNav items={nav} />

      <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler
          onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
        />
      </CSidebarFooter>
    </CSidebar>
  )
}

export default ManagementSidebar