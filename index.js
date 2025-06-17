const express = require("express");
const app = express();
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

const { PrismaClient } = require("./generated/prisma");
const prisma = new PrismaClient();

app.use(express.json());

app.get("/", (req, res) => {
    res.send(`
        <html>
            <body>
                <h1>Welcome!</h1>
            </body>
        </html>
        
        `);
})

app.get("/pets", async (req, res) => {
    const pets = await prisma.pet.findMany();

    res.json(pets);
})

app.get("/pets/:id", async (req, res) => {

    const petId = Number(req.params.id);

    const pet = await prisma.pet.findUnique({
        where: {
            id: petId
        }
    })

    if (pet) {
        res.json(pet);
    } else {
        res.status(404).send("Pet not found");
    }
})

app.post("/pets", async (req, res) => {

    const { name, species, breed, age } = req.body;

    if (!name || !species || !breed || !age) {
        res.status(400).send("All fields are required");
    }
    
    await prisma.pet.create({
        data: {
            name: name,
            species: species,
            breed: breed,
            age: age
        }
    })

    res.status(201).send();
})

app.put("/pets/:id", async (req, res) => {

    const petId = Number(req.params.id);

    await prisma.pet.update({
        where: {
            id: petId
        },
        data: {
            ...req.body
        }
    })

    res.status(200).send();
})

app.delete("/pets/:id", async (req, res) => {

    const petId = Number(req.params.id);

    await prisma.pet.delete({
        where: {
            id: petId
        }
    })

    res.status(204).send();
})