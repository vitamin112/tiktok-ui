import { useState } from "react";

function App() {
  let [av, setAV] = useState();
  let handle = (e) => {
    let file = e.target.files[0];
    file.url = URL.createObjectURL(file);
    setAV(file.url);
  };
  return (
    <div className="App">
      <input type="file" onChange={handle} />
      {av && <img src={av} alt={av} />}
    </div>
  );
}

export default App;
