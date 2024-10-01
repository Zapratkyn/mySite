function Footer({props}) {

    const browse = () => {
        props.setCurrentPage('/bio')
        props.navigate('/bio')
    }

    return (
        <section className={`w-100 d-flex flex-column align-items-center pt-2 fw-bold align-self-baseline ${props.nightMode ? 'section-dark' : 'section-light'}`} style={{minHeight : '90px'}}>
            <p className="mb-0">Webmaster : <span type='button' onClick={browse} className={`text-decoration-underline ${props.nightMode ? 'text-info-emphasis' : 'text-primary'}`}>Gilles Poncelet</span></p>
            <p className="mb-0">2024</p>
            {props.stats && <p>{props.language.visits + ' : ' + props.stats.visits + ' | ' + props.language.users + ' : ' + props.stats.users}</p>}
        </section>
    )

}

export default Footer