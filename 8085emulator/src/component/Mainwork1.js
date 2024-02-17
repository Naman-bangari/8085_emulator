import {uniqueregisters ,operationsoncode,flags} from './Operations';
export default function Mainwork1(props) {
    const map2 = new Map(props.map1);
    let j=props.start_add;
    let valstored="";
    let myArray = [];
    let A,B,C,D,E,H,L,M,S,CY,AC,Z,P;
    console.log(M);
    uniqueregisters.set('A',0);
    uniqueregisters.set('B',0);
    uniqueregisters.set('C',0);
    uniqueregisters.set('D',0);
    uniqueregisters.set('E',0);
    uniqueregisters.set('H',0);
    uniqueregisters.set('L',0);
    uniqueregisters.set('M',0);
    flags.set('S',0);
    flags.set('CY',0);
    flags.set('Z',0);
    flags.set('P',0);
    flags.set('AC',0);
    let loop=0;
    console.log(H+L);
    while(map2.get(j)!=="HLT"&&props.start_address>0)
    {
        loop++;
        if(loop>=100)
        {
          console.log("looped");
            break;
        }
        console.log(map2.get(j)+" "+j);
        if(map2.get(j)===undefined)
        {
          j++;
            continue;
        }
        let rvalue=operationsoncode(map2.get(j),map2,myArray);
        j++;
        if(rvalue!==0)
        {
          j=parseInt(rvalue);
        }
    }
    A=parseInt(uniqueregisters.get('A')).toString(16);
    B=parseInt(uniqueregisters.get('B')).toString(16);
    C=parseInt(uniqueregisters.get('C')).toString(16);
    D=parseInt(uniqueregisters.get('D')).toString(16);
    E=parseInt(uniqueregisters.get('E')).toString(16);
    H=parseInt(uniqueregisters.get('H')).toString(16);
    L=parseInt(uniqueregisters.get('L')).toString(16);
    M=parseInt(uniqueregisters.get('M')).toString(16);  
    Z=(flags.get('Z'));
    AC=(flags.get('AC'));
    P=(flags.get('P'));
    CY=(flags.get('CY'));
    S=(flags.get('S'));
    for(let k=0;k<myArray.length;k++)
    {
      let a=map2.get(myArray[k]).toString(16);
      valstored+=" | "+myArray[k]+" -> 0"+a.toUpperCase()+" | ";
    }     
  return (
    <>
    <div className="mx-4 my-2">
      <h1>Results</h1>
      <h5>Registers are </h5>
      {"A=0"+A.toUpperCase()+" , B=0"+B.toUpperCase()+" , C=0"+C.toUpperCase()+" , D=0"+D.toUpperCase()+" , E=0"+E.toUpperCase()+" , H=0"+H.toUpperCase()+" , L=0"+L.toUpperCase()}
      <h5>Recent flag status</h5>
      {" S="+S+" , P="+P+" , CY="+CY+" , AC="+AC+" , Z="+Z}
      <div>
        <h5>Value stored at</h5>
        <h6>{valstored}</h6>
      </div>
      </div>
    </>
  )
}
