import { useState } from "react";
import PropTypes from "prop-types";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Modal from 'react-modal';
import YouTube from 'react-youtube';


const opts = {
    height: '390',
    width: '640',
    playerVars: {
        autoplay: 1,
    },
};

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 10
    },
    desktop: {
        breakpoint: { max: 3000, min: 1200 },
        items: 7
    },
    tablet: {
        breakpoint: { max: 1200, min: 600 },
        items: 3
    },
    mobile: {
        breakpoint: { max: 600, min: 0 },
        items: 1
    }
};

export default function MovieList({ title, data }) {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [trailerUrl, setTrailerUrl] = useState('');

    const handleTrailer = async (id) => {
        try {
            const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`
            const options = {
                method: 'GET',
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
                }
            }
            const movieTrailer = await fetch(url, options);
            const data = await movieTrailer.json();

            // Lấy trailer ID và set URL cho YouTube video
            if (data.results.length > 0) {
                const videoId = data.results[0].key; // Thường trailer đầu tiên là video chính
                setTrailerUrl(videoId);
                setIsOpen(true);
            } else {
                console.log("No trailer available");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleOnReady = (event) => {
        // Khi video đã sẵn sàng
        console.log("YouTube player is ready");
    };

    return (
        <div className='text-white p-10 mb-10'>
            <h2 className='uppercase text-xl font-bold mb-4'>{title}</h2>
            <Carousel responsive={responsive} className='flex items-center space-x-4'>
                {data.length > 0 && data.map((item) => (
                    <div key={item.id}
                        className='w-[200px] h-[300px] relative group' onClick={() => handleTrailer(item.id)}>
                        <div className='group-hover:scale-105 duration-500 ease-in-out w-full h-full cursor-pointer'>
                            <div className='absolute top-0 left-0 w-full h-full bg-black/40'></div>
                            <img src={`${import.meta.env.VITE_IMG_URL}${item.poster_path}`}
                                alt={item.title} className='w-full h-full object-cover' />
                            <div className='absolute bottom-4 left-2'>
                                <p className='uppercase text-md'>{item.title || item.original_title}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setIsOpen(false)}
                style={
                    {
                        overlay: {
                            position: "fixed",
                            zIndex: 10000,
                        },
                        content: {
                            top: '50%',
                            left: '50%',
                            right: 'auto',
                            bottom: 'auto',
                            marginRight: '-50%',
                            transform: 'translate(-50%, -50%)',
                            zIndex: 1000
                        }
                    }}
                
                
                contentLabel="Example Modal"
            >
                {/* Hiển thị video trailer từ URL */}
                {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} onReady={handleOnReady} />}
            </Modal>
        </div>
    )
}

MovieList.propTypes = {
    title: PropTypes.string,
    data: PropTypes.array
};
