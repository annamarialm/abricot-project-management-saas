'use client';

import Image from 'next/image';

import './TasksHeader.css';

export default function TasksHeader() {
  return (
    <div className="tasks-header">
      <div className="tasks-header__views">
        <button
          type="button"
          className="tasks-header__view tasks-header__view--active"
        >
          <Image
            src="/icons/liste.svg"
            alt=""
            width={16}
            height={16}
            aria-hidden="true"
          />

          <span>Liste</span>
        </button>

        <button type="button" className="tasks-header__view">
          <Image
            src="/icons/calendarorange.svg"
            alt=""
            width={16}
            height={16}
            aria-hidden="true"
          />

          <span>Calendrier</span>
        </button>
      </div>

      <button type="button" className="tasks-header__filter">
        <span>Statut</span>
        <Image
          src="/icons/downarrow.svg"
          alt=""
          width={16}
          height={16}
          aria-hidden="true"
        />{' '}
      </button>

      <div className="tasks-header__search">
        <input type="search" placeholder="Rechercher une tâche" />

        <Image
          src="/icons/search.svg"
          alt=""
          width={18}
          height={18}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
