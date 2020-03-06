import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import reducer from 'Redux/reducers/Cars/reducer'
import saga from 'Redux/reducers/Cars/saga'

import {getCarsList, getBrandsList} from 'Redux/reducers/Cars/actions'
import {selectCarsList, selectBrands} from 'Redux/reducers/Cars/selectors'

import useRedux from 'Hooks/useRedux'

import View from './View'

const HomePageIndex = (initialProps) => {
  const reducers = {cars: reducer}
  const sagas = {cars: saga}
  const dispatch = useDispatch()

  useRedux(reducers,sagas)

  const mapDispatchToProps = {
    getCarsList : data => dispatch(getCarsList(data)),
    getBrandsList : data => dispatch(getBrandsList(data))
  }

  const mapStateToProps = useSelector(createStructuredSelector({
    carsList : selectCarsList(),
    brands : selectBrands()
  }))

  const props = Object.assign({}, initialProps, mapDispatchToProps, mapStateToProps)

  return <View {...props} />
}

export default HomePageIndex
