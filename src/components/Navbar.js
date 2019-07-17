import React from 'react'
import { Link } from 'gatsby'

const Navbar = class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      navBarActiveClass: '',
    }
  }

  toggleHamburger = () => {
    // toggle the active boolean in the state
    this.setState(
      {
        active: !this.state.active,
      },
      // after state has been updated,
      () => {
        // set the class in state for the navbar accordingly
        this.state.active
          ? this.setState({
              navBarActiveClass: 'is-active',
            })
          : this.setState({
              navBarActiveClass: '',
            })
      }
    )
  }

  render() {
    return (
      <nav
        className="navbar"
        role="navigation"
        aria-label="main-navigation"
      >
        {/* Hamburger menu */}
        <div
          className={`navbar-burger burger ${this.state.navBarActiveClass}`}
          data-target="navMenu"
          onClick={() => this.toggleHamburger()}
        >
          <span />
          <span />
          <span />
        </div>
        <ul
          id="navMenu"
          className={`navbar-menu ${this.state.navBarActiveClass}`}
        >
          <li>
            <Link to="/" className="navbar__item--logo">helau</Link>
          </li>
          <li>
            <Link className="navbar__item" to="/portfolio">
              Portfolio
            </Link>
          </li>
          <li>
            <Link className="navbar__item" to="/blog">
              Blog
            </Link>
          </li>
          <li>
            <a href="/" className="navbar__item">
              Shop
            </a>
          </li>
          <li>
            <Link className="navbar__item" to="/about">
              About
            </Link>
          </li>
        </ul>
      </nav>
    )
  }
}

export default Navbar
