import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Input, Button, Card, LoadingSpinner, ErrorModal }
  from '../../../shared';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH }
  from '../../../shared/util/validators';
import { useForm } from '../../../shared/hooks/form-hook';
import { useHttpClient } from '../../../shared/hooks/http-hook'
import { AuthContext } from '../../../shared/context/auth-context';
const UpdatePlace = () => {
  const auth = useContext(AuthContext)
  const placeId = useParams().placeId;
  const navigate = useNavigate();
  const [loadedPlace, setLoadedPlace] = useState()
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputaHandler, setFormData] = useForm({
    title: {
      value: '',
      isValid: false
    },
    description: {
      value: '',
      isValid: false
    },
  }, false);

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const responseData = await sendRequest(
          `http://127.0.0.1:3000/api/places/${placeId}`);
        setLoadedPlace(responseData.place)
        setFormData({
          title: {
            value: responseData.place.title,
            isValid: true
          },
          description: {
            value: responseData.place.description,
            isValid: true
          },
        }, true)

      } catch (e) { }
    }
    fetchPlace();

  }, [sendRequest, placeId, setFormData]);

  const handleSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      await sendRequest(
        `http://127.0.0.1:3000/api/places/${placeId}`,
        'PATCH',
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token
        });
      navigate(`/${auth.userId}/places`)
    } catch (e) { }
  }

  if (isLoading) {
    return (
      <div className='center'>
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedPlace && !error) {
    return (
      < div className='center'>
        <Card>
          <h2>Could not find place</h2>
        </Card>
      </div >
    )
  }

  return (
    <>
      {/* <ErrorModal error={error} onClear={clearError} /> */}
      < form className='place-form' onSubmit={handleSubmitHandler}>
        {!isLoading && loadedPlace && (
          <>
            <Input
              id="title"
              element="input"
              type="text"
              label="Title"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid title."
              onInput={inputaHandler}
              initiaValue={loadedPlace.title}
              initiaValid={true}
            />
            <Input
              id="description"
              element="textarea"
              label="Description"
              validators={[VALIDATOR_MINLENGTH(5)]}
              errorText='Please enter a valid decription (at least 5 characters ).'
              onInput={inputaHandler}
              initiaValue={loadedPlace.description}
              initiaValid={true}
            />
            <Button
              type='submit'
              disabled={!formState.isValid}>
              UPDATE PLACE
            </Button>
          </>
        )}
      </form >
    </>
  )
}

export default UpdatePlace
