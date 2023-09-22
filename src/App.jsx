
import './App.css'
import Layout from './layout'
import { Route, Routes } from 'react-router-dom'
import { Users } from './user'
import { NewPlaces, UserPlaces } from './places'
function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Users />} />
          <Route path='/:userId/places' element={<UserPlaces />} />
          <Route path='/places/new' element={<NewPlaces />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
