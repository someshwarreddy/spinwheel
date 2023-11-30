const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const valuBtn = document.getElementById("value-btn");
const finalValue = document.getElementById("final-value");
const stopValue = document.getElementById("form__group");


//Object that stores values of minimum and maximum angle for a value
const rotationValues = [
    { minDegree: 0, maxDegree: 30,  },
    { minDegree: 31, maxDegree: 90,  },
    { minDegree: 91, maxDegree: 150,  },
    { minDegree: 151, maxDegree: 210, },
    { minDegree: 211, maxDegree: 270,  },
    { minDegree: 271, maxDegree: 330,  },
    { minDegree: 331, maxDegree: 360,  },
];
 //Size of each piece
let data = [];
let dataLabels=[]
let value ;
//background color for each piece
var pieColors = [
    "#4caf50",
    "#8b35bc",
    "#795548",
    "#9c27b0",
    "#009688",
    "#f44336",
];

spinBtn.disabled = true;

//Create chart
let myChart = new Chart(wheel, {
    //Plugin for displaying text on pie chart
    plugins: [ChartDataLabels],
    //Chart Type Pie
    type: "pie",
    data: {
        //Labels(values which are to be displayed on chart)
        labels: dataLabels,
        //Settings for dataset/pie
        datasets: [
            {
                backgroundColor: pieColors,
                data: data,
            },
        ],
    },
    options: {
        //Responsive chart
        responsive: true,
        animation: { duration: 0 },
        plugins: {
            //hide tooltip and legend
            tooltip: false,
            legend: {
                display: false,
            },
            //display labels inside pie chart
            datalabels: {
                color: "#ffffff",
                formatter: (_, context) => context.chart.data.labels[context.dataIndex],
                font: { size: 24 },
            },
        },
    },
});
//display value based on the randomAngle
const valueGenerator = (angleValue) => {
    stopValue.classList.add('none') ;
    for (let i of rotationValues) {
        //if the angleValue is between min and max then display it
        if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
            // finalValue.innerHTML = `<p>Value: ${i.value}</p>`;
            spinBtn.disabled = false;
            break;
        }
    }
};

//Spinner count
let count = 0;
//100 rotations for animation and last rotation for result
let resultValue = 101;
//Start spinning
spinBtn.addEventListener("click", () => {
    stopValue.classList.add('none') ;
    spinBtn.disabled = true;
    //Empty final value
    finalValue.innerHTML = `<p>Good Luck!</p>`;
    //Generate random degrees to stop at
    let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
    //Interval for rotation animation
    let rotationInterval = window.setInterval(() => {
        //Set rotation for piechart
        /*
        Initially to make the piechart rotate faster we set resultValue to 101 so it rotates 101 degrees at a time and this reduces by 1 with every count. Eventually on last rotation we rotate by 1 degree at a time.
        */
        myChart.options.rotation = myChart.options.rotation + resultValue;
        //Update chart with new value;
        myChart.update();
        //If rotation>360 reset it back to 0
        if (myChart.options.rotation >= 360) {
            count += 1;
            resultValue -= 5;
            myChart.options.rotation = 0;
        } else if (count > 15 && myChart.options.rotation == randomDegree) {
            valueGenerator(randomDegree);
            clearInterval(rotationInterval);
            count = 0;
            resultValue = 101;
        }
    }, 10);
});
 //Create chart slices dynamically
 valuBtn.addEventListener("click", () => {
    spinBtn.disabled = false;
    let number = prompt("Please enter number to start spin wheel ");
     value = +number;
     for (let i = 1; i <=value; i++) { 
        data.push(16);
        dataLabels.push(i);
        console.log(rotationValues)
        myChart.update()
    }
    data.length > 0 ? valuBtn.classList.add('none'): valuBtn.classList.remove('none');
    if(data.length > 0) {
        stopValue.classList.remove('none') ;  
    }
});

stopValue.classList.add('none') ;
