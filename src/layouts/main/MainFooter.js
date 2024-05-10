import React from 'react'
import { CFooter } from '@coreui/react'

function MainFooter() {
  return (
    <CFooter className="px-4">
    <div>
      <a href="https://coreui.io" target="_blank" rel="noreferrer">CoreUI</a>
      <span className="ms-1">&copy; { new Date().getFullYear() } LUNIH</span>
    </div>
    <div className="ms-auto">
      <span className="me-1" target="_blank" rel="noreferrer">Powered by</span>
      <a href="https://coreui.io/react">CoreUI for React</a>
    </div>
  </CFooter>
  )
}

export default MainFooter