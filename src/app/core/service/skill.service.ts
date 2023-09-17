import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment"
import {Skill} from "../models/Skill";
import {BehaviorSubject, Observable} from "rxjs";
import {Page} from "../models/Page";

const skillUrl = environment.skillUrl

@Injectable({
    providedIn: 'root'
})
export class SkillService {
    updateSkillsSubject$: BehaviorSubject<Skill | null> = new BehaviorSubject<Skill | null>(null);
    updateSkills$ = this.updateSkillsSubject$.asObservable();
    private baseUrl = `${skillUrl}/skill`

    constructor(private http: HttpClient) {
    }

    updateSkills(skill: Skill | null = null) {
        this.updateSkillsSubject$.next(skill);
    }

    addSkill(skill: Skill): Observable<Skill> {
        return this.http.post<Skill>(this.baseUrl, skill);
    }


    updateSkillById(id: number, skill: Skill): Observable<Skill> {


        return this.http.put<Skill>(`${this.baseUrl}/${id}`, skill);
    }

    deleteSkillById(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }

    getAllSkills(page= 0, size = 10): Observable<any> {
        return this.http.get<Page<Skill>>(this.baseUrl, {params: {page: page.toString(), size: size.toString()}});
    }

    searchSkills(name: string, page: number, size: number): Observable<Page<Skill>> {
        return this.http.get<Page<Skill>>(`${this.baseUrl}/search`, {
            params: {
                name: name,
                page: page.toString(),
                size: size.toString()
            }
        });
    }
    deleteSkills(skills:Skill[]): Observable<void> {
        return this.http.put<void>(`${this.baseUrl}/delete`, skills);
    }
}
