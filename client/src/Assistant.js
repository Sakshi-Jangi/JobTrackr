import React, { useState, useRef, useEffect } from 'react';

const Assistant = () => {
  const [prompt, setPrompt] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const handleAsk = async () => {
    if (!prompt.trim()) return;
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      const newEntry = {
        prompt,
        response: data.response || 'Something went wrong. Try again.',
      };

      setChatHistory((prev) => [...prev, newEntry]);
      setPrompt('');
    } catch (error) {
      setChatHistory((prev) => [
        ...prev,
        { prompt, response: '❌ Error talking to AI' },
      ]);
    }

    setLoading(false);
  };

  const handleClearChat = () => {
    setChatHistory([]);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert('✅ Copied to clipboard!');
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 bg-white shadow-xl rounded-2xl">
      <h2 className="text-2xl font-bold mb-4 text-center">🧠 AI Assistant</h2>

      <textarea
        className="w-full p-3 border rounded-lg resize-none"
        rows={4}
        placeholder="Ask something like 'How to improve my resume?'"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <div className="flex justify-between mt-4">
        <button
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
          onClick={handleAsk}
          disabled={loading}
        >
          {loading ? 'Thinking...' : 'Ask Gemini'}
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600"
          onClick={handleClearChat}
        >
          Clear Chat
        </button>
      </div>

      <div className="mt-6 space-y-4 max-h-[400px] overflow-y-auto">
        {chatHistory.map((entry, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-md shadow-sm">
            <p><strong>🧑 You:</strong> {entry.prompt}</p>
            <p className="mt-2 whitespace-pre-wrap">
              <strong>🤖 Gemini:</strong> {entry.response}
            </p>
            <button
              className="mt-2 text-sm text-blue-600 hover:underline"
              onClick={() => handleCopy(entry.response)}
            >
              📋 Copy Response
            </button>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
    </div>
  );
};

export default Assistant;
