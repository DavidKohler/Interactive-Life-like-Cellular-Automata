import React from 'react';
import './App.css';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import HomePage from './HomePage';
import DrawGridPage from './DrawGridPage';
import LoadRLEPage from './LoadRLEPage';
import RandomGridPage from './RandomGridPage';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      refreshTabVal: 0,
    };
    this.resetTab = this.resetTab.bind(this);
  }

  resetTab() {
    let elem = document.querySelector('body > button');
    if (elem !== null) {
      elem.parentNode.removeChild(elem);
      this.setState((state) => ({
        refreshTabVal: state.refreshTabVal + 1,
      }));
    }
  }

  render() {
    return (
      <div className="App">
        <Tabs
          defaultActiveKey="home"
          id="main-tab-group"
          onSelect={() => this.resetTab()}
        >
          <Tab eventKey="home" title="Home">
            <HomePage />
          </Tab>
          <Tab eventKey="draw" title="Draw Grid">
            <DrawGridPage />
          </Tab>
          <Tab eventKey="loadrle" title="Load RLE">
            <LoadRLEPage />
          </Tab>
          <Tab eventKey="random" title="Random Grid">
            <RandomGridPage key={this.state.refreshTabVal} />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default App;

//TODO:
// load in RLE grids
// save grid to RLE
// UI for changing parameters
// allow for different rulesets
// allow user to draw grid
// add padding for RLE input grids
// find meaningful boundaries for saved RLE grids
// styling
// homepage
