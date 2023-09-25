import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {Task} from "../../../../core/models/Task";
import {Observable, Subscription} from "rxjs";
import {TaskService} from "../../../../core/service/TaskService";
import {LayoutService} from "../../../../layout/service/app.layout.service";
import {GraphQlService} from "../../../../core/service/graph-ql.service";
import {combineLatest} from "rxjs/internal/operators/combineLatest";

@Component({
  selector: 'app-task-dashboard-page',
  templateUrl: './task-dashboard-page.component.html',
  styleUrls: ['./task-dashboard-page.component.scss']
})
export class TaskDashboardPageComponent  {

   bugfixTodoCount$:Observable<any> = this.graphQlService.subscribe(`subscription MySubscription {
  task_aggregate(where: {task_status: {_eq: "TODO"}, _and: {task_type: {_eq: "BUGFIX"}}}) {
    aggregate {
      count
    }
  }
}
`);
   bugfixInProgressCount$:Observable<any> = this.graphQlService.subscribe(`subscription MySubscription {
  task_aggregate(where: {task_status: {_eq: "IN_PROGRESS"}, _and: {task_type: {_eq: "BUGFIX"}}}) {
    aggregate {
      count
    }
  }
}
`);
   bugfixDoneCount$:Observable<any> = this.graphQlService.subscribe(`subscription MySubscription {
  task_aggregate(where: {task_status: {_eq: "DONE"}, _and: {task_type: {_eq: "BUGFIX"}}}) {
    aggregate {
      count
    }
  }
}
`);

   featureTodoCount$:Observable<any> = this.graphQlService.subscribe(`subscription MySubscription {
  task_aggregate(where: {task_status: {_eq: "TODO"}, _and: {task_type: {_eq: "FEATURE"}}}) {
    aggregate {
      count
    }
  }
}`);
   featureInProgressCount$:Observable<any> = this.graphQlService.subscribe(`subscription MySubscription {
  task_aggregate(where: {task_status: {_eq: "IN_PROGRESS"}, _and: {task_type: {_eq: "FEATURE"}}}) {
    aggregate {
      count
    }
  }
}`);
   featureDoneCount$:Observable<any> = this.graphQlService.subscribe(`subscription MySubscription {
  task_aggregate(where: {task_status: {_eq: "DONE"}, _and: {task_type: {_eq: "FEATURE"}}}) {
    aggregate {
      count
    }
  }
}
`);


   documentationTodoCount$:Observable<any> = this.graphQlService.subscribe(`subscription MySubscription {
  task_aggregate(where: {task_status: {_eq: "TODO"}, _and: {task_type: {_eq: "DOCUMENTATION"}}}) {
    aggregate {
      count
    }
  }
}
`);
   documentationInProgressCount$:Observable<any> = this.graphQlService.subscribe(`subscription MySubscription {
  task_aggregate(where: {task_status: {_eq: "IN_PROGRESS"}, _and: {task_type: {_eq: "DOCUMENTATION"}}}) {
    aggregate {
      count
    }
  }
}`);
   documentationDoneCount$:Observable<any> = this.graphQlService.subscribe(`subscription MySubscription {
  task_aggregate(where: {task_status: {_eq: "DONE"}, _and: {task_type: {_eq: "DOCUMENTATION"}}}) {
    aggregate {
      count
    }
  }
}`);

  totalTaskCount$:Observable<any> = this.graphQlService.subscribe(`subscription MySubscription {
  task_aggregate {
    aggregate {
      count
    }
  }
}`);
  totalDoneTasksCount$:Observable<any> = this.graphQlService.subscribe(`subscription MySubscription {
  task_aggregate(where: {task_status: {_eq: "DONE"}}) {
    aggregate {
      count
    }
  }
}
`);
  totalInProgressTasksCount$:Observable<any> = this.graphQlService.subscribe(`subscription MySubscription {
  task_aggregate(where: {task_status: {_eq: "IN_PROGRESS"}}) {
    aggregate {
      count
    }
  }
}
`);
  totalToDoTasksCount$:Observable<any> = this.graphQlService.subscribe(`subscription MySubscription {
  task_aggregate(where: {task_status: {_eq: "TODO"}}) {
    aggregate {
      count
    }
  }
}
`);
  totalReviewTasksCount$:Observable<any> = this.graphQlService.subscribe(`subscription MySubscription {
  task_aggregate(where: {task_status: {_eq: "UNDER_REVIEW"}}) {
    aggregate {
      count
    }
  }
}
`);
  totalTestTasksCount$:Observable<any> = this.graphQlService.subscribe(`subscription MySubscription {
  task_aggregate(where: {task_status: {_eq: "TEST"}}) {
    aggregate {
      count
    }
  }
}
`);





  constructor(private productService: TaskService , private graphQlService:GraphQlService) {


  }

  ngOnInit() {

  }



}
