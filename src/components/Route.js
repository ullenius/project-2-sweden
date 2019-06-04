import React, { Component } from 'react'
import Segment from './Segment'
import '../styles/App.css'
import '../styles/route.css';

class Routes extends Component {
    constructor(props) {
        super(props)

        this.state = {
            expandMode: false,
        }

        this.editExpandMode = this.editExpandMode.bind(this)
    }

    editExpandMode() {
        this.setState({
            expandMode: !this.state.expandMode
        })
    }

    getVehicleList() {
        return (
            <td>{
                this.props.segments.map(segment => {
                    const vehicleList = this.props.vehicles
                    const segmentList = this.props.segments
                    const position = segmentList.indexOf(segment);

                    return vehicleList[segmentList[position].vehicle].name + " "
                }
                )}
            </td>
        )
    }

    setRouteMap(){
        this.props.setMapValue(this.props.id)
    }



    render() {

        let routeClass = this.props.id===this.props.mapValue ? "marked-route" : "routes"

        if (this.state.expandMode === false) {
            return (
                <tr className={routeClass} onClick={()=> this.setRouteMap()} >
                    <td>
                        <img onClick={() => this.editExpandMode()} className="black-triangle"
                            src={process.env.PUBLIC_URL + "/images/icons/triangle-right.png"}
                            alt="Triangle pointing right"
                            title="Expand"
                            />
                        {this.props.departurePlace.shortName}
                    </td>
                    <td>{this.props.arrivalPlace.shortName} </td>
                    {this.getVehicleList()}
                    <td>{this.props.durationHours}</td>
                    <td>{this.props.price + " " + this.props.currency}</td>
                    <td className="hidden">{this.props.segments.length}</td>
                    <td className="google-map-icon"><img alt="google map icon" onClick={()=>{
                            let map = document.getElementById("map")
                            map.scrollIntoView({behavior: "smooth", inline: "nearest"});

                        }} src="\images\icons\GoogleMaps.png"></img></td>
                </tr>
            )
        } else {
            return (
                [<tr className={routeClass} onClick={() => this.setRouteMap()}>
                    <td>
                        <img className="black-triangle"
                            onClick={()=>this.editExpandMode()}
                            src={process.env.PUBLIC_URL + "/images/icons/triangle.png"}
                            alt="Triangle pointing down"
                            title="Collapse" />
                        {this.props.departurePlace.shortName}
                    </td>
                    <td>{this.props.arrivalPlace.shortName}</td>
                    {this.getVehicleList()}
                    <td>{this.props.durationHours}</td>
                    <td>{this.props.price + " " + this.props.currency}</td>
                    <td className="hidden">{this.props.segments.length}</td>
                    <td className="google-map-icon"><img alt="google map icon" onClick={()=>{
                            let map = document.getElementById("map")
                            map.scrollIntoView({behavior: "smooth", inline: "nearest"});

                        }} src="\images\icons\GoogleMaps.png"></img></td>
                </tr>,
                <tr className="segment">
                    <th>Departure Place</th>
                    <th>Arrival Place</th>
                    <th>Means of Travel</th>
                    <th>Transit Time</th>
                    <th>Map</th>
                </tr>,

                <Segment
                    segments={this.props.segments}
                    places={this.props.places}
                    vehicles={this.props.vehicles}
                    minutesToHours={this.props.minutesToHours}
                    routes={this.props.routes} />,
                ]
            )
        }
    }
}

export default Routes
