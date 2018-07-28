import React, { Component } from "react";
import "./App.css";
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      countries: [],
      newSearch: ""
    };
  }

  handleChange = event => {
    this.setState({ newSearch: event.target.value });
  };

  showCountry = (countryname) => () => {
    this.setState({ newSearch: countryname})
  }

  componentDidMount() {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      this.setState({ countries: response.data });
    });
  }

  render() {
    const search = this.state.newSearch.toLowerCase();
    const countries = this.state.countries.filter(country =>
      country.name.toLowerCase().includes(search)
    );

    let showThoseCountries = [];

    // Show filtered search, three alternatives
    if (countries.length > 10) {
      showThoseCountries = "Too many matches, specify another filter.";
    } else if (countries.length > 1) {
      const countryList = countries.map(country => (
        <li key={country.alpha3Code}><div onClick={this.showCountry(country.name)}>{country.name}</div></li>
      ));
      showThoseCountries = <ul>{countryList}</ul>;
    } else {
      showThoseCountries = countries.map(country => {
        return (
          <div>
            <h2>{country.name}</h2>
            <p>capital: {country.capital}</p>
            <p>population: {country.population}</p>
            <img src={country.flag} alt="flag" style={{ width: "50%" }} />
          </div>
        );
      });
    }

    return (
      <div className="App">
        <form>
          <label id="searchBox">find countries:</label>
          <input value={this.state.newSearch} onChange={this.handleChange} />
        </form>
        <div>{showThoseCountries}</div>
      </div>
    );
  }
}

export default App;
