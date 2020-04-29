import {Die} from '../common/die';
import {DieSide} from '../common/dieSide';
import images from './swDiceImages';

export type SwSymbol = {
  imagePath: string;
  advantage?: number;
  blank?: number;
  dark?: number;
  light?: number;
  success?: number;
  triumph?: number;
}

const SUCCESS: SwSymbol = {
  success: 1,
  imagePath: images.S,
};

const ADVANTAGE: SwSymbol = {
  advantage: 1,
  imagePath: images.A,
};

const TRIUMPH: SwSymbol = {
  success: 1,
  triumph: 1,
  imagePath: images.Triumph,
};

const FAILURE: SwSymbol = {
  success: -1,
  imagePath: images.F,
};

const THREAT: SwSymbol = {
  advantage: -1,
  imagePath: images.T,
};

const DESPAIR: SwSymbol = {
  success: -1,
  triumph: -1,
  imagePath: images.Despair,
};

const DARK: SwSymbol = {
  dark: 1,
  imagePath: images.D,
};

const LIGHT: SwSymbol = {
  light: 1,
  imagePath: images.L,
};

const BLANK: SwSymbol = {
  blank: 1,
  imagePath: '',
};

export const diceSymbols: Record<string, SwSymbol> = {
  advantage: ADVANTAGE,
  blank:     BLANK,
  dark:      DARK,
  despair:   DESPAIR,
  failure:   FAILURE,
  light:     LIGHT,
  success:   SUCCESS,
  threat:    THREAT,
  triumph:   TRIUMPH,
};

export const diceOpposites: Record<string, string> = {
  advantage: 'threat',
  success:   'failure',
  triumph:   'despair',
};

export const diceOrder: Record<string, number> = {
  ability:     1,
  proficiency: 2,
  boost:       3,
  difficulty:  4,
  challenge:   5,
  setback:     6,
  force:       7,
};

export const diceSort = function diceSort(aDie: SwDie, bDie: SwDie): number
{
  if (diceOrder[aDie.name] < diceOrder[bDie.name]) {
    return -1;
  } else if (diceOrder[aDie.name] > diceOrder[bDie.name]) {
    return 1;
  }
  return 0;
};

export type SwDie = Die<SwSymbol>;
export type SwDieSide = DieSide<SwSymbol>;

export const SwBoostDie: SwDie = new Die<SwSymbol>('boost', images.boost, [
  new DieSide<SwSymbol>('Blank', images.boostBlank, [BLANK]),
  new DieSide<SwSymbol>('Blank', images.boostBlank, [BLANK]),
  new DieSide<SwSymbol>('Success', images.boostS, [SUCCESS]),
  new DieSide<SwSymbol>('SuccessAdvantage', images.boostSA, [SUCCESS, ADVANTAGE]),
  new DieSide<SwSymbol>('AdvantageAdvantage', images.boostAA, [ADVANTAGE, ADVANTAGE]),
  new DieSide<SwSymbol>('Advantage', images.boostA, [ADVANTAGE]),
]);

export const SwAbilityDie: SwDie = new Die<SwSymbol>('ability', images.ability, [
  new DieSide<SwSymbol>('Blank', images.abilityBlank, [BLANK]),
  new DieSide<SwSymbol>('Success', images.abilityS, [SUCCESS]),
  new DieSide<SwSymbol>('Success', images.abilityS, [SUCCESS]),
  new DieSide<SwSymbol>('SuccessSuccess', images.abilitySS, [SUCCESS, SUCCESS]),
  new DieSide<SwSymbol>('Advantage', images.abilityA, [ADVANTAGE]),
  new DieSide<SwSymbol>('Advantage', images.abilityA, [ADVANTAGE]),
  new DieSide<SwSymbol>('SuccessAdvantage', images.abilitySA, [SUCCESS, ADVANTAGE]),
  new DieSide<SwSymbol>('AdvantageAdvantage', images.abilityAA, [ADVANTAGE, ADVANTAGE]),
]);

export const SwProficiencyDie: SwDie = new Die<SwSymbol>('proficiency', images.proficiency, [
  new DieSide<SwSymbol>('Blank', images.proficiencyBlank, [BLANK]),
  new DieSide<SwSymbol>('Success', images.proficiencyS, [SUCCESS]),
  new DieSide<SwSymbol>('Success', images.proficiencyS, [SUCCESS]),
  new DieSide<SwSymbol>('SuccessSuccess', images.proficiencySS, [SUCCESS, SUCCESS]),
  new DieSide<SwSymbol>('SuccessSuccess', images.proficiencySS, [SUCCESS, SUCCESS]),
  new DieSide<SwSymbol>('Advantage', images.proficiencyA, [ADVANTAGE]),
  new DieSide<SwSymbol>('SuccessAdvantage', images.proficiencySA, [SUCCESS, ADVANTAGE]),
  new DieSide<SwSymbol>('SuccessAdvantage', images.proficiencySA, [SUCCESS, ADVANTAGE]),
  new DieSide<SwSymbol>('SuccessAdvantage', images.proficiencySA, [SUCCESS, ADVANTAGE]),
  new DieSide<SwSymbol>('AdvantageAdvantage', images.proficiencyAA, [ADVANTAGE, ADVANTAGE]),
  new DieSide<SwSymbol>('AdvantageAdvantage', images.proficiencyAA, [ADVANTAGE, ADVANTAGE]),
  new DieSide<SwSymbol>('Triumph', images.proficiencyTriumph, [TRIUMPH]),
]);

export const SwSetbackDie: SwDie = new Die<SwSymbol>('setback', images.setback, [
  new DieSide<SwSymbol>('Blank', images.setbackBlank, [BLANK]),
  new DieSide<SwSymbol>('Blank', images.setbackBlank, [BLANK]),
  new DieSide<SwSymbol>('Failure', images.setbackF, [FAILURE]),
  new DieSide<SwSymbol>('Failure', images.setbackF, [FAILURE]),
  new DieSide<SwSymbol>('Threat', images.setbackT, [THREAT]),
  new DieSide<SwSymbol>('Threat', images.setbackT, [THREAT]),
]);

export const SwDifficultyDie: SwDie = new Die<SwSymbol>('difficulty', images.difficulty, [
  new DieSide<SwSymbol>('Blank', images.difficultyBlank, [BLANK]),
  new DieSide<SwSymbol>('Failure', images.difficultyF, [FAILURE]),
  new DieSide<SwSymbol>('FailureFailure', images.difficultyFF, [FAILURE, FAILURE]),
  new DieSide<SwSymbol>('Threat', images.difficultyT, [THREAT]),
  new DieSide<SwSymbol>('Threat', images.difficultyT, [THREAT]),
  new DieSide<SwSymbol>('Threat', images.difficultyT, [THREAT]),
  new DieSide<SwSymbol>('ThreatThreat', images.difficultyTT, [THREAT, THREAT]),
  new DieSide<SwSymbol>('FailureThreat', images.difficultyFT, [FAILURE, THREAT]),
]);

export const SwChallengeDie: SwDie = new Die<SwSymbol>('challenge', images.challenge, [
  new DieSide<SwSymbol>('Blank', images.challengeBlank, [BLANK]),
  new DieSide<SwSymbol>('Failure', images.challengeF, [FAILURE]),
  new DieSide<SwSymbol>('Failure', images.challengeF, [FAILURE]),
  new DieSide<SwSymbol>('FailureFailure', images.challengeFF, [FAILURE, FAILURE]),
  new DieSide<SwSymbol>('FailureFailure', images.challengeFF, [FAILURE, FAILURE]),
  new DieSide<SwSymbol>('Threat', images.challengeT, [THREAT]),
  new DieSide<SwSymbol>('Threat', images.challengeT, [THREAT]),
  new DieSide<SwSymbol>('FailureThreat', images.challengeFT, [FAILURE, THREAT]),
  new DieSide<SwSymbol>('FailureThreat', images.challengeFT, [FAILURE, THREAT]),
  new DieSide<SwSymbol>('ThreatThreat', images.challengeTT, [THREAT, THREAT]),
  new DieSide<SwSymbol>('ThreatThreat', images.challengeTT, [THREAT, THREAT]),
  new DieSide<SwSymbol>('Despair', images.challengeDespair, [DESPAIR]),
]);

export const SwForceDie: SwDie = new Die<SwSymbol>('force', images.force, [
  new DieSide<SwSymbol>('Dark', images.forceD, [DARK]),
  new DieSide<SwSymbol>('Dark', images.forceD, [DARK]),
  new DieSide<SwSymbol>('Dark', images.forceD, [DARK]),
  new DieSide<SwSymbol>('Dark', images.forceD, [DARK]),
  new DieSide<SwSymbol>('Dark', images.forceD, [DARK]),
  new DieSide<SwSymbol>('Dark', images.forceD, [DARK]),
  new DieSide<SwSymbol>('DarkDark', images.forceDD, [DARK, DARK]),
  new DieSide<SwSymbol>('Light', images.forceL, [LIGHT]),
  new DieSide<SwSymbol>('Light', images.forceL, [LIGHT]),
  new DieSide<SwSymbol>('LightLight', images.forceLL, [LIGHT, LIGHT]),
  new DieSide<SwSymbol>('LightLight', images.forceLL, [LIGHT, LIGHT]),
  new DieSide<SwSymbol>('LightLight', images.forceLL, [LIGHT, LIGHT]),
]);

export const dice: Record<string, SwDie> = {
  boost:       SwBoostDie,
  ability:     SwAbilityDie,
  proficiency: SwProficiencyDie,
  setback:     SwSetbackDie,
  difficulty:  SwDifficultyDie,
  challenge:   SwChallengeDie,
  force:       SwForceDie,
};
