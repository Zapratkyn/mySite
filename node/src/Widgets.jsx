import { useState, useEffect } from "react"
import { Loading } from "./Helpers"

export function CurrentProject({props}) {

    const [project, setProject] = useState(undefined)

    useEffect(() => {
        if (!project) {
            setProject('loading')
            fetch('/backAdmin/getCurrent').then(response => {
                if (response.status === 200)
                    response.json().then(data => setProject(data))
            })
        }
    })

    const browse = () => {
        props.setCurrentPage('/project')
        props.navigate('/project/' + project.id)
    }

    if (!project || project === 'loading')
        return <Loading />

    return (
        <section className="widget">
            <h3 className="text-decoration-underline mb-3">{props.language.currentProject}</h3>
            <button type='button' className="btn btn-secondary mb-1" onClick={browse}>{project.name}</button>
            {/* <Completion completion={project.completion} props={props} /> */}
        </section>
    )
}

// function Completion({completion, props}) {
//     return (
//         <div className="ps-1">
//             <div>{props.language.progress} : {completion}%</div>
//             <progress className="w-75" value={completion / 100} />
//         </div>
//     )
// }

export function Contact({props}) {

    const browse = page => {
        document.documentElement.scrollTop = 0
        props.setCurrentPage(page)
        props.navigate(page)
    }

    return (
        <address className="widget mb-0">
            <h3 className="text-decoration-underline mb-3">{props.language.contact}</h3>
            <ul className="ps-1" style={{listStyle : 'none'}}>
                <li className="d-flex gap-2">
                    <img src="/images/phone.svg" alt="" />
                    +32 496 14 01 09
                </li>
                <li className="d-flex gap-2">
                    <img src="/images/mail.svg" alt="" />
                    gilles.poncelet.pro@gmail.com
                </li>
                <li className="d-flex gap-2">
                    <img src="/images/lightbulb.svg" alt="" />
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