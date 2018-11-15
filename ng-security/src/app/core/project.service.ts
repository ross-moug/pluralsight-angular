import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { Constants } from '../constants';
import { Project } from '../model/project';
import { Observable } from 'rxjs/Observable';
import { Milestone } from '../model/milestone';
import { UserPermission } from '../model/user-permission';
import { UserProfile } from '../model/user-profile';
import { MilestoneStatus } from '../model/milestone-status';
import { AuthService } from './auth.service';

@Injectable()
export class ProjectService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService) {
  }

  getProjects(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(`${Constants.apiRoot}Projects`, this.createOptions());
  }

  getProject(projectId: number): Observable<Project> {
    return this.httpClient.get<Project>(`${Constants.apiRoot}Projects/${projectId}`, this.createOptions());
  }

  getProjectUsers(projectId: number): Observable<UserProfile[]> {
    return this.httpClient.get<UserProfile[]>(`${Constants.apiRoot}Projects/${projectId}/Users`, this.createOptions());
  }

  addProject(project: Project): Observable<Project> {
    return this.httpClient.post<Project>(`${Constants.apiRoot}Projects`, project, this.createOptions());
  }

  deleteProject(project: Project): Observable<object> {
    return this.httpClient.delete(`${Constants.apiRoot}Projects/${project.id}`, this.createOptions());
  }

  addUserPermission(userPermission: UserPermission) {
    return this.httpClient.post(`${Constants.apiRoot}UserPermissions`, userPermission, this.createOptions());
  }

  removeUserPermission(userId: string, projectId: number) {
    return this.httpClient.delete(`${Constants.apiRoot}UserPermissions/?userId=${userId}&projectId=${projectId}`, this.createOptions());
  }

  updateUserPermission(userPermission) {
    return this.httpClient.put(`${Constants.apiRoot}UserPermissions`, userPermission, this.createOptions());
  }

  getMilestones(projectId: number): Observable<Milestone[]> {
    return this.httpClient.get<Milestone[]>(`${Constants.apiRoot}Milestone`, this.createOptions());
  }

  getMilestoneStatuses() {
    return this.httpClient.get<MilestoneStatus[]>(`${Constants.apiRoot}Projects/MilestoneStatuses`, this.createOptions());
  }

  addMilestone(milestone: Milestone) {
    return this.httpClient.post(`${Constants.apiRoot}Projects/Milestones`, milestone, this.createOptions());
  }

  deleteMilestone(id: number) {
    return this.httpClient.delete(`${Constants.apiRoot}Projects/Milestones/${id}`, this.createOptions());
  }

  updateMilestone(milestone: Milestone) {
    return this.httpClient.put(`${Constants.apiRoot}Projects/Milestones/${milestone.id}`, milestone);
  }

  createOptions(): { headers: HttpHeaders } {
    return { headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.getAccessToken()}`) };
  }
}
