import React from "react"

import classNames from "classnames"

import "./Badge.scss"

const Badge = ({color, onClick, className}) => {
    return <i className={classNames("badge", {[`badge--${color}`]: color}, {"active": className})} onClick={onClick}/>
}

export default Badge;