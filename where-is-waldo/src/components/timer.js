import { useContext, useEffect, useState } from 'react';
import '../styles/timer.css';
import { gameoverContext } from '../App';

const Timer = () => {

    const [seconds, setSeconds] = useState(0);

    let [gameOver, getTime] = useContext(gameoverContext);

    useEffect(() => {
        let intervalId;
        if(gameOver !== "stopGame"){
                intervalId =  setInterval(() => {
                setSeconds(oldSeconds => oldSeconds + 1);
            }, 1000)
        }

        return () => {
            clearInterval(intervalId);
            console.log("remove");
            getTime(seconds);
        };
    }, [gameOver, getTime, seconds]);


    function time_convert(num){ 
        const minutes = Math.floor(num / 60);  
        const seconds = num % 60;
        let minutesToDisplay;
        if(minutes <= 9){
            minutesToDisplay = `0${minutes}`;   
        } else {
            minutesToDisplay = `${minutes}`
        } 
        if (seconds <= 9) {
            return `${minutesToDisplay}:0${seconds}`;
        } else {
            return `${minutesToDisplay}:${seconds}`;
        }     
    }

    return(
        <div className='DIV-timer' id="remove">{
            time_convert(seconds)
        }</div>
    )
            
    
}

export default Timer;