import { dispatch } from 'd3'
import { css } from 'pretty-lights'
import { FC, ReactEventHandler } from 'react'
import {
  blue,
  green,
  white,
  colors,
  deepGrey,
} from '../../../shared/tokens/colors'
import { pxToRem } from '../../../shared/tokens/spacing'
import { MiniBubbleSVG } from '../../Bubble'
import { FormatAction } from '../../data/dataFormattingReducer'

const gridContainerClass = css`
  display: grid;
  grid-template-columns: repeat(6, max-content);
  grid-gap: ${pxToRem(2)};
`

const colorGridOptions = [
  Object.values(colors)
    .map((d) => d.default)
    .slice(1, 7),
  ...Object.values(colors).map((d) => d.gradient),
]

const ColorGrid: FC<{
  generateOnClick: (s: string, t: string) => ReactEventHandler
}> = ({ generateOnClick }) => {
  return (
    <div className={gridContainerClass}>
      {colorGridOptions.map((colorList) => {
        return colorList.map((color, index) => {
          const textColor = index < 3 ? deepGrey : 'white'
          return (
            <MiniBubbleSVG
              key={color}
              fillColor={color}
              height={38}
              textColor={textColor}
              onClick={generateOnClick(color, textColor)}
            />
          )
        })
      })}
    </div>
  )
}

export default ColorGrid
