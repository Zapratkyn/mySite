import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useMediaQuery } from 'react-responsive'
import { Loading } from "./Helpers"

function Profile({props}) {

    const [profile, setProfile] = useState(undefined)
    const sm = useMediaQuery({query: '(max-width: 769px)'})
    const lg = useMediaQuery({query: '(min-width: 1350px)'})
    const picSize = (sm || lg) ? '150px' : '75px'
    const id = useParams().id

    let idInt = parseInt(id, 10)

    useEffect(() => {
        if (isNaN(idInt))
            setProfile(-1)
        else if (!profile || profile.id !== idInt) {
            setProfile('loading')
            fetch ('/profiles/' + idInt).then(response => {
                if (response.status === 200)
                    response.json().then(data => setProfile(data))
                else
                    setProfile(-1)
            })
        }
    }, [profile, idInt])

    if (profile < 0)
        return <h1>{props.language.noProfile}</h1>

    if (!profile || profile === 'loading')
        return <Loading />

    return (
        <section className={`d-flex gap-2 pe-2 ${sm && 'flex-column'}`}>
            <div className={`rounded border border-2 p-2 d-flex flex-column align-items-center gap-2 ${!sm && 'w-25'}`}>
                <img src="/images/default-avatar.jpg" className="rounded-circle" alt="" style={{height : picSize, width : picSize}} />
                <span className="h4 fw-bold">{profile.name}</span>
            </div>
            <div className={`rounded border border-success ${!sm && 'w-75'}`} style={{height : '200px'}}></div>
        </section>
    )
    
}

export default Profile