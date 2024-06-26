'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

interface Course {
  id: number;
  name: string;
  description: string;
  duration: number;
}

const CoursePage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [form, setForm] = useState({ id: 0, name: '', description: '', duration: 0 });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get('/api/course');
      setCourses(res.data);
    } catch (err) {
      setError('Failed to fetch courses');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (form.id === 0) {
        await axios.post('/api/course', form);
      } else {
        await axios.put('/api/course', form);
      }
      setForm({ id: 0, name: '', description: '', duration: 0 });
      fetchCourses();
      setError(null);
    } catch (err: any) {
      setError(err.response.data.error);
    }
  };

  const handleEdit = (course: Course) => {
    setForm(course);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete('/api/course', { data: { id } });
      fetchCourses();
      setError(null);
    } catch (err: any) {
      setError(err.response.data.error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Courses</h1>
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
          <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Duration</label>
          <input
            type="number"
            name="duration"
            value={form.duration}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            {form.id === 0 ? 'Add' : 'Update'} Course
          </button>
        </div>
      </form>
      <table className="min-w-full bg-white shadow-md rounded">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Duration</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr key={course.id}>
              <td className="border px-4 py-2">{course.id}</td>
              <td className="border px-4 py-2">{course.name}</td>
              <td className="border px-4 py-2">{course.description}</td>
              <td className="border px-4 py-2">{course.duration}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleEdit(course)}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(course.id)}
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

export default CoursePage;
