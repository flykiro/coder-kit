import React, { PureComponent } from 'react'
import NavigationBar from '../../components/NavigationBar'
import Card from '../../components/Card'
import CSSColorConverter from '../../components/CSSColorConverter'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import style from './style.less'

type HomeState = {
  cards: any[];
  focusIndex: number;
}

class Home extends PureComponent<any, HomeState> {

  state: HomeState = {
    cards: [
      {
        key: '0999',
        title: 'CSS 颜色值转换111',
        Content: CSSColorConverter
      },
      {
        key: '09991',
        title: 'CSS 颜色值转换222',
        Content: CSSColorConverter
      },
    ],
    focusIndex: 0,
  }
  
  onCardRemove(removeIndex: number) {
    this.setState({ cards: this.state.cards.filter((card, index) => index !== removeIndex) })
  }
  
  onCardFocus (focusIndex: number) {
    this.setState({ focusIndex })
  }

  render () {
    const { cards, focusIndex } = this.state

    return <div className={style.home}>
      <NavigationBar/>
      <div className={style.workArea}>
        {
          cards.map((item, index) => <Card
            key={item.key}
            title={item.title}
            isFocus={focusIndex === index} Content={item.Content}
            onRemove={this.onCardRemove.bind(this, index)}
            onFocus={this.onCardFocus.bind(this, index)}
          />)
        }
      </div>
    </div>
  }
}

export default withRouter(connect(state => state)(Home))