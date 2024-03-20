import React, { PropsWithChildren } from 'react'
import styles from './styles.module.scss'

export const Button: React.FC<PropsWithChildren> = (props) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  return <button className={styles.button}>{props.children}</button>
}
