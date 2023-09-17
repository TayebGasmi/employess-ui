import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Quiz} from "../models/quiz";
import {BehaviorSubject, Observable} from "rxjs";
import {Question} from "../models/question";
import {Page} from "../models/Page";

const skillUrl = environment.skillUrl

@Injectable({
    providedIn: 'root'
})
export class QuizService {
    updateQuizzesSubject$: BehaviorSubject<Quiz | null> = new BehaviorSubject<Quiz | null>(null);
    updateQuizzes$ = this.updateQuizzesSubject$.asObservable();
    private baseUrl = `${skillUrl}/quiz`

    constructor(private http: HttpClient) {
    }

    updateQuizzes(quiz: Quiz | null = null) {
        this.updateQuizzesSubject$.next(quiz);
    }

    updateQuizById(id: number, quiz: Quiz): Observable<Quiz> {
        return this.http.put<Quiz>(`${this.baseUrl}/${id}`, quiz);
    }

    deleteQuizById(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }

    addQuizToSkill(quiz: Quiz, skillId: number): Observable<Quiz> {
        return this.http.post<Quiz>(`${this.baseUrl}/${skillId}`, quiz);
    }

    getQuizQuestions(quizId: number): Observable<Question[]> {
        return this.http.get<Question[]>(`${this.baseUrl}/${quizId}/questions`);
    }

    getQuizById(quizId: number): Observable<Quiz> {
        return this.http.get<Quiz>(`${this.baseUrl}/${quizId}`);
    }

    getQuizzesBySkill(skillId: number, page = 0, size = 10): Observable<Page<Quiz>> {
        return this.http.get<Page<Quiz>>(`${this.baseUrl}/skill`, {
            params: {
                page: page.toString(),
                size: size.toString(),
                skillId: skillId.toString()
            }
        });
    }

    getQuizBySkillIdAndName(skillId: number, name: string, page: number, size: number): Observable<Page<Quiz>> {
        return this.http.get<Page<Quiz>>(`${this.baseUrl}/skill/search`, {
            params: {
                page: page.toString(),
                size: size.toString(),
                skillId: skillId.toString(),
                name: name
            }
        });
    }

}
