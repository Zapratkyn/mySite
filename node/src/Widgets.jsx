import { useState, useEffect } from "react"
import { Loading } from "./Helpers"
import { useMediaQuery } from 'react-responsive'

export function CurrentProject({props, setDisplayWidgets}) {

    const [project, setProject] = useState(undefined)

    useEffect(() => {
        if (!project) {
            setProject('loading')
            fetch('/projects/getCurrent').then(response => {
                if (response.status === 200)
                    response.json().then(data => setProject(data))
                else
                    setProject(-1)
            })
        }
    }, [project])

    const browse = () => {
        setDisplayWidgets(false)
        props.setCurrentPage('/project')
        props.navigate('/project/' + project.id)
    }

    if (!project || project === 'loading')
        return <Loading />

    return (
        <section className="widget">
            <h3 className="text-decoration-underline mb-3">{props.language.currentProject}</h3>
            {project < 0 ?
            <h3>No project</h3> :
            <button type='button' className="btn btn-secondary mb-1" onClick={browse}>{project.name}</button>}
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

export function Contact({props, setDisplayWidgets}) {

    const browse = page => {
        setDisplayWidgets(false)
        document.documentElement.scrollTop = 0
        props.setCurrentPage(page)
        props.navigate(page)
    }

    let sm = useMediaQuery({query: '(max-width: 960px)'})

    return (
        <address className="widget mb-0">
            <span className={`text-decoration-underline ${sm ? 'h5' : 'h3'}`}>{props.language.contact}</span>
            <ul className="ps-1 mt-2" style={{listStyle : 'none'}}>
                <li className="d-flex gap-2">
                    <img src="/images/phone.svg" alt="" />
                    +32 496 14 01 09
                </li>
                <li className="d-flex gap-2" style={{overflowWrap : 'break-word'}}>
                    <img src="/images/mail.svg" alt="" />
                    <a href="mailto:gilles.poncelet.pro@gmail.com">{props.language.mailMe}</a>
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

    const [options, setOptions] = useState(["Option 1", "Option 2", "Option 3"])

    useEffect(() => {
        if (!options) {
            setOptions('loading')
            fetch('/projects/getPollOptions').then(response => {
                if (response.status === 200)
                    response.json().then(data => setOptions(data.list))
            })
        }
    }, [options])

    const vote = () => {
        console.log(document.getElementById('pollOptions').value)
    }

    let index = 0

    return (
        <section className="widget">
            <h3 className="text-decoration-underline mb-3">{props.language.poll}</h3>
            <label htmlFor="pollOptions">{props.language.pollAsk}</label>
            <fieldset id='pollOptions' name='pollOptions' className="d-flex flex-column gap-2 rounded bg-white my-2 ps-2">
                {options.map(option => {
                    return (
                        <div key={index++} className="d-flex gap-2">
                            <input className="form-check-input" type="radio" id={index} name='poll' value={index} />
                            <label htmlFor={'option' + index}>{option}</label>
                        </div>
                    )
                })}
            </fieldset>
            <button type='button' className="btn btn-secondary" onClick={vote}>Vote</button>
        </section>
    )

}