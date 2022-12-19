import clsx from 'clsx';
import { FC, useState } from 'react';
import { HiArrowCircleLeft, HiArrowCircleRight } from 'react-icons/hi';
import { Swiper as SwiperReact, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css';

const PrevButton = () => {
  const swiper = useSwiper();

  return (
    <button
      type="button"
      onClick={() => swiper.slidePrev()}
      className="opacity-0 group-hover:opacity-100 absolute z-10 transition-all left-2 top-1/2"
    >
      <HiArrowCircleLeft className="text-primary-500" size={24} />
    </button>
  );
};

const NextButton = () => {
  const swiper = useSwiper();

  return (
    <button
      type="button"
      onClick={() => swiper.slideNext()}
      className="opacity-0 group-hover:opacity-100 absolute z-10 transition-all right-2 top-1/2"
    >
      <HiArrowCircleRight className="text-primary-500" size={24} />
    </button>
  );
};

interface PaginationProps {
  count: number;
  activeIndex: number;
}

const Pagination: FC<PaginationProps> = ({ count, activeIndex }) => {
  const swiper = useSwiper();

  if (!count) {
    return null;
  }

  return (
    <ul className="absolute left-1/2 bottom-2 flex items-center justify-center gap-2 z-10">
      {Array.from(new Array(count).keys()).map(i => (
        <li key={i}>
          <button
            type="button"
            onClick={() => swiper.slideTo(i)}
            className={clsx(
              'h-2 rounded-full transition-all',
              activeIndex === i ? 'bg-primary-500 w-6' : 'bg-primary-300 w-2'
            )}
          />
        </li>
      ))}
    </ul>
  );
}

interface SwiperProps {
  images: string[];
}

const Swiper: FC<SwiperProps> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <SwiperReact
      slidesPerView={1}
      loop
      className="group"
      onSlideChange={swiper => setActiveIndex(swiper.realIndex)}
    >
      <PrevButton />
      {images.map(image => (
        <SwiperSlide key={image}>
          <img src={image} className="w-[300px] h-[187.5px] md:w-[400px] md:h-[250px]" />
        </SwiperSlide>
      ))}
      <NextButton />
      <Pagination count={images.length} activeIndex={activeIndex} />
    </SwiperReact>
  );
};

export default Swiper;
