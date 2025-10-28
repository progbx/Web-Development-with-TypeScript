export interface JobModel {
    id: string;
    title: string;
    company?: string;
    shortDescription: string;
    fullDescription: string;
    requirements: string[];
}