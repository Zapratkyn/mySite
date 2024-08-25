import {Title} from "./Helpers"

function Bio({props}) {
    return (
        <section className="fw-bold">
            <Title title='Bio' />
            <div className="mx-3">
                <p>{props.language.bio1}</p>
                <p className="d-flex justify-content-center my-4"><img className="rounded-circle" src="pic.png" alt="" style={{height : '200px'}} /></p>
                <p>{props.language.bio2}</p>
                <p>{props.language.bio3}</p>
                <p>{props.language.bio4}</p>
                <p>{props.language.bio5}</p>
                <p>{props.language.bio6}</p>
                <p>{props.language.bio7}</p>
                <p>{props.language.bio8}</p>
                <p>{props.language.bio9}</p>
                <p>{props.language.bio10}</p>
            </div>
        </section>
    )
}

export default Bio