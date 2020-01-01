import { combineReducers } from "redux";
import { userReducer } from "./user/user.reducer";
import { channelReducer } from "./channel/channel.reducer";
import { messagesReducer } from "./message/messages.reducer";
import { loadingReducer } from "./loading/loading.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  channel: channelReducer,
  messages: messagesReducer,
  loading: loadingReducer
});
