//监控区域模块制作 立即函数
(function() {
    $('.monitor .tabs').on('click', 'a', function() {
        $(this).addClass('active').siblings("a").removeClass("active");
        var now = $(this).index() + 2;
        // console.log(now);
        // 选取对应索引号的content
        // nth-child()规定属于其父元素的第n个匹配的改变
        // 选择元素的索引eq()方法让其显示,节流阀兄弟隐藏
        // $(".monitor .content").eq($(this).index()).show().siblings(".content").hide();
        $(".monitor .inner .content:nth-child(" + now + ")").show().siblings(".content").hide();
    });
    $(".marquee-view .marquee").each(function() {
        // 先克隆列表，追加在后面
        var rows = $(this).children().clone();
        $(this).append(rows);
    })
})();
// 点位分布统计模块
(function() {
    // 1. 实例化对象 DOM容器
    var myChart = echarts.init(document.querySelector(".pie"));
    // 2. 指定配置项和数据
    var option = {
        // 提示框组件
        tooltip: {
            // 分别有两个属性
            // trigger触发方式 非轴图形,使用item的意思是放到数据对应图形上触发提示 axis坐标轴触发,主要用于柱状图和折线图,none什么都不触发.
            trigger: "item",
            //formatter格式化提示内容 a:代表series系列图表名称(series中的name属性) b:代表series数据名称(series中data里面的name) c:代表series数据值data里面的value(series中data中的value) ,d:代表当前数据/总数据的比例
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        // 注意颜色的位置,color和tooltip同一级别,改变不同扇区的颜色
        color: [
            "#006cff",
            "#60cda0",
            "#ed8884",
            "#ff9f7f",
            "#0096ff",
            "#9fe6b8",
            "#32c5e9",
            "#1d9dff"
        ],
        // 控制图表
        series: [{
            //图表名称,显示在tooltip中
            name: "点位统计",
            // 图表类型 "pie":饼形图
            type: "pie",
            // 半径 分别对应内圆半径 外圆半径(控制大小),通过该参数控制饼形图大小,该参数可以是像素,也可以是百分比(基于DOM容器大小) 如果radius是百分比,则必须加引号
            radius: ['10%', '70%'],
            // 图表中心位置 x轴 y轴,即控制圆心left:50%, top:50%
            center: ["50%", "50%"],
            // radius半径模式(通过半径展示) area面积模式(通过面积展示)来展示data中的value值
            roseType: "radius",
            // 数据集 value数据的值 name数据的名称
            data: [
                { value: 20, name: "云南" },
                { value: 26, name: "北京" },
                { value: 24, name: "山东" },
                { value: 25, name: "河北" },
                { value: 20, name: "江苏" },
                { value: 25, name: "浙江" },
                { value: 30, name: "四川" },
                { value: 42, name: "湖北" }
            ],
        }],
        // 修饰饼形图文字相关样式 series中label对象设置字体大小
        label: {
            fontSize: 10
        },
        // 修饰引导线样式 series中labelLine对象设置引导线
        labelLine: {
            // 连接到图形的线长度
            length: 6,
            // 连接到文字的线长度
            length2: 8
        }
    };
    // 3.配置项和数据给实例化对象
    myChart.setOption(option);
    // 4.当我们把浏览器缩放时,图表也等比例缩放 监听缩放事件
    window.addEventListener("resize", function() {
        // 让我们的图表也调用resize这个方法
        myChart.resize();
    })
})();

// 柱形图模块
(function() {
    // 1.实例化对象
    var myChart = echarts.init(document.querySelector(".bar"));
    var item = {
        name: '',
        value: 1200,
        // 1. 修改当前柱形的样式，比如颜色
        itemStyle: {
            color: "#254065",
        },
        // 2.鼠标放到柱子上不想高亮显示
        emphasis: {
            itemStyle: {
                color: "#254065",
            }
        },
        // 3.鼠标经过柱子不显示提示框组件
        tooltip: {
            extraCssText: "opacity:0",
        }
    };
    // 2.指定配置项和数据
    var option = {
        tooltip: {
            trigger: 'item',
            /*   axisPointer: { // 坐标轴指示器，只有坐标轴触发有效，图形触发无效
                  type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
              } */
        },
        // 颜色修改为线性渐变
        color: new echarts.graphic.LinearGradient(
            //(x1,y2)点到(x2,y2)之间线性渐变
            0,
            0,
            0,
            1, [
                { offset: 0, color: '#00fffb' }, //0起始颜色,柱形图上部
                {
                    offset: 1,
                    color: '#0061ce'
                } //结束颜色，柱形图下部
            ]
        ),
        // 网格
        /*  饼形图修改图表大小是通过series对象里面的radius
         柱形图修改图表大小是通过series对象里面的grid对象 left right 等 */
        grid: {
            left: '0%',
            right: '3%',
            bottom: '3%',
            top: '3%',
            // 当把left设置为0%时，containLable为true显示坐标轴，为false不显示坐标轴 图表位置紧贴画布边缘是否显示刻度以及lable文字  防止坐标轴标签溢出跟grid区域有关
            containLabel: true,
            // 是否显示直角坐标系网格
            show: true,
            // grid四条网格边框颜色
            borderColor: 'rgba(0,240,255,0.3)',
        },
        // x轴坐标信息
        xAxis: [{
            type: 'category',
            data: ['上海', '广州', '北京', '深圳', '合肥', '', '……', '', '杭州', '厦门', '济南', '成都', '重庆'],
            axisTick: {
                // false:图形在刻度之间，如果alignWithLable为true,图形和刻度居中中间
                alignWithLabel: false,
                // 不显示刻度
                show: false
            },
            // x轴文字标签样式
            axisLabel: {
                color: "#4c9bfd",
            },
            // x轴这条线的颜色样式
            axisLine: {
                lineStyle: {
                    color: "rgba(0,240,255,0.3)",
                }
            }
        }],
        // y轴坐标信息
        yAxis: [{
            type: 'value',
            axisTick: {
                // false:图形在刻度之间，如果alignWithLable为true,图形和刻度居中中间
                alignWithLabel: false,
                // 不显示刻度
                show: false
            },
            // x轴文字标签样式
            axisLabel: {
                color: "#4c9bfd",
            },
            // x轴这条线的颜色样式
            axisLine: {
                lineStyle: {
                    color: "rgba(0,240,255,0.3)",
                }
            },
            // y轴分割线颜色设置
            splitLine: {
                lineStyle: {
                    color: "rgba(0,240,255,0.3)",
                }
            }
        }],

        series: [{
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            // series中的data对应xAxis中的data
            data: [2100, 1900, 1700, 1560, 1400, item, item, item, 900, 750, 600, 480, 240]
        }]
    };
    // 3.把配置项给实例对象
    myChart.setOption(option);
    // 4.当我们把浏览器缩放时,图表也等比例缩放 监听缩放事件
    window.addEventListener("resize", function() {
        // 让我们的图表也调用resize这个方法
        myChart.resize();
    })
})();

// 销售统计模块制作
(function() {
    // (1)准备数据
    var data = {
            year: [
                [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
                [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79]
            ],
            quarter: [
                [23, 75, 12, 97, 21, 67, 98, 21, 43, 64, 76, 38],
                [43, 31, 65, 23, 78, 21, 82, 64, 43, 60, 19, 34]
            ],
            month: [
                [34, 87, 32, 76, 98, 12, 32, 87, 39, 36, 29, 36],
                [56, 43, 98, 21, 56, 87, 43, 12, 43, 54, 12, 98]
            ],
            week: [
                [43, 73, 62, 54, 91, 54, 84, 43, 86, 43, 54, 53],
                [32, 54, 34, 87, 32, 45, 62, 68, 93, 54, 54, 24]
            ]
        }
        // 1.实例化DOM对象
    var myChart = echarts.init(document.querySelector(".line"));
    // 2.指定配置和数据
    var option = {
        // 里面线的颜色设置
        color: ['#00f2f1', '#ed3f35'],
        // 通过坐标轴来触发
        tooltip: {
            trigger: 'axis'
        },
        // 图例组件的配置
        legend: {
            // 距离容器右侧10%
            right: '10%',
            // 修饰图例文字的颜色
            textStyle: {
                color: "#4c9bfd"
            },
            // 如果series里面设置了name,此图例组件里面的data可省略
            // data: ['预期销售额', '实际销售额'],
        },
        grid: {
            top: "20%",
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
            // 显示四个边框
            show: true,
            // 设置边框颜色
            borderColor: "#012f4a",
        },
        xAxis: {
            type: 'category',
            // 去除轴内间距
            boundaryGap: false,
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            // 去除刻度
            axisTick: {
                show: false,
            },
            // 修饰刻度标签的颜色
            axisLabel: {
                color: "#4c9bfd",
            },
            // 去除x坐标轴的颜色
            axisLine: {
                show: false,
            }
        },
        yAxis: {
            type: 'value',
            axisTick: {
                show: false, //去除刻度
            },
            // 修饰刻度标签的文字
            axisLabel: {
                color: "#4c9bfd",
            },
            // 修改y轴分割线的颜色
            splitLine: {
                lineStyle: {
                    color: "#012f4a",
                }
            }
        },
        series: [{
                name: '预期销售额',
                type: 'line',
                stack: '总量',
                // 是否让线条圆滑显示
                smooth: true,
                // 必须把声明的data数据放到series前面
                data: data.year[0],
            },
            {
                name: '实际销售额',
                type: 'line',
                stack: '总量',
                // 是否让线条圆滑显示
                smooth: true,
                data: data.year[1],
            },

        ]
    };
    // 3.把配置和数据给实例对象
    myChart.setOption(option);
    // 4.tab切换效果制作
    // (2)点击切换效果
    $(".sales .caption").on("click", "a", function() {
        // 在点击时需要给index重新赋一下值,因为a的父盒子排序时还有h3，所以想要获取a的index应该-1
        // 此时要注意这个索引号的问题
        index = $(this).index() - 1;
        // 点击当前a 高亮显示 调用active类，清除兄弟的active类
        $(this).addClass("active").siblings("a").removeClass("active");
        // 拿到当前a的自定义属性值
        // console.log(this.dataset.type);
        // 根据拿到的值去找数据
        // 调用对象的属性有两种方法
        // console.log(data.year);
        // console.log(data["year"]);
        // 根据自定义属性得到的字符串去找对应对象里面的数据
        // console.log(data[this.dataset.type]);
        var arr = data[this.dataset.type];
        // console.log(arr);
        // 根据拿到的数据重新渲染series里面的data值
        option.series[0].data = arr[0];
        option.series[1].data = arr[1];
        // 重新把配置好的新数据给实例对象
        myChart.setOption(option);
    });
    // 5.tab栏自动切换效果
    //  - 开启定时器，每隔3s,自动让a触发点击时间即可
    var as = $(".sales .caption a");
    var index = 0;
    var timer = setInterval(function() {
            // 刚开始的时候第0个a已经处于选定状态了
            index++;
            if (index >= 4)
                index = 0;
            as.eq(index).click();
        }, 1000)
        //  - 鼠标经过sales，关闭定时器，离开开启定时器
    $(".sales").hover(function() {
        clearInterval(timer);
    }, function() {
        // 在开启之前先清除定时器
        clearInterval(timer);
        timer = setInterval(function() {
            // 刚开始的时候第0个a已经处于选定状态了
            index++;
            if (index >= 4)
                index = 0;
            as.eq(index).click();
        }, 1000)
    })
    window.addEventListener("resize", function() {
        // 让我们的图表也调用resize这个方法
        myChart.resize();
    })
})();

// 销售渠道模块 雷达图制作 立即执行函数
(function() {
    // 1.实例化DOM对象
    var myChart = echarts.init(document.querySelector(".radar"));
    // 2.指定配置项和数据
    var option = {
        // 提示框组件显示出来
        tooltip: {
            show: true,
            // 控制提示框组件的显示位置
            position: ["60%", "10%"]
        },
        radar: {
            // 雷达图的指示器，内部填充数据
            indicator: [
                { name: '机场', max: 100 },
                { name: '商场', max: 100 },
                { name: '火车站', max: 100 },
                { name: '汽车站', max: 100 },
                { name: '地铁', max: 100 },
            ],
            // 修改雷达图的大小 radar中的radius是最外圆占DOM容器的百分比
            radius: "60%",
            shape: 'circle',
            // 分割的圆圈个数 splitNumber
            splitNumber: 4,
            // 修饰雷达图文字颜色
            name: {
                textStyle: {
                    color: '#4c9bfd',
                }
            },
            // 修饰雷达图分割圆圈线样式
            splitLine: {
                lineStyle: {
                    // 分割线颜色默认从内到外依次变浅
                    color: [
                        'rgba(255, 255, 255, 0.5)'
                    ]
                }
            },
            splitArea: {
                show: false
            },
            // 坐标轴轴线相关设置
            axisLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.5)'
                }
            }
        },
        series: [{
            name: '北京',
            type: 'radar',
            // 修饰区域填充的线条颜色
            lineStyle: {
                normal: {
                    color: "#fff",
                    width: 1,
                    opacity: 0.5
                }
            },
            data: [
                [90, 19, 56, 11, 34]
            ],
            // 设置图形标记（拐点） circle是点 react是方块,arrow是箭头
            symbol: 'circle',
            // symnbolSize设置拐点的大小
            symbolSize: 5,
            // 设置拐点的颜色
            itemStyle: {
                color: '#fff'
            },
            // 让小圆点显示相关数据
            label: {
                show: true,
                fontSize: 10,
            },
            // 雷达图中的区域颜色 即区域填充的背景颜色 series中的areaLine
            areaStyle: {
                // opacity: 0.1
                color: "rgba(238,197,102,0.6)"
            }
        }, ]
    };
    // 3.将配置项和数据给实例化对象
    myChart.setOption(option);
    // 雷达图自适应效果
    window.addEventListener("resize", function() {
        // 让我们的图表也调用resize这个方法
        myChart.resize();
    })
})();

