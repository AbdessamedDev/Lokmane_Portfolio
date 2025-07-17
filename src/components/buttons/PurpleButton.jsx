
const PurpleButton = ({ children, onClick, className = "", ...props }) => {
    return (
        <button className={className ? className : "btn-purple"} onClick={onClick} {...props}>
            {children}
        </button>
    )
}

export default PurpleButton
