var Name = "", Subject = "", Num = 0, Answer = "", Nameoftest = "", Time = 0;
var list = [];
var timeout = false;
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        var myObj = JSON.parse(this.responseText);
        list.push(myObj.math, myObj.phys, myObj.chem, myObj.bio, myObj.his, myObj.geo, myObj.gdcd, myObj.eng);
        for (var i = 0; i < list.length; i++) {
            document.getElementById(list[i].id).innerHTML = "<a>" + list[i].subject + " - " + list[i].name + "</a>";
        }
    }
};
xmlhttp.open("GET", "data.txt", true);
xmlhttp.send();

function indexButton() {
    var name = document.getElementById("input-name").value.trim();
    Name = name;
    document.title = "Phiếu đáp án";
    document.getElementById("title").innerHTML = "<h1><b>PHIẾU ĐÁP ÁN</b></h1>";
    document.getElementById("panel").innerHTML = '';
    switch (Subject) {
        case "Toán":
            window.open("https://github.com/thithuthptquocgia/thithuthptquocgia.github.io/raw/master/math.pdf", '_blank');
            break;
        case "Vật Lý":
            window.open("https://github.com/thithuthptquocgia/thithuthptquocgia.github.io/raw/master/phys.pdf", '_blank');
            break;
        case "Hóa Học":
            window.open("https://github.com/thithuthptquocgia/thithuthptquocgia.github.io/raw/master/chem.pdf", '_blank');
            break;
        case "Sinh Học":
            window.open("https://github.com/thithuthptquocgia/thithuthptquocgia.github.io/raw/master/bio.pdf", '_blank');
            break;
        case "Lịch Sử":
            window.open("https://github.com/thithuthptquocgia/thithuthptquocgia.github.io/raw/master/his.pdf", '_blank');
            break;
        case "Địa Lý":
            window.open("https://github.com/thithuthptquocgia/thithuthptquocgia.github.io/raw/master/geo.pdf", '_blank');
            break;
        case "GDCD":
            window.open("https://github.com/thithuthptquocgia/thithuthptquocgia.github.io/raw/master/gdcd.pdf", '_blank');
            break;
        case "Tiếng Anh":
            window.open("https://github.com/thithuthptquocgia/thithuthptquocgia.github.io/raw/master/eng.pdf", '_blank');
            break;
        default:
            break;
    }
    generateQuiz();
}

function generateQuiz() {
    //Clear footer:
    document.getElementById("footer").style.display = "none";
    var panel = document.getElementById("panel");
    
    var time = document.createElement("div");
    time.id = "time";
    panel.appendChild(time);
    timer();
    for (var i = 0; i < Num; i++) {
        var quizAtI = document.createElement("div");
        quizAtI.name = "as" + (i + 1).toString();
        var lblNum = document.createElement("b");
        lblNum.id = "label";
        var str;
        if (i < 9) str = "Câu 0" + (i + 1).toString() + ": ";
        else str = "Câu " + (i + 1).toString() + ": ";

        var s = document.createTextNode(str);
        lblNum.appendChild(s);
        quizAtI.appendChild(lblNum);

        var quiz = document.createElement("span");
        quiz.id = "quiz";
        //Quiz setup:
        var buffer = "ABCD";
        for (var j = 0; j < 4; j++) {
            quiz.appendChild(document.createTextNode(buffer.charAt(j) + "."));
            var radio = document.createElement("input");
            radio.type = "radio"; radio.name = "as" + (i + 1).toString();
            quiz.appendChild(radio);
        }
        quizAtI.appendChild(quiz);
        panel.appendChild(quizAtI);
    }
    //Add button
    var button = document.createElement("button");
    button.id = "button";
    button.type = "button";
    button.appendChild(document.createTextNode("Chấm điểm >>"));
    button.onclick = scoring;
    panel.appendChild(button);
}

