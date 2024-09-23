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
            if (response.status === 201)
                response.json().then(data => setProject({...project, comments : [...project.comments, data.data]}))
            else
                window.alert(props.language.somethingWentWrong)
        })
        document.getElementById('commentArea').value = ''
    }

    if (project < 0)
        return <h1>{props.language.noProject}</h1>

    else if (!project || project === 'loading')
        return <Loading />

    return (
        <section className="me-2">
            <Title title={project.name} />
            <div id='projectDiv' className="fw-bold mt-3 ms-3"></div>
            {project.link !== '' && <p className="d-flex align-items-center mt-5">
                <a className="ms-3 text-black" target='_blank' rel='noreferrer' href={project.link} style={{textDecoration : 'underline dotted'}}>{props.language.seeOnGH}</a>
                <img src="/images/caret-right-small.svg" alt="" />
            </p>}
            {project.comments.length > 0 && <ul className="list-group gap-2">{project.comments.map(comment => <Comment key={comment.id} props={props} comment={comment} project={project} setProject={setProject} />)}</ul>}
            <div className="d-flex flex-column my-2">
                <label className="h3" htmlFor="commentArea">{props.language.leaveAComment}</label>
                <textarea className="rounded" rows='5' name="commentArea" id="commentArea"></textarea>
                <div className="d-flex justify-content-center mt-2"><button onClick={sendComment} type='button' className="btn btn-secondary">{props.language.send}</button></div>
            </div>
        </section>
    )

}

function Comment({props, comment, project, setProject}) {

    const [edit, setEdit] = useState(false)
    const [commentCopy, setCommentCopy] = useState(comment)
    const token = Cookies.get('csrftoken')

    useEffect(() => {
        if (!edit)
            document.getElementById('comment_' + commentCopy.id).innerHTML = format(commentCopy.content)
    }, [commentCopy])

    const date = () => {
        var result=""
        var d = new Date()
        result += d.getFullYear()+"/"+(d.getMonth()+1)+"/"+d.getDate() + 
                  " "+ d.getHours()+":"+d.getMinutes()+":"+
                  d.getSeconds()
        return result
    }

    const editComment = () => {
        document.getElementById('editCommentBtn_' + comment.id).disabled = true
        fetch('/projects/editComment/' + comment.id, {
            method : 'POST',
            headers: {'X-CSRFToken': token},
            body : JSON.stringify({comment : document.getElementById('editComment_' + commentCopy.id).value})
        }).then(response => {
            if (response.status === 200) {
                document.getElementById('editCommentBtn_' + comment.id).disabled = false
                setEdit(false)
                setCommentCopy({
                    ...comment,
                    content : document.getElementById('editComment_' + commentCopy.id).value,
                    edited : true,
                    date : date()
                })
            }
        })
    }

    const delComment = () => {
        if (window.confirm(props.language.areYouSure)) {
            fetch('/projects/editComment/' + commentCopy.id, {
                method : 'DELETE',
                headers: {'X-CSRFToken': token}
            }).then(response => {
                if (response.status === 200)
                    setProject({...project, comments : project.comments.filter(comment => comment.id !== commentCopy.id)})
            })
        }
    }

    return (
        <li className="fw-bold rounded border border-2 border-black list-group-item d-flex p-0" style={{minHeight : '100px'}}>
            <div className="d-flex flex-column align-items-center justify-content-center border-end" style={{width : '10%', minWidth : '60px'}}>
                <img src={commentCopy.author.avatar} className="rounded-circle" style={{width : '50px', height : '50px'}} alt="" />
                <span>{commentCopy.author.name}</span>
            </div>
            <div className="d-flex flex-column w-100">
                {edit ?
                <fieldset>
                    <textarea className="form-control" name={"editComment_" + commentCopy.id} id={"editComment_" + commentCopy.id} defaultValue={commentCopy.content} style={{height : '200px'}}></textarea>
                    <div className="d-flex gap-1 ms-2">
                        <button id={'editCommentBtn_' + commentCopy.id} onClick={editComment} type="button" className="btn btn-secondary my-2">
                            {props.language.send}
                        </button>
                        <button id={'delCommentBtn_' + commentCopy.id} onClick={delComment} type="button" className="btn btn-danger my-2">
                            {props.language.delete}
                        </button>
                    </div>
                </fieldset> :
                <div id={'comment_' + commentCopy.id} className="p-3" style={{width : '90%'}}></div>}
                <div className="border-top ps-2 fw-light">{(commentCopy.edited ? props.language.edited : props.language.created) + ' : ' + commentCopy.date}</div>
                {!edit && commentCopy.isMyComment && <img type='button' onClick={() => setEdit(true)} className="editButton" src='/images/pencil-square.svg' alt=''></img>}
            </div>
        </li>
    )

}
