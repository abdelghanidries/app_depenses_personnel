// globalSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const globalSlice = createSlice({
  name: 'global',
  initialState: {
    user: null,
    // autres états...
  },
  reducers: {
    resetUser(state) {
      state.user = null; // Réinitialisez l'état de l'utilisateur
    },
    // autres reducers...
  },
});

export const { resetUser } = globalSlice.actions;
export default globalSlice.reducer;
