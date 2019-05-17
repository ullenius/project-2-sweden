import React, { Component } from 'react';
import Routes from './Routes'
import './App.css';

class SearchResults extends Component {



    render() {

      const routeList = this.props.routes.map(route => {return(
        
        <Routes minutesToHours = {this.props.minutesToHours} {...route} key={route.id}
        routes={this.props.routes}/>
      )})
        return (
        <article>
              <h1>Results</h1>

              <table id="table">
                <caption>Search results</caption>
                <tbody>
                <tr>
                  <th>From</th>
                  <th>To</th>
                  <th>Means of Travel</th>
                  <th>Time</th>
                  <th>Price</th>
                  <th>Distance</th>
                  <th>No. Transits</th>
                </tr>
                {routeList}
                </tbody>
              </table>
            </article>
        )
    }
}

export default SearchResults;