import React from 'react'
import { Link } from 'react-router-dom'

export default function TopNav() {
  return (
    <header>
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <h1 className="text-center my-3 text-white">
              Get in Gear with Our Car Expert!
            </h1>
            <p className="text-center text-white  mx-0 mx-sm-auto">
              Get instant answers to your car questions! From car models and features to maintenance and repair, our bot has got you covered. Ask us anything and accelerate your car knowledge!
            </p>
            <Link to={"/dashboard/bot"}>
              <button
                className="header-button-name d-block mx-auto"
                role="button"
              >
                Discover the bot
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
