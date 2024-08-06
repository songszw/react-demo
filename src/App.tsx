import './App.css'

import {Suspense} from "react";

function App() {
  return (
    <></>
  )
}

export default function WrappedApp() {
  return (
    <Suspense fallback="loading">
      <App />
    </Suspense>
  )
}
// export default App
