import ValidatedInput from "./components/ValidatedInput";
import TodoList from "./components/TodoList.tsx";

function App() {
  const validateLength = (value: string) => value.length >= 5;

  return (
    <>
        <h1>Validated Input</h1>
        <ValidatedInput
            validationFunction={validateLength}
            errorMessage="Input is too short (minimum 5 characters)"
        />
        <TodoList/>
    </>
  );
}

export default App;
