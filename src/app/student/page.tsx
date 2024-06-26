'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

interface Student {
  id: number;
  name: string;
  email: string;
}

const StudentPage = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [form, setForm] = useState({ id: 0, name: '', email: '' });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get('/api/student');
      setStudents(res.data);
    } catch (err) {
      setError('Failed to fetch students');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (form.id === 0) {
        await axios.post('/api/student', form);
      } else {
        await axios.put('/api/student', form);
      }
      setForm({ id: 0, name: '', email: '' });
      fetchStudents();
      setError(null);
    } catch (err: any) {
      setError(err.response.data.error);
    }
  };

  const handleEdit = (student: Student) => {
    setForm(student);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete('/api/student', { data: { id } });
      fetchStudents();
      setError(null);
    } catch (err: any) {
      setError(err.response.data.error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Students</h1>
      {error && <div className="mb-4 text-red-500">{error}</div>}
      <form onSubmit={handleSubmit} className="mb-4 bg-white shadow-md rounded px-8 pt-6 pb-8">
        <input type="hidden" name="id" value={form.id} />
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            {form.id === 0 ? 'Add' : 'Update'} Student
          </button>
        </div>
      </form>
      <table className="min-w-full bg-white shadow-md rounded">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td className="border px-4 py-2">{student.id}</td>
              <td className="border px-4 py-2">{student.name}</td>
              <td className="border px-4 py-2">{student.email}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleEdit(student)}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(student.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentPage;
