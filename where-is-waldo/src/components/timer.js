import { useEffect, useState } from 'react';
import '../styles/timer.css';

const Timer = () => {

    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);

    useEffect(() => {
       const intervalId =  setInterval(() => {
            if(seconds === 59){
                setSeconds(0);
                setMinutes(oldMinutes => oldMinutes + 1);
            } else {
                setSeconds( oldSeconds => oldSeconds + 1);
            }
        }, 1000)

        return () => {
            clearInterval(intervalId);
        }

    }, [seconds])

    return(
        <div className='DIV-timer'>{
            minutes <= 9 ? (seconds <= 9 ? 
            (<div>{`0${minutes}:0${seconds}`}</div>) : 
            (<div>{`0${minutes}:${seconds}`}</div>)) :
            (seconds <= 9 ? 
                (<div>{`${minutes}:0${seconds}`}</div>) : 
                (<div>{`${minutes}:${seconds}`}</div>))
        }</div>
    )
            
    
}

export default Timer;