import { combineReducers } from '@reduxjs/toolkit'
import catalogReducer from '../features/catalog/catalogSlice'
import uiReducer from '../features/ui/uiSlice'
import compareReducer from '../features/compare/compareSlice'
import searchReducer from '../features/search/searchSlice'

const rootReducer = combineReducers({
  catalog: catalogReducer,
  ui: uiReducer,
  compare: compareReducer,
  search: searchReducer,
})

export default rootReducer
