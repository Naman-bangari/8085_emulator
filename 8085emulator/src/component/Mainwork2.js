import React, { useState } from 'react'
import {sizeofcode} from './Codesize';
import Mainwork1 from './Mainwork1';
export default function Mainwork2(props) {
  let i=0,start_add=2000,start_address=2000;
  const map1 = new Map();
  const array =props.text.split('\n');
  const present=array.indexOf("HLT");
  while(!(array[i]===undefined||present===-1))
  {
    if(array[i]==='')
    {
      i++;
      continue;
    }
    map1.set(start_address,array[i]);
    start_address+=sizeofcode(array[i]);
    if(start_address<-10)
    {
      break;
    }
    i++;
  }
  const newtext=props.text2.split("\n");
  let newText=newtext.join(" ");
  const arr=newText.split(' ');
  i=0;
  while(arr[i]!==undefined)
  {
     if(arr[i]==='')
     {
      i++;
      continue;
     }
    if(arr[i]==='set')
    {
      break;
    }
    let add=parseInt(arr[i]);
    i++;
    let val=parseInt(arr[i],16);
    map1.set(add,val);
    i++;
  }
  const [code,setcode]=useState(false);
  const handlerun=()=>
  {
    console.log('clicked on run');
    if(code===false)
    {
      setcode('true');
    }
    if(!(present>0&&start_address>0))
    {
      setcode('false');
      props.showalert(" Code not found to be related to 8085","info");
    }
    else{
    props.showalert("Executed","success");
    }
  }
  return (
    <div>
       <div>
            <button className='btn btn-sm btn-success mx-4'onClick={handlerun}>run</button>
            <div>
            {present>0&&start_address>0&&code&&<Mainwork1 map1={map1} showalert={props.showalert} start_address={start_address} start_add={start_add}/>}
            </div>
        </div>
    </div>
  )
}
