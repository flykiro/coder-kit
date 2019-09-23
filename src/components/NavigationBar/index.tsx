import React, { PureComponent } from 'react'
import style from './style.less'

console.log(style)

export default class NavigationBar extends PureComponent {
  render () {
    return <div className={style.navigationBar}>
      <div className={style.navigationBarContent}>
        <div className={style.navigationBarLogo}></div>
        <div className={style.navigationBarLinks}>
          <div className={style.navigationBarLinksItem}>navigationBar</div>
          <div className={style.navigationBarLinksItem}>navigationBar</div>
          <div className={style.navigationBarLinksItem}>navigationBar</div>
        </div>
        <div className={style.navigationBarActions}></div>
      </div>
    </div>
  }
}