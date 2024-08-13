import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function Projects({props}) {

    const [list, setList] = useState(undefined)

    useEffect(() => {
        if (!list) {
            fetch('json/projects.json').then(response => response.json().then(data => setList(data)))
        }
    })

    if (!list)
        return list

    let index = 0

    return (
        <section>
            <h2 className="d-flex justify-content-center fw-bold mb-3">{props.language.projects}</h2>
            {/* <hr className="w-75 mb-3" style={{margin : 'auto'}} /> */}
            <ul className="d-flex flex-column gap-1" style={{listStyle : 'none'}}>{list.reverse().map(project => <Project key={project.name} props={props} project={project} index={index++} />)}</ul>
        </section>
    )
}

function Project({props, project, index}) {

    const navigate = useNavigate()

    return (
        <li type='button' onClick={() => navigate('/projects/' + project.id)} className={`rounded p-2 d-flex gap-2 ${index % 2 === 1 ? 'bg-primary-subtle' : 'bg-secondary-subtle'}`} style={{height : '50px'}}>
            <img className="h-100" src={"images/projects/" + project.name.split(' ').join('_') + '.svg'} alt="" />
            <h5>{project.name}</h5>
            <p>{project.description}</p>
        </li>
    )

}

export function ProjectPage({props}) {

    return (
        <div>
            Sample project page
            <img src="images/pic.png" alt="" />
        </div>
    )

}

export default Projects