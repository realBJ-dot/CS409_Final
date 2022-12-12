import React from 'react'
import Button from "../button/Button"
import "./FirstSection.css"
const FirstSection = () => {
  return (
    <div className='first-container'>
      <video className ="homeVideo" src='/videos/banner.mp4' autoPlay loop muted />
      <h1>Expense Tracker</h1>
      <p>What are you waiting for?</p>
      <p>Sign Up now to start saving your [$] money</p>
      <div className='first-btns'>
        <Button
          className='btns'
          buttonStyle='btn-outline0'
          buttonSize='btn-large0'
        >
          More Information
        </Button>
        <Button
          className='btns'
          buttonStyle='btn-primary0'
          buttonSize='btn-large0'
          // onClick={console.log('hey')}
        >
          Sign Up Now
        </Button>
      </div>
    </div>
  )
}

export default FirstSection