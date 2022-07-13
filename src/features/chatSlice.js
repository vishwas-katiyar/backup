import { createSlice } from "@reduxjs/toolkit";

export const chatRoomSlice = createSlice({
  name: "chatData",
  initialState: {
    value: 0,
    message:'None'
  },
  reducers: {
    updateChatData: (state, action) => {
      state.value = action.payload;
    },
    addMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const { updateChatData,addMessage } = chatRoomSlice.actions;

export const selectChatData = (state) => state.chatroom;

export default chatRoomSlice.reducer;
