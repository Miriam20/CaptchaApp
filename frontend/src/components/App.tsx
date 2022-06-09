import { useState } from "react";
import "../index.css";
import Captcha from "./Captcha";

const App = () => {
  const [data, setData] = useState(null);

  const generateCaptcha = () => {
    fetch("/generate")
      .then((res) => res.json())
      .then((data) => setData(data));
  };

  return (
    <div className="container">
      <div>
        <button className="button" type="submit" onClick={generateCaptcha}>
          Generate New Captcha
        </button>
      </div>
      {data && <Captcha data={data} />}
    </div>
  );
};

export default App;
