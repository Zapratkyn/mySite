import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function CurrentProject({props}) {

    const [project, setProject] = useState(undefined)

    const navigate = useNavigate()

    useEffect(() => {
        if (!project)
            setProject({name : 'My Project', completion : 80, link : 'myProject'})
        const interval = setInterval(() => {
            setProject({name : 'My Project', completion : 80, link : 'myProject'})
        }, 3000)
        return clearInterval(interval)
    }, [project])

    if (!project)
        return undefined

    return (
        <div className="bg-danger rounded p-2 text-dark">
            <h3 className="text-decoration-underline">{props.language.currentProject}</h3>
            <div type='button' title={props.language.clickToSee} onClick={() => navigate('/projects/' + project.link)}>{project.name}</div>
            <hr />
            <Completion completion={project.completion} props={props} />
        </div>
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

export default CurrentProject