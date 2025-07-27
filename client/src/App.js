import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Dashboard from './Dashboard';
import Reminders from './Reminders';
import Assistant from './Assistant';

function Home({ jobs, handleDelete }) {
  return (
    <main className="p-6 space-y-6">
      {jobs.map((job) => (
        <div
          key={job.id}
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow flex justify-between items-start"
        >
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{job.title}</h2>
            <p className="text-gray-600">Location: {job.location}</p>
            <p className="text-gray-600">Applied on: {job.appliedDate}</p>
            <p className="text-blue-600 font-medium">Status: {job.status}</p>
          </div>
          <button
            onClick={() => handleDelete(job.id)}
            className="text-red-600 hover:text-red-800 font-medium"
          >
            Delete
          </button>
        </div>
      ))}
    </main>
  );
}

function AddJob({ newJob, handleChange, handleSubmit }) {
  return (
    <main className="p-6 space-y-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md space-y-4"
      >
        <h2 className="text-lg font-semibold">Add a New Job</h2>
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={newJob.title}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={newJob.location}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          name="appliedDate"
          value={newJob.appliedDate}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="status"
          placeholder="Status"
          value={newJob.status}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Job
        </button>
      </form>
    </main>
  );
}

function App() {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Software Engineer - Google",
      location: "Bengaluru",
      appliedDate: "2025-06-25",
      status: "Interview Scheduled"
    },
    {
      id: 2,
      title: "Frontend Developer - Microsoft",
      location: "Hyderabad",
      appliedDate: "2025-06-26",
      status: "Application Submitted"
    },
    {
      id: 3,
      title: "Backend Intern - Amazon",
      location: "Remote",
      appliedDate: "2025-06-27",
      status: "In Review"
    }
  ]);

  const [newJob, setNewJob] = useState({
    title: "",
    location: "",
    appliedDate: "",
    status: ""
  });

  const handleChange = (e) => {
    setNewJob({ ...newJob, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const jobToAdd = { ...newJob, id: Date.now() };
    setJobs([...jobs, jobToAdd]);
    setNewJob({ title: "", location: "", appliedDate: "", status: "" });
  };

  const handleDelete = (id) => {
    const updatedJobs = jobs.filter((job) => job.id !== id);
    setJobs(updatedJobs);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 text-2xl font-bold shadow-md flex justify-between">
        <span>JobTrackr</span>
        <nav className="space-x-4 text-lg">
          <Link to="/">Home</Link>
          <Link to="/add">Add Job</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/reminders">Reminders</Link>
          <Link to="/assistant">AI Assistant</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home jobs={jobs} handleDelete={handleDelete} />} />
        <Route path="/add" element={<AddJob newJob={newJob} handleChange={handleChange} handleSubmit={handleSubmit} />} />
        <Route path="/dashboard" element={<Dashboard jobs={jobs} />} />
        <Route path="/reminders" element={<Reminders jobs={jobs} />} />
        <Route path="/assistant" element={<Assistant />} />
      </Routes>
    </div>
  );
}

export default App;
