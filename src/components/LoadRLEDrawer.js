import Button from 'react-bootstrap/Button';
import Drawer from '@material-ui/core/Drawer';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import { RLEtoGrid } from '../logic/rleLogic';
import React, { Component } from 'react';

/*
    Component rendering drawer to load RLE
*/

class LoadRLEDrawer extends Component {
  constructor() {
    super();
    this.state = {
      birthInput: '',
      errorType: '',
      grid: [],
      howToLoad: 'FILELOADER',
      loadDrawer: false,
      loadedContents: '',
      loadFileError: false,
      surviveInput: '',
      xValue: '',
      yValue: '',
      textboxInput: '',
      textboxError: false,
    };
    this.handleFileSubmit = this.handleFileSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleTextSubmit = this.handleTextSubmit.bind(this);
    this.resetTextbox = this.resetTextbox.bind(this);
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

  handleInputChange = (event) => {
    // handle changes to textbox input fields
    this.setState({ [event.target.name]: event.target.value });
  };

  handleTextSubmit = (event) => {
    // handle click on submit button, activate parent submit function
    event.preventDefault();
    let convertedRLE;
    let hasError = false;
    try {
      let firstLine = `x = ${this.state.xValue}, y = ${this.state.yValue}, rule = B${this.state.birthInput}/S${this.state.surviveInput}\n`;
      let fullString = firstLine.concat(this.state.textboxInput);
      convertedRLE = RLEtoGrid(fullString);
    } catch (err) {
      hasError = true;
      setTimeout(() => {
        this.setState({
          textboxError: true,
          errorType: err.message,
        });
      }, 0);
    }
    if (hasError === false) {
      setTimeout(() => {
        this.props.submitFunction(convertedRLE);
        this.setState({ loadDrawer: false, textboxError: false });
      }, 50);
    }
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
        loadedContents: contents,
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

  resetTextbox() {
    // resets textbox contents
    this.setState({
      xValue: '',
      yValue: '',
      birthInput: '',
      surviveInput: '',
      textboxInput: '',
    });
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
                <p>Contents of the file:</p>
                {this.state.loadedContents.split('\n').map((item, i) => (
                  <p key={i}>{item}</p>
                ))}
                <Button onClick={this.handleFileSubmit}>Submit</Button>
                {this.state.loadFileError === true && (
                  <div>Error! Error! Error!{this.state.errorType}</div>
                )}
              </div>
            )}
            {this.state.howToLoad === 'TEXTBOX' && (
              <div>
                <Form onSubmit={this.handleTextSubmit}>
                  <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="x-input">X</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      placeholder="X Value"
                      aria-label="X Value"
                      aria-describedby="x-input"
                      name="xValue"
                      value={this.state.xValue}
                      onChange={this.handleInputChange}
                    />
                    <InputGroup.Append>
                      <InputGroup.Text id="y-input">Y</InputGroup.Text>
                    </InputGroup.Append>
                    <FormControl
                      placeholder="Y Value"
                      aria-label="Y Value"
                      aria-describedby="y-input"
                      name="yValue"
                      value={this.state.yValue}
                      onChange={this.handleInputChange}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="birth-input">B</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      placeholder="Birth Rule"
                      aria-label="Birth Rule"
                      aria-describedby="birth-input"
                      name="birthInput"
                      value={this.state.birthInput}
                      onChange={this.handleInputChange}
                    />
                    <InputGroup.Append>
                      <InputGroup.Text id="survive-input">S</InputGroup.Text>
                    </InputGroup.Append>
                    <FormControl
                      placeholder="Survive Rule"
                      aria-label="Survive Rule"
                      aria-describedby="survive-input"
                      name="surviveInput"
                      value={this.state.surviveInput}
                      onChange={this.handleInputChange}
                    />
                  </InputGroup>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text>RLE Text</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      as="textarea"
                      aria-label="RLE Text"
                      aria-describedby="textbox-input"
                      placeholder="Enter RLE Text Here"
                      name="textboxInput"
                      value={this.state.textboxInput}
                      onChange={this.handleInputChange}
                    />
                  </InputGroup>
                  <Button onClick={this.resetTextbox} variant="secondary">
                    Reset
                  </Button>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                  {this.state.textboxError === true && (
                    <div>Error! Error! Error!{this.state.errorType}</div>
                  )}
                </Form>
              </div>
            )}
          </Drawer>
        </React.Fragment>
      </div>
    );
  }
}

export default LoadRLEDrawer;

// TODO
// styling
