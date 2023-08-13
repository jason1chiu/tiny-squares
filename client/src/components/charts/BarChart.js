import React, { Component } from "react";
import Chart from "react-apexcharts";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

class ColumnChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: null,
      chartOptions: null,
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
      <ErrorBoundary fallback={<p>Something went wrong</p>}>
        {this.state.chartData && this.state.chartOptions && (
          <Chart
            options={this.state.chartOptions || {}}
            series={this.state.chartData || []}
            type="bar"
            width="100%"
            height="100%"
          />
        )}
      </ErrorBoundary>
    );
  }
}

export default ColumnChart;
