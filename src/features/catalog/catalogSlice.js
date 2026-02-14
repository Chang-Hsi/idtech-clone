import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
  solutions: [],
  resources: [],
}

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    setCatalogData(state, action) {
      state.products = action.payload.products || []
      state.solutions = action.payload.solutions || []
      state.resources = action.payload.resources || []
    },
  },
})

export const { setCatalogData } = catalogSlice.actions

export default catalogSlice.reducer
