import '../styles/header.css';
import logo from '../images/Adventure-time-logo.png';
import BMO from '../images/BMO.jpeg';
import Marceline from '../images/marceline.png'
import Trunks from '../images/Trunks.jpeg'
import Timer from './timer';
import { useRef } from 'react';

const Navbar = () => {
    const BMOelement = useRef(null);
    const MarcelineElement = useRef(null);
    const Tree = useRef(null);

    return(
        <header>
            <div className='characters-DIV'>
                <div className='where-is'>Where is...?</div>
                <div className='characters'>
                    <div className='photo-name'>
                        <img ref={BMOelement} src={BMO} alt='BMO' className='first-photo character'></img>
                        <div className='name'>BMO</div>
                    </div>

                    <div className='photo-name'>
                        <img ref={MarcelineElement} src={Marceline} alt='Marceline' className='first-photo character'></img>
                        <div className='name'>Marceline</div>
                    </div>

                    <div className='photo-name'>
                        <img ref={Tree} src={Trunks} alt='Tree Trunks' className='first-photo character'></img>
                        <div className='name'>Tree Trunks</div>
                    </div>
                </div>
            </div>
            <img src={logo} alt = "logo" className='logo'></img>
            <div className='timer'>
                <div>Timer</div>
                <Timer />
            </div>
        </header>
    )
}

export default Navbar;