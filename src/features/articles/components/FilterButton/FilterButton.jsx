import './FilterButton.scss'

const FilterButton = ({ onClick, isApproved }) => {
  return (
    <button className={`FilterButton ${isApproved ? 'approved' : ''}`} onClick={onClick} aria-pressed={isApproved}>
      <i className='bi bi-filter' aria-hidden="true"></i>
      Filtrar
    </button>
  )
}

export default FilterButton