import * as React from 'react';
import createGlobalState from './createGlobalState';
import './style.css';

interface Todo {
  id: number;
  name: string;
}

const useGlobalState = createGlobalState<Todo[]>([
  { id: 1, name: 'react' },
  { id: 2, name: 'vue' },
]);

const useGlobalState2 = createGlobalState<Todo[]>([
  { id: 1, name: 'node' },
  { id: 2, name: 'go' },
]);

const MyList: React.FunctionComponent<{
  globalStateHook: ReturnType<typeof createGlobalState>;
}> = ({ globalStateHook }) => {
  const [state] = globalStateHook();
  const todos = state as Todo[];
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.name}</li>
      ))}
    </ul>
  );
};

const AddTodo: React.FunctionComponent<{
  globalStateHook: ReturnType<typeof createGlobalState>;
}> = ({ globalStateHook }) => {
  const [state, setState] = globalStateHook();
  const todos = state as Todo[];
  const inputRef = React.useRef(null);

  const addItem = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!inputRef?.current?.value) {
      return;
    }
    const lastId = todos[todos.length - 1].id;
    const addedItem = {
      id: lastId + 1,
      name: inputRef.current.value,
    };
    setState([...todos, addedItem]);
    inputRef.current.value = null;
  };

  return (
    <form onSubmit={addItem}>
      <input ref={inputRef} />
      <button onClick={addItem}>Add item</button>
    </form>
  );
};

export default function App() {
  return (
    <div>
      <div>
        <MyList globalStateHook={useGlobalState} />
        <AddTodo globalStateHook={useGlobalState} />
        <MyList globalStateHook={useGlobalState} />
      </div>
      <hr />

      <div>
        <MyList globalStateHook={useGlobalState2} />
        <AddTodo globalStateHook={useGlobalState2} />
        <MyList globalStateHook={useGlobalState2} />
      </div>
    </div>
  );
}
