import {HttpClient} from "@angular/common/http";
import {IBaseService} from "./IBaseService";
import {BehaviorSubject, Observable} from "rxjs";
import {Page} from "../models/Page";

export class BaseService<T, I> implements IBaseService<T, I> {
  dataSubject$: BehaviorSubject<T | null> = new BehaviorSubject<T | null>(null);
  data$: Observable<T | null> = this.dataSubject$.asObservable();

  constructor(private httpClient: HttpClient, private url: string) {

  }

  findByName(name: string, page: number, size: number): Observable<Page<T>> {
    return this.httpClient.get<Page<T>>(`${this.url}/search`, {
      params: {
        name: name,
        page: page.toString(),
        size: size.toString()
      }
    });
  }

  updateById(t: T, id: I): Observable<T> {
    return this.httpClient.put<T>(`${this.url}/${id}`, t);
  }

  updateData(t: T | null = null): void {
    this.dataSubject$.next(t);
  }

  findById(id: I): Observable<T> {
    return this.httpClient.get<T>(`${this.url}/${id}`);
  }

  deleteAll(t: T[]): Observable<void> {
    return this.httpClient.put<void>(`${this.url}/delete`, {body: t});
  }

  deleteById(id: I): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/${id}`);
  }

  findAll(page: number, size: number): Observable<Page<T>> {
    return this.httpClient.get<Page<T>>(`${this.url}?page=${page}&size=${size}`);
  }

  save(t: T): Observable<T> {
    return this.httpClient.post<T>(`${this.url}`, t);
  }


}
