export default function TasksHeader() {
  return (
    <section>
      <div>
        <h2>Tâches</h2>

        <p>Par ordre de priorité</p>
      </div>

      <div>
        <button type="button">Liste</button>

        <button type="button">Calendrier</button>

        <button type="button">Statut</button>

        <input type="search" placeholder="Rechercher une tâche" />
      </div>
    </section>
  );
}
