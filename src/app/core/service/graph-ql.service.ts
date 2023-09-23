import {Injectable} from '@angular/core';
import {Apollo, gql} from "apollo-angular";


@Injectable({
  providedIn: 'root'
})
export class GraphQlService {
  constructor(private apollo: Apollo) {
  }


  public loadData(query: string): any {
    return this.apollo.watchQuery<any>({
      query: gql`${query}`,
    }).valueChanges
  }

  public subscribe(query: string): any {
    return this.apollo
      .subscribe({
        query: gql`${query}`,
      });
  }

  public mutate(query: string): any {
    return this.apollo.mutate({
      mutation: gql`${query}`,
    });
  }
}
