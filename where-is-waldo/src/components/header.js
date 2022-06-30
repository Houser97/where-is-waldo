import '../styles/header.css';
import logo from '../images/Adventure-time-logo.png';
import Timer from './timer';

const Navbar = () => {
    return(
        <header>
            <div className='characters-DIV'>
                <div className='where-is'>Where is...?</div>
                <div className='characters'>
                    <div className='photo-name'>
                        <div className='fin-photo character'></div>
                        <div className='name'>Finn</div>
                    </div>

                    <div className='photo-name'>
                        <div className='second-photo character'></div>
                        <div className='name'>Finn</div>
                    </div>

                    <div className='photo-name'>
                        <div className='third-photo character'></div>
                        <div className='name'>Finn</div>
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