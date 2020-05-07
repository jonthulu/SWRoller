import React from 'react';

import SixSidedDie from '../../../dice/SixSidedDie';
import SixSidedDieSide from '../../../dice/SixSidedDieSide';
import TenSidedDie from '../../../dice/TenSidedDie';
import {DieDisplay} from '../../../../diceSets/common/die';

type Props<SymbolType> = {
  display: DieDisplay;
}

/**
 * The DisplayComponent component.
 *
 * @param props
 * @param props.display - The die display.
 */
function DisplayComponent<SymbolType>({
  display
}: Props<SymbolType>): (React.ReactElement | null)
{
  const {componentName} = display;

  if (!componentName) {
    return null;
  }

  return (
    <>
      {(componentName === 'SixSidedDie') && (
        <SixSidedDie
          fill={display.fill}
          stroke={display.stroke}
          faceValue={display.text || 'd6'}
          valueStroke={display.valueStroke}
        />
      )}

      {(componentName === 'SixSidedDieSide') && (
        <SixSidedDieSide
          fill={display.fill}
          stroke={display.stroke}
          faceValue={display.text || 'd6'}
          valueStroke={display.valueStroke}
        />
      )}

      {(componentName === 'TenSidedDie') && (
        <TenSidedDie
          fill={display.fill}
          stroke={display.stroke}
          faceValue={display.text || 'd10'}
          valueStroke={display.valueStroke}
        />
      )}
    </>
  );
}

export default DisplayComponent;
