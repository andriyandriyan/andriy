import { CgSpinner } from '@react-icons/all-files/cg/CgSpinner';
import { MdFullscreen } from '@react-icons/all-files/md/MdFullscreen';
import { MdLink } from '@react-icons/all-files/md/MdLink';
import { HiArrowCircleLeft } from '@react-icons/all-files/hi/HiArrowCircleLeft';
import { HiArrowCircleRight } from '@react-icons/all-files/hi/HiArrowCircleRight';
import clsx from 'clsx';
import { FC, useState } from 'react';
import { Lazy } from 'swiper';
import { Swiper as SwiperReact, SwiperSlide, useSwiper } from 'swiper/react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import 'swiper/css';
import 'swiper/css/lazy';

const PrevButton = () => {
  const swiper = useSwiper();

  return (
    <button
      type="button"
      onClick={() => swiper.slidePrev()}
      className="opacity-0 group-hover:opacity-100 absolute z-10 transition-all left-2 top-1/2"
      aria-label="Previous slide"
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
      aria-label="Next slide"
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

  return (
    <ul className="absolute left-0 right-0 bottom-2 flex items-center justify-center gap-2 z-10">
      {Array.from(new Array(count).keys()).map(i => (
        <li key={i}>
          <button
            type="button"
            onClick={() => swiper.slideTo(i + 1)}
            className={clsx(
              'h-2 rounded-full transition-all',
              activeIndex === i ? 'bg-primary-500 w-6' : 'bg-primary-300 w-2'
            )}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={activeIndex === i ? 'true' : undefined}
          />
        </li>
      ))}
    </ul>
  );
}

interface SwiperProps {
  url?: string;
  title: string;
  images: string[];
}

const Swiper: FC<SwiperProps> = ({ url, title, images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [open, setOpen] = useState(false);

  return (
    <SwiperReact
      modules={[Lazy]}
      slidesPerView={1}
      loop
      className="group"
      onSlideChange={swiper => setActiveIndex(swiper.realIndex)}
      lazy={{
        enabled: true,
        preloaderClass: 'preloader',
      }}
      preloadImages={false}
    >
      {images.map((image, i) => (
        <SwiperSlide key={image}>
          <img
            data-src={image}
            className="w-[300px] h-[187.5px] md:w-[400px] md:h-[250px] swiper-lazy"
            alt={`${title} ${i + 1}`}
          />
          <div className="preloader absolute inset-0 flex items-center justify-center bg-white">
            <CgSpinner className="text-primary-500 animate-spin" size={40} />
          </div>
        </SwiperSlide>
      ))}
      {images.length > 1 && (
        <>
          <PrevButton />
          <NextButton />
          <Pagination count={images.length} activeIndex={activeIndex} />
        </>
      )}
      <div className="opacity-0 group-hover:opacity-100 absolute z-10 transition-all right-4 top-4 flex gap-2 py-1 px-3 bg-gray-50 rounded-full">
        {url && (
          <a
            href={url}
            target="_blank"
            aria-label="Open URL"
          >
            <MdLink className="text-primary-500" size={28} />
          </a>
        )}
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="View Fullscreen"
        >
          <MdFullscreen className="text-primary-500" size={28} />
        </button>
      </div>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={images.map((src, i) => ({ src, alt: `${title} ${i + 1}` }))}
      />
    </SwiperReact>
  );
};

export default Swiper;
