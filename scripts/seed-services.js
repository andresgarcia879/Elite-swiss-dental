const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const services = {
    "Cosmetic Dentistry": [
        { name: "Porcelain Veneers", duration: 90, price: 1500 },
        { name: "Teeth Whitening", duration: 60, price: 400 },
        { name: "Smile Makeover", duration: 120, price: 3000 },
    ],
    "Implantology": [
        { name: "Single Tooth Implant", duration: 120, price: 2500 },
        { name: "All-on-4 Implants", duration: 240, price: 15000 },
        { name: "Bone Grafting", duration: 90, price: 800 },
    ],
    "Orthodontics": [
        { name: "Invisalign Consultation", duration: 45, price: 100 },
        { name: "Ceramic Braces", duration: 60, price: 5000 },
    ],
    "General Dentistry": [
        { name: "Dental Hygiene", duration: 60, price: 150 },
        { name: "Root Canal Therapy", duration: 90, price: 800 },
        { name: "Emergency Care", duration: 45, price: 200 },
    ]
}

async function main() {
    console.log('Seeding services...')

    const specialties = await prisma.specialty.findMany()

    for (const specialty of specialties) {
        const specialtyServices = services[specialty.name] || []

        for (const serviceData of specialtyServices) {
            // Check if exists
            const existing = await prisma.service.findFirst({
                where: { name: serviceData.name, specialtyId: specialty.id }
            })

            if (!existing) {
                await prisma.service.create({
                    data: {
                        ...serviceData,
                        specialtyId: specialty.id
                    }
                })
                console.log(`Created service: ${serviceData.name}`)
            }
        }
    }
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
