import lodash from 'lodash';

import {Die, DieDisplay} from '../common/die';
import {DieSide} from '../common/dieSide';
import {DieSymbolDisplay} from '../common/dieSymbol';

const toC = (componentName: string, text: string, colors: string[]): DieDisplay => {
  return {componentName, text, fill: colors[0], stroke: colors[1], valueStroke: colors[2]};
};
const toT = (text: string): DieDisplay => {
  return {text};
};

export type SrSchemaSymbol = {
  display: DieSymbolDisplay;
  value: number;
}

const ONE: SrSchemaSymbol = {
  value: 1,
  display: toT('1'),
};

const TWO: SrSchemaSymbol = {
  value: 2,
  display: toT('2'),
};

const THREE: SrSchemaSymbol = {
  value: 3,
  display: toT('3'),
};

const FOUR: SrSchemaSymbol = {
  value: 4,
  display: toT('4'),
};

const FIVE: SrSchemaSymbol = {
  value: 5,
  display: toT('5'),
};

const SIX: SrSchemaSymbol = {
  value: 6,
  display: toT('6'),
};

export const diceSymbols: Record<string, SrSchemaSymbol> = {
  one: ONE,
  two: TWO,
  three: THREE,
  four: FOUR,
  five: FIVE,
  six: SIX,
};

export const diceOrder: Record<string, number> = {
  detriment: 1,
  base: 2,
  benefit: 3,
};

export const diceSort = function diceSort(aDie: SrSchemaDie, bDie: SrSchemaDie): number
{
  if (diceOrder[aDie.name] < diceOrder[bDie.name]) {
    return -1;
  } else if (diceOrder[aDie.name] > diceOrder[bDie.name]) {
    return 1;
  }
  return 0;
};

export type SrSchemaDie = Die<SrSchemaSymbol>;
export type SrSchemaDieSide = DieSide<SrSchemaSymbol>;

const baseColors = ['#ffffff', '#333333', '#706c61'];
const baseDisplay = lodash.partial(toC, 'SixSidedDieSide', lodash, baseColors);

const detrimentColors = ['#900c3f', '#511845', '#ff5733'];
const detrimentDisplay = lodash.partial(toC, 'SixSidedDieSide', lodash, detrimentColors);

const benefitColors = ['#00909e', '#27496d', '#142850'];
const benefitDisplay = lodash.partial(toC, 'SixSidedDieSide', lodash, benefitColors);

export const SrSchemaBaseDie: SrSchemaDie = new Die<SrSchemaSymbol>(
  'base',
  toC('SixSidedDie', ' ', baseColors),
  [
    new DieSide<SrSchemaSymbol>('one', baseDisplay('1'), [ONE]),
    new DieSide<SrSchemaSymbol>('two', baseDisplay('2'), [TWO]),
    new DieSide<SrSchemaSymbol>('three', baseDisplay('3'), [THREE]),
    new DieSide<SrSchemaSymbol>('four', baseDisplay('4'), [FOUR]),
    new DieSide<SrSchemaSymbol>('five', baseDisplay('5'), [FIVE]),
    new DieSide<SrSchemaSymbol>('six', baseDisplay('6'), [SIX]),
  ]
);

export const SrSchemaDetrimentDie: SrSchemaDie = new Die<SrSchemaSymbol>(
  'detriment',
  toC('SixSidedDie', '-', detrimentColors),
  [
    new DieSide<SrSchemaSymbol>('one', detrimentDisplay('1'), [ONE]),
    new DieSide<SrSchemaSymbol>('two', detrimentDisplay('2'), [TWO]),
    new DieSide<SrSchemaSymbol>('three', detrimentDisplay('3'), [THREE]),
    new DieSide<SrSchemaSymbol>('four', detrimentDisplay('4'), [FOUR]),
    new DieSide<SrSchemaSymbol>('five', detrimentDisplay('5'), [FIVE]),
    new DieSide<SrSchemaSymbol>('six', detrimentDisplay('6'), [SIX]),
  ]
);

export const SrSchemaBenefitDie: SrSchemaDie = new Die<SrSchemaSymbol>(
  'benefit',
  toC('SixSidedDie', '+', benefitColors),
  [
    new DieSide<SrSchemaSymbol>('one', benefitDisplay('1'), [ONE]),
    new DieSide<SrSchemaSymbol>('two', benefitDisplay('2'), [TWO]),
    new DieSide<SrSchemaSymbol>('three', benefitDisplay('3'), [THREE]),
    new DieSide<SrSchemaSymbol>('four', benefitDisplay('4'), [FOUR]),
    new DieSide<SrSchemaSymbol>('five', benefitDisplay('5'), [FIVE]),
    new DieSide<SrSchemaSymbol>('six', benefitDisplay('6'), [SIX]),
  ]
);

export const dice: Record<string, SrSchemaDie> = {
  detriment: SrSchemaDetrimentDie,
  base: SrSchemaBaseDie,
  benefit: SrSchemaBenefitDie,
};
