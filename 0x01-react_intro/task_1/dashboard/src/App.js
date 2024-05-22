import './App.css';
import holbertonLogo from './holberton-logo.jpg';
import { getFooterCopy, getFullYear } from './utils';

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <img
          src={holbertonLogo}
          width={200}
          height={200}
          alt="holberton logo"
        />
        <h1>School dashboard</h1>
      </div>
      <div className="App-body">
        <p>Login to access the full dashboard</p>
      </div>
      <div className="App-footer">
        <p>
          Copyright {getFullYear()} - {getFooterCopy(true)}
        </p>
      </div>
    </div>
  );
}

export default App;
