import React, {useState, useEffect} from 'react';
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import  { Container, Dimmer, Loader } from 'semantic-ui-react';
import Home from './components/Home';
import Planets from './components/Planets';
import People from './components/People';

function App() {
  const [people, setPeople] = useState([]);  //initial state is an empty array
  const [planets, setPlanets] = useState([]);
  const [loading,setLoading] = useState([]);   //indicate when we are fetching data from the api

  useEffect(() =>{
    //fetch for the planets
    async function fetchPeople() {
      let res = await fetch('https://swapi.co/api/people/?format=json');  //get the pple data in json formate
      //store it in a var called 'data' and parse in to json format
      let data = await res.json();
      //results is an prperty inside the data from the api,
      //so we setPeople back to the results as we'll be using it in the future
      setPeople(data.results);
      setLoading(false);
    }

    //fetch for the planets
    async function fetchPlanets(){
      let res = await fetch('https://swapi.co/api/planets/?format=json');
      let data = await res.json();
      setPlanets(data.results);
      setLoading(false);    //false meaning we already got the data. when u refresh the page

    }

    //call the fucntions
    fetchPeople();
    fetchPlanets();
    
  }, [])

  console.log(`people: ${people}`)
  //console.log(`people: ${people}`)

  //below: inside the people/planets link, you pass it a prop i.e data={people}
  return (
    <div className="App">
      <Router>

        <Navbar />
        <Container>
          {loading ? (
            <Dimmer active inverted>
              <Loader inverted>Loading</Loader>
            </Dimmer>
          ): (
            <Switch>
              <Route exact path='/'>
                <Home/>
              </Route>
              <Route exact path='/people'>
                <People data={people}/>
              </Route>
              <Route exact path='/planets'>
                <Planets data={planets}/>
              </Route>
            </Switch>
          )}
            
        </Container>

      </Router>
    </div>
  );
}

export default App;
