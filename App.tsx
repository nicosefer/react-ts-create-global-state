import * as React from 'react';
import createGlobalState from './createGlobalState';
import './style.css';

interface Todo {
  id: number;
  name: string;
}

const useGlobalState = createGlobalState<Todo[]>([
  { id: 10, name: 'react' },
  { id: 20, name: 'vue' },
]);

const MyList: React.FunctionComponent = () => {
  const [state] = useGlobalState();
  return (
    <ul>
      {state.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
};

const AddTodo: React.FunctionComponent = () => {
  const [state, setState] = useGlobalState();
  const inputRef = React.useRef(null);

  const addItem = () => {
    if (inputRef.current) {
      const lastId = state[state.length - 1].id;
      const addedItem = {
        id: lastId + 1,
        name: inputRef.current.value,
      };
      setState([...state, addedItem]);
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
      <MyList />
      <AddTodo />
      <MyList />
    </div>
  );
}
