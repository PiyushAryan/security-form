import { useState } from 'react'
import ReportForm from './components/ReportForm'
import { Toaster } from 'react-hot-toast'

import './App.css'

function App() {

  

  return (
    <>
      <div className="min-h-screen bg-slate-100 dark:bg-gray-900 py-8 transition-colors duration-500 ease-in-out">
        <ReportForm />
        <Toaster position="top:right" />
      </div>
    </>
  )
}

export default App
