"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; //change to navigation.

export default function AddTopic() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(""); // Add error state

  const router = useRouter();

  // Function to adjust the height of the description textarea based on its content
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      setError("Title and description are required"); // Set error message
      return;
    }

    try {
      const res = await fetch("/api/topics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      if (res.ok) {
        router.refresh();
        router.push("/");
      } else {
        throw new Error("Failed To Create a Topic");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {/* Display error message */}
        {error && <div className="text-red-500">{error}</div>}

        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className="border border-slate-500 px-8 py-2 rounded-md"
          type="text"
          placeholder="Topic Title"
        />

        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="border border-slate-500 px-8 py-2 rounded-md"
          type="text"
          placeholder="Topic Description"
          style={{ minHeight: "300px" }}
        />

        <button
          type="submit"
          className="bg-green-600 font-bold text-white py-3 px-6 w-fit  rounded-md"
        >
          Add Topic
        </button>
      </form>
    </>
  );
}
