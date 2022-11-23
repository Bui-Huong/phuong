import {
    IonBackButton, IonButton, IonButtons, IonContent, IonDatetime, IonHeader,
    IonIcon, IonInput, IonItem, IonLabel, IonPage, IonSelect, IonSelectOption,
    IonTextarea, IonTitle, IonToolbar
} from '@ionic/react';
import { trash } from 'ionicons/icons';
import React from 'react';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { MExpense } from '../models';
import { deleteMExpense, getMExpenseById, updateMExpense } from '../databaseHandler'

interface IdParam {
    id: string
}

const DetailExpense: React.FC = () => {
    const [tripName, setTripName] = useState('')
    const [destination, setDestination] = useState('')
    const [tripDate, setTripDate] = useState(new Date().toISOString())
    const [riskAssessment, setRiskAssessment] = useState('')
    const [description, setDescription] = useState('')

    const { id } = useParams<IdParam>()
    const history = useHistory()

    function formatVNDate(isoString: string) {
        return new Date(isoString).toLocaleDateString("vi-VN");
    }

    async function deleteMExpenseHandler() {
        
        await deleteMExpense(Number.parseInt(id));
        alert(id + "is deleted!");
        history.goBack();
    }

    async function updateMExpenseHandler() {
        if (!tripName || !destination || !tripDate || !riskAssessment || !description /*||
            !expenseType || !expenseAmount || !expenseTime || !comment*/) {
            alert('Please enter all fields in RED color')
            return;}
        else{
            const updateExpense = {
            id: Number.parseInt(id), tripName: tripName,
            destination: destination, tripDate: tripDate,
            riskAssessment: riskAssessment, description: description,
            /*expenseType: expenseType, expenseAmount: expenseAmount,
            expenseTime: expenseTime, comment: comment*/
        }
        await updateMExpense(updateExpense)
        alert('Update done!')
        }
        
    }

    async function fetchData() {
        const resultFromDB = await getMExpenseById(Number.parseInt(id)) as MExpense;
        setTripName(resultFromDB.tripName);
        setDestination(resultFromDB.destination);
        setTripDate(resultFromDB.tripDate);
        setRiskAssessment(resultFromDB.riskAssessment);
        setDescription(resultFromDB.description);
        /*setExpenseType(resultFromDB.expenseType);
        setExpenseAmount(resultFromDB.expenseAmount);
        setExpenseTime(resultFromDB.expenseTime);
        setComment(resultFromDB.comment);*/
    }
    useEffect(() => {
        fetchData();
    }, [])

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton />
                    </IonButtons>
                    <IonButton color="danger" slot="end" onClick={deleteMExpenseHandler}>
                        <IonIcon slot="icon-only" icon={trash}></IonIcon>
                    </IonButton>
                    <IonTitle>Detail of {id}</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                <IonItem>
                    <IonLabel color="danger">•	Name of Trip:</IonLabel>
                    <IonInput slot="end" value={tripName} onIonChange={e => setTripName(e.detail.value!)}></IonInput>
                </IonItem>

                <IonItem>
                    <IonLabel color="danger">•	Destination:</IonLabel>
                    <IonInput slot="end" value={destination} onIonChange={e => setDestination(e.detail.value!)}></IonInput>
                </IonItem>

                <IonItem>
                    <IonLabel color="danger">•	Date of Trip:</IonLabel>
                    <IonDatetime value={tripDate} onIonChange={e => setTripDate(e.detail.value!.toString())}></IonDatetime>
                </IonItem>

                <IonItem>
                    <IonLabel color="danger">•	Requires risk assessment:</IonLabel>
                    <IonSelect placeholder="Select One" value={riskAssessment} onIonChange={e => setRiskAssessment(e.detail.value)} >
                        <IonSelectOption value="Yes">Yes</IonSelectOption>
                        <IonSelectOption value="No">No</IonSelectOption>
                    </IonSelect>
                </IonItem>

                <IonItem>
                    <IonLabel color="danger">•	Description:</IonLabel>
                    <IonTextarea placeholder="Enter more information here..." value={description} onIonChange={e => setDescription(e.detail.value!)}></IonTextarea>
                </IonItem>

                

                <IonButton expand="block" onClick={updateMExpenseHandler}>Update list</IonButton>
            </IonContent>
        </IonPage>
    );
};
export default DetailExpense;