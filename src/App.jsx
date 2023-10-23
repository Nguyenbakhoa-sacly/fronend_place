
import './App.css'
import Layout from './layout'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { Users, Auth } from './user'
import { NewPlaces, UserPlaces, UpdatePlace } from './places'
import { AuthContext } from './shared/context/auth-context'
import { useCallback, useState } from 'react'
function App() {
  const navigate = useNavigate();
  const [token, setToken] = useState(false)
  const [userId, setUserId] = useState(false)

  const login = useCallback((uid, token) => {
    setToken(token);
    setUserId(uid);
    navigate("/");
  }, [])

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    navigate("/auth");
  }, [])

  return (
    <>
      <AuthContext.Provider value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout
      }}>
        <Routes>
          <Route path='/' element={<Layout />}>
            {
              token ? (
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
