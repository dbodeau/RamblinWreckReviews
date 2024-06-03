import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
    <>
    <body className='portal-body'>
      <div>
        {/* <img className='portal-bkgd-image' src={minesbkgd} alt="Mines Logo"/> */}
      </div>
      <div className='portal-body-container'>
        <div className='portal-container'>
          <div className='portal-component-container'>
            <h1>Login</h1>
            <input type='text' id="username-input" placeholder='Username'></input>
            <input type='text' id="password-input" placeholder='Password'></input>
            {/* <button onClick={handleAPICall}>Submit</button> */}
            <div className="portal-forgot-password" onClick={() => { window.location.href = '/signup';}}>
              Forgot Password
            </div>
          </div>
        </div>
      </div>
    </body>
    </>
  )
}

export default App
