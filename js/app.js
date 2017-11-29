window.addEventListener('load', init );
/*Funciones*/
/*Total de estudiantes por sede y generacion*/
function totalStudents(place, generation) {
 var totalStudents = data[place][generation].students.length;
 return totalStudents;
};
/*Función para obtener el total de puntos Tech por Sprint de cada alumna*/
function totalPointsPerStudent(place, generation, curse, numberStudent) {
  var totalPoints = 0;
  for ( var i = 0; i < data[place][generation].students[numberStudent].sprints.length; i++) {
      totalPoints += data[place][generation].students[numberStudent].sprints[i].score[curse];
    }
  return totalPoints;
};

/*Función para convertir a porcentaje por Todos los Sprints*/
function convertApercentagePerAllSprints (points, maxScore) {
  var percentage = Math.round(((points / 4) * 100) / maxScore);
  return percentage;
};

/*Función para convertir a porcentaje normal*/
function convertApercentage (points, maxScore) {
  var percentage = Math.round((points * 100) / maxScore);
  return percentage;
};

/*Cantidad de estudiantes que superan y que están debajo de la meta de puntos en promedio de todos los sprints cursados en HSE y en tech.*/
function numberStudentsExceededAndBelowGoalPercentage () {
  var exceededGoal = 0;
  var belowGoal = 0;
  for ( var i = 0; i < data['AQP']['2016-2'].students.length; i++) {
    if ((convertApercentagePerAllSprints(totalPointsPerStudent('AQP', '2016-2', 'tech', i), 1800) + convertApercentagePerAllSprints(totalPointsPerStudent('AQP', '2016-2', 'hse', i), 1200)) / 2 >= 70) {
      exceededGoal ++ ;
    } else {
      belowGoal ++;
    }
  }
  return exceededGoal;
};

/*Promedio de NPS de todos los Sprints por generacion y sede*/

function npsAllSprints (place, generation) {
  var detractors = 0 ;
  var passive = 0;
  var promoters = 0;
  for ( var i = 0; i < data[place][generation].ratings.length; i++) {
    promoters += data[place][generation].ratings[i].nps['promoters'];
    passive += data[place][generation].ratings[i].nps['passive'];
    detractors += data[place][generation].ratings[i].nps['detractors'];
  }
  var npsAllSprints = promoters - detractors;
  return npsAllSprints;
};

/*Porcentaje de estudiantes satisfechas con la experiencia de Laboratoria*/

function satisfiedLaboratoria(place, generation) {
  var satisfied = 0;
  var noCumple = 0;
  var cumple = 0;
  var supera = 0;
  for ( var i = 0; i < data[place][generation].ratings.length; i++) {
    noCumple += data[place][generation].ratings[i].student['no-cumple'];
    cumple += data[place][generation].ratings[i].student['cumple'];
    supera += data[place][generation].ratings[i].student['supera'];
    var totalAlumns = noCumple + cumple + supera;
  }
  satisfied = cumple + supera;
  return convertApercentage(satisfied, totalAlumns);
};

/*Puntuación promedio de l@s profesores*/

function averageTeachersOrJedis(place, generation, teacherOrJedi) {
  var average = 0;
  var long = data[place][generation].ratings.length;
  for ( var i = 0; i < long ; i++) {
    average += data[place][generation].ratings[i][teacherOrJedi];
  }
  return Math.round(average / long);
};

/*Puntuación promedio de l@s jedi masters*/



/*Ejecución del programa*/
function init() {
  console.log(data);
  console.log(numberStudentsExceededAndBelowGoalPercentage());
  console.log(convertApercentage(numberStudentsExceededAndBelowGoalPercentage(), totalStudents('AQP', '2016-2')));
  console.log(npsAllSprints('AQP', '2016-2'));
  console.log(satisfiedLaboratoria('AQP', '2016-2'));
  console.log(averageTeachersOrJedis('AQP', '2016-2', 'teacher'));
  console.log(averageTeachersOrJedis('AQP', '2016-2', 'jedi'));
};
