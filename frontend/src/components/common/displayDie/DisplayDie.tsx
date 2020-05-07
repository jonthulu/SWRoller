import React from 'react';

import DisplayComponent from './components/DisplayComponent';
import DisplayImagePath from './components/DisplayImagePath';
import {DieDisplay} from '../../../diceSets/common/die';

import './displayDie.scss';

type Props<SymbolType> = {
  display: DieDisplay;
  onClick?: () => void;
}

/**
 * The DisplayDie component.
 *
 * @param props
 * @param props.display - The die display.
 * @param [props.onClick] - The function to run when the die is clicked.
 */
function DisplayDie<SymbolType>({
  display,
  onClick
}: Props<SymbolType>): React.ReactElement
{
  const {imagePath, componentName, text} = display;

  return (
    <div className="display-die">
      <a onClick={(): void => onClick && onClick()}>
        {(imagePath) && (
          <DisplayImagePath display={display} />
        )}

        {(!imagePath && componentName) && (
          <DisplayComponent display={display} />
        )}

        {(!imagePath && !componentName && text) && (
          <div className="display-die-text">{text}</div>
        )}
      </a>
    </div>
  );
}

export default DisplayDie;
