'use client';

import { useState } from 'react';

import API_URL from '@/api/api';

import { getToken } from '@/api/auth';

import StatusBadge from '@/components/StatusBadge/StatusBadge';

import UserAvatar from '@/components/UserAvatar/UserAvatar';

export default function TaskCard({
  task,
  projectId,
  onEdit,
  canEditTask,
  canComment,
}) {
  const [showComments, setShowComments] = useState(false);

  const [commentText, setCommentText] = useState('');

  const [comments, setComments] = useState(task.comments || []);

  async function handleAddComment(event) {
    event.preventDefault();

    if (!commentText.trim()) {
      return;
    }

    try {
      const token = getToken();

      const response = await fetch(
        `${API_URL}/projects/${projectId}/tasks/${task.id}/comments`,
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',

            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            content: commentText,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        return;
      }

      setComments((prev) => [...prev, data.data.comment]);

      setCommentText('');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <article>
      <header>
        <div>
          <h3>{task.title}</h3>

          <StatusBadge status={task.status} />
        </div>
        {canEditTask && (
          <button type="button" onClick={() => onEdit(task)}>
            Modifier
          </button>
        )}{' '}
      </header>

      <p>{task.description}</p>

      <div>
        <p>
          Échéance :{' '}
          {task.dueDate
            ? new Date(task.dueDate).toLocaleDateString('fr-FR')
            : 'Aucune'}
        </p>

        <div>
          <p>Assigné à :</p>

          {task.assignees.length > 0 ? (
            <ul>
              {task.assignees.map((assignee) => (
                <li key={assignee.id}>
                  <UserAvatar user={assignee.user} />

                  <span>{assignee.user.name}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>Aucun assigné</p>
          )}
        </div>
      </div>

      {canComment && (
        <footer>
          <button type="button" onClick={() => setShowComments(!showComments)}>
            Commentaires ({comments.length}) {showComments ? '▲' : '▼'}
          </button>

          {showComments && (
            <div>
              {comments.length > 0 ? (
                <ul>
                  {comments.map((comment) => (
                    <li key={comment.id}>
                      <p>{comment.content}</p>

                      {comment.author && <small>{comment.author.name}</small>}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Aucun commentaire</p>
              )}

              <form onSubmit={handleAddComment}>
                <textarea
                  placeholder="Ajouter un commentaire..."
                  value={commentText}
                  onChange={(event) => setCommentText(event.target.value)}
                />

                <button type="submit">Ajouter</button>
              </form>
            </div>
          )}
        </footer>
      )}
    </article>
  );
}
