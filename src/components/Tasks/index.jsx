import React from "react"
import axios from "axios";

import editSvg from "../../assets/img/edit.svg"

import "./Tasks.scss"
import AddTaskForm from "./AddTaskForm";
import Task from "./Task";
import {Link} from "react-router-dom";

const Tasks = ({list, onEditTitle, onAddTask, onRemoveTask, onEditTask, onCompleteTask}) => {

    const editTitle = () => {
        const newTitle = window.prompt('Название списка', list.name)
        if (newTitle) {
            onEditTitle(list.id, newTitle)
            axios.patch("http://localhost:3001/lists/" + list.id, {
                name: newTitle
            }).catch(() => {
                alert('Не удалось обновить название списка')
            })
        }
    }

    return (
        <div className="tasks">
            <Link to={`/lists/${list.id}`}k>
                <h2 className={`tasks__title tasks__title--${list.color.name}`}>
                    {list.name}
                    <img src={editSvg} alt="edit icon" onClick={editTitle}/>
                </h2>
            </Link>
            <div className="tasks__items">
                {list.tasks && !list.tasks.length && <h2>Задачи отсутствуют</h2>}
                {list.tasks && list.tasks.map((task) => (
                    <Task key={task.id} {...task}
                          list={list}
                          onRemove={onRemoveTask}
                          onEdit={onEditTask}
                          onComplete={onCompleteTask}/>
                ))}
                <AddTaskForm key={list.id} list={list} onAddTask={onAddTask}/>
            </div>
        </div>
    )
}

export default Tasks;