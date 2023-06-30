import React, { useState, useEffect } from "react";
import styles from "./components.module.css";

const Home = () => {
  const [wData, setData] = useState({
    city: "Delhi",
    temp: "",
    today: "",
    status: "",
    url_icon: "",
  });
  const [city, setCity] = useState("");

  useEffect(async () => {
    const fetchData = await fetch("https://weatherbackend-3on2.onrender.com/", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await fetchData.json();
    setData(data);
    console.log(data);
  }, []);

  const postData = async (e) => {
    e.preventDefault();
    const res = await fetch("https://weatherbackend-3on2.onrender.com/", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ city }),
    });

    const data = await res.json();
    setData(data);
    console.log(data);
  };

  return (
    <>
      <section className={styles["section1"]}>
        <div className={styles["front"]}>
          <div className={styles["nav"]}>
            <div className={styles["city_n"]}>
              {/* //city name */}
              <h1>{wData.city}</h1>
            </div>
            <div className={styles["search"]}>
              <form action="/" method="post" autocomplete="nope">
                <input
                  type="text"
                  name="city"
                  placeholder="Search City"
                  autofocus
                  onChange={(e) => {
                    setCity(e.target.value);
                    // console.log(city);
                  }}
                />
                <button type="submit" onClick={postData}>
                  Search
                </button>
              </form>
            </div>
          </div>

          <div className={styles["box"]}>
            <div className={styles["current-status-box"]}>
              <div className={styles["temp"]}>
                <div className={styles["mag"]}>
                  {/* //current temp */}
                  <h1>{wData.temp}</h1>
                </div>
                <div className={styles["temp-sub"]}>
                  <div className={styles["unit"]}>
                    <p>°C</p>
                  </div>
                  <div className={styles["status"]}>
                    {/* //today status */}
                    <p>{wData.status}</p>
                  </div>
                </div>
              </div>

              <div className={styles["date"]}>
                {/* //today date */}
                <p>{wData.today}</p>
              </div>
            </div>

            <div className={styles["other-status"]}></div>

            <div className={styles["icon-box"]}>
              {/* //weather icon */}
              <img src={wData.url_icon} alt="" />
            </div>
          </div>
        </div>
      </section>

      <section className={styles["section2"]}>
        <div className={styles["footer-basic"]}>
          <footer>
            <div className={styles["social"]}>
              <a target="_blank" href="https://github.com/mohitkr07">
                <i class="icon ion-social-github"></i>
              </a>
              <a target="_blank" href="https://www.instagram.com/mohit_kr07/">
                <i class="icon ion-social-instagram"></i>
              </a>
              <a
                target="_blank"
                href="https://www.linkedin.com/in/mohitkumar-mahto-7016311b7/"
              >
                <i class="icon ion-social-linkedin"></i>
              </a>
            </div>
            <ul className={styles["list-inline"]}>
              <li className={styles["list-inline-item"]}>Mohitkumar Mahto</li>
            </ul>
            <p className={styles["copyright"]}>MAK Insights ©</p>
          </footer>
        </div>
      </section>
    </>
  );
};

export default Home;
