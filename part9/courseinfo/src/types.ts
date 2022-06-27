export interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

export interface CoursePartDescribed extends CoursePartBase {
  description: string;
}

export interface CourseNormalPart extends CoursePartDescribed {
  type: 'normal';
}
export interface CourseProjectPart extends CoursePartBase {
  type: 'groupProject';
  groupProjectCount: number;
}

export interface CourseSubmissionPart extends CoursePartDescribed {
  type: 'submission';
  exerciseSubmissionLink: string;
}

export interface CourseSpecialPart extends CoursePartDescribed {
  type: 'special';
  requirements: string[];
}

export type CoursePart =
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart
  | CourseSpecialPart;
