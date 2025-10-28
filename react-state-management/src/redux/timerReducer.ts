// Define the following string constants as action types
const START_TIMER = 'START_TIMER';
const PAUSE_TIMER = 'PAUSE_TIMER';
const RESET_TIMER = 'RESET_TIMER';
const DECREMENT_TIME = 'DECREMENT_TIME';

interface TimerState {
    isRunning: boolean;
    minutes: number;
    seconds: number;
    sessionType: "work" | "break";
}

// Define interfaces for each action type.
interface StartTimerAction {
    type: typeof START_TIMER;
}

interface PauseTimerAction {
    type: typeof PAUSE_TIMER;
}

interface ResetTimerAction {
    type: typeof RESET_TIMER;
}

interface DecrementTimeAction {
    type: typeof DECREMENT_TIME;
}

// Create a union type TimerActionTypes
type TimerActionTypes = StartTimerAction | PauseTimerAction | ResetTimerAction | DecrementTimeAction;

const initialState: TimerState = {
    isRunning: false,
    minutes: 0,
    seconds: 25,
    sessionType: "work"
};

function timerReducer(state: TimerState = initialState, action: TimerActionTypes): TimerState {
    switch (action.type) {
        case START_TIMER:
            return {
                ...state,
                isRunning: true
            };
        case PAUSE_TIMER:
            return {
                ...state,
                isRunning: false
            };
        case RESET_TIMER:
            return {
                ...state,
                isRunning: false,
                minutes: 0,
                seconds: state.sessionType === "work" ? 25 : 5
            };
        case DECREMENT_TIME:
            if (state.minutes === 0 && state.seconds === 0) {
                // Switch session type when timer reaches 0
                const newSessionType = state.sessionType === "work" ? "break" : "work";
                return {
                    ...state,
                    sessionType: newSessionType,
                    minutes: 0,
                    seconds: newSessionType === "work" ? 25 : 5
                };
            } else if (state.seconds === 0 && state.minutes > 0) {
                // Decrement minutes and set seconds to 59
                return {
                    ...state,
                    minutes: state.minutes - 1,
                    seconds: 59
                };
            } else {
                // Decrement seconds
                return {
                    ...state,
                    seconds: state.seconds - 1
                };
            }
        default:
            return state;
    }
}

// Implement the following action creators that return the appropriate action objects.
function startTimer(): StartTimerAction {
    return { type: START_TIMER };
}

function pauseTimer(): PauseTimerAction {
    return { type: PAUSE_TIMER };
}

function resetTimer(): ResetTimerAction {
    return { type: RESET_TIMER };
}

function decrementTime(): DecrementTimeAction {
    return { type: DECREMENT_TIME };
}

// Ensure that the following are exported from the file
export type { TimerState };
export { initialState, timerReducer, startTimer, pauseTimer, resetTimer, decrementTime };
