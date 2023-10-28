import React, { useState } from "react";
import logo from "../assets/logo.svg";
import arrow from "../assets/icon-arrow-down.svg";
import moon from "../assets/icon-moon.svg";
import searchIcon from "../assets/icon-search.svg";
import play from "../assets/icon-play.svg";
import newWindow from "../assets/icon-new-window.svg";
import "./App.css";

function App() {
  const [isChecked, setIsChecked] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [search, setSearch] = useState("");
  const [result, setResult] = useState(null);
  const [errorResult, setErrorResult] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedFont, setSelectedFont] = useState("Sans-serif");
  const fonts = ["Monospace", "Sans-serif", "Serif"];

  const handleFontChange = (font) => {
    setSelectedFont(font);
    setHidden(false);
  };

  const audioRef = React.createRef();

  const toggleAudio = () => {
    const audio = audioRef.current;
    audio.play();
    setIsPlaying(!isPlaying);
  };

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  const hide = () => {
    setHidden(!hidden);
  };

  const handleSearch = () => {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${search}`;

    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setResult(data);
          setErrorResult(null);
        } else {
          setErrorResult(data);
          setResult(null);
        }
      });

    setSearch("");
  };

  return (
    <main className={isChecked ? " bg-[#050505] h-screen" : "h-screen"}>
      <section
        style={{ fontFamily: selectedFont }}
        className="max-w-[730px] mx-auto p-4"
      >
        <section className="flex justify-between items-center">
          <div>
            <img src={logo} alt="" />
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="flex items-center gap-3">
                <p
                  className={
                    isChecked
                      ? "font-bold text-lg text-white"
                      : "font-bold text-lg text-black"
                  }
                  onClick={hide}
                >
                  {selectedFont}
                </p>
                <img
                  src={arrow}
                  alt=""
                  className="cursor-pointer"
                  onClick={hide}
                />
              </div>
              <div
                className={
                  hidden
                    ? "p-4 cursor-pointer text-lg rounded-lg z-10 shadow-xl bg-white absolute top-8 text-start block"
                    : "p-4 cursor-pointer font-bold rounded-lg z-10 shadow-xl bg-white absolute top-8 text-start hidden"
                }
              >
                {fonts.map((font) => (
                  <p key={font} onClick={() => handleFontChange(font)}>
                    {font}
                  </p>
                ))}
              </div>
            </div>

            <div className="h-8 w-[1px] bg-gray-500"></div>
            <div className="flex items-center gap-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={isChecked}
                    onChange={handleToggle}
                  />
                  <div
                    className={
                      isChecked
                        ? "block bg-[#a445ed] w-10 h-5 rounded-full"
                        : "block bg-gray-500 w-10 h-5 rounded-full"
                    }
                  ></div>
                  <div
                    className={`${
                      isChecked
                        ? "translate-x-5 bg-white"
                        : "translate-x-0 bg-white"
                    } absolute left-1 top-[.3rem] w-3 h-3 rounded-full transform transition-transform duration-200 ease-in-out`}
                  ></div>
                </div>
              </label>
              <img
                src={moon}
                alt=""
                className="w-6 cursor-pointer"
                onClick={handleToggle}
              />
            </div>
          </div>
        </section>

        <div className="mt-20 flex gap-1 relative">
          <input
            type="text"
            className="w-full bg-gray-200 font-bold text-lg rounded-xl p-4 focus:outline-[#a445ed]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <img
            src={searchIcon}
            alt=""
            className="absolute right-6 top-5 cursor-pointer"
            onClick={handleSearch}
          />
        </div>

        {result ? (
          <div className="mt-20 p-4">
            <div className="flex items-center justify-between">
              <div className="text-start">
                <h1
                  className={
                    isChecked
                      ? "font-bold text-3xl md:text-6xl text-white mb-3"
                      : "font-bold text-3xl md:text-6xl text-[#2d2d2d] mb-3"
                  }
                >
                  {result[0].word}
                </h1>
                <p className="text-[#a445ed] text-2xl">{result[0].phonetic}</p>
              </div>
              <img
                src={play}
                alt=""
                className="w-12 h-12 md:w-auto md:h-auto cursor-pointer"
                onClick={toggleAudio}
              />
              <audio ref={audioRef}>
                <source src={result[0]?.phonetics[0]?.audio} type="" />
              </audio>
            </div>

            <div className="mt-10">
              <div>
                <div className="flex items-center gap-4">
                  <p
                    className={
                      isChecked
                        ? "font-bold text-2xl italic text-white"
                        : "font-bold text-2xl italic"
                    }
                  >
                    {result[0].meanings[0].partOfSpeech}
                  </p>
                  <div className="w-full h-[1px] bg-gray-300"></div>
                </div>

                <p className="text-start my-5 text-xl text-[#757575]">
                  Meaning
                </p>

                <div className="mt-10 text-start">
                  <ul
                    className={
                      isChecked
                        ? "list-disc text-lg text-white"
                        : "list-disc text-lg text-[#2d2d2d]"
                    }
                  >
                    <li>{result[0].meanings[0].definitions[0].definition}</li>
                    {result[0]?.meanings[0]?.definitions[1] && (
                      <li className={"md:w-[45rem] my-5"}>
                        {result[0].meanings[0].definitions[1].definition}
                      </li>
                    )}
                    {result[0]?.meanings[0]?.definitions[2] && (
                      <li className={"md:w-[45rem] mb-5"}>
                        {result[0].meanings[0].definitions[2].definition}
                      </li>
                    )}
                  </ul>
                  <div className="flex items-center gap-8">
                    <p className="text-xl text-[#757575]">Synonyms</p>
                    <span className="text-[#a445ed] font-bold text-xl cursor-pointer hover:underline">
                      {result[0].meanings[0].synonyms[0]
                        ? result[0].meanings[0].synonyms[0]
                        : "Not available"}
                    </span>
                  </div>
                </div>
              </div>
              {result.length === 1 ? (
                <div className="mt-10 hidden">
                  <div className="flex items-center gap-4">
                    <p
                      className={
                        isChecked
                          ? "font-bold text-2xl italic text-white"
                          : "font-bold text-2xl italic"
                      }
                    >
                      verb
                    </p>
                    <div className="w-full h-[1px] bg-gray-300"></div>
                  </div>
                  <p className="text-start my-5 text-xl text-[#757575]">
                    Meaning
                  </p>
                  <ul className="text-start">
                    <li
                      className={
                        isChecked
                          ? "list-disc mb-3 text-lg text-white"
                          : "list-disc mb-3 text-lg"
                      }
                    >
                      {result[0]?.meanings[0]?.definitions[0]?.definition}
                    </li>
                    <span className="text-[#757575] text-lg">
                      {result[0]?.meanings[1]?.definitions[0]?.example}
                    </span>
                  </ul>
                  <div className="w-full h-[1px] bg-gray-300 mt-10"></div>
                  <div className="mt-10 flex flex-col md:flex-row items-start md:items-center gap-4">
                    <p className="text-sm text-[#757575]">Source</p>
                    <div
                      className={
                        isChecked
                          ? "flex items-center text-sm text-white"
                          : "flex items-center text-sm text-[#2d2d2d]"
                      }
                    >
                      <p>https://en.wiktionary.org/wiki/keyboard</p>
                      <img src={newWindow} alt="" className="w-3" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-10">
                  <div className="flex items-center gap-4">
                    <p
                      className={
                        isChecked
                          ? "font-bold text-2xl italic text-white"
                          : "font-bold text-2xl italic"
                      }
                    >
                      verb
                    </p>
                    <div className="w-full h-[1px] bg-gray-300"></div>
                  </div>
                  <p className="text-start my-5 text-xl text-[#757575]">
                    Meaning
                  </p>
                  <ul className="text-start">
                    <li
                      className={
                        isChecked
                          ? "list-disc mb-3 text-lg text-white"
                          : "list-disc mb-3 text-lg"
                      }
                    >
                      {result[0]?.meanings[1]?.definitions[0]?.definition}
                    </li>
                    <span className="text-[#757575] text-lg">
                      {result[0]?.meanings[1]?.definitions[0]?.example}
                    </span>
                  </ul>
                  <div className="w-full h-[1px] bg-gray-300 mt-10"></div>
                  <div className="mt-10 flex flex-col md:flex-row items-start md:items-center gap-4">
                    <p className="text-sm text-[#757575]">Source</p>
                    <div
                      className={
                        isChecked
                          ? "flex items-center text-sm text-white"
                          : "flex items-center text-sm text-[#2d2d2d]"
                      }
                    >
                      <p>https://en.wiktionary.org/wiki/keyboard</p>
                      <img src={newWindow} alt="" className="w-3" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : errorResult ? (
          <div className="mt-20">
            <h1 className="font-bold text-9xl">😕</h1>
            <h2 className="font-bold text-4xl my-10">{errorResult.title}</h2>
            <p className="text-[#757575]">
              {errorResult.message} {errorResult.resolution}
            </p>
          </div>
        ) : (
          <div className="mt-20 p-4">
            <div className="flex items-center justify-between">
              <div className="text-start">
                <h1
                  className={
                    isChecked
                      ? "font-bold text-3xl md:text-6xl text-white mb-3"
                      : "font-bold text-3xl md:text-6xl text-[#2d2d2d] mb-3"
                  }
                >
                  Keyboard
                </h1>
                <p className="text-[#a445ed] text-2xl">/ˈkiːbɔːd/</p>
              </div>
              <img
                src={play}
                alt=""
                className="w-12 h-12 md:w-auto md:h-auto cursor-pointer"
              />
            </div>

            <div className="mt-10">
              <div>
                <div className="flex items-center gap-4">
                  <p
                    className={
                      isChecked
                        ? "font-bold text-2xl italic text-white"
                        : "font-bold text-2xl italic"
                    }
                  >
                    noun
                  </p>
                  <div className="w-full h-[1px] bg-gray-300"></div>
                </div>

                <p className="text-start my-5 text-xl text-[#757575]">
                  Meaning
                </p>

                <div className="mt-10 text-start">
                  <ul
                    className={
                      isChecked
                        ? "list-disc text-lg text-white"
                        : "list-disc text-lg text-[#2d2d2d]"
                    }
                  >
                    <li>
                      (etc.) A set of keys used to operate a typewriter,
                      computer etc.
                    </li>
                    <li className="md:w-[45rem] my-5">
                      A component of many instruments including the piano,
                      organ, and harpsichord consisting of usually black and
                      white keys that cause different tones to be produced when
                      struck.
                    </li>
                    <li className="md:w-[45rem] mb-5">
                      A device with keys of a musical keyboard, used to control
                      electronic sound-producing devices which may be built into
                      or separate from the keyboard device.
                    </li>
                  </ul>
                  <div className="flex items-center gap-8">
                    <p className="text-xl text-[#757575]">Synonyms</p>
                    <span className="text-[#a445ed] font-bold text-xl cursor-pointer hover:underline">
                      electronic keyboard
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <div className="flex items-center gap-4">
                  <p
                    className={
                      isChecked
                        ? "font-bold text-2xl italic text-white"
                        : "font-bold text-2xl italic"
                    }
                  >
                    verb
                  </p>
                  <div className="w-full h-[1px] bg-gray-300"></div>
                </div>
                <p className="text-start my-5 text-xl text-[#757575]">
                  Meaning
                </p>
                <ul className="text-start">
                  <li
                    className={
                      isChecked
                        ? "list-disc mb-3 text-lg text-white"
                        : "list-disc mb-3 text-lg"
                    }
                  >
                    To type on a computer keyboard
                  </li>
                  <span className="text-[#757575] text-lg">
                    “Keyboarding is the part of this job I hate the most.”
                  </span>
                </ul>
                <div className="w-full h-[1px] bg-gray-300 mt-10"></div>
                <div className="mt-10 flex flex-col md:flex-row items-start md:items-center gap-4">
                  <p className="text-sm text-[#757575]">Source</p>
                  <div
                    className={
                      isChecked
                        ? "flex items-center text-sm text-white"
                        : "flex items-center text-sm text-[#2d2d2d]"
                    }
                  >
                    <p>https://en.wiktionary.org/wiki/keyboard</p>
                    <img src={newWindow} alt="" className="w-3" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
