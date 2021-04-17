import React from "react"
import axios from "axios";

import classNames from "classnames";
import Badge from "../Badge";
import removeSvg from "../../assets/img/remove.svg"

import "./List.scss"


const List = ({items, isRemovable, onClick, onRemove, onClickItem, activeItem}) => {
    const removeList = (item) => {
        if (window.confirm('Вы действительноо хотите удалить список?')) {
            axios.delete("http://localhost:3001/lists/" + item.id).then(() => {
                onRemove(item.id)
            })
        }
    }
    return (
        <ul className="list" onClick={onClick}>
            {items.map((item, index) => (
                <li className={classNames(item.className, {
                    active : item.active
                        ? item.active
                        : activeItem && activeItem.id === item.id
                })}
                    key={index}
                    onClick={onClickItem ? () => onClickItem(item) : null}>
                    <i>{item.icon ? (item.icon) : (<Badge color={item.color.name}/>)}</i>
                    <span>{item.name}{item.tasks && ` (${item.tasks.length})`}</span>
                    {isRemovable && <img className="list__remove-icon"
                                         src={removeSvg}
                                         onClick={() => removeList(item)}
                                         alt="remove icon"/>}
                </li>
            ))}
        </ul>
    )
}

export default List;