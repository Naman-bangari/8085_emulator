import React from 'react'

export default function About(props) {
  let myStyle={
    color:props.mode==='dark'?'white':'black',
    backgroundColor:props.mode==='dark'?'black':'white',
    boarderColor:'black'
  }
  return (
    <div className="mx-5 my-4">
      <h2>About us</h2>
      <div className="accordion my-3" id="accordionExample"style={myStyle}>
  <div className="accordion-item">
    <h2 className="accordion-header" >
      <button style={myStyle}className="accordion-button" type="button"data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        <h3>8085</h3>
      </button>
    </h2>
    <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
      <div className="accordion-body">
        This site help you to emulate the 8085 microprocessor and give you result according the code given, you can use this website to practice the working of instruction in 8085 mimcroprocessor.   
      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button style={myStyle}className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        <h5>Made by</h5>
      </button>
    </h2>
    <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div className="accordion-body">
        Design and Developed by Naman Bangari student at Graphic Era Btech 2nd year (CSE).
      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button style={myStyle} className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
        <h6>Contact Us</h6>
      </button>
    </h2>
    <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div className="accordion-body">
        you can contact us on our phone no:9999999999 for more information visit www.8085work.com
      </div>
    </div>
  </div>
</div>
    </div>
  )
}
