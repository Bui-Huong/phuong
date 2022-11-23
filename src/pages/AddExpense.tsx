import {
    IonBackButton, IonButton, IonButtons, IonContent, IonDatetime, IonHeader,
    IonInput, IonItem, IonLabel, IonPage, IonSelect, IonSelectOption,
    IonTextarea, IonTitle, IonToolbar
} from '@ionic/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { insertMExpenseApp, checkDuplicateBynameOfTrip } from '../databaseHandler'

const AddExpense: React.FC = () => {
    const history = useHistory()

    const [nameOfTrip, setnameOfTrip] = useState('')
    const [destinationForTrip, setdestinationForTrip] = useState('')
    const [dateOfTrip, setdateOfTrip] = useState<string | null>(null)
    const [riskOfAssessment, setriskOfAssessment] = useState('')
    const [descriptionForTrip, setdescriptionForTrip] = useState('')

    function formatVNDate(isoString: string) {
        return new Date(isoString).toLocaleDateString("vi-VN");
    }
    async function addMExpenseAppHandler() {
        // add expense

        if (!nameOfTrip || !destinationForTrip || !dateOfTrip || !riskOfAssessment || !descriptionForTrip) {
            alert('Please enter all fields in RED color')
            return;
        } else {
            const newExpense = {
                nameOfTrip: nameOfTrip, destinationForTrip: destinationForTrip,
                dateOfTrip: dateOfTrip, riskOfAssessment: riskOfAssessment,
                descriptionForTrip: descriptionForTrip
            }
            await insertMExpenseApp(newExpense);
            alert('Added ' + nameOfTrip + ' expanse!' );
            await checkDuplicateBynameOfTrip()   
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
                    <IonInput placeholder="Enter name here..." slot="end" onIonChange={e => setnameOfTrip(e.detail.value!)}></IonInput>
                </IonItem>

                <IonItem>
                    <IonLabel color="danger">destinationForTrip :</IonLabel>
                    <IonInput placeholder="Enter destinationForTrip here..." slot="end" onIonChange={e => setdestinationForTrip(e.detail.value!)}></IonInput>
                </IonItem>

                <IonItem>
                    <IonLabel color="danger">Date of Trip:</IonLabel>
                    <IonDatetime value={dateOfTrip} onIonChange={e => setdateOfTrip(e.detail.value!.toString())}></IonDatetime>
                </IonItem>

                <IonItem>
                    <IonLabel color="danger">Requires risk assessment:</IonLabel>
                    <IonSelect placeholder="Select One" onIonChange={e => setriskOfAssessment(e.detail.value)} >
                        <IonSelectOption value="Yes">Yes</IonSelectOption>
                        <IonSelectOption value="No">No</IonSelectOption>
                    </IonSelect>
                </IonItem>

                <IonItem>
                    <IonLabel color="medium">descriptionForTrip:</IonLabel>
                    <IonTextarea placeholder="Enter more information here..." slot="end" onIonChange={e => setdescriptionForTrip(e.detail.value!)}></IonTextarea>
                </IonItem>
                
                <IonButton expand="block" fill="solid" color="tertiary" routerLink="/addexpense" onClick={addMExpenseAppHandler}>Add</IonButton>
                
            </IonContent>
        </IonPage>
    );
};
export default AddExpense;