function scoring() {
    var result = [];
    var answer = [];
    for (var i = 0; i < Num; i++) {
        result.push(Answer.charAt(i));
        result[i] += "";
        result[i] = result[i].toLowerCase();
        //result[i] += "";
        var checkbox = document.getElementsByName("as" + (i + 1).toString());
        var checkone;
        for (var j = 0; j < checkbox.length; j++) {
            if (checkbox[j].checked) {
                checkone = j + 1; break;
            }
            if (j == checkbox.length - 1 && !checkbox[checkbox.length - 1].checked) {
                if (!timeout){
                    alert("Bạn bỏ sót đáp án. Hãy chọn cho đủ !");
                    return;
                }
                else {
                    checkone = -1;
                    break;
                }
            }
        }
        switch (checkone) {
            case 1:
                answer.push("a");
                break;
            case 2:
                answer.push("b");
                break;
            case 3:
                answer.push("c");
                break;
            case 4:
                answer.push("d");
                break;
            default:
                answer.push("0");
                break;
        }
    }
    var score = 0.0;
    var wrong_ans = [];

    for (var i = 0; i < Num; i++) {
        if (answer[i] == result[i]) score += (10.0 / Num);
        else wrong_ans.push(i + 1);
    }
    var score_str = score.toFixed(2).toString();
    str = "";
    if (wrong_ans.length == 0) {
        str = "Bạn không sai câu nào !"
    }
    else {
        for (var i = 0; i < wrong_ans.length - 1; i++)
            str += wrong_ans[i].toString() + " - " + result[wrong_ans[i] - 1].toUpperCase() + ", ";
        str += wrong_ans[wrong_ans.length - 1].toString() + " - " + result[wrong_ans[wrong_ans.length - 1] - 1].toUpperCase() + ".";
    }
    switchToResultPage(score_str, str);
}

function switchToResultPage(score, str) {
    document.getElementById("footer").style.display = "inline";
    document.title = "Kết quả";
    document.getElementById("title").innerHTML = "<h1><b>KẾT QUẢ</b></h1>";
    document.getElementById("panel").innerHTML = '';
    var panel = document.getElementById("panel");

    var name_lbl = document.createElement("b");
    name_lbl.appendChild(document.createTextNode("Họ và tên: "));
    var name_panel = document.createElement("div");
    name_panel.appendChild(name_lbl);
    name_panel.appendChild(document.createTextNode(Name));

    var test_lbl = document.createElement("b");
    test_lbl.appendChild(document.createTextNode("Đề thi: "));
    var test_panel = document.createElement("div");
    test_panel.appendChild(test_lbl);
    test_panel.appendChild(document.createTextNode(Nameoftest));

    var sub_lbl = document.createElement("b");
    sub_lbl.appendChild(document.createTextNode("Môn thi: "));
    var sub_panel = document.createElement("div");
    sub_panel.appendChild(sub_lbl);
    sub_panel.appendChild(document.createTextNode(Subject));

    var lbl_panel = document.createElement("b");
    lbl_panel.appendChild(document.createTextNode("Điểm của bạn: "));
    var score_panel = document.createElement("div");
    score_panel.appendChild(lbl_panel);
    score_panel.appendChild(document.createTextNode(score));

    var lbl_panel1 = document.createElement("b");
    lbl_panel1.appendChild(document.createTextNode("Những câu sai (và đáp án bên cạnh): "));
    var wrong_panel = document.createElement("div");
    wrong_panel.appendChild(lbl_panel1);
    wrong_panel.appendChild(document.createTextNode(str));

    panel.appendChild(name_panel);
    panel.appendChild(document.createElement("br"));
    panel.appendChild(test_panel);
    panel.appendChild(document.createElement("br"));
    panel.appendChild(sub_panel);
    panel.appendChild(document.createElement("br"));
    panel.appendChild(score_panel);
    panel.appendChild(document.createElement("br"));
    panel.appendChild(wrong_panel);
    panel.appendChild(document.createElement("br"));

    //Add button
    var button = document.createElement("button");
    button.id = "button";
    button.type = "button";
    button.appendChild(document.createTextNode("Trở lại trang chủ >>"));
    button.onclick = () => { location.reload(); };
    panel.appendChild(button);
}

function timer() {
    var countDownDate = new Date().getTime() + (Time+1) * 60 * 1000;

    // Update the count down every 1 second
    var x = setInterval(function () {

        // Get todays date and time
        var now = new Date().getTime();

        // Find the distance between now an the count down date
        var distance = countDownDate - now;

        if (distance <= 5*60*1000 && distance >= 298 * 1000){
            // 5 minutes next:
            alert("Còn 5 phút ! Hãy hoàn thành phiếu !");
        }

        // Time calculations for days, hours, minutes and seconds
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Output the result in an element with id="demo"
        document.getElementById("time").innerHTML = "Còn lại: " + hours + " giờ, " + minutes + " phút, " + seconds + " giây.";

        // If the count down is over, write some text 
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("time").innerHTML = "HẾT GIỜ !";
            timeout = true;
            scoring();
        }
    }, 1000);
}

function clickSelectSubject(i) {
    Subject = list[i].subject;
    Num = list[i].number;
    Answer = list[i].answer;
    Nameoftest = list[i].name;
    Time = list[i].time;
    document.getElementsByClassName("dropbtn")[0].innerHTML = list[i].subject + " - " + list[i].name;
}