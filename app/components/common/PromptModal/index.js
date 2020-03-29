import React from 'react'

import Modal from 'components/common/Modal'
import Button from 'components/common/Button'

import styles from './styles'

const PromptModal = ({isOpen, close, text, confirmButton, denyButton}) => {

    return (<div className={`${styles.promptModal} ${isOpen ? styles.promptModal__isOpen : styles.promptModal__isClosed}`} >
          <span>
            {text}
          </span>

          <div className={styles.promptModal__actions}>
            {!!(confirmButton && confirmButton.action) && <Button type={'primary'}
                                                                  onClick={() => confirmButton.action()}>
              {confirmButton.text}
            </Button>}

            {!!(denyButton && denyButton.text) && <Button onClick={close}>
              {denyButton.text}
            </Button>}

          </div>
        </div>
  )
}

export default PromptModal
