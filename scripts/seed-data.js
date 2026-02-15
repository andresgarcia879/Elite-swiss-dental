const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    console.log('Start seeding data...')

    // Specialties
    const specialtiesIn = [
        { name: 'Cosmetic Dentistry' },
        { name: 'Orthodontics' },
        { name: 'Implantology' },
        { name: 'General Dentistry' },
    ]

    console.log('Seeding Specialties...')
    const specialties = []
    for (const s of specialtiesIn) {
        const specialty = await prisma.specialty.create({
            data: s,
        })
        specialties.push(specialty)
    }

    // Doctors
    console.log('Seeding Doctors...')
    await prisma.doctor.create({
        data: {
            fullName: 'Dr. Sarah Schmidt',
            title: 'Senior Cosmetic Dentist',
            specialtyId: specialties[0].id, // Cosmetic
            education: 'University of Zurich',
            experience: 12,
            bio: 'Leading expert in veneers and smile makeovers with over a decade of experience in Swiss aesthetic dentistry.',
            imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop',
            isActive: true,
        },
    })

    await prisma.doctor.create({
        data: {
            fullName: 'Dr. Michael Weber',
            title: 'Orthodontic Specialist',
            specialtyId: specialties[1].id, // Orthodontics
            education: 'University of Bern',
            experience: 8,
            bio: 'Specializing in invisible aligners and complex orthodontic cases for both adults and children.',
            imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1964&auto=format&fit=crop',
            isActive: true,
        },
    })

    // Sample Message
    console.log('Seeding Message...')
    await prisma.contactMessage.create({
        data: {
            name: "Hans Muller",
            email: "hans@example.com",
            message: "I am interested in a consultation for veneers. Do you have availability next week?"
        }
    })

    console.log('Seeding finished.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
