import { useState } from "react";
import { API_URL } from "../constants";
import "../index.css";
import Captcha from "./Captcha";

const App = () => {
  const [data, setData] = useState(null);

  const generateCaptcha = async () => {
    const res = await fetch(`${API_URL}/generate`);
    const data = await res.json();
    setData(data);
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
