import { useState } from "react";
import Button from "./Button";
import { FiEdit, FiPlusSquare, FiSave } from "react-icons/fi";
import { GiCancel } from "react-icons/gi";
import { AiFillDelete } from "react-icons/ai";

export default function Todo() {
  //  wadah menampung data
  const [activity, setActivity] = useState("");
  const [todos, setTodos] = useState([]);
  const [edit, setEdit] = useState({});
  const [msg, setMsg] = useState("");
  const [color, setColor] = useState("");

  // generate id untuk item todo
  function generateId() {
    return Date.now();
  }

  function generateColor() {
    const random = Math.floor(Math.random() * 0xffffff).toString(16);
    return random;
  }

  function saveTodoHandler(e) {
    e.preventDefault();

    if (!activity) {
      return setMsg("Aktivitas Harus Diisi");
    }

    if (edit.id) {
      const updatedTodo = {
        ...edit,
        activity,
      };

      const updateIndexTodo = todos.findIndex((todo) => todo.id === edit.id);
      const updatedTodos = [...todos];
      updatedTodos[updateIndexTodo] = updatedTodo;
      setTodos(updatedTodos);

      return cancelEditHandler();
    }

    setTodos([
      ...todos,
      {
        id: generateId(),
        activity,
        done: false,
      },
    ]);
    setColor("#" + generateColor());
    setMsg("");
    setActivity("");
  }

  function deleteTodoHandler(id) {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    cancelEditHandler();
  }

  function doneTodoHandler(item) {
    const updatedTodo = {
      ...item,
      done: item.done ? false : true,
    };

    const updateIndexTodo = todos.findIndex((todo) => todo.id === item.id);
    const updatedTodos = [...todos];
    updatedTodos[updateIndexTodo] = updatedTodo;
    setTodos(updatedTodos);
  }

  function editTodoHandler(item) {
    setActivity(item.activity);
    setEdit(item);
  }

  function cancelEditHandler() {
    setActivity("");
    setEdit({});
  }

  return (
    <div className="container m-auto font-main p-4">
      <div className="w-full my-10">
        <h1 className="text-center text-xl font-bold text-slate-200 md:text-4xl">
          Simple Acumalaka To Do List
        </h1>
      </div>
      <div className="w-full md:w-3/4 md:m-auto lg:w-1/2">
        <form className="flex justify-between">
          <input
            type="text"
            className="w-3/4 border-4 rounded-md"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
          />
          <Button type="submit" onClick={saveTodoHandler}>
            {edit.id ? <FiSave /> : <FiPlusSquare />}
          </Button>
          {edit.id && (
            <Button className="bg-pink-400" onClick={cancelEditHandler}>
              <GiCancel />
            </Button>
          )}
        </form>
      </div>
      <div className="w-full mt-10">
        {
          <h1 className="text-center text-slate-200 font-main mb-10">
            Kau punya {todos.length} tugas la
          </h1>
        }
        <ul className="sm:flex sm:justify-evenly sm:gap-x-4 sm:flex-wrap">
          {msg && (
            <h1 className="text-xl text-slate-200 font-bold font-main text-center sm:text-3xl">
              {msg}
            </h1>
          )}
          {todos.map((todo) => {
            return (
              <li
                key={todo.id}
                className={`w-full text-slate-200 border-b-4 border-[${color}] rounded-lg overflow-hidden bg-slate-700 mb-10 p-2 sm:w-72 md:w-96`}
              >
                <div className="flex justify-between pb-20">
                  <span className={todo.done ? "line-through text-slate-400" : ""}>
                    <input
                      className="mr-2"
                      type="checkbox"
                      checked={todo.done}
                      onChange={() => doneTodoHandler(todo)}
                    />
                    {todo.activity}
                  </span>
                  <span>{todo.done ? "Selesai" : "Belum Selesai"}</span>
                </div>
                <div className="flex justify-end gap-x-2">
                  <Button className="bg-green-400" onClick={() => editTodoHandler(todo)}>
                    <FiEdit />
                  </Button>
                  <Button className="bg-red-400" onClick={() => deleteTodoHandler(todo.id)}>
                    <AiFillDelete />
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
