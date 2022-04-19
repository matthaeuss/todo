import './App.css';
import {useEffect, useState} from "react";

const loadFromLocalStorage = (key) =>{
  const data = localStorage.getItem(key);
  if (data !== null){
    return JSON.parse(data);
  }
  return []
}

const saveToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data))
}

const uuidGen = () => Math.max(...(loadFromLocalStorage('tds').map(e => e.id)), 0) + 1;

function App() {
  const [value, setValue] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(loadFromLocalStorage('tds'));
  }, []);

  const handleChange = (event) => {
    setValue(event.target.value);
  }

  const handleKeyUp = (event) => {
    if(event.key === 'Enter'){
      const newTask= [...tasks, {
        name: value,
        id: uuidGen(),
        status: false
      }]
      setTasks(newTask)
      setValue('');
      saveToLocalStorage('tds', newTask)
    }
  }

  function handleChangeStatus(id) {
    const newTasks = tasks.map(task => {
      if (task.id === id){
        task.status = !task.status
      }
      return task
    })
    setTasks(newTasks);
  }


  function handleDeleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id))
  }

  return (
      <div className="App">
        <h1>todo</h1>
        <input type="text"
               value={value}
               onChange={handleChange}
               onKeyUp={handleKeyUp}
        />
        <ul>
          {tasks.map(({id, name, status}) => (
              <li key={id} className='todo-item'>
              <span
                  className={status ? 'status done' : 'status active'}
                  onClick={() => handleChangeStatus(id)}
              />
                {name}
                <button onClick={() => handleDeleteTask(id)}>x</button>
              </li>
          ))}
        </ul>
      </div>
  );
}

export default App;