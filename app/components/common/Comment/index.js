import React from 'react'

import styles from './style'

function Comment({ id, user, name, text, replies}) {
  return (<div className={styles.container}>
    <span>
      {text}
    </span>
  </div>)
}

export default Comment
