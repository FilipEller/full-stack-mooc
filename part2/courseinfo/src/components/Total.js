const Total = ({ parts }) => {

  return <>
    <p><b>Total number of exercises {parts.reduce((total, part) => 
    total + part.exercises, 0
    )}
    </b></p>
  </>;
};

export default Total