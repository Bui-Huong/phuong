import { openDB } from 'idb'
import { MExpenseApp } from './models';

const database_name = 'MExpenseApp';

initDatabase().then(() => {
    console.log(database_name + " was created!")
})

export async function insertingMExpenseApp(MExpenseApp: MExpenseApp) {
    const db = await openDB(database_name, 1);
    await db.transaction("MExpenseApp", 'readwrite').objectStore("MExpenseApp").put(MExpenseApp);
}

export async function checkingDuplicateBynameOfTrip() {
    var tripArr = await showAllMExpenseApp() as any[] as MExpenseApp[]
    var check = [] as any[]

    check = tripArr.map(e => e.nameOfTrip).filter((item, index, final) => final.indexOf(item) !== index)
    console.log(check)
    alert('Trip name was duplicated in ' + check)
}

export async function showAllMExpenseApp() {
    const db = await openDB(database_name, 1);
    return await db.transaction("MExpenseApp").objectStore("MExpenseApp").getAll();
}

export async function searchEngineBynameOfTrip(keyword: string) {
    const db = await openDB(database_name, 1);
    let cursor = await db.transaction('MExpenseApp').store.openCursor()
    let searchEngineResult = []
    while (cursor) {
        if ((cursor.value as MExpenseApp).nameOfTrip >= keyword && (cursor.value as MExpenseApp).nameOfTrip <= keyword + '~') {
            searchEngineResult.push(cursor.value)
        }

        cursor = await cursor.continue();
    }
    return searchEngineResult
}


export async function showMExpenseAppById(id: number) {
    const db = await openDB(database_name, 1);
    return await db.get("MExpenseApp", id);
}

export async function removeMExpenseApp(id: number) {
    const db = await openDB(database_name, 1);
    await db.delete('MExpenseApp', id)
}

export async function reconditionMExpenseApp(MExpenseApp: MExpenseApp) {
    const db = await openDB(database_name, 1);
    var MExpenseAppDB = await db.get("MExpenseApp", MExpenseApp.id!) as MExpenseApp;

    MExpenseAppDB.nameOfTrip = MExpenseApp.nameOfTrip
    MExpenseAppDB.destinationForTrip = MExpenseApp.destinationForTrip
    MExpenseAppDB.dateOfTrip = MExpenseApp.dateOfTrip
    MExpenseAppDB.riskOfAssessment = MExpenseApp.riskOfAssessment
    MExpenseAppDB.descriptionForTrip = MExpenseApp.descriptionForTrip

    await db.put("MExpenseApp", MExpenseAppDB);
}

async function initDatabase() {
    const db = await openDB(database_name, 1, {
        upgrade(db) {
            const store = db.createObjectStore('MExpenseApp', {
                keyPath: 'id',
                autoIncrement: true
            })
        }
    })
}