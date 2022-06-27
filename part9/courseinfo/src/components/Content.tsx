import { CoursePart } from '../types';
import Part from './Part';

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <div>
      {courseParts.map((part) => (
        <Part coursePart={part} key={part.name}></Part>
      ))}
    </div>
  );
};

export default Content;
