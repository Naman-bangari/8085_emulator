import React,{useState} from 'react'
import Mainwork2 from './Mainwork2';
export default function Formtext(props) {
  
    const [text, setText] = useState('Enter code here');
    const [text2, setText2] = useState('set memory here if used eg- 3000 05 (address value)');
    const handleOnChange=(event)=>
    {
        console.log("on change");
        setText(event.target.value);
    }
    const handleclear=()=>{
      setText("");
      if(text.length!==0)
      props.showalert(" Text cleared","success");
      else
      {
      props.showalert("No code to clear","info");
      setText('Entre code here');
      }
    }
    const handleOnChange2=(event)=>
    {
        console.log("on change 2");
        setText2(event.target.value);
    }
  return (
       <>
      <div className="centered mb-3 my-2 mx-4">
            <h3>Enter Code </h3>
            <textarea className="form-control" value={text} id="mybox"onChange={handleOnChange} rows="9"></textarea>
            <button className="btn btn-primary btn-sm" onClick={handleclear}>clear</button>
        </div>
        <div className="my-4 mx-4">
          <h4>Enter memory</h4>
        <textarea className="form-control"value={text2} id="mybo"onChange={handleOnChange2}  rows="3"></textarea>
        </div>
        <div>
          <Mainwork2 text={text} text2={text2} showalert={props.showalert}/>
        </div>
    </>
  )
}