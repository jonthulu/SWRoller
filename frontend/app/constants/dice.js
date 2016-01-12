import _ from 'lodash';

const SUCCESS = {
  "success": 1
};

const ADVANTAGE = {
  "advantage": 1
};

const TRIUMPH = {
  "success": 1,
  "triumph": 1
};

const FAILURE = {
  "success": -1
};

const THREAT = {
  "advantage": -1
};

const DESPAIR = {
  "success": -1,
  "triumph": -1
};

const DARK = {
  "dark": 1
};

const LIGHT = {
  "light": 1
};

const BLANK = {
  "blank": 1
};

var diceSymbols = {
  advantage: { image: 'A' },
  success:   { image: 'S' },
  triumph:   { image: 'Triumph' },
  failure:   { image: 'F' },
  threat:    { image: 'T' },
  despair:   { image: 'Despair' },
  dark:      { image: 'D' },
  light:     { image: 'L' }
};

var diceOpposites = {
  advantage: "threat",
  success:   "failure",
  triumph:   "despair"
};

var diceOrder = {
  ability:     1,
  proficiency: 2,
  boost:       3,
  difficulty:  4,
  challenge:   5,
  setback:     6,
  force:       7
};

var diceSort = function diceSort(a, b) {
  if (diceOrder[ a ] < diceOrder[ b ]) {
    return -1;
  }
  if (diceOrder[ a ] > diceOrder[ b ]) {
    return 1;
  }
  return 0;
};

var diceValues = {
  boost: [
    { values: [ BLANK ], image: 'boostBlank', results: {} },
    { values: [ BLANK ], image: 'boostBlank', results: {} },
    { values: [ SUCCESS ], image: 'boostS', results: {} },
    { values: [ SUCCESS, ADVANTAGE ], image: 'boostSA', results: {} },
    { values: [ ADVANTAGE, ADVANTAGE ], image: 'boostAA', results: {} },
    { values: [ ADVANTAGE ], image: 'boostA', results: {} }
  ],
  ability: [
    { values: [ BLANK ], image: 'abilityBlank', results: {} },
    { values: [ SUCCESS ], image: 'abilityS', results: {} },
    { values: [ SUCCESS ], image: 'abilityS', results: {} },
    { values: [ SUCCESS, SUCCESS ], image: 'abilitySS', results: {} },
    { values: [ ADVANTAGE ], image: 'abilityA', results: {} },
    { values: [ ADVANTAGE ], image: 'abilityA', results: {} },
    { values: [ SUCCESS, ADVANTAGE ], image: 'abilitySA', results: {} },
    { values: [ ADVANTAGE, ADVANTAGE ], image: 'abilityAA', results: {} }
  ],
  proficiency: [
    { values: [ BLANK ], image: 'proficiencyBlank', results: {} },
    { values: [ SUCCESS ], image: 'proficiencyS', results: {} },
    { values: [ SUCCESS ], image: 'proficiencyS', results: {} },
    { values: [ SUCCESS, SUCCESS ], image: 'proficiencySS', results: {} },
    { values: [ SUCCESS, SUCCESS ], image: 'proficiencySS', results: {} },
    { values: [ ADVANTAGE ], image: 'proficiencyA', results: {} },
    { values: [ SUCCESS, ADVANTAGE ], image: 'proficiencySA', results: {} },
    { values: [ SUCCESS, ADVANTAGE ], image: 'proficiencySA', results: {} },
    { values: [ SUCCESS, ADVANTAGE ], image: 'proficiencySA', results: {} },
    { values: [ ADVANTAGE, ADVANTAGE ], image: 'proficiencyAA', results: {} },
    { values: [ ADVANTAGE, ADVANTAGE ], image: 'proficiencyAA', results: {} },
    { values: [ TRIUMPH ], image: 'proficiencyTriumph', results: {} }
  ],
  setback: [
    { values: [ BLANK ], image: 'setbackBlank', results: {} },
    { values: [ BLANK ], image: 'setbackBlank', results: {} },
    { values: [ FAILURE ], image: 'setbackF', results: {} },
    { values: [ FAILURE ], image: 'setbackF', results: {} },
    { values: [ THREAT ], image: 'setbackT', results: {} },
    { values: [ THREAT ], image: 'setbackT', results: {} }
  ],
  difficulty: [
    { values: [ BLANK ], image: 'difficultyBlank', results: {} },
    { values: [ FAILURE ], image: 'difficultyF', results: {} },
    { values: [ FAILURE, FAILURE ], image: 'difficultyFF', results: {} },
    { values: [ THREAT ], image: 'difficultyT', results: {} },
    { values: [ THREAT ], image: 'difficultyT', results: {} },
    { values: [ THREAT ], image: 'difficultyT', results: {} },
    { values: [ THREAT, THREAT ], image: 'difficultyTT', results: {} },
    { values: [ FAILURE, THREAT ], image: 'difficultyFT', results: {} }
  ],
  challenge: [
    { values: [ BLANK ], image: 'challengeBlank', results: {} },
    { values: [ FAILURE ], image: 'challengeF', results: {} },
    { values: [ FAILURE ], image: 'challengeF', results: {} },
    { values: [ FAILURE, FAILURE ], image: 'challengeFF', results: {} },
    { values: [ FAILURE, FAILURE ], image: 'challengeFF', results: {} },
    { values: [ THREAT ], image: 'challengeT', results: {} },
    { values: [ THREAT ], image: 'challengeT', results: {} },
    { values: [ FAILURE, THREAT ], image: 'challengeFT', results: {} },
    { values: [ FAILURE, THREAT ], image: 'challengeFT', results: {} },
    { values: [ THREAT, THREAT ], image: 'challengeTT', results: {} },
    { values: [ THREAT, THREAT ], image: 'challengeTT', results: {} },
    { values: [ DESPAIR ], image: 'challengeDespair', results: {} }
  ],
  force: [
    { values: [ DARK ], image: 'forceD', results: {} },
    { values: [ DARK ], image: 'forceD', results: {} },
    { values: [ DARK ], image: 'forceD', results: {} },
    { values: [ DARK ], image: 'forceD', results: {} },
    { values: [ DARK ], image: 'forceD', results: {} },
    { values: [ DARK ], image: 'forceD', results: {} },
    { values: [ DARK, DARK ], image: 'forceDD', results: {} },
    { values: [ LIGHT ], image: 'forceL', results: {} },
    { values: [ LIGHT ], image: 'forceL', results: {} },
    { values: [ LIGHT, LIGHT ], image: 'forceLL', results: {} },
    { values: [ LIGHT, LIGHT ], image: 'forceLL', results: {} },
    { values: [ LIGHT, LIGHT ], image: 'forceLL', results: {} }
  ]
};

function generateResults() {
  var results;
  _.forEach(diceValues, function (die, dieName) {
    _.forEach(die, function (side, i) {
      results = {};
      _.forEach(side.values, function (values) {
        _.forEach(values, function (statValue, statName) {
          if (!results.hasOwnProperty(statName)) {
            results[ statName ] = statValue;
          } else {
            results[ statName ] += statValue;
          }
        });
      });
      diceValues[ dieName ][ i ].results = results;
    });
  });
}
generateResults();

export { diceValues, diceOrder, diceSymbols, diceSort, diceOpposites };
