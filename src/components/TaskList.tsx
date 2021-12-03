import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // não permita criar caso o título seja vazio[✔️].
    if (!newTaskTitle) return; // se falso ,ou seja, vazio, não crie task com valor vazio

    // Crie uma nova task com um id random[✔️]
    const newTask = { // estado temporário
        id: Math.random(), // gerar um numero aleatório
        title: newTaskTitle,
        isComplete: false // começa como falso para poder trocar depois para completo
    }

    setTasks(oldState => [...oldState, newTask]); // Adicionar à listagem 
    // valor antigo (oldState) ... spread operator, pegar todos os valores usados anteriormente, e colocar novo texto com o newTask

    setNewTaskTitle('') // deixar o campo vazio após criar nova task
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID[✔️]
    const newTasks = tasks.map(task => task.id === id ? { // mapear todas as tasks, pegar a task que tem o mesmo id, se for igual, editar isComplete.
        ...task,
        isComplete: !task.isComplete // pegar o valor antigo (false) e sobrescrever como (true)
    } : task) // ou se o task.id for igual ao id, retorna a mesma task, não alterando o estado

    setTasks(newTasks) // alterando o estado com um novo estado, alterando o isComplete de false para true
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID [✔️]
    const filteredTasks = tasks.filter(task => task.id !== id) // filtrar no array a task com a task.id diferente dos id já existentes 

    setTasks(filteredTasks) // alterando o estado com um novo estado, com os tasks.id diferentes do que foi clicado
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle} //componentes controlados pelo react
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}