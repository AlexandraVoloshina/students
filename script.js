function Student(name, age) {
  this.name = name;
  this.age = age;
  this.marks = [];
}

//Добавление оценки
Student.prototype.addMarks = function(mark, numberLesson){
    this.marks[numberLesson - 1] = mark;    
};

//Функция получения средней оценки по имени для сортировки
Student.prototype.getAverageMark = function(){
  var avg = this.marks.reduce(function(sum, current){
    return (sum + current)/2;
  });
return avg.toFixed(2);
};

//Создаем функцию Group
function Group(){
  for (var i = 0; i < arguments.length; i++){
    this.push(arguments[i]);
  }
 } 

Group.prototype = Object.create(Array.prototype);

//Средняя оценка за предмет
Group.prototype.getAverageMarkGroup = function(){
  var temp = this;
  var avg = this[0].marks.map(function(s, i) {
    avg = temp.reduce(function(sum, current){
        return (sum + current.marks[i])/2;
      }, 0);
    console.log("Предмет: " + i + " оценка: " + avg);
  }); 
};

  //Получение отсортированного по среднему балу списка студентов
 Group.prototype.sortAverageMarkGroup = function(){
    this.sort(function(a, b) {
        return a.getAverageMark() > b.getAverageMark() ? 1 : -1;
      });
    return this;
};

 //Добавление студента
Group.prototype.addStudent = function(obj){
  this.push(obj);
  return this;
};

//Удаление студента
Group.prototype.removeStudent = function(name) {
  var indexStudent = this.findIndex(function(student){
    return student.name === name;
  });
  this.splice(indexStudent, 1);
};



var den = new Student('Denis', 30);
var olya =  new Student('Olya', 25);
var nikita =  new Student('Nikita', 25);
var alex =  new Student('Alex', 25);
var anatoliy =  new Student('Anatoliy', 25);

den.addMarks(3, 1);
den.addMarks(3, 2);
den.addMarks(3, 3);
olya.addMarks(2, 1);
olya.addMarks(2, 2);
olya.addMarks(2, 3);
nikita.addMarks(1, 1);
nikita.addMarks(1, 2);
nikita.addMarks(1, 3);
alex.addMarks(4, 1);
alex.addMarks(4, 2);
alex.addMarks(4, 3);
anatoliy.addMarks(5, 1);
anatoliy.addMarks(5, 2);
anatoliy.addMarks(5, 3);
console.log(`Средняя оценка ${den.name}: ` + den.getAverageMark());
console.log(`Средняя оценка ${olya.name}: ` + olya.getAverageMark());
console.log(`Средняя оценка ${nikita.name}: ` + nikita.getAverageMark());
console.log(`Средняя оценка ${alex.name}: ` + alex.getAverageMark());

var group = new Group(olya, den, nikita, alex);
console.log(group);
group.sort((a, b) => a.name > b.name ? 1 : -1);
console.log(group);
group.getAverageMarkGroup();
console.log(group.sortAverageMarkGroup());
console.log(group.addStudent(anatoliy));
group.removeStudent("Anatoliy");


//Методы Array
var gMap = group.map(t => t.name);
console.log("Вывод имен студентов: " + gMap);

var gFilter = group.filter(t => t.age > 26);
console.log("Студенты старше 26 лет:");
console.log(gFilter);

var gReduce = group.reduce(function(sum, current){
          return (sum + current.marks[0]);
        }, 0);
console.log("Сумма оценок за первый предмет: " + gReduce);