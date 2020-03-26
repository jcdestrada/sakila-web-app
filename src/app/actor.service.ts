import { Injectable } from '@angular/core';
import { Actor } from './actor.model';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class ActorService {
	private allActorURL = 'http://localhost:8080/actor/all'

	constructor(private http: HttpClient) { }

	getActors(): Observable<Actor[]> {
		return this.http.get<Actor[]>(this.allActorURL).pipe(
			tap(_ => this.log('fetched actors')),
			catchError(this.handleError<Actor[]>('getActors', []))
		);
	}

	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {

			// TODO: send the error to remote logging infrastructure
			console.error(error); // log to console instead

			// TODO: better job of transforming error for user consumption
			this.log(`${operation} failed: ${error.message}`);

			// Let the app keep running by returning an empty result.
			return of(result as T);
		};
	}

	private log(message: String) {
		console.log(message);
	}
}
