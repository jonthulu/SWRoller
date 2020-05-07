import React, {useEffect, useState} from 'react';
import ReactSelect from 'react-select';

import SrSchemaRoller from '../srSchemaRoller/SrSchemaRoller';
import SwRoller from '../swRoller/SwRoller';
import swBgImage from '../../../assets/images/bg/sw-roller-bg.png';
import srSchemaBgImage from '../../../assets/images/bg/sr-schema-roller-bg.jpg';

import './dieSetSelector.scss';

type SetData = {
  label: string;
  Component: React.FC | null;
  bgImage: string;
}

const possibleSets: SetData[] = [
  {label: 'None', Component: null, bgImage: ''},
  {label: 'SW Die', Component: SwRoller, bgImage: swBgImage},
  {label: 'SR Schema', Component: SrSchemaRoller, bgImage: srSchemaBgImage},
];

type Props<SymbolType, StatsType> = {
  updateBackground: (newBgImageUrl: string) => void;
}

/**
 * The DieSetSelector component.
 */
function DieSetSelector<SymbolType, StatsType>({
  updateBackground
}: Props<SymbolType, StatsType>): React.ReactElement
{
  const [activeSet, setActiveSet] = useState(possibleSets[0]);

  const RollerComponent = activeSet.Component;

  useEffect(() => {
    if (activeSet) {
      updateBackground(activeSet.bgImage);
    }
  }, [activeSet, updateBackground]);

  return (
    <div className="die-set-selector">
      <div className="instructions">Dice Set</div>

      <ReactSelect
        classNamePrefix="react-select"
        placeholder="Select the dice set..."
        options={possibleSets}
        onChange={(value): void => setActiveSet(value as SetData)}
      />

      <div className="die-set-display">
        {(RollerComponent) && (
          <RollerComponent />
        )}
      </div>
    </div>
  );
}

export default DieSetSelector;
