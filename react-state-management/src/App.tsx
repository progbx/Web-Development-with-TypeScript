import { Provider } from "react-redux";
import React from "react";
import { Timer } from "./components/Timer";
import { store } from "./redux/store";

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <div className="App">
                <h1>Pomodoro Timer</h1>
                <Timer />
            </div>
        </Provider>
    );
};

export default App;
