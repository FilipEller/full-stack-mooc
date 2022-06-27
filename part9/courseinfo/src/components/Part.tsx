import { CoursePart } from '../types';

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const courseInfo = () => {
    switch (coursePart.type) {
      case 'normal':
        return <i>{coursePart.description}</i>;
      case 'groupProject':
        return <>project exercises: {coursePart.groupProjectCount}</>;
      case 'submission':
        return (
          <>
            <i>{coursePart.description}</i>
            <br />
            {coursePart.exerciseSubmissionLink}
          </>
        );
      case 'special':
        return (
          <>
            <i>{coursePart.description}</i>
            <br />
            required skills: {coursePart.requirements.join(', ')}
          </>
        );
      default:
        return assertNever(coursePart);
    }
  };

  return (
    <div>
      <p>
        <b>
          {coursePart.name} {coursePart.exerciseCount}
        </b>
        <br />
        {courseInfo()}
      </p>
    </div>
  );
};

export default Part;
