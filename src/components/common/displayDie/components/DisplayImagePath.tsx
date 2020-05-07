import React from 'react';

import {DieDisplay} from '../../../../diceSets/common/die';

type Props<SymbolType> = {
  display: DieDisplay;
}

/**
 * The DisplayImagePath component.
 *
 * @param props
 * @param props.display - The die display.
 */
function DisplayImagePath<SymbolType>({
  display
}: Props<SymbolType>): (React.ReactElement | null)
{
  if (!display.imagePath) {
    return null;
  }

  return (
    <img
      className="display-image-path die-image"
      src={display.imagePath}
      alt={display.text || 'Die'}
    />
  );
}

export default DisplayImagePath;
