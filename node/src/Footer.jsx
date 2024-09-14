function Footer({props}) {

    const browse = () => {
        props.setCurrentPage('/bio')
        props.navigate('/bio')
    }

    return (
        <section className="w-100 bg-secondary-subtle d-flex flex-column align-items-center pt-2 fw-bold align-self-baseline" style={{minHeight : '90px'}}>
            <p className="mb-0">Webmaster : <span type='button' onClick={browse} className="text-primary text-decoration-underline">Gilles Poncelet</span></p>
            <p>2024</p>
        </section>
    )

}

export default Footer