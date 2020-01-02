import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { userReducer } from "./user/user.reducer";
import { channelReducer } from "./channel/channel.reducer";
import { messagesReducer } from "./message/messages.reducer";
import { loadingReducer } from "./loading/loading.reducer";
import { errorReducer } from "./errors/errors.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "channel", "messages"]
};

const reducers = combineReducers({
  user: userReducer,
  channel: channelReducer,
  messages: messagesReducer,
  loading: loadingReducer,
  errors: errorReducer
});

export const rootReducer = persistReducer(persistConfig, reducers);
