import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, EffectFlip, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-flip';

const Banner = () => {
    return (
        <div className='container mx-auto mt-6 mb-6 sm:px-5'>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y, EffectFlip, Autoplay]}
                spaceBetween={50}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                effect="flip"
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                className='bg-transparent' // Ensure no background color is set here
            >
                <SwiperSlide>
                    <div className='relative'>
                        <img className='w-full h-[500px] rounded-lg' src="https://i.ibb.co/p4CGfth/environment-volunteer.jpg" alt="Environmental Cleanup" />
                        <div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-60 p-4">
                            <p className="text-center text-white text-2xl">
                                Join our environmental cleanup team and make a tangible difference in your community! Your help is needed to keep our parks clean.
                            </p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='relative'>
                        <img className='w-full h-[500px] rounded-lg' src="https://i.ibb.co/WvrBpgy/food-banking.jpg" alt="Food Bank Volunteering" />
                        <div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-60 p-4">
                            <p className="text-center text-white text-2xl">
                                Volunteer with our local food bank and help distribute meals to families in need. Your support can help fight hunger in our community.
                            </p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='relative'>
                        <img className='w-full h-[500px] rounded-lg' src="https://i.ibb.co/wz0nCs2/young-mentorship.jpg" alt="Youth Mentorship" />
                        <div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-60 p-4">
                            <p className="text-center text-white text-2xl">
                                Become a mentor for our youth programs. Share your skills and experiences to guide and inspire the next generation.
                            </p>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Banner;
