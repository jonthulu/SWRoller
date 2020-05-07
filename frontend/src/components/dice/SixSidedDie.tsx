import React from 'react';

type Props = {
  faceValue?: string;
  fill?: string;
  stroke?: string;
  valueStroke?: string;
}

/**
 * The SixSidedDie component.
 *
 * @param props
 * @param [props.faceValue] - The die face value.
 * @param [props.fill] - The die interior color.
 * @param [props.stroke] - The die line color.
 * @param [props.valueStroke] - The color for face values.
 */
function SixSidedDie({
  faceValue,
  fill,
  stroke,
  valueStroke,
}: Props): React.ReactElement
{
  const safeFill = fill || 'white';
  const safeStroke = stroke || 'black';

  return (
    <svg className="six-sided-die show-die" viewBox="0 0 254 255" xmlns="http://www.w3.org/2000/svg">
      <path
        fill={safeFill}
        stroke={safeStroke}
        strokeWidth="8"
        strokeLinejoin="round"
        d="
          M6,48 L6,250 207,250 207,48 Z
          L58,5 249,5 207,48 Z
          M207,48 L249,5 249,198 207,250 Z
        "
      />

      {(faceValue) && (
        <text
          x="60"
          y="200"
          stroke={valueStroke || safeStroke}
          fill={valueStroke || safeStroke}
        >{faceValue}</text>
      )}
    </svg>
  );
}

export default SixSidedDie;
