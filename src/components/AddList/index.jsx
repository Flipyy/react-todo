import React, {useEffect, useState} from "react"
import axios from "axios";

import List from "../List";
import Badge from "../Badge";
import closeSvg from "../../assets/img/close.svg"

import "./AddButtonList.scss"


const AddButtonList = ({colors, onAddList}) => {

    const [visiblePopup, setVisiblePopup] = useState(false)
    const [selectedColor, setSelectColor] = useState(3)
    const [inputValue, setInputValue] = useState('')
    const [errorValue, setErrorValue] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (Array.isArray(colors)) {
            setSelectColor(colors[0].id)
        }
    }, [colors])


    const onClose = () => {
        setVisiblePopup(false)
        setInputValue('')
        setSelectColor(colors[0].id)
    }

    const addList = () => {
        if (!inputValue) {
            return setErrorValue("error-input")
        }
        setIsLoading(true)
        axios.post("http://localhost:3001/lists", {
            name: inputValue,
            colorId: selectedColor
        }).then(({data}) => {
                const color = colors.filter(c => c.id === selectedColor)[0].name
                const listObj = {...data, color: {name: color}, tasks: []}
                onAddList(listObj)
                onClose()
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    return (
        <div className="add-list">
            <List
                onClick={() => setVisiblePopup(!visiblePopup)}
                items={[
                    {
                        className: "list__add-button",
                        icon: <svg width="12" height="12" viewBox="0 0 16 16" fill="none"
                                   xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 1V15" stroke="black" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                            <path d="M1 8H15" stroke="black" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        </svg>,
                        name: "Добавить список"
                    }
                ]}/>
            {visiblePopup && <div className="add-list__popup">
                <img className="add-list__popup-close-btn" src={closeSvg} alt="close button" onClick={onClose}/>
                <input className={`field ${errorValue}`} type="text" placeholder="Название папки" value={inputValue}
                       onChange={e => {
                           setInputValue(e.target.value);
                           setErrorValue("")
                       }}/>
                <div className="add-list__popup-colors">
                    <ul>

                        {colors ?
                            colors.map(color => (
                                <Badge
                                    onClick={() => setSelectColor(color.id)}
                                    color={color.name}
                                    key={color.id}
                                    className={selectedColor === color.id && 'active'}/>
                            )) : <div>Загурзка...</div>
                        }
                    </ul>
                </div>
                <button className="btn-add" onClick={addList}>{isLoading ? "Добавление..." : "Добавить"}</button>
            </div>}
        </div>
    )
}

export default AddButtonList;