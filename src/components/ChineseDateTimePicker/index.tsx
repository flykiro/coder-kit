
import React, { PureComponent, useState } from 'react'
import DateFnsUtils from "@date-io/dayjs";
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
  DateTimePickerProps
} from "@material-ui/pickers";
import { Dayjs } from 'dayjs';


class MyDateFnsUtils extends DateFnsUtils {
  chineseMonthWords = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二']

  getWeekdays() {
    return ['日', '一', '二', '三', '四', '五', '六']
  }

  getDateTimePickerHeaderText (date: Dayjs) {
    return `${this.chineseMonthWords[date.month()]} 月`
  }

  getCalendarHeaderText (date: Dayjs) {
    return `${date.year()}年 ${this.chineseMonthWords[date.month()]}月`
  }
}

export default function ChineseDateTimePicker(props: DateTimePickerProps) {
  
  return <MuiPickersUtilsProvider utils={MyDateFnsUtils}>
    <DateTimePicker
      format="YYYY-MM-DD HH:mm"
      cancelLabel="取消"
      okLabel="确定"
      todayLabel="今天"
      showTodayButton
      {...props}
    />
  </MuiPickersUtilsProvider>
}

