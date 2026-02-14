import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
}

const compareSlice = createSlice({
  name: 'compare',
  initialState,
  reducers: {
    addCompareItem(state, action) {
      state.items.push(action.payload)
    },
    removeCompareItem(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
  },
})

export const { addCompareItem, removeCompareItem } = compareSlice.actions

export default compareSlice.reducer
