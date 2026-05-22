'use client';

import { useEffect, useState } from 'react';

import API_URL from '@/api/api';

import { getToken } from '@/api/auth';

export default function UserSearch({ selectedUsers, onAddUser }) {
  const [query, setQuery] = useState('');

  const [results, setResults] = useState([]);

  useEffect(() => {
    async function searchUsers() {
      if (query.trim().length < 2) {
        setResults([]);

        return;
      }

      try {
        const token = getToken();

        const response = await fetch(`${API_URL}/users/search?query=${query}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          return;
        }

        const filteredUsers = data.data.users.filter(
          (user) =>
            !selectedUsers.some((selectedUser) => selectedUser.id === user.id),
        );

        setResults(filteredUsers);
      } catch (error) {
        console.error(error);
      }
    }

    searchUsers();
  }, [query, selectedUsers]);

  return (
    <div>
      <input
        type="text"
        placeholder="Choisir un ou plusieurs collaborateurs"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      {results.length > 0 && (
        <ul>
          {results.map((user) => (
            <li key={user.id}>
              <button
                type="button"
                onClick={() => {
                  onAddUser(user);

                  setQuery('');

                  setResults([]);
                }}
              >
                {user.name} ({user.email})
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
