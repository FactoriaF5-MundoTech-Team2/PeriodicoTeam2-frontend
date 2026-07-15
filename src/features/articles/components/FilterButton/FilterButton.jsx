import './FilterButton.scss'

const STATUSES = [
  { label: 'Todos', value: '' },
  { label: 'Borrador', value: 'DRAFT' },
  { label: 'En revisión', value: 'IN_REVIEW' },
  { label: 'Publicado', value: 'PUBLISHED' },
]

const FilterButton = ({ onFilter, activeStatus }) => {
  return (
    <select
      className={`FilterButton ${activeStatus ? 'active' : ''}`}
      value={activeStatus}
      onChange={(e) => onFilter(e.target.value)}
      aria-label="Filtrar artículos"
    >
      {STATUSES.map(status => (
        <option key={status.value} value={status.value}>
          {status.label}
        </option>
      ))}
    </select>
  )
}

export default FilterButton