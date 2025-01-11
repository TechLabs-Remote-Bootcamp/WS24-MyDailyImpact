import { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Content_LR from './components/Content_LR'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Button from './components/Button'

function App() {
  const [count, setCount] = useState(0)

  // I didn't delete this code yet because of orientation in the framework.
  // It's a main way to learn coding by reading and - more from time to time -
  // urderstanding other code
  return (
    <>
      <div>
        <Header/>
        <Content_LR LeftComponent={Header} RightComponent={Header} />

        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      {/* <Content_LR/> */}
      <Button Component={Header}>
        
        <button type='text'>Click</button>
        </Button>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Footer/>
    </>
  )
}

export default App
