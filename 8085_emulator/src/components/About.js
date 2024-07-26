import React from 'react';

export default function About(props) {
  
  return (
    <div className="mx-5 my-4">
      <h2>About us</h2>
      <div className="accordion my-3" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              <h3>8085</h3>
            </button>
          </h2>
          <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              This site helps you to emulate the 8085 microprocessor and give you results according to the code given. You can use this website to practice the working of instructions in the 8085 microprocessor.  
              <br />
              Working Instructions: <br />
              MOV, MVI, LDA, STA, ADD, ADI, SUB, SUI, INR, DCR, ANA, ANI, XRA, XRI, ORA, ORI
              <br />
              More instructions coming soon....
            </div>
          </div>
        </div>
        
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              <h5>Example instruction</h5>
            </button>
          </h2>
          <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              MVI A,10<br />
              MVI B,20<br />
              ADD B<br />
              STA 3000<br />
              MOV C,3000<br />
              ADD C<br />
              STA 2000 <br />
              HLT
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
              <h5>Made by</h5>
            </button>
          </h2>
          <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              Design and Developed by Naman Bangari.
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
              <h6>Contact Us</h6>
            </button>
          </h2>
          <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              Mail at: namanbangari94565@gmail.com
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
