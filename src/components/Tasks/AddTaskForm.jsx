import React, {useState} from "react"

import addSvg from "../../assets/img/add.svg"
import axios from "axios";

const AddTaskForm = ({list, onAddTask}) => {

    const [visibleForm, setVisibleForm] = useState(false)
    const [inputValue, setInputValue] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [errorValue, setErrorValue] = useState('')

    const toggleForm = () => {
        setVisibleForm(!visibleForm)
        setInputValue('')
        setErrorValue('')
    }

    const addTask = () => {
        if (!inputValue) {
            return setErrorValue("error-input")
        }
        const obj = {
            listId: list.id,
            text: inputValue,
            completed: false
        }
        setIsLoading(true)
        axios.post("http://localhost:3001/tasks", obj).then(({data}) => {
            onAddTask(list.id, data)
            toggleForm()
        }).finally(() => setIsLoading(false))
    }

    return (
        <div className="tasks__form">
            {!visibleForm ? <div onClick={toggleForm} className="tasks__form-new">
                <img src={addSvg} alt="Add icon"/>
                <span>Новая задача</span>
            </div> : <div className="tasks__form-block">
                <input className={`field ${errorValue}`} type="text"
                       placeholder="Название задачи"
                       value={inputValue}
                       onChange={(e) => {
                           setInputValue(e.target.value);
                           setErrorValue("")}}/>
                <button className="btn-add"
                        onClick={addTask}
                        disabled={isLoading}>{isLoading ? "Загрузка..." : "Добавить задачу"}</button>
                <button className="btn-add btn-add--grey" onClick={toggleForm}>Отмена</button>
            </div>}
        </div>
    )
}

export default AddTaskForm;