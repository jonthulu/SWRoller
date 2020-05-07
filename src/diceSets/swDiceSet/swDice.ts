import {Die} from '../common/die';
import {DieSide} from '../common/dieSide';
import {DieSymbolDisplay} from '../common/dieSymbol';
import images from './swDiceImages';

const toI = (imagePath: string): {imagePath: string} => {
  return {imagePath};
};

export type SwSymbol = {
  display: DieSymbolDisplay;
  advantage?: number;
  blank?: number;
  dark?: number;
  light?: number;
  success?: number;
  triumph?: number;
}

const SUCCESS: SwSymbol = {
  success: 1,
  display: toI(images.S),
};

const ADVANTAGE: SwSymbol = {
  advantage: 1,
  display: toI(images.A),
};

const TRIUMPH: SwSymbol = {
  success: 1,
  triumph: 1,
  display: toI(images.Triumph),
};

const FAILURE: SwSymbol = {
  success: -1,
  display: toI(images.F),
};

const THREAT: SwSymbol = {
  advantage: -1,
  display: toI(images.T),
};

const DESPAIR: SwSymbol = {
  success: -1,
  triumph: -1,
  display: toI(images.Despair),
};

const DARK: SwSymbol = {
  dark: 1,
  display: toI(images.D),
};

const LIGHT: SwSymbol = {
  light: 1,
  display: toI(images.L),
};

