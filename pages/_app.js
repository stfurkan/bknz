import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/index.css';

Router.events.on('routeChangeStart', url => {
  // console.log(`Loading: ${url}`);
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  //bg-gray-200
  return (
    <div className='flex flex-col h-screen justify-between'>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta charSet='utf-8' />
        <meta
          name='description'
          content="Ekşi Sözlük'te bulunan bakınızları ve başlıkları listeleyen açık kaynak kodlu bir proje"
        />

        <meta name='twitter:card' content='summary' key='twcard' />
        <meta name='twitter:creator' content='@bknzorg' key='twhandle' />

        <meta property='og:url' content='https://bknz.org' key='ogurl' />
        <meta property='og:image' content='/bknz.png' key='ogimage' />
        <meta property='og:site_name' content='bknz.org' key='ogsitename' />
        <meta property='og:title' content='bknz.' key='ogtitle' />
        <meta
          property='og:description'
          content="Ekşi Sözlük'te bulunan bakınızları ve başlıkları listeleyen açık kaynak kodlu bir proje"
          key='ogdesc'
        />
        <title>bknz.</title>

        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <div className='container mx-auto my-8 flex-1'>
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  );
}

export default MyApp;
