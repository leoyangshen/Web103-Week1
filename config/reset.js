import { pool } from './database.js'

const createLaunchesTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS rocket_launches;

        CREATE TABLE IF NOT EXISTS rocket_launches (
            id SERIAL PRIMARY KEY,
            mission_name VARCHAR(255) NOT NULL,
            date VARCHAR(255) NOT NULL,
            location VARCHAR(255) NOT NULL,
            mission_type VARCHAR(255) NOT NULL,
            image_url VARCHAR(255)
        );
    `
    try {
        const res = await pool.query(createTableQuery)
        console.log('🎉 rocket_launches table created successfully')
    } catch (err) {
        console.error('⚠️ error creating rocket_launches table', err)
    }
}

const seedLaunchesTable = async () => {
    await createLaunchesTable()

    // Example rocket launch data
    const launchData = [
        { mission_name: 'Falcon 9 Test Flight', date: '2010-06-04', location: 'Cape Canaveral', mission_type: 'Orbital Test' },
        { mission_name: 'Dragon C1', date: '2010-12-08', location: 'Cape Canaveral', mission_type: 'ISS Resupply' },
        { mission_name: 'Falcon Heavy Maiden Flight', date: '2018-02-06', location: 'Kennedy Space Center', mission_type: 'Orbital Test' },
	{ mission_name: 'Artemis II', date: '2025-09-01', location: 'Kennedy Space Center', mission_type: 'Crewed Lunar Flyby' },
	{ mission_name: 'Starlink-5', date: '2023-01-26', location: 'Cape Canaveral', mission_type: 'Satellite Deployment' },
	{ mission_name: 'Transporter-7', date: '2023-04-15', location: 'Vandenberg Space Force Base', mission_type: 'Rideshare Mission' }
   /* {
        id: 1,
        name: 'Starlink-5',
        launchVehicle: 'Falcon 9',
        launchDate: '2023-01-26',
        launchSite: 'Cape Canaveral',
        missionType: 'Satellite Deployment'
    },
    {
        id: 2,
        name: 'Crew-6',
        launchVehicle: 'Falcon 9',
        launchDate: '2023-03-02',
        launchSite: 'Kennedy Space Center',
        missionType: 'Crewed Mission to ISS'
    },
    {
        id: 3,
        name: 'Transporter-7',
        launchVehicle: 'Falcon 9',
        launchDate: '2023-04-15',
        launchSite: 'Vandenberg Space Force Base',
        missionType: 'Rideshare Mission'
    },
    {
        id: 4,
        name: 'Artemis II',
        launchVehicle: 'SLS',
        launchDate: '2025-09-01',
        launchSite: 'Kennedy Space Center',
        missionType: 'Crewed Lunar Flyby'
    },
    {
        id: 5,
        name: 'Europa Clipper',
        launchVehicle: 'Falcon Heavy',
        launchDate: '2024-10-01',
        launchSite: 'Cape Canaveral',
        missionType: 'Planetary Science'
    } */   
    ];

    launchData.forEach((launch) => {
        const insertQuery = {
            text: 'INSERT INTO rocket_launches (mission_name, date, location, mission_type) VALUES ($1, $2, $3, $4)',
            values: [launch.mission_name, launch.date, launch.location, launch.mission_type]
        }

        pool.query(insertQuery, (err, res) => {
            if (err) {
                console.error('⚠️ error inserting launch data', err)
                return
            }
            console.log(`✅ ${launch.mission_name} added successfully`)
        })
    })
}

seedLaunchesTable();
