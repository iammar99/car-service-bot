import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Frontend from './Frontend'
import Dashboard from './Dashboard'


export default function Index() {
  return (
    <>
      <Routes>
        <Route path='/*' element={<Frontend />} />
        <Route path='/dashboard/*' element={<Dashboard/>}/>
      </Routes>
    </>
  )
}
