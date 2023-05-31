import '../App.css';
import logo from './../assets/images/robotLogo-min.png';
import helpIcon from './../assets/images/helpIcon-min.png'
import HowTo from './HowTo';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {

    const [isOpen, setIsOpen] = useState(false);

    const handlePopUp = () => {
        setIsOpen(!isOpen);
    };
    return(
        <header>
            <Link to="/" className='logo'>
                <img src={logo} className="" alt="a yellow robot head" />
                <p className='homeText'>Home</p>
            </Link>
            <h1>Robo Trivia</h1>
            <img src={helpIcon} className="helpIcon" alt="circular help icon " onClick={handlePopUp}/>
            {
                isOpen && <HowTo 
                    handleClose={handlePopUp} 
                /> 
            }
        </header>
    )
}

export default Header;