import React, { FormEvent, useEffect, useState } from "react";
import "../index.css";

const CORRECT = "correct";
const INCORRECT = "incorrect or timeout expired";

const Captcha: React.FC<{ data: string }> = ({ data }) => {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  const validateCaptcha = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ data, text }),
    };

    setText("");

    fetch("/validate", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        const res = data ? CORRECT : INCORRECT;
        setResult(res);
      });
  };

  useEffect(() => {
    setResult("");
  }, [data]);

  return (
    <>
      {!result && (
        <div>
          <div className="captcha" dangerouslySetInnerHTML={{ __html: data }} />
          <form className="form" onSubmit={validateCaptcha}>
            <label>
              <input
                className="input"
                type="text"
                placeholder="Enter text"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </label>
            <input className="submit" type="submit" value="Submit" />
          </form>
        </div>
      )}
      {result && <div className="result">The text was {result}</div>}
    </>
  );
};

export default Captcha;
