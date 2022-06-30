import '../styles/header.css';
import logo from '../images/Adventure-time-logo.png';
import BMO from '../images/BMO.jpeg';
import Marceline from '../images/marceline.png'
import Trunks from '../images/Trunks.jpeg'
import Timer from './timer';

const Navbar = () => {
    return(
        <header>
            <div className='characters-DIV'>
                <div className='where-is'>Where is...?</div>
                <div className='characters'>
                    <div className='photo-name'>
                        <img src={BMO} alt='BMO' className='first-photo character'></img>
                        <div className='name'>BMO</div>
                    </div>

                    <div className='photo-name'>
                        <img src={Marceline} alt='Marceline' className='first-photo character'></img>
                        <div className='name'>Marceline</div>
                    </div>

                    <div className='photo-name'>
                        <img src={Trunks} alt='Tree Trunks' className='first-photo character'></img>
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