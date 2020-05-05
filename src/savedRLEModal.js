import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import gridToRLE from './RLElogic';

class SavedRLEModal extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      savedRLE: [''],
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
  }

  handleClose = () => {
    this.setState({ showModal: false });
  };

  handleShow = () => {
    let RLE = gridToRLE(this.props.grid, this.props.bRule, this.props.sRule);
    this.setState({ showModal: true, savedRLE: RLE });
  };

  // Function to download data to a file
  downloadRLEFile = () => {
    let data = this.state.savedRLE.join('\n');
    let filename = 'savedRLE.rle';
    let type = '.rle';
    let file = new Blob([data], { type: type });
    if (window.navigator.msSaveOrOpenBlob)
      // IE10+
      window.navigator.msSaveOrOpenBlob(file, filename);
    else {
      // Others
      let a = document.createElement('a'),
        url = URL.createObjectURL(file);
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 0);
    }
  };

  render() {
    return (
      <div>
        <Button variant="primary" onClick={this.handleShow}>
          View RLE File
        </Button>

        <Modal show={this.state.showModal} size="lg" onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>RLE File</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.savedRLE.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.downloadRLEFile}>
              Download RLE File
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default SavedRLEModal;
