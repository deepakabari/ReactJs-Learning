// import { useEffect, useState } from "react";
import { Suspense } from "react";
import "./App.css";
// import Contact from "./components/Contact";
import ErrorBoundary from "./components/ErrorBoundary";
// import Profile from "./components/Profile";
import { ThemeProvider } from "./components/ThemeContext";
import WidgetA from "./components/WidgetA";
import WidgetB from "./components/WidgetB";

function App() {
  // const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentTime(new Date().toLocaleTimeString());
  //   }, 1000)

  //   return () => clearInterval(interval);
  // }, []);

  // const items = ['apple', 'banana', 'orange']

  // const users = [
  //   { id: 1, name: 'Geeks', age: 30 },
  //   { id: 2, name: 'for', age: 25 },
  //   { id: 3, name: 'Geeks', age: 35 },
  // ]

  // const COMPANY = ["GEEKS", "FOR", "GEEKS"];
  // const handleClick = (COMPANY: string) => {
  //   alert(`You click on ${COMPANY}`)
  // }

  return (
    <>
      {/* <h1>{currentTime}</h1>
      <h1>Fruits List</h1>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <ul>
        {users.map((user) => (
          user.age > 30 ? (
            < li key={user.id} > {user.name} is over 30 years old.</li>
          ) : (
            < li key={user.id} > {user.name} is under 30 years old.</li>
          )
        ))}
      </ul>
      <ul>
        {COMPANY.map((COMPANY, index) => (
          <button key={index} onClick={() => handleClick(COMPANY)}>{COMPANY}</button>
        ))}
      </ul> */}
      {/* <Contact />
      <Profile /> */}
      <ThemeProvider>
        <ErrorBoundary>
          <Suspense fallback={<div>Loading widget...</div>}>
            <WidgetA />
            <WidgetB />
          </Suspense>
        </ErrorBoundary>
      </ThemeProvider>
    </>
  )
}

export default App;
