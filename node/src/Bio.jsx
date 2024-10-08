import { useEffect, useState } from "react"
import { Loading, Title } from "./Helpers"

function Bio({props}) {

    const [bio, setBio] = useState(undefined)

    useEffect(() => {
        if (!bio) {
            setBio('loading')
            fetch('chat/getBio').then(response => {
                if (response.status === 200)
                    response.json().then(data => setBio(data))
            })
        }
    }, [bio])

    useEffect(() => {
        if (bio && bio !== 'loading')
            document.getElementById('bio').innerHTML = bio['bio_' + props.language.language].replace(/\n/g, '<br>')
    }, [bio, props.language])

    if (!bio || bio === 'loading')
        return <Loading />

    return (
        <section className="fw-bold">
            <Title title='Bio' />
            <div className="mx-3" id='bio'></div>
        </section>
    )
}

export default Bio