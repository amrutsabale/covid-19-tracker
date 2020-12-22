import { useState, useEffect } from 'react';
import { MenuItem, FormControl, Select, Card, CardContent } from '@material-ui/core';
import './App.css';
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table'
import { prettyPrint, sortData } from './util';
import Graph from './Graph';
import "leaflet/dist/leaflet.css";

function App() {
  const [countries, setCoutries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState([34.80746, -40.4796]);
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");


  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data)
      })
  }, [])


  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then(data => {
          const countries = data.map(country => (
            {
              name: country.country,  // United Kingdom,United States
              value: country.countryInfo.iso2  //UK,USA
            }
          ))
          const sortedData = sortData(data)
          setTableData(sortedData)
          setCoutries(countries)
          setMapCountries(data);
        })
    }
    getCountriesData()
  }, [])

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode)

    const url = countryCode === "worldwide" ? "https://disease.sh/v3/covid-19/all" :
      `https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setCountry(countryCode)
        setCountryInfo(data)
        setMapCenter([data.countryInfo.lat, data.countryInfo.long])
        setMapZoom(4)
      })

  }


  console.log("Country info>>", countryInfo)


  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app__dropdown">
            <Select
              variant='outlined'
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {
                countries.map(country => (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))
              }

            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox
            onClick={(e) => setCasesType("cases")}
            title="Coronavirus Cases"
            cases={prettyPrint(countryInfo.todayCases)}
            total={prettyPrint(countryInfo.cases)}
          />

          <InfoBox
            onClick={(e) => setCasesType("recovered")}
            title="Recoverd"
            cases={prettyPrint(countryInfo.todayRecovered)}
            total={prettyPrint(countryInfo.cases)}
          />
          <InfoBox
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            cases={prettyPrint(countryInfo.todayDeaths)}
            total={prettyPrint(countryInfo.cases)}
          />
        </div>
        <Map countries={mapCountries} casesType={casesType} center={mapCenter} zoom={mapZoom} />
      </div>

      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Countries</h3>
          <Table countries={tableData} />
          <h3>Worldwide new  Cases</h3>
        </CardContent>
        <Graph caseType="cases" />
      </Card>

    </div>
  );
}

export default App;
