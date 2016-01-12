import React from 'react';
import _ from 'lodash';

import paths from '../constants/paths.js';
import { diceValues, diceOrder, diceSymbols, diceOpposites } from '../constants/dice.js';

var diceList = _.keys(diceOrder);

var Roller = React.createClass({
  getInitialState: function qrInitialState() {
    return {
      inHand:       [],
      rolledHand:   [],
      rolledStats:  {},
      rolledImages: []
    };
  },
  sortDice: function qrSortDice(a, b) {
    if (diceOrder[a] < diceOrder[b]) {
      return -1;
    }
    if (diceOrder[a] > diceOrder[b]) {
      return 1;
    }
    return 0;
  },
  rollDice: function qrRollDice(diceToRoll) {
    var face;
    return _.map(diceToRoll, (diceName) => {
      face = Math.floor(Math.random() * diceValues[diceName].length);
      return diceValues[diceName][face];
    });
  },
  calculateStats: function qrCalculateStats(rolledSides) {
    var baseStats = _.reduce(rolledSides, (result, roll) => {
      _.forEach(roll.results, (val, name) => {
        if (!result.hasOwnProperty(name)) {
          result[ name ] = val;
        } else {
          result[ name ] += val;
        }
      });
      return result;
    }, {});

    return _.reduce(baseStats, (result, statValue, statName) => {
      if (statName === 'blank') {
        return result;
      } else if (statValue === 0) {
        return result;
      }

      if (statValue < 0) {
        result[ diceOpposites[ statName ] ] = 0 - statValue;
      } else {
        result[ statName ] = statValue;
      }
      return result;
    }, {});
  },
  calculateStatImages: function qrCalculateStatImages(stats) {
    return _.reduce(stats, (adjusted, statValue, statName) => {
      return adjusted.concat(new Array(statValue).fill(diceSymbols[ statName ].image));
    }, []);
  },
  addDieClick: function qrAddDieClick(event) {
    if (!event.target.getAttribute('data-type')) {
      return;
    }

    var type   = event.target.getAttribute('data-type');
    var inHand = _.clone(this.state.inHand, true);
    inHand.push(type);
    inHand.sort(this.sortDice);

    this.setState({ inHand: inHand });
  },
  removeDieClick: function qrRemoveDieClick(event) {
    if (!event.target.getAttribute('data-type')) {
      return;
    }

    var type   = event.target.getAttribute('data-type');
    var inHand = _.clone(this.state.inHand, true);
    var index  = _.indexOf(inHand, type);
    inHand.splice(index, 1);

    this.setState({ inHand: inHand });
  },
  clearDiceClick: function qrClearDiceClick() {
    this.setState({
      inHand:       [],
      rolledHand:   [],
      rolledStats:  {},
      rolledImages: []
    });
  },
  rollDiceClick: function qrRollDiceClick() {
    var rolled = this.rollDice(this.state.inHand);
    var stats  = this.calculateStats(rolled);
    var images = this.calculateStatImages(stats);

    this.setState({
      rolledHand:   rolled,
      rolledStats:  stats,
      rolledImages: images
    });
  },
  render: function qrRender() {
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
                    onClick={this.addDieClick}
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
                    onClick={this.removeDieClick}
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
              onClick={this.rollDiceClick}
              disabled={this.state.inHand.length ? null : "disabled"}
            >Roll</button>
            <button
              className="btn btn-md btn-primary"
              onClick={this.clearDiceClick}
              disabled={this.state.inHand.length ? null : "disabled"}
            >Clear All</button>
          </div>
        </div>
        <div className="diceResultsWrapper">
          <div className="box">
            <div className="innerBox">
              <div className="diceResultImages">
              {
                _.map(this.state.rolledHand, (rolled, iter) => {
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
                _.map(this.state.rolledImages, (statImage, i) => {
                  return <a key={statImage + i}><image
                    className="resultImage"
                    src={paths.diceImages + "/" + statImage + ".png"}
                  /></a>
                })
              }
              </div>
              <div className="diceResultStats">
              {
                _.map(this.state.rolledStats, (statValue, statName) => {
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
});

export default Roller;
