import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";

import { Member } from "./models/member.model";
import { Team } from "./models/team.model";

@Injectable({
  providedIn: "root",
})
export class AppService {
  api = "http://localhost:8000/api";
  username: string;

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(private http: HttpClient) {}

  // Returns all members
  getMembers(): Observable<Member[]> {
    return this.http
      .get<Member[]>(`${this.api}/members`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  setUsername(name: string): void {
    this.username = name;
  }

  // Add New Member
  addMember(newMember: Member): Observable<Member> {
    return this.http
      .post<Member>(`${this.api}/members`, newMember, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  //Get member by Id
  getMember(id: number): Observable<Member> {
    return this.http
      .get<Member>(`${this.api}/members/${id}`)
      .pipe(catchError(this.handleError));
  }

  //Edit/Update existed member
  updateMember(member: Member | number): Observable<any> {
    console.log("request is at update method");
    console.log({ updatemember: member });
    const id = typeof member === "number" ? member : member.id;
    return this.http
      .put<Member>(`${this.api}/members/${id}`, member, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  //Delete Member by Id
  deleteMemberById(member: Member | number): Observable<Member> {
    let id = typeof member === "number" ? member : member.id;
    return this.http
      .delete<Member>(`${this.api}/members/${id}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  //Returns all teams
  getTeams(): Observable<Team[]> {
    return this.http
      .get<Team[]>(`${this.api}/teams`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error("An error occurred:", error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return [];
  }
}