// 半圆形饼形图设置方式
(function() {
    // 1.实例化DOM对象
    var myChart = echarts.init(document.querySelector(".gauge"));
    // 2.设置配置项和数据
    var option = {
        series: [{
            name: '销售进度',
            type: 'pie',
            // 设置饼形图的大小
            radius: ['130%', '150%'],
            // 移动饼形图的位置，使文字在饼形图的中间
            center: ["48%", "80%"],
            labelLine: {
                show: false
            },
            // 饼形图的起始角度为180,不是旋转角度
            startAngle: 180,
            // 鼠标经过不变大偏移，默认偏移10
            hoverOffset: 0,
            data: [{
                    value: 100,
                    itemStyle: {
                        // 颜色渐变#00c9e0->#005fc1
                        color: new echarts.graphic.LinearGradient(
                            // （x1,y2)到点（x2,y2）之间进行渐变
                            0, 0, 0, 1, [{ offset: 0, color: "#009ce0" }, //0起始颜色
                                {
                                    offset: 1,
                                    color: "#005fc1" //1结束颜色
                                }
                            ]
                        )

                    }
                },
                {
                    value: 100,
                    itemStyle: {
                        color: "#12274d",
                    }
                },
                {
                    value: 200,
                    itemStyle: {
                        color: "transparent"
                    }
                },
            ]
        }]
    };
    // 3.将配置项和数据给实例化对象
    myChart.setOption(option);
    // 自适应效果
    window.addEventListener("resize", function() {
        // 让我们的图表也调用resize这个方法
        myChart.resize();
    })
})();

// 全国热榜模块制作
(function() {
    // 1.准备相关数据
    var hotData = [{
            city: '北京',
            sales: '25,179',
            flag: true,
            brands: [
                { name: '可爱多', num: '9,086', flag: true },
                { name: '娃哈哈', num: '8,341', flag: true },
                { name: '喜之郎', num: '7,407', flag: false },
                { name: '八喜', num: '6,080', flag: false },
                { name: '小洋人', num: '6,724', flag: false },
                { name: '好多鱼', num: '2,170', flag: true }
            ]
        },
        {
            city: '河北',
            sales: '23,252',
            flag: false,
            brands: [
                { name: '可爱多', num: '3,457', flag: false },
                { name: '娃哈哈', num: '2,124', flag: true },
                { name: '喜之郎', num: '8,907', flag: false },
                { name: '八喜', num: '6,080', flag: true },
                { name: '小洋人', num: '1,724', flag: false },
                { name: '好多鱼', num: '1,170', flag: false },
            ]
        },
        {
            city: '上海',
            sales: '20,760',
            flag: true,
            brands: [
                { name: '可爱多', num: '2,345', flag: true },
                { name: '娃哈哈', num: '7,109', flag: true },
                { name: '喜之郎', num: '3,701', flag: false },
                { name: '八喜', num: '6,080', flag: false },
                { name: '小洋人', num: '2,724', flag: false },
                { name: '好多鱼', num: '2,998', flag: true },
            ]
        },
        {
            city: '江苏',
            sales: '23,252',
            flag: false,
            brands: [
                { name: '可爱多', num: '2,156', flag: false },
                { name: '娃哈哈', num: '2,456', flag: true },
                { name: '喜之郎', num: '9,737', flag: true },
                { name: '八喜', num: '2,080', flag: true },
                { name: '小洋人', num: '8,724', flag: true },
                { name: '好多鱼', num: '1,770', flag: false },
            ]
        },
        {
            city: '山东',
            sales: '20,760',
            flag: true,
            brands: [
                { name: '可爱多', num: '9,567', flag: true },
                { name: '娃哈哈', num: '2,345', flag: false },
                { name: '喜之郎', num: '9,037', flag: false },
                { name: '八喜', num: '1,080', flag: true },
                { name: '小洋人', num: '4,724', flag: false },
                { name: '好多鱼', num: '9,999', flag: true },
            ]
        }
    ];
    // 2.根据数据渲染各省热销sup模块
    /* 具体做法：（1）删除原先自带小li
        (2)遍历数据$.each()
        (3)拼接字符串把数据渲染到li的span里面
    （4）追加给.sup盒子 */
    // （1）遍历hotDate对象 利用$.each(方法) 注意其中有两个参数分别为i,n, 循环追加字符串数据给supHTML，通过HTML方法追加给sup盒子
    var supHTML = "";
    $.each(hotData, function(i, n) {
            // console.log(i);
            // console.log(n);
            // 不支持if、else,但是支持三元表达式
            supHTML += `<li><span>${n.city}</span><span>${n.sales} <s class="${n.flag?"icon-up":"icon-down"}"></s></span></li>`;
            $(".sup").html(supHTML);
        })
        // 3.当鼠标进入tab时，鼠标经过当前小li，要高亮显示
    $(".province .sup").on("mouseenter", "li", function() {
        // 节流阀 根据$(this).index得知是第几个小li触发
        index = $(this).index();
        render($(this));
    })

    // 声明一个函数 里面设置sup当前小li高亮还有 对应的品牌对象渲染
    // 这个函数需要传递当前元素进去
    function render(currentEle) {
        currentEle.addClass("active").siblings("li").removeClass("active");
        // 拿到当前城市的index,因为其父元素是个数组，所以可以拿到
        // var x = $(this).index();
        // 得到当前城市
        // console.log(hotData[$(this).index()]);
        // 注意这个一定要写在里面，确保每次经过小li时,subHTML都是空
        var subHTML = "";
        $.each(hotData[currentEle.index()].brands, function(i, n) {
            subHTML += `<li><span>${n.name}</span><span>${n.num} <s class="${n.flag ? "icon-up" : "icon-down"}"></s></span></li>`;
            // 把生成的六个小li字符串给sub DOM盒子
            $(".sub").html(subHTML);
        })
    }
    // 4.默认把第一个小li处于鼠标经过状态
    var lis = $(".province .sup li");
    // console.log(lis.eq(0));
    lis.eq(0).mouseenter();

    // 5.开启定时器
    var index = 0;
    var timer = setInterval(function() {
        index++;
        if (index >= 5) index = 0;
        // lis.eq(index).mouseenter();
        render(lis.eq(index));
    }, 2000);
    // 停止定时器
    $(".province .sup").hover(function() {
            // 鼠标经过事件
            clearInterval(timer);
        },
        // 鼠标离开事件 这里用mouseenter的话会有死循环
        function() {
            // 停止定时器结束之后，再开启定时器之前还记得清一次定时器
            clearInterval(timer);
            timer = setInterval(function() {
                index++;
                if (index >= 5) index = 0;
                // lis.eq(index).mouseenter();
                render(lis.eq(index));
            }, 2000)
        });
})();