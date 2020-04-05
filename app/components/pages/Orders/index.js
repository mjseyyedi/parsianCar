import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import reducer from 'Redux/reducers/Profile/reducer'
import saga from 'Redux/reducers/Profile/saga'

import {setLoading} from 'Redux/reducers/global/actions'

import {getUserFactors} from 'Redux/reducers/Profile/actions'
import {selectUserOrders} from 'Redux/reducers/Profile/selectors'

import useRedux from 'Hooks/useRedux'

import View from './View'

const FactorPageIndex = (initialProps) => {
  const reducers = {profile: reducer}
  const sagas = {profile: saga}
  const dispatch = useDispatch()

  useRedux(reducers,sagas)

  const mapDispatchToProps = {
    // getFrontContent : data => dispatch(getFrontContent(data))
    getUserFactors: () => dispatch(getUserFactors()),
    setLoading: data => dispatch(setLoading(data)),
  }

  const mapStateToProps = useSelector(createStructuredSelector({
    userOrders: selectUserOrders(),
    // homeData : selectHomeData()
  }))

  const props = Object.assign({}, initialProps, mapDispatchToProps, mapStateToProps)

  return <View {...props} />
}

export default FactorPageIndex
