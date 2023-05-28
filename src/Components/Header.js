import '../App.css';
import logo from './../assets/images/robotLogo-min.png';
import helpIcon from './../assets/images/helpIcon-min.png'

const Header = () => {
    return(
        <header>
            <img src={logo} className="logo" alt="a yellow robot head" />
            <h1>Robo Trivia</h1>
            <img src={helpIcon} className="helpIcon" alt="circular help icon " />
        </header>
    )
}

export default Header;