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
        <Link to="/" className="navbar__item navbar__item--logo">helau</Link>
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
            <Link className="navbar__item" to="/portfolio">
              Portfolio
            </Link>
          </li>

          <li>
            <Link className="navbar__item" to="/blog">
              Blog
            </Link>
          </li>

          {/* <li>
            <a href="https://www.etsy.com/uk/shop/helau64" 
              target="_blank"
              rel="noopener noreferrer"
              className="navbar__item">
              Shop
            </a>
          </li> */}

          <hr></hr>

          <li className="navbar__item">
            <a
              href="https://twitter.com/helau64"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              Twitter
            </a>
          </li>

          <li className="navbar__item">
            <a 
              href="https://instagram.com/helau64"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              Instagram
            </a>
          </li>

          <li className="navbar__item">
            <a
                href="https://github.com/helau64"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                GitHub
              </a>
          </li>

          <hr></hr>

          <li className="navbar__item">
            <a href="mailto:hi@helau.co.uk">hi@helau.co.uk</a>
          </li>
        </ul>
      </nav>
    )
  }
}

export default Navbar
