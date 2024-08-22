import { useEffect, useState } from "react"
import Title from "./Helpers"

function Home({props}) {

    const [test, setTest] = useState(undefined)

    useEffect(() => {
        if (!test) {
            fetch("/profiles/").then(response => {
                if (response.status === 200) {
                    response.json().then(data => {
                        console.log(data)
                        setTest(data)
                    })
                }
                else
                    setTest({details : 'failure'})
            })
        }
    }, [test])

    if (!test)
        return undefined

    return (
        <section className="pe-2 bg">
           <Title title={props.language.home} />
           <p>{test.message}</p>
        </section>
    )
}

export default Home