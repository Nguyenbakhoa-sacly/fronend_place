import React, { useEffect, useReducer } from 'react'
import './Input.scss'
import { validate } from '../../util/validators';
//ham logic
const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true
      };
    default:
      return state
  }
}
const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer,
    {
      value: props.initiaValue || '',
      isValid: props.initiaValid || false,
      isTouched: false
    });
  //console.log(inputState) //gia tri khoi tao { value: '', isValid: false }

  //
  const { id, onInput } = props
  const { value, isValid } = inputState
  //
  useEffect(() => {
    props.onInput(props.id, inputState.value, inputState.isValid)
  }, [id, value, isValid, onInput]);
  //
  const changeHandler = (e) => {
    dispatch({
      type: 'CHANGE',
      val: e.target.value,
      validators: props.validators
    })
  }
  //
  const touchHandler = (e) => {
    dispatch({
      type: 'TOUCH'
    })
  }
  const element = props.element === 'input' ?
    <input
      id={props.id}
      type={props.type}
      placeholder={props.placeholder}
      onChange={(e) => changeHandler(e)}
      value={inputState.value}
      onBlur={touchHandler}
    />
    : <textarea
      id={props.id}
      rows={props.rows || 3}
      onChange={(e) => changeHandler(e)}
      value={inputState.value}
      onBlur={touchHandler}

    />
  return (
    <div className={`form-control  
    ${!inputState.isValid && inputState.isTouched &&
      'form-control--invalid'}`}>
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  )
}

export default Input
