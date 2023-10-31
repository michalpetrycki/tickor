import { ActivityInput } from "@/resources/activity/activity.model";

export interface Issue {
    id: number;
    statusID: number;
    name: string;
    subject: string;
    categoryID: number;
    projectID: number;
    activity?: ActivityInput[];
}
