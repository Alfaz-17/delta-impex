const { MongoClient } = require('mongodb');

async function seed() {
  const uri = "mongodb+srv://deltaimpex25_db_user:dbnJsepZwoyoagWM@cluster0.xq7jdv8.mongodb.net/deltaimpex?appName=Cluster0";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db('deltaimpex');
    const divisionsCol = db.collection('divisions');

    const divisions = [
      { name: 'Marine & Industrial', slug: 'marine-industrial' },
      { name: 'RO Water Treatment', slug: 'ro-water-treatment' }
    ];

    for (const division of divisions) {
      await divisionsCol.updateOne(
        { slug: division.slug },
        { $set: division },
        { upsert: true }
      );
    }

    console.log('Divisions seeded successfully');
  } finally {
    await client.close();
  }
}

seed().catch(console.error);
