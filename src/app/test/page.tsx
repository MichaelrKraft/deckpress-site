"use client"

export default function TestPage() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>DeckPress Test Page</h1>
      <p>If you can see this without errors, the basic Next.js setup is working.</p>
      <p>Current time: {new Date().toLocaleString()}</p>
      <button onClick={() => alert('Button works!')}>
        Test Button
      </button>
    </div>
  )
}