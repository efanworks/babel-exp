interface Person {
  name: string;
  sayHello: (this: { name: string }) => void;
}

function dosomething() {
  const p: Person = {
    name: "zhuoyifan",
    sayHello: function () {
      console.log(this.name);
    }
  };
  p.sayHello();
}

dosomething.call({ name: "fffff" });
