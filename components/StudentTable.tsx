
import React from 'react';
import { databaseService } from '../services/databaseService';

const StudentTable: React.FC = () => {
  const students = databaseService.getStudents();
  
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex justify-between items-center">
        <h3 className="font-semibold text-slate-700 flex items-center gap-2">
          <i className="fa-solid fa-database text-blue-500"></i>
          Student Database (Read Only)
        </h3>
        <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
          {students.length} Records
        </span>
      </div>
      <div className="max-h-[400px] overflow-y-auto">
        <table className="w-full text-left text-sm">
          <thead className="sticky top-0 bg-white shadow-sm">
            <tr>
              <th className="px-4 py-2 font-semibold text-slate-500">ID</th>
              <th className="px-4 py-2 font-semibold text-slate-500">Name</th>
              <th className="px-4 py-2 font-semibold text-slate-500">Dept</th>
              <th className="px-4 py-2 font-semibold text-slate-500">Marks</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {students.map((student) => (
              <tr key={student.student_id} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-2 text-slate-500">{student.student_id}</td>
                <td className="px-4 py-2 font-medium">{student.name}</td>
                <td className="px-4 py-2">
                   <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                     student.department === 'Computer Science' ? 'bg-indigo-50 text-indigo-600' :
                     student.department === 'Mechanical' ? 'bg-orange-50 text-orange-600' :
                     student.department === 'Electrical' ? 'bg-yellow-50 text-yellow-600' :
                     'bg-emerald-50 text-emerald-600'
                   }`}>
                    {student.department}
                   </span>
                </td>
                <td className="px-4 py-2 font-mono font-bold text-slate-700">{student.marks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentTable;
