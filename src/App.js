import './App.css';
import {CssBaseline, Grid} from "@material-ui/core"
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import PlaceDetails from './components/PlaceDetails/PlaceDetails.jsx';
import {getPlacesData} from "./api/index"
import {getWeatherData} from "./api/index"
import {useState, useEffect} from "react"

function App() {
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({lat: 0, lng: 0});
  const [bounds, setBounds] = useState({});
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("");
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [weatherData, setWeatherData] = useState([])
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
      setCoordinates ({lat: latitude, lng: longitude});
    });
  }, []);

  useEffect(() => {
    const filteredPlaces = places.filter((place) => place.rating > rating);

    setFilteredPlaces(filteredPlaces);
  }, [rating])

  useEffect(() => {
    if(bounds.sw && bounds.ne){
    setIsLoading(true)

    getWeatherData(coordinates.lat, coordinates.lng)
      .then((data) => setWeatherData)


    getPlacesData(type, bounds.sw, bounds.ne)
      .then((data) => {
        setPlaces(data?.filter((place) => place.name && place.num_reviews > 0))
        setFilteredPlaces([])
        setIsLoading(false)
      })
    }
  }, [type, bounds]);

  return (
    <div className="App">
      <CssBaseline />
      <Header setCoordinates={setCoordinates}/>
      <Grid container spacing={3} style ={{width: "100%"}}>
        <Grid item xs={12} md={4}>
          <List places={filteredPlaces.length ? filteredPlaces : places}
          childClicked={childClicked}
          isLoading={isLoading}
          type={type}
          setType={setType}
          rating={rating}
          setRating={setRating}/>
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
          setCoordinates={setCoordinates}
          setBounds={setBounds}
          coordinates={coordinates}
          places={filteredPlaces.length ? filteredPlaces : places}
          setChildClicked ={setChildClicked}
           weatherData={weatherData}/>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
