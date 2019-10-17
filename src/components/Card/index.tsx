import React, { PureComponent, useState } from 'react'
import style from './style.less'
import { classes, noop, ROLE_BUTTON } from '../../utils'
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';

interface CardProps {
  title?: string
  isFocus?: boolean;
  Content?: React.ComponentType<any>
  onHide?: () => any
  onFocus?: () => any;
}

type CardState = {
  width: number;
  height: number;
  translateX: number;
  translateY: number;

  start: {
    startArea: CardAreas;
    startMoveX: number;
    startMoveY: number;
    startWidth: number;
    startHeight: number;
    startTranslateX: number;
    startTranslateY: number;
  }
}

enum CardAreas {
  HEAD = 'HEAD',
  RESIZE_CORNER = 'RESIZE_CORNER'
}

const CARD_MIN_WIDTH = 260
const CARD_MIN_HEIGHT = 220

export default class Card extends PureComponent<CardProps, CardState> {
  static defaultProps: CardProps = {
    isFocus: false,
    onHide: noop,
    onFocus: noop,
  }

  state: CardState = {
    width: CARD_MIN_WIDTH,
    height: 240,
    translateX: 0,
    translateY: 0,
    
    start: {
      startArea: CardAreas.HEAD,
      startMoveX: 0,
      startMoveY: 0,
      startWidth: 0,
      startHeight: 0,
      startTranslateX: 0,
      startTranslateY: 0,
    }
  }

  onMoveStart (startArea: CardAreas, { pageX, pageY }: React.MouseEvent<HTMLDivElement>) {

    const { width, height, translateX, translateY } = this.state

    this.setState({ start: {
      startArea,
      startMoveX: pageX,
      startMoveY: pageY,
      startWidth: width,
      startHeight: height,
      startTranslateX: translateX,
      startTranslateY: translateY,
    } })

    window.addEventListener('mousemove', this.onMoving)
    window.addEventListener('mouseup', this.onMoveEnd)
  }

  onMoving = ({ pageX, pageY }: MouseEvent) => {

    const { startArea, startMoveX, startMoveY, startWidth, startHeight, startTranslateX, startTranslateY } = this.state.start

    if (startArea === CardAreas.HEAD) {

      this.setState({
        translateX: pageX - startMoveX + startTranslateX,
        translateY: pageY - startMoveY + startTranslateY,
      })

    } else if (startArea === CardAreas.RESIZE_CORNER) {
      const width = pageX - startMoveX + startWidth
      const height = pageY - startMoveY + startHeight
  
      this.setState({
        width: width < CARD_MIN_WIDTH ? CARD_MIN_WIDTH : width,
        height: height < CARD_MIN_HEIGHT ? CARD_MIN_HEIGHT : height,
      })
    }
  }

  onMoveEnd = () => {
    window.removeEventListener('mousemove', this.onMoving)
    window.removeEventListener('mouseup', this.onMoveEnd)
  }

  render () {
    const { title, Content, children: children, isFocus, onFocus, onHide } = this.props
    const { width, height, translateX, translateY } = this.state

    return <div
      className={style.card}
      style={{ width, height, transform: `translate3d(${translateX}px,${translateY}px,0)` }}
      onFocus={onFocus}
      onMouseDown={onFocus}
      data-active={isFocus}
    >
      <div className={style.cardHead} onMouseDown={this.onMoveStart.bind(this, CardAreas.HEAD)}>
        <DragIndicatorIcon className={style.cardHeadDragArea} />
        <div className={style.cardHeadTitle}>{title}</div>
        <div className={style.cardHeadActions}>
          <div className={classes(style.cardHeadActionsItem, style.cardRemoveIcon)} role={ROLE_BUTTON} onClick={onHide} />
        </div>
      </div>
      
      <div className={style.cardBody}>{Content && <Content cardProps={this.props} /> || children}</div>

      <div className={style.cardResizeCorner} onMouseDown={this.onMoveStart.bind(this, CardAreas.RESIZE_CORNER)}/>
    </div>
  }
}

