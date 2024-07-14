import React, { useState ,useRef } from 'react'
import { Link } from 'react-router-dom'
import Logo from "../../Assets/logo2.jpg"
import userImg from '../../Assets/user.png'
import bot from "../../Assets/bot.png"

export default function BotPage() {


    const [state, setState] = useState("")
    const [messages, setMessages] = useState([])
    const dummy = useRef();

    let uid = Math.random().toString().slice(2, 15)

    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

    const handleSubmit = (e) => {
        messages.push({
            message: state.text,
            uid
        })
        messages.push({
            message: "I'm a Bot"
        })
        dummy.current.scrollIntoView({ behavior: 'smooth' });
        setState("")
        document.getElementById("text").value = ""
        document.getElementById("assisttext").innerHTML = ""
        console.log(messages)
    }

    const handleFocus = () => {
        document.getElementById("text").style.outline = "none"
    }


    const handleKeyPress = (e) => {
        if (e.key == "Enter") {
            e.preventDefault()
            handleSubmit()
        }
    }

    return (
        <main className='bot-page'>
            <Link to={"/"} >
                <img src={Logo} className='ms-3 mt-3' style={{ "width": "75px" }} alt="" />
            </Link>
            <div className="container-fluid chatContaienr">
                <h1 className="text-center text-white my-4" id='assisttext'>
                    How can I assisst You
                </h1>
                {
                    messages.map((message, i) => {
                        const className = message.uid ? "userMessage" : "botMessage"
                        const margin = message.uid ? "ms-auto me-4" : "me-auto ms-4"
                        const text = message.uid ? "text-end" : "text-start"
                        const img = message.uid ? userImg : bot
                        const width = message.uid ? "50px" : "90px"
                        return (
                            <>
                                <div className={`${className} ${text} mt-4 ${margin}`} key={uid}>
                                    <img src={img} style={{ "width": { width }, "height": "55px", "borderRadius": "50%" }} alt="" />
                                    <p className="m-0 userInput" id='userInput'>
                                        {message.message}
                                    </p>
                                </div>
                            </>
                        )
                    })}
                
            </div>
            <input
                id='text'
                onFocus={handleFocus}
                onChange={handleChange}
                onKeyDown={handleKeyPress}
                className="send-input"
                placeholder="Send a message."
                type="text"
                name='text'
            />
            <button className="send" onClick={handleSubmit} disabled={!state}>
                <svg
                    className="send-icon"
                    id="Capa_1"
                    style={{
                        enableBackground: 'new 0 0 512 512'
                    }}
                    version="1.1"
                    viewBox="0 0 512 512"
                    x="0px"
                    xmlSpace="preserve"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    y="0px"
                >
                    <g>
                        <g>
                            <path
                                d="M481.508,210.336L68.414,38.926c-17.403-7.222-37.064-4.045-51.309,8.287C2.86,59.547-3.098,78.551,1.558,96.808 L38.327,241h180.026c8.284,0,15.001,6.716,15.001,15.001c0,8.284-6.716,15.001-15.001,15.001H38.327L1.558,415.193 c-4.656,18.258,1.301,37.262,15.547,49.595c14.274,12.357,33.937,15.495,51.31,8.287l413.094-171.409 C500.317,293.862,512,276.364,512,256.001C512,235.638,500.317,218.139,481.508,210.336z"
                                fill="#6B6C7B"
                            />
                        </g>
                    </g>
                </svg>
            </button>
            <span ref={dummy}></span>
        </main>
    )
}