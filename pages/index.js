import Layout from "../components/layout/layout";

export default function Home() {
    return (
        <main>
            <img src="/img/smile.png" alt="메인이미지" className="logo" />
        </main>
    )
}

Home.getLayout=(page)=>(
    <Layout meta={{title:'index'}}>
        {page}
    </Layout>

)



