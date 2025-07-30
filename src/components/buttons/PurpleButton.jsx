"use client"

const PurpleButton = ({ children, onClick, className = "", ...props }) => {
    return (
        <button onClick={onClick} className={`btn-purple ${className}`} {...props}>
            {children}
        </button>
    )
}

export default PurpleButton
