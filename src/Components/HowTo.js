import redRobot from './../assets/images/redRobot-min.png';
import './../App.css';

const HowTo = (props) => {
    
    return (
        <section className='howContainer'>
            <div className="instructionContainer">
            {/* <button className='buttonClose'>✖</button> */}
            <h2>How to play</h2>
                <ul>
                    <li>
                        <span>01. </span>
                        <p>Choose your categories, level of difficulty and type of questions.</p>
                    </li>
                    <li>
                        <span>02.</span>
                        <p>Answer each question within 15 seconds.</p>
                    </li>
                    <li>
                        <span>03.</span>
                        <p>The one who gets the most points win.</p>
                    </li>
                    <li>
                        <span>04.</span>
                        <p>Have fun!</p>
                    </li>
                </ul>
            </div>
            <div className="imageContainer">
                <img src={redRobot} className="redRobotImg" alt="a red robot standing" />
            </div>
        </section>
    )
}

export default HowTo;