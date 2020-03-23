import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import reducer from 'Redux/reducers/Cars/reducer'
import saga from 'Redux/reducers/Cars/saga'

import {getCarsList, getBrandsList, searchCars, setCarsList, getCategoriesList} from 'Redux/reducers/Cars/actions'
import {selectCarsList, selectBrands, selectCarCategories} from 'Redux/reducers/Cars/selectors'

import useRedux from 'Hooks/useRedux'

import View from './View'

const CarsPageIndex = (initialProps) => {
  const reducers = {cars: reducer}
  const sagas = {cars: saga}
  const dispatch = useDispatch()

  useRedux(reducers,sagas)

  const mapDispatchToProps = {
    getBrandsList : data => dispatch(getBrandsList(data)),
    setCarsList : data => dispatch(setCarsList(data)),
    getCarsList : data => dispatch(getCarsList(data)),
    searchCars : data => dispatch(searchCars(data)),
    getCategoriesList : data => dispatch(getCategoriesList(data)),
  }

  const mapStateToProps = useSelector(createStructuredSelector({
    carsList : selectCarsList(),
    categories : selectCarCategories(),
    brands : selectBrands()
  }))

  const props = Object.assign({}, initialProps, mapDispatchToProps, mapStateToProps)

  return <View {...props} />
}

export default CarsPageIndex
