import {AfterViewInit, Component} from '@angular/core';
import {UserSkillService} from "../../../core/service/user-skill.service";
import {UserService} from "../../../core/service/user.service";
import {combineLatest, map} from "rxjs";

@Component({
  selector: 'app-skill-dash',
  templateUrl: './skill-dash.component.html',
  styleUrls: ['./skill-dash.component.scss']
})
export class SkillDashComponent  {

 constructor(private userSkill:UserSkillService,private userService:UserService) { }
 userSkill$= this.userSkill.getAll()
  UserData$= this.userService.findAll()
  // @ts-ignore
  data$=combineLatest([this.userSkill$,this.UserData$]).pipe(
    // @ts-ignore

    map(([userSkills,users])=>{
        // @ts-ignore

        const resultArray = [];
        // @ts-ignore

// Create a map to store skills count for each user
        const userSkillsCount = {};
        // @ts-ignore

// Count the skills for each user
        userSkills.forEach(skill => {
          // @ts-ignore

          const userId = skill.userId;
          // @ts-ignore

          userSkillsCount[userId] = (userSkillsCount[userId] || 0) + 1;
        });

// Populate the resultArray with user information and skills count
        // @ts-ignore

        users.forEach(user => {
          // @ts-ignore

          const userId = user.id;
          // @ts-ignore

          const userName = user.username;
          // @ts-ignore

          const skillsCount = userSkillsCount[userId] || 0;
          // @ts-ignore

          resultArray.push({ userName, skillsCount });
        });
        // @ts-ignore

        return resultArray;
      }
  )
  )


}
