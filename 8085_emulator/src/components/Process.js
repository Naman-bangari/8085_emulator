import React, { useState, useEffect, useRef } from 'react';

export default function Process({ code, additionalText }) {
  const [register, setRegister] = useState(new Map([
    ['A', '00'],
    ['B', '00'],
    ['C', '00'],
    ['D', '00'],
    ['E', '00'],
    ['H', '00'],
    ['L', '00']
  ]));

  const [flags, setFlags] = useState(new Map([
    ['S', '00'],
    ['Z', '00'],
    ['AC', '00'],
    ['P', '00'],
    ['CY', '00']
  ]));

  const [hexMap, setHexMap] = useState(new Map());
  const [isCodeProcessed, setIsCodeProcessed] = useState(false);

  const hasProcessedCode = useRef(false);

  const processAdditionalText = () => {
    const newMap = new Map();
    const lines2 = additionalText.toUpperCase().split('\n');

    lines2.forEach(line => {
      const [key, value] = line.split(' ');
      if (key && value) {
        newMap.set(key, value);
      }
    });

    setHexMap(newMap);
  };

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const executeInstruction = async (instruction) => {
    const parts = instruction.split(' ');
    const opCode = parts[0].toUpperCase();
    const operands = parts.slice(1).join(' ').split(/[\s,]+/).filter(part => part.trim() !== '').map(op => op.toUpperCase());

    console.log('Opcode:', opCode);
    console.log('Operands:', operands);

    switch (opCode) {
      case 'MOV':
        if (operands.length === 2) {
          const destReg = operands[0];
          const srcReg = operands[1];

          if (['A', 'B', 'C', 'D', 'E', 'H', 'L'].includes(srcReg)) {
            setRegister(prev => {
              const value = prev.get(srcReg) || '00';
              const newMap = new Map(prev);
              newMap.set(destReg, value);
              console.log('MOV Instruction:', newMap);
              return newMap;
            });
          } else {
            setHexMap(prevHexMap => {
              const value = prevHexMap.get(srcReg) || '00';
              setRegister(prev => {
                const newMap = new Map(prev);
                newMap.set(destReg, value);
                console.log('MOV Instruction (HexMap):', newMap);
                return newMap;
              });
              return prevHexMap;
            });
          }
        }
        break;

      case 'MVI':
        if (operands.length === 2) {
          const reg = operands[0];
          const value = operands[1];
          setRegister(prev => {
            const newMap = new Map(prev);
            newMap.set(reg, value);
            console.log('MVI Instruction:', newMap);
            return newMap;
          });
        }
        break;

      case 'STA':
        if (operands.length === 1) {
          const address = operands[0];
          setRegister(prev => {
            const value = prev.get('A') || '00';
            console.log('STA Address:', address);
            console.log('STA Value:', value);
            setHexMap(prevHexMap => {
              const newMap = new Map(prevHexMap);
              newMap.set(address, value);
              console.log('STA HexMap:', newMap);
              return newMap;
            });
            return prev;
          });
        }
        break;

      case 'LDA':
        if (operands.length === 2) {
          const reg = operands[0];
          const key = operands[1];
          const value = hexMap.get(key) || '00';
          console.log('LDA Value:', value);
          setRegister(prev => {
            const newMap = new Map(prev);
            newMap.set(reg, value);
            console.log('LDA Instruction:', newMap);
            return newMap;
          });
        }
        break;

      case 'ADD':
        if (operands.length === 1) {
          const srcReg = operands[0];
          setRegister(prev => {
            if (prev.has(srcReg)) {
              const regValue = parseInt(prev.get(srcReg), 16);
              const accValue = parseInt(prev.get('A'), 16);
              const result = (accValue + regValue) & 0xFF;

              const newMap = new Map(prev);
              newMap.set('A', result.toString(16).toUpperCase().padStart(2, '0'));
              console.log('ADD Instruction:', newMap);
              return newMap;
            } else {
              console.log('Unknown register:', srcReg);
              return prev;
            }
          });
        } else {
          console.log('Invalid ADD instruction format:', operands);
        }
        break;
        case 'ADI':
        if (operands.length === 1) {
          const srcReg = operands[0];

          setRegister(prev => {
            if (srcReg) {
              const regValue = parseInt(srcReg, 16);
              const accValue = parseInt(prev.get('A'), 16);
              const result = (accValue + regValue) & 0xFF;

              const newMap = new Map(prev);
              newMap.set('A', result.toString(16).toUpperCase().padStart(2, '0'));
              console.log('ADI Instruction:', newMap);
              return newMap;
            } else {
              console.log('Unknown register:', srcReg);
              return prev;
            }
          });
        } else {
          console.log('Invalid ADI instruction format:', operands);
        }
        break;
        case 'SUB':
      if (operands.length === 1) {
        const srcReg = operands[0];
        setRegister(prev => {
          if (prev.has(srcReg)) {
            const regValue = parseInt(prev.get(srcReg), 16);
            const accValue = parseInt(prev.get('A'), 16);
            const result = (accValue - regValue) & 0xFF;

            const newMap = new Map(prev);
            newMap.set('A', result.toString(16).toUpperCase().padStart(2, '0'));
            console.log('SUB Instruction:', newMap);
            return newMap;
          } else {
            console.log('Unknown register:', srcReg);
            return prev;
          }
        });
      } else {
        console.log('Invalid SUB instruction format:', operands);
      }
      break;

        case 'INR':
      if (operands.length === 1) {
        const reg = operands[0];
        setRegister(prev => {
          if (prev.has(reg)) {
            const regValue = parseInt(prev.get(reg), 16);
            const result = (regValue + 1) & 0xFF;

            const newMap = new Map(prev);
            newMap.set(reg, result.toString(16).toUpperCase().padStart(2, '0'));
            console.log('INR Instruction:', newMap);
            return newMap;
          } else {
            console.log('Unknown register:', reg);
            return prev;
          }
        });
      } else {
        console.log('Invalid INR instruction format:', operands);
      }
      break;

         case 'DCR':
      if (operands.length === 1) {
        const reg = operands[0];
        setRegister(prev => {
          if (prev.has(reg)) {
            const regValue = parseInt(prev.get(reg), 16);
            const result = (regValue - 1) & 0xFF;

            const newMap = new Map(prev);
            newMap.set(reg, result.toString(16).toUpperCase().padStart(2, '0'));
            console.log('DCR Instruction:', newMap);
            return newMap;
          } else {
            console.log('Unknown register:', reg);
            return prev;
          }
        });
      } else {
        console.log('Invalid DCR instruction format:', operands);
      }
      break;

    case 'SUI':
      if (operands.length === 1) {
        const value = operands[0];
        setRegister(prev => {
          const regValue = parseInt(value, 16);
          const accValue = parseInt(prev.get('A'), 16);
          const result = (accValue - regValue) & 0xFF;

          const newMap = new Map(prev);
          newMap.set('A', result.toString(16).toUpperCase().padStart(2, '0'));
          console.log('SUI Instruction:', newMap);
          return newMap;
        });
      } else {
        console.log('Invalid SUI instruction format:', operands);
      }
      break;
      case 'ANA':
        if (operands.length === 1) {
          const srcReg = operands[0];
          setRegister(prev => {
            if (prev.has(srcReg)) {
              const regValue = parseInt(prev.get(srcReg), 16);
              const accValue = parseInt(prev.get('A'), 16);
              const result = (accValue & regValue) & 0xFF;

              const newMap = new Map(prev);
              newMap.set('A', result.toString(16).toUpperCase().padStart(2, '0'));

              
              setFlags(prevFlags => {
                const newFlags = new Map(prevFlags);
                newFlags.set('Z', result === 0 ? '01' : '00');
                console.log('ANA Instruction:', newMap);
                return newFlags;
              });

              return newMap;
            } else {
              console.log('Unknown register:', srcReg);
              return prev;
            }
          });
        } else {
          console.log('Invalid ANA instruction format:', operands);
        }
        break;
        case 'ANI':
          if (operands.length === 1) {
            const immediateValue = operands[0];
            setRegister(prev => {
              const accValue = parseInt(prev.get('A'), 16);
              const immValue = parseInt(immediateValue, 16);
              const result = (accValue & immValue) & 0xFF;
        
              const newMap = new Map(prev);
              newMap.set('A', result.toString(16).toUpperCase().padStart(2, '0'));
        
              
              setFlags(prevFlags => {
                const newFlags = new Map(prevFlags);
                newFlags.set('Z', result === 0 ? '01' : '00');
                
                console.log('ANI Instruction:', newMap);
                return newFlags;
              });
        
              return newMap;
            });
          } else {
            console.log('Invalid ANI instruction format:', operands);
          }
          break;
          case 'XRA':
            if (operands.length === 1) {
              const srcReg = operands[0];
              setRegister(prev => {
                if (prev.has(srcReg)) {
                  const regValue = parseInt(prev.get(srcReg), 16);
                  const accValue = parseInt(prev.get('A'), 16);
                  
                  const result = (accValue ^ regValue) & 0xFF;
               
                  const newMap = new Map(prev);
                  newMap.set('A', result.toString(16).toUpperCase().padStart(2, '0'));
                  
                  
                  console.log('XRA Instruction:', newMap);
                  return newMap;
                } else {
                  console.log('Unknown register:', srcReg);
                  return prev;
                }
              });
            } else {
              console.log('Invalid XRA instruction format:', operands);
            }
            break;
            case 'XRI':
              if (operands.length === 1) {
                const immediateValue = operands[0];
                setRegister(prev => {
                  const accValue = parseInt(prev.get('A'), 16);
                  const immValue = parseInt(immediateValue, 16);
                  const result = (accValue ^ immValue) & 0xFF;
            
                  const newMap = new Map(prev);
                  newMap.set('A', result.toString(16).toUpperCase().padStart(2, '0'));
                  console.log('XRI Instruction:', newMap);
                  return newMap;
                });
              } else {
                console.log('Invalid XRI instruction format:', operands);
              }
              break;
        case 'ORI':
            if (operands.length === 1) {
              const immediateValue = operands[0];
              setRegister(prev => {
                const accValue = parseInt(prev.get('A'), 16);
                const immValue = parseInt(immediateValue, 16);
                const result = (accValue | immValue) & 0xFF;
              
                const newMap = new Map(prev);
                newMap.set('A', result.toString(16).toUpperCase().padStart(2, '0'));
              return newMap;
              });
        } else {
            console.log('Invalid ORI instruction format:', operands);
            }
        break;
        case 'ORA':
          if (operands.length === 1) {
            const srcReg = operands[0];
            setRegister(prev => {
              if (prev.has(srcReg)) {
                const regValue = parseInt(prev.get(srcReg), 16);
                const accValue = parseInt(prev.get('A'), 16);
                const result = (accValue | regValue) & 0xFF;
        
                const newMap = new Map(prev);
                newMap.set('A', result.toString(16).toUpperCase().padStart(2, '0'));
        
                console.log('ORA Instruction:', newMap);
                return newMap;
              } else {
                console.log('Unknown register:', srcReg);
                return prev;
              }
            });
          } else {
            console.log('Invalid ORA instruction format:', operands);
          }
          break;
           
          default:
        console.log('Unknown instruction:', opCode);
        break;
    }
    await delay(500); 
  }

  const processCode = async () => {
    if (hasProcessedCode.current) return;
    hasProcessedCode.current = true;

    const lines = code.toUpperCase().split('\n');
    for (const line of lines) {
      console.log('Processing line:', line.trim());
      await executeInstruction(line.trim());
    }
    setIsCodeProcessed(true);
  };

  useEffect(() => {
  processAdditionalText();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [additionalText]);


  useEffect(() => {
    if (code && !isCodeProcessed) {
      processCode();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hexMap, code, isCodeProcessed]);
  

  return (
    <div className="process-container">
      <br />
      <h2>Results</h2>
      <div>
        <p>
          A = {register.get('A')}, B = {register.get('B')}, C = {register.get('C')}, D = {register.get('D')}, E = {register.get('E')}, H = {register.get('H')}, L = {register.get('L')}
        </p>
        <p>
          S = {flags.get('S')}, Z = {flags.get('Z')}, AC = {flags.get('AC')}, P = {flags.get('P')}, CY = {flags.get('CY')}
        </p>
      </div>
      <div className="hex-values">
        <h3>Memory</h3>
        {Array.from(hexMap.entries()).map(([key, value]) => (
          <p key={key}>{key}: {value}</p>
        ))}
      </div>
    </div>
  );
}