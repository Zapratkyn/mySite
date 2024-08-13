import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function CurrentProject({props}) {

    const [project, setProject] = useState(undefined)

    const navigate = useNavigate()

    useEffect(() => {
        if (!project)
            setProject({name : 'My Project', completion : 95, link : 'myProject'})
        const interval = setInterval(() => {
            setProject({name : 'My Project', completion : project.completion < 100 ? project.completion + 1 : 100, link : 'myProject'})
        }, 1000)
        return () => clearInterval(interval)
    }, [project])

    if (!project)
        return undefined

    return (
        <section className="rounded p-2 text-dark widget">
            <h3 className="text-decoration-underline">{props.language.currentProject}</h3>
            <button type='button' className="btn btn-secondary" title={props.language.clickToSee} onClick={() => navigate('/projects/' + project.link)}>{project.name}</button>
            <hr />
            <Completion completion={project.completion} props={props} />
        </section>
    )
}

function Completion({completion, props}) {
    return (
        <>
            <div>{props.language.progress} : {completion}%</div>
            <progress className="w-75" value={completion / 100} />
        </>
    )
}

export function Contact({props}) {

    return (
        <address className="rounded p-2 text-dark widget">
            <h3 className="text-decoration-underline">{props.language.contact}</h3>
            <hr />
            <ul className="ps-1" style={{listStyle : 'none'}}>
                <li className="d-flex gap-2">
                    <img src="images/phone.svg" alt="" />
                    +32 496 14 01 09
                </li>
                <li className="d-flex gap-2">
                    <img src="images/mail.svg" alt="" />
                    gilles.poncelet.pro@gmail.com
                </li>
            </ul>
        </address>
    )
}

export default CurrentProject