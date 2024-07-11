import { useEffect,useState } from 'react'
import './App.css'
import CollaborativeEditor from './components/CollaborativeEditor'
import { Routes,Route,Router } from "react-router-dom";

import { useNavigate } from 'react-router-dom';
function App() {
  // const navigate=Navigate();
  // const navigate=useNavigate();
  // const [room,setRoom]=useState('');
  // const [entered,setEntered]=useState(false);
  // useEffect(() => {
  //   const min=0,max=999;
  //   const randomNum=Math.floor(Math.random()*max)+min;
  //   navigate(`/:${randomNum}`);
  // },[])
  return (
    <>
      {/* hi */}
      {/* {
        !entered?
          <><input placeholder="enter room id" onChange={(e) => { setRoom(e.target.value) }}></input>
            <button onClick={() => {
              console.log("hi");
              setEntered(true);
              navigate(`/:${room}`);
              // <Navigate to="/room" />
            }}>submit</button></>:<></>
      } */}
      {/* <CollaborativeEditor room={room} /> */}
      <Routes>
        {/* <Route exact path="/" element={<Home />} /> */}
        <Route exact path="/" element={<CollaborativeEditor room={0} />} />
        <Route path="/:id" element={<CollaborativeEditor />} />
      </Routes>
    </>
  )
}

export default App
