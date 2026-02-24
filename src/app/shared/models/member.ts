export interface Member {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  age: number;
}

export interface MemberFormData {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  age: string;
}
