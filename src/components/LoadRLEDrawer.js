import '../css/LoadRLEDrawer.css';
import Button from 'react-bootstrap/Button';
import Drawer from '@material-ui/core/Drawer';
import { RLEtoGrid } from '../logic/rleLogic';
import React, { Component } from 'react';

/*
    Component rendering drawer to load RLE
*/

class LoadRLEDrawer extends Component {
  constructor() {
    super();
    this.state = {
      loadDrawer: false,
      loadedContents: '',
      loadedFileName: '',
      loadFileError: false,
    };
    this.handleFileSubmit = this.handleFileSubmit.bind(this);
    this.toggleLoadDrawer = this.toggleLoadDrawer.bind(this);
  }

  componentDidUpdate() {
    // set listener for file upload when drawer is open
    if (this.state.loadDrawer === true) {
      setTimeout(() => {
        document
          .getElementById('file-input')
          .addEventListener('change', this.readSingleFile, false);
      }, 0);
    }
  }

  handleFileSubmit = () => {
    // handle click on submit button, activate parent submit function
    let convertedRLE;
    let hasError = false;
    try {
      convertedRLE = RLEtoGrid(this.state.loadedContents);
    } catch (err) {
      hasError = true;
      setTimeout(() => {
        this.setState({
          loadFileError: true,
          errorType: err.message,
        });
      }, 0);
    }
    if (hasError === false) {
      setTimeout(() => {
        this.props.submitFunction(convertedRLE);
        this.setState({ loadDrawer: false, loadFileError: false });
      }, 50);
    }
  };

  readSingleFile = (e) => {
    // read RLE file from upload
    let file = e.target.files[0];
    if (!file) {
      return;
    }
    if (file.name !== this.state.loadedFileName) {
      this.setState({ loadFileError: false });
    }
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (e) => {
      let contents = e.target.result;
      this.setState({
        loadedContents: contents,
        loadedFileName: file.name,
        loadFileError: false,
      });
    };
  };

  resetAutomata() {
    // refresh grid by increasing key of component
    this.setState((state) => ({
      refreshVal: state.refreshVal + 1,
    }));
  }

  toggleLoadDrawer = (open) => (event) => {
    // toggle opening customization drawer
    this.setState({ loadDrawer: open });
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
            <div className="drawer-container">
              <div>
                <input type="file" id="file-input" accept=".rle" />
                <p>
                  Only <b>.rle</b> files allowed
                </p>
                <p>Contents of the file:</p>
                {this.state.loadedContents.split('\n').map((item, i) => (
                  <p key={i}>{item}</p>
                ))}
                <div className="load-file-button">
                  <Button
                    variant={
                      this.state.loadFileError === true ? 'danger' : 'primary'
                    }
                    onClick={this.handleFileSubmit}
                  >
                    {this.state.loadFileError ? 'Invalid Submission' : 'Submit'}
                  </Button>
                </div>
                {this.state.loadFileError === true && (
                  <div className="error-text">
                    Uh oh! Something went wrong!
                    <br />
                    <br /> It looks like your RLE file is not in the correct
                    format
                    <br />
                    <br />
                    For more information on correct format, please visit{' '}
                    <a
                      href={
                        'https://www.conwaylife.com/wiki/Run_Length_Encoded'
                      }
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      LifeWiki
                    </a>
                  </div>
                )}
              </div>
            </div>
          </Drawer>
        </React.Fragment>
      </div>
    );
  }
}

export default LoadRLEDrawer;
