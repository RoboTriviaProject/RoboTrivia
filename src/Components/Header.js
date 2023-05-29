import '../App.css';
import logo from './../assets/images/robotLogo-min.png';
import helpIcon from './../assets/images/helpIcon-min.png'
import HowTo from './HowTo';
import { useState } from 'react';

const Header = () => {

    const [isOpen, setIsOpen] = useState(false);

    const handlePopUp = () => {
        setIsOpen(!isOpen);
    };

    

    return(
        <header>
            <img src={logo} className="logo" alt="a yellow robot head" />
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