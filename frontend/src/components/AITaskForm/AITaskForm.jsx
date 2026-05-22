'use client';

import './AITaskForm.css';

import { useState } from 'react';

export default function AITaskForm({ onClose }) {
  const [prompt, setPrompt] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    console.log(prompt);

    onClose();
  }

  return (
    <form className="ai-task-form" onSubmit={handleSubmit}>
      <div className="ai-task-form__header">
        <img
          src="/icons/Star 1.svg"
          alt=""
          className="ai-task-form__title-icon"
        />

        <h2>Créer une tâche</h2>
      </div>

      <div className="ai-task-form__content" />

      <div className="ai-task-form__prompt-wrapper">
        <textarea
          id="prompt"
          name="prompt"
          className="ai-task-form__prompt"
          placeholder="Décrivez les tâches que vous souhaitez ajouter..."
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          required
        />

        <button
          type="submit"
          className="ai-task-form__submit-button"
          aria-label="Envoyer la demande IA"
        >
          <img src="/icons/IA button.svg" alt="" />
        </button>
      </div>
    </form>
  );
}
