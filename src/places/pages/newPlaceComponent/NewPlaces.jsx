import React, { useCallback } from 'react'
import './NewPlaces.scss'
import { Input, Button } from '../../../shared'
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../../shared/util/validators'
import { useForm } from '../../../shared/hooks/form-hook'
const NewPlaces = () => {

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

  const placeSubmithandler = (e) => {
    e.preventDefault();
    console.log(formState.inputs); //send this to the backend
  }

  return (
    <>
      <form className='place-form' onSubmit={placeSubmithandler}>
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
