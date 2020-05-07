import {clone} from 'lodash';
import {v4 as uuid} from 'uuid';

import {DieSide} from './dieSide';

export type DieDisplay = {
  imagePath?: string;
  componentName?: string;
  fill?: string;
  stroke?: string;
  text?: string;
  valueStroke?: string;
}

export class Die<SymbolType>
{
  /**
   * A unique id for the die.
   */
  id: string;

  /**
   * The name of the die.
   */
  name: string;

  /**
   * The path to the image of the die.
   */
  display: DieDisplay;

  /**
   * The sides of the die.
   */
  sides: DieSide<SymbolType>[];

  /**
   * Extra data that can be stored about the die.
   */
  otherData?: object;

  constructor(dieName: string, display: DieDisplay, sides: DieSide<SymbolType>[], otherData?: object)
  {
    this.id = uuid();
    this.name = dieName;
    this.display = display;
    this.sides = sides;
    this.otherData = otherData;
  }

  /**
   * Clones a new copy of the die.
   */
  clone(): Die<SymbolType>
  {
    const copy = clone(this);
    copy.id = uuid();

    return copy;
  }
}
