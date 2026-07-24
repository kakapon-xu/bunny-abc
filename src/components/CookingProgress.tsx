interface CookingProgressProps {
  total: number
  current: number  // 0-based: 0 = 第 1 步进行中
}

function CookingProgress({ total, current }: CookingProgressProps) {
  return (
    <div className="cook-progress">
      {Array.from({ length: total }, (_, i) => {
        let dotClass = 'cook-progress-dot'
        if (i < current) dotClass += ' done'
        else if (i === current) dotClass += ' current'
        return <div key={i} className={dotClass} />
      })}
    </div>
  )
}

export default CookingProgress
