import {Page} from "../models/Page";
import {BehaviorSubject, Observable} from "rxjs";

export interface IBaseService<T, I> {
  dataSubject$: BehaviorSubject<T | null>
  data$: Observable<T | null>;

  findById(id: I): Observable<T>;

  save(t: T): Observable<T>;

  updateById(t: T, id: I): Observable<T>;

  deleteById(id: I): Observable<void>;

  deleteAll(t: T[]): Observable<void>;

  findAll(page: number, size: number): Observable<Page<T>>;

  updateData(t?: T | null): void

  findByName(name: string, page: number, size: number): Observable<Page<T>>;
  getAll(): Observable<T[]>


}
