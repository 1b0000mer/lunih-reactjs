import { Faculty } from "./faculty.model";
import { Industry } from "./industry.model";

export class Program {
  id!: number;
  nameEn!: string;
  nameLv!: string;
  studyLevel!: string;
  faculty!: Faculty;
  industryList!: Industry[];
  status!: boolean;
}