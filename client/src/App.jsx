import React, { useEffect, useState } from "react";

const App = () => {
  const [postBackData, setPostBackData] = useState("");

  // useEffect(() => {
  //   fetch("https://jsonplaceholder.typicode.com/todos/1")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setFetchData(data);
  //       console.log(data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
    console.log(e.target[1].value);
    console.log(e.target[2].value);
    // console.log(e.target[0].value);
    await fetch("http://localhost:3456/api/user", {
      method: "POST",
      body: JSON.stringify({
        name: e.target[0].value,
        age: e.target[1].value,
        sex: e.target[2].value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPostBackData(data);
        console.log("After setPostBackData:", data);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-[100vh]">
      App:
      <form className="flex flex-col text-2xl gap-3" onSubmit={handleSubmit}>
        <label for="name">
          name:
          <input type="text" id="name" className="border-2" />
        </label>
        <label for="age">
          age:
          <input type="text" id="age" className="border-2" />
        </label>
        <label for="sex">
          sex:
          <input type="text" id="sex" className="border-2" />
        </label>
        <button type="submit">Submit</button>
      </form>
      {postBackData?.name}
      {postBackData?.age}
      {postBackData?.sex}
    </div>
  );
};

export default App;
