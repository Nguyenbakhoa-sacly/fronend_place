import React, { useContext } from 'react'
import { useNavigate } from "react-router-dom";
import './NewPlaces.scss'
import { Input, Button, ErrorModal, LoadingSpinner } from '../../../shared'
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../../shared/util/validators'
import { useForm } from '../../../shared/hooks/form-hook'
import { useHttpClient } from '../../../shared/hooks/http-hook'
import { AuthContext } from '../../../shared/context/auth-context'
const NewPlaces = () => {
  const auth = useContext(AuthContext)
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputaHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      },
      address: {
        value: '',
        isValid: false
      }
    }, false);

  const navigate = useNavigate();
  const placeSubmithandler = async (e) => {
    e.preventDefault();
    try {
      await sendRequest(
        `http://127.0.0.1:3000/api/places`,
        'POST',
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          address: formState.inputs.address.value,
          creatorId: auth.userId
        }),
        { 'Content-Type': 'application/json' }
      )
      navigate('/');
    } catch (e) {

    }
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <form className='place-form' onSubmit={placeSubmithandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="title"
          element='input'
          type="text"
          label='Title'
          validators={[VALIDATOR_REQUIRE()]}
          errorText='Please enter a valid title.'
          onInput={inputaHandler}
        />
        <Input
          id="description"
          element='textarea'
          label='Description'
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText='Please enter a valid decription (at least 5 characters ).'
          onInput={inputaHandler}
        />
        <Input
          id="address"
          element='input'
          label='Address'
          validators={[VALIDATOR_REQUIRE()]}
          errorText='Please enter a valid address.'
          onInput={inputaHandler}
        />
        <Button
          type='submit'
          disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>
    </>
  )
}

export default NewPlaces
