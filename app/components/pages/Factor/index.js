import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import reducer from 'Redux/reducers/Cars/reducer'
import saga from 'Redux/reducers/Cars/saga'

// import {getFrontContent} from 'Redux/reducers/Cars/actions'
// import {selectHomeData} from 'Redux/reducers/Cars/selectors'

import useRedux from 'Hooks/useRedux'

import View from './View'

const FactorPageIndex = (initialProps) => {
  const reducers = {cars: reducer}
  const sagas = {cars: saga}
  const dispatch = useDispatch()

  useRedux(reducers,sagas)

  const mapDispatchToProps = {
    // getFrontContent : data => dispatch(getFrontContent(data))
  }

  const mapStateToProps = useSelector(createStructuredSelector({
    // homeData : selectHomeData()
  }))

  const props = Object.assign({}, initialProps, mapDispatchToProps, mapStateToProps)

  return <View {...props} />
}

export default FactorPageIndex
