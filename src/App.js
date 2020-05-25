import './css/App.css';
import DrawGridPage from './tab_pages/DrawGridPage';
import HomePage from './tab_pages/HomePage';
import LoadRLEPage from './tab_pages/LoadRLEPage';
import RandomGridPage from './tab_pages/RandomGridPage';
import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

/*
    Root component to render tabs and tab switching
*/

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      refreshTabVal: 0,
    };
    this.resetTab = this.resetTab.bind(this);
  }

  resetTab() {
    // remove sketch buttons and table element when changing tabs, and refresh tabs
    setTimeout(() => {
      let buttons = document.querySelectorAll('body > button');
      let table = document.querySelector('body > table');
      if (buttons.length > 0) {
        for (let i = 0; i < buttons.length; i++) {
          buttons[i].parentNode.removeChild(buttons[i]);
        }
        this.setState((state) => ({
          refreshTabVal: state.refreshTabVal + 1,
        }));
      }
      if (table !== null) {
        table.parentNode.removeChild(table);
        this.setState((state) => ({
          refreshTabVal: state.refreshTabVal + 1,
        }));
      }
    }, 0);
  }

  render() {
    return (
      <div className="main-container">
        <div className="tab-container">
          <Tabs
            defaultActiveKey="home"
            id="main-tab-group"
            onSelect={() => this.resetTab()}
          >
            <Tab eventKey="home" title="Home">
              <HomePage />
            </Tab>
            <Tab eventKey="draw" title="Draw Automaton">
              <DrawGridPage key={this.state.refreshTabVal} />
            </Tab>
            <Tab eventKey="loadrle" title="Load Automaton">
              <LoadRLEPage key={this.state.refreshTabVal} />
            </Tab>
            <Tab eventKey="random" title="Random Automaton">
              <RandomGridPage key={this.state.refreshTabVal} />
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default App;
