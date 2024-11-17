import React, { useState, createContext } from "react";
import Modal from 'react-modal';
import YouTube from 'react-youtube';
import PropTypes from "prop-types";

const opts = {
    height: '390',
    width: '640',
    playerVars: {
        autoplay: 1,
    },
};

const MovieContext = createContext();

const MovieProvider = ({ children }) => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [trailerUrl, setTrailerUrl] = useState('');

    const handleTrailer = async (id) => {
        try {
            const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
            const options = {
                method: 'GET',
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
                },
            };
            const movieTrailer = await fetch(url, options);
            const data = await movieTrailer.json();

            if (data.results.length > 0) {
                const videoId = data.results[0].key;
                setTrailerUrl(videoId);
                setIsOpen(true);
            } else {
                console.log("No trailer available");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleOnReady = (event) => {
        console.log("YouTube player is ready");
    };

    return (
        <MovieContext.Provider value={{ handleTrailer }}>
            {children}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setIsOpen(false)}
                style={{
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
                        zIndex: 1000,
                    },
                }}
                contentLabel="Example Modal"
            >
                {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} onReady={handleOnReady} />}
            </Modal>
        </MovieContext.Provider>
    );
};

MovieProvider.propTypes = {
    children: PropTypes.node.isRequired, // Kiểm tra children là một node React
};

export { MovieProvider, MovieContext };
