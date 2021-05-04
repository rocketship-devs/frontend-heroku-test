import React from "react";
import Plot from "react-plotly.js";

class Stock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stockChartXval: [],
      stockChartYval: [],
    };
  }

  componentDidMount() {
    this.fetchstock();
  }
  //This function is used for daily chart, the api only allows for yesterday on the free version.
  yesterday = ( function(){this.setDate(this.getDate()-1); return this} ).call(new Date());
  getlastyear = ( function(){this.setDate(this.getDate()-1); this.setFullYear(this.getFullYear()-1); return this} ).call(new Date());
  fetchstock() {
    const pointerToThis = this;
    console.log(pointerToThis);
    const API_KEY = "xPz4AilYj9x8joMVCsgBwjtZhpYvEmzr";
    //let currdate = new Date().toISOString().slice(0, 10);
    let yestdate = this.yesterday.toISOString().slice(0, 10);
    let lastyear = this.getlastyear.toISOString().slice(0, 10);
    let stocksym = "TSLA";
    let API_Call = "https://api.polygon.io/v2/aggs/ticker/" + stocksym + "/range/1/day/"+ lastyear + "/" + yestdate + "?unadjusted=false&sort=asc&limit=251&apiKey=" + API_KEY;
    //let API_Call = "https://api.polygon.io/v2/aggs/ticker/" + stocksym + "/range/1/minute/" + yestdate + "/" + yestdate + "?unadjusted=true&sort=asc&limit=675&apiKey=" + API_KEY;
    let stockchartXcalfun = [];
    let stockchartYcalfun = [];


    fetch(API_Call) 
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
    

        for (var key in data["results"]) {
          var s = new Date(data["results"][key]["t"]).toLocaleDateString("fr-CA");
          stockchartXcalfun.push(s);
          stockchartYcalfun.push(data["results"][key]["vw"]);
        }

        //console.log(stockchartXcalfun)
        pointerToThis.setState({
          stockChartXval: stockchartXcalfun,
          stockChartYval: stockchartYcalfun,
          stockname: stocksym,
           
        });
      });
  }
  render() {
    return (
      <div>
        <Plot
          data={[
            {
              x: this.state.stockChartXval,
              y: this.state.stockChartYval,
              type: "scatter",
              mode: "lines",
              marker: { color: "white" },
            },
          ]}
          layout={{
            width: 720,
            height: 440,
            title: this.state.stockname,
            font: {
              family: "Courier New, monospace",
              size: 18,
              color: "#FFFFFF",
            },
            paper_bgcolor: "rgba(0,0,0,0",
            plot_bgcolor: "rgba(0,0,0,0",
            xaxis: {
              showgrid: false,
              zeroline: false,
              visible: false,
              fixedrange: true,
              type : 'date',
              rangeselector: {
                visible : true,
                buttons: [
                  {
                    step: 'month',
                    stepmode: 'backward',
                    count: 1,
                    label: '1m'
                }, {
                  step: 'month',
                  stepmode: 'backward',
                  count: 3,
                  label: '3m'
              }, {
                    step: 'month',
                    stepmode: 'backward',
                    count: 6,
                    label: '6m'
                },{   
                    step: 'year',
                    visible : true
                  }
                ]
            },
            
          
          

            },
            yaxis: {
              showgrid: false,
              zeroline: false,
              visible: false,
              showline: true,
              fixedrange: true,
              
            },
          }}
          config={{ displayModeBar: false, scrollZoom: false }}
        />
      </div>
    );
  }
}
export default Stock;
