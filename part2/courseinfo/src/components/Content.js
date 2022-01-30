import React from 'react'
import Part from './Part'

const Content = ({ parts }) => {
  return (
    <section>
      {parts.map(p =>
        (<Part part={p} key={p.id}/>)
      )}
    </section>
  );
};

export default Content