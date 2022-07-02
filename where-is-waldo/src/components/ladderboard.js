import '../styles/ladderboard.css';
import { userContext } from '../App';
import { useContext, useEffect, useState } from 'react';
import { saveData, getLadderboard } from '../firebase';

const Ladderboard = () => {
    let [username, finalTimeUser] = useContext(userContext);

    const [players, setPlayers] = useState([])
    const [shouldUpdatePlayers, setShouldUpdatePlayers] = useState("No");
    const [playersOrdered, setPlayersOrdered] = useState([]);

    /*setPlayers(playerHelper);*/
    useEffect(() => {
        if(username !== 0 && finalTimeUser !== 0){
          async function fetchScores(){
            await saveData(username, finalTimeUser);
            let ladderboard = await getLadderboard();
            ladderboard.forEach(doc => {
                /*console.log(doc.data())*/
                setPlayers(oldArray => [...oldArray, doc.data()]);
            });
          }
          fetchScores();
          if(shouldUpdatePlayers === "No") setShouldUpdatePlayers("Yes");
          else setShouldUpdatePlayers("No");
        }
        
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [username, finalTimeUser])

    useEffect(() => {
        sortData();
        return () => {
            sortData();
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shouldUpdatePlayers, players])


    const sortData = () => {
        if(players.length > 0){
            let playerHelper = [...players]
            playerHelper.sort(function(a,b){
                return a.time - b.time;
            })
            setPlayersOrdered(playerHelper);
        }
    } 
    
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
        <div className='ladderboard-section'>
            <div className='ladderboard'>
                <div className='title-ladderboard'>Top 5</div>
                { (playersOrdered.length > 0) ? (
                <ol className='list-top-player'>
                    <li className='player player-1'>
                        <div className='list-player'>
                            <div className='username'>{playersOrdered[0].name}</div>
                            <div className='user-time'>{time_convert(playersOrdered[0].time)}</div>
                        </div>
                    </li>
                    <li className='player player-2'>
                        <div className='list-player'>
                            <div className='username'>{playersOrdered[1].name}</div>
                            <div className='user-time'>{time_convert(playersOrdered[1].time)}</div>
                        </div>
                    </li>
                    <li className='player player-3'>
                        <div className='list-player'>
                            <div className='username'>{playersOrdered[2].name}</div>
                            <div className='user-time'>{time_convert(playersOrdered[2].time)}</div>
                        </div>
                    </li>
                    <li className='player player-4'>
                        <div className='list-player'>
                            <div className='username'>{playersOrdered[3].name}</div>
                            <div className='user-time'>{time_convert(playersOrdered[3].time)}</div>
                        </div>
                    </li>
                    <li className='player player-5'>
                        <div className='list-player'>
                            <div className='username'>{playersOrdered[4].name}</div>
                            <div className='user-time'>{time_convert(playersOrdered[4].time)}</div>
                        </div>
                    </li>
                </ol>
                ) : ("empty")}
            </div>
        </div>
    )
}

export default Ladderboard;