import { MongoClient } from 'mongodb'
export async function connectDatabase() {
    return await MongoClient.connect('mongodb+srv://arkan_laki:arkan1234@cluster0.7vxzzgx.mongodb.net/next-course?retryWrites=true&w=majority');
}

export async function insertDocument(client, collection, document) {
    const db = client.db();
    return await db.collection(collection).insertOne(document);
}

export async function getAllDocuments(client, collection, filter, sort) {
    const db = client.db();
    return await db.collection(collection).find(filter).sort(sort).toArray();
}