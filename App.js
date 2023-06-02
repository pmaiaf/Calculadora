import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App(){
  const buttons=['LIMPAR','DEL','%','/',7,8,9,'*',4,5,6,'-',1,2,3,'+',0,'.','+/-','=']
  const [currentNumber,setCurrentNumber]=useState("")
  const [lastNumber,setLastNumber]=useState("")

  function calculator(){
    const splitNumbers=currentNumber.split(' ')
    const fistNumber=parseFloat(splitNumbers[0])
    const lastNumber=parseFloat(splitNumbers[2])
    const operator=splitNumbers[1]

    switch(operator){
      case '+':
        setCurrentNumber((fistNumber+lastNumber).toString())
        return
      case '-':
        setCurrentNumber((fistNumber-lastNumber).toString())
        return
      case '*':
        setCurrentNumber((fistNumber*lastNumber).toString())
        return
      case '/':
        setCurrentNumber((fistNumber/lastNumber).toString())
        return
      case '%':
        setCurrentNumber((fistNumber%lastNumber).toString())
        return
    }
  }

  function handleInput(buttonPressed){
    console.log(buttonPressed)
    if(buttonPressed==='+' | buttonPressed==='-' | buttonPressed==='*' | buttonPressed==='/' | buttonPressed==='%'){
      setCurrentNumber(currentNumber+ " " +buttonPressed+ " ")
      return
    }

    switch(buttonPressed){
      case 'DEL':
        setCurrentNumber(currentNumber.substring(0,(currentNumber.length-3)))
        setLastNumber('')
        return
      case 'LIMPAR':
        setLastNumber('')
        setCurrentNumber('')
        return
      case '=':
        setLastNumber(currentNumber+ ' = ')
        calculator()
        return
      case '+/-':
        setLastNumber(currentNumber*-1)
        return
    } 
    setCurrentNumber(currentNumber+buttonPressed)
  }

  return(
    <View style={EstiloCalculadora.Container}>
      <View style={EstiloCalculadora.Results}>
        <Text style={EstiloCalculadora.HistoryText}>{lastNumber}</Text>
        <Text style={EstiloCalculadora.ResultText}>{currentNumber}</Text>
      </View>
      <View style={EstiloCalculadora.Buttons}>
        {buttons.map((button)=>
          button==='='?
          <TouchableOpacity onPress={()=>handleInput(button)}key={button}style={[EstiloCalculadora.Button, {backgroundColor: '#3dd0e3'}]}>
            <Text style={[EstiloCalculadora.TextButton,{color: 'white', fontSize: 30}]}>{button}</Text>
          </TouchableOpacity>
          :
          <TouchableOpacity onPress={()=>handleInput(button)}key={button}style={EstiloCalculadora.Button}>
            <Text style={[EstiloCalculadora.TextButton,{color: typeof(button)==='number'?'black':'#0093a6'}]}>{button}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}


const EstiloCalculadora=StyleSheet.create({
  Container: {
    flex: 1,
  },
  Results: {
    flex: 2,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5'
  },
  ResultText: {
    color: '#282F38',
    fontSize: 32,
    fontWeight: 'bold',
    padding: 12,
    textAlign: 'right'
  },
  HistoryText: {
    color: '#7c7c7c',
    fontSize: 20,
    marginRight: 10,
    alignSelf: 'flex-end',
  },
  Buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  Button: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 90,
    minWidth: 90,
    flex: 2,
  },
  TextButton: {
    color: '#7c7c7c',
    fontSize: 20,
  }
});