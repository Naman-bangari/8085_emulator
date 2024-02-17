export function sizeofcode(oneline)
{
    const array =oneline.split(' ');
    let i=0;
    while(array[i]!==undefined)
    {
        if(array[i]==='DAD'||array[i]==='XCHG'||array[i]==='ADD'||array[i]==='SUB'||array[i]==='INR'||array[i]==='DCR'||array[i]==='CMA'||array[i]==='MOV'||array[i]==='HLT'||array[i]==='RLC'||array[i]==='RRC'||array[i]==='RAL'||array[i]==='RAR'||array[i]==='INX')
        {
            return 1;
        }
        else if(array[i]==='MVI'||array[i]==='ANI'||array[i]==='OR')
        {
            return 2;
        }
        else if(array[i]==='SHLD'||array[i]==='LHLD'||array[i]==='LDA'||array[i]==='STA'||array[i]==='JMP'||array[i]==='JM'||array[i]==='JP'||array[i]==='JZ'||array[i]==='JC'||array[i]==='JNC'||array[i]==='LXI'||array[i]==='JNZ')
        {
            return 3;
        }
        else{
            break;
        }
    }
    return -10000;
} 