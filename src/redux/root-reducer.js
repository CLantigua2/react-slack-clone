import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { userReducer } from "./user/user.reducer";
import { channelReducer } from "./channel/channel.reducer";
import { messagesReducer } from "./message/messages.reducer";
import { loadingReducer } from "./loading/loading.reducer";
import { errorReducer } from "./errors/errors.reducer";
import { progressReducer } from "./progress/progress.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"]
};

const reducers = combineReducers({
  user: userReducer,
  channel: channelReducer,
  messages: messagesReducer,
  loading: loadingReducer,
  errors: errorReducer,
  progress: progressReducer
});

export const rootReducer = persistReducer(persistConfig, reducers);
