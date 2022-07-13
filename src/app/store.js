import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import chatSlice from '../features/chatSlice'


export default configureStore({
  reducer: {
    counter: counterReducer,
    chatroom :chatSlice,
  },
});
