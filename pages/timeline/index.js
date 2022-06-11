import { AppLayout } from "../../components/AppLayout";
import Link from "next/link";
import '../../styles/Home.module.css'
export default function  TimeLine({userName}){
    return (
        <>
            <AppLayout>
                <h1>This is the timeline { userName }</h1>
                <Link href='/'> go home</Link>
            </AppLayout>
        </>
    )
};

TimeLine.getInitialProps = () => {
    return fetch( 'http://localhost:3000/api/hello' )
        .then( res => res.json() )
        .then( response => {
            const { userName } = response
            return {userName}
    })
}