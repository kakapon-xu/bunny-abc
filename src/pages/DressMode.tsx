import { useEffect } from 'react'

function DressMode() {
  useEffect(() => {
    // 跳转到静态的穿衣服页面
    const baseUrl = import.meta.env.BASE_URL || '/'
    window.location.href = `${baseUrl}dress-up/`
  }, [])

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      fontSize: '18px',
      color: '#888',
    }}>
      Loading dress up game...
    </div>
  )
}

export default DressMode
