import React, { PureComponent, useState } from 'react'
import NavigationBar from '../../components/NavigationBar'
import Card from '../../components/Card'
import CSSColorConverter from '../../components/CSSColorConverter'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import style from './style.less'
import { Store } from '../../store'


function Desktop() {

  const [cards, setCards] = useState([
    {
      key: '0999',
      title: 'CSS 颜色值转换',
      Content: CSSColorConverter
    },
  ])
  const [focusIndex, setFocusIndex] = useState(0)

  const onCardRemove = (removeIndex: number) => setCards(cards.filter((card, index) => index !== removeIndex))

  return <div className={style.desktop}>
    <NavigationBar/>
    <div className={style.workArea}>
      {
        cards.map((item, index) => <Card
          key={item.key}
          title={item.title}
          isFocus={focusIndex === index}
          Content={item.Content}
          onRemove={() => onCardRemove(index)}
          onFocus={() => setFocusIndex(index)}
        />)
      }
    </div>
  </div>
}


export default withRouter(connect((state: Store) => state)(Desktop))