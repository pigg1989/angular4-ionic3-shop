import { ToastController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
export class UserCommon{
    public userId: string = '';
    constructor(){
      
    }
    protected isUserLogin(storage: Storage){
        storage.get('userId').then(
            (val)=>{
                if(val){
                    this.userId = val;
                }
            }
        );
    }
}