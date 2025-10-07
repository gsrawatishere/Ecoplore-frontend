
import ImageSlider from '../../Components/Home/ImageSlider';
import Marquee from '../../Components/Home/Marquee';
import Products from '../../Components/Home/Products';
import { CategoriesContainer } from './CategoriesContainer';
import CategoryProducts from './CategoryProducts';
import AboveFooter from '../../Components/Home/AboveFooter';
  

const Home = () => {
    return (
        <div className='bg-[#edf1f1]' >
            
            <CategoriesContainer/>
            <ImageSlider/>
             <CategoryProducts/>
             <Marquee/>
             <AboveFooter/>
      
        </div>
      )
}

export default Home;