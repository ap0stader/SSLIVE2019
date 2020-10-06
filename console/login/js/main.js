function submit() {
    var um = document.getElementById("um").value;
    var pd = document.getElementById("pd").value;
    $.post("接受文件", {
        username: um,
        password: pd

    },

        function (data, status) {

            alert("数据: \n" + data + "\n状态: " + status);

        });
}