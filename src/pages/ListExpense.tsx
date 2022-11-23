import { RefresherEventDetail } from '@ionic/core';
import {IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonInput, 
    IonItem, IonLabel, IonList, IonPage, IonRefresher, IonRefresherContent, 
    IonTitle, IonToolbar
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { getAllMExpense, searchByTripName } from '../databaseHandler';
import { MExpense } from '../models';

const ListExpense: React.FC = () => {
    const [allExpense, setAllMExpense] = useState<MExpense[]>([]);
    async function fetchData() {
        const resultFromDB = await getAllMExpense();

        setAllMExpense(resultFromDB);
    }

    useEffect(() => {
        fetchData();
    }, [])

    function doRefresh(event: CustomEvent<RefresherEventDetail>) {
        fetchData();
        setTimeout(() => {
            event.detail.complete();
        }, 300);
    }
    const [searchText, setSearchText] = useState<string>('');
    async function Search(word: string) {
        setSearchText(word)
        const resultFromDB = await searchByTripName(word);

        setAllMExpense(resultFromDB);
    }
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton />
                    </IonButtons>
                    <IonTitle><IonButton fill="clear" routerLink="/home">Expense listings</IonButton></IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonItem>
                    <IonLabel color="danger_1">Search: </IonLabel>
                    <IonInput placeholder="enter name of trip" slot="end" value={searchText} onIonChange={(e) => Search(e.detail.value!)} ></IonInput>

                </IonItem>

                <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
                    <IonRefresherContent>
                    </IonRefresherContent>
                </IonRefresher>
                {allExpense &&
                    <IonList >
                        {allExpense.map(c =>
                            <IonItem color="light" routerLink={'/detailexpense/' + c.id} button key={c.id}>{c.tripName} expense in [{c.tripDate}]</IonItem>
                        )}
                    </IonList>
                }
            </IonContent>
        </IonPage>
    );
};
export default ListExpense;