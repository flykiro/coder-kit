import React, { useState, useEffect } from 'react'
import Card from '../../components/Card'
import CSSColorConverter from '../../components/CSSColorConverter'
import AppDock from '../../components/AppDock'
import { withRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Store } from '../../store'
import { last } from 'lodash'
import { desktop as desktopDispatchers } from '../../dispatchers'
import style from './style.less'

const contentCodes = {
  CSS_COLOR_CONVERTER: CSSColorConverter
}

function Desktop() {

  const [ focusIndex, setFocusIndex ] = useState(0)

  const { cards, applications } = useSelector((state: Store) => state.desktop)
  useEffect(() => {
    if (cards.length > 0) {
      setFocusIndex(cards.length - 1)
    }
  }, [cards])

  const onTapDockApp = async (appCode: string) => {
    if (!cards.some((card) => card.appCode === appCode)) {
      desktopDispatchers.showCard(appCode)
    }
  }

  return <div className={style.desktop}>

    <AppDock applications={applications} onTapItem={onTapDockApp}/>

    <div className={style.workArea}>
      {
        cards.map((item, index) => <Card
          key={item.key}
          title={item.title}
          isFocus={focusIndex === index}
          Content={item.component}
          onHide={() => desktopDispatchers.hideCard(index)}
          onFocus={() => setFocusIndex(index)}
        >
          <div>32</div>
        </Card>)
      }
    </div>

  </div>
}


export default withRouter(Desktop)