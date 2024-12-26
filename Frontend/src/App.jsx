
import { Toaster } from 'react-hot-toast'
import React from 'react'
import Card from './Components/Card.jsx'
export default function App() {
  return (
  <React.Fragment>
  <Card/>
  <Toaster
        position="top-right"
        reverseOrder={true}
      /></React.Fragment>
  )
}
