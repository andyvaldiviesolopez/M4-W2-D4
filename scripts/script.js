const booksContainer = document.querySelector(".books")
const booksCart = document.querySelector(".cart")
const cartDelete = document.querySelector(".cartButton")
const getBooks = async () => {
    try {
        const response = await fetch(`https://striveschool-api.herokuapp.com/books`)
        if (!response.ok) {
            throw new Error("Errore durante la ricezione dati")
        }
        const data = await response.json()
        console.log(data)
        generateCard(data)
    } catch (e) {
        console.log(e)
    }
}

const generateCard = (books) => {
    const deleteAllCart = document.createElement("button")
    deleteAllCart.classList.add("btn", "btn-danger")
    deleteAllCart.innerText = `Svuota il carrello`
    cartDelete.appendChild(deleteAllCart)

    books.forEach(book => {
        const card = document.createElement("div")
        card.classList.add("card", "col-sm-6", "col-md-4", "col-lg-3", "bg-light")
        const cardImg = document.createElement("img")
        cardImg.classList.add("img-fluid")
        cardImg.src = book.img

        const cardTitle = document.createElement("p")
        cardTitle.classList.add("card-title")
        cardTitle.innerText = `Titolo: ${book.title}`

        const cardCategory = document.createElement("p")
        cardCategory.classList.add("card-text")
        cardCategory.innerText = `Categoria: ${book.category}`

        const cardPrice = document.createElement("p")
        cardPrice.classList.add("card-text")
        cardPrice.innerText = `Prezzo: ${book.price}€`

        const saveButton = document.createElement("button")
        saveButton.classList.add("btn", "btn-outline-primary", "btns")
        saveButton.innerText = `Aggiungi al carrello`

        const deleteButton = document.createElement("button")
        deleteButton.classList.add("btn", "btn-outline-danger", "btns")
        deleteButton.innerText = `Nascondi`


        card.append(cardImg, cardTitle, cardCategory, cardPrice, saveButton, deleteButton)
        booksContainer.appendChild(card)

        saveButton.addEventListener("click", () => {
            const cardCart = document.createElement("div")
            cardCart.classList.add("card", "col-sm-6", "col-md-4", "col-lg-3")
            const cardImg = document.createElement("img")
            cardImg.classList.add("img-fluid")
            cardImg.src = book.img

            const cardTitle = document.createElement("p")
            cardTitle.classList.add("card-title")
            cardTitle.innerText = `Titolo: ${book.title}`

            const cardCategory = document.createElement("p")
            cardCategory.classList.add("card-text")
            cardCategory.innerText = `Categoria: ${book.category}`

            const cardPrice = document.createElement("p")
            cardPrice.classList.add("card-text")
            cardPrice.innerText = `Prezzo: ${book.price}€`

            const deleteOfCart = document.createElement("button")
            deleteOfCart.classList.add("btn", "btn-outline-danger")
            deleteOfCart.innerText = `Elimina dal carrello`

            cardCart.append(cardImg, cardTitle, cardCategory, cardPrice, deleteOfCart)
            booksCart.appendChild(cardCart)

            card.classList.add("bg-primary-subtle")

            deleteButton.disabled = true

            deleteOfCart.addEventListener("click", () => {
                cardCart.remove()
                card.classList.remove("bg-primary-subtle")
                deleteButton.disabled = false
            })

            deleteAllCart.addEventListener("click", () => {
                booksCart.innerHTML = ""
                card.classList.remove("bg-primary-subtle")
                deleteButton.disabled = false
            })
        })


        deleteButton.addEventListener("click", () => {
            card.remove()
        })
    })
    deleteAllCart.addEventListener("click", () => {
        cardCart.remove()
        card.classList.remove("bg-success-subtle")
        deleteButton.disabled = false
    })
}

getBooks().then(res => console.log(res))