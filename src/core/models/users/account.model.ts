export class Account {
  id!: number;
  email!: string;
  password!: string;
  role!: string;
  status!: boolean;
}

export class StudentAccountDTO {
  email!: string;
  password!: string;
  studentID!: string;
  firstName!: string;
  surName!: string;
  program!: number;
  birthDay?: Date;
  gender?: string;
  phoneNumber?: string;
}

export class UniversityAccountDTO {
  email!: string;
  password!: string;
  name!: string;
  address?: string;
  phoneNumber?: string;
  programList!: number[];
}

export class CompanyAccountDTO {
  email!: string;
  password!: string;
  companyName!: string;
  companyDescription!: string;
  companyType!: string;
  companyAddress?: string;
  companyWebsite?: string;
  companyLogo?: string;
  industryList!: number[]; 
  companyContactPersonTitle?: string;
  companyContactPersonName!: string;
  companyContactPersonDepartment?: string;
  companyContactPersonEmail?: string;
  companyContactPersonPhoneNumber?: string;
}