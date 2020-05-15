import React from 'react'

import Button from 'components/common/Button'

import styles from './styles'

const PromptModal = ({isOpen, close, text, confirmButton, denyButton, children}) => {

    return (<div className={`${styles.promptModal} ${isOpen ? styles.promptModal__isOpen : styles.promptModal__isClosed}`} >
        {
          children ? children : <span>
            {text}
          </span>
        }


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
