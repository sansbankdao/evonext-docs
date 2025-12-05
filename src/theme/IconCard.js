// src/theme/IconCard.js

import React from 'react'
import clsx from 'clsx'

export default function IconCard({ icon, title, children }) {
    return (
        <div className="icon-card">
            <div className="icon">{icon}</div>
            <h3>{title}</h3>
            <p>{children}</p>
        </div>
    )
}
