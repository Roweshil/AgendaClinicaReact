import './App.css'
import { Header } from './components/Header.jsx'
import { Footer } from './components/Footer.jsx'
import { Dashboard } from "./pages/Dashboard.jsx"




function App() {

  return (
      <div className='layout'>

        <Header />

        <Dashboard />          

        <Footer />

      </div>
      
  )
}

export default App
