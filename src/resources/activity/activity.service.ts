import * as activityDal from '@/resources/activity/activity.dal';
import Activity, { ActivityInput, ActivityOutput } from '@/resources/activity/activity.model';
import { GetActivityPaginatedFilters, GetAllActivityFilters } from '@/resources/activity/activity.filter';

class ActivityService {

    public async getById(id: number): Promise<Activity> {
        return activityDal.getById(id);
    }

    public async getByClientID(clientID: number): Promise<Activity[]> {
        return activityDal.getByClientID(clientID);
    }

    // public async getByPersonID(personID: number): Promise<Activity[]> {
    //     return activityDal.getByPersonID(personID);
    // }

    public async getByProjectID(projectID: number): Promise<Activity[]> {
        return activityDal.getByProjectID(projectID);
    }

    public async getByIssueID(issueID: number): Promise<Activity[]> {
        return activityDal.getByIssueID(issueID);
    }

    public async getByIssueCategoryID(categoryID: number): Promise<Activity[]> {
        return activityDal.getByIssueCategoryID(categoryID);
    }

    public async getByIssueStatusID(statusID: number): Promise<Activity[]> {
        return activityDal.getByIssueStatusID(statusID);
    }

    public async getByActivityDate(date: Date): Promise<Activity[]> {
        return activityDal.getByDate(date);
    }

    public async getByUpdated(date: Date): Promise<Activity[]> {
        return activityDal.getByUpdated(date);
    }

    public async getByActivityType(type: string): Promise<Activity[]> {
        return activityDal.getByType(type);
    }

    public async createActivity(payload: ActivityInput): Promise<ActivityOutput> {
        return activityDal.createActivity(payload);
    }

    public async updateActivity(id: number, editProperties: Partial<ActivityInput>): Promise<ActivityOutput> {
        return activityDal.updateActivity(id, editProperties);
    }

    public async deleteActivity(id: number): Promise<boolean> {
        return activityDal.deleteActivity(id);
    }

    public async listActivity(filters?: GetAllActivityFilters): Promise<ActivityOutput[]> {
        return activityDal.listActivity(filters);
    }

    public async listPaginated(filters?: GetActivityPaginatedFilters): Promise<ActivityOutput[]> {
        return activityDal.listPaginated(filters);
    }

}

export default ActivityService;
