import React from "react";
import ReactApexChart from "react-apexcharts";

class PieChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chartData: this.props.chartData,
      chartOptions: {
        ...this.props.chartOptions,
        chart: {
          ...this.props.chartOptions.chart,
          animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 800,
            animateGradually: {
              enabled: true,
              delay: 150
            },
            dynamicAnimation: {
              enabled: true,
              speed: 350
            }
          }
        },
      },
    };
  }

  componentDidMount() {
    this.setState({
      chartData: this.props.chartData,
      chartOptions: this.props.chartOptions,
    });
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.chartOptions}
          series={this.state.chartData}
          type="pie"
          width="100%"
        />
      </div>
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps.chartData !== this.props.chartData) {
      this.setState({
        chartData: this.props.chartData,
        chartOptions: this.props.chartOptions,
      });
    }
  }

  componentWillUnmount() {
    this.setState({
      chartData: [],
      chartOptions: {},
    });
  }
}

export default PieChart;