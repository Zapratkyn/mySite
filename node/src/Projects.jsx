import {Loading, Title} from "./Helpers"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

export function Projects({props}) {

    const [list, setList] = useState(undefined)

    useEffect(() => {
        if (!list) {
            setList('loading')
            fetch('/projects').then(response => {
                if (response.status === 200)
                    response.json().then(data => setList(data.data.sort((a, b) => b.id - a.id)))
            })
        }
    }, [list])

    if (!list || list === 'loading')
        return <Loading />

    let index = 0

    return (
        <section className="pe-2">
            <Title title={props.language.projects} />
            <ul className="d-flex flex-column gap-1" style={{listStyle : 'none'}}>
                {list.map(project => <Project key={project.name} props={props} project={project} index={index++} />)}
            </ul>
        </section>
    )
}

function Project({props, project, index}) {

    const evenOrOdd = () => {
        let hover_class = 'project_link_'
        if (index % 2 === 0)
            hover_class += 'even'
        else
            hover_class += 'odd'
        return hover_class
    }

    const startOnly = str => {
        if (str.length > 25) {
            str = str.substring(0, 22)
            str = str.concat('...')
        }
        return str
    }

    return (
        <li type='button' onClick={() => props.navigate('/project/' + project.id)} className={`rounded ps-3 pt-2 ${evenOrOdd()}`}>
            <h5 className="text-primary mb-0">{project.name}</h5>
            <p>({props.language.created} {project.creation_date})</p>
            <p className="mb-0">{startOnly(project['desc_' + props.language.language])}</p>
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
    const id = useParams().id

    useEffect(() => {
        if (!project) {
            setProject('loading')
            fetch('/projects/' + id).then(response => {
                if (response.status === 200)
                    response.json().then(data => setProject(data))
            })
        }
    }, [project, id])

    if (!project || project === 'loading')
        return <Loading />

    return (
        <section>
            <Title title={project.name} />
            {/* <img className="w-100 px-5" src="/images/sampleProject.jpg" alt="" /> */}
            <div className="fw-bold mt-3 ms-3"><pre>{project['desc_' + props.language.language]}</pre></div>
            {project.link !== '' && <p className="d-flex align-items-center">
                <a className="ms-3 text-black" target='_blank' rel='noreferrer' href={project.link} style={{textDecoration : 'underline dotted'}}>{props.language.seeOnGH}</a>
                <img src="/images/caret-right-small.svg" alt="" />
            </p>}
        </section>
    )

}