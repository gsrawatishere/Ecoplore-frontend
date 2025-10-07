
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import img1 from "../../assets/Images/Slider Images/1.jpg";
import img2 from "../../assets/Images/Slider Images/2.jpg";
import img3 from "../../assets/Images/Slider Images/3.jpg";
import img4 from "../../assets/Images/Slider Images/4.jpg";
import img5 from "../../assets/Images/Slider Images/5.jpg";
import img6 from "../../assets/Images/Slider Images/6.jpg";
import img7 from "../../assets/Images/Slider Images/7.jpg";
import img8 from "../../assets/Images/Slider Images/8.jpg";
import img9 from "../../assets/Images/Slider Images/9.jpg";
import img10 from "../../assets/Images/Slider Images/10.jpg";



const images = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img9,
    img10
    
  ];
  
 
export default function ImageSlider() {
  return (
    <div className="px-4 sm:px-10 py-6 bg-[#edf1f1]">
      <div className="max-w-5xl mx-auto rounded-xl overflow-hidden">
      <Swiper
  modules={[Pagination, Autoplay, ]}
  pagination={{ clickable: true }}
  autoplay={{ delay: 3000, disableOnInteraction: false }}
  loop
  className="w-full aspect-video md:h-[400px] lg:h-[500px]"
   style={{
    "--swiper-theme-color": "#008236", // active bullet color
  }}
>
  {images.map((src, index) => (
    <SwiperSlide key={index}>
      <img
        src={src}
        alt={`Slide ${index + 1}`}
        className="w-full h-full  object-contain"
      />
    </SwiperSlide>
  ))}
</Swiper>
      </div>
    </div>
  );
}