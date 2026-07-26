import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  loading: false,
  error: null,
  first_visit:true
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;

        state.first_visit=false;
      
    },
    logout: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
      state.first_visit=false
    },
  },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;