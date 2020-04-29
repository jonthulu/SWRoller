import {v4 as uuid} from 'uuid';

import {DieSide} from './dieSide';

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
  imagePath: string;

  /**
   * The sides of the die.
   */
  sides: DieSide<SymbolType>[];

  constructor(dieName: string, imagePath: string, sides: DieSide<SymbolType>[])
  {
    this.id = uuid();
    this.name = dieName;
    this.imagePath = imagePath;
    this.sides = sides;
  }
}
