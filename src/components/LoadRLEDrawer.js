import '../css/LoadRLEDrawer.css';
import Button from 'react-bootstrap/Button';
import Drawer from '@material-ui/core/Drawer';
import Dropdown from 'react-bootstrap/Dropdown';
import exampleRLEs from '../assets/exampleRLEs';
import { RLEtoGrid } from '../logic/rleLogic';
import React, { Component } from 'react';

/*
    Component rendering drawer to load RLE
*/

class LoadRLEDrawer extends Component {
  constructor() {
    super();
    this.state = {
      dropdownUploadFile: false,
      loadDrawer: false,
      loadedContents: '',
      loadedFileName: '',
      loadFileError: false,
    };
    this.handleDropdown = this.handleDropdown.bind(this);
    this.handleFileSubmit = this.handleFileSubmit.bind(this);
    this.toggleLoadDrawer = this.toggleLoadDrawer.bind(this);
  }

  componentDidUpdate() {
    // set listener for file upload when drawer is open
    if (
      this.state.loadDrawer === true &&
      this.state.dropdownUploadFile === true
    ) {
      setTimeout(() => {
        document
          .getElementById('file-input')
          .addEventListener('change', this.readSingleFile, false);
      }, 0);
    }
  }

  handleDropdown = (e) => {
    // handle select on dropdown
    console.log(e);
    if (e === 'upload') {
      this.setState({
        dropdownUploadFile: true,
        loadedContents: '',
        loadedFileName: 'Upload File',
      });
    } else {
      this.setState({
        dropdownUploadFile: false,
        loadedFileName: e,
        loadedContents: exampleRLEs[e],
      });
    }
  };

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
    console.log(e);
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
            style={{ 'min-width': 400 }}
          >
            <div className="drawer-container">
              <Dropdown onSelect={(evt) => this.handleDropdown(evt)}>
                <Dropdown.Toggle variant="success" id="load-file-dropdown">
                  {this.state.loadedFileName !== ''
                    ? this.state.loadedFileName
                    : 'Select File'}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item eventKey="upload">Upload File</Dropdown.Item>
                  {Object.keys(exampleRLEs).map((patternName) => (
                    <Dropdown.Item eventKey={`${patternName}`}>
                      {patternName}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              {this.state.dropdownUploadFile === true && (
                <div>
                  <input type="file" id="file-input" accept=".rle" />
                  <p>
                    Only <b>.rle</b> files allowed
                  </p>
                </div>
              )}
              <div>
                <p>
                  <b>Note:</b> This site uses a finite boundary, so some
                  patterns may
                </p>
                <p>
                  benefit from increasing the grid size after loading them in
                </p>
                <br />
                <p>Contents of the file:</p>
                {this.state.loadedContents.split('\n').map((item, i) => (
                  <p key={i}>{item}</p>
                ))}
                <div className="load-file-button">
                  <Button
                    disabled={this.state.loadedContents === ''}
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
