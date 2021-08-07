getTodayTasks = async () => {
  try {
    let data = await fetch("http://localhost:3000/task/today");
    let dataJson = await data.json();
    console.log(dataJson);

    // gelen respons'a göre table a row ve cell insert edecek

    // let table = document.getElementById("table");

    // for (let i = 0; i < dataJson.length; i++) {
    //   let newRow = table.insertRow(table.length);
    //   for (let j = 0; j < dataJson[i].length; j++) {
    //     let cell = newRow.insertCell(j);
    //     cell.innerHTML = dataJson[i];
    //   }
    // }
  } catch (error) {
    console.log(error);
  }
};
getTodayTasks();
