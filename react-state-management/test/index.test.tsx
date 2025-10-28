import {
    decrementTime,
    pauseTimer,
    resetTimer,
    startTimer,
} from "../src/redux/timerReducer";

import { timerReducer } from "../src/redux/timerReducer";

describe("timerReducer", () => {
    const initialState = {
        isRunning: false,
        minutes: 0,
        seconds: 25,
        sessionType: "work",
    };

    it("should handle START_TIMER", () => {
        const action = startTimer();
        const expectedState = { ...initialState, isRunning: true };
        expect(timerReducer(initialState, action)).toEqual(expectedState);
    });

    it("should handle PAUSE_TIMER", () => {
        const initialStateWithRunning = { ...initialState, isRunning: true };
        const action = pauseTimer();
        const expectedState = { ...initialStateWithRunning, isRunning: false };
        expect(timerReducer(initialStateWithRunning, action)).toEqual(
            expectedState
        );
    });

    it("should handle RESET_TIMER for work session", () => {
        const action = resetTimer();
        const expectedState = {
            ...initialState,
            isRunning: false,
            minutes: 0,
            seconds: 25,
        };
        expect(timerReducer(initialState, action)).toEqual(expectedState);
    });

    it("should handle RESET_TIMER for break session", () => {
        const breakState = { ...initialState, sessionType: "break" };
        const action = resetTimer();
        const expectedState = {
            ...breakState,
            isRunning: false,
            minutes: 0,
            seconds: 5,
        };
        expect(timerReducer(breakState, action)).toEqual(expectedState);
    });

    it("should handle DECREMENT_TIME when time is not zero", () => {
        const stateWithOneSecond = { ...initialState, seconds: 1 };
        const action = decrementTime();
        const expectedState = { ...stateWithOneSecond, seconds: 0 };
        expect(timerReducer(stateWithOneSecond, action)).toEqual(expectedState);
    });

    it("should handle DECREMENT_TIME when seconds are zero and minutes are not zero", () => {
        const stateWithOneMinute = { ...initialState, seconds: 0, minutes: 1 };
        const action = decrementTime();
        const expectedState = {
            ...stateWithOneMinute,
            minutes: 0,
            seconds: 59,
        };
        expect(timerReducer(stateWithOneMinute, action)).toEqual(expectedState);
    });

    it("should switch to break session when work session ends", () => {
        const stateWithZeroTime = { ...initialState, seconds: 0, minutes: 0 };
        const action = decrementTime();
        const expectedState = {
            ...stateWithZeroTime,
            sessionType: "break",
            minutes: 0,
            seconds: 5,
        };
        expect(timerReducer(stateWithZeroTime, action)).toEqual(expectedState);
    });

    it("should switch to work session when break session ends", () => {
        const breakStateWithZeroTime = {
            ...initialState,
            sessionType: "break",
            seconds: 0,
            minutes: 0,
        };
        const action = decrementTime();
        const expectedState = {
            ...breakStateWithZeroTime,
            sessionType: "work",
            minutes: 0,
            seconds: 25,
        };
        expect(timerReducer(breakStateWithZeroTime, action)).toEqual(
            expectedState
        );
    });
});
