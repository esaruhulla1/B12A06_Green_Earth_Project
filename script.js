const CategoriesContainer = document.getElementById('categories-container')
const cardContainer = document.getElementById('card-container')
const addToCardContainer = document.getElementById('add-to-card-container')

// All defould card
const loadAllCard = () => {
    fetch("https://openapi.programming-hero.com/api/plants")
        .then((res) => res.json())
        .then((data) => {
            showAllCard(data.plants);

        })
        .catch((err => {
            console.log(err);

        }))
}
const showAllCard = (plants) => {
    cardContainer.innerHTML = ""
    plants.forEach(plant => {
        cardContainer.innerHTML += `
                <div class="card bg-white  shadow-sm p-3 ">
                    <figure class="h-96 md:h-48 object-cover">
                        <img class="" src="${plant.image}" />
                    </figure>
                    <div class="space-y-3">
                        <h2 onclick="loadPlantsDetail(${plant.id})"  class="cursor-pointer card-title font-semibold mt-2">${plant.name}</h2>
                        <p class="text-[#4c545f]  overflow-hidden text-ellipsis line-clamp-3">${plant.description}</p>
                        <div class="card-actions justify-between">
                            <div class="bg-[#dcfce7] text-[#15803d] rounded-xl p-1 px-3">${plant.category}</div>
                            <div class="font-bold">৳${plant.price}</div>
                        </div>
                        <button onclick="addToCart('${plant.name}', ${plant.price})" class="btn w-full rounded-2xl bg-[#15803d] text-white">Add to Cart</button>
                    </div>
                </div>
        `

    })

}
loadAllCard()


//Categories
const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/categories')
        .then((res) => res.json())
        .then((data) => {
            const categories = data.categories
            showCategories(categories)
        })
        .catch((err) => {
            console.log(err);
        })

}
const showCategories = (categories) => {
    categories.forEach(category => {
        CategoriesContainer.innerHTML += `
                    <h2 id="categoryItem${category.id}" onclick="loadCardByCategory(${category.id})" class="category-items p-1 pl-2 text-lg rounded-sm hover:bg-[#03a73f] hover:text-white cursor-pointer">${category.category_name}</h2>

        `
    });
}
loadCategories()


const removeActive = () => {
    const categoryItems = document.querySelectorAll(".category-items")
    categoryItems.forEach(item => {
        item.classList.remove("active")
    })
}
//card by Category
const loadCardByCategory = (id) => {
    fetch(`https://openapi.programming-hero.com/api/category/${id}`)
        .then(res => res.json())
        .then(data => {
            removeActive();
            const clickcategoryItem = document.getElementById(`categoryItem${id}`)
            clickcategoryItem.classList.add('active');

            showCardByCategory(data.plants)
        })
        .catch((err => {
            console.log(err);
        }))
}
const showCardByCategory = (plants) => {
    cardContainer.innerHTML = ""
    plants.forEach((plant) => {
        cardContainer.innerHTML += `
                <div class="card bg-white  shadow-sm p-3 ">
                    <figure class="h-96 md:h-48 object-cover">
                        <img class="" src="${plant.image}" />
                    </figure>
                    <div class="space-y-3">
                        <h2 onclick="loadPlantsDetail(${plant.id})"  class="cursor-pointer card-title font-semibold mt-2">${plant.name}</h2>
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


// modal
const loadPlantsDetail = (id) => {
    fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
        .then((res) => res.json())
        .then(data => {
            showPlantsDetail(data.plants);
        })


}
const showPlantsDetail = (plant) => {
    const detailsContainer = document.getElementById("details-container")
    detailsContainer.innerHTML = `
                            <h1 class="text-3xl font-bold">${plant.name}</h1>
                            <img class="w-full h-72 object-cover rounded-xl" src="${plant.image}" alt="">
                            <h2 class="text-xl font-bold">Category: <span class="text-base font-normal">${plant.category}</span></h2>
                            <h2 class="text-xl font-bold">Price: <span class="text-base font-normal">$${plant.price}</span></h2>
                            <h2 class="text-xl font-bold">Description: <span class="text-base font-normal">${plant.description}</span></h2>
    `
    document.getElementById("plant_modal").showModal();
}

// add to card
const addToCart = (name, price) => {

    item = document.createElement("div");
    item.classList.add("p-2");
    item.innerHTML = `
                    <div class="bg-[#F0FDF4] rounded-xl flex justify-between items-center pl-2 pr-2">
                        <div>
                            <h2 class="text-lg font-bold">${name}</h2>
                            <h3>$<span>${price}</span> × 1</h3>
                        </div>
                        <span>❌</span>
                    </div>
                
    `;
    addToCardContainer.appendChild(item);

}