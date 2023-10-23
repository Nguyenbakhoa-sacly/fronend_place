import React, { useContext } from 'react'
import { useNavigate } from "react-router-dom";
import './NewPlaces.scss'
import { Input, Button, ErrorModal, LoadingSpinner, ImageUpload } from '../../../shared'
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
      },
      image: {
        value: null,
        isValid: false
      }
    }, false);

  const navigate = useNavigate();
  const placeSubmithandler = async (e) => {
    e.preventDefault();
    try {

      const formData = new FormData();
      formData.append('title', formState.inputs.title.value);
      formData.append('description', formState.inputs.description.value);
      formData.append('address', formState.inputs.address.value);
      formData.append('creatorId', auth.userId);
      formData.append('image', formState.inputs.image.value);

      await sendRequest(
        `http://127.0.0.1:3000/api/places`,
        'POST',
        formData,
        {
          Authorization: 'Bearer ' + auth.token
        }
      )
      navigate('/');
    } catch (e) { }
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
        <ImageUpload
          id='image'
          onInput={inputaHandler}
          errorText="Places provide an image."

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
