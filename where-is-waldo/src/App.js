import { createContext, useEffect, useRef, useState } from 'react';
import './App.css';
import image from './images/adventure-time.png';
import Navbar from './components/header';
import Footer from './components/footer';
import { getCoordsBackEnd } from './firebase';
import Message from './components/message';
import Form from './components/form';

export const gameoverContext = createContext();

function App() {

  const imgRef = useRef(null);
  const square = useRef(null);
  const firstLi = useRef(null);
  const secondLi = useRef(null);
  const thirdLi = useRef(null);


  const [toggle, setToggle] = useState("hidden");
  const [message, setMessage] = useState("Houser");
  const [isGameOver, setIsGameOver] = useState("continueGame");
  const [numberOfCharacters, setNumberOfCharacters] = useState(3);
  const [coordsUser, setCoordsUser] = useState({coordX: 0, coordY: 0});
  const [finalTimeUser, setFinalTimeUser] = useState(0);
  const [username, setUsername] = useState(0);

  useEffect(() => {
    const intervalId = setTimeout(() => {
      setToggle("hidden");
    }, 2000);

    return () => {
      clearTimeout(intervalId);
    }
  }, [toggle])

  useEffect(() => {
    if(numberOfCharacters === 0){
      setIsGameOver("stopGame");
    }
  }, [numberOfCharacters])

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
      let componentX = Math.pow(Math.abs(selectedX-solutionX),2);
      let componentY = Math.pow(Math.abs(selectedY-solutionY),2)
      let distance = Math.round(Math.sqrt(componentX+componentY));
      /*console.log(`SolutionX ${solutionX}`);
      console.log(`SolutionY ${solutionY}`);
      console.log(`SelectedX ${selectedX}`);
      console.log(`SelectedY ${selectedY}`);
      console.log(`Y final: ${solutionY}`);
      console.log(`distance: ${distance}`);
      console.log(`X solution: ${solutionX}`);
      console.log(`Y solution: ${solutionY}`);
      console.log(`componentX: ${componentX}`);
      console.log(`componentY: ${componentY}`);
      console.log(`Distance: ${distance}`);*/

      if(distance < 5){
        /*console.log(`You hit ${character}`);*/
        removeCharacterFromList(character);
        setToggle("show");
        setMessage(`You have found ${character}!`);
        setNumberOfCharacters(number => number - 1);
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

    let x = 0;
    let y = 0;

    x = e.pageX;
    y = e.pageY-140;

    /*console.log(`x raw: ${x}`);
    console.log(`y raw: ${y}`);*/

    let relX;
    let relY;

    adjustSelectingSquare(x,y);
    [relX, relY] = createRelativeCoordinates(x,y);

    /*console.log(`Rel x raw: ${relX}`);
    console.log(`Rel y raw: ${relY}`);*/


    setCoordsUser({coordX: relX, coordY: relY});
    
    /*console.log(`y: ${y}`);
    console.log(`x: ${x}`);
    console.log(`x: ${typeof(relX)}`);
    console.log(`y: ${typeof(relY)}`);*/
  } 

  const getValueLi = async (e) => {
    const magicDiv = square.current;
    magicDiv.style.display = "none";

    const li = e.target.textContent;
    const coords = await getCoordsBackEnd(li);
    let coordsSolution = "";
    coords.forEach(async doc => coordsSolution = doc.data())
    /*console.log(`Coord Solution X: ${coordsSolution.coordX}`)
    console.log(`Coord Solution Y: ${coordsSolution.coordY}`)
    console.log(coordsSolution.character)
    console.log(`Coord Selected X: ${coordsUser.coordX}`)
    console.log(`Coord Selected Y: ${coordsUser.coordY}`)*/
    checkIfSelected(coordsUser.coordX, coordsUser.coordY, coordsSolution.coordX,
      coordsSolution.coordY, coordsSolution.character);
  }

  const getUserName = (e) => {
    e.preventDefault();
    const popUpForm = e.target.parentNode;
    popUpForm.style.display = "none";
    let name = [...e.target];
    let userName = name[0].value;
    setUsername(userName);
    /*console.log(name[0].value);*/
    e.target.reset();
  }

  const getTime = (seconds) => {
    if(isGameOver === "stopGame"){
      setFinalTimeUser(previousTime => previousTime + seconds +1);
    }
  }

  return (
    <gameoverContext.Provider value={[isGameOver, getTime]}>
      <div className="App">
        <div className='full-height'>
          <Navbar />
          <Form getUserName={getUserName} gameOver = {isGameOver} />
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
    </gameoverContext.Provider>
  );
}

export default App;
