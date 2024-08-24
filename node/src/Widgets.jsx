import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export function CurrentProject({props}) {

    const [project, setProject] = useState(undefined)

    const navigate = useNavigate()

    const browse = () => {
        props.setCurrentPage('/projects')
        navigate('/projects/' + project.id)
    }

    useEffect(() => {
        if (!project)
            setProject({name : 'Sample Project', completion : 95, id : 1})
        const interval = setInterval(() => {
            setProject({name : 'Sample Project', completion : project.completion < 100 ? project.completion + 1 : 100, id : 1})
        }, 1000)
        return () => clearInterval(interval)
    }, [project])

    if (!project)
        return undefined

    return (
        <section className="widget">
            <h3 className="text-decoration-underline mb-3">{props.language.currentProject}</h3>
            <button type='button' className="btn btn-secondary mb-1" onClick={browse}>{project.name}</button>
            <Completion completion={project.completion} props={props} />
        </section>
    )
}

function Completion({completion, props}) {
    return (
        <div className="ps-1">
            <div>{props.language.progress} : {completion}%</div>
            <progress className="w-75" value={completion / 100} />
        </div>
    )
}

export function Contact({props}) {

    const navigate = useNavigate()

    const browse = page => {
        document.documentElement.scrollTop = 0
        props.setCurrentPage(page)
        navigate(page)
    }

    return (
        <address className="widget mb-0">
            <h3 className="text-decoration-underline mb-3">{props.language.contact}</h3>
            <ul className="ps-1" style={{listStyle : 'none'}}>
                <li className="d-flex gap-2">
                    <img src="phone.svg" alt="" />
                    +32 496 14 01 09
                </li>
                <li className="d-flex gap-2">
                    <img src="mail.svg" alt="" />
                    gilles.poncelet.pro@gmail.com
                </li>
                <li className="d-flex gap-2">
                    <img src="lightbulb.svg" alt="" />
                    <span type='button' onClick={() => browse('/suggest')} className="text-primary text-decoration-underline">Suggestions</span>
                </li>
            </ul>
        </address>
    )
}

export function Poll({props}) {

    return (
        <section className="widget">
            <h3 className="text-decoration-underline mb-3">{props.language.poll}</h3>
            {props.language.pollAsk}
        </section>
    )

}