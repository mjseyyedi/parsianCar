import React from 'react'
import {useDispatch} from 'react-redux'

import reducer from 'Redux/reducers/Home/reducer'
import saga from 'Redux/reducers/Home/saga'

import {getFrontContent} from 'Redux/reducers/Home/actions'

import useRedux from 'Hooks/useRedux'

import View from './View'

const HomePageIndex = (initialProps) => {
  const reducers = {home: reducer}
  const sagas = {home: saga}
  const dispatch = useDispatch()

  useRedux(reducers,sagas)

  const mapDispatchToProps = {
    getFrontContent : data => dispatch(getFrontContent(data))
  }


  const props = Object.assign({}, initialProps, mapDispatchToProps)

  return <View {...props} />
}

export default HomePageIndex
