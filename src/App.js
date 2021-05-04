import Stock from './Stock'
//import Stocklist from'./Stocklist'
import './App.css';
import {Menuitems} from "./Menuitems"

function App() {
  return (
    <div className="App">
         
         <div>
        <nav className="NavbarItems">
          <h1 className="navbar-logo">Rocketship</h1>
          <ul className="nav-menu">
            {Menuitems.map((item,index) => {
              return(
                <li key={index}>
                  <a className={item.cNane} href={item.url}>
                    {item.title}
                  </a>
                </li>
              )
            })}
            
          </ul>
        </nav>
      </div>
        <Stock >
        
        </Stock> 
        
    </div>
  );
}

export default App;
