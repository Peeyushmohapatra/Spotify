// import { reducerCases } from "../Utils/Constant"


export const reducer = (state={token:"",playlists:[],userInfo:null,selectedPlaylistId:"2XyKxftzu9eRsryDZYguRF",selectedPlayList:null,currentlyPlaying:null,playerState:false},action) => {
    if(action.type === "SET_TOKEN"){
        return {
            ...state,
            token:action.token
        }
    }
    else if(action.type === "SET_PLAYLISTS"){
        return {
            ...state,
            playlists:action.playlists
        }
    }
    else if(action.type === "SET_USER"){
        return {
            ...state,
            userInfo:action.userInfo
        }
    }
    else if(action.type === "SET_PLAYLIST"){
        return {
            ...state,
            selectedPlayList:action.selectedPlayList
        }
    }
    else if(action.type === "SET_PLAYING") {
        return {
            ...state,
            currentlyPlaying:action.currentPlaying
        }
    }
    else if(action.type === "SET_PLAYER_STATE"){
        return {
            ...state,
            playerState:action.playerState
        }
    }
    else if(action.type === "SET_PLAYLIST_ID"){
        return {
            ...state,
            selectedPlaylistId:action.selectedPlaylistId
        }
    }
    return state
}