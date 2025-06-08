import ReportForm from './components/ReportForm'
import { Toaster } from 'react-hot-toast'
import './App.css'

function App() {

  return (
    <>
    <div className="min-h-screen bg-gray-900 py-8">
    
      <ReportForm />
      <Toaster position='top:right' />
    </div>
    </>
  )
}

export default App
