window.addEventListener("DOMContentLoaded" ,() =>{
    "use strict"
    const moviesForm =getElement("form")
    const templateMovies = getElement("template").content
    const heroList =getElement(".hero-list")
    const categoryFilterSelect = getElement(".category-filter-select")
    const sortFilterSelect =getElement(".sort-filter-select")
    let kinolar =movies.slice(0 ,90)
    function handleRenderMovie(arr){
        if(arr?.length){
            heroList.innerHTML = null
            arr.map(function(item){
                let cloneMovie = templateMovies.cloneNode(true)
                let movieImage = cloneMovie.querySelector(" .movie-image")
                movieImage.src =item.bigPoster
                let movieName =cloneMovie.querySelector(".movie-name")
                movieName.textContent =item.title.split(" ").length > 3 ? item.title.split(" ").slice(0,3).join(" ")+"...":item.title
                let movieYear =cloneMovie.querySelector(".movie-year")
                movieYear.textContent = item.year
                let movieTrailer = cloneMovie.querySelector(".movie-trailer")
                movieTrailer.href = item.trailer
                heroList.appendChild(cloneMovie)


            })

        }

        
    }
    handleRenderMovie(kinolar)
    const sortObject ={
        az(a,b){
            if(a.title < b.title){
                return -1
            }else{
                return 1
            }
        },
        year(a,b){
            if(a.year < b.year){
                return -1
            }else{
                return 1
            }
        },
        rating(a,b){
            if(a.imdbRating < b.imdbRating){
                return 1
            }else{
                return -1
            }
        }
    }
    function handleSub(event){
        event.preventDefault()
        const data =new FormData(event.target)
        let filter =[]
        const rejex =new RegExp( data.get("search-movie"),"gi")
        
     
        if(categoryFilterSelect.value === "all"){
            filter = kinolar
        }else if(categoryFilterSelect.value !== "all"){
            filter =kinolar.filter(item => item.categories.includes(categoryFilterSelect.value))
        }
        if(data.get("search-movie").length){
            filter = filter.filter(item => item.title.match(rejex))
        }
        if(sortFilterSelect.value.length){
          filter = filter.sort(sortObject[sortFilterSelect.value])
        }

        
        handleRenderMovie(filter)
    }
    function handleFilterCategories(arr){
        let result =[]
        for(let i = 0; i<arr.length ;i++){
            let category = arr[i].categories
            for(let si = 0 ;si<arr.length ;si++){
                if(!result.includes(category[si])){
                    
                    result.push(category[si])
                }
            }
        }
            return result

        
    }
    function handleCreateOption(){
        let result = handleFilterCategories(kinolar)
        for(let i = 0 ;i<result.length; i++){
            let option = createTag("option")
            option.value =result[i]
            option.textContent =result[i]
            categoryFilterSelect.appendChild(option)

        }

    }
   
       
    handleCreateOption()

    moviesForm.addEventListener("submit" ,handleSub)
    
})