import '../styles/ladderboard.css';

const Ladderboard = () => {
    return(
        <div className='ladderboard-section'>
            <div className='ladderboard'>
                <div className='title-ladderboard'>Top 5</div>
                <ol className='list-top-player'>
                    <li className='player player-1'>
                        <div className='list-player'>
                            <div className='username'>Houser</div>
                            <div className='user-time'>01:00</div>
                        </div>
                    </li>
                    <li className='player player-2'></li>
                    <li className='player player-3'></li>
                    <li className='player player-4'></li>
                    <li className='player player-5'></li>
                </ol>
            </div>
        </div>
    )
}

export default Ladderboard;