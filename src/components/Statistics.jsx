import React from 'react'

export const STATS_DATA = [
  {
    id: 'box1',
    value: '58%',
    description: 'Increase in pick up point use',
    className: 'stat-box-1',
    bgColor: '#def54f',
    textColor: '#111111',
  },
  {
    id: 'box2',
    value: '23%',
    description: 'Decreased in customer phone calls',
    className: 'stat-box-2',
    bgColor: '#6ac9ff',
    textColor: '#111111',
  },
  {
    id: 'box3',
    value: '27%',
    description: 'Increase in pick up point use',
    className: 'stat-box-3',
    bgColor: '#333333',
    textColor: '#ffffff',
  },
  {
    id: 'box4',
    value: '40%',
    description: 'Decreased in customer phone calls',
    className: 'stat-box-4',
    bgColor: '#fa7328',
    textColor: '#111111',
  },
]

export default function Statistics({ setBoxRef }) {
  return (
    <>
      {STATS_DATA.map((item, index) => (
        <div
          key={item.id}
          id={item.id}
          ref={(el) => setBoxRef(index, el)}
          className={`stat-box ${item.className}`}
          style={{
            backgroundColor: item.bgColor,
            color: item.textColor,
          }}
          role="region"
          aria-label={`Impact metric: ${item.value} ${item.description}`}
        >
          <span className="num-metric">{item.value}</span>
          <span className="label-text">{item.description}</span>
        </div>
      ))}
    </>
  )
}
