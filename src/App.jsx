import { useState } from 'react'
import Header from './components/Header'
import ContactForm from './components/ContactForm'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>
      <ContactForm/>
    
      {/* <ContactSearch/> */}
    </>
  )
}

export default App
