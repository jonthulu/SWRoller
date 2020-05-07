import React from 'react';

type Props = {
  faceValue?: string;
  fill?: string;
  stroke?: string;
  valueStroke?: string;
}

/**
 * The TenSidedDie component.
 *
 * @param props
 * @param [props.faceValue] - The die face value.
 * @param [props.fill] - The die interior color.
 * @param [props.stroke] - The die line color.
 * @param [props.valueStroke] - The color for face values.
 */
function TenSidedDie({
  faceValue,
  fill,
  stroke,
  valueStroke,
}: Props): React.ReactElement
{
  const safeFill = fill || 'white';
  const safeStroke = stroke || 'black';

  return (
    <svg className="ten-sided-die show-die" viewBox="0 0 202 206" xmlns="http://www.w3.org/2000/svg">
      <path
        fill={safeFill}
        stroke={safeStroke}
        strokeWidth="3"
        strokeLinejoin="round"
        d="
          M100,2 L2,100 52,94 Z
          L52,94 100,116 148,94 Z
          L198,100 148,94 Z
          M2,100 L100,198 100,116 52,94 Z
          M100,198 L198,100 148,94 100,116 Z
        "
      />

      {(faceValue) && (
        <text
          x="83"
          y="178"
          stroke={valueStroke || safeStroke}
          fill={valueStroke || safeStroke}
        >{faceValue}</text>
      )}
    </svg>
  );
}

export default TenSidedDie;
