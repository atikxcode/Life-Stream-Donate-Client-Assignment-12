
import { Link } from 'react-router-dom';
import image from '../../assets/home_1_slider_1.webp'
import { Parallax } from 'react-parallax';
import Banner from '../Banner/Banner';
import Feature from '../Feature/Feature';
import ContactUs from '../ContactUs/ContactUs';
import { Helmet } from 'react-helmet';

const Home = () => {
  return (

    <div className='mx-auto container'>
      <Helmet>
      <meta charSet="utf-8" />
      <title>Home - Life Stream Donate</title>

      </Helmet>
    <div className='flex flex-col my-16'>

    <Banner></Banner>

    <Feature></Feature>

    <ContactUs></ContactUs>

    
    </div>


    </div>
   



    
  );
};

export default Home;