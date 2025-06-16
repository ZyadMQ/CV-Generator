import { Experience } from "./experience";
import { Education } from "./education";
import { Skill } from "./skill";
import { Award } from "./award";

export type ResumeData = {
    personalInfo: {
        name: string;
        jobTitle: string;
        phone: string;
        email: string;
        linkedin: string;
        website: string;
        address: string;
    };
    summary: string;
    experience: Experience[];
    education: Education[];
    skills: Skill[];
    awards: Award[];
};
