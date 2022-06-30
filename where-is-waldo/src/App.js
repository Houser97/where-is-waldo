import { useRef } from 'react';
import './App.css';
import image from './images/adventure-time.png';
import Navbar from './components/header';
import Footer from './components/footer';


function App() {

  const imgRef = useRef(null);
  const square = useRef(null);

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

  function checkIfSelected(selectedX, selectedY){
    /* Finn coordinantes */
      let solutionX = 46;
      let solutionY = 30;
    
      let distance = Math.sqrt(Math.pow(selectedX-solutionX,2)+Math.pow(selectedY-solutionY,2));
      /*console.log(`Y final: ${solutionY}`);
      console.log(`distance: ${distance}`);
      console.log(`X solution: ${solutionX}`);
      console.log(`Y solution: ${solutionY}`);*/
      console.log(`Distance: ${distance}`);
    }

  const eventDIV = (e) => {
    let x = e.pageX;
    let y = (e.pageY-140);

    let relX;
    let relY;

    adjustSelectingSquare(x,y);
    [relX, relY] = createRelativeCoordinates(x,y);
    checkIfSelected(relX,relY)
    
    /*console.log(`y: ${y}`);
    console.log(`x: ${x}`);*/
    console.log(`x: ${relX}`);
    console.log(`y: ${relY}`);
  } 



  return (
    <div className="App">
      <div className='full-height'>
        <Navbar />
        <div className='image-container'>
          <img src={image} alt='cartoon-network' className='img-project' ref={imgRef} onClick = {eventDIV}></img>
          <div className='magic-div' ref={square}></div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
