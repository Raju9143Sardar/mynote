import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState: AppbarState = {
    title: '',
    showBackButton: false,
    actions: [],
};

const appbarSlice = createSlice({
    name: 'appbar',
    initialState,
    reducers: {
    setAppbar: (state, action: PayloadAction<AppbarState>) => {
      return action.payload;
    },

    // fired when user clicks Appbar icon
    triggerAction: (state, action: PayloadAction<string>) => {
      // middleware will handle this
    },
  },
});

export const { setAppbar, triggerAction } = appbarSlice.actions;
export default appbarSlice.reducer;