
import React, { useState, useContext } from 'react'
import './Auth.scss'
import {
  Card, Input, Button,
  ErrorModal, LoadingSpinner,
  ImageUpload
}
  from '../../../shared'
import {
  VALIDATOR_EMAIL, VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from '../../../shared/util/validators'
import { useForm } from '../../../shared/hooks/form-hook'
import { BiShow, BiHide } from 'react-icons/bi'
import { AuthContext } from '../../../shared/context/auth-context';
import { useHttpClient } from '../../../shared/hooks/http-hook'
const Auth = () => {
  const auth = useContext(AuthContext)
  const [showHideEye, setShowHideEye] = useState(false)
  const [isLoginMode, setIsLoginMode] = useState(true)
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

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

  const switchModeHandler = (e) => {
    //login
    if (!isLoginMode) {
      // delete formState.inputs.name;
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined
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
          },
          image: {
            value: null,
            isValid: false
          }
        }, false
      )
    }
    setIsLoginMode(prevMode => !prevMode)
  }

  const authHandleSubmit = async (e) => {
    e.preventDefault();
    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          `${import.meta.env.VITE_BACKEND_URL}/users/login`,
          'POST',
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          }),
          {
            'Content-Type': 'application/json'
          }
        );
        auth.login(responseData.userId, responseData.token);
      } catch (err) { }
    } else {
      try {
        const formData = new FormData();
        formData.append('email', formState.inputs.email.value);
        formData.append('name', formState.inputs.name.value);
        formData.append('password', formState.inputs.password.value);
        formData.append('image', formState.inputs.image.value);

        const responseData = await sendRequest(
          `${import.meta.env.VITE_BACKEND_URL}/users/signup`,
          'POST',
          formData
        );
        auth.login(responseData.userId, responseData.token);
      } catch (e) { }
    }

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

          {!isLoginMode &&
            <ImageUpload
              center
              id='image'
              onInput={inputHandler}
              errorText="Places provide an image."
            />}

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
              validators={[VALIDATOR_MINLENGTH(6)]}
              errorText='Please enter a valid password, at least 6 characters.'
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
