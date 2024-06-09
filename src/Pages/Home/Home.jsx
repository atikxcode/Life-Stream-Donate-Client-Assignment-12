
import { Link } from 'react-router-dom';
import image from '../../assets/home_1_slider_1.webp'
import { Parallax } from 'react-parallax';
import Banner from '../Banner/Banner';
import Feature from '../Feature/Feature';
import ContactUs from '../ContactUs/ContactUs';

const Home = () => {
  return (

    <div className='mx-auto container'>
    <div className='flex flex-col my-16'>

    <Banner></Banner>

    <Feature></Feature>

    <ContactUs></ContactUs>

    
    </div>


    </div>
   



    
  );
};

export default Home;