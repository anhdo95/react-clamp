import React, { useState } from "react";
import "./App.css";

import ReactClamp from "./components/ReactClamp";

function App() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="app">
      <ReactClamp
        maxLines={3}
        expanded={expanded}
        renderAfter={() => (
          <button className="toggle" onClick={() => setExpanded(!expanded)}>
            Toggle
          </button>
        )}
      >
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </ReactClamp>
    </div>
  );
}

export default App;
