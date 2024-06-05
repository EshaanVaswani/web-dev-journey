import { useState, useCallback, useRef, useEffect } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_-+=[]{}`~";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
    setCopied(false);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const passwordRef = useRef(null);

  const copyPassToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, setPassword, passwordGenerator]);

  return (
    <>
      <div className="m-auto p-7 mt-5 justify-center rounded-lg max-w-2xl bg-gray-700">
        <h1 className="text-center text-white text-4xl ">Password Generator</h1>
        <div className="mx-4">
          <input
            className="w-full px-3 py-3 rounded-full outline-none mt-5"
            type="text"
            readOnly
            value={password}
            ref={passwordRef}
          />

          <button
            onClick={copyPassToClipboard}
            className="relative text-white text-lg bg-blue-500 py-1.5 px-3 bottom-11 left-[516px] rounded-full"
          >
            Copy
          </button>

          {copied && (
            <div className="absolute top-0 right-0 mt-2 bg-gray-800 mr-2 p-2 text-white rounded-md">
              Password copied to clipboard!
            </div>
          )}
        </div>

        <div className="flex items-center justify-center">
          <input
            type="range"
            max={50}
            min={8}
            value={length}
            className="cursor-pointer"
            onChange={(e) => setLength(e.target.value)}
          />
          <label className="text-white text-xl mx-3">Length ({length})</label>

          <input
            className="ml-3"
            type="checkbox"
            defaultChecked={numberAllowed}
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />
          <label className="text-white mx-3.5 text-xl"> Numbers</label>

          <input
            type="checkbox"
            defaultChecked={charAllowed}
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <label className="text-white mx-3.5 text-xl">
            Special Characters
          </label>
        </div>
      </div>
    </>
  );
}

export default App;
