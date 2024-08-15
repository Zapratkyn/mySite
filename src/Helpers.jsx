function Title({title}) {

    return (
        <p className="d-flex">
            <img className="h2" src="images/caret-right.svg" alt="" />
            <h2 className="fw-bold mb-3">{title}</h2>
        </p>
    )
    
}

export default Title