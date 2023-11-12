import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  isLoggedIn: false,
  userEmail : "",
  url: "",
  newNotification : null,
  loader: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoader: (state, action) => {
      state.loader = action.payload.loader;
    }
  }
})

// Action creators are generated for each case reducer function
export const { setLoader } = userSlice.actions

export default userSlice.reducer