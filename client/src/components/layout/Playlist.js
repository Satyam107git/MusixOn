import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadPlaylist, setPlaylistCheck } from "../../actions/playlist";
import { setSongs } from "../../actions/play";
import MusicPlayer from "./MusicPlayer";
import { setQueueCheck } from "../../actions/queue";
import Song from "./Song";
import { useNavigate } from "react-router-dom";

const Playlist = ({
  playlistSongs,
  loadPlaylist,
  setSongs,
  playlistCheck,
  setPlaylistCheck,
  setQueueCheck,
}) => {
  useEffect(() => {
    setSongs([]);
    loadPlaylist();
  }, []);

  useEffect(() => {
    setSongs(playlistSongs);
    setPlaylistCheck(true);
    setQueueCheck(false);
  }, [playlistSongs]);

  const navigate = useNavigate();
  console.log(playlistSongs);

  const handleSharePlaylist = () => {
    navigate("/share");
  };

  return (
    <div>
      <div class="relative h-80 bg-white rounded-lg shadow-lg   mb-4">
        <div class="absolute inset-0 rounded-lg overflow-hidden bg-[#0f052c]  ">
          <img src="./assets/playlist-bg.jpg" alt="" className=" mx-auto h-80 " />
        </div>
        <div class="absolute inset-0 backdrop backdrop-blur-10 bg-gradient-to-b from-transparent to-purple"></div>

        <div class="absolute flex space-x-6 transform translate-x-6 translate-y-48">
          <div class="w-36 h-36 rounded-lg shadow-lg overflow-hidden">
            <img
              src="./assets/myPlaylist.jpg"
              alt="My playlist"
              className="h-40 w-40"
            />
          </div>

          <div class="text-white pt-10">
            {/* <h3 class="font-bold text-3xl">{values.attributes?.name}</h3> */}
            <h3 class="font-bold text-3xl opacity-60">My playlist</h3>

            <div class="mt-6 text-gray-400">
              <div class="flex  space-x-2 text-xs">
                <svg
                  class="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
                  <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <button onClick={handleSharePlaylist} class="absolute right-8 inline-flex items-center justify-center p-0.5 translate-y-60 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
          <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-brown  dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Share
          </span>
        </button>
      </div>
      <Song />
     
    </div>
  );
};

Playlist.propTypes = {
  playlistSongs: PropTypes.array.isRequired,
  loadPlaylist: PropTypes.func.isRequired,
  setSongs: PropTypes.func.isRequired,
  playlistCheck: PropTypes.bool.isRequired,
  setPlaylistCheck: PropTypes.func.isRequired,
  setQueueCheck: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  playlistSongs: state.playlist.playlistSongs,
  playlistCheck: state.playlist.playlistCheck,
});

export default connect(mapStateToProps, {
  loadPlaylist,
  setSongs,
  setPlaylistCheck,
  setQueueCheck,
})(Playlist);
