//工厂模式
// function Person(name, age){
//   this.name = name
//   this.age = age
//   this.say = function(){
//     console.log(`你好,我叫${this.name}`);
//   }
// }

// function createPerson(name, age){
//   return new Person(name, age)
// }

// let p1 = createPerson("郑璇", 18)
// let p2 = createPerson("朱晓乐",23)
// console.log(p1);
// console.log(p2);
// p1.say()


//原型模式
// function Person(){}

// Person.prototype.name = "郑璇"
// Person.prototype.age = 18
// Person.prototype.sayName = function(){
//   console.log(`你好,我叫${this.name}`);
// }

// let p1 = new Person()
// console.log(p1);
// p1.sayName()


//原型模式和构造函数模式
function Person(name,age){
  this.name = name
  this.age = age
}

Person.prototype = {
  constructor: Person,
  sayName:function(){
    console.log(this.name);
  }
}

let p1 = new Person("郑璇",18)
let a = Object.create(p1)
console.log(a);

