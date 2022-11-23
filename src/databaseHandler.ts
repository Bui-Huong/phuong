import { openDB } from 'idb'
import { MExpense } from './models';

const database_name = 'MExpense';

initDB().then(() => {
    console.log(database_name + " was created!")
})

export async function insertMExpense(mexpense: MExpense) {
    const db = await openDB(database_name, 1);
    await db.transaction("mExpense", 'readwrite').objectStore("mExpense").put(mexpense);
}

export async function checkDuplicateByTripName() {
    var tripArr = await getAllMExpense() as any[] as MExpense[]
    var check = [] as any[]

    check = tripArr.map(e => e.tripName).filter((item, index, final) => final.indexOf(item) !== index)
    console.log(check)
    alert('Trip name was duplicated in ' + check)
}

export async function getAllMExpense() {
    const db = await openDB(database_name, 1);
    return await db.transaction("mExpense").objectStore("mExpense").getAll();
}

export async function searchByTripName(keyword: string) {
    const db = await openDB(database_name, 1);
    let cursor = await db.transaction('mExpense').store.openCursor()
    let searchResult = []
    while (cursor) {
        if ((cursor.value as MExpense).tripName >= keyword && (cursor.value as MExpense).tripName <= keyword + '~') {
            searchResult.push(cursor.value)
        }

        cursor = await cursor.continue();
    }
    return searchResult
}


export async function getMExpenseById(id: number) {
    const db = await openDB(database_name, 1);
    return await db.get("mExpense", id);
}

export async function deleteMExpense(id: number) {
    const db = await openDB(database_name, 1);
    await db.delete('mExpense', id)
}

export async function updateMExpense(mexpense: MExpense) {
    const db = await openDB(database_name, 1);
    var MExpenseDB = await db.get("mExpense", mexpense.id!) as MExpense;

    MExpenseDB.tripName = mexpense.tripName
    MExpenseDB.destination = mexpense.destination
    MExpenseDB.tripDate = mexpense.tripDate
    MExpenseDB.riskAssessment = mexpense.riskAssessment
    MExpenseDB.description = mexpense.description

    await db.put("mExpense", MExpenseDB);
}

async function initDB() {
    const db = await openDB(database_name, 1, {
        upgrade(db) {
            const store = db.createObjectStore('mExpense', {
                keyPath: 'id',
                autoIncrement: true
            })
        }
    })
}