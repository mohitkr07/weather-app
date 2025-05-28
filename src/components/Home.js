import React, { useState, useEffect } from "react";
import styles from "./components.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faWater,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY; // Note: In React, env vars must start with REACT_APP_

const fetchWeatherData = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city
  )}&appid=${API_KEY}&units=metric`;

  const response = await fetch(url);
  if (!response.ok) throw new Error("City not found");
  const data = await response.json();

  // Map OpenWeatherMap data to your state shape
  return {
    city: data.name,
    temp: Math.round(data.main.temp),
    today: new Date().toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    status: data.weather[0].description,
    url_icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`,
    speed: data.wind.speed,
    humidity: data.main.humidity,
    visibility: data.visibility,
    pressure: data.main.pressure,
    feels_like: data.main.feels_like,
  };
};

const Home = () => {
  const [wData, setData] = useState({
    city: "Delhi",
    temp: "",
    today: "",
    status: "",
    url_icon: "",
    speed: "",
    humidity: "",
    visibility: "",
    pressure: "",
    feels_like: "",
  });
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchWeatherData("Delhi")
      .then(setData)
      .catch((err) => setError(err.message));
  }, []);

  const postData = async () => {
    if (!city) return;
    setError("");
    try {
      const data = await fetchWeatherData(city);
      setData(data);
    } catch (err) {
      setError("City not found. Please try again.");
    }
  };

  const handleKeypress = (e) => {
    if (e.keyCode === 13) {
      postData();
    }
  };

  return (
    <div className={styles["content"]}>
      <div className={styles["section1"]}>
        <div className={styles["container"]}>
          <div className={styles["container-top"]}>
            <div className={styles["cityName"]}>
              <h1>{wData.city}</h1>
              <p>{wData.today}</p>
            </div>
            <div className={styles["search-box"]}>
              <input
                type="text"
                placeholder="City Name"
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={handleKeypress}
              />
              <button onClick={postData}>Search</button>
            </div>
          </div>
          {error && (
            <div style={{ color: "red", margin: "10px 0" }}>{error}</div>
          )}
          <div className={styles["container-bottom"]}>
            <div className={styles["bottom-sub-1"]}>
              <div className={styles["sub-1-content"]}>
                <div className={styles["weather-icon"]}>
                  <img src={wData.url_icon} alt={wData.status} />
                </div>
                <div className={styles["temperature"]}>
                  <div className={styles["temp"]}>
                    <p>{wData.temp}</p>
                  </div>
                  <div className={styles["degree"]}>
                    <p>°C</p>
                  </div>
                </div>
                <div className={styles["des-feels"]}>
                  <p className={styles["des"]}>{wData.status}</p>
                  <p className={styles["feels"]}>
                    Feels Like {Math.round(wData.feels_like)} °C
                  </p>
                </div>
              </div>
            </div>
            <div className={styles["bottom-sub-2"]}>
              <div className={styles["sub-2-content"]}>
                <div className={styles["wind"]}>
                  <h3>Wind</h3>
                  <p>{Math.round((wData.speed * 18) / 5)} km/hr</p>
                  <FontAwesomeIcon icon={faPaperPlane} />
                </div>
                <div className={styles["humidity"]}>
                  <h3>Humidity</h3>
                  <p>{wData.humidity} %</p>
                  <FontAwesomeIcon icon={faWater} />
                </div>
                <div className={styles["visibility"]}>
                  <h3>Visibility</h3>
                  <p>{wData.visibility ? Math.round(wData.visibility / 1000) : 0} km</p>
                  <FontAwesomeIcon icon={faEyeSlash} />
                </div>
                <div className={styles["pressure"]}>
                  <h3>Pressure</h3>
                  <p>{wData.pressure} mb</p>
                  <img src="images/pressure.png" alt="Pressure" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles["section2"]}>
        <div className={styles["footer-basic"]}>
          <footer>
            <div className={styles["social"]}>
              <a target="_blank" rel="noopener noreferrer" href="https://github.com/mohitkr07">
                <i className="icon ion-social-github"></i>
              </a>
              <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/mohit_kr07/">
                <i className="icon ion-social-instagram"></i>
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.linkedin.com/in/mohitkumar-mahto-7016311b7/"
              >
                <i className="icon ion-social-linkedin"></i>
              </a>
            </div>
            <ul className={styles["list-inline"]}>
              <li className={styles["list-inline-item"]}>Mohitkumar Mahto</li>
            </ul>
            <p className={styles["copyright"]}>MAK Insights ©</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Home;
