import "./App.css";
import Weather from "./Weather";

export default function App() {
  return (
    <div className="App">
      <div className="container">
        <Weather defaultCity="lomma" />
        <footer>
          <a
            href="https://github.com/KateKlu/react-weather-app"
            target="_blank"
            rel="noreferrer"
          >
            Open-source code
          </a>
          , by Katerina Kliuieva
        </footer>
      </div>
    </div>
  );
}
