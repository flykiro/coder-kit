import React, { PureComponent } from 'react'
import style from './style.less'
import { ROLE_BUTTON } from '../../utils'

type AppDockProps = {
  onTapItem: (appCode: string) => any,
  applications: any[],
}

export default function AppDock(props: AppDockProps) {
  const { applications } = props
  return <div className={style.appDock}>
    {
      applications.map((item, index) => <div
        role={ROLE_BUTTON}
        className={style.appDockItem}
        onClick={() => props.onTapItem(item.appCode)}
        key={index}
      >{item.title}</div>)
    }
  </div>
}