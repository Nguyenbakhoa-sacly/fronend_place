
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { UsersList } from '../index'
import { ErrorModal, LoadingSpinner } from '../../shared'
const Users = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [data, setData] = useState([])
  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      await axios.get(`http://127.0.0.1:3000/api/users`)
        .then((response) => {
          setData(response.data.users);
          setIsLoading(false);
        }).catch((error) => {
          setIsLoading(false);
          setError(error.message);
        });
    }
    sendRequest();

  }, [])
  const errorHandler = () => {
    setError(null);
  }
  console.log(data)
  return (
    <>
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && (
        <div className='center'>
          <LoadingSpinner />
        </div>
      )}
      {
        !isLoading && data &&
        <UsersList items={data} />
      }
    </>
  )
}

export default Users
