
import React, { useEffect, useState } from 'react'
import { UsersList } from '../index'
import { ErrorModal, LoadingSpinner } from '../../shared'
import { useHttpClient } from '../../shared/hooks/http-hook'

const Users = () => {
  const [data, setData] = useState([])
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          `${import.meta.env.VITE_BACKEND_URL}/users`);
        setData(responseData.users);
      } catch (e) { }
    }
    fetchUsers();
  }, [sendRequest])

  return (
    <>
      {/* <ErrorModal error={error} onClear={clearError} /> */}

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
