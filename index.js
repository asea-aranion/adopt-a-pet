const express = require("express");
const app = express();
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

app.use(express.json());

let pets = [
    {
        id: 0,
        name: "Fido",
        species: "Dog",
        breed: "Dalmatian",
        age: 3
    },
    {
        id: 1,
        name: "Millie",
        species: "Cat",
        breed: "Persian",
        age: 1
    },
    {
        id: 2,
        name: "Elise",
        species: "Dog",
        breed: "Cavalier King Charles Spaniel",
        age: 5
    }
]

app.get("/", (req, res) => {
    res.send(`
        <html>
            <body>
                <h1>Welcome!</h1>
            </body>
        </html>
        
        `);
})

app.get("/pets", (req, res) => {
    res.json(pets);
})

app.get("/pets/:id", (req, res) => {

    const petId = Number(req.params.id);

    const pet = pets.find(pet => pet.id === petId);

    if (pet) {
        res.json(pet);
    } else {
        res.status(404).send("Pet not found");
    }
})

app.post("/pets", (req, res) => {

    const { name, species, breed, age } = req.body;
    const newPet = {
        id: pets.length + 1,
        name: name,
        species: species,
        breed: breed,
        age: age
    }

    pets.push(newPet);

    res.status(201).json(newPet);
})

app.put("/pets/:id", (req, res) => {

    const petId = pets.findIndex(pet => pet.id === Number(req.params.id));

    if (petId !== -1) {
        pets[petId] = {
            ...pets[petId],
            ...req.body
        }
        res.json(pets[petId]);
    } else {
        res.status(404).send("Pet not found");
    }
})

app.delete("/pets/:id", (req, res) => {

    const petId = Number(req.params.id);

    pets = pets.filter(pet => pet.id !== petId);

    res.status(204).send();
})