import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [specialCharAllowed, setspecialChar] = useState(false);
  const [password, setPassword] = useState("");


  const passwordGenerator = useCallback(() => {
    let pass= "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (specialCharAllowed) str += "!@#$%^&*()+?/";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length )
      pass += str.charAt(char);
    }
    setPassword(pass);

  }, [length, numberAllowed, specialCharAllowed, setPassword])

const passwordRef = useRef(null);
const copyToClipBoard = useCallback(() => {
  passwordRef.current.select();
  window.navigator.clipboard.writeText(password)
},[password])
    
   useEffect(() => {
     passwordGenerator()
   
   }, [length,numberAllowed,specialCharAllowed,passwordGenerator])
   
  return (
    <>
      <div className="container">
        <h1>RANDOM PASSWORD GENERATOR</h1>
      <div className="mini-container">
        <div id='input-div'>
          <input type="text"
           value={password}
            readOnly
             placeholder='Password' 
             id='password-input'
             ref={passwordRef}
             />
          <button 
          onClick={copyToClipBoard}
          >Copy</button>
        </div >
          <div className="ranges">
           
            <label  >
            <input
            min={6}
            max={30}
            onChange={(e) => {setLength(e.target.value)}}
            value={length}
            type="range"/>
            Length {length}
            </label>
            
            <label><input
            defaultChecked = {numberAllowed}
            onChange={() => {setNumberAllowed ((prev) => !prev)}}
            type="checkbox" />
             Numbers</label>
            
            <label><input
            defaultChecked = {specialCharAllowed}
            onChange={() => {setspecialChar ((prev) => !prev)}}
             type="checkbox" /> Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
