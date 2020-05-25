import '../css/HomePage.css';
import exampleGif from '../assets/gliderGif.gif';
import Jumbotron from 'react-bootstrap/Jumbotron';
import React, { Component } from 'react';

/*
    Component for Home Page Tab
*/

class HomePage extends Component {
  render() {
    return (
      <div className="homepage-container">
        <div className="jumbo-container">
          <Jumbotron>
            <h1>Interactive Life-like Cellular Automata</h1>
            <div className="gif-container">
              <img src={exampleGif} alt="loading gif..." />
            </div>
            <h5>
              Create, load, and simulate various life-like cellular automata
            </h5>
            <br />
            <h5>
              To get started, click one of the tabs above, or read more info
              below
            </h5>
          </Jumbotron>
        </div>
        <div className="description-container">
          <div className="site-description">
            <div className="site-description-header">
              <b>What is this site?</b>
            </div>
            <div>
              This site, created by{' '}
              <a
                href={'https://dakokohler.com/'}
                rel="noopener noreferrer"
                target="_blank"
              >
                David Kohler
              </a>
              , serves as a place to experiment with life-like cellular automata
              -- drawing new automata (in the Draw tab), loading in existing
              automata (in the Load tab), or generating completely new and
              random automata (in the Random tab) -- and subsequently simulating
              generations of these automata to observe what happens. It is also
              worth noting that simulations on this site use a bounded grid
              rather than an infinite or boundless one (as other applications
              such as Golly might use), and thus boundaries and B0 rules may
              behave slightly differently
            </div>
          </div>
          <div className="automata-description">
            <div className="automata-description-header">
              <b>What are cellular automata?</b>
            </div>
            <div>
              Cellular automata (plural for automaton), are a class of
              mathematical objects that have been used in the fields of
              microstructure modeling, physics, quantum mechanics, and
              theoretical biology. A cellular automaton consists of a grid of
              cells, each of which has a finite set of allowed states (such as
              on/off or alive/dead), and each of which also has a neighborhood
              of other cells that it interacts with. The state of the cellular
              automaton evolves over time, progressing through a number of
              generations. The state of each cell at time <i>t+1</i> depends on
              the state of each cell at time <i>t</i>, with a transition rule
              specified that determines how the state changes based on the
              states of each cell and neighborhood. <br />
              <br className="custom-break" />A life-like cellular automaton is a
              subclass of cellular automata that has two dimensions, has two
              states (on/off or alive/dead), uses the Moore neighborhood, and
              has a semitotalistic rule. The most famous cellular automaton, and
              in fact what this subclass is named after, is Conway's Game of
              Life. This site focuses specifically on life-like cellular
              automata, of which there exist an incredible amount. For more info
              on cellular automata or on Conway's Game of Life, visit{' '}
              <a
                href={'https://www.conwaylife.com/wiki/Main_Page'}
                rel="noopener noreferrer"
                target="_blank"
              >
                LifeWiki
              </a>{' '}
              or{' '}
              <a
                href={'https://en.wikipedia.org/wiki/Cellular_automaton'}
                rel="noopener noreferrer"
                target="_blank"
              >
                Wikipedia
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
