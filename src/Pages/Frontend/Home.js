import React from 'react'
import { Link } from 'react-router-dom'
// images To use in Services
import radiotor from "../../Assets/radiotor.png"
import gearBox from "../../Assets/gearBox.png"
import brakes from "../../Assets/brakes.png"
import engine from "../../Assets/engine.png"
import suspension from "../../Assets/suspension.png"
import diagnose from "../../Assets/diagnose.png"
import battery from "../../Assets/battery.png"
import body from "../../Assets/body.png"
// image To use in Last section
import sectionImg from "../../Assets/sectionImg.jpg"


export default function Home() {
    return (
        <>
            <main>
                {/* Services */}

                <h1 className="fw-bolder text-center my-5">
                    Our Services
                </h1>
                <div className="container-fluid my-5">
                    {/* Row 1 */}
                    <div className="row">
                        <div className="col">
                            <div className="home-card card-1">
                                <p className="review-heading">
                                    What Services We Provide
                                </p>
                                <div className="main-review">
                                    <div className="intro-container">
                                        <div className="img-box">
                                            <img src={diagnose} alt="" />
                                        </div>
                                    </div>
                                    <p className="review px-2">
                                        Accurate vehicle diagnoses and inspections for precise repair solution
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="home-card card-1">
                                <p className="review-heading">
                                    What Services We Provide
                                </p>
                                <div className="main-review">
                                    <div className="intro-container">
                                        <div className="img-box">
                                            <img src={gearBox} alt="" />
                                        </div>
                                    </div>
                                    <p className="review px-2">
                                        Expert gearbox repairs and replacements done with precision and speed.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="home-card card-1">
                                <p className="review-heading">
                                    What Services We Provide
                                </p>
                                <div className="main-review">
                                    <div className="intro-container">
                                        <div className="img-box">
                                            <img src={brakes} alt="" />
                                        </div>
                                    </div>
                                    <p className="review px-2">
                                        Reliable brake repairs and replacements for safe and smooth stops.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Row 2 */}
                    <div className="row">
                        <div className="col">
                            <div className="home-card card-1">
                                <p className="review-heading">
                                    What Services We Provide
                                </p>
                                <div className="main-review">
                                    <div className="intro-container">
                                        <div className="img-box">
                                            <img src={engine} alt="" />
                                        </div>
                                    </div>
                                    <p className="review px-2">
                                        Professional engine repairs and replacements for maximum power and efficiency
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="home-card card-1">
                                <p className="review-heading">
                                    What Services We Provide
                                </p>
                                <div className="main-review">
                                    <div className="intro-container">
                                        <div className="img-box">
                                            <img src={battery} alt="" />
                                        </div>
                                    </div>
                                    <p className="review px-2">
                                        Reliable battery testing, replacement, and maintenance for lasting performance
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="home-card card-1">
                                <p className="review-heading">
                                    What Services We Provide
                                </p>
                                <div className="main-review">
                                    <div className="intro-container">
                                        <div className="img-box">
                                            <img src={body} alt="" />
                                        </div>
                                    </div>
                                    <p className="review px-2">
                                        Professional bodywork repairs and painting for a like-new appearance.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Last Section */}
                <div className="container-fluid my-5">
                    <div className="row">
                        <div className="col-12 col-lg-6 p-4">
                            <p className='m-0' style={{ "fontSize": "22px" }}>
                                Need a hassle-free way to keep your car in top shape? AutoCareBot is here to make car servicing easy and convenient for you. Whether it's routine maintenance, repairs, or a quick check-up, our bot is your trusted guide in getting expert advice.Explore our range of services, and stay updated on your car's maintenance schedule.—all through a seamless and user-friendly experience designed to save you time and keep your car running smoothly.Let AutoCareBot take care of your car so you can focus on the road ahead. Start exploring now!
                            </p>
                            <Link to={"/dashboard/bot"}>
                                <button className="Link-button mx-auto d-block my-3">
                                    <div className="inner">
                                         Discover the Bot
                                    </div>
                                </button>
                            </Link>
                        </div>
                        <div className="col-12 col-lg-6 p-0">
                            <img src={sectionImg} className='image-fluid w-100' alt="" />
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
