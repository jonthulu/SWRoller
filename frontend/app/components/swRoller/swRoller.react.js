import React from 'react';
import _ from 'lodash';

import rollerActions from '../roller/rollerActions.js';
import paths from '../../constants/paths.js';
import { diceValues, diceOrder, diceSymbols, diceOpposites } from '../../constants/dice.js';
import rollerStore from '../roller/rollerStore.js';

var diceList = _.keys(diceOrder);

class SwRoller extends React.Component {
  state = {
    inHand: rollerStore.getHand(),
    rolled: rollerStore.getRolled()
  }
  
  _onChangeHand = () => {
    this.setState({
      inHand: rollerStore.getHand()
    });
  }

  _onChangeRolled = () => {
    this.setState({
      rolled: rollerStore.getRolled()
    });
  }

  componentDidMount = () => {
    rollerStore.addChangeListener(this._onChangeHand);
    rollerStore.addChangeListener(this._onChangeRolled);
  }

  componentWillUnmount = () => {
    rollerStore.removeChangeListener(this._onChangeHand);
    rollerStore.removeChangeListener(this._onChangeRolled);
  }

  render = () => {
    return (
      <div className="quickRoller col-lg-10 col-lg-offset-1">
        <div className="diceChoiceWrapper">
          <span className="diceChoiceInstructions instructions">
            Tap the dice below to add them to your hand.
          </span>
          <div className="diceChoice box">
            <div className="innerBox">
            {
              _.map(diceList, (diceName) => {
                return <a key={diceName} className="diceChoiceDie">
                  <image
                    className="dieImage"
                    src={paths.diceImages + "/" + diceName + ".png"}
                    onClick={this._onAddDieClick}
                    data-type={diceName}
                  />
                </a>
              })
            }
            </div>
          </div>
        </div>
        <div className="diceBoxWrapper">
          <div className="diceBox box">
            <div className="innerBox">
            {
              _.map(this.state.inHand, (diceName, iter) => {
                return <a key={diceName + iter} className="diceBoxDie">
                  <image
                    className="dieImage"
                    src={paths.diceImages + "/" + diceName + ".png"}
                    onClick={this._onRemoveDieClick}
                    data-type={diceName}
                  />
                </a>
              })
            }
            </div>
            {
              (this.state.inHand.length) ?
                <div className="instructions removeFrom">Tap dice above to remove them from your hand</div> :
                <div className="emptyHand">Your Hand is Empty</div>
            }
          </div>
        </div>
        <div className="diceActionsWrapper">
          <div className="diceActions">
            <button
              className="btn btn-md btn-primary"
              onClick={this._onRollDiceClick}
              disabled={this.state.inHand.length ? null : "disabled"}
            >Roll</button>
            <button
              className="btn btn-md btn-primary"
              onClick={this._onClearAllClick}
              disabled={this.state.inHand.length ? null : "disabled"}
            >Clear All</button>
          </div>
        </div>
        <div className="diceResultsWrapper">
          <div className="box">
            <div className="innerBox">
              <div className="diceResultImages">
              {
                _.map(this.state.rolled.rolled, (rolled, iter) => {
                  return <a key={"rolled" + iter} className="diceResultDie">
                    <image
                      className="dieSideImage"
                      src={paths.diceImages + "/" + rolled.image + ".png"}
                    />
                  </a>
                })
              }
              </div>
              <div className="diceResultStatImages">
              {
                _.map(this.state.rolled.images, (statImage, i) => {
                  return <a key={statImage + i}><image
                    className="resultImage"
                    src={paths.diceImages + "/" + statImage + ".png"}
                  /></a>
                })
              }
              </div>
              <div className="diceResultStats">
              {
                _.map(this.state.rolled.stats, (statValue, statName) => {
                  return <div
                    key={statName}
                    className="statValue"
                  >
                    <span className="resultStatName">{statName}:</span>
                    <span className="resultStatValue">{statValue}</span>
                  </div>
                })
              }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  _onAddDieClick = (event) => {
    if (!event.target.getAttribute('data-type')) {
      return;
    }

    rollerActions.addToHand(
      event.target.getAttribute('data-type')
    );
  }

  _onRemoveDieClick = (event) => {
    if (!event.target.getAttribute('data-type')) {
      return;
    }

    rollerActions.removeFromHand(
      event.target.getAttribute('data-type')
    );
  }

  _onClearAllClick = () => {
    rollerActions.clearAll();
  }

  _onRollDiceClick = () => {
    rollerActions.roll();
  }
}

export default SwRoller;
