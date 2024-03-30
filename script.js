const fileInput = document.getElementById('fileInput')
const ranking = document.getElementById('ranking');
fileInput.addEventListener('input',fileloader)

function fileloader() {
    ranking.innerHTML = '';
    const [file] = fileInput.files;
    const reader = new FileReader();
  
    reader.addEventListener("load",() => {
        textToXml(reader.result);
      });
  
    if (file) {
      reader.readAsText(file);
    }
  }
  
function textToXml(text){
    const parser = new DOMParser();
    let xmlData  = parser.parseFromString(text,"text/xml");
    getAttributeValue(xmlData);
}

function getAttributeValue(xmlData){
    const arr = Array.from(xmlData.getElementsByTagName('Word'));
    const newarr = [...arr].map(element => element.getAttribute('roman'));
    AllgetChar(newarr);
}

function AllgetChar(newarr){
    const CharArr = [...newarr].map(element => element[0]);
    CharCount(CharArr);
}

function CharCount(CharArr){
    const CharObj = {};
    CharArr.forEach((e)=>{
        if(CharObj[e]){
            CharObj[e] += 1;
        }else{
            CharObj[e] = 1;
        }
    })
    domCreate(CharObj);
}

function domCreate(CharObj){
    let eleObj = {};
    Object.entries(CharObj).forEach((ele)=>{
        eleObj[ele[0]] = [`<div class="rank" id="${ele[0]}">
        <div class="word">${ele[0].toUpperCase()}</div>
        &nbsp;<div>:</div>&nbsp;
        <div class="cnt">${ele[1]}</div>
        <div>回</div>
        </div>`,ele[1]]
    })
    ObjSort(eleObj)
}

function ObjSort(eleObj) {
    const sortedArr = Object.entries(eleObj).sort((a, b) => b[1][1] - a[1][1]);
    createHTMLString(sortedArr);
}

function createHTMLString(sortedArr){
    let HTMLstring = "";
    sortedArr.forEach((e)=>{
        HTMLstring += e[1][0];
    })
    addDom(HTMLstring);
}
function addDom(HTMLstring){
    ranking.insertAdjacentHTML('beforeend', HTMLstring);
}