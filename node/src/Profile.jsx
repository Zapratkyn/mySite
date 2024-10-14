import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useMediaQuery } from 'react-responsive'
import { Loading } from "./Helpers"
import { Modal } from "react-bootstrap"
import Cookies from 'js-cookie'

function Profile({props}) {

    const [profile, setProfile] = useState(undefined)
    const [displayAvatarUpload, setDisplayAvatarUpload] = useState(false)
    const [avatar, setAvatar] = useState(undefined)
    const sm = useMediaQuery({query: '(max-width: 769px)'})
    const lg = useMediaQuery({query: '(min-width: 1350px)'})
    const picSize = (sm || lg) ? '150px' : '75px'
    const id = useParams().id
    const token = Cookies.get('csrftoken')

    let idInt = parseInt(id, 10)

    useEffect(() => {
        if (!isNaN(idInt) && (!profile || (profile !== 'loading' && profile !== -1 && profile.id !== idInt))) {
            setProfile('loading')
            fetch ('/profiles/' + idInt).then(response => {
                if (response.status === 200)
                    response.json().then(data => setProfile(data))
                else
                    setProfile(-1)
            })
        }
    }, [profile, idInt])

    if (isNaN(idInt) || profile < 0)
        return <h1>{props.language.noProfile}</h1>

    if (!profile || profile === 'loading')
        return <Loading />

    const uploadAvatar = () => {
        const data = new FormData()
        data.set('avatar', document.getElementById('uploadAvatarBtn').files[0])
        fetch('/profiles/setAvatar', {
            method : 'POST',
            headers: {'X-CSRFToken': token},
            mode : 'same-origin',
            body : data
        }).then(response => {
            if (response.status === 200) {
                response.json().then(avatar => {
                    console.log(avatar)
                    setProfile({...profile, avatar : avatar.data})
                    setDisplayAvatarUpload(false)
                })
            }
            else
                window.alert(props.language.somethingWentWrong)
        })
    }

    console.log(profile)

    return (
        <section className={`d-flex gap-2 pe-2 ${sm && 'flex-column'}`}>
            <div className={`rounded border border-2 p-2 d-flex flex-column align-items-center gap-2 position-relative ${!sm && 'w-25'}`}>
                <img src={profile.avatar} className="rounded-circle" alt="" style={{height : picSize, width : picSize}} />
                <span className="h4 fw-bold">{profile.name}</span>
                {props.myProfile && props.myProfile.id === idInt && <img type='button' onClick={() => setDisplayAvatarUpload(true)} src="/images/pencil-square.svg" alt="" className="position-absolute bg-white" style={{top : '10px', right : '10px'}} />}
                <Modal show={displayAvatarUpload} onHide={() => setDisplayAvatarUpload(false)} centered>
                    <Modal.Header>
                      <Modal.Title className='w-100 d-flex justify-content-center'>
                          <span className="d-flex justify-content-center fw-bold">{props.language.modifyAvatar}</span>
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {avatar && 
                        <div className="d-flex flex-column align-items-center gap-2 mb-2">
                            <img className="rounded-circle" src={avatar} alt="" style={{height : picSize, width : picSize}} />
                            <span>{props.language.avatarOkay}</span>
                            <button onClick={uploadAvatar} type='button' className="btn btn-success">{props.language.yes}</button>
                        </div>}
                        <div className="d-flex justify-content-center">
                            <button type="button" className="btn btn-secondary" onClick={() => document.getElementById('uploadAvatarBtn').click()}>
                                {props.language.chooseFile}
                            </button>
                        </div>
                        <input onChange={e => setAvatar(URL.createObjectURL(e.target.files[0]))} id='uploadAvatarBtn' type="file" accept="image/*" hidden />
                    </Modal.Body>
                </Modal>
            </div>
            <div className={`rounded border border-success ${!sm && 'w-75'}`} style={{height : '200px'}}></div>
        </section>
    )
    
}

export default Profile