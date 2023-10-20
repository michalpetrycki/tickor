import { Activity } from "@/resources/activity/activity.interface"
import { ActivityOutput } from "@/resources/activity/activity.model"


export const toActivity = (activity: ActivityOutput): Activity => {
    return {
        id: activity.id,
        clientID: activity.clientID,
        personID: activity.personID,
        projectID: activity.projectID,
        issueID: activity.issueID,
        issueCategoryID: activity.issueCategoryID,
        issueStatusID: activity.issueStatusID,
        activityDate: activity.activityDate,
        updated: activity.updated,
        activityType: activity.activityType,
        activityDetails: activity.activityDetails
    }
}
