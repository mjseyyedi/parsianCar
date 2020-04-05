import React, {useState, useRef, useEffect} from 'react'
import ReactDOM from 'react-dom'


import styles from './styles'

const modalRoot = typeof window !== 'undefined' ? document.getElementById('modal-root') : null


function Modal({children, isOpen, closeModal}) {
  const modalRef = useRef(typeof window !== 'undefined' ? document.createElement('div') : null)
  const backdropRef = useRef(typeof window !== 'undefined' ? document.createElement('div') : null)

  useEffect(() => {

    backdropRef.current.className = styles.backdrop
    modalRef.current.classList.add(styles.modal)

    const node = backdropRef.current
    node.appendChild(modalRef.current)
    modalRoot.appendChild(node)
    backdropRef.current.addEventListener('click', clickOnBackDrop)

    return () => {
      backdropRef.current.removeEventListener('click', clickOnBackDrop)
      modalRoot.removeChild(node)
    }

  } , [])

  useEffect(() => {

    if (isOpen) {
      backdropRef.current.classList.add(
        styles['backdrop--active'],
        styles['backdrop--appearing']
      )
    } else {
      backdropRef.current.classList.remove(styles['backdrop--appearing']);
      backdropRef.current.classList.add(styles['backdrop--deactive']);

      setTimeout(() =>{
        backdropRef.current.classList.remove(styles['backdrop--active'])
      }, 650)

    }
  }, [isOpen])



  function clickOnBackDrop(e) {
    if (modalRef.current.contains(e.target)) return
    closeModal()
    // e.stopPropagation()
  }

  return modalRoot ? ReactDOM.createPortal(children, modalRef.current) : <div/>

}

export default Modal
