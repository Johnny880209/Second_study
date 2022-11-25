// 유저가 값을 입력
// + 버튼을 클릭하면 할일 추가
// DELETE 버튼을 누르면 할일 삭제
// CHECK 버튼을 누르면 할일 완료되며 밑줄 생김 (TRUE -> FALSE)
// True이면 끝난 걸로 간주하고 밑줄
// False이면 안끝난 걸로 간주
// 진행중 DONE 탭을 누르면, 언더바가 이동한다.
// DONE 탭은 끝난 아이템만 노출, NOT DONE 탭은 안끝난 아이템만 노출
// 전체 탭을 누르면 다시 전체 아이템으로 돌아옴

let tabs = document.querySelectorAll(".task_tabs div");
let taskInput = document.getElementById("task-input");
let addBtn = document.getElementById("add-btn");
let taskList = [];
let filterList = [];
let mode = "all";
let list = [];


taskInput.addEventListener('focus', function(e){taskInput.value = ""});
addBtn.addEventListener('click', addTask);

for (let i=1; i<tabs.length; i++){
    tabs[i].addEventListener("click", function(event){filter(event);})
};


function addTask(){
    let task = {
        id : randomIdGenerate(),
        taskContent : taskInput.value,
        isComplete : false,
        isDelete : false
    };

    taskList.push(task);

    console.log(task);
    render();
};

function render(){
    

    if (mode == "all"){
        list = taskList;
    } else if (mode == "on" || mode == "done"){
        list = filterList;
    };

    let resultHTML = "";

    for(let i=0; i<list.length;i++){

        if(list[i].isComplete == true){
            resultHTML += `
            <div class="task_item active">
                <div class="subject task_done">${list[i].taskContent}</div>
                <div class="btn_box">
                    <button onclick="toggleComplete('${list[i].id}')"><i class="xi-redo"></i></button>
                    <button onclick="deleteTask('${list[i].id}')"><i class="xi-close"></i></button>
                </div>
            </div>`;
        }  else {
            resultHTML += `
                <div class="task_item">
                    <div class="subject">${list[i].taskContent}</div>
                    <div class="btn_box">
                        <button onclick="toggleComplete('${list[i].id}')"><i class="xi-check"></i></button>
                        <button onclick="deleteTask('${list[i].id}')"><i class="xi-close"></i></button>
                    </div>
                </div>
            `;
        };

    };

    document.getElementById("task-board").innerHTML = resultHTML;
};

function toggleComplete(id) {
    for (let i=0; i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        };
    };
    render();
    console.log(taskList);
};

function deleteTask(id){
    for (let i=0; i<list.length; i++){
        if (list[i].id == id){
            list.splice(i,1);
            break;
        };
    };
    render();
};

function randomIdGenerate(){
    return Math.random().toString(36).substr(2, 16);
};

function filter(event){
    mode = event.target.id;
    filterList = [];

    document.getElementById("underLine").style.width = event.target.offsetWidth + "px";
    document.getElementById("underLine").style.top = event.target.offsetHeight + "px";
    document.getElementById("underLine").style.left = event.target.offsetLeft + "px";

    if (mode == "all"){
        render();
    } else if (mode == "on"){
        for (let i=0; i < taskList.length; i++){
            if(taskList[i].isComplete == false){
                filterList.push(taskList[i]);
            };
        };
        render();
    } else if (mode == "done"){
        for (let i=0; i < taskList.length; i++){
            if(taskList[i].isComplete == true){
                filterList.push(taskList[i]);
            };
        };
        render();
    }

    console.log (filterList);
    
};
