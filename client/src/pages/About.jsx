import React from 'react'
import './css/About.css'

const about = () => {
  return (
    <div className='aboutdiv'>
      <h1>
        Expense Tracker is an app started by 4 students in CS 409 at UIUC. Read more about us here or check out our app!
      </h1>
      <div class='box'>
        <div class='row'>
          <div class='column'>
            <div class='col1'>
              <h1>Chien Nguyen</h1>
              <h3>Frontend Developer</h3>
            </div>
          </div>
          <div class='column'>
            <div class='col2'>
              <h1>Peiyuan Jin</h1>
              <h3>Frontend Developer</h3>            
            </div>
          </div>
        </div>
        <div class='row 2'>
          <div class='column'>
            <div class='col2'>
            <h1>Xinshuo Lei</h1>
            <h3>Backend Developer</h3>            
          </div>
          </div>
          <div class='column'>
            <div class='col1'>
            <h1>Tommy Ge</h1>
            <h3>Backend Developer</h3>            
          </div>
          </div>
        </div>
</div>

    </div>
  )
}

export default about