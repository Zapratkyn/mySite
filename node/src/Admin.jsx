import { Title } from "./Helpers"

function Admin({props}) {

    fetch('/backAdmin/').then(response => {
        console.log(response)
        response.json().then(data => console.log(data.message))
    })

    return (
        <Title title='Admin' />
    )

}

export default Admin