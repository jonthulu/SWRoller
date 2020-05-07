import React from 'react';

type Props = {
  faceValue?: string;
  fill?: string;
  stroke?: string;
  valueStroke?: string;
}

/**
 * The SixSidedDice component.
 *
 * @param props
 * @param [props.faceValue] - The number to display on the die face.
 * @param [props.fill] - The die interior color.
 * @param [props.stroke] - The die line color.
 * @param [props.valueStroke] - The color for face values.
 */
function SixSidedDice({
  faceValue,
  fill,
  stroke,
  valueStroke,
}: Props): React.ReactElement
{
  const safeFill = fill || 'white';
  const safeStroke = stroke || 'black';

  return (
    <svg className="six-sided-die-side show-die-side" viewBox="0 0 255 255" xmlns="http://www.w3.org/2000/svg">
      <path
        fill={safeFill}
        stroke={safeStroke}
        strokeWidth="8"
        strokeLinejoin="round"
        d="M2,2 v251 h251 v-251 Z"
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

export default SixSidedDice;
