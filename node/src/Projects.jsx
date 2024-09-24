import {Loading, Title, format, validateForm} from "./Helpers"
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

function GHLink({link, props}) {

    return (
        <p className="d-flex align-items-center mt-5">
            <a className="ms-3 text-black" target='_blank' rel='noreferrer' href={link} style={{textDecoration : 'underline dotted'}}>{props.language.seeOnGH}</a>
            <img src="/images/caret-right-small.svg" alt="" />
        </p>
    )

}

function NewCommentForm({props, id, project, setProject}) {

    const token = Cookies.get('csrftoken')

    const sendComment = () => {
        if (!validateForm([document.getElementById('commentArea')], 'form-control rounded'))
            return
        fetch('/projects/' + id + '/newComment', {
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

    return (
        <fieldset className="d-flex flex-column my-2">
            <label className="h3" htmlFor="commentArea">{props.language.leaveAComment}</label>
            <textarea className="form-control" rows='5' name="commentArea" id="commentArea"></textarea>
            <div className="mt-2">
                <button onClick={sendComment} type='button' className="btn btn-secondary">
                    {props.language.send}
                </button>
            </div>
        </fieldset>
    )
}

function DisplayCommentButton({props, length, displayComments, setDisplayComments}) {

    return (
        <p type='button' onClick={() => setDisplayComments(!displayComments)} className="d-flex gap-1 bg-secondary-subtle rounded ps-1 fw-bold mt-3" style={{width : '240px'}}>
            {props.language.displayComments + ' (' + length + ')'}
            <img src={displayComments ? '/images/caret-down-fill.svg' : "/images/caret-right-fill.svg"} alt="" />
        </p>
    )

}

export function ProjectPage({props}) {

    const [project, setProject] = useState(undefined)
    const [displayComments, setDisplayComments] = useState(false)
    const id = useParams().id

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

    if (project < 0)
        return <h1>{props.language.noProject}</h1>

    else if (!project || project === 'loading')
        return <Loading />

    return (
        <section className="me-2">
            <Title title={project.name} />
            <div id='projectDiv' className="fw-bold mt-3 ms-3"></div>
            {project.link !== '' && <GHLink link={project.link} props={props} />}
            {project.comments.length > 0 && 
                <DisplayCommentButton props={props} length={project.comments.length} displayComments={displayComments} setDisplayComments={setDisplayComments} />}
            {displayComments > 0 && 
                <ul className="list-group gap-2">
                    {project.comments.map(comment => <Comment key={comment.id} props={props} comment={comment} project={project} setProject={setProject} />)}
                </ul>}
            <NewCommentForm props={props} id={idInt} project={project} setProject={setProject} />
        </section>
    )

}

function Author({props, author}) {

    return (
        <div className="d-flex flex-column align-items-center border-end mt-3" style={{width : '10%', minWidth : '60px'}}>
            <img src={author.avatar} className="rounded-circle" style={{width : '50px', height : '50px'}} alt="" />
            <span type='button' className="text-primary" onClick={() => props.navigate('/profile/' + author.id)}>{author.name}</span>
        </div>
    )

}

function EditCommentForm({props, comment, setEdit, setCommentCopy, project, setProject}) {

    const token = Cookies.get('csrftoken')

    const date = () => {
        var result=""
        var d = new Date()
        result += d.getFullYear()+"/"+(d.getMonth()+1)+"/"+d.getDate() + 
                  " "+ d.getHours()+":"+d.getMinutes()+":"+
                  d.getSeconds()
        return result
    }

    const editComment = () => {
        if (!validateForm([document.getElementById('editComment_' + comment.id)], 'form-control w-100 rounded'))
            return
        document.getElementById('editCommentBtn_' + comment.id).disabled = true
        fetch('/projects/editComment/' + comment.id, {
            method : 'POST',
            headers: {'X-CSRFToken': token},
            body : JSON.stringify({comment : document.getElementById('editComment_' + comment.id).value})
        }).then(response => {
            if (response.status === 200) {
                document.getElementById('editCommentBtn_' + comment.id).disabled = false
                setEdit(false)
                setCommentCopy({
                    ...comment,
                    content : document.getElementById('editComment_' + comment.id).value,
                    edited : true,
                    date : date()
                })
            }
        })
    }

    const delComment = () => {
        if (window.confirm(props.language.areYouSure)) {
            document.getElementById('delCommentBtn_' + comment.id).disabled = true
            fetch('/projects/editComment/' + comment.id, {
                method : 'DELETE',
                headers: {'X-CSRFToken': token}
            }).then(response => {
                if (response.status === 200)
                    setProject({...project, comments : project.comments.filter(item => item.id !== comment.id)})
            })
        }
    }

    return (
        <fieldset>
            <textarea className="form-control" name={"editComment_" + comment.id} id={"editComment_" + comment.id} defaultValue={comment.content} style={{height : '200px'}}></textarea>
            <div className="d-flex gap-1 ms-2">
                <button id={'editCommentBtn_' + comment.id} onClick={editComment} type="button" className="btn btn-primary my-2">
                    {props.language.send}
                </button>
                <button id={'delCommentBtn_' + comment.id} onClick={delComment} type="button" className="btn btn-danger my-2">
                    {props.language.delete}
                </button>
                <button type='button' className="btn btn-secondary my-2" onClick={() => setEdit(false)}>{props.language.cancel}</button>
            </div>
        </fieldset>
    )
    
}

function DisplayResponseButton({props, displayResponses, setDisplayResponses, length}) {

    return (
        <span>
            <button onClick={() => setDisplayResponses(!displayResponses)} type="button" className="nav-link ms-2 text-primary text-decoration-underline">
                {(displayResponses ? props.language.hideAnswers : props.language.seeAnswers) + ' (' + length + ')'}
                <img src={displayResponses ? "/images/caret-down-fill-blue.svg" : "/images/caret-right-fill-blue.svg"} alt="" />
            </button>
        </span>
    )

}

function ResponseForm({props, id, comment, setComment}) {

    const token = Cookies.get('csrftoken')

    const sendResponse = () => {
        let input = document.getElementById('responseForm_' + id)
        if (!validateForm([input], "form-control w-75 mb-2"))
            return
        fetch('/projects/sendResponse/' + id, {
            method : 'POST',
            headers: {'X-CSRFToken': token},
            body : JSON.stringify({response : input.value})
        }).then(response => {
            if (response.status === 201) {
                input.value = ''
                response.json().then(data => setComment({...comment, responses : [...comment.responses, data.response]}))
            }
            else
                window.alert(props.language.somethingWentWrong)
        })
    }

    return (
        <div className="p-2">
            <label htmlFor={'responseInput_' + id}>{props.language.answer}</label>
            <textarea id={'responseForm_' + id} className="form-control w-75 mb-2" type="text" ></textarea>
            <span><button onClick={sendResponse} type="button" className="btn btn-primary">{props.language.send}</button></span>
        </div>
    )
    
}

function Response({props, response, index}) {

    useEffect(() => {
        document.getElementById('response_' + response.id).innerHTML = format(response.content)
    }, [response])

    return (
        <li className={`me-2 p-2 d-flex flex-column gap-2 ${index % 2 === 0 && 'bg-secondary-subtle'}`}>
            <span id={'response_' + response.id}>{response.content}</span>
            <div>
                {props.language.by + ' '}
                <span type='button' onClick={() => props.navigate('/profile/' + response.author.id)} className="text-primary">{response.author.name}</span>
                <span className="fw-light">{' ' + response.date}</span>
            </div>
        </li>
    )

}

function ResponseList({props, list}) {

    let index = 1

    return (
        <ul className="d-flex flex-column gap-1" style={{listStyle : 'none'}}>
            {list.map(response => <Response key={response.id} props={props} response={response} index={index++} />)}
        </ul>
    )

}

function Comment({props, comment, project, setProject}) {

    const [edit, setEdit] = useState(false)
    const [commentCopy, setCommentCopy] = useState(comment)
    const [displayResponses, setDisplayResponses] = useState(false)

    useEffect(() => {
        if (!edit)
            document.getElementById('comment_' + commentCopy.id).innerHTML = format(commentCopy.content)
    }, [commentCopy, edit])

    return (
        <li className="fw-bold rounded border border-2 border-black list-group-item d-flex p-0" style={{minHeight : '100px'}}>
            <Author props={props} author={commentCopy.author} />
            <div className="d-flex flex-column w-100">
                <div className="border-bottom ps-2 fw-light">
                    {(commentCopy.edited ? props.language.edited : props.language.created) + ' : ' + commentCopy.date}
                </div>
                {edit ?
                    <EditCommentForm props={props} comment={commentCopy} setEdit={setEdit} setCommentCopy={setCommentCopy} project={project} setProject={setProject} /> :
                    <div id={'comment_' + commentCopy.id} className="p-3 border-bottom mb-3" style={{width : '90%'}}></div>
                }
                {commentCopy.responses.length > 0 && 
                    <DisplayResponseButton props={props} displayResponses={displayResponses} setDisplayResponses={setDisplayResponses} length={commentCopy.responses.length} />}
                {displayResponses && <ResponseList props={props} list={commentCopy.responses} />}
                {props.myProfile && !edit && <ResponseForm props={props} id={comment.id} comment={commentCopy} setComment={setCommentCopy} />}
                {!edit && commentCopy.isMyComment && 
                    <img title={props.language.edit} type='button' onClick={() => setEdit(true)} className="editButton" src='/images/pencil-square.svg' alt=''></img>}
            </div>
        </li>
    )

}
