import { useMemo } from 'react'
import './App.css'

function App() {
  const { year, dayOfYear, totalDays, daysLeft } = useMemo(() => {
    const now = new Date()
    const year = now.getFullYear()
    const startOfYear = new Date(year, 0, 1)
    
    // Calculate day of year (1-indexed)
    const dayOfYear = Math.floor(
      (now.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)
    ) + 1
    
    // Check if leap year
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
    const totalDays = isLeapYear ? 366 : 365
    
    const daysLeft = totalDays - dayOfYear
    
    return { year, dayOfYear, totalDays, daysLeft }
  }, [])

  const dots = useMemo(() => {
    return Array.from({ length: totalDays }, (_, i) => {
      const dayNumber = i + 1
      const isPast = dayNumber < dayOfYear
      const isToday = dayNumber === dayOfYear
      
      // Calculate the actual date for this day
      const date = new Date(year, 0, dayNumber)
      const dateStr = date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
      })
      const tooltip = `${dateStr}\nDay ${dayNumber} of ${totalDays}`
      
      return { dayNumber, isPast, isToday, tooltip }
    })
  }, [totalDays, dayOfYear, year])

  return (
    <div className="container">
      <header className="header">
        <div className="pill year-pill">{year}</div>
        <div className="pill days-pill">{daysLeft} days left</div>
      </header>

      <main className="calendar-wrapper">
        <div className="calendar-grid">
          {dots.map((dot) => (
            <div
              key={dot.dayNumber}
              className={`dot ${dot.isPast ? 'past' : ''} ${dot.isToday ? 'today' : ''}`}
              title={dot.tooltip}
            />
          ))}
        </div>
      </main>

      <footer className="footer">
        <span className="footer-text">
          day {dayOfYear} of {totalDays}
        </span>
      </footer>
    </div>
  )
}

export default App
