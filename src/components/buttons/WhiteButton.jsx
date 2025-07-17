
const WhiteButton = ({ children, onClick, className = "", ...props }) => {
    return (
        <button className={className ? className : "btn-white"} onClick={onClick} {...props}>
            {children}
        </button>
    )
}

export default WhiteButton
