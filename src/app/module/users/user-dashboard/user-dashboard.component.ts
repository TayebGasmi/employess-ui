import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../../core/service/user.service";
import {map, Observable} from "rxjs";
import {User} from "../../../core/models/user";

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit ,AfterViewInit{
  maleCount:number = 0;
  femaleCount:number = 0;
  seniorCount:number = 0;
  juniorCount:number = 0;
  middleCount:number = 0;
  traineeCount:number = 0;
  internCount:number = 0;


  userData$:Observable<any[]> = this.userService.findAll()/*.pipe(
    map((data:any)=> {
      console.log(data[0]["attributes"]);
      //@ts-ignore
      return  data.map( (e)=>
      (  {
          fullName: e.firstName + " " + e.lastName,
          gender: e["attributes"]["gender"][0],
          // birthday: e["attributes"]["birthday"][0],
          jobTitle: e["attributes"]["job"][0],
          grade: e["attributes"]["grade"][0],
          enabled: e.enabled,

        })
      )
    })
  );*/
  test:any;
   constructor(private userService:UserService) {
 }

  ngOnInit(): void {
     this.userData$.subscribe((data)=>{
       data.forEach(u=>{
         if(u.attributes.gender[0] === "male"){
           this.maleCount++;
         }else {
           this.femaleCount++;
         }
         if(u.attributes.grade[0] === "Senior"){
           this.seniorCount++;
          }else if(u.attributes.grade[0] === "Junior"){
           this.juniorCount++;

          }else if(u.attributes.grade[0] === "Middle"){

            this.middleCount++;
          }else if(u.attributes.grade[0] === "Trainee"){

              this.traineeCount++;

          }else if(u.attributes.grade[0] === "Intern"){

              this.internCount++;
         }
       })

       this.basicData = {
         labels: ['MALE','FEMALE' ],
         datasets: [

           {
             label: '',
             backgroundColor: '#FFA726',
             data: [this.maleCount, this.femaleCount]
           }
         ]
       };
       this.basicData2 = {
         labels: ['SENIOR','JUNIOR',`Middle`,`Trainee`,`Intern` ],
         datasets: [

           {
             label: '',
             backgroundColor: '#FFA726',
             data: [this.seniorCount, this.juniorCount,this.middleCount,this.traineeCount,this.internCount]
           }
         ]
       };
     }  )


  }
  basicData: any;

  basicOptions: any;
  basicData2: any;

  basicOptions2: any;
  ngAfterViewInit(): void {

  }


}
