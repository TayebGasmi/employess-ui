import {Page} from "../models/Page";
import {Observable} from "rxjs";

export interface BaseService<T,I> {
    findById(id: I): Observable<T>;
    save(t: T): Observable<T>;
    update(t: T): Observable<T>;
    deleteById(id: I): Observable<void>;
    deleteAll(t: T[]): Observable<void>;
    findAll(page: number, size: number): Observable<Page<T>>;




}
