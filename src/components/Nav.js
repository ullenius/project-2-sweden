import React from 'react'

const Nav = (props) => (

    <nav>
              <div className="nav-container">
              <img className="icon"
                    src={process.env.PUBLIC_URL + "/images/icons/rings.png"}
                    alt="Olympic rings"
                    title="Winter Olympics 2024" />
                <button className="button-style"
                    onClick={()=> props.handlePageState("home")}>Search Trips
                </button>
                <button className="button-style">About the Event</button>
                <button className="button-style dropdown">About our<br />Destinations
                  <div className="dropdown-content">
                    <div onClick={() => props.handlePageState("falun")}>Falun</div>
                    <div onClick={() => props.handlePageState("stockholm")}>Stockholm</div>
                    <div onClick={() => props.handlePageState("are")}>Åre</div>
                  </div>
                </button>
                <button className="button-style hidden">View Recommended</button>
              </div>
            </nav>
)

export default Nav