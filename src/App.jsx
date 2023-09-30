
import './App.css'
import Layout from './layout'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { Users, Auth } from './user'
import { NewPlaces, UserPlaces, UpdatePlace } from './places'
import { AuthContext } from './shared/context/auth-context'
import { useCallback, useState } from 'react'
function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const login = useCallback(() => {
    setIsLoggedIn(true)
    navigate("/");
  }, [])
  const logout = useCallback(() => {
    setIsLoggedIn(false)
    navigate("/auth");
  }, [])

  // let routes;
  // if (isLoggedIn) {
  //   routes = (
  //     <>
  //       <Route index element={<Users />} />
  //       <Route path='/:userId/places' element={<UserPlaces />} />
  //       <Route path='/places/new' element={<NewPlaces />} />
  //       <Route path='/places/:placeId' element={<UpdatePlace />} />

  //     </>
  //   )
  // } else {
  //   routes = (
  //     <>
  //       <Route index element={<Users />} />
  //       <Route path='/:userId/places' element={<UserPlaces />} />
  //       <Route path='/auth' element={<Auth />} />
  //     </>
  //   )
  // }

  return (
    <>
      <AuthContext.Provider value={{
        isLoggedIn: isLoggedIn,
        login: login,
        logout: logout
      }}>
        <Routes>
          <Route path='/' element={<Layout />}>
            {
              isLoggedIn ? (
                <>
                  <Route index element={<Users />} />
                  <Route path='/:userId/places' element={<UserPlaces />} />
                  <Route path='/places/new' element={<NewPlaces />} />
                  <Route path='/places/:placeId' element={<UpdatePlace />} />

                </>
              ) : (
                <>
                  <Route index element={<Users />} />
                  <Route path='/:userId/places' element={<UserPlaces />} />
                  <Route path='/auth' element={<Auth />} />
                </>
              )
            }
          </Route>

        </Routes>
      </AuthContext.Provider>
    </>
  )
}

export default App
