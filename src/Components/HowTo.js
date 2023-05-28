import redRobot from './../assets/images/redRobot-min.png';
import './../App.css';

const HowTo = () => {
    return (
        <section>
            <h2>How to play</h2>
            <div className="instructionContainer">
                <span>01.</span>
                <p>Choose your categories, level of difficulty and type of questions.</p>

                <span>02.</span>
                <p>Answer each question within 15 seconds.</p>

                <span>03.</span>
                <p>The one who gets the most points win.</p>

                <span>04.</span>
                <p>Have fun!</p>
            </div>
            <div className="imageContainer">
                <img src={redRobot} className="redRobotImg" alt="a red robot standing" />
            </div>
            
        </section>
    )
}