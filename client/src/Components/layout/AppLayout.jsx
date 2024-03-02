import React from 'react'
import Sidebar from '../common/Sidebar'
import Board from '../common/Board'

const AppLayout = () => {
  return (
    <div className='grid-container'>
      <Sidebar />
      <Board />
    </div>
  )
}

export default AppLayout
