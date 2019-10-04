

import React, { PureComponent } from 'react'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import style from './style.less'
import { chunk, head, drop, dropRight, last } from 'lodash'
import FileCopy from '@material-ui/icons/FileCopy';
import * as copy from 'copy-to-clipboard';
import { withSnackbar, useSnackbar, WithSnackbarProps } from 'notistack';

import { CssColorTypes, convertColor, convertHSLToRGB } from '../../utils/convertColor'

const ColorRegExps = {
  [CssColorTypes.RGB]: /rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/img,
  [CssColorTypes.RGBA]: /rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*([\d.]+)\s*\)/img,
  [CssColorTypes.HEX]: /#([0-9a-f]{3}|[0-9a-f]{6})([^0-9a-f]|$)/img,
  [CssColorTypes.HSL]: /hsl\(\s*([\d.]+)\s*,\s*([\d.]+)\%\s*,\s*([\d.]+)\%\s*\)/img,
  [CssColorTypes.HSLA]: /hsla\(\s*([\d.]+)\s*,\s*([\d.]+)\%\s*,\s*([\d.]+)\%\s*,\s*([\d.]+)\s*\)/img
}

const cssColorTypesText = {
  [CssColorTypes.HEX]: '十六进制',
  [CssColorTypes.RGB]: 'rgb',
  [CssColorTypes.RGBA]: 'rgba',
  [CssColorTypes.HSL]: 'hsl',
  [CssColorTypes.HSLA]: 'hsla',
}


interface IProps extends WithSnackbarProps{
}

type IState = {
  input: string;
  conversionType: CssColorTypes;
  output?: string;
}

class CSSColorConverter extends PureComponent<IProps, IState> {

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
      const colors = args.slice(0, 3).map(color => Number.parseInt(color))
      const alpha = Number.parseFloat(args[3])

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
    .replace(ColorRegExps[CssColorTypes.HSL], ( match: string, ...args: any[] ) => {
      const hsl = args.slice(0, 3).map(color => Number.parseFloat(color))

      if (
        conversionType !== CssColorTypes.HSL
        && head(hsl) >= 0
        && head(hsl) <= 360
        && drop(hsl).every(color => color >= 0 && color <= 100)
      ) {
        const colors = convertHSLToRGB(hsl)

        return convertColor(conversionType, colors)
      }

      return match
    })
    .replace(ColorRegExps[CssColorTypes.HSLA], ( match: string, ...args: any[] ) => {
      console.log(args)
      const hsla = args.slice(0, 4).map(color => Number.parseFloat(color))
      const hsl = dropRight(hsla)
      const alpha = last(hsla)

      if (
        conversionType !== CssColorTypes.HSLA
        && head(hsl) >= 0
        && head(hsl) <= 360
        && alpha >= 0
        && alpha <= 1
        && drop(hsl).every(color => color >= 0 && color <= 100)
      ) {
        const colors = convertHSLToRGB(hsl)

        return convertColor(conversionType, colors, alpha)
      }

      return match
    })

    this.setState({ input, output, conversionType })
  }

  onTapCopy = () => {
    const result = copy(this.state.output)

    if (result) {
      this.props.enqueueSnackbar('复制成功', {
        anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
        },
      })
    }
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
        InputProps={{
          endAdornment: <InputAdornment position="end">
            <IconButton onClick={this.onTapCopy}>
              <FileCopy />
            </IconButton>
          </InputAdornment>
        }}
      />
    </div>
  }
}

export default withSnackbar(CSSColorConverter)