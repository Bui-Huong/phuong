import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton } from '@ionic/react';
import ExploreContainerComponents from '../components/ExploreContainerComponents';
import 'ionicons/icons';

const HomePage: React.FC = () => {
  return (
    
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>M-Expense</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardHeader>
          <IonCardTitle>Enter details of trips </IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
          Enter trip information by clicking the button below.
          </IonCardContent>
          <IonCardContent>
          <IonButton expand="block" fill="solid" color="tertiary" routerLink="/EnterExpensePage" onClick={() => navigator.vibrate(2500)}>Add new trips</IonButton>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader>
          <IonCardTitle>View Detail of Trips</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
          View trip information by clicking the button below.
          </IonCardContent>
          <IonCardContent>
          <IonButton expand="block" fill="solid" color="primary" routerLink="/ListExpensePage" onClick={() => navigator.vibrate(2500)}>View trips</IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
