import {
    IonBackButton, IonButton, IonButtons, IonContent, IonDatetime, IonHeader,
    IonInput, IonItem, IonLabel, IonPage, IonSelect, IonSelectOption,
    IonTextarea, IonTitle, IonToolbar
} from '@ionic/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { insertMExpense, checkDuplicateByTripName } from '../databaseHandler'

const AddExpense: React.FC = () => {
    const history = useHistory()

    const [tripName, setTripName] = useState('')
    const [destination, setDestination] = useState('')
    const [tripDate, setTripDate] = useState<string | null>(null)
    const [riskAssessment, setRiskAssessment] = useState('')
    const [description, setDescription] = useState('')

    function formatVNDate(isoString: string) {
        return new Date(isoString).toLocaleDateString("vi-VN");
    }
    async function addMExpenseHandler() {
        // add expense

        if (!tripName || !destination || !tripDate || !riskAssessment || !description) {
            alert('Please enter all fields in RED color')
            return;
        } else {
            const newExpense = {
                tripName: tripName, destination: destination,
                tripDate: tripDate, riskAssessment: riskAssessment,
                description: description
            }
            await insertMExpense(newExpense);
            alert('Added ' + tripName + ' expanse!' );
            await checkDuplicateByTripName()   
            history.goBack();
        }

    }
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton />
                    </IonButtons>
                    <IonTitle><IonButton fill="clear" routerLink="/home">Add Expanse listings</IonButton></IonTitle>
                </IonToolbar>
            </IonHeader>

            {/* form imput */}
            <IonContent className="ion-padding">

                <IonItem>
                    <IonLabel color="danger">Enter Trip's Name:</IonLabel>
                    <IonInput placeholder="Enter name here..." slot="end" onIonChange={e => setTripName(e.detail.value!)}></IonInput>
                </IonItem>

                <IonItem>
                    <IonLabel color="danger">Destination :</IonLabel>
                    <IonInput placeholder="Enter destination here..." slot="end" onIonChange={e => setDestination(e.detail.value!)}></IonInput>
                </IonItem>

                <IonItem>
                    <IonLabel color="danger">Date of Trip:</IonLabel>
                    <IonDatetime value={tripDate} onIonChange={e => setTripDate(e.detail.value!.toString())}></IonDatetime>
                </IonItem>

                <IonItem>
                    <IonLabel color="danger">Requires risk assessment:</IonLabel>
                    <IonSelect placeholder="Select One" onIonChange={e => setRiskAssessment(e.detail.value)} >
                        <IonSelectOption value="Yes">Yes</IonSelectOption>
                        <IonSelectOption value="No">No</IonSelectOption>
                    </IonSelect>
                </IonItem>

                <IonItem>
                    <IonLabel color="medium">Description:</IonLabel>
                    <IonTextarea placeholder="Enter more information here..." slot="end" onIonChange={e => setDescription(e.detail.value!)}></IonTextarea>
                </IonItem>
                
                <IonButton expand="block" fill="solid" color="tertiary" routerLink="/addexpense" onClick={addMExpenseHandler}>Add</IonButton>
                
            </IonContent>
        </IonPage>
    );
};
export default AddExpense;