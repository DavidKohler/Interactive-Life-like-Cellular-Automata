import Drawer from '@material-ui/core/Drawer';
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { RLEtoGrid } from './RLElogic';

class LoadRLEDrawer extends Component {
  constructor() {
    super();
    this.state = {
      howToLoad: 'FILELOADER',
      file: '',
      loadDrawer: false,
      grid: [],
    };
    this.toggleLoadDrawer = this.toggleLoadDrawer.bind(this);
  }

  componentDidUpdate() {
    // set listener for file upload when drawer is open
    if (
      this.state.loadDrawer === true &&
      this.state.howToLoad === 'FILELOADER'
    ) {
      setTimeout(() => {
        document
          .getElementById('file-input')
          .addEventListener('change', this.readSingleFile, false);
      }, 0);
    }
  }

  handleSubmit = () => {
    // handle click on submit button, activate parent submit function
    let convertedRLE = RLEtoGrid(this.state.file);
    setTimeout(() => {
      this.props.submitFunction(convertedRLE);
      this.setState({ loadDrawer: false });
    }, 50);
  };

  readSingleFile = (e) => {
    // read RLE file from upload
    let file = e.target.files[0];
    if (!file) {
      return;
    }
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (e) => {
      let contents = e.target.result;
      this.setState({
        file: contents,
      });
    };
  };

  resetAutomata() {
    // refresh grid by increasing key of component
    this.setState((state) => ({
      refreshVal: state.refreshVal + 1,
    }));
  }

  toggleFileLoader = () => {
    // toggle file input as method to load RLE
    this.setState({ howToLoad: 'FILELOADER' });
  };

  toggleLoadDrawer = (open) => (event) => {
    // toggle opening customization drawer
    this.setState({ loadDrawer: open });
  };

  toggleTextbox = () => {
    // toggle textbox as method to load RLE
    this.setState({ howToLoad: 'TEXTBOX' });
  };
  render() {
    return (
      <div>
        <React.Fragment key={'drawerOpen'}>
          <Button onClick={this.toggleLoadDrawer(true)}>{'Load RLE'}</Button>
          <Drawer
            anchor={'right'}
            onClose={this.toggleLoadDrawer(false)}
            open={this.state.loadDrawer}
          >
            {'Load RLE'}
            <Button onClick={this.toggleFileLoader}>{'Load From File'}</Button>
            <Button onClick={this.toggleTextbox}>{'Paste Into Textbox'}</Button>
            {this.state.howToLoad === 'FILELOADER' && (
              <div>
                <input type="file" id="file-input" accept=".rle" />
                <h3>Contents of the file:</h3>
                {this.state.file.split('\n').map((item, i) => (
                  <p key={i}>{item}</p>
                ))}
              </div>
            )}
            {this.state.howToLoad === 'TEXTBOX' && (
              <div>
                <h3>Textbox!</h3>
              </div>
            )}
            <Button onClick={this.handleSubmit}>Submit</Button>
          </Drawer>
        </React.Fragment>
      </div>
    );
  }
}

export default LoadRLEDrawer;