const BLANK: SwSymbol = {
  blank: 1,
  display: toI(''),
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

export const SwBoostDie: SwDie = new Die<SwSymbol>('boost', toI(images.boost), [
  new DieSide<SwSymbol>('Blank', toI(images.boostBlank), [BLANK]),
  new DieSide<SwSymbol>('Blank', toI(images.boostBlank), [BLANK]),
  new DieSide<SwSymbol>('Success', toI(images.boostS), [SUCCESS]),
  new DieSide<SwSymbol>('SuccessAdvantage', toI(images.boostSA), [SUCCESS, ADVANTAGE]),
  new DieSide<SwSymbol>('AdvantageAdvantage', toI(images.boostAA), [ADVANTAGE, ADVANTAGE]),
  new DieSide<SwSymbol>('Advantage', toI(images.boostA), [ADVANTAGE]),
]);

export const SwAbilityDie: SwDie = new Die<SwSymbol>('ability', toI(images.ability), [
  new DieSide<SwSymbol>('Blank', toI(images.abilityBlank), [BLANK]),
  new DieSide<SwSymbol>('Success', toI(images.abilityS), [SUCCESS]),
  new DieSide<SwSymbol>('Success', toI(images.abilityS), [SUCCESS]),
  new DieSide<SwSymbol>('SuccessSuccess', toI(images.abilitySS), [SUCCESS, SUCCESS]),
  new DieSide<SwSymbol>('Advantage', toI(images.abilityA), [ADVANTAGE]),
  new DieSide<SwSymbol>('Advantage', toI(images.abilityA), [ADVANTAGE]),
  new DieSide<SwSymbol>('SuccessAdvantage', toI(images.abilitySA), [SUCCESS, ADVANTAGE]),
  new DieSide<SwSymbol>('AdvantageAdvantage', toI(images.abilityAA), [ADVANTAGE, ADVANTAGE]),
]);

export const SwProficiencyDie: SwDie = new Die<SwSymbol>('proficiency', toI(images.proficiency), [
  new DieSide<SwSymbol>('Blank', toI(images.proficiencyBlank), [BLANK]),
  new DieSide<SwSymbol>('Success', toI(images.proficiencyS), [SUCCESS]),
  new DieSide<SwSymbol>('Success', toI(images.proficiencyS), [SUCCESS]),
  new DieSide<SwSymbol>('SuccessSuccess', toI(images.proficiencySS), [SUCCESS, SUCCESS]),
  new DieSide<SwSymbol>('SuccessSuccess', toI(images.proficiencySS), [SUCCESS, SUCCESS]),
  new DieSide<SwSymbol>('Advantage', toI(images.proficiencyA), [ADVANTAGE]),
  new DieSide<SwSymbol>('SuccessAdvantage', toI(images.proficiencySA), [SUCCESS, ADVANTAGE]),
  new DieSide<SwSymbol>('SuccessAdvantage', toI(images.proficiencySA), [SUCCESS, ADVANTAGE]),
  new DieSide<SwSymbol>('SuccessAdvantage', toI(images.proficiencySA), [SUCCESS, ADVANTAGE]),
  new DieSide<SwSymbol>('AdvantageAdvantage', toI(images.proficiencyAA), [ADVANTAGE, ADVANTAGE]),
  new DieSide<SwSymbol>('AdvantageAdvantage', toI(images.proficiencyAA), [ADVANTAGE, ADVANTAGE]),
  new DieSide<SwSymbol>('Triumph', toI(images.proficiencyTriumph), [TRIUMPH]),
]);

export const SwSetbackDie: SwDie = new Die<SwSymbol>('setback', toI(images.setback), [
  new DieSide<SwSymbol>('Blank', toI(images.setbackBlank), [BLANK]),
  new DieSide<SwSymbol>('Blank', toI(images.setbackBlank), [BLANK]),
  new DieSide<SwSymbol>('Failure', toI(images.setbackF), [FAILURE]),
  new DieSide<SwSymbol>('Failure', toI(images.setbackF), [FAILURE]),
  new DieSide<SwSymbol>('Threat', toI(images.setbackT), [THREAT]),
  new DieSide<SwSymbol>('Threat', toI(images.setbackT), [THREAT]),
]);

export const SwDifficultyDie: SwDie = new Die<SwSymbol>('difficulty', toI(images.difficulty), [
  new DieSide<SwSymbol>('Blank', toI(images.difficultyBlank), [BLANK]),
  new DieSide<SwSymbol>('Failure', toI(images.difficultyF), [FAILURE]),
  new DieSide<SwSymbol>('FailureFailure', toI(images.difficultyFF), [FAILURE, FAILURE]),
  new DieSide<SwSymbol>('Threat', toI(images.difficultyT), [THREAT]),
  new DieSide<SwSymbol>('Threat', toI(images.difficultyT), [THREAT]),
  new DieSide<SwSymbol>('Threat', toI(images.difficultyT), [THREAT]),
  new DieSide<SwSymbol>('ThreatThreat', toI(images.difficultyTT), [THREAT, THREAT]),
  new DieSide<SwSymbol>('FailureThreat', toI(images.difficultyFT), [FAILURE, THREAT]),
]);

export const SwChallengeDie: SwDie = new Die<SwSymbol>('challenge', toI(images.challenge), [
  new DieSide<SwSymbol>('Blank', toI(images.challengeBlank), [BLANK]),
  new DieSide<SwSymbol>('Failure', toI(images.challengeF), [FAILURE]),
  new DieSide<SwSymbol>('Failure', toI(images.challengeF), [FAILURE]),
  new DieSide<SwSymbol>('FailureFailure', toI(images.challengeFF), [FAILURE, FAILURE]),
  new DieSide<SwSymbol>('FailureFailure', toI(images.challengeFF), [FAILURE, FAILURE]),
  new DieSide<SwSymbol>('Threat', toI(images.challengeT), [THREAT]),
  new DieSide<SwSymbol>('Threat', toI(images.challengeT), [THREAT]),
  new DieSide<SwSymbol>('FailureThreat', toI(images.challengeFT), [FAILURE, THREAT]),
  new DieSide<SwSymbol>('FailureThreat', toI(images.challengeFT), [FAILURE, THREAT]),
  new DieSide<SwSymbol>('ThreatThreat', toI(images.challengeTT), [THREAT, THREAT]),
  new DieSide<SwSymbol>('ThreatThreat', toI(images.challengeTT), [THREAT, THREAT]),
  new DieSide<SwSymbol>('Despair', toI(images.challengeDespair), [DESPAIR]),
]);

export const SwForceDie: SwDie = new Die<SwSymbol>('force', toI(images.force), [
  new DieSide<SwSymbol>('Dark', toI(images.forceD), [DARK]),
  new DieSide<SwSymbol>('Dark', toI(images.forceD), [DARK]),
  new DieSide<SwSymbol>('Dark', toI(images.forceD), [DARK]),
  new DieSide<SwSymbol>('Dark', toI(images.forceD), [DARK]),
  new DieSide<SwSymbol>('Dark', toI(images.forceD), [DARK]),
  new DieSide<SwSymbol>('Dark', toI(images.forceD), [DARK]),
  new DieSide<SwSymbol>('DarkDark', toI(images.forceDD), [DARK, DARK]),
  new DieSide<SwSymbol>('Light', toI(images.forceL), [LIGHT]),
  new DieSide<SwSymbol>('Light', toI(images.forceL), [LIGHT]),
  new DieSide<SwSymbol>('LightLight', toI(images.forceLL), [LIGHT, LIGHT]),
  new DieSide<SwSymbol>('LightLight', toI(images.forceLL), [LIGHT, LIGHT]),
  new DieSide<SwSymbol>('LightLight', toI(images.forceLL), [LIGHT, LIGHT]),
]);

export const dice: Record<string, SwDie> = {
  ability:     SwAbilityDie,
  proficiency: SwProficiencyDie,
  boost:       SwBoostDie,
  difficulty:  SwDifficultyDie,
  challenge:   SwChallengeDie,
  setback:     SwSetbackDie,
  force:       SwForceDie,
};
