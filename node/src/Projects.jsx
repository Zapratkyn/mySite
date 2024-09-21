import {Loading, Title, format} from "./Helpers"
import { useState, useEffect } from "react"
import Cookies from 'js-cookie'
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
        </li>
    )

}

// function Language({language}) {

//     const getColor = () => {
//         if (language === 'C++')
//             return 'bg-danger'
//         else if (language === 'C')
//             return 'bg-danger-subtle'
//         else if (language === 'HTML')
//             return 'bg-warning'
//         else if (language === 'Python')
//             return 'bg-success'
//         else if (language === 'Javascript')
//             return 'bg-secondary'
//         return 'bg-primary'
//     }

//     return (
//         <span className="d-flex align-items-center gap-1">
//             <span className={`rounded-circle border border-black ${getColor()}`} style={{height : '10px', width : '10px'}}></span>
//             {language}
//         </span>
//     )

// }

export function ProjectPage({props}) {

    const [project, setProject] = useState(undefined)
    const [displayComments, setDisplayComments] = useState(false)
    const id = useParams().id
    const token = Cookies.get('csrftoken')

    let idInt = parseInt(id, 10)

    useEffect(() => {
        if (isNaN(idInt))
            setProject(-1)
        else if (!project) {
            setProject('loading')
            fetch('/projects/' + idInt).then(response => {
                if (response.status === 200)
                    response.json().then(data => setProject(data))
            })
        }
    }, [project, idInt])

    useEffect(() => {
        if (project && !(project < 1) && project !== 'loading')
            document.getElementById('projectDiv').innerHTML = format(project['desc_' + props.language.language])
    }, [props.language, project])

    const sendComment = () => {
        fetch('/projects/' + idInt + '/newComment', {
            method : 'POST',
            headers: {'X-CSRFToken': token},
            body : JSON.stringify({comment : document.getElementById('commentArea').value})
        }).then(response => {
            if (response.status !== 201)
                window.alert(props.language.somethingWentWrong)
            else {
                fetch('/projects/' + idInt + '/comments').then(response => {
                    if (response.status === 200)
                        response.json().then(data => setProject({...project, comments : data}))
                })
            }
        })
    }

    if (project < 0)
        return <h1>{props.language.noProject}</h1>

    else if (!project || project === 'loading')
        return <Loading />

    return (
        <section className="me-2">
            <Title title={project.name} />
            <div id='projectDiv' className="fw-bold mt-3 ms-3"></div>
            {project.link !== '' && <p className="d-flex align-items-center">
                <a className="ms-3 text-black" target='_blank' rel='noreferrer' href={project.link} style={{textDecoration : 'underline dotted'}}>{props.language.seeOnGH}</a>
                <img src="/images/caret-right-small.svg" alt="" />
            </p>}
            <div className="d-flex flex-column mb-2">
                <label className="h3" htmlFor="commentArea">{props.language.leaveAComment}</label>
                <textarea className="rounded" rows='5' name="commentArea" id="commentArea"></textarea>
                <div className="d-flex justify-content-center mt-2"><button onClick={sendComment} type='button' className="btn btn-secondary">{props.language.send}</button></div>
            </div>
            {project.comments.length > 0 && <ul className="list-group gap-2">{project.comments.map(comment => <Comment props={props} comment={comment} />)}</ul>}
        </section>
    )

}

function Comment({props, comment}) {

    useEffect(() => {
        document.getElementById('comment_' + comment.id).innerHTML = format(comment.content)
    }, [comment])

    return (
        <li className="fw-bold rounded border border-2 border-black list-group-item d-flex p-0" style={{minHeight : '100px'}}>
            <div className="d-flex flex-column align-items-center justify-content-center border-end" style={{width : '10%', minWidth : '60px'}}>
                <img src={comment.author.avatar} className="rounded-circle" style={{width : '50px', height : '50px'}} alt="" />
                <span>{comment.author.name}</span>
            </div>
            <div className="d-flex flex-column">
                <div id={'comment_' + comment.id} className="p-3" style={{width : '90%'}}></div>
                <div className="border-top ps-2 fw-light">{props.language.created + ' ' + comment.date}</div>
            </div>
        </li>
    )

}
