
import { Student } from '../types';

const SYNTHETIC_DATA: Student[] = [
  { student_id: 1, name: 'Aarav', department: 'Computer Science', marks: 78 },
  { student_id: 2, name: 'Diya', department: 'Computer Science', marks: 85 },
  { student_id: 3, name: 'Rohan', department: 'Computer Science', marks: 90 },
  { student_id: 4, name: 'Neha', department: 'Computer Science', marks: 88 },
  { student_id: 5, name: 'Kabir', department: 'Mechanical', marks: 72 },
  { student_id: 6, name: 'Ananya', department: 'Mechanical', marks: 75 },
  { student_id: 7, name: 'Vikram', department: 'Mechanical', marks: 70 },
  { student_id: 8, name: 'Pooja', department: 'Electrical', marks: 80 },
  { student_id: 9, name: 'Rahul', department: 'Electrical', marks: 82 },
  { student_id: 10, name: 'Sneha', department: 'Electrical', marks: 78 },
  { student_id: 11, name: 'Aman', department: 'Civil', marks: 68 },
  { student_id: 12, name: 'Nisha', department: 'Civil', marks: 65 },
  { student_id: 13, name: 'Kunal', department: 'Civil', marks: 70 },
  { student_id: 14, name: 'Meera', department: 'Computer Science', marks: 92 },
  { student_id: 15, name: 'Sarthak', department: 'Mechanical', marks: 77 },
];

export const databaseService = {
  getStudents: (): Student[] => [...SYNTHETIC_DATA],
  
  getMarksByDepartment: (department: string): number[] => {
    const normalizedDept = department.toLowerCase().trim();
    return SYNTHETIC_DATA
      .filter(s => s.department.toLowerCase() === normalizedDept)
      .map(s => s.marks);
  },
  
  getDepartments: (): string[] => {
    return Array.from(new Set(SYNTHETIC_DATA.map(s => s.department)));
  }
};
