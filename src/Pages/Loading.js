import React, { useEffect } from "react";
import { preLoaderAnim } from "../animations";
import './../styles/main.scss'

const Loading = () => {

    useEffect( () => {
        preLoaderAnim()
    }, [])

    return (
        <div className="preloader">
            <div className="textContainer">
                <span>Are</span>
                <span>You</span>
                <span>Ready?</span>
            </div>
        </div>
    )
}

export default Loading;