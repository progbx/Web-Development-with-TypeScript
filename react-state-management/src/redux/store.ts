import { legacy_createStore as createStore } from "redux";
import { timerReducer } from "./timerReducer";

export const store = createStore(timerReducer);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
