import React, { useState } from "react";

function ColorPicker() {
  const [red, setRed] = useState("0");
  const [green, setGreen] = useState("0");
  const [blue, setBlue] = useState("0");

  const handleRedChange = (e) => {
    const value = e.target.value;
    if (value < 0) {
      setRed(0);
      alert("Gaboleh kurang dari 0 bro");
    } else if (value > 255) {
      setRed(255);
      alert("Gaboleh lebih dari 255 bro");
    } else {
      setRed(value);
    }
  };

  const handleGreenChange = (e) => {
    const value = e.target.value;
    if (value < 0) {
      setGreen(0);
      alert("Gaboleh kurang dari 0 bro");
    } else if (value > 255) {
      setGreen(255);
      alert("Gaboleh lebih dari 255 bro");
    } else {
      setGreen(value);
    }
  };

  const handleBlueChange = (e) => {
    const value = e.target.value;
    if (value < 0) {
      setBlue(0);
      alert("Gaboleh kurang dari 0 bro");
    } else if (value > 255) {
      setBlue(255);
      alert("Gaboleh lebih dari 255 bro");
    } else {
      setBlue(value);
    }
  };

  const handleRedValue = () => {
    if (red === 255) {
      alert("nilai hijau udah dibuat maksimal bro");
    } else {
      setRed(255);
    }
  };
  const handleGreenValue = () => {
    if (green === 255) {
      alert("nilai hijau udah dibuat maksimal bro");
    } else {
      setGreen(255);
    }
  };
  const handleBlueValue = () => {
    if (blue === 255) {
      alert("nilai biru udah dibuat maksimal bro");
    } else {
      setBlue(255);
    }
  };

  function getRandomNumber() {
    return Math.floor(Math.random() * 256);
  }

  const handleRedRandom = () => {
    setRed(getRandomNumber());
    setGreen(getRandomNumber());
    setBlue(getRandomNumber());
  };
  const handleRedReset = () => {
    if (blue === 0 && green === 0 && red === 0) {
      alert("udah direset angkanya");
    } else {
      setRed(0);
      setGreen(0);
      setBlue(0);
    }
  };

  return (
    <div className="flex max-sm:flex-col justify-center  m-8 bg-slate-400 p-4 rounded-lg gap-4">
      <div className=" flex items-center justify-center">
        <div
          className="w-[200px] h-full rounded-xl max-sm:w-full max-sm:h-[200px]"
          style={{ backgroundColor: `rgb(${red}, ${green}, ${blue})` }}
        ></div>
      </div>
      <div className=" flex flex-col flex-1 gap-2  p-4 rounded-lg bg-slate-300 justify-center">
        <div className=" flex gap-[20px]">
          <label className="mr-[4px]">Red</label>
          <input
            className=" rounded-sm shadow flex-1  hover:border-black border"
            value={red}
            onChange={(e) => handleRedChange(e)}
          />
        </div>
        <div className=" flex gap-[10.5px]">
          <label className="">green</label>
          <input
            className=" rounded-sm shadow flex-1  hover:border-black border"
            value={green}
            onChange={(e) => handleGreenChange(e)}
          />
        </div>
        <div className="flex gap-[20px]">
          <label>Blue</label>
          <input
            className=" rounded-sm shadow  hover:border-black border flex-1"
            value={blue}
            onChange={(e) => handleBlueChange(e)}
          />
        </div>
        <div className=" flex">
          <div className=" mr-[20px]">RGB</div>
          <div className=" flex gap-1">
            <div
              className=" text-white px-2 rounded-sm"
              style={{ backgroundColor: `rgb(${red}, 0, 0)` }}
            >
              {red}
            </div>
            <div
              className=" text-white px-2 rounded-sm"
              style={{ backgroundColor: `rgb(0, ${green}, 0)` }}
            >
              {green}
            </div>
            <div
              className=" text-white px-2 rounded-sm"
              style={{ backgroundColor: `rgb(0, 0, ${blue})` }}
            >
              {blue}
            </div>
          </div>
        </div>
        <div className="flex gap-x-4 flex-wrap">
          <button className=" " onClick={handleRedValue}>
            RedFull
          </button>
          <button onClick={handleGreenValue}>GreenFull</button>
          <button onClick={handleBlueValue}>BlueFull</button>
          <button onClick={handleRedRandom}>Random</button>
          <button onClick={handleRedReset}>Reset</button>
        </div>
        <div className="flex gap-x-4 flex-wrap">
          <button onClick={() => setRed(getRandomNumber())}>Random Red</button>
          <button onClick={() => setGreen(getRandomNumber())}>
            Random Green
          </button>
          <button onClick={() => setBlue(getRandomNumber())}>
            Random Blue
          </button>
        </div>
      </div>
    </div>
  );
}

export default ColorPicker;
