import {Page} from "../models/Page";
import {BehaviorSubject, Observable} from "rxjs";

export interface IBaseService<T,I> {
    findById(id: I): Observable<T>;
    save(t: T): Observable<T>;
    updateById(t: T, id:I): Observable<T>;
    deleteById(id: I): Observable<void>;
    deleteAll(t: T[]): Observable<void>;
    findAll(page: number, size: number): Observable<Page<T>>;
    dataSubject$:BehaviorSubject<T | null>
    updateData( t?:T|null):void
    data$ : Observable<T|null>;
    findByName(name: string,page: number, size: number): Observable<Page<T>>;


}
