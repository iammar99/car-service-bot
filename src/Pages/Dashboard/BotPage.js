import React, { useState, useRef, useEffect } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { Link } from 'react-router-dom'
import Logo from "../../Assets/logo2.jpg"
import userImg from '../../Assets/user.png'
import bot from "../../Assets/bot.png"
import ResponseLoader from 'Components/Screen Loader/ResponseLoader'
import ReactMarkdown from 'react-markdown';

export default function BotPage() {
    const [state, setState] = useState({ text: "" });
    const [messages, setMessages] = useState([]);
    const [loader, setLoader] = useState(false);
    const [isFocus, setIsFocus] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const dummy = useRef();

    // const genAI = new GoogleGenerativeAI("AIzaSyBCJUZsNRKF0N4M3FrdMgvCj5pFVhomzpE");

    // const model = genAI.getGenerativeModel({
    //     model: "Model ID: llama-3.1-70b-versatile"
    // });

    let uid = Math.random().toString().slice(2, 15);

    const handleChange = (e) => setState({ ...state, [e.target.name]: e.target.value });

    const handleSubmit = async () => {
        if (!state.text) return;
        
        setIsFocus(false);
        setLoader(true);
        document.getElementById("text").value = "";
        setMessages([...messages, { message: state.text, uid }]);

        try {
            const response = await fetch('http://localhost:5000/api/predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: state.text }),
            });

            const result = await response.json();
            setMessages(prevMessages => [...prevMessages, { message: result.prediction }]);
        } catch (error) {
            console.error('Error fetching prediction:', error);
        }

        setState({ text: "" });
        setLoader(false);
    };

    const handleFocus = () => {
        setIsFocus(true);
        document.getElementById("text").style.outline = "none";
    };

    const handleBlur = () => {
        setIsFocus(false);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    const startListening = () => {
        setIsListening(true);
        recognition.start();

        recognition.onresult = (event) => {
            const transcript = event.results[event.results.length - 1][0].transcript;
            setState(prevState => ({ ...prevState, text: transcript }));
            
            recognition.stop();
        };

        recognition.onend = () => {
            if (state.text.trim()) {
                handleSubmit();
            }
            setIsListening(false);
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error detected: ", event.error);
            recognition.stop();
            setIsListening(false);
        };
    };

    useEffect(() => {
        if (state.text && isListening) {
            handleSubmit();
        }
    }, [state.text]);

    // For smooth scroll
    useEffect(() => {
        dummy.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <main className='bot-page'>
            <Link to={"/"}>
                <img src={Logo} className='ms-3 mt-3' style={{ width: "75px" }} alt="Logo" />
            </Link>
            <div className="container-fluid chatContaienr">
                <h1 className="text-center text-white my-4" id='assisttext'>
                    How can I assist you with car services?
                </h1>
                {messages.map((message, i) => {
                    const className = message.uid ? "userMessage" : "botMessage";
                    const margin = message.uid ? "ms-auto me-4" : "me-auto ms-4 mb-4";
                    const text = message.uid ? "text-start" : "text-start";
                    const img = message.uid ? userImg : bot;
                    const width = message.uid ? "50px" : "90px";
                    return (
                        <div className={`${className} ${text} mt-4 ${margin}`} key={i}>
                            <img src={img} style={{ width, height: "55px", borderRadius: "50%", margin: "0px 17px" }} alt="" />
                            {message.uid ? (
                                <p className="m-0 userInput" id='userInput'>
                                    {message.message}
                                </p>
                            ) : (
                                <ReactMarkdown className="m-0 botResponse" id='botResponse'>
                                    {message.message}
                                </ReactMarkdown>
                            )}
                        </div>
                    )
                })}
                <span ref={dummy}></span> 
            </div>
            <input
                id='text'
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChange}
                onKeyDown={handleKeyPress}
                className="send-input"
                placeholder="Ask about car services..."
                type="text"
                name='text'
                value={state.text}
            />
            <div className="send" disabled={!state.text}>
                {
                    loader
                        ?
                        <ResponseLoader />
                        :
                        <>
                            {
                                isFocus
                                    ?
                                    <svg
                                        onClick={handleSubmit}
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
                                    :
                                    <i
                                    onClick={startListening}
                                    className={`fa-solid fa-microphone mic-animation-${isListening?"listening":""}`}
                                    style={{
                                        color: '#ffffff'
                                    }}
                                ></i>
                            }
                        </>
                }
            </div>
        </main>
    );
}
