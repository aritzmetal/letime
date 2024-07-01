import headerLogo from "./assets/images/header-logo.svg";
import DatalistInput from "react-datalist-input";
import "react-datalist-input/dist/styles.css";

import "./App.css";
import { useEffect, useState } from "react";
import { TIMEZONES } from "./services/timezones/timezones";
import { Navbar } from "./components/navbar/Navbar";
function getTimeInTimeZone(
  timezone: string,
  newOptions?: Intl.DateTimeFormatOptions
) {
  const date = new Date();
  const options: Intl.DateTimeFormatOptions = {
    timeZone: timezone,
    hour: "numeric" as any,
    minute: "numeric" as any,
    second: "numeric" as any,
    hour12: false,
    ...newOptions,
  };

  return new Intl.DateTimeFormat("en-ES", { ...options }).format(date);
}

function App() {
  const [fullHours, setFullHours] = useState(false);

  const [, setValue] = useState(new Date());
  const [timezone, setTimezone] = useState<string>("Europe/Andorra");

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div className="root-node">
        <Navbar />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: "auto",
            marginBottom: "auto",
            padding: "2px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: "auto",
              marginBottom: "auto",
              padding: "2px",
            }}
          >
            <img src={headerLogo} height={"48px"} />
          </div>
          <div style={{ display: "flex" }}>
            <DatalistInput
              placeholder="Pick value"
              label="Pick a timezone"
              onSelect={(val) => {
                if (val) {
                  setTimezone(val.value);
                }
              }}
              items={TIMEZONES.map((tz, idx) => ({ id: idx, value: tz }))}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: "auto",
              marginBottom: "auto",
              padding: "2px",
            }}
          >
            <button
              className="empty-button"
              onClick={() => setFullHours((prev) => !prev)}
            >
              <h2 style={{ margin: "12px", padding: "12px" }}>
                {timezone && getTimeInTimeZone(timezone, { hour12: fullHours })}
              </h2>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
