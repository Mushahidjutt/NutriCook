import React from "react";

function test() {
  const ob1 = { protein: 10, a: { b: 2, c: 3 }, carbs: 20 };
  const ob2 = { protein: 15, a: { b: 4, c: 5 }, fat: 8 };

  //   const result = arr1.map((val, i) => val + arr2[i]);

  function Addd(ob1, ob2) {
    let results = {};

    let keys = new Set([...Object.keys(ob1), ...Object.keys(ob2)]);

    keys.forEach((key) => {
      //   results[key] = (ob1[key] || 0) + (ob2[key] || 0);
      const val1 = ob1[key];
      const val2 = ob2[key];


      if(typeof val1 === "object" && typeof val2 === "object"){
        results[key] = Addd(val1,val2)
      }
       else {
      // warna numeric values add kar do
      results[key] = (val1 || 0) + (val2 || 0);}
    });

    return results;
  }

  let Add = Addd(ob1, ob2);

  console.log(Add, "Result is ");

  return (
    <div>
      <h1>this is Test </h1>
      {/* {`Result is : ${Add}`} */}

      <p>{JSON.stringify(Add)}</p>
    </div>
  );
}

export default test;
