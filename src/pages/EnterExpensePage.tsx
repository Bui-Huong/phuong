import {
    IonBackButton, IonButton, IonButtons, IonContent, IonDatetime, IonHeader,
    IonInput, IonItem, IonLabel, IonPage, IonSelect, IonSelectOption,
    IonTextarea, IonTitle, IonToolbar
} from '@ionic/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { insertingMExpenseApp, checkingDuplicateBynameOfTrip } from '../databaseHandler'

const EnterExpensePage: React.FC = () => {
    const history = useHistory()

    const [nameOfTrip, setnameOfTrip] = useState('')
    const [destinationForTrip, setdestinationForTrip] = useState('')
    const [dateOfTrip, setdateOfTrip] = useState<string | null>(null)
    const [riskOfAssessment, setriskOfAssessment] = useState('')
    const [descriptionForTrip, setdescriptionForTrip] = useState('')

    function formatVietNamDate(isoString: string) {
        return new Date(isoString).toLocaleDateString("vi-VN");
    }
    async function addMExpenseAppHandler() {
        // add expense

        if (!nameOfTrip || !destinationForTrip || !dateOfTrip || !riskOfAssessment || !descriptionForTrip) {
            alert('Please enter all fields in VIOLET color')
            return;
        } else {
            const newExpense = {
                nameOfTrip: nameOfTrip, destinationForTrip: destinationForTrip,
                dateOfTrip: dateOfTrip, riskOfAssessment: riskOfAssessment,
                descriptionForTrip: descriptionForTrip
            }
            await insertingMExpenseApp(newExpense);
            alert('Added ' + nameOfTrip + ' expanse!' );
            await checkingDuplicateBynameOfTrip()   
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
                    <IonTitle><IonButton fill="clear" routerLink="/HomePage">Add Expanse listings</IonButton></IonTitle>
                </IonToolbar>
            </IonHeader>

            {/* form imput */}
            <IonContent className="ion-padding">

                <IonItem>
                    <IonLabel color="tertiary">Enter Trip's Name:</IonLabel>
                    <IonInput placeholder="Enter name here..." slot="end" onIonChange={e => setnameOfTrip(e.detail.value!)}></IonInput>
                </IonItem>

                <IonItem>
                    <IonLabel color="tertiary">Destination For Trip :</IonLabel>
                    <IonInput placeholder="Enter destinationForTrip here..." slot="end" onIonChange={e => setdestinationForTrip(e.detail.value!)}></IonInput>
                </IonItem>

                <IonItem>
                    <IonLabel color="tertiary">Date of Trip:</IonLabel>
                    <IonDatetime value={dateOfTrip} onIonChange={e => setdateOfTrip(e.detail.value!.toString())}></IonDatetime>
                </IonItem>

                <IonItem>
                    <IonLabel color="tertiary">Requires risk assessment:</IonLabel>
                    <IonSelect placeholder="Select One" onIonChange={e => setriskOfAssessment(e.detail.value)} >
                        <IonSelectOption value="Yes">Yes</IonSelectOption>
                        <IonSelectOption value="No">No</IonSelectOption>
                    </IonSelect>
                </IonItem>

                <IonItem>
                    <IonLabel color="medium">Description For Trip:</IonLabel>
                    <IonTextarea placeholder="Enter more information here..." slot="end" onIonChange={e => setdescriptionForTrip(e.detail.value!)}></IonTextarea>
                </IonItem>
                
                <IonButton expand="block" fill="solid" color="tertiary" routerLink="/EnterExpensePage" onClick={addMExpenseAppHandler}>Add</IonButton>
                
            </IonContent>
        </IonPage>
    );
};
export default EnterExpensePage;