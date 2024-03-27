import React, { PropsWithChildren } from 'react'
import styles from './styles.module.scss.json'
import classNames from 'classnames'
import './styles.module.scss'


export const Button: React.FC<PropsWithChildren> = (props) => {
  return <button className={classNames(styles.button)}>{props.children}</button>
}
