import { useEffect } from 'react';
import './App.css';
import Login from './components/Login/Login';
import { useDispatch, useSelector } from 'react-redux';
import Spotify from './components/Spotify/Spotify';


function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => {
    return state.token
  })
  useEffect(() => {
    const hash = window.location.hash;
    if(hash){
      const token = hash.substring(1).split("&")[0].split("=")[1]
      // console.log(token);
      dispatch({
        type:"SET_TOKEN",
        token:token
      })
    }
  },[token,dispatch])
  return (
    <div className="App">
      {
        token ? <Spotify/> : <Login/>
      }
    </div>
  );
}

export default App;
