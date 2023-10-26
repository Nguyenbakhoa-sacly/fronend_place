
import './App.css'
import Layout from './layout'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { Users, Auth } from './user'
import { NewPlaces, UserPlaces, UpdatePlace } from './places'
import { AuthContext } from './shared/context/auth-context'
import { useCallback, useState, useEffect } from 'react'

let logoutTimer;

function App() {
  const navigate = useNavigate();
  const [token, setToken] = useState(false)
  const [userId, setUserId] = useState(false)
  const [tokenExpirationDate, setTokenExpirationDate]
    = useState()

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
    //hạn sử dụng của token
    const tokenExpirationDate = expirationDate ||
      new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      'userData',
      JSON.stringify(
        {
          userId: uid, token: token,
          expiration: tokenExpirationDate.toISOString()
        }
      ));
    navigate("/");
  }, [])

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setTokenExpirationDate(null);
    localStorage.removeItem('userData');
    navigate("/auth");
  }, [])

  useEffect(() => {
    if (token && tokenExpirationDate) {
      // Tính thời gian còn lại cho đến khi phiên người dùng hết hạn
      const remainingTime = tokenExpirationDate.getTime()
        - new Date().getTime();
      // Đặt một bộ đếm thời gian để gọi hàm logout sau khi thời gian còn lại đã trôi qua
      logoutTimer = setTimeout(logout, remainingTime)
    } else {
      // Xóa bất kỳ bộ đếm thời gian đăng xuất hiện có nào
      clearTimeout(logoutTimer)
    }
  }, [token, logout, tokenExpirationDate]);

  //auto login 
  useEffect(() => {
    const storeData = JSON.parse(
      localStorage.getItem('userData'));
    if (storeData && storeData.token &&
      new Date(storeData.expiration) > new Date()
    ) {
      login(
        storeData.userId,
        storeData.token,
        new Date(storeData.expiration)
      );
    }
  }, [login]);

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
