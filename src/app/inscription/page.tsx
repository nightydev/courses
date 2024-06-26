'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

interface Inscription {
  id: number;
  course_id: number;
  student_id: number;
  date: string;
}

const InscriptionPage = () => {
  const [inscriptions, setInscriptions] = useState<Inscription[]>([]);
  const [form, setForm] = useState({ id: 0, course_id: 0, student_id: 0, date: '' });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchInscriptions();
  }, []);

  const fetchInscriptions = async () => {
    try {
      const res = await axios.get('/api/inscription');
      setInscriptions(res.data);
    } catch (err) {
      setError('Failed to fetch inscriptions');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (form.id === 0) {
        await axios.post('/api/inscription', form);
      } else {
        await axios.put('/api/inscription', form);
      }
      setForm({ id: 0, course_id: 0, student_id: 0, date: '' });
      fetchInscriptions();
      setError(null);
    } catch (err: any) {
      setError(err.response.data.error);
    }
  };

  const handleEdit = (inscription: Inscription) => {
    setForm(inscription);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete('/api/inscription', { data: { id } });
      fetchInscriptions();
      setError(null);
    } catch (err: any) {
      setError(err.response.data.error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Inscriptions</h1>
      {error && <div className="mb-4 text-red-500">{error}</div>}
      <form onSubmit={handleSubmit} className="mb-4 bg-white shadow-md rounded px-8 pt-6 pb-8">
        <input type="hidden" name="id" value={form.id} />
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Course ID</label>
          <input
            type="number"
            name="course_id"
            value={form.course_id}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Student ID</label>
          <input
            type="number"
            name="student_id"
            value={form.student_id}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            {form.id === 0 ? 'Add' : 'Update'} Inscription
          </button>
        </div>
      </form>
      <table className="min-w-full bg-white shadow-md rounded">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Course ID</th>
            <th className="px-4 py-2">Student ID</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {inscriptions.map(inscription => (
            <tr key={inscription.id}>
              <td className="border px-4 py-2">{inscription.id}</td>
              <td className="border px-4 py-2">{inscription.course_id}</td>
              <td className="border px-4 py-2">{inscription.student_id}</td>
              <td className="border px-4 py-2">{inscription.date}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleEdit(inscription)}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(inscription.id)}
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

export default InscriptionPage;
