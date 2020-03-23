import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import reducer from 'Redux/reducers/Cars/reducer'
import saga from 'Redux/reducers/Cars/saga'

import {getCarDetail} from 'Redux/reducers/Cars/actions'
import {selectCarDetail} from 'Redux/reducers/Cars/selectors'

import useRedux from 'Hooks/useRedux'

import View from './View'
import MobileView from './View.mobile'

const CarPageIndex = (initialProps) => {
  const reducers = {cars: reducer}
  const sagas = {cars: saga}
  const dispatch = useDispatch()

  useRedux(reducers,sagas)

  const mapDispatchToProps = {
    getCarDetail : data => dispatch(getCarDetail(data)),
  }

  const mapStateToProps = useSelector(createStructuredSelector({
    carDetail : selectCarDetail(),
    // brands : selectBrands()
  }))

  const props = Object.assign({}, initialProps, mapDispatchToProps, mapStateToProps)

  return props.isMobile ? <MobileView {...props}/> : <View {...props} />
}

export default CarPageIndex
