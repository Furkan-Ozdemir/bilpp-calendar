getTodayTasks = async () => {
  try {
    let data = await fetch("http://localhost:3000/task/today");
    let dataJson = await data.json();
    console.log(dataJson);
    // gelen respons'a göre table a row ve cell insert edecek

    let table = document.getElementById("table");

    for (let i = 0; i < dataJson.length; i++) {
      let newRow = table.insertRow(i + 1);
      let keys = Object.values(dataJson[i]);
      for (let j = 0, index = 1; j < 5; j++) {
        let cell = newRow.insertCell(j);
        cell.innerHTML = keys[index++];
        cell.style.backgroundColor = keys[6];
        cell.style.fontWeight = "bold";
      }
    }
  } catch (error) {
    console.log(error);
  }
};
getTodayTasks();
