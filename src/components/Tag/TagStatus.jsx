import './TagStatus.scss';

const STATUS_CONFIG = {
  PUBLISHED: {
    label: 'Publicado',
    className: 'tag-status tag-status--published',
  },
  IN_REVIEW: {
    label: 'En Revisión',
    className: 'tag-status tag-status--in-review',
  },
  DRAFT: {
    label: 'Borrador',
    className: 'tag-status tag-status--draft',
  },
}

function TagStatus({ status }) {
  const config = STATUS_CONFIG[status]

  if (!config) return null

  return (
    <span className={config.className}>
      {config.label}
    </span>
  )
}

export default TagStatus;