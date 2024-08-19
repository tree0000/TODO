//동물 이미지
const images = [
  "../img/cat1.jpg",
  "../img/cat2.jpg",
  "../img/cat3.jpg",
  "../img/cat4.jpg",
  "../img/dog2.jpg",
];

let currentIndex = Math.floor(Math.random() * images.length);

// 이미지 변경 함수
function changeImage() {
  const imageElement = document.getElementById("randomImage");
  currentIndex = Math.floor(Math.random() * images.length);
  imageElement.src = images[currentIndex];
}

setInterval(changeImage, 10000);

// 전역 변수 설정
let date = new Date();
let tasks = {};
let completedTasks = {};
let selectedCategory = "";
let completedCount = 0;
let pendingCount = 0;

// 달력 렌더링 함수
function renderCalendar() {
  const viewYear = date.getFullYear();
  const viewMonth = date.getMonth();

  document.querySelector(".year-month").textContent = `${viewYear}년 ${
    viewMonth + 1
  }월`;

  const prevLast = new Date(viewYear, viewMonth, 0);
  const thisLast = new Date(viewYear, viewMonth + 1, 0);

  const PLDate = prevLast.getDate();
  const PLDay = prevLast.getDay();

  const TLDate = thisLast.getDate();
  const TLDay = thisLast.getDay();

  const prevDates = [];
  const thisDates = [...Array(TLDate + 1).keys()].slice(1);
  const nextDates = [];

  // 이전 달의 날짜를 채워서 빈칸을 채우는 부분
  if (PLDay !== 6) {
    for (let i = 0; i < PLDay + 1; i++) {
      prevDates.unshift("");
    }
  }

  // 다음 달의 날짜를 채워서 빈칸을 채우는 부분
  for (let i = 1; i < 7 - TLDay; i++) {
    nextDates.push("");
  }

  const dates = prevDates.concat(thisDates, nextDates);

  const dateHtml = dates
    .map((date, i) => {
      const isCurrentMonth = date !== "";
      return `<div class="date ${
        isCurrentMonth ? "current-month" : "not-current-month"
      }" onclick="showTasks(${date})">${isCurrentMonth ? date : ""}</div>`;
    })
    .join("");

  document.querySelector(".dates").innerHTML = dateHtml;

  const today = new Date();

  if (viewMonth === today.getMonth() && viewYear === today.getFullYear()) {
    for (let dateElement of document.querySelectorAll(".current-month")) {
      if (+dateElement.innerText === today.getDate()) {
        dateElement.classList.add("today");
        break;
      }
    }
  }
}

// 이전 달로 이동
function prevMonth() {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
}

// 다음 달로 이동
function nextMonth() {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
}

// 할 일 목록 표시 함수
function showTasks(day) {
  const selectedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
  const taskListContainer = document.getElementById("taskListContainer");

  const taskList = tasks[selectedDate] || [];
  const completedList = completedTasks[selectedDate] || [];

  taskListContainer.innerHTML = `
        <h3>${selectedDate}의 할 일 목록</h3>
        <ul>
            ${
              taskList.length > 0
                ? taskList.map((task) => `<li>${task}</li>`).join("")
                : "<li></li>"
            }
        </ul>
        ${
          completedList.length > 0
            ? `<h4>완료된 할 일</h4><ul>${completedList
                .map((task) => `<li>${task}</li>`)
                .join("")}</ul>`
            : ""
        }
    `;
  taskListContainer.style.display = "block";
}

// 할 일 완료 처리 함수
function completeTask(button) {
  const taskForm = button.closest(".form-container");
  if (taskForm) {
    const taskDetails = taskForm.querySelector("textarea").value.trim();
    const taskDateInput = taskForm.querySelector('input[type="date"]').value;
    const selectedDate =
      taskDateInput ||
      `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${new Date().getDate().toString().padStart(2, "0")}`;

    if (!completedTasks[selectedDate]) {
      completedTasks[selectedDate] = [];
    }

    completedTasks[selectedDate].push(taskDetails);
    deleteTaskForm(button);

    // 완료된 할 일 리스트 갱신
    showTasks(new Date().getDate());

    // 완료 카운트 업데이트
    completedCount++;
    pendingCount--;
    updateCounts();
  }
}

// 할 일 폼 삭제 함수
function deleteTaskForm(button) {
  const taskForm = button.closest(".form-container");
  if (taskForm) {
    taskForm.remove();

    // 보류 중 카운트 감소
    pendingCount;
    updateCounts();
  }
}

// 할 일 추가 함수
function addTask() {
  const taskInputValue = document.getElementById("addTaskInput").value.trim();

  if (!taskInputValue) return;

  const taskFormsContainer = document.getElementById("taskFormsContainer");

  const newTaskForm = document.createElement("div");
  newTaskForm.classList.add("form-container");

  newTaskForm.innerHTML = `
        <div class="form-content">
            <div class="form">
                <div class="input-row">
                    <div class="input-group">
                        <label for="category">할일</label>
                        <input type="text" value="${selectedCategory}" readonly>
                    </div>
                    <div class="input-group">
                        <label for="date">날짜</label>
                        <input type="date">
                    </div>
                </div>
                <div class="input-group">
                    <label for="details">내용</label>
                    <textarea placeholder="상세 내용" readonly>${taskInputValue}</textarea>
                </div>
            </div>
            <div class="action-buttons-vertical">
                <button class="complete-btn" onclick="completeTask(this)">✔</button>
                <button class="edit-btn" onclick="editTaskForm(this)">✎</button>
                <button class="delete-btn" onclick="deleteTaskForm(this)">🗑</button>
            </div>
        </div>
    `;

  taskFormsContainer.appendChild(newTaskForm);

  // 보류 중 카운트 증가
  pendingCount++;
  updateCounts();

  document.getElementById("addTaskInput").value = ""; // 입력 필드 초기화
}

// 수정 모드로 변경 함수
function editTaskForm(button) {
  const taskForm = button.closest(".form-container");
  if (taskForm) {
    const categoryInput = taskForm.querySelector('input[type="text"]');
    const detailsTextarea = taskForm.querySelector("textarea");

    //수정 가능하게 변경
    categoryInput.readOnly = false;
    detailsTextarea.readOnly = false;

    // 수정 상태로 버튼 변경
    button.textContent = "저장";
    button.onclick = function () {
      saveTaskForm(button);
    };
  }
}

// 수정된 할 일 저장 함수
function saveTaskForm(button) {
  const taskForm = button.closest(".form-container");
  if (taskForm) {
    const categoryInput = taskForm.querySelector('input[type="text"]');
    const detailsTextarea = taskForm.querySelector("textarea");

    // 필드를 다시 수정 불가능하게 변경
    categoryInput.readOnly = true;
    detailsTextarea.readOnly = true;

    // 버튼을 다시 '수정' 상태로 변경
    button.textContent = "✎";
    button.onclick = function () {
      editTaskForm(button);
    };
  }
}

// 햄버거 메뉴 클릭 시 달력을 토글하는 함수
function toggleCalendar() {
  const calendar = document.querySelector(".calendar-container");
  const taskList = document.getElementById("taskListContainer"); // 할 일 목록 컨테이너 선택

  if (calendar.style.display === "none" || calendar.style.display === "") {
    calendar.style.display = "block";
    taskList.style.display = "block"; // 할 일 목록도 함께 보이도록 설정
  } else {
    calendar.style.display = "none";
    taskList.style.display = "none"; // 할 일 목록도 함께 숨김
  }
}

// 카테고리 선택 함수
function selectCategory(category) {
  selectedCategory = category; // 선택된 카테고리를 저장
  document.querySelector(".select-category").textContent = category;
  toggleDropdown();
}

// 드롭다운 토글 함수
function toggleDropdown() {
  document.getElementById("dropdown").classList.toggle("show");
}

// 페이지 외부 클릭 시 드롭다운 메뉴 닫기
window.onclick = function (event) {
  if (!event.target.matches(".select-category")) {
    const dropdowns = document.getElementsByClassName("dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
      const openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

// 카운트 업데이트 함수
function updateCounts() {
  document.getElementById("completedCount").textContent = completedCount
    .toString()
    .padStart(2, "0");
  document.getElementById("pendingCount").textContent = pendingCount
    .toString()
    .padStart(2, "0");
}
// 날짜와 요일을 반환하는 함수
function formatDateWithDay(dateString) {
  const date = new Date(dateString);
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const dayName = days[date.getDay()];

  return `${dateString} (${dayName})`;
}

// 검색 함수
function searchTasks() {
  const searchQuery = document.querySelector(".search-box").value.trim();
  const taskListContainer = document.getElementById("taskListContainer");

  let searchResults = [];

  // 완료된 할 일에서 검색어가 포함된 항목을 찾음
  for (let date in completedTasks) {
    const filteredTasks = completedTasks[date].filter((task) =>
      task.includes(searchQuery)
    );
    if (filteredTasks.length > 0) {
      searchResults.push({
        date: formatDateWithDay(date),
        tasks: filteredTasks,
      });
    }
  }

  taskListContainer.innerHTML = `
      <h3>검색 결과</h3>
      <ul>
          ${
            searchResults.length > 0
              ? searchResults
                  .map(
                    (result) => `
                      <li>
                          <strong>${result.date}</strong>
                          <ul>${result.tasks
                            .map((task) => `<li>${task}</li>`)
                            .join("")}</ul>
                      </li>`
                  )
                  .join("")
              : "<li>검색된 할 일이 없습니다.</li>"
          }
      </ul>
  `;
  taskListContainer.style.display = "block";
}

// Enter 키를 눌렀을 때 검색 실행
document
  .querySelector(".search-box")
  .addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      searchTasks();
    }
  });

// 초기 렌더링 시 오늘 날짜의 할 일을 표시
document.addEventListener("DOMContentLoaded", function () {
  renderCalendar();
  showTasks(new Date().getDate()); // 페이지 로드 시 오늘 날짜의 할 일 표시
  updateCounts();
});

// Enter 키를 눌렀을 때 할 일을 추가하는 이벤트 리스너
document
  .getElementById("addTaskInput")
  .addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      addTask();
    }
  });

// 완료된 할 일을 클릭했을 때 작성 화면에 표시하는 함수
function displayTaskInForm(date, taskContent) {
  const formSection = document.querySelector(".form-container");
  formSection.querySelector('input[type="text"]').value = selectedCategory; // 카테고리
  formSection.querySelector('input[type="date"]').value = date;
  formSection.querySelector("textarea").value = taskContent;
}

// 다크모드
function setDisplayAppreance(button) {
  var body = document.querySelector("body");

  if (body.classList.contains("light-mode")) {
    body.classList.remove("light-mode");
    body.classList.add("dark-mode");
    button.value = "라이트모드로 전환";
  } else {
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
    button.value = "다크모드로 전환";
  }
}

function toggleDarkMode() {
  var body = document.querySelector("body");
  var button = document.getElementById("btnDisplayMode");

  if (body.classList.contains("light-mode")) {
    body.classList.remove("light-mode");
    body.classList.add("dark-mode");
    button.value = "라이트모드로 전환";
  } else {
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
    button.value = "다크모드로 전환";
  }
}
function toggleDarkMode() {
  var body = document.body;
  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    // 다크 모드일 때 흰색 이미지로 변경
    document.getElementById("homeIcon").src = "../img/아이콘 집.png";
    document.getElementById("exploreIcon").src = "../img/아이콘시계.png";
    document.getElementById("notificationsIcon").src = "../img/아이콘 쉐어.png";
    document.getElementById("profileIcon").src = "../img/아이콘 설정.png";
  } else {
    // 라이트 모드일 때 검정색 이미지로 변경
    document.getElementById("homeIcon").src = "../img/검정 홈.png";
    document.getElementById("exploreIcon").src = "../img/검정시계.png";
    document.getElementById("notificationsIcon").src = "../img/검정 링크.png";
    document.getElementById("profileIcon").src = "../img/검정설정.png";
  }
}
