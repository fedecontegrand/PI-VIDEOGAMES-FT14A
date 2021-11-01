export default  function filterAndOrder(filters={},result=[]){
     
 if(result.length){
    // Order alphabetic:
    if(filters.order!=="rating" && filters.order!=="-rating" && filters.order!=="select"){
        result=result.sort(function(a, b){
            if(a.name < b.name) { return -1; }
            if(a.name > b.name) { return 1; }
            return 0;
        })    
        if(filters.order==='-name'){
            result=result.reverse()
        }
           
    }
    
    // Order by rating:
    if(filters.order!=="name" && filters.order!=="-name" && filters.order!=="select"){
            result=result.sort(function(a,b){
                return a.rating - b.rating;
        })
            if(filters.order==="-rating"){
                result=result.reverse()
        }
    }

   return result
 }

}