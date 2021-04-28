import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from './app.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-code';
  form:FormGroup;

  predictFlag = false;
  predictErrFlag = false;
  predictMessege:string;
  predictErrMessege:string;
  finalMessegeClass:String;

  constructor(private fb: FormBuilder, private appService:AppService){
    this.form = this.fb.group({
      passengerClass: ['', Validators.required],
      gender: ['', Validators.required],
      age:['', Validators.required],
      sibSp: ['', Validators.required],
      parch: ['', Validators.required],
      fare: ['', Validators.required],
      embarked: ['', Validators.required]
    })
  }

  predict(){
    if(this.form.valid){
      let obj = {
        pclass: this.form.get('passengerClass').value,
        Sex: this.form.get('gender').value,
        age: this.form.get('age').value,
        sibsp: this.form.get('sibSp').value,
        parch: this.form.get('parch').value,
        fare: this.form.get('fare').value,
        embarked: this.form.get('embarked').value
      }
      this.appService.getPrediction(obj).subscribe(data =>{
        if(data[0] =='0'){
          this.predictMessege = 'Can not survive';
          this.finalMessegeClass = 'final-messege-0';
        }else{
          this.predictMessege = 'Can survive';
          this.finalMessegeClass = 'final-messege-1';
        }
        this.predictFlag = true;
        //alert(messege)
        //this.form.reset();
      })
    }else{
      this.predictErrMessege = 'enter all the data'
      this.predictErrFlag = true;
    }
  }

  close() {
    this.predictFlag = false;
    this.form.reset();
    this.predictMessege = '';
  }

  closeErr() {
    this.predictErrFlag = false;
    this.predictErrMessege = '';
  }
}
