import React from 'react'
import { Route, Routes } from 'react-router-dom'
import BotPage from './BotPage'
import Footer from 'Components/Footer'

export default function Dashboard() {
  return (
    <>
      <Routes>
        <Route path="/bot" element={<BotPage />} />
      </Routes>
      <Footer />
    </>
  )
}
