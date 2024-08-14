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
        <section className="pe-2">
            <h2 className="fw-bold ms-4 mb-3">{props.language.projects}</h2>
            {/* <hr className="w-75 mb-3" style={{margin : 'auto'}} /> */}
            <ul className="d-flex flex-column gap-1" style={{listStyle : 'none'}}>{list.reverse().map(project => <Project key={project.name} props={props} project={project} index={index++} />)}</ul>
        </section>
    )
}

function Project({props, project, index}) {

    const navigate = useNavigate()

    const evenOrOdd = () => {
        let hover_class = 'project_link_'
        if (index % 2 === 0)
            hover_class += 'even'
        else
            hover_class += 'odd'
        return hover_class
    }

    return (
        <li type='button' onClick={() => navigate('/projects/' + project.id)} className={`rounded ps-3 pt-2 ${evenOrOdd()}`}>
            <h5 className="text-primary mb-0">{project.name}</h5>
            <p>({props.language.created} {project.date})</p>
            <p className="mb-0">{project.description}</p>
            <p className="d-flex gap-2">
                {project.languages.map(language => <Language language={language} />)}
            </p>
        </li>
    )

}

function Language({language}) {

    const getColor = () => {
        if (language === 'C++')
            return 'bg-danger'
        else if (language === 'C')
            return 'bg-danger-subtle'
        else if (language === 'HTML')
            return 'bg-warning'
        else if (language === 'Python')
            return 'bg-success'
        else if (language === 'Javascript')
            return 'bg-secondary'
        return 'bg-primary'
    }

    return (
        <span className="d-flex align-items-center gap-1">
            <img className={`rounded-circle ${getColor()}`} src="images/circle.svg" alt="" />
            {language}
        </span>
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