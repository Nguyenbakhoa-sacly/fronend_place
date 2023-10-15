
import React, { useState, useContext } from 'react'
import './Auth.scss'
import { Card, Input, Button, ErrorModal, LoadingSpinner } from '../../../shared'
import {
  VALIDATOR_EMAIL, VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from '../../../shared/util/validators'
import { useForm } from '../../../shared/hooks/form-hook'
import { BiShow, BiHide } from 'react-icons/bi'
import { AuthContext } from '../../../shared/context/auth-context';
import { useHttpClient } from '../../../shared/hooks/http-hook'
const Auth = () => {
  const [showHideEye, setShowHideEye] = useState(false)
  const [isLoginMode, setIsLoginMode] = useState(true)
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext)

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

  const authHandleSubmit = async (e) => {
    e.preventDefault();
    if (isLoginMode) {
      try {
        await sendRequest(
          'http://127.0.0.1:3000/api/users/login',
          'POST',
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          }),
          {
            'Content-Type': 'application/json'
          }
        );
        auth.login();
      } catch (err) { }
    } else {
      await sendRequest(
        'http://127.0.0.1:3000/api/users/signup',
        'POST',
        JSON.stringify({
          name: formState.inputs.name.value,
          email: formState.inputs.email.value,
          password: formState.inputs.password.value
        }),
        {
          'Content-Type': 'application/json'
        }
      );

      auth.login();
    }

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
      <ErrorModal error={error} onClear={clearError} />
      <Card className='authentication'>
        {isLoading && <LoadingSpinner asOverlay />}
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
