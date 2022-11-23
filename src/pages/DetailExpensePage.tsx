import {
    IonBackButton, IonButton, IonButtons, IonContent, IonDatetime, IonHeader,
    IonIcon, IonInput, IonItem, IonLabel, IonPage, IonSelect, IonSelectOption,
    IonTextarea, IonTitle, IonToolbar
} from '@ionic/react';
import { trash } from 'ionicons/icons';
import React from 'react';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { MExpenseApp } from '../models';
import { removeMExpenseApp, showMExpenseAppById, reconditionMExpenseApp } from '../databaseHandler'

interface IdParam {
    id: string
}

const DetailExpensePage: React.FC = () => {
    const [nameOfTrip, setnameOfTrip] = useState('')
    const [destinationForTrip, setdestinationForTrip] = useState('')
    const [dateOfTrip, setdateOfTrip] = useState(new Date().toISOString())
    const [riskOfAssessment, setriskOfAssessment] = useState('')
    const [descriptionForTrip, setdescriptionForTrip] = useState('')

    const { id } = useParams<IdParam>()
    const history = useHistory()

    function formatVietNamDate(isoString: string) {
        return new Date(isoString).toLocaleDateString("vi-VN");
    }

    async function removeMExpenseAppHandler() {
        
        await removeMExpenseApp(Number.parseInt(id));
        alert(id + "is deleted!");
        history.goBack();
    }

    async function reconditionMExpenseAppHandler() {
        if (!nameOfTrip || !destinationForTrip || !dateOfTrip || !riskOfAssessment || !descriptionForTrip /*||
            !expenseType || !expenseAmount || !expenseTime || !comment*/) {
            alert('Please enter all fields in RED color')
            return;}
        else{
            const updateExpense = {
            id: Number.parseInt(id), nameOfTrip: nameOfTrip,
            destinationForTrip: destinationForTrip, dateOfTrip: dateOfTrip,
            riskOfAssessment: riskOfAssessment, descriptionForTrip: descriptionForTrip,
            /*expenseType: expenseType, expenseAmount: expenseAmount,
            expenseTime: expenseTime, comment: comment*/
        }
        await reconditionMExpenseApp(updateExpense)
        alert('Recondition done!')
        }
        
    }

    async function getData() {
        const resultFromDB = await showMExpenseAppById(Number.parseInt(id)) as MExpenseApp;
        setnameOfTrip(resultFromDB.nameOfTrip);
        setdestinationForTrip(resultFromDB.destinationForTrip);
        setdateOfTrip(resultFromDB.dateOfTrip);
        setriskOfAssessment(resultFromDB.riskOfAssessment);
        setdescriptionForTrip(resultFromDB.descriptionForTrip);
        /*setExpenseType(resultFromDB.expenseType);
        setExpenseAmount(resultFromDB.expenseAmount);
        setExpenseTime(resultFromDB.expenseTime);
        setComment(resultFromDB.comment);*/
    }
    useEffect(() => {
        getData();
    }, [])

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton />
                    </IonButtons>
                    <IonButton color="danger" slot="end" onClick={removeMExpenseAppHandler}>
                        <IonIcon slot="icon-only" icon={trash}></IonIcon>
                    </IonButton>
                    <IonTitle>Detail of {id}</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                <IonItem>
                    <IonLabel color="danger">•	Name of Trip:</IonLabel>
                    <IonInput slot="end" value={nameOfTrip} onIonChange={e => setnameOfTrip(e.detail.value!)}></IonInput>
                </IonItem>

                <IonItem>
                    <IonLabel color="danger">sDestination For Trip:</IonLabel>
                    <IonInput slot="end" value={destinationForTrip} onIonChange={e => setdestinationForTrip(e.detail.value!)}></IonInput>
                </IonItem>

                <IonItem>
                    <IonLabel color="danger">•	Date of Trip:</IonLabel>
                    <IonDatetime value={dateOfTrip} onIonChange={e => setdateOfTrip(e.detail.value!.toString())}></IonDatetime>
                </IonItem>

                <IonItem>
                    <IonLabel color="danger">•	Requires risk assessment:</IonLabel>
                    <IonSelect placeholder="Select One" value={riskOfAssessment} onIonChange={e => setriskOfAssessment(e.detail.value)} >
                        <IonSelectOption value="Yes">Yes</IonSelectOption>
                        <IonSelectOption value="No">No</IonSelectOption>
                    </IonSelect>
                </IonItem>

                <IonItem>
                    <IonLabel color="danger">•	Description For Trip:</IonLabel>
                    <IonTextarea placeholder="Enter more information here..." value={descriptionForTrip} onIonChange={e => setdescriptionForTrip(e.detail.value!)}></IonTextarea>
                </IonItem>

                

                <IonButton expand="block" onClick={reconditionMExpenseAppHandler}>Update list</IonButton>
            </IonContent>
        </IonPage>
    );
};
export default DetailExpensePage;