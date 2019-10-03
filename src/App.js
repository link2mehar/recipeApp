import React , {useEffect,useState} from 'react';
import './App.css';
import {useSelector ,useDispatch} from 'react-redux';
import {increment,decrement} from './actions';
import { async } from 'q';
import Recpie from './components/Recpie';
function App() {
  const APP_ID = '08fa49fd';
  const APP_KEY = '07c3dab02b6e0a08eb3016447b556ded';
  const [count,setCount] = useState(0);
  const [recipis,setRecipes] = useState([]);
  const [search,setSearch] = useState('');
  const [query,setQuery] = useState('chicken');
  const URL = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;
 
  useEffect(()=>{
    fetchRecp();
  }, [query])

      const fetchRecp = async () => {
      const Recpies = await fetch(URL);
      const data = await Recpies.json();
      setRecipes(data.hits);
      console.log(data.hits);
      setCount(data.hits.length);
      
     
  }
  const updateSearch = (e) => {
    setSearch(e.target.value);
  }
  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }
  const counter = useSelector(state => state.counter);
  const dispatch = useDispatch();
  return (
    <div className="App">
      <form onSubmit={getSearch}>
        <div className="grid-container">
          <div className="grid-x grid-padding-x">
            <div className="medium-12 cell">
              <label>
                <input type="text" placeholder="Search..." value={search} onChange={updateSearch}/>
              </label>
              <button type="submit" className="alert button" >Submit</button>
            </div>
          </div>
        </div>
      </form>
      <h1>Total results: {count}</h1> 
      {/* <button type="button" className="success button" onClick = {()=>{dispatch(increment())}}>+</button>
      <button type="button" className="alert button" onClick = {()=>{dispatch(decrement())}}>-</button> */}
      {recipis.map(recipe =>(
        <Recpie key={recipe.recipe.label} title={recipe.recipe.label} calories={recipe.recipe.calories} image={recipe.recipe.image}/>
      ))}
    </div>
    
  );
}

export default App;
