import { Seq } from 'immutable';

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export default function printBestStudents(object) {
  const studentsSeq = Seq(object);
  const bestStudents = studentsSeq
    .filter((student) => student.score >= 70)
    .map((student) => ({
      ...student,
      firstName: capitalize(student.firstName),
      lastName: capitalize(student.lastName),
    }));
  console.log(bestStudents.toJS());
}
