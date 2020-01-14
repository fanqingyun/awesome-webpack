import React from 'react'
import { HashRouter, BrowserRouter as Router, Route, Redirect, Switch, Link, NavLink } from 'react-router-dom'

export default function Login () {
  return (
    <HashRouter>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>

        <hr />

        {/*
            A <Switch> looks through all its children <Route>
            elements and renders the first one whose path
            matches the current URL. Use a <Switch> any time
            you have multiple routes, but you want only one
            of them to render at a time
          */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </HashRouter>
  )
}
function Home (props) {
  return (
    <div>
      Home
    </div>
  )
}

function About (props) {
  return (
    <div>
      <h2>about</h2>
    </div>
  )
}

class Dashboard extends React.Component {
  render () {
    console.log(this.props)
    return (
      <div>
        <h2>Dashboard</h2>
      </div>
    )
  }
}
