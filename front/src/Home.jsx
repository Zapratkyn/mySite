import Title from "./Helpers"

function Home({props}) {
    return (
        <section className="pe-2">
           <Title title={props.language.home} />
        </section>
    )
}

export default Home