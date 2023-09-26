
import React, { useState } from 'react'
import './Auth.scss'
import { Card, Input, Button } from '../../../shared'
import {
  VALIDATOR_EMAIL, VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from '../../../shared/util/validators'
import { useForm } from '../../../shared/hooks/form-hook'
import { BiShow, BiHide } from 'react-icons/bi'

const Auth = () => {
  const [showHideEye, setShowHideEye] = useState(false)
  const [isLoginMode, setIsLoginMode] = useState(true)
  const [formState, inputHandler, setFormData] = useForm({
    email: {
      value: '',
      isValid: false,
    },
    password: {
      value: '',
      isValid: false,
    }
  }, false);

  const authHandleSubmit = (e) => {
    e.preventDefault();
    console.log(formState.inputs)
  }
  const switchModeHandler = (e) => {
    //login
    if (!isLoginMode) {
      delete formState.inputs.name;
      setFormData(
        {
          ...formState.inputs,
          // name: undefined
        }
        ,
        formState.inputs.email.isValid &&
        formState.inputs.password.isValid
      )
    }
    //signup
    else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false
          }
        }, false
      )
    }
    setIsLoginMode(prevMode => !prevMode)
  }
  return (
    <>
      <Card className='authentication'>
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={authHandleSubmit}>
          {
            !isLoginMode &&
            (
              <Input
                element='input'
                id='name'
                type='text'
                label='Your Name'
                validators={[VALIDATOR_REQUIRE()]}
                errorText='Please enter your name.'
                onInput={inputHandler}

              />
            )
          }
          <Input
            id="email"
            element='input'
            type="email"
            label='E-Mail'
            validators={[VALIDATOR_EMAIL()]}
            errorText='Please enter a valid email address.'
            onInput={inputHandler}
          />
          <div className='authentication-showPass'>
            <Input
              id="password"
              element='input'
              type={showHideEye === true ? 'text' : 'password'}
              label='Password'
              validators={[VALIDATOR_MINLENGTH(5)]}
              errorText='Please enter a valid password, at least 5 characters.'
              onInput={inputHandler}
            />
            <label htmlFor="" className='authentication-icon__eye'>
              {
                showHideEye === true ? <BiShow onClick={() => setShowHideEye(!showHideEye)} /> : <BiHide onClick={() => setShowHideEye(!showHideEye)} />
              }
            </label>
          </div>
          <Button
            type='submit'
            disabled={!formState.isValid}
          >
            {isLoginMode ? 'LOGIN' : 'SIGNUP'}

          </Button>
        </form>
        <Button onClick={switchModeHandler}>SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}</Button>
      </Card>
    </>
  )
}

export default Auth
