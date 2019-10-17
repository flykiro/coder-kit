

import React, { PureComponent, useState } from 'react'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import style from './style.less'
import { chunk, head, drop, dropRight, last } from 'lodash'
import FileCopy from '@material-ui/icons/FileCopy';
import * as copy from 'copy-to-clipboard';
import { withSnackbar, useSnackbar, WithSnackbarProps } from 'notistack';
import DateFnsUtils from "@date-io/dayjs";
import dayjs, { Dayjs } from 'dayjs';
import ChineseDateTimePicker from '../ChineseDateTimePicker'
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

enum BillsRecorderEnum {
  SELF = 'SELF',
  FRIEND = 'FRIEND',
}

enum BillsTypeEnum {
  INCOME = 'INCOME',
  OUTGOING = 'OUTGOING'
}

interface IProps extends WithSnackbarProps{
}

function BillsInput(props: IProps) {

  const [billsRecorder, setBillsRecorder] = useState(BillsRecorderEnum.SELF);
  const [billsTime, setBillsTime] = useState(dayjs().format('YYYY-MM-DD HH:mm'));
  const [billsAddress, setBillsAddress] = useState('')
  const [billsType, setBillsType] = useState(BillsTypeEnum.OUTGOING);
  const [billsMoney, setBillsMoney] = useState('')
  const [billsReason, setBillsReason] = useState('')
  const [bills, setBills] = useState([])

  const submit = () => {
    setBills(bills.concat({
      billsRecorder,
      billsTime,
      billsAddress,
      billsType,
      billsMoney: +billsMoney || 0,
      billsReason
    }))
    console.log({
      billsRecorder,
      billsTime,
      billsAddress,
      billsType,
      billsMoney: +billsMoney || 0,
      billsReason
    })
  }

  return <div className={style.billsInput}>
    <TextField
      value={billsRecorder}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => setBillsRecorder(event.target.value as BillsRecorderEnum)}
      select
      label="来自"
      SelectProps={{ autoWidth: true }}
      style={{ minWidth: 60 }}
    >
      <MenuItem value="SELF">自己</MenuItem>
      <MenuItem value="OTHER">朋友朋友朋友朋友</MenuItem>
    </TextField>
    <ChineseDateTimePicker
      label="于"
      value={billsTime}
      onChange={(date: Dayjs) => setBillsTime(date.format('YYYY-MM-DD HH:mm'))}
      style={{ width: 138 }}
    />
    <TextField
      value={billsAddress}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => setBillsAddress(event.target.value)}
      label="在"
      SelectProps={{ autoWidth: true }}
      style={{ minWidth: 60 }}
      inputProps={{
        size: 10
      }}
    >
      <MenuItem value="SELF">自己</MenuItem>
      <MenuItem value="OTHER">朋友朋友朋友朋友</MenuItem>
    </TextField>
    <TextField
      value={billsType}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => setBillsType(event.target.value as BillsTypeEnum)}
      select
      label="收/支"
      SelectProps={{ autoWidth: true }}
      style={{ minWidth: 60 }}
    >
      <MenuItem value={BillsTypeEnum.INCOME}>收入</MenuItem>
      <MenuItem value={BillsTypeEnum.OUTGOING}>支出</MenuItem>
    </TextField>
    <TextField
      label="金额"
      value={billsMoney}
      onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        if (/^\d*\.?\d*$/g.test(value)) {
          setBillsMoney(value)
        }
      }}
      InputProps={{
        endAdornment: '元',
      }}
      style={{ width: 100}}
    />
    <TextField
      select
      value={billsReason}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => setBillsReason(event.target.value)}
      label={billsType === BillsTypeEnum.OUTGOING ? '用于' : '来自'}
      style={{ width: 100}}
    >
      <MenuItem value={BillsTypeEnum.INCOME}>交通</MenuItem>
    </TextField>



    <Button variant="contained" color="primary" style={{ marginTop: 10, marginLeft: 10}} onClick={submit}>记上一笔</Button>

    <Table>
      <TableHead>
        <TableRow>
          <TableCell>序号</TableCell>
          <TableCell align="right">来自</TableCell>
          <TableCell align="right">时间</TableCell>
          <TableCell align="right">地点</TableCell>
          <TableCell align="right">收/支</TableCell>
          <TableCell align="right">金额</TableCell>
          <TableCell align="right"></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {bills.map((bill, index) => (
          <TableRow key={index}>
            <TableCell scope="row">{index + 1}</TableCell>
            <TableCell align="right">{bill.billsRecorder}</TableCell>
            <TableCell align="right">{bill.billsTime}</TableCell>
            <TableCell align="right">{bill.billsAddress}</TableCell>
            <TableCell align="right">{bill.billsType}</TableCell>
            <TableCell align="right">{bill.billsMoney}</TableCell>
            <TableCell align="right">{bill.billsReason}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    
  </div>
}

const component = withSnackbar(BillsInput)

export const APP_CODE = 'BILLS_INPUT'

export const description = {
  key: APP_CODE,
  appCode: APP_CODE,
  title: '记账工具',
  component,
}

export default component