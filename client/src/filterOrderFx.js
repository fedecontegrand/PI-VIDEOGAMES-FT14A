export default function filterAndOrder(filters={},result=[]){

    // Filter by who added the game:
    if(filters.user==="user") result=result.filter(game=>game.author==="user")
    
    // Filter by genre:
    if(filters.genres!=="Any"){
        let result2=[]
        for(let i=0;i<result.length;i++){
            let hasTheGenre=false
            for(let j=0;j<result[i].genres.length;j++){
                if(result[i].genres[j].name===filters.genres){
                   hasTheGenre=true
                }
            }
            if(hasTheGenre) result2.push(result[i])
        }
            result=result2
    }
    
    // Order alphabetic:
    if(filters.alphOrder!=="Select"){
        result=result.sort(function(a, b){
            if(a.name < b.name) { return -1; }
            if(a.name > b.name) { return 1; }
            return 0;
        })    
        if(filters.alphOrder==='Z-A'){
            result=result.reverse()
        }
           
    }
    
    // Order by rating:
    if(filters.ratingOrder!=="Select"){
            result=result.sort(function(a,b){
                return a.rating - b.rating;
        })
            if(filters.ratingOrder==="desc"){
                result=result.reverse()
        }
    }
    return result
}