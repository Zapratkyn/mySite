import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {Title} from "./Helpers"

export function Projects({props}) {

    const [list, setList] = useState(undefined)
    
    /*
    Dans le back, renvoyer la liste déjà reversed
    Sinon, le reverse ne fonctionne pas quand props.language === 'fr'
    */

    useEffect(() => {
        if (!list) {
            fetch('/json/projects.json').then(response => response.json().then(data => setList(data)))
        }
    })

    if (!list)
        return list

    let index = 0

    return (
        <section className="pe-2">
            <Title title={props.language.projects} />
            <ul className="d-flex flex-column gap-1" style={{listStyle : 'none'}}>
                {list.reverse().map(project => <Project key={project.name} props={props} project={project} index={index++} />)}
            </ul>
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
        <li type='button' onClick={() => navigate('/project/' + project.id)} className={`rounded ps-3 pt-2 ${evenOrOdd()}`}>
            <h5 className="text-primary mb-0">{project.name}</h5>
            <p>({props.language.created} {project.date})</p>
            <p className="mb-0">{project.description}</p>
            <p className="d-flex gap-2">
                {project.languages.map(language => <Language key={language} language={language} />)}
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
            <span className={`rounded-circle border border-black ${getColor()}`} style={{height : '10px', width : '10px'}}></span>
            {language}
        </span>
    )

}

export function ProjectPage({props}) {

    const [project, setProject] = useState(undefined)
    // const id = useParams().id

    useEffect(() => {
        if (!project) {
            fetch('/json/sampleProject.json').then(response => {
                if (response.status === 404)
                    setProject(<h1>{props.language.noProject}</h1>)
                else
                    response.json().then(data => setProject(data))
            })
        }
    })

    const getLanguage = () => {
        if (props.language.home === 'Home')
            return 'en'
        return 'fr'
    }

    if (!project)
        return undefined

    return (
        <section>
            <Title title={project.name} />
            <img className="w-100 px-5" src="/images/sampleProject.jpg" alt="" />
            <p className="fw-bold mt-3 ms-3">{project['description_' + getLanguage()]}</p>
            <p className="d-flex align-items-center">
                <a className="ms-3 text-black" href={project.link} style={{textDecoration : 'underline dotted'}}>{props.language.seeOnGH}</a>
                <img src="/images/caret-right-small.svg" alt="" />
            </p>
        </section>
    )

}