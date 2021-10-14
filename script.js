let addBtn = document.querySelector(".add-btn");
let removeBtn = document.querySelector(".remove-btn");
let modalCont = document.querySelector(".modal-cont");
let mainCont = document.querySelector(".main-cont");
let textareaCont = document.querySelector(".textarea-cont");
let allPriorityColors = document.querySelectorAll(".priority-color");
let lockElem = document.querySelector(".ticket-lock");
let toolBoxColors = document.querySelectorAll(".color");
let colors = ["lightpink", "lightblue", "lightgreen", "black"];
let modalPriorityColor = colors[colors.length - 1];
let addFlag = false;
let removeFlag = false;
let lockClass = "fa-lock";
let unlockClass = "fa-lock-open";
let ticketsArr = [];

if (localStorage.getItem("jira_tickets")) {
  ticketsArr = JSON.parse(localStorage.getItem("jira_tickets"));
  ticketsArr.forEach((ticketObj) => {
    createTicket(
      ticketObj.ticketColor,
      ticketObj.ticketTask,
      ticketObj.ticketID
    );
  });
}

for (let i = 0; i < toolBoxColors.length; i++) {
  toolBoxColors[i].addEventListener("click", (e) => {
    let currentToolBoxColor = toolBoxColors[i].classList[0];
    let filteredTickets = ticketsArr.filter((ticketObj, idx) => {
      return currentToolBoxColor === ticketObj.ticketColor;
    });
    let allTicketsCont = document.querySelectorAll(".ticket-cont");
    for (let i = 0; i < allTicketsCont.length; i++) {
      allTicketsCont[i].remove();
    }
    filteredTickets.forEach((ticketObj, idx) => {
      createTicket(
        ticketObj.ticketColor,
        ticketObj.ticketTask,
        ticketObj.ticketID
      );
    });
  });
  toolBoxColors[i].addEventListener("dblclick", (e) => {
    let allTicketsCont = document.querySelectorAll(".ticket-cont");
    for (let i = 0; i < allTicketsCont.length; i++) {
      allTicketsCont[i].remove();
    }
    ticketsArr.forEach((ticketObj, idx) => {
      createTicket(
        ticketObj.ticketColor,
        ticketObj.ticketTask,
        ticketObj.ticketID
      );
    });
  });
}

allPriorityColors.forEach((colorElem, idx) => {
  colorElem.addEventListener("click", (e) => {
    allPriorityColors.forEach((priorityColorElem, idx) => {
      priorityColorElem.classList.remove("border");
    });
    colorElem.classList.add("border");
    modalPriorityColor = colorElem.classList[0];
  });
});

addBtn.addEventListener("click", (e) => {
  addFlag = !addFlag;
  if (addFlag) {
    modalCont.style.display = "flex";
  } else {
    modalCont.style.display = "none";
  }
});

removeBtn.addEventListener("click", (e) => {
  removeFlag = !removeFlag;
});

let createBtn = document.querySelector(".create-btn");
createBtn.addEventListener("click", (e) => {
  createTicket(modalPriorityColor, textareaCont.value);
  addFlag = false;
  setModalToDefault();
});

function createTicket(ticketColor, ticketTask, ticketID) {
  let id = ticketID || shortid();
  let ticketCont = document.createElement("div");
  ticketCont.setAttribute("class", "ticket-cont");
  ticketCont.innerHTML = `
            <div class="ticket-color ${ticketColor} "></div>
            <div class="ticket-id">#${id}</div>
            <div class="task-area">${ticketTask}</div>
            <div class="ticket-lock">
          <i class="fas fa-lock"></i>
        </div>
    `;
  mainCont.appendChild(ticketCont);

  if (!ticketID) {
    ticketsArr.push({ ticketColor, ticketTask, ticketID: id });
    localStorage.setItem("jira_tickets", JSON.stringify(ticketsArr));
  }
  handleRemoval(ticketCont, id);
  handleLock(ticketCont, id);
  handleColor(ticketCont, id);
}

function handleRemoval(ticket, id) {
  ticket.addEventListener("click", (e) => {
    if (!removeFlag) return;
    let idx = getTicketIdx(id);
    ticketsArr.splice(idx, 1);
    let strTicketsArr = JSON.stringify(ticketsArr);
    localStorage.setItem("jira_tickets", strTicketsArr);
    ticket.remove();
  });
}

function handleLock(ticket, id) {
  let ticketLockElem = ticket.querySelector(".ticket-lock");
  let ticketLock = ticketLockElem.children[0];
  let ticketTaskArea = ticket.querySelector(".task-area");
  ticketLock.addEventListener("click", (e) => {
    let ticketIdx = getTicketIdx(id);

    if (ticketLock.classList.contains(lockClass)) {
      ticketLock.classList.remove(lockClass);
      ticketLock.classList.add(unlockClass);
      ticketTaskArea.setAttribute("contenteditable", "true");
    } else {
      ticketLock.classList.remove(unlockClass);
      ticketLock.classList.add(lockClass);
      ticketTaskArea.setAttribute("contenteditable", "false");
    }
    ticketsArr[ticketIdx].ticketTask = ticketTaskArea.innerText;
    localStorage.setItem("jira_tickets", JSON.stringify(ticketsArr));
  });
}

function handleColor(ticket, id) {
  let ticketColor = ticket.querySelector(".ticket-color");
  let ticketIdx = getTicketIdx(id);
  ticketColor.addEventListener("click", (e) => {
    let currentTicketColor = ticketColor.classList[1];
    let currentTicketColorIdx = colors.findIndex((color) => {
      return currentTicketColor === color;
    });
    currentTicketColorIdx++;
    let newTicketColorIdx = currentTicketColorIdx % colors.length;
    let newTicketColor = colors[newTicketColorIdx];
    ticketColor.classList.remove(currentTicketColor);
    ticketColor.classList.add(newTicketColor);

    ticketsArr[ticketIdx].ticketColor = newTicketColor;
    localStorage.setItem("jira_tickets", JSON.stringify(ticketsArr));
  });
}

function getTicketIdx(id) {
  let ticketIdx = ticketsArr.findIndex((ticketObj) => {
    return ticketObj.ticketID === id;
  });
  return ticketIdx;
}

function setModalToDefault() {
  modal.Cont.style.display = "none";
  textareaCont.value = "";
  modalPriorityColor = colors[colors.length - 1];
  allPriorityColors.forEach((priorityColorElem, idx) => {
    priorityColorElem.classList.remove("border");
  });
  allPriorityColors[allPriorityColors.length - 1].classList.add("border");
}

