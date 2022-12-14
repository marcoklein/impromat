import { PageProps } from "gatsby";
import React from "react";
import "./styles.scss";
import logo from "../images/icon192.png";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <>
      <section className="hero is-primary is-halfheight">
        <div className="hero-head">
          <nav className="navbar">
            <div className="container">
              <div className="navbar-brand">
                <a className="navbar-item">
                  <img src={logo} alt="Logo" />
                </a>
                <span className="navbar-burger" data-target="navbarMenuHeroA">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </div>
              <div id="navbarMenuHeroA" className="navbar-menu">
                <div className="navbar-end">
                  <a className="navbar-item is-active">Home</a>
                  <a className="navbar-item">Examples</a>
                  <a className="navbar-item">Documentation</a>
                  <span className="navbar-item">
                    <a className="button is-primary is-inverted">
                      <span className="icon">
                        <i className="fab fa-github"></i>
                      </span>
                      <span>Download</span>
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </nav>
        </div>
        <div className="hero-body">
          <div className="container">
            <h1 className="title is-1">Impromat</h1>
            <h2 className="subtitle">Plan Improvisational Theatre Workshops</h2>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column">
              <h2 className="title is-2">Level 2 heading</h2>
              <p className="content">Cool content. Using Bulma!</p>
            </div>

            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} className="column is-four-fifths">
                <h2 className="title is-2">Level 2 heading</h2>
                <p className="content">This column is cool too!</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default IndexPage;
