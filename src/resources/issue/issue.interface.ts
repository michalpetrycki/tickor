import { Activity } from "@/resources/activity/activity.interface";

export interface Issue {
    id: number;
    statusID: number;
    name: string;
    subject: string;
    categoryID: number;
    projectID: number;
    activity?: Activity;
}
