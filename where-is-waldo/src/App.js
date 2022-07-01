import { useEffect, useRef, useState } from 'react';
import './App.css';
import image from './images/adventure-time.png';
import Navbar from './components/header';
import Footer from './components/footer';
import { getCoordsBackEnd } from './firebase';
import Message from './components/message';


function App() {

  const imgRef = useRef(null);
  const square = useRef(null);
  const firstLi = useRef(null);
  const secondLi = useRef(null);
  const thirdLi = useRef(null);

  let coordsUser = {};

  const [toggle, setToggle] = useState("hidden");
  const [message, setMessage] = useState("Houser");

  useEffect(() => {
    const intervalId = setTimeout(() => {
      setToggle("hidden");
    }, 2000);

    return () => {
      clearTimeout(intervalId);
    }
  }, [toggle])

  const adjustSelectingSquare = (x,y) =>{
    const width = square.current.offsetWidth/2;
    const height = square.current.offsetHeight/2;

    const magicDiv = document.querySelector(".magic-div");

    magicDiv.style.top = `${y-height}px`;
    magicDiv.style.left = `${x-width}px`
  }

  const createRelativeCoordinates = (x,y) => {
    const widthImage = imgRef.current.offsetWidth;
    const heightImage = imgRef.current.offsetHeight;

    let relX = Math.round((x/widthImage)*100);
    let relY = Math.round(((y)/heightImage)*100);

    return [relX, relY];
  }

  function checkIfSelected(selectedX, selectedY, solutionX, solutionY, character){
    
      let distance = Math.sqrt(Math.pow(selectedX-solutionX,2)+Math.pow(selectedY-solutionY,2));
      /*console.log(`Y final: ${solutionY}`);
      console.log(`distance: ${distance}`);
      console.log(`X solution: ${solutionX}`);
      console.log(`Y solution: ${solutionY}`);*/
      console.log(`Distance: ${distance}`);

      if(distance < 12){
        /*console.log(`You hit ${character}`);*/
        removeCharacterFromList(character);
        setToggle("show");
        setMessage(`You have found ${character}!`);
      } else {
        /*console.log("Keep trying");*/
        setToggle("show-incorrect");
        setMessage(character);
        setMessage("Keep trying")
      }
    }

  const removeCharacterFromList = (character) => {
    let element;
        if(character === "Tree Trunks"){
          element = thirdLi.current;
        } else if(character === "BMO"){
          element = firstLi.current;
        } else{
          element=secondLi.current;
        }
        element.style.display = "none";
  }

  const eventDIV = (e) => {
    const magicDiv = square.current;
    magicDiv.style.display = "flex";

    let x = e.pageX;
    let y = (e.pageY-140);

    let relX;
    let relY;

    adjustSelectingSquare(x,y);
    [relX, relY] = createRelativeCoordinates(x,y);


    coordsUser = {coordX: relX, coordY: relY};
    
    /*console.log(`y: ${y}`);
    console.log(`x: ${x}`);*/
    console.log(`x: ${relX}`);
    console.log(`y: ${relY}`);
  } 

  const getValueLi = async (e) => {
    const li = e.target.textContent;
    const coords = await getCoordsBackEnd(li);
    let coordsSolution = "";
    coords.forEach(doc => coordsSolution = doc.data())
    checkIfSelected(coordsUser.coordX, coordsUser.coordY, coordsSolution.coordX,
      coordsSolution.coordY, coordsSolution.character);
  }

  return (
    <div className="App">
      <div className='full-height'>
        <Navbar />
        <div className='image-container'>
          <img src={image} alt='cartoon-network' className='img-project' ref={imgRef} onClick = {eventDIV}></img>
          <Message toggleMessage={toggle} message = {message} />
          <div className='magic-div' ref={square}>
            <div className='container-list'>
              <ul className='list-characters'>
                <li className='li-element BMO' ref={firstLi} onClick = {getValueLi}>BMO</li>
                <li className='li-element middle Marceline' ref={secondLi} onClick = {getValueLi}>Marceline</li>
                <li className='li-element Tree-Trunks' ref={thirdLi} onClick = {getValueLi}>Tree Trunks</li>
              </ul>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
