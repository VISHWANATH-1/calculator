import React, { useReducer } from 'react'
import "./Style.css"
import DigitButton from './DigitButton'
import OperationButton from './OperationButton'
export const ACTIONS ={
  ADD_DIGIT:`add-digit`,
  CHOOSE_OPERATION:`choose-operation`,
  CLEAR:`clear`,
  DELETE_DIGIT:`delete-digit`,
  EVALUATE:`evaluate`,
}

function reducer(state, {type , payload}){
    switch(type){
      case ACTIONS.ADD_DIGIT:
        if (state.overwrite){
          return{
             ...state,
             curOpr: payload.digit,
             overwrite: false,
          }
        }
        if (payload.digit=== "0" && state.curOpr==="0") {
          return state
        }
        if (payload.digit=== "." && state.curOpr.includes(".")) {
          return state
        }
        return{
          ...state,
          curOpr:`${state.curOpr || ""}${payload.digit}`,
        }
      case ACTIONS.CHOOSE_OPERATION:
        if (state.curOpr == null && state.preOpr == null) {
          return state
        }
        if (state.curOpr== null){
          return{
            ...state,
            operation: payload.operation, 
          }
        }
        if (state.preOpr ==null){
          return{
            ...state,
            operation: payload.operation,
            preOpr: state.curOpr,
            curOpr: null,
          }
        }
        return{
          ...state,
          preOpr: evaluate(state),
          curOpr: null,
        }
      case ACTIONS.CLEAR:  
       return{}
       case ACTIONS.EVALUATE:
        if (state.operation ==null || state.curOpr == null || state.preOpr == null){
          return state
        }
        return{
          ...state,
          overwrite:true,
          preOpr:null,
          operation: null,
          curOpr:evaluate(state)
        }
    }
}

function evaluate ({curOpr,preOpr, operation}){
  const prev = parseFloat(preOpr)
  const current = parseFloat(curOpr)
  if(isNaN(prev) || isNaN(current)) return ""
  let computation = ""
  switch (operation){
    case "+": computation = prev + current
    break
    case "-": computation = prev - current
    break
    case "*": computation = prev * current
    break
    case "/": computation = prev / current
    break
  }
  return computation.toString()
}

const Calci = () => {
  const[{curOpr, preOpr, operation},dispatch]=useReducer(reducer, {})

  
  return (
    <div className='calculator-gr'>
        <div className="outpt">
        <div className="pre-opr">{curOpr}{operation}</div>
        <div className="cur-opr">{preOpr}</div>
        </div>
        <button className="span-two" 
        onClick={()=>dispatch({type:ACTIONS.CLEAR})}>AC
        </button>
        <button>DEL</button>
        <OperationButton operation="/" dispatch={dispatch} />
        <DigitButton digit="1" dispatch={dispatch} />
        <DigitButton digit="2" dispatch={dispatch} />
        <DigitButton digit="3" dispatch={dispatch} />
        <OperationButton operation="*" dispatch={dispatch} />
        <DigitButton digit="4" dispatch={dispatch} />
        <DigitButton digit="5" dispatch={dispatch} />
        <DigitButton digit="6" dispatch={dispatch} />
        <OperationButton operation="+" dispatch={dispatch} />
        <DigitButton digit="7" dispatch={dispatch} />
        <DigitButton digit="8" dispatch={dispatch} />
        <DigitButton digit="9" dispatch={dispatch} />
        <OperationButton operation="-" dispatch={dispatch} />
        <DigitButton digit="0" dispatch={dispatch} />
        <DigitButton digit="." dispatch={dispatch} />
        <button className="span-two" 
        onClick={()=> dispatch({type:ACTIONS.EVALUATE})}>=
        </button>
    </div>
  )
}

export default Calci