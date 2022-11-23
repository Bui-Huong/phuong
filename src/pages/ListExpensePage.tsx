import { RefresherEventDetail } from '@ionic/core';
import {IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonInput, 
    IonItem, IonLabel, IonList, IonPage, IonRefresher, IonRefresherContent, 
    IonTitle, IonToolbar
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { showAllMExpenseApp, searchEngineBynameOfTrip } from '../databaseHandler';
import { MExpenseApp } from '../models';

const ListExpensePage: React.FC = () => {
    const [allExpense, setAllMExpenseApp] = useState<MExpenseApp[]>([]);
    async function getData() {
        const resultFromDB = await showAllMExpenseApp();

        setAllMExpenseApp(resultFromDB);
    }

    useEffect(() => {
        getData();
    }, [])

    function Freshen(event: CustomEvent<RefresherEventDetail>) {
        getData();
        setTimeout(() => {
            event.detail.complete();
        }, 300);
    }
    const [searchEngineText, setsearchEngineText] = useState<string>('');
    async function searchEngine(word: string) {
        setsearchEngineText(word)
        const resultFromDB = await searchEngineBynameOfTrip(word);

        setAllMExpenseApp(resultFromDB);
    }
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton />
                    </IonButtons>
                    <IonTitle><IonButton fill="clear" routerLink="/HomePage">Expense listings</IonButton></IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonItem>
                    <IonLabel color="danger_1">Search Engine: </IonLabel>
                    <IonInput placeholder="enter name of trip" slot="end" value={searchEngineText} onIonChange={(e) => searchEngine(e.detail.value!)} ></IonInput>

                </IonItem>

                <IonRefresher slot="fixed" onIonRefresh={Freshen}>
                    <IonRefresherContent>
                    </IonRefresherContent>
                </IonRefresher>
                {allExpense &&
                    <IonList >
                        {allExpense.map(c =>
                            <IonItem color="light" routerLink={'/DetailExpensePage/' + c.id} button key={c.id}>{c.nameOfTrip} expense in [{c.dateOfTrip}]</IonItem>
                        )}
                    </IonList>
                }
            </IonContent>
        </IonPage>
    );
};
export default ListExpensePage;
