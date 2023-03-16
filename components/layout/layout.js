import Header from "./header";
import Footer from "./footer";
import Head from "next/head";

// localhost:3000/member/join

const Layout = ({children, menu,meta}) => {
    console.log('layout-',menu);

    const {title , description,icon}= meta;

    return (
        <>
        <Head>
            <link rel="stylesheet" href="/css/normalize.css" />
            <link rel="stylesheet" href="/css/main.css" />
            <link rel="stylesheet" href="/css/project2.css" />
            <script src="https://www.google.com/recaptcha/api.js" async defer></script>
            <title>{title}</title>
            <link rel="icon" href={icon||'/favicon.ico'} />
        </Head>

        <body>
        <div id="wrapper">
            <Header menu={menu} />
                {children}
            <Footer />
        </div>
        </body>
        </>
    );
}
/*헤더에 값 보내기  menu={menu}*/
export default Layout;