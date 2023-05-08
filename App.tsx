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
  useStateHook: ReturnType<typeof createGlobalState>;
}> = ({ useStateHook }) => {
  const [state] = useStateHook();
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
  useStateHook: ReturnType<typeof createGlobalState>;
}> = ({ useStateHook }) => {
  const [state, setState] = useStateHook();
  const todos = state as Todo[];
  const inputRef = React.useRef(null);

  const addItem = () => {
    if (inputRef.current) {
      const lastId = todos[todos.length - 1].id;
      const addedItem = {
        id: lastId + 1,
        name: inputRef.current.value,
      };
      setState([...todos, addedItem]);
      inputRef.current.value = null;
    }
  };

  return (
    <div>
      <input ref={inputRef} />
      <button onClick={addItem}>Add item</button>
    </div>
  );
};

export default function App() {
  return (
    <div>
      <div>
        <MyList useStateHook={useGlobalState} />
        <AddTodo useStateHook={useGlobalState} />
        <MyList useStateHook={useGlobalState} />
      </div>
      <hr />

      <div>
        <MyList useStateHook={useGlobalState2} />
        <AddTodo useStateHook={useGlobalState2} />
        <MyList useStateHook={useGlobalState2} />
      </div>
    </div>
  );
}
