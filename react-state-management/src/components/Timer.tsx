import { AppDispatch, RootState } from "../redux/store";
import React, { useEffect } from "react";
import {
    decrementTime,
    pauseTimer,
    resetTimer,
    startTimer,
} from "../redux/timerReducer";
import { useDispatch, useSelector } from "react-redux";

export const Timer: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { isRunning, minutes, seconds, sessionType } = useSelector(
        (state: RootState) => state
    );

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (isRunning) {
            interval = setInterval(() => dispatch(decrementTime()), 1000);
        } else if (!isRunning && interval !== null) {
            clearInterval(interval);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isRunning, dispatch]);

    const handleStartPause = () => {
        if (isRunning) {
            dispatch(pauseTimer());
        } else {
            dispatch(startTimer());
        }
    };

    const handleReset = () => {
        dispatch(resetTimer());
    };

    return (
        <div>
            <h2>{sessionType === "work" ? "Work Session" : "Break Session"}</h2>
            <div>
                {minutes.toString().padStart(2, "0")}:
                {seconds.toString().padStart(2, "0")}
            </div>
            <button onClick={handleStartPause}>
                {isRunning ? "Pause" : "Start"}
            </button>
            <button onClick={handleReset}>Reset</button>
        </div>
    );
};
