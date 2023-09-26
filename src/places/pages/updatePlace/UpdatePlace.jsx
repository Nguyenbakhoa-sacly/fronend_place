import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Input, Button, Card } from '../../../shared';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../../shared/util/validators';
import { useForm } from '../../../shared/hooks/form-hook';

const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire...State Building',
    description: 'One of the most famous sky scrapers in the world!',
    imageUrl: 'https://vuonlan.com.vn/wp-content/uploads/2023/06/50-ten-cac-loai-hoa-dep-y-nghia-nhat-the-gioi-982.jpg',
    address: '20 W 30th St, New York, NY 10001',
    location: {
      lat: 40.7484405,
      lng: -73.9878584
    },
    creatorId: 'a1'
  },
  {
    id: 'p2',
    title: 'Empire111 State Building',
    description: 'One of the most famous sky scrapers in the world!',
    imageUrl: 'https://hoatuoihoamy.com/wp-content/uploads/2021/05/IMG_9880-1.jpg',
    address: '20 W 30th St, New York, NY 10001',
    location: {
      lat: 40.7484405,
      lng: -73.9878584
    },
    creatorId: 'a2'

  },

]

const UpdatePlace = () => {
  const placeId = useParams().placeId;
  const [isLoading, setIsLoading] = useState(true);
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

  const identifiedPlaces = DUMMY_PLACES.find(pl => pl.id === placeId
  )

  useEffect(() => {
    if (identifiedPlaces) {
      setFormData({
        title: {
          value: identifiedPlaces.title,
          isValid: true
        },
        description: {
          value: identifiedPlaces.description,
          isValid: true
        },
      }, true)
    }
    setIsLoading(false);
  }, [setFormData, identifiedPlaces])

  const handleSubmitHandler = (e) => {
    e.preventDefault();
    console.log(formState.inputs); //send this to the backend
  }

  if (!identifiedPlaces) {
    return (
      < div className='center'>
        <Card>
          <h2>Could not find place</h2>
        </Card>
      </div >
    )
  }

  if (isLoading) {
    return (
      <div className='center'>
        <h2>Loading...</h2>
      </div>
    )
  }

  return (
    <>
      < form className='place-form' onSubmit={handleSubmitHandler}>
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputaHandler}
          initiaValue={formState.inputs.title.value}
          initiaValid={formState.inputs.title.isValid}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText='Please enter a valid decription (at least 5 characters ).'
          onInput={inputaHandler}
          initiaValue={formState.inputs.description.value}
          initiaValid={formState.inputs.description.isValid}
        />
        <Button
          type='submit'
          disabled={!formState.isValid}>
          UPDATE PLACE
        </Button>
      </form >
    </>
  )
}

export default UpdatePlace
