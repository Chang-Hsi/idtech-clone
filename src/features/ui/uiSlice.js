import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isMobileNavOpen: false,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setMobileNavOpen(state, action) {
      state.isMobileNavOpen = action.payload
    },
  },
})

export const { setMobileNavOpen } = uiSlice.actions

export default uiSlice.reducer
