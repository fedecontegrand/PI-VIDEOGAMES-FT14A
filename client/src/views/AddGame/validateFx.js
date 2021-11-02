export default function validate(state){
    if(state.name.length===0){
       return alert("The game's name is needed")
    }
    if(!state.description){
        return alert("The game's description is needed.")
    }
    if(state.description.length<20){
        return alert("The game's description its to short")
    }
    if(state.rating && (0>state.rating || state.rating>5 )){
       return alert("The game's rating must be an integer value between 0 and 5")
    }
    if(state.platforms.length===0){
        return alert("The game's platforms are needed to upload your game!")
    }
    if(state.genres.length===0){
        return alert("The game's genres are needed to upload your game")
    }
    if(state.urlImage){
       if(!state.urlImage.match(/[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi)){
           return alert("The URL of game's image is invalid.")
       } else {return true}
    } 
    else {return true}
}