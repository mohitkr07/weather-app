import React, { useState, useEffect } from "react";
import styles from "./components.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faWater,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

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

  useEffect(() => {
    const dataReq = async () => {
      const fetchData = await fetch(
        "https://weatherbackend-3on2.onrender.com/",
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await fetchData.json();
      setData(data);
    };
    dataReq();
  }, []);

  const postData = async (e) => {
    // https://weatherbackend-3on2.onrender.com/
    const res = await fetch("https://weatherbackend-3on2.onrender.com/", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ city }),
    });

    const data = await res.json();
    setData(data);
  };

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
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
                onChange={(e) => {
                  setCity(e.target.value);

                  // console.log(city);
                }}
                onKeyDown={handleKeypress}
              ></input>
              <button onClick={postData}>Search</button>
            </div>
          </div>
          <div className={styles["container-bottom"]}>
            <div className={styles["bottom-sub-1"]}>
              <div className={styles["sub-1-content"]}>
                <div className={styles["weather-icon"]}>
                  {/* URL icon */}
                  <img src={wData.url_icon}></img>
                </div>
                <div className={styles["temperature"]}>
                  <div className={styles["temp"]}>
                    {/* Temperature */}
                    <p>{wData.temp}</p>
                  </div>
                  <div className={styles["degree"]}>
                    <p>°C</p>
                  </div>
                </div>
                <div className={styles["des-feels"]}>
                  {/* status */}

                  <p className={styles["des"]}>{wData.status}</p>
                  {/* feels like */}
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
                  <p>{Math.round(wData.visibility / 1000)} km</p>
                  <FontAwesomeIcon icon={faEyeSlash} />
                </div>
                <div className={styles["pressure"]}>
                  <h3>Pressure</h3> <p>{wData.pressure} mb</p>
                  <img src="images/pressure.png"></img>
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
              <a target="_blank" href="https://github.com/mohitkr07">
                <i className="icon ion-social-github"></i>
              </a>
              <a target="_blank" href="https://www.instagram.com/mohit_kr07/">
                <i className="icon ion-social-instagram"></i>
              </a>
              <a
                target="_blank"
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
