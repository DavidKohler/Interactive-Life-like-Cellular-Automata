import Button from 'react-bootstrap/Button';
import Drawer from '@material-ui/core/Drawer';
import InteractiveGrid from '../components/InteractiveGrid';
import SavedRLEModal from '../components/SavedRLEModal';
import React, { Component } from 'react';
import Slider from 'rc-slider';
import { SliderHandle } from '../sliders/sliderHandle';
import { dimensionMarks } from '../sliders/sliderMarks';

/*
    Component for Drawing Grid Tab
*/

const wrapperStyle = { width: 800, margin: 50 };

class DrawGridPage extends Component {
  constructor() {
    super();
    this.state = {
      birthRule: [3],
      cols: 10,
      drawerOpen: false,
      grid: [],
      loadGrid: false,
      refreshVal: 0,
      rows: 10,
      surviveRule: [2, 3],
    };
    this.makeGridAppear = this.makeGridAppear.bind(this);
    this.renderRef = React.createRef();
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.updateColumns = this.updateColumns.bind(this);
    this.updateRows = this.updateRows.bind(this);
  }

  handleSubmit = () => {
    // handle click on submit button
    setTimeout(() => {
      this.setState({ drawerOpen: false, grid: [], loadGrid: false });
      let table = document.querySelector('body > table');
      if (table !== null) {
        table.parentNode.removeChild(table);
        this.setState((state) => ({
          refreshTabVal: state.refreshTabVal + 1,
        }));
      }
    }, 0);
  };

  makeGridAppear() {
    // render drawing grid
    this.setState({ loadGrid: true });
  }

  toggleDrawer = (open) => (event) => {
    // toggle opening customization drawer
    this.setState({ drawerOpen: open });
  };

  updateColumns = (val) => {
    // update number of columns in grid
    this.setState({
      cols: val,
    });
  };

  updateRows = (val) => {
    // update number of rows in grid
    this.setState({
      rows: val,
    });
  };

  render() {
    // render page and buttons
    let displayGrid = this.state.loadGrid;
    return (
      <div>
        Draw Grid Page!
        {!displayGrid && (
          <Button onClick={this.makeGridAppear}>{'Open Grid'}</Button>
        )}
        {displayGrid && (
          <InteractiveGrid
            key={this.props.refreshVal}
            rows={this.state.rows}
            cols={this.state.cols}
            refLoc={this.renderRef}
          />
        )}
        {displayGrid && (
          <div className="save-rle-container">
            <SavedRLEModal {...this.state} />
          </div>
        )}
        <div className="customizer-drawer">
          <React.Fragment key={'drawerOpen'}>
            <Button onClick={this.toggleDrawer(true)}>{'Customize'}</Button>
            <Drawer
              anchor={'right'}
              onClose={this.toggleDrawer(false)}
              open={this.state.drawerOpen}
            >
              <div className="column-slider" style={wrapperStyle}>
                {`Columns: ${this.state.cols}`}
                <Slider
                  defaultValue={this.state.cols}
                  handle={SliderHandle}
                  max={80}
                  marks={dimensionMarks}
                  min={1}
                  onChange={(v) => this.updateColumns(v)}
                />
              </div>
              <div className="row-slider" style={wrapperStyle}>
                {`Rows: ${this.state.rows}`}
                <Slider
                  defaultValue={this.state.rows}
                  handle={SliderHandle}
                  marks={dimensionMarks}
                  max={80}
                  min={1}
                  onChange={(v) => this.updateRows(v)}
                />
              </div>
              <div className="submit-container">
                <Button onClick={this.handleSubmit}>Submit</Button>
              </div>
            </Drawer>
          </React.Fragment>
        </div>
      </div>
    );
  }
}

export default DrawGridPage;

//TODO
// styling
// description
