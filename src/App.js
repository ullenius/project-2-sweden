import React, { Component } from 'react';
import MainBody from './components/MainBody';
import Footer from './components/Footer';
import Header from './components/Header';
import './components/App.css';
import backgroundImage from "./images/olympic-rings.png";
import { thisTypeAnnotation } from '@babel/types';
require('dotenv').config();
const url = "http://free.rome2rio.com/api/1.4/json/Search?"
const apiKey = process.env.REACT_APP_ROME_SECRET_KEY
const filter = ""
const filterQueries = {
  a: "noAir",
  b: "noRail",
  c: "noCar",
  d: "noFerry",
  e: "noBus"
};


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      page: "home",
      origin: '',
      destination: 'Stockholm',
      departureDate: '',
      returnDate: '',
      routes: [],
      places: [],
      //checked not in use
      checked: false,
      filterChecked: props.filterChecked || false,
      //black not in use
      black: true,
      filterURL: "",
      filterAir: "",
      filterRail: "",
      filterCar: "",
      filterFerry: "",
      filterBus: ""
      //handledning - spara befintlig data i state
    }
    this.handleDestination = this.handleDestination.bind(this)
    this.handleOrigin = this.handleOrigin.bind(this)
    this.handleDeparture = this.handleDeparture.bind(this)
    this.handleReturn = this.handleReturn.bind(this)
    this.submitSearch = this.submitSearch.bind(this)
    this.sendRequest = this.sendRequest.bind(this)
    //this.toggleFilter = this.toggleFilter.bind(this)
    //this.buttonClass = this.buttonClass.bind(this)
    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.handleFilterAir = this.handleFilterAir.bind(this)
    this.handleFilterBus = this.handleFilterBus.bind(this)
    this.handleFilterCar = this.handleFilterCar.bind(this)
    this.handleFilterFerry = this.handleFilterFerry.bind(this)
    this.handleFilterRail = this.handleFilterRail.bind(this)
  }

  handleDestination(event) {
    this.setState({
      destination: event.target.value
    })
  }

  handleOrigin(event) {
    this.setState({
      origin: event.target.value
    })
  }

  handleDeparture(event) {
    this.setState({
      departureDate: event.target.value
    })
  }

  handleReturn(event) {
    this.setState({
      returnDate: event.target.value
    })
  }

  submitSearch(event) {
    event.preventDefault()

    this.sendRequest()
  }

  handleFilterAir() {
    //const queryString = Object.keys(filterQueries).map(key => filterQueries[key]).join('&')
    // & Symbol not included in String because it's already hardcoded into the URL
    this.setState({ filterAir: "noAir" })

    if(this.state.filterAir.valueOf("noAir")) {
      this.setState({ filterAir: "" })
    }
  }

  handleFilterRail() {
    //const queryString = Object.keys(filterQueries).map(key => filterQueries[key]).join('&')
    this.setState({ filterRail: "&noRail" })

    if(this.state.filterRail.valueOf("&noRail")) {
      this.setState({ filterRail: "" })
    }
  }

  handleFilterCar() {
    this.setState({ filterCar: "&noCar" })

    if(this.state.filterCar.valueOf("&noCar")) {
      this.setState({ filterCar: "" })
    }
  }

  handleFilterFerry() {
    this.setState({ filterFerry: "&noFerry" })

    if(this.state.filterFerry.valueOf("&noFerry")) {
      this.setState({ filterFerry: "" })
    }
  }

  handleFilterBus() {
    this.setState({ filterBus: "&noBus" })

    if(this.state.filterBus.valueOf("&noBus")) {
      this.setState({ filterBus: "" })
    }
  }

  //function for filter buttons - genom query string
  handleFilterChange(id) {
    const queryString = Object.keys(filterQueries).map(key => filterQueries[key]).join('&')
    console.log(id)
    
    console.log(queryString)

    this.setState({ filterChecked: !this.state.filterChecked })
    if (this.state.filterChecked == true) {
      this.setState({ filterURL: "" })
    } else {
      this.setState({ filterURL: "&noRail" })
    }
    console.log("Filter toggled")
    console.log(this.state.filterChecked)
  }

  //currently not in use - filter button experiment
  buttonClass() {
    const btn_class = this.state.black ? "black-button" : "white-button";
  }

  //currently not in use - filter button experiment
  toggleFilter(event) {

    this.setState({ black: !this.state.black })

    if (this.state.checked === false) {
      this.setState({
        checked: true
      })
    } else if (this.state.checked === true) {
      this.setState({
        checked: false
      })
    }
    console.log("Filter toggled")
  }

  sendRequest() {
    fetch(`${url}key=${apiKey}&oName=${this.state.origin}&dName=${this.state.destination}
    &noRideshare&noMinorStart&noMinorEnd&noSpecial&noBikeshare&noTowncar&${this.state.filterAir}
    ${this.state.filterRail}${this.state.filterBus}${this.state.filterFerry}${this.state.filterCar}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          routes: data.routes.map((route, index) => route = {
            id: index,
            name: route.name,
            departurePlace: data.places[0].shortName,
            arrivalPlace: data.places[1].shortName,
            distance: route.distance,
            totalDuration: route.totalDuration,
            price: route.indicativePrices[0].price,
            currency: route.indicativePrices[0].currency,
            segments: route.segments,
            vehicles: data.vehicles,
            places: data.places
          })
        })
      })
  }

  render() {
    const id = [1,2,3,4,5];

    return (
      <div id="root">
        <div className="App" style={{ backgroundImage: `url(${backgroundImage})` }}>
          <main>
            <noscript>You need to enable JavaScript to run this app.</noscript>
            <Header />
            <nav>
              {/* menu block goes here*/}

              <div className="nav-container">
                <button className="button" onClick={() => this.setState({ page: "home" })}>Home</button>
                <button className="button">Search Trips</button>
                <button className="button">About the Event</button>
                <button className="dropdown">About our<br /> Destinations
                  <div className="dropdown-content">
                    <a href="#" onClick={() => this.setState({ page: "falun" })}>Falun</a>
                    <a href="#" onClick={() => this.setState({ page: "stockholm" })}>Stockholm</a>
                    <a href="#" onClick={() => this.setState({ page: "are" })}>Åre</a>
                  </div>
                </button>
                <button className="button">View Recommendations</button>
              </div>

            </nav>

            <hr />
            <div className="filter-container">
              <strong>No plane</strong>
              <strong>No rail</strong>
              <strong>No car</strong>
              <strong>No ferry</strong>
              <strong>No bus</strong>
            </div>
            {/* switch filter buttons */}
            <div className="filter-container">

              <label className="switch">
                <input type="checkbox" value={this.state.filterChecked} onChange={this.handleFilterAir} />
                <div className="slider"></div>
              </label>

              <label className="switch">
                <input type="checkbox" value={this.state.filterChecked} onChange={this.handleFilterRail} />
                <div className="slider"></div>
              </label>

              <label className="switch">
                <input type="checkbox" value={this.state.filterChecked} onChange={this.handleFilterCar} />
                <div className="slider"></div>
              </label>

              <label className="switch">
                <input type="checkbox" value={this.state.filterChecked} onChange={this.handleFilterFerry} />
                <div className="slider"></div>
              </label>

              <label className="switch">
                <input type="checkbox" value={this.state.filterChecked} onChange={this.handleFilterBus} />
                <div className="slider"></div>
              </label>
            </div>

            <MainBody
              page={this.state.page}
              submitSearch={this.submitSearch}
              handleOrigin={this.handleOrigin}
              handleDestination={this.handleDestination}
              handleDeparture={this.handleDeparture}
              handleReturn={this.handleReturn}
              routes={this.state.routes}
              //toggleFilter not in use
              toggleFilter={this.toggleFilter}
              routes={this.state.routes} />
            <hr />
            <Footer />
          </main>
        </div>
      </div>
    );
  }
}
//<button onClick={this.toggleFilter} className={btn_class}>No bike</button>
//const btn_class = this.state.black ? "black-button" : "white-button";
// debug environment variables
const romeKey = process.env.REACT_APP_ROME_SECRET_KEY;
const googleKey = process.env.REACT_APP_GOOGLE_SECRET_KEY;
console.log("rome 2 rio key = " + romeKey);
console.log("google key = " + googleKey);

export default App;
