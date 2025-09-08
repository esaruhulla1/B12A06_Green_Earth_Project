const CategoriesContainer = document.getElementById('categories-container')
const cardContainer = document.getElementById('card-container')

// All categories
const loadAllCategories = ()=>{
    fetch("https://openapi.programming-hero.com/api/plants")
    .then((res)=>res.json())
    .then((data)=>{
        showAllCategories(data.plants);
        
    })
}
const showAllCategories = (plants)=>{
    plants.forEach(plant=>{
        cardContainer.innerHTML +=`
                <div class="card bg-white  shadow-sm p-3 ">
                    <figure class="h-48 max-w-80">
                        <img class="" src="${plant.image}" />
                    </figure>
                    <div class="space-y-3">
                        <h2 class="font-semibold mt-2">${plant.name}</h2>
                        <p class="text-[#4c545f]  overflow-hidden text-ellipsis line-clamp-3">${plant.description}</p>
                        <div class="card-actions justify-between">
                            <div class="bg-[#dcfce7] text-[#15803d] rounded-xl p-1 px-3">${plant.category}</div>
                            <div class="font-bold">৳${plant.price}</div>
                        </div>
                        <button class="btn w-full rounded-2xl bg-[#15803d] text-white">Add to Cart</button>
                    </div>
                </div>
        `
        
    })
    
}
loadAllCategories()






//Categories
const loadCategories = ()=>{
    fetch('https://openapi.programming-hero.com/api/categories')
    .then((res)=>res.json())
    .then((data)=>{
        const categories = data.categories
        showCategories(categories)
    })
    .catch((err)=>{
        console.log(err);
        
    })
}
const showCategories = (categories)=>{
    categories.forEach(category => {
        CategoriesContainer.innerHTML +=`
                    <h2 class="p-1 pl-2 text-lg rounded-sm hover:bg-[#03a73f] hover:text-white cursor-pointer">${category.category_name}</h2>

        `  
    });
}
loadCategories()