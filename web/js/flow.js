var last = {time: 0.0, flow: 0, status: 0};
var result;
var last_speed = 0.0;

var chartOptions = {
    chart: {
        type: 'areaspline',
        backgroundColor: 'rgba(0,0,0,0)',
        animation: Highcharts.svg, // don't animate in old IE
        marginRight: 10,
        events: {
            load: function () {
                // set up the updating of the chart each second
                var series = this.series[0];
                setInterval(function () {
                    console.log("[load]last_speed: " + last_speed);
                    var x = (new Date()).getTime(); // current time
                    var y = parseFloat(last_speed);
                    series.addPoint([x, y], true, true);
                }, 1000);
            }
        }

    },
    title: {
        text: null
    },
    xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
            day: '%H:%M:%S'
        }
    },
    yAxis: {
        title: {
            text: 'Speed'                 //指定y轴的标题
        },
        gridLineDashStyle: 'longdash'
    },
    series: [{
        name: null,
        zones: [{
            value: 200,
            color: '#009688'
        }, {
            value: 1000,
            color: '#FFC107'
        },{
            value: 10000,
            color: '#F44336'
        },,{
            value: 1000000,
            color: '#F44336'
        }],
        color: '#009688',
        data: displayLineChart(),
        marker: {
            enabled: false,
            // fillColor: '#FFFFFF',
            lineWidth: 2,
            lineColor: null
        }

    }],
    tooltip: {
        formatter: function () {
            return '<b>' + Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '</b><br/>' +
                 + Highcharts.numberFormat(this.y, 2) + "KiB/s";
        }
    },
    legend: {
        enabled: false
    },
    exporting: {enabled: false},//隐藏导出图片
    credits: {enabled: false}//隐藏highcharts的站点标志
};

function get_flow() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            result = JSON.parse(xmlhttp.responseText);
            if (last.time < result.time) {
                var speed = get_speed().toFixed(2);
                update_page(speed);
                update_chart(speed);
                last = result;
            }
        }
    };
    xmlhttp.open("GET", "/cgi-bin/getflow.py", true);
    xmlhttp.send();

}

function get_speed() {
    return (result.flow - last.flow) / ( result.time - last.time );
}

function update_page(speed) {
    // Flow
    document.getElementById("flow").innerHTML = (result.flow / 1024).toFixed(2) + " MiB";
    // Speed
    document.getElementById("speed").innerHTML = speed + " KiB/s";
    // Title
    document.title = speed + " KiB/s " + (result.flow / 1024).toFixed(2) + " MiB";
}

var count = 0;
function update_chart(speed) {
    last_speed = speed;
    console.log("[update_chart]last_speed: " + last_speed);
}

function displayLineChart() {
    $('#container').highcharts(chartOptions);
    // generate an array of random data
    var data = [],
        time = (new Date()).getTime(),
        i;
    for (i = -129; i <= 0; i += 1) {
        data.push({
            x: time + i * 1000,
            y: 0
        });
    }
    return data;
}