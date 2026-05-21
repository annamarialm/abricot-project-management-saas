'use client';

import { useState } from 'react';

export default function AITaskForm({ onClose }) {
  const [prompt, setPrompt] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    console.log(prompt);

    onClose();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Créer une tâche</h2>

      <div>
        <textarea
          id="prompt"
          name="prompt"
          placeholder="Décrivez les tâches que vous souhaitez ajouter..."
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          required
        />
      </div>
    </form>
  );
}
