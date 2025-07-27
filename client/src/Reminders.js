import React, { useState } from 'react';

function Reminders({ jobs }) {
  const [reminders, setReminders] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState('');
  const [note, setNote] = useState('');

  const handleAddReminder = (e) => {
    e.preventDefault();
    if (!selectedJobId || !note) return;

    const job = jobs.find((j) => j.id === parseInt(selectedJobId));
    const newReminder = {
      id: Date.now(),
      jobTitle: job.title,
      note,
    };

    setReminders([...reminders, newReminder]);
    setNote('');
  };

  return (
    <main className="p-6">
      <h2 className="text-2xl font-bold mb-4">🔔 Job Reminders</h2>

      {/* Add Reminder Form */}
      <form
        onSubmit={handleAddReminder}
        className="bg-white p-4 rounded-xl shadow-md mb-6 space-y-4"
      >
        <select
          value={selectedJobId}
          onChange={(e) => setSelectedJobId(e.target.value)}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Job</option>
          {jobs.map((job) => (
            <option key={job.id} value={job.id}>
              {job.title}
            </option>
          ))}
        </select>
        <textarea
          placeholder="Write a reminder note..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Reminder
        </button>
      </form>

      {/* Display Reminders */}
      <div className="space-y-4">
        {reminders.map((reminder) => (
          <div
            key={reminder.id}
            className="bg-yellow-100 p-4 rounded-xl shadow"
          >
            <h3 className="font-semibold">{reminder.jobTitle}</h3>
            <p>{reminder.note}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Reminders;
