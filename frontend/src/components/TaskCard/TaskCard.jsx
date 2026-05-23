'use client';

import { useState } from 'react';

import Image from 'next/image';

import API_URL from '@/api/api';

import { getToken } from '@/api/auth';

import StatusBadge from '@/components/StatusBadge/StatusBadge';

import './TaskCard.css';

export default function TaskCard({
  task,
  projectId,
  onEdit,
  canEditTask,
  canComment,
  showComments = true,
}) {
  const [showCommentsSection, setShowCommentsSection] = useState(false);

  const [commentText, setCommentText] = useState('');

  const [comments, setComments] = useState(task.comments || []);

  function getInitials(name = '') {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  }

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
    <article className="task-card">
      <div className="task-card__top">
        <div className="task-card__main">
          <div className="task-card__title-row">
            <h3 className="task-card__title">{task.title}</h3>

            <StatusBadge status={task.status} />
          </div>

          <p className="task-card__description">{task.description}</p>

          <div className="task-card__meta">
            <p className="task-card__label">Échéance :</p>

            <div className="task-card__meta-item">
              <Image
                src="/icons/calendar.svg"
                alt=""
                width={14}
                height={14}
                aria-hidden="true"
              />

              <span>
                {task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                    })
                  : 'Aucune'}
              </span>
            </div>
          </div>

          <div className="task-card__assignees">
            <p className="task-card__label">Assigné à :</p>

            {task.assignees.length > 0 ? (
              <ul className="task-card__assignees-list">
                {task.assignees.map((assignee) => (
                  <li key={assignee.id} className="task-card__assignee">
                    <div className="task-card__assignee-avatar">
                      {getInitials(assignee.user.name)}
                    </div>

                    <div className="task-card__assignee-name">
                      {assignee.user.name}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="task-card__empty">Aucun assigné</p>
            )}
          </div>
        </div>

        {canEditTask && (
          <button
            type="button"
            className="task-card__options"
            onClick={() => onEdit(task)}
            aria-label="Modifier la tâche"
          >
            <Image
              src="/icons/options.svg"
              alt=""
              width={57}
              height={57}
              aria-hidden="true"
            />
          </button>
        )}
      </div>

      <div className="task-card__divider" />

      {showComments && canComment && (
        <footer className="task-card__footer">
          <button
            type="button"
            className="task-card__comments-toggle"
            onClick={() => setShowCommentsSection(!showCommentsSection)}
          >
            <span>Commentaires ({comments.length})</span>

            <Image
              src="/icons/uparrow.svg"
              alt=""
              width={16}
              height={16}
              aria-hidden="true"
              className={
                showCommentsSection
                  ? 'task-card__arrow task-card__arrow--open'
                  : 'task-card__arrow'
              }
            />
          </button>

          {showCommentsSection && (
            <div className="task-card__comments">
              {comments.length > 0 ? (
                <ul className="task-card__comments-list">
                  {comments.map((comment) => (
                    <li key={comment.id} className="task-card__comment">
                      <p>{comment.content}</p>

                      {comment.author && <small>{comment.author.name}</small>}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="task-card__empty">Aucun commentaire</p>
              )}

              <form
                onSubmit={handleAddComment}
                className="task-card__comment-form"
              >
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
