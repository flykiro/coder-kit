

import React, { PureComponent } from 'react'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import style from './style.less'
import { chunk } from 'lodash'


enum CssColorTypes {
  RGB = 'RGB',
  RGBA = 'RGBA',
  HSL = 'HSL',
  HSLA = 'HSLA',
  HEX = 'HEX',
}

const ColorRegExps = {
  [CssColorTypes.RGB]: /rgb\((\s*\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/img,
  [CssColorTypes.RGBA]: /rgba\((\s*\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3}),\s*([\d.]+)\s*\)/img,
  [CssColorTypes.HEX]: /#([0-9a-f]{3}|[0-9a-f]{6})([^0-9a-f]|$)/img,
}

const cssColorTypesText = {
  [CssColorTypes.HEX]: '十六进制',
  [CssColorTypes.RGB]: 'rgb',
  [CssColorTypes.RGBA]: 'rgba',
  [CssColorTypes.HSL]: 'hsl',
  [CssColorTypes.HSLA]: 'hsla',
}

interface IProps {
}

function getHEXString (colors: number[], alpha = 1) {
  return `#${colors.map((color) => Math.round(255 * (1 - alpha) + color * alpha).toString(16).padStart(2, '0')).join('')}`
}

function getRGBAString (colors: number[], alpha = 1, withAlpha = false) {
  return `rgb${withAlpha ? 'a' : ''}( ${colors.map((color) => Math.round(255 * (1 - alpha) + color * alpha)).concat(withAlpha ? alpha : []).join(', ')} )`
}

function convertColor (conversionType: CssColorTypes, colors: number[], alpha: number = 1, withAlpha: boolean = false) {
  const { HEX, RGB, RGBA } = CssColorTypes

  if (conversionType === HEX) {
    return getHEXString(colors, alpha)
  } else if (conversionType === RGB) {
    return getRGBAString(colors, alpha)
  } else if (conversionType === RGBA) {
    return getRGBAString(colors, alpha, true)
  }
}

type IState = {
  input: string;
  conversionType: CssColorTypes;
  output?: string;
}

export default class CSSColorConverter extends PureComponent<IProps, IState> {
  static defaultProps: IProps = {
  }

  state: IState = {
    input: '',
    output: '',
    conversionType: CssColorTypes.HEX,
  }

  setInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.transform({ input: event.currentTarget.value })
  }

  setConversionType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.transform({ conversionType: (event.target.value as CssColorTypes) })
  }

  transform = ({ input = this.state.input, conversionType = this.state.conversionType }: { input?: string; conversionType?: CssColorTypes }) => {

    const output = input
    .replace(ColorRegExps[CssColorTypes.RGB], ( match: string, ...args ) => {
      const colors = args.slice(0, 3).map(color => Number.parseInt(color))

      if ( colors.every(color => color >= 0 && color < 256) ) {
        return convertColor(conversionType, colors)
      }
      return match
    })
    .replace(ColorRegExps[CssColorTypes.RGBA], ( match: string, ...args ) => {
      const [colors, [alpha]] = chunk(args.map(color => Number.parseInt(color)), 3)

      if (colors.every(color => color >= 0 && color < 256) && alpha >= 0 && alpha <= 1) {
        return convertColor(conversionType, colors, alpha)
      }
      return match
    })
    .replace(ColorRegExps[CssColorTypes.HEX], ( match: string, p1: string ) => {
      const colors = (
        p1.length === 6
        ? p1.split(/(\w{2})/).filter(hex => hex)
        : p1.split('').map(hex => hex.repeat(2))
      ).map(color => Number.parseInt(color, 16))

      return convertColor(conversionType, colors)
    })

    this.setState({ input, output, conversionType })
  }

  render () {
    const { input, conversionType, output } = this.state

    return <div className={style.cssColorConverter}>
      <TextField
        multiline
        fullWidth
        label="请输入需要转换的样式"
        variant="filled"
        value={input}
        onChange={this.setInput}
      />
        <Select
          fullWidth
          value={conversionType}
          onChange={this.setConversionType}
          style={{ margin: '10px 0' }}
        >
          {
            Object.entries(cssColorTypesText).map(([key, value]) => <MenuItem key={key} value={key}>
              转换成{value}
            </MenuItem>)
          }
        </Select>
      <TextField
        multiline
        fullWidth
        label="转换结果"
        variant="outlined"
        value={output}
      />
    </div>
  }
}