const flags=new Map();
const uniqueregisters = new Map();
export function operationsoncode(codeline, map2,myArray)
{
    const array =codeline.split(' ');
    let i=0;
    while(array[i]!==undefined)
    {
        if(array[i]==='LDA')
        {
            i++;
            let valuebe=parseInt(array[i]);
            uniqueregisters.set('A',map2.get(valuebe));
            break;
        }
        else if(array[i]==='MOV')
        {
            i++;
            let d=0,q=0,strin=array[i];
            while(strin!==undefined&&strin[d]!==undefined)
            {
                if(strin[d]===',')
                {
                    q=1;
                }
                d++;
            }
            if(q===1)
            {
            const arr=array[i].split(',');
            uniqueregisters.set(arr[0],uniqueregisters.get(arr[1])); 
            }
            break;
        }
        else if(array[i]==='ADD')
        {
            flags.set('CY',0);
            let sum=parseInt(uniqueregisters.get('A'))+parseInt(uniqueregisters.get(array[i+1]));
            if(sum>255)
            {
                flags.set('CY',1);
                sum-=256;
            }
            if(sum===0)
            {
                flags.set('Z',1);
            }
            if(sum>=128)
            {
                flags.set('S',1);
            }
            uniqueregisters.set('A',sum);
            break; 
        }
        else if(array[i]==='STA')
        {
            map2.set(array[i+1],parseInt(uniqueregisters.get('A')))
            myArray.push(array[i+1]);
            break;
        }
        else if(array[i]==='MVI')
        {
            let d=0,q=0,strin=array[i+1];
            while(strin!==undefined&&strin[d]!==undefined)
            {
                if(strin[d]===',')
                {
                    q=1;
                }
                d++;
            }
            if(q===1)
            {
            const arr=array[i+1].split(',');
            
            if(arr[1]==='A'||arr[1]==='B'||arr[1]==='C'||arr[1]==='D'||arr[1]==='E'||arr[1]==='F')
            {
                uniqueregisters.set(arr[0],uniqueregisters.get(arr[1]));
            }
            else
            {
                uniqueregisters.set(arr[0],parseInt(arr[1],16));
            }
            }
            break;
        }
        else if(array[i]==='SUB')
        {
            flags.set('CY',0);
            let sub=parseInt(uniqueregisters.get('A'))-parseInt(uniqueregisters.get(array[i+1]));
            if(sub<0)
            {
                flags.set('S',1);
                sub=sub*-1;
            }
            if(sub===0)
            {
                flags.set('Z',1);
            }
            else
            flags.set('Z',0);
            if(sub>=128)
            {
                flags.set('S',1);
            }
            else
            flags.set('S',0);
            uniqueregisters.set('A',sub);
            break;
        }
        else if(array[i]==='INR')
        {
            uniqueregisters.set(array[i+1],uniqueregisters.get(array[1])+1);
            break;
        }
        else if(array[i]==='DCR')
        {
            if(uniqueregisters.get(array[1])-1===0)
            {
                flags.set('Z',1);
            }
            uniqueregisters.set(array[i+1],uniqueregisters.get(array[1])-1);
            break;
        }
        else if(array[i]==='JNC')
        {
            if(array[i+1]&&array[i+1].length===4)
            {
            
            if(flags.get('CY')===0)
            {
                return array[i+1];
            }
            }
            break;
        }
        else if(array[i]==='JZ')
        {
            if(array[i+1]&&array[i+1].length===4)
            {
            
            if(flags.get('Z')===1)
            {
                return array[i+1];
            }
            }
            break;
        }
        else if(array[i]==='JNZ')
        {
            if(array[i+1]&&array[i+1].length===4)
            {
            
            if(flags.get('Z')===0)
            {
                return array[i+1];
            }
            }
            break;
        }
        else if(array[i]==='JC')
        {
            if(array[i+1]&&array[i+1].length===4)
            {
            
            if(flags.get('CY')===1)
            {
                return array[i+1];
            }
            }
            break;
        }
        else if(array[i]==='CMA')
        {
            let valu=(uniqueregisters.get('A'));
            valu=valu^255;
            uniqueregisters.set('A',valu);
            break;
        }
        else if(array[i]==='ANI')
        {
            if(array[i+1]&&array[i+1]!=='')
            {
            let and=uniqueregisters.get('A');
            and=and&parseInt(array[i+1],16);
            uniqueregisters.set('A',and);
            }
            break;
        }
        else if(array[i]==='OR')
        {
            if(array[i+1]&&array[i+1]!=='')
            {
            let or=uniqueregisters.get('A');
            or=or|parseInt(array[i+1],16);
            uniqueregisters.set('A',or);
            }
            break;
        }
        else if(array[i]==='LXI')
        {
            i++;
            let high=parseInt(array[2]);
            uniqueregisters.set('M',map2.get(high));
            uniqueregisters.set('H',high);
            break;
        }
        else if(array[i]==='INX')
        {
            let val=parseInt(uniqueregisters.get('H'))+1;
            uniqueregisters.set('M',map2.get(val));
            uniqueregisters.set('H',val);
            break;
        }
        else if(array[i]==='LHLD')
        {
            i++;
            let high=parseInt(array[1]);
            uniqueregisters.set('L',map2.get((high)));
            uniqueregisters.set('H',map2.get((high+1)));
            break;
        }
        else if(array[i]==='XCHG')
        {
            let high=uniqueregisters.get('H');
            let low=uniqueregisters.get('L');
            uniqueregisters.set('L',uniqueregisters.get('D'));
            uniqueregisters.set('H',uniqueregisters.get('E'));
            uniqueregisters.set('D',low);
            uniqueregisters.set('E',high);
            break;
        }
        else if(array[i]==='DAD')
        {
            let flag=0,val1=uniqueregisters.get('L')+uniqueregisters.get('D');
            if(val1>255)
            {
                val1=val1-256;
                flag=1;
            }
            uniqueregisters.set('L',val1);
            let val2=uniqueregisters.get('H')+uniqueregisters.get('D')+flag;
            if(val2>255)
            {
                val2-=256;
                flags.set('CY',1);
            }
            uniqueregisters.set('H',val2);
            break;
        }
        else if(array[i]==='SHLD')
        {
            let val=parseInt(array[1]);
            map2.set(val,uniqueregisters.get('L'));
            map2.set((val+1),uniqueregisters.get('H'));
            myArray.push(val);
            myArray.push(val+1);
            
            break;
        }
        else if(array[i]==='RLC')
        {
            let binary = uniqueregisters.get('A');
            if(binary>=0)
            {
                binary=binary.toString(2);
                let arr=[],count=0;
                for(let i=0;i<binary.length;i++)
                {
                    arr.push(binary[i]);
                    count++;
                }
                while(count<8)
                {
                    arr.unshift(0);
                    count++;
                }
                let shiftval=arr[0];
                arr.push(shiftval);
                arr.shift();
                let c=arr.join('');
                c=parseInt(c,2);
                uniqueregisters.set('A',c);
            }
            break;
        }
        else if(array[i]==='RRC')
        {
            let binary = uniqueregisters.get('A');
            if(binary>=0)
            {
                binary=binary.toString(2);
                let arr=[],count=0;
                for(let i=0;i<binary.length;i++)
                {
                    arr.push(binary[i]);
                    count++;
                }
                while(count<8)
                {
                    arr.unshift(0);
                    count++;
                }
                let shiftval=arr[7];
                arr.unshift(shiftval);
                arr.pop();
                let c=arr.join('');
                c=parseInt(c,2);
                uniqueregisters.set('A',c);
            }
            break;
        }
        else if(array[i]==='RAL')
        {
            let binary = uniqueregisters.get('A');
            if(binary>=0)
            {
                binary=binary.toString(2);
                let arr=[],count=0;
                for(let i=0;i<binary.length;i++)
                {
                    arr.push(binary[i]);
                    count++;
                }
                while(count<8)
                {
                    arr.unshift(0);
                    count++;
                }
                let shiftval=0;
                arr.unshift(shiftval);
                arr.pop();
                let c=arr.join('');
                c=parseInt(c,2);
                uniqueregisters.set('A',c);
            }
            break;
        }
        
        else 
        {
            break;
        }
    }
    return 0;
}
export {uniqueregisters,flags};