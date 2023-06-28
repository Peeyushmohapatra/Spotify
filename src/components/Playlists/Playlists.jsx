import React, { useEffect } from "react";
import "./Playlists.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Playlists = () => {
  const dispatch = useDispatch();
  const {token,playlists,selectedPlaylistId} = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    const getPlaylistData = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/playlists",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      const { items } = response.data;
      const playlists = items.map(({ name, id }) => {
        return { name, id };
      });
      // console.log(playlists);
      dispatch({ type:"SET_PLAYLISTS", playlists:playlists });
    };
    getPlaylistData();
  }, [token, dispatch]);


  const changeCurrentPlaylist = (selectedPlaylistId) => {
    dispatch({
      type:"SET_PLAYLIST_ID",
      selectedPlaylistId:selectedPlaylistId
    })
  }
  return <div className="playlistContainer">
    <ul>
      {
        playlists.map(({name,id}) => {
          return (
            <>
            <li key={id} onClick={() => {
              changeCurrentPlaylist(id)
            }}>{name}</li>
            </>
          )
        })
      }
    </ul>
  </div>;
};

export default Playlists;
