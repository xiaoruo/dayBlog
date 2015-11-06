var LoadHtml = function() {
    this.year = 0;
    this.month = 0;
    this.day = 0;
    this.date = {};
    this.init();
}
LoadHtml.prototype.init = function() {
    this.traversal();
    this.insert();
}
LoadHtml.prototype.traversal = function() {
    for (var i in diary) {
        this.year = diary[i].slice(0, 4);
        this.month = diary[i].slice(4, 6);
        this.day = diary[i].slice(6, 8);
        this.date[i] = {};
        this.date[i].year = this.year;
        this.date[i].month = this.month;
        this.date[i].day = this.day;
    }
}
LoadHtml.prototype.insert = function() {
    var yearMonth = document.getElementById('title_time').innerHTML; //2015 年 11 月
    var theTable = document.getElementsByTagName('table')[0];
    var theDay = theTable.getElementsByTagName('a');
    var theYear = yearMonth.slice(0, 4);
    var theMonth = yearMonth.slice(7, 9);
    for (var j in this.date) {
        if (theYear === this.date[j].year && theMonth === this.date[j].month) {
            for (var i = 0, len = theDay.length; i < len; i++) {
                if (theDay[i].innerHTML === this.date[j].day) {
                    theDay[i].href = './diary/' + diary[j] + '.html';
                    theDay[i].className = 'down';
                }
            }
        }
    }
}

jQuery(document).ready(function($) {
    var myDate = new Date();

    function timer() {
        $("td").each(function() {
            $(this).html("");
        });
        var year = myDate.getFullYear();
        var month = myDate.getMonth();
        var date = myDate.getDate();
        var day = myDate.getDay();
        var num = day - (date % 7 - 1);
        $("#title_time").html(year + ' 年 ' + (month + 1) + ' 月 ');
        var i = 1;
        var end;
        switch (month) {
            case 0:
                end = 31;
                break;
            case 1:
                if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) end = 29;
                else end = 28;
                break;
            case 2:
                end = 31;
                break;
            case 3:
                end = 30;
                break;
            case 4:
                end = 31;
                break;
            case 5:
                end = 30;
                break;
            case 6:
                end = 31;
                break;
            case 7:
                end = 31;
                break;
            case 8:
                end = 30;
                break;
            case 9:
                end = 31;
                break;
            case 10:
                end = 30;
                break;
            case 11:
                end = 31;
                break;
        }
        $("tr").eq(i).find("td").eq(num).html('<a target="_blank">' + (i < 10 ? '0' + i : i) + '</a>');
        var riqi = null;
        $("td").each(function() {
            if ($(this).parent().index() == 1) {
                if ($(this).prev("td").html())
                    $(this).html('<a target="_blank">' + (++i < 10 ? '0' + i : i) + '</a>');
            }
            if ($(this).parent().index() > 1 && i < end) {
                $(this).html('<a target="_blank">' + (++i < 10 ? '0' + i : i) + '</a>');
            }
        });

    }
    timer();
    var loadHtml = new LoadHtml();
    $(".pre_d").click(function() {
        var nian = myDate.getFullYear();
        var yue = myDate.getMonth();
        if (yue == 0) {
            nian--;
            yue = 12;
        }
        var ri = "01";
        var str = nian + "/" + yue + "/" + ri;
        myDate = new Date(str);
        timer();
        loadHtml.insert();
    });
    $(".next_d").click(function() {
        var nian = myDate.getFullYear();
        var yue = myDate.getMonth();
        yue += 2;
        if (yue == 13) {
            nian++;
            yue = 1;
        }
        var ri = "01";
        var str = nian + "/" + yue + "/" + ri;
        myDate = new Date(str);
        timer();
        loadHtml.insert();
    });
});