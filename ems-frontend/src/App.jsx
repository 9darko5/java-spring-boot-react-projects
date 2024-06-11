import './App.css'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import Routes from './components/Routes'

import {setAuthToken} from './helpers/setAuthToken'
function App() {

  //check jwt token
  const token = localStorage.getItem("token");
  if (token) {
      setAuthToken(token);
  }

  return (
    <>
      <BrowserRouter>
        <HeaderComponent/>
        <Routes/>
        <FooterComponent/>
      </BrowserRouter>
    </>
  )
}

export default App
