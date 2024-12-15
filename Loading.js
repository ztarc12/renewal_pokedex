'use client'

export default function Loading() {
  return(
    <div className="loadings">
      <img src={'/pokeball.png'} style={{ width: '100px', height: '100px', marginBottom: '10px' }}/>
      <h3>로딩 중...</h3>
    </div>
  )
